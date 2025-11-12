const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('=== TESTING ACTUAL FUNCTIONALITY ===\n');

  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  // Test 1: Click "Use Template" button
  console.log('Test 1: Clicking "Use Template" button...');
  const useTemplateButton = page.getByRole('button', { name: /use template/i }).first();
  await useTemplateButton.click();
  await page.waitForTimeout(2000);

  const currentUrl = page.url();
  console.log(`  Current URL: ${currentUrl}`);
  console.log(`  Expected: Should redirect to /editor/[id]`);

  if (currentUrl.includes('/editor/')) {
    console.log('  ✓ PASS: Navigated to editor\n');

    // Take screenshot of editor
    await page.screenshot({ path: '/tmp/editor.png', fullPage: true });

    // Check if editor has any content
    const editorContent = await page.textContent('body');
    console.log('Test 2: Editor page content...');
    console.log(`  Body text length: ${editorContent.length} chars`);

    // Look for specific editor elements
    const hasIframe = await page.locator('iframe').count() > 0;
    const hasCodeEditor = await page.locator('[class*="editor"]').count() > 0;
    console.log(`  Has iframe: ${hasIframe}`);
    console.log(`  Has editor elements: ${hasCodeEditor}\n`);
  } else {
    console.log('  ✗ FAIL: Did not navigate to editor\n');
  }

  // Go back to homepage
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  // Test 3: Try category filtering
  console.log('Test 3: Testing category filter...');
  const businessButton = page.getByRole('button', { name: /💼 business/i });
  await businessButton.click();
  await page.waitForTimeout(500);

  const portfolioVisible = await page.getByText('Portfolio').first().isVisible().catch(() => false);
  console.log(`  Portfolio visible after Business filter: ${portfolioVisible}`);
  console.log(`  Expected: false (should be hidden)\n`);

  // Test 4: Check Preview button
  console.log('Test 4: Testing Preview button...');
  const previewButton = page.getByRole('button', { name: /preview/i }).first();

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 3000 }).catch(() => null),
    previewButton.click()
  ]);

  if (newPage) {
    console.log(`  ✓ New tab opened: ${newPage.url()}`);
    await newPage.screenshot({ path: '/tmp/preview.png', fullPage: true });
    await newPage.close();
  } else {
    console.log('  ✗ No new tab opened\n');
  }

  await page.screenshot({ path: '/tmp/final-state.png', fullPage: true });

  console.log('\n=== TEST COMPLETE ===');
  console.log('Screenshots saved:');
  console.log('  - /tmp/homepage.png');
  console.log('  - /tmp/editor.png');
  console.log('  - /tmp/preview.png (if preview worked)');
  console.log('  - /tmp/final-state.png');

  await page.waitForTimeout(3000);
  await browser.close();
})();
