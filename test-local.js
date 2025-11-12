const { chromium } = require('playwright');

async function testLocal() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
  });

  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  try {
    console.log('Testing local dev server...\n');

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✓ Homepage loaded\n');

    console.log('Clicking Use Template button...');
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(5000);

    const currentURL = page.url();
    console.log('Current URL:', currentURL);

    const errorPage = await page.locator('text=Something went wrong').count();

    if (errorPage > 0) {
      console.log('\n✗ ERROR PAGE DETECTED\n');

      console.log('\n=== PAGE ERRORS ===');
      pageErrors.forEach(err => {
        console.log('Message:', err.message);
        console.log('Stack:', err.stack);
        console.log('---');
      });

      console.log('\n=== CONSOLE MESSAGES (last 20) ===');
      consoleMessages.slice(-20).forEach(msg => console.log(msg));

      await page.screenshot({ path: '/tmp/local-error.png', fullPage: true });
      console.log('\nScreenshot saved to /tmp/local-error.png');
    } else {
      console.log('\n✓ NO ERROR PAGE - Editor loaded successfully!');

      const editorHeading = await page.locator('text=Website Editor').count();
      if (editorHeading > 0) {
        console.log('✓ Website Editor heading found');
      }

      await page.screenshot({ path: '/tmp/local-success.png', fullPage: true });
    }

  } catch (error) {
    console.log('\nTest error:', error.message);
  } finally {
    await browser.close();
  }
}

testLocal();
