// One-off: writes public/tab5/qr-repo.svg for the closing slide.
//
// The QR is generated HERE and committed as a static asset, not encoded in the
// browser: the deck ships no runtime dependency for a picture that never
// changes, and a code that is wrong on a conference screen is worse than no
// code at all — so it is generated once and then read back and verified.
//
//   node scripts/make-qr.mjs
//
// Re-run only if REPO_URL in WorkshopProgramView.tsx changes. `qrcode` is a
// devDependency; nothing in the built site imports it.
import { mkdir, writeFile } from 'node:fs/promises';
import QRCode from 'qrcode';

// Must match REPO_URL in components/views/WorkshopProgramView.tsx.
const URL = 'https://github.com/InSites-Lab/insites/tree/main/system';
const OUT = 'public/tab5/qr-repo.svg';

const svg = await QRCode.toString(URL, {
  type: 'svg',
  // 'M' recovers ~15% — enough for a photograph taken at an angle from a
  // projected screen, without the density that 'Q'/'H' would add.
  errorCorrectionLevel: 'M',
  margin: 1,
  color: {
    // White code on transparent, so it sits on the dark card without a plate.
    dark: '#ffffff',
    light: '#00000000',
  },
});

await mkdir('public/tab5', { recursive: true });
await writeFile(OUT, svg, 'utf8');
console.log(`wrote ${OUT} (${svg.length} bytes) for ${URL}`);
