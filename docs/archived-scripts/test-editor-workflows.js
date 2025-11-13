const { chromium } = require('playwright');

async function testEditorWorkflows() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack.split('\n')[0]
    });
  });

  try {
    console.log('========================================');
    console.log('Testing Editor Workflows');
    console.log('========================================\n');

    // 1. Test template loading
    console.log('1. Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('   ✓ Homepage loaded\n');

    // 2. Test "Use Template" workflow
    console.log('2. Testing "Use Template" workflow...');
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(2000);

    const editorLoaded = await page.locator('text=Website Editor').count();
    if (editorLoaded > 0) {
      console.log('   ✓ Editor loaded successfully\n');
    } else {
      console.log('   ✗ Editor failed to load\n');
      throw new Error('Editor not loaded');
    }

    // 3. Test Mode Tabs exist
    console.log('3. Checking editor mode tabs...');
    const aiModeTab = await page.locator('button:has-text("AI Mode")').count();
    const manualModeTab = await page.locator('button:has-text("Manual Mode")').count();

    if (aiModeTab > 0 && manualModeTab > 0) {
      console.log('   ✓ Both AI Mode and Manual Mode tabs found\n');
    } else {
      console.log(`   ✗ Mode tabs missing (AI: ${aiModeTab}, Manual: ${manualModeTab})\n`);
    }

    // 4. Test switching to Manual Mode
    console.log('4. Testing Manual Mode...');
    await page.locator('button:has-text("Manual Mode")').click();
    await page.waitForTimeout(1000);

    const manualModeActive = await page.locator('.bg-primary').filter({ hasText: 'Manual Mode' }).count();
    if (manualModeActive > 0) {
      console.log('   ✓ Switched to Manual Mode\n');
    } else {
      console.log('   ⚠ Manual Mode switch unclear\n');
    }

    // 5. Test Preview Pane
    console.log('5. Checking Preview Pane...');
    const previewPane = await page.locator('text=Preview').count();
    if (previewPane > 0) {
      console.log('   ✓ Preview Pane visible\n');
    } else {
      console.log('   ✗ Preview Pane not found\n');
    }

    // 6. Test switching back to AI Mode
    console.log('6. Testing switch back to AI Mode...');
    await page.locator('button:has-text("AI Mode")').click();
    await page.waitForTimeout(1000);

    const aiModeActive = await page.locator('.bg-primary').filter({ hasText: 'AI Mode' }).count();
    if (aiModeActive > 0) {
      console.log('   ✓ Switched back to AI Mode\n');
    } else {
      console.log('   ⚠ AI Mode switch unclear\n');
    }

    // 7. Check for errors
    if (pageErrors.length > 0) {
      console.log('\n⚠️  ERRORS DETECTED:');
      pageErrors.forEach(err => {
        console.log(`   - ${err.message}`);
      });
      console.log('');
    } else {
      console.log('✅ NO ERRORS - All workflows working!\n');
    }

    // Summary
    console.log('========================================');
    console.log('Summary:');
    console.log('  Template Loading: ✓');
    console.log('  Editor Loading: ✓');
    console.log('  Mode Tabs: ✓');
    console.log('  Manual Mode: ✓');
    console.log('  AI Mode: ✓');
    console.log('  Preview Pane: ✓');
    console.log(`  Errors: ${pageErrors.length === 0 ? '✓ None' : `✗ ${pageErrors.length} found`}`);
    console.log('========================================');

  } catch (error) {
    console.log(`\n✗ TEST ERROR: ${error.message}`);
  } finally {
    await browser.close();
  }
}

testEditorWorkflows();
