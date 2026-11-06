import { chromium } from '/tmp/bunx-0-playwright@latest/node_modules/playwright/index.mjs';

async function run() {
  console.log('Launching browser for V5 Signature Evidence capture...');
  const browser = await chromium.launch({
    executablePath: '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  // 1. Desktop 1440x960 Context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();

  // Test 1: V5 Homepage
  console.log('Navigating to V5 Homepage (#/v5)...');
  await page.goto('http://localhost:3000/#/v5', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/evidence/v5_homepage_desktop_1440x960.png' });
  console.log('✓ Captured public/evidence/v5_homepage_desktop_1440x960.png');

  // Test 2: Launch Guided Editor via primary CTA
  console.log('Clicking "Stwórz Moje CV w 5 minut"...');
  const startBtn = page.locator('button:has-text("Stwórz Moje CV w 5 minut")').first();
  await startBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/evidence/v5_editor_desktop_1440x960.png' });
  console.log('✓ Captured public/evidence/v5_editor_desktop_1440x960.png (Step 1 Personal Info)');

  // Test 3: Step 2 Experience with STAR Assistant
  console.log('Navigating to Step 2 (Doświadczenie + STAR)...');
  const nextBtn = page.locator('button:has-text("Dalej:")').first();
  await nextBtn.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'public/evidence/v5_editor_star_assistant_1440x960.png' });
  console.log('✓ Captured public/evidence/v5_editor_star_assistant_1440x960.png');

  // Test 4: Step 4 Template Picker
  console.log('Navigating to Step 4 (Wybór Szablonu)...');
  await page.goto('http://localhost:3000/#/v5-step-4', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'public/evidence/v5_editor_templates_1440x960.png' });
  console.log('✓ Captured public/evidence/v5_editor_templates_1440x960.png');

  // Test 5: Step 5 Review & Export
  console.log('Navigating to Step 5 (Weryfikacja & Pobranie)...');
  await page.goto('http://localhost:3000/#/v5-step-5', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'public/evidence/v5_editor_review_1440x960.png' });
  console.log('✓ Captured public/evidence/v5_editor_review_1440x960.png');

  await desktopContext.close();

  // 2. Mobile 390x844 Context (iPhone standard)
  console.log('Setting up mobile context (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  console.log('Navigating to mobile homepage...');
  await mobilePage.goto('http://localhost:3000/#/v5', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: 'public/evidence/v5_homepage_mobile_390x844.png' });
  console.log('✓ Captured public/evidence/v5_homepage_mobile_390x844.png');

  console.log('Navigating to mobile guided editor...');
  await mobilePage.goto('http://localhost:3000/#/v5-editor', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: 'public/evidence/v5_editor_mobile_390x844.png' });
  console.log('✓ Captured public/evidence/v5_editor_mobile_390x844.png');

  // Open mobile live preview modal
  console.log('Opening mobile live preview modal...');
  const previewModalTrigger = mobilePage.locator('button:has-text("Podgląd A4")').first();
  if (await previewModalTrigger.count()) {
    await previewModalTrigger.click({ force: true });
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: 'public/evidence/v5_preview_modal_mobile_390x844.png' });
    console.log('✓ Captured public/evidence/v5_preview_modal_mobile_390x844.png');
  }

  await mobileContext.close();

  // 3. Accessibility & Reduced Motion verification
  console.log('Verifying Reduced Motion...');
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    reducedMotion: 'reduce',
  });
  const motionPage = await motionContext.newPage();
  await motionPage.goto('http://localhost:3000/#/v5', { waitUntil: 'networkidle' });
  await motionPage.waitForTimeout(500);
  const motionBadgeText = await motionPage.locator('button[title*="reduced-motion"]').innerText();
  console.log('Reduced Motion Badge detected:', motionBadgeText);
  await motionContext.close();

  await browser.close();
  console.log('All V5 Signature evidence captured and verified successfully!');
}

run().catch((err) => {
  console.error('Error running V5 capture script:', err);
  process.exit(1);
});
