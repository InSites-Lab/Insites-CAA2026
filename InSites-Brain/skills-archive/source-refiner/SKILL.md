---
name: source-refiner
description: Refine heavy heritage source documents (PDFs, images) into lean, citation-ready material for a CBSA assessment conversation. Extracts clean text — with a vision-read fallback for scanned or broken-font Hebrew PDFs whose text layer comes out as mojibake — curates the few analytically-essential images, and produces a token-cost report. Trigger when the user wants to "refine", "lean", "condense", or "prep" source documents for upload to an InSites CBSA bot (Claude/GPT/Gemini), or says their documents are too large / too image-heavy for a smooth multi-stage assessment.
---

# Source-Refiner — lean heavy heritage docs for a CBSA conversation

Turn heavy heritage source material (multi-page PDFs, scans, image-heavy reports) into **lean, citation-ready** material for a CBSA assessment conversation, and report the token saving.

## Why this matters

In a CBSA bot conversation the **uploaded document is re-sent every turn** (the platform injects the full context each turn). Across a ~16-turn Stages 0–6 run, a heavy document is the single largest, most repeated cost — it can dominate the usage budget and strand the user mid-assessment ("continue tomorrow"). A heavy PDF (image-heavy or scanned) can be ~40k tokens; a leaned text + 3–4 key images is ~12–15k. Leaning the source is **5–10× bigger a lever than any prompt tweak.** A second, quality benefit: scanned / broken-font Hebrew PDFs feed the bot **garbled** text (the font has no Unicode map); a vision-read transcription gives the bot **clean, quotable** text instead.

## When to use

- The user has heavy / multi-page / image-heavy source PDFs to assess and wants them leaner before uploading.
- A Hebrew (or other) PDF is **scanned or has a broken font** — text copy-paste comes out as boxes / `???` / mojibake.
- The user hit (or fears) the usage wall running all stages sequentially on a big document.

## Process

### Step 1 — Mechanical inventory & extraction (run the helper)

Run: `python "<skill-dir>/scripts/extract.py" "<pdf-or-folder>" "<work-dir>"`
(Deps: **PyMuPDF** `pip install pymupdf` and **Pillow**.)

For each PDF it reports: page count, embedded-image count, whether the **text layer is USABLE or MOJIBAKE/SCANNED**, and a token estimate (as-is vs lean). It also **renders every page to PNG** (for vision-reading) and **carves the embedded images** to the work dir. Read its report before deciding the path for each document.

### Step 2 — Produce clean lean text (one `*-source.md` per document)

- **If TEXT = USABLE** → use the extracted text. Trim to the heritage-essential: drop mastheads, journal front-matter, bibliographies, and passages about **other** assets/buildings. Keep names, dates, materials, coordinates, the significance narrative.
- **If TEXT = MOJIBAKE / SCANNED** → **do not ship the garbled text.** Open the rendered page PNGs and **vision-read them yourself**, transcribing faithfully into clean Markdown. Mark the file a *faithful reconstruction* (not verbatim) and flag any uncertain figures (dates, measurements) for the user to verify against the original.
- Each output file starts with a **source-attribution header** + a one-line **transparency note**. If the content is mostly Hebrew, start the file with `<div dir="rtl">` on line 1.
- Add a compact **"facts for Stage 0"** appendix (name · location · coordinates · architect/builder · dates · materials/style · source tier).

### Step 3 — Curate images (LIM rubric → `demo-images/`)

From the carved images, keep ONLY the analytically-essential set (**aim 3–5**). The CBSA-coverage rubric:

- **Location / map** (modern or site plan) — Stage 0 + dashboard map
- **Exterior** (one clean historical/current facade) — Stages 1, 3
- **Interior** (if any) — Stages 1, 3
- **Setting / landscape** (the asset in its surroundings) — Stages 1, 3

**Drop:** redundant duplicate views, decorative stock images, images of **other** buildings, mastheads, low-information figures. Save the keep-set with clear names (`01-location`, `02-facade`, …) in `demo-images/`. If a "keep" image is a full scanned **page** (photo + caption + text), offer to crop to just the photo (Pillow).

### Step 4 — Token report & usage guidance (`token-report.md`)

State **before vs after**: per-turn token estimate (PDFs-as-is vs lean text + N images) and a session projection (× ~16 turns). Then the usage guidance:

- **Attach the lean material to the conversation** (the chat), not the Project knowledge — so it's specific to this assessment and cached after turn 1.
- **One continuous chat** per assessment (keeps the cache warm; the platform re-charges full price after a long gap).
- If the user must stop mid-assessment, **save a Resume Capsule** and resume in a fresh chat — cheaper than dragging a long old chat.

## Output structure

```
<work-dir>/
  <doc>-source.md          # clean lean text per document
  demo-images/             # 3–5 curated, named images
  token-report.md          # before/after + usage guidance
```

## Pitfalls (learned the hard way)

- **Broken-font Hebrew PDFs extract as mojibake** even via pypdf / PyMuPDF / pdfplumber — and **Word "Save As" preserves the broken font too.** The only reliable path is render → **vision-read**. Never ship the garbled text to the bot.
- **Hebrew acronym gershayim**: write כי״ח, ש״י with the real gershayim `״` (U+05F4), never a straight `"` — a straight quote breaks downstream JSON / code (it silently closes a string).
- **Image token cost is by pixel resolution, not file size** — downscaling a kept image barely helps; the saving comes from **dropping** images, not shrinking them.
- **Don't over-trim text.** The instruction floor isn't the problem — the *document* is. Keep the substantive heritage content; only cut front-matter, bibliographies, and other-asset tangents.

## Two variants

- **This Claude Code skill** = the full, file-producing pipeline (render, carve, vision-read, write files). For the facilitator / lab.
- **`claude-ai-refiner.md`** (in this folder) = a paste-ready prompt to deploy as a **claude.ai Project** so non-technical participants can self-serve: claude.ai reads their uploaded PDF via native vision and returns clean lean text + image advice + a token note (it can't export image files — that stays manual).
