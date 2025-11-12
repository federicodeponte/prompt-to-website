const { chromium } = require('playwright');

async function testEditor() {
  console.log('=== EDITOR VERIFICATION TEST ===\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Test 1: Homepage loads
    console.log('1. Testing homepage...');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    const title = await page.title();
    console.log(`   ✓ Page loaded: ${title}\n`);

    // Test 2: Find and click "Use Template" button
    console.log('2. Finding "Use Template" button...');
    const useTemplateButton = page.locator('button:has-text("Use Template")').first();
    const buttonExists = await useTemplateButton.count() > 0;

    if (!buttonExists) {
      console.log('   ✗ "Use Template" button not found');
      console.log('   Searching for alternative buttons...');
      const allButtons = await page.locator('button').allTextContents();
      console.log('   Available buttons:', allButtons);
      throw new Error('Use Template button not found');
    }

    console.log('   ✓ Button found, clicking...\n');
    await useTemplateButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Give time for editor to render

    // Test 3: Check for error page
    console.log('3. Checking for error page...');
    const errorHeading = page.locator('text=Something went wrong');
    const hasError = await errorHeading.count() > 0;

    if (hasError) {
      const errorText = await page.locator('body').textContent();
      console.log('   ✗ ERROR PAGE DETECTED:');
      console.log(errorText);
      throw new Error('Editor crashed with error page');
    }

    console.log('   ✓ No error page detected\n');

    // Test 4: Verify editor UI elements
    console.log('4. Verifying editor UI elements...');

    const websiteEditorHeading = page.locator('text=Website Editor');
    const aiModeTab = page.locator('button:has-text("AI Mode")');
    const manualModeTab = page.locator('button:has-text("Manual Mode")');
    const livePreview = page.locator('text=Live Preview');

    const checks = [
      { name: 'Website Editor heading', locator: websiteEditorHeading },
      { name: 'AI Mode tab', locator: aiModeTab },
      { name: 'Manual Mode tab', locator: manualModeTab },
      { name: 'Live Preview pane', locator: livePreview }
    ];

    for (const check of checks) {
      const exists = await check.locator.count() > 0;
      if (!exists) {
        console.log(`   ✗ Missing: ${check.name}`);
        throw new Error(`${check.name} not found`);
      }
      console.log(`   ✓ ${check.name} present`);
    }

    console.log();

    // Test 5: Test tab switching
    console.log('5. Testing tab switching...');

    // Click Manual Mode
    console.log('   Clicking Manual Mode tab...');
    await manualModeTab.click();
    await page.waitForTimeout(500);
    const manualEditor = page.locator('text=Manual Editor');
    const manualEditorVisible = await manualEditor.count() > 0;

    if (!manualEditorVisible) {
      console.log('   ✗ Manual Mode panel not visible');
      throw new Error('Manual Mode panel failed to display');
    }
    console.log('   ✓ Manual Mode panel visible');

    // Click AI Mode
    console.log('   Clicking AI Mode tab...');
    await aiModeTab.click();
    await page.waitForTimeout(500);
    const aiAssistant = page.locator('text=AI Assistant');
    const aiAssistantVisible = await aiAssistant.count() > 0;

    if (!aiAssistantVisible) {
      console.log('   ✗ AI Mode panel not visible');
      throw new Error('AI Mode panel failed to display');
    }
    console.log('   ✓ AI Mode panel visible\n');

    // Test 6: Take screenshot for visual verification
    console.log('6. Taking screenshot for visual verification...');
    await page.screenshot({ path: '/tmp/editor-verification.png', fullPage: true });
    console.log('   ✓ Screenshot saved to /tmp/editor-verification.png\n');

    console.log('=== ✓ ALL TESTS PASSED ===');
    console.log('Editor is working correctly! All UI elements present and functional.');

  } catch (error) {
    console.log('\n=== ✗ TEST FAILED ===');
    console.log('Error:', error.message);
    await page.screenshot({ path: '/tmp/error-screenshot.png' });
    console.log('Error screenshot saved to /tmp/error-screenshot.png');
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testEditor();
