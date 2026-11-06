import { chromium } from '/tmp/bunx-0-playwright@latest/node_modules/playwright/index.mjs';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    executablePath: '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  // 1. Desktop context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();

  console.log('Navigating to V4 Concept A...');
  await page.goto('http://localhost:3000/#/v4-a', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/evidence/v4_concept_a_desktop_1440x960.png' });
  console.log('Captured v4_concept_a_desktop_1440x960.png');

  // Navigate to Builder step in Concept A
  const builderBtnA = page.locator('button:has-text("Kreator")').first();
  if (await builderBtnA.count()) {
    await builderBtnA.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'public/evidence/v4_concept_a_builder_1440x960.png' });
    console.log('Captured v4_concept_a_builder_1440x960.png');
  }

  // Navigate to V4 Concept B
  console.log('Navigating to V4 Concept B...');
  await page.goto('http://localhost:3000/#/v4-b', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/evidence/v4_concept_b_desktop_1440x960.png' });
  console.log('Captured v4_concept_b_desktop_1440x960.png');

  // Navigate to V4 Concept C
  console.log('Navigating to V4 Concept C...');
  await page.goto('http://localhost:3000/#/v4-c', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/evidence/v4_concept_c_desktop_1440x960.png' });
  console.log('Captured v4_concept_c_desktop_1440x960.png');

  // Open Comparison Matrix Modal
  console.log('Opening Comparison Modal...');
  const matrixBtn = page.locator('button:has-text("Porównaj Koncepcje")').first();
  if (await matrixBtn.count()) {
    await matrixBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'public/evidence/v4_comparison_matrix_1440x960.png' });
    console.log('Captured v4_comparison_matrix_1440x960.png');
  }

  await desktopContext.close();

  // 2. Mobile 390x844 context
  console.log('Capturing mobile viewports (390x844)...');
  const mobile390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page390 = await mobile390.newPage();
  await page390.goto('http://localhost:3000/#/v4-a', { waitUntil: 'networkidle' });
  await page390.waitForTimeout(800);
  await page390.screenshot({ path: 'public/evidence/v4_concept_a_mobile_390x844.png' });

  await page390.goto('http://localhost:3000/#/v4-c', { waitUntil: 'networkidle' });
  await page390.waitForTimeout(800);
  await page390.screenshot({ path: 'public/evidence/v4_concept_c_mobile_390x844.png' });
  await mobile390.close();

  // 3. Mobile 360x800 context
  console.log('Capturing mobile viewports (360x800)...');
  const mobile360 = await browser.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page360 = await mobile360.newPage();
  await page360.goto('http://localhost:3000/#/v4-c', { waitUntil: 'networkidle' });
  await page360.waitForTimeout(800);
  await page360.screenshot({ path: 'public/evidence/v4_concept_c_mobile_360x800.png' });
  await mobile360.close();

  // 4. Mobile 430x932 context
  console.log('Capturing mobile viewports (430x932)...');
  const mobile430 = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page430 = await mobile430.newPage();
  await page430.goto('http://localhost:3000/#/v4-c', { waitUntil: 'networkidle' });
  await page430.waitForTimeout(800);
  await page430.screenshot({ path: 'public/evidence/v4_concept_c_mobile_430x932.png' });
  await mobile430.close();

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
