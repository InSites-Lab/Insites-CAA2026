#!/usr/bin/env python3
"""Source-Refiner extraction helper.

For each PDF: report page/image counts, detect whether the text layer is
USABLE or MOJIBAKE/SCANNED, render every page to PNG (for vision-reading),
carve embedded images, and print rough token estimates.

Deps: PyMuPDF (`pip install pymupdf`), Pillow.
Usage: python extract.py <pdf-or-folder> [work-dir]
"""
import sys
import os
import re


def text_usable(t):
    """Heuristic: is the extracted text real text or font-mapping mojibake?"""
    s = t.strip()
    if not s:
        return False, 0.0
    # Chars we can read as meaningful: Hebrew block, alphanumerics, common punct/space.
    good = sum(
        1 for c in s
        if ('֐' <= c <= '׿') or c.isalnum() or c in " .,;:()[]{}\n\t-/–—"
    )
    ratio = good / max(len(s), 1)
    # Real text has runs of >=3 Hebrew/Latin letters; mojibake rarely does.
    has_words = bool(re.search(r"[֐-׿A-Za-z]{3,}", s))
    return (ratio > 0.6 and has_words), ratio


def process_pdf(path, outdir):
    import fitz  # PyMuPDF

    name = os.path.splitext(os.path.basename(path))[0]
    safe = re.sub(r"[^A-Za-z0-9_-]+", "_", name)[:40] or "doc"
    d = fitz.open(path)
    full = "".join(p.get_text() for p in d)
    usable, ratio = text_usable(full)
    n_emb = sum(len(p.get_images()) for p in d)

    print("=== %s ===" % os.path.basename(path))
    print("pages=%d embedded_images=%d text_chars=%d usable=%s (ratio=%.2f)"
          % (len(d), n_emb, len(full.strip()), usable, ratio))

    # Always render pages (needed for vision-read when text is unusable).
    pdir = os.path.join(outdir, safe + "-pages")
    os.makedirs(pdir, exist_ok=True)
    for i, p in enumerate(d):
        p.get_pixmap(dpi=140).save(os.path.join(pdir, "p%02d.png" % (i + 1)))

    # Carve embedded images by xref (more reliable than byte-scanning).
    idir = os.path.join(outdir, safe + "-images")
    os.makedirs(idir, exist_ok=True)
    seen = set()
    k = 0
    for p in d:
        for img in p.get_images():
            xref = img[0]
            if xref in seen:
                continue
            seen.add(xref)
            try:
                pix = fitz.Pixmap(d, xref)
                if pix.width * pix.height < 40000:   # skip tiny icons/logos
                    continue
                if pix.n - pix.alpha >= 4:            # CMYK/other -> RGB
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                k += 1
                pix.save(os.path.join(idir, "img%02d_%dx%d.png" % (k, pix.width, pix.height)))
            except Exception:
                pass

    # Rough token estimates: a rendered/ingested page ~1300 tok; a lean text ~chars/3 (Hebrew-inflated).
    as_is = len(d) * 1300 + n_emb * 200
    lean = (len(full.strip()) // 3) if usable else (len(d) * 250)  # vision-read lean ~250 tok/page of text
    print("rendered_pages=%d carved_images=%d" % (len(d), k))
    print("est_tokens_pdf_as_is~=%d  est_tokens_lean~=%d  (~%d%% lighter)"
          % (as_is, lean, int(100 * (1 - lean / max(as_is, 1)))))
    if usable:
        print("-> TEXT USABLE: use the extracted text; trim front-matter/bibliography/other-asset passages.")
    else:
        print("-> TEXT MOJIBAKE/SCANNED: vision-read the rendered pages in %s and transcribe faithfully." % pdir)
    print("-> pages: %s" % pdir)
    print("-> images: %s  (curate to 3-5 per the LIM rubric)" % idir)
    d.close()


def main():
    if len(sys.argv) < 2:
        print("usage: python extract.py <pdf-or-folder> [work-dir]")
        return
    src = sys.argv[1]
    base = os.path.dirname(os.path.abspath(src.rstrip("/\\")))
    outdir = sys.argv[2] if len(sys.argv) > 2 else os.path.join(base, "_refine-work")
    os.makedirs(outdir, exist_ok=True)

    if src.lower().endswith(".pdf"):
        pdfs = [src]
    else:
        pdfs = [os.path.join(src, f) for f in sorted(os.listdir(src)) if f.lower().endswith(".pdf")]
    if not pdfs:
        print("no PDFs found at %s" % src)
        return
    for p in pdfs:
        process_pdf(p, outdir)
        print()
    print("work dir: %s" % outdir)


if __name__ == "__main__":
    main()
