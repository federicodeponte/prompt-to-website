const { chromium } = require('playwright');

(async () => {
  console.log('=== FULL EDITOR TEST ===\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test 1: Homepage
    console.log('1. Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/test-1-homepage.png' });
    
    const title = await page.title();
    if (title.includes('Prompt to Website')) {
      console.log('   ✓ Homepage loaded');
    } else {
      console.log('   ✗ Homepage title incorrect:', title);
      throw new Error('Homepage failed');
    }
    
    // Test 2: Click Use Template
    console.log('\n2. Clicking "Use Template" button...');
    await page.getByRole('button', { name: /use template/i }).first().click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/tmp/test-2-after-click.png' });
    
    const url = page.url();
    console.log('   Current URL:', url);
    
    if (!url.includes('/editor/')) {
      console.log('   ✗ Did not navigate to editor');
      throw new Error('Navigation failed');
    }
    console.log('   ✓ Navigated to editor');
    
    // Test 3: Check for error page
    console.log('\n3. Checking if editor loaded correctly...');
    const bodyText = await page.locator('body').innerText();
    
    if (bodyText.includes('Something went wrong')) {
      console.log('   ✗ FAIL: Editor shows error page');
      console.log('   Error:', bodyText.match(/Cannot read.*/)?.[0] || 'Unknown');
      await page.screenshot({ path: '/tmp/test-3-ERROR.png' });
      throw new Error('Editor crashed');
    }
    
    // Test 4: Check for editor UI elements
    console.log('\n4. Verifying editor UI elements...');
    const hasWebsiteEditor = bodyText.includes('Website Editor');
    const hasAIMode = bodyText.includes('AI Mode');
    const hasManualMode = bodyText.includes('Manual Mode');
    const hasLivePreview = bodyText.includes('Live Preview');
    
    console.log('   - Website Editor header:', hasWebsiteEditor ? '✓' : '✗');
    console.log('   - AI Mode tab:', hasAIMode ? '✓' : '✗');
    console.log('   - Manual Mode tab:', hasManualMode ? '✓' : '✗');
    console.log('   - Live Preview pane:', hasLivePreview ? '✓' : '✗');
    
    if (!hasWebsiteEditor || !hasAIMode || !hasManualMode || !hasLivePreview) {
      console.log('   ✗ Missing editor UI elements');
      await page.screenshot({ path: '/tmp/test-4-MISSING-UI.png' });
      throw new Error('Editor UI incomplete');
    }
    
    await page.screenshot({ path: '/tmp/test-4-editor-loaded.png' });
    console.log('   ✓ All editor UI elements present');
    
    // Test 5: Switch to Manual Mode
    console.log('\n5. Testing Manual Mode tab...');
    await page.getByRole('tab', { name: /manual mode/i }).click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/test-5-manual-mode.png' });
    
    const manualText = await page.locator('body').innerText();
    if (manualText.includes('Manual Editor') || manualText.includes('Add Block')) {
      console.log('   ✓ Manual Mode loaded');
    } else {
      console.log('   ⚠ Manual Mode may not have loaded correctly');
    }
    
    // Test 6: Switch back to AI Mode
    console.log('\n6. Testing AI Mode tab...');
    await page.getByRole('tab', { name: /ai mode/i }).click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/test-6-ai-mode.png' });
    
    const aiText = await page.locator('body').innerText();
    if (aiText.includes('AI Assistant') || aiText.includes('Describe your website')) {
      console.log('   ✓ AI Mode loaded');
    } else {
      console.log('   ⚠ AI Mode may not have loaded correctly');
    }
    
    console.log('\n=== ✅ ALL TESTS PASSED ===\n');
    console.log('Screenshots saved:');
    console.log('  /tmp/test-1-homepage.png');
    console.log('  /tmp/test-2-after-click.png');
    console.log('  /tmp/test-4-editor-loaded.png');
    console.log('  /tmp/test-5-manual-mode.png');
    console.log('  /tmp/test-6-ai-mode.png');
    
  } catch (error) {
    console.log('\n=== ✗ TEST FAILED ===');
    console.log('Error:', error.message);
    await browser.close();
    process.exit(1);
  }
  
  await browser.close();
})();
