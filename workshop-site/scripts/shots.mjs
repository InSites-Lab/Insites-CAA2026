import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '.playwright-mcp'; // gitignored
fs.mkdirSync(OUT, { recursive: true });

const DEVICES = [
  { name: 'phone', width: 390, height: 844, dsf: 3 },
  { name: 'ipad', width: 768, height: 1024, dsf: 2 },
];

// Deck tabs are clicked by their visible label; excursions by the bottom nav.
// These are the SHORT labels, which is what renders below xl — both of these
// viewports are below it. Keep this list in step with PROGRAM_TABS + QA_TAB in
// WorkshopProgramView: a name that no longer exists falls into the catch below
// and silently shoots the previous tab a second time.
const TABS = ['InSites', 'Tension', 'Notation', 'Landscape', 'Closing'];

const browser = await chromium.launch();

for (const d of DEVICES) {
  const ctx = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    deviceScaleFactor: d.dsf,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  for (const label of TABS) {
    const btn = page.getByRole('button', { name: label, exact: false }).first();
    try {
      await btn.click({ timeout: 4000 });
      await page.waitForTimeout(700);
    } catch {
      console.log(`  ! could not click ${label} on ${d.name}`);
    }
    const file = `${OUT}/${d.name}-${label.replace(/\W/g, '')}.png`;
    await page.screenshot({ path: file });
    console.log('shot', file);
  }
  await ctx.close();
}

await browser.close();
console.log('done');
