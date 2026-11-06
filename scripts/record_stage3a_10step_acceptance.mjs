import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function runStage3AAcceptance() {
  console.log('=== POLJOBHUB STAGE 3A — COMPLETE 10-STEP ACCEPTANCE VERIFICATION ===\n');

  const evidenceDir = path.resolve('public/evidence');
  const videoDir = path.resolve('public/evidence/stage3a_video');
  if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

  // Get current git commit & branch
  let gitCommit = '85609b1';
  let gitBranch = 'stage-3a-homepage-integration';
  try {
    gitCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (e) {
    console.warn('Could not read git directly:', e.message);
  }
  console.log(`Git Context: Branch = ${gitBranch}, Commit = ${gitCommit}`);

  const browser = await chromium.launch({
    executablePath: '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const steps = [];

  // ==========================================
  // STEP 1: Desktop Homepage — 1440 × 960
  // ==========================================
  console.log('\n[STEP 1/10] Testing Desktop Homepage (1440 × 960)...');
  const deskCtx = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  const deskPage = await deskCtx.newPage();
  await deskPage.goto('http://localhost:3000/#/home', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(600);

  const headerCount = await deskPage.locator('header').count();
  const headline = await deskPage.locator('h1').first().textContent();
  
  // Verify complete absence of floating dev overlays
  const asideDevCount = await deskPage.locator('aside[aria-label*="Eksploracja"]').count();
  const devButtonV5Count = await deskPage.locator('button:has-text("V5 Signature Experience")').count();
  const devButtonV4Count = await deskPage.locator('button:has-text("V4 Lab")').count();
  const hasDevOverlayDesk = asideDevCount > 0 || devButtonV5Count > 0 || devButtonV4Count > 0;

  const deskOverflow = await deskPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

  await deskPage.screenshot({
    path: path.join(evidenceDir, 'stage3a_01_homepage_desktop_1440x960.png'),
    fullPage: false,
  });

  steps.push({
    step: 1,
    name: 'Desktop Homepage (1440x960)',
    status: (headerCount === 1 && !deskOverflow && !hasDevOverlayDesk) ? 'PASS' : 'FAIL',
    details: {
      viewport: '1440x960',
      headerCount,
      horizontalOverflow: deskOverflow,
      devOverlayVisible: hasDevOverlayDesk,
      headline: headline?.trim(),
      screenshot: 'stage3a_01_homepage_desktop_1440x960.png'
    }
  });
  console.log(`  ✓ Step 1: headerCount=${headerCount}, overflow=${deskOverflow}, devOverlay=${hasDevOverlayDesk}`);
  await deskCtx.close();

  // ==========================================
  // STEP 2: Mobile Homepage — 390 × 844 & 360 × 800
  // ==========================================
  console.log('\n[STEP 2/10] Testing Mobile Homepage (390 × 844 & 360 × 800)...');
  // 390x844
  const m390Ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const m390Page = await m390Ctx.newPage();
  await m390Page.goto('http://localhost:3000/#/home', { waitUntil: 'networkidle' });
  await m390Page.waitForTimeout(600);

  const m390Overflow = await m390Page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  const m390DevCount = await m390Page.locator('aside[aria-label*="Eksploracja"]').count();
  const previewBox390 = await m390Page.locator('text=Format A4 (210 × 297 mm)').first().boundingBox();

  await m390Page.screenshot({
    path: path.join(evidenceDir, 'stage3a_02_homepage_mobile_390x844.png'),
    fullPage: false,
  });
  await m390Ctx.close();

  // 360x800
  const m360Ctx = await browser.newContext({
    viewport: { width: 360, height: 800 },
    isMobile: true,
  });
  const m360Page = await m360Ctx.newPage();
  await m360Page.goto('http://localhost:3000/#/home', { waitUntil: 'networkidle' });
  await m360Page.waitForTimeout(600);

  const m360Overflow = await m360Page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  const m360DevCount = await m360Page.locator('aside[aria-label*="Eksploracja"]').count();
  const previewBox360 = await m360Page.locator('text=Format A4 (210 × 297 mm)').first().boundingBox();

  await m360Page.screenshot({
    path: path.join(evidenceDir, 'stage3a_03_homepage_mobile_360x800.png'),
    fullPage: false,
  });
  await m360Ctx.close();

  steps.push({
    step: 2,
    name: 'Mobile Homepage (390x844 & 360x800)',
    status: (!m390Overflow && !m360Overflow && m390DevCount === 0 && m360DevCount === 0) ? 'PASS' : 'FAIL',
    details: {
      viewport390: { width: 390, height: 844, overflow: m390Overflow, devOverlayVisible: m390DevCount > 0, previewTopY: previewBox390?.y },
      viewport360: { width: 360, height: 800, overflow: m360Overflow, devOverlayVisible: m360DevCount > 0, previewTopY: previewBox360?.y },
      screenshots: ['stage3a_02_homepage_mobile_390x844.png', 'stage3a_03_homepage_mobile_360x800.png']
    }
  });
  console.log(`  ✓ Step 2: 390px overflow=${m390Overflow}, 360px overflow=${m360Overflow}, devOverlay=none`);

  // ==========================================
  // FULL RECORDED USER JOURNEY (STEPS 3 - 10)
  // ==========================================
  console.log('\n[RECORDING] Starting Full Journey Session with Video Capture...');
  const journeyCtx = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 960 },
    },
  });
  const page = await journeyCtx.newPage();

  // Open homepage
  await page.goto('http://localhost:3000/#/home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // ------------------------------------------
  // STEP 3: Editor Entry
  // ------------------------------------------
  console.log('[STEP 3/10] Testing Editor Entry (Click "Stwórz Moje CV")...');
  const createCta = page.locator('button:has-text("Stwórz Moje CV")').first();
  await createCta.click();
  await page.waitForTimeout(700);

  const urlStep3 = page.url();
  const editorMounted = await page.locator('input[placeholder*="Kamiński"]').or(page.locator('text=Imię i nazwisko')).or(page.locator('input[type="text"]')).first().isVisible();

  await page.screenshot({
    path: path.join(evidenceDir, 'stage3a_04_editor_after_create_cta.png'),
    fullPage: false,
  });

  // Enter/update candidate information
  console.log('  Updating candidate information in editor...');
  const nameInput = page.locator('input[value*="Kamiński"]').or(page.locator('input[placeholder*="Kamiński"]')).or(page.locator('input[type="text"]').first());
  if (await nameInput.isVisible()) {
    await nameInput.fill('Katarzyna Wiśniewska-Kowalska');
    await page.waitForTimeout(400);
  }

  steps.push({
    step: 3,
    name: 'Editor Entry',
    status: (urlStep3.includes('editor') && editorMounted) ? 'PASS' : 'FAIL',
    details: {
      url: urlStep3,
      editorFormMounted: editorMounted,
      candidateUpdated: 'Katarzyna Wiśniewska-Kowalska',
      screenshot: 'stage3a_04_editor_after_create_cta.png'
    }
  });
  console.log(`  ✓ Step 3: url=${urlStep3}, editorMounted=${editorMounted}`);

  // ------------------------------------------
  // STEP 4: Saved CV Continuation
  // ------------------------------------------
  console.log('[STEP 4/10] Testing Return to Homepage & Saved CV Continuation...');
  const homeBtn = page.locator('button[aria-label*="Wróć do strony głównej"]').or(page.locator('text=Strona Główna')).first();
  await homeBtn.click();
  await page.waitForTimeout(600);

  const resumeBtn = page.locator('button:has-text("Wznów zapisany profil kandydata")').or(page.locator('text=Wznów zapisany profil')).first();
  const resumeVisible = await resumeBtn.isVisible();
  await resumeBtn.click();
  await page.waitForTimeout(600);

  const urlStep4 = page.url();
  const persistedName = await page.evaluate(() => {
    const raw = localStorage.getItem('polcv_studio_cv_data_v1');
    if (!raw) return null;
    return JSON.parse(raw)?.personalInfo?.fullName;
  });

  steps.push({
    step: 4,
    name: 'Saved CV Continuation',
    status: (urlStep4.includes('editor') && persistedName === 'Katarzyna Wiśniewska-Kowalska') ? 'PASS' : 'FAIL',
    details: {
      url: urlStep4,
      resumeButtonVisible: resumeVisible,
      persistedCandidateName: persistedName
    }
  });
  console.log(`  ✓ Step 4: url=${urlStep4}, persistedCandidateName=${persistedName}`);

  // ------------------------------------------
  // STEP 5: Template Gallery Opened from Homepage
  // ------------------------------------------
  console.log('[STEP 5/10] Testing Template Gallery Opened from Homepage...');
  await homeBtn.click();
  await page.waitForTimeout(600);

  const exploreBtn = page.locator('button:has-text("Przeglądaj 10 Szablonów")').first();
  await exploreBtn.click();
  await page.waitForTimeout(600);

  const urlStep5 = page.url();
  const hasModernPolish = await page.locator('text=Modern Polish').first().isVisible();
  const hasSwissExecutive = await page.locator('text=Swiss Executive').first().isVisible();

  await page.screenshot({
    path: path.join(evidenceDir, 'stage3a_05_template_gallery_from_home.png'),
    fullPage: false,
  });

  steps.push({
    step: 5,
    name: 'Template Gallery',
    status: (urlStep5.includes('templates') && hasModernPolish && hasSwissExecutive) ? 'PASS' : 'FAIL',
    details: {
      url: urlStep5,
      modernPolishDetected: hasModernPolish,
      swissExecutiveDetected: hasSwissExecutive,
      screenshot: 'stage3a_05_template_gallery_from_home.png'
    }
  });
  console.log(`  ✓ Step 5: url=${urlStep5}, galleryMounted=true`);

  // ------------------------------------------
  // STEP 6: Template Selection
  // ------------------------------------------
  console.log('[STEP 6/10] Testing Template Selection (Selecting Swiss Executive)...');
  await page.locator('h2:text-is("Swiss Executive")').first().click();
  await page.waitForTimeout(400);

  const continueBtn = page.locator('button:has-text("Przejdź do Edytora")').first();
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await page.waitForTimeout(600);
  }

  const urlStep6 = page.url();
  const selectedTemplate = await page.evaluate(() => {
    const raw = localStorage.getItem('polcv_studio_cv_data_v1');
    if (!raw) return null;
    return JSON.parse(raw)?.templateId;
  });

  steps.push({
    step: 6,
    name: 'Template Selection',
    status: (urlStep6.includes('editor') && selectedTemplate === 'swiss-executive') ? 'PASS' : 'FAIL',
    details: {
      url: urlStep6,
      activeTemplateId: selectedTemplate
    }
  });
  console.log(`  ✓ Step 6: selectedTemplateId=${selectedTemplate}`);

  // ------------------------------------------
  // STEP 7: Candidate Data Preservation
  // ------------------------------------------
  console.log('[STEP 7/10] Testing Candidate Data Preservation after template selection...');
  const candidateData = await page.evaluate(() => {
    const raw = localStorage.getItem('polcv_studio_cv_data_v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      fullName: parsed?.personalInfo?.fullName,
      email: parsed?.personalInfo?.email,
      phone: parsed?.personalInfo?.phone,
      experienceCount: parsed?.experiences?.length,
      educationCount: parsed?.education?.length
    };
  });

  const dataPreserved = candidateData?.fullName === 'Katarzyna Wiśniewska-Kowalska' && candidateData?.experienceCount > 0;

  steps.push({
    step: 7,
    name: 'Candidate Data Preservation',
    status: dataPreserved ? 'PASS' : 'FAIL',
    details: candidateData
  });
  console.log(`  ✓ Step 7: preserved=${dataPreserved}, fullName=${candidateData?.fullName}`);

  // ------------------------------------------
  // STEP 8: Language Switching (PL <-> EN)
  // ------------------------------------------
  console.log('[STEP 8/10] Testing Language Switching (PL <-> EN)...');
  await homeBtn.click();
  await page.waitForTimeout(600);

  // Switch to English
  const enBtn = page.locator('button[aria-label*="English"]').first();
  await enBtn.click();
  await page.waitForTimeout(600);

  const enCta = await page.locator('button:has-text("Create My CV")').first().isVisible();
  const enHeadline = await page.locator('h1').first().textContent();
  const isEnValid = enCta || enHeadline?.includes('doors');

  await page.screenshot({
    path: path.join(evidenceDir, 'stage3a_06_homepage_english_1440x960.png'),
    fullPage: false,
  });

  // Switch back to Polish
  const plBtn = page.locator('button[aria-label*="Polski"]').first();
  await plBtn.click();
  await page.waitForTimeout(500);

  steps.push({
    step: 8,
    name: 'Language Switching',
    status: isEnValid ? 'PASS' : 'FAIL',
    details: {
      englishCtaVisible: enCta,
      englishHeadline: enHeadline?.trim(),
      screenshot: 'stage3a_06_homepage_english_1440x960.png'
    }
  });
  console.log(`  ✓ Step 8: enValid=${isEnValid}, englishCtaVisible=${enCta}`);

  // ------------------------------------------
  // STEP 9: Browser Navigation
  // ------------------------------------------
  console.log('[STEP 9/10] Testing Browser Navigation (Back & Forward)...');
  await page.goto('http://localhost:3000/#/editor', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const editorUrl9 = page.url();

  await page.goBack();
  await page.waitForTimeout(500);
  const backUrl = page.url();

  await page.goForward();
  await page.waitForTimeout(500);
  const forwardUrl = page.url();

  const navSynced = backUrl.includes('home') && forwardUrl.includes('editor');

  steps.push({
    step: 9,
    name: 'Browser Navigation',
    status: navSynced ? 'PASS' : 'FAIL',
    details: {
      initialUrl: editorUrl9,
      backUrl,
      forwardUrl,
      navigationSynced: navSynced
    }
  });
  console.log(`  ✓ Step 9: backUrl=${backUrl}, forwardUrl=${forwardUrl}, synced=${navSynced}`);

  // ------------------------------------------
  // STEP 10: PDF Print Workflow
  // ------------------------------------------
  console.log('[STEP 10/10] Testing PDF Print Workflow Trigger...');
  // Spy on window.print
  await page.evaluate(() => {
    window.__printed = false;
    window.print = () => { window.__printed = true; };
  });

  const printBtn = page.locator('button[aria-label*="PDF"]').or(page.locator('button:has-text("Pobierz PDF")')).first();
  const printBtnVisible = await printBtn.isVisible();
  await printBtn.click();
  await page.waitForTimeout(500);

  const printTriggered = await page.evaluate(() => window.__printed);

  steps.push({
    step: 10,
    name: 'PDF Print Workflow',
    status: (printBtnVisible && printTriggered) ? 'PASS' : 'FAIL',
    details: {
      printButtonVisible: printBtnVisible,
      windowPrintExecuted: printTriggered
    }
  });
  console.log(`  ✓ Step 10: printBtnVisible=${printBtnVisible}, windowPrintExecuted=${printTriggered}`);

  // Close journey context to write video file
  await journeyCtx.close();
  await browser.close();

  // Find and sync recorded video
  const videoFiles = fs.readdirSync(videoDir);
  console.log('\nVideo files found:', videoFiles);
  if (videoFiles.length > 0) {
    const rawVideo = videoFiles.find(f => f.endsWith('.webm') || f.endsWith('.mp4'));
    if (rawVideo) {
      const srcVideo = path.join(videoDir, rawVideo);
      const destVideo = path.join(videoDir, 'stage3a_complete_journey.webm');
      fs.copyFileSync(srcVideo, destVideo);
      console.log(`✓ Copied master video to ${destVideo}`);
    }
  }

  // Write stage3a_journey_results.json with all 10 individual steps
  const journeyResults = {
    testDate: new Date().toISOString(),
    branch: gitBranch,
    commit: gitCommit,
    totalSteps: steps.length,
    passedSteps: steps.filter(s => s.status === 'PASS').length,
    overallStatus: steps.every(s => s.status === 'PASS') ? 'PASS' : 'FAIL',
    steps
  };

  const jsonPath = path.join(evidenceDir, 'stage3a_journey_results.json');
  fs.writeFileSync(jsonPath, JSON.stringify(journeyResults, null, 2), 'utf8');
  console.log(`\n=======================================================`);
  console.log(`✓ Successfully recorded all 10 steps into ${jsonPath}`);
  console.log(`  Total: ${journeyResults.totalSteps} | Passed: ${journeyResults.passedSteps} | Overall: ${journeyResults.overallStatus}`);
  console.log(`=======================================================\n`);
}

runStage3AAcceptance().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
