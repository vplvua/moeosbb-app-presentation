/*
 * Генерує скриншоти екранів додатку з дизайн-канвасів у public/screens/.
 *
 * Використання:
 *   1. cd ../../moeosbb-mobile-app/docs/design/canvases && python3 -m http.server 8931
 *   2. node scripts/capture-screens.mjs
 */
import { chromium } from 'playwright-chromium';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const BASE = 'http://127.0.0.1:8931';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'screens');
mkdirSync(OUT, { recursive: true });

// canvas file → screen ids (id="1a" тощо в *.dc.html)
const SHOTS = {
  'home': ['1a', '1b', '1c'],
  'feeds': ['1a', '1c'],
  'services': ['1a', '1c'],
  'chats': ['1a', '1b', '1d', '1e'],
  'profile': ['1a', '1e'],
  'payment-flow': ['1b', '1e'],
  'balance-history': ['1a', '1c'],
  'indicators': ['1a', '1d'],
  'reporting': ['1a', '1e', '1f'],
  'orders': ['1a', '1d'],
  'vote': ['1b', '1c', '1g'],
  'neighbors': ['1a', '1b', '1d'],
  'hepl-and-contacts': ['1a', '1c'],
  'documents': ['1a', '1c'],
  'enter': ['1a'],
  'poll': ['1d'],
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });

for (const [file, ids] of Object.entries(SHOTS)) {
  await page.goto(`${BASE}/${file}.dc.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  for (const id of ids) {
    const el = page.locator(`[id="${id}"] [data-screen-label]`).first();
    try {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await el.screenshot({ path: `${OUT}/${file}-${id}.png` });
      console.log(`ok ${file}-${id}`);
    } catch (e) {
      console.error(`FAIL ${file}-${id}: ${e.message.split('\n')[0]}`);
    }
  }
}
await browser.close();
