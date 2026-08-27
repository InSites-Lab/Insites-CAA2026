// Build a copy of dist/ that opens by DOUBLE-CLICKING index.html — off a USB
// stick, off a desktop, off a hall machine with no server and no network.
//
// WHY THIS IS NEEDED. Vite emits the entry as an EXTERNAL ES module:
//
//   <script type="module" crossorigin src="./assets/index-<hash>.js">
//   <link rel="stylesheet" crossorigin href="./assets/index-<hash>.css">
//
// Opened as file://, the page's origin is the string "null", and BOTH of those
// attributes are fatal there:
//
//   - `crossorigin` forces CORS mode on the request. A null origin can never
//     satisfy it, so even the STYLESHEET is refused.
//   - `type="module"` is subject to CORS whatever the attribute says. An
//     external module can NEVER be fetched over file://. This is the one that
//     cannot be attributed away, and it is why "just drop crossorigin" fixes
//     the CSS and leaves a blank page.
//
// So the fix is to leave nothing external to fetch: the JS and the CSS are
// INLINED into index.html. The script stays `type="module"` — an inline module
// is never fetched, so no CORS applies, and it keeps module DEFER semantics.
// (Stripping the type to make it a classic script does not work: it would then
// run synchronously in <head>, before #root exists, and React fails with
// "Could not find root element to mount to". Verified, not assumed.)
//
// Images stay as separate files next to the HTML. <img src> and CSS url() are
// NOT CORS-checked over file://, so they load; and inlining 6.6 MB of JPEG as
// base64 would triple the HTML and slow the first paint for nothing.
//
// THE TYPEFACE is embedded too, and it has to be. index.html links Google
// Fonts over https; with no wifi the deck falls back to whatever the machine
// has, and a hall machine has no more Alef than this one does. Measured: the
// talk's own title renders 546px in Alef and 508px in the fallback. It does
// NOT overflow — the fallback is narrower, so the nowrap title still fits —
// but it is not the deck's type. So the woff2 files are fetched AT BUILD TIME
// (this step needs the network; nothing after it does) and written into the
// HTML as data: URIs.
//
// WHAT STILL NEEDS THE NETWORK, by design — both degrade quietly:
//   - Google Analytics. Fails silently; nothing depends on it.
//   - The Gemini-backed AI query. A live feature; it cannot work offline.
//
// Usage:  npm run build  &&  node scripts/make-offline.mjs
// Output: dist-offline/ — copy the WHOLE folder to the stick, not just the HTML.

import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const OUT = path.resolve('dist-offline');

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error("No dist/index.html — run 'npm run build' first.");
  process.exit(1);
}

const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const scriptTag = /<script type="module" crossorigin src="\.\/assets\/([^"]+)"><\/script>/;
const linkTag = /<link rel="stylesheet" crossorigin href="\.\/assets\/([^"]+)">/;

// Fail loudly rather than shipping a stick that silently shows a blank page:
// if Vite ever changes how it writes these tags, this is where we find out.
const jsMatch = html.match(scriptTag);
const cssMatch = html.match(linkTag);
if (!jsMatch) throw new Error('dist/index.html has no external module script where one was expected');
if (!cssMatch) throw new Error('dist/index.html has no external stylesheet link where one was expected');

const js = fs.readFileSync(path.join(DIST, 'assets', jsMatch[1]), 'utf8');
const css = fs.readFileSync(path.join(DIST, 'assets', cssMatch[1]), 'utf8');

// A literal "</script>" anywhere in the bundle would close the tag early. Vite
// escapes it in string literals, but a regex or a comment could still carry it.
const safeJs = js.replace(/<\/script>/gi, '<\\/script>');

// ── the typeface ──────────────────────────────────────────────────
// Only the families the CSS variables actually NAME are fetched, not the six
// candidates index.html links. That keeps the payload to what is used, and it
// follows the knob: change --font-display in index.css, rebuild, and the stick
// carries the new face without anyone editing this script.
// The minifier rewrites the single quotes of index.css to double quotes, so
// match either — this regex silently found nothing the first time.
const named = [...css.matchAll(/--font-(?:body|display):\s*["']([^"']+)["']/g)].map((m) => m[1]);
const families = [...new Set(named)];

const googleLink = /<link\s+href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"\s*\n?\s*rel="stylesheet">/;

async function embedFonts() {
  if (!families.length) {
    console.warn('! no --font-body/--font-display family found in the CSS; leaving the Google Fonts link alone');
    return null;
  }
  // Ask as a current browser or Google serves ttf instead of woff2.
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
  const url = 'https://fonts.googleapis.com/css2?' +
    families.map((f) => `family=${encodeURIComponent(f)}:wght@400;700`).join('&') + '&display=swap';

  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Google Fonts returned ${res.status}`);
  let sheet = await res.text();

  const urls = [...new Set([...sheet.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
  let bytes = 0;
  for (const u of urls) {
    const f = await fetch(u, { headers: { 'User-Agent': UA } });
    if (!f.ok) throw new Error(`font file returned ${f.status}`);
    const buf = Buffer.from(await f.arrayBuffer());
    bytes += buf.length;
    sheet = sheet.split(u).join(`data:font/woff2;base64,${buf.toString('base64')}`);
  }
  console.log(`fonts: ${families.join(', ')} — ${urls.length} woff2 files, ${(bytes / 1024).toFixed(0)} KB embedded`);
  return sheet;
}

let fontSheet = null;
try {
  fontSheet = await embedFonts();
} catch (e) {
  // A stick without the right type still beats no stick. Say so loudly.
  console.warn(`! could not embed fonts (${e.message}) — the build will fall back to system type offline`);
}

let offline = html
  .replace(scriptTag, () => `<script type="module">\n${safeJs}\n</script>`)
  .replace(linkTag, () => `<style>\n${css}\n</style>`);

if (fontSheet) {
  if (!googleLink.test(offline)) {
    console.warn('! the Google Fonts <link> was not where expected; the embedded faces are appended instead');
    offline = offline.replace('</head>', `<style>\n${fontSheet}\n</style>\n</head>`);
  } else {
    offline = offline.replace(googleLink, () => `<style>\n${fontSheet}\n</style>`);
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(DIST, OUT, { recursive: true });
// The assets folder held only the two files now living inside the HTML.
fs.rmSync(path.join(OUT, 'assets'), { recursive: true, force: true });
fs.writeFileSync(path.join(OUT, 'index.html'), offline);

const size = (p) => fs.statSync(p).size;
const total = fs
  .readdirSync(OUT, { recursive: true })
  .map((f) => path.join(OUT, String(f)))
  .filter((f) => fs.statSync(f).isFile())
  .reduce((n, f) => n + size(f), 0);

console.log(`dist-offline/  index.html ${(size(path.join(OUT, 'index.html')) / 1024 / 1024).toFixed(2)} MB` +
  `, ${(total / 1024 / 1024).toFixed(2)} MB total`);
console.log('Copy the whole folder to the stick and double-click index.html.');
