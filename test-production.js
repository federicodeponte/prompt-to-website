const { chromium } = require('playwright');

async function testProduction() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Error') || text.includes('error') || text.includes('Cannot')) {
      consoleMessages.push(`[${msg.type()}] ${text}`);
    }
  });

  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  try {
    console.log('Testing production site...\n');

    await page.goto('https://prompt-to-website-delta.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✓ Homepage loaded\n');

    console.log('Clicking Use Template button...');
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(4000);

    const currentURL = page.url();
    console.log('Current URL:', currentURL);

    const errorPage = await page.locator('text=Something went wrong').count();

    if (errorPage > 0) {
      console.log('\n✗ ERROR PAGE DETECTED\n');

      const errorText = await page.locator('body').textContent();
      console.log('Error text:', errorText);

      console.log('\n=== PAGE ERRORS ===');
      pageErrors.forEach(err => {
        console.log('Message:', err.message);
        console.log('Stack:', err.stack);
        console.log('---');
      });

      console.log('\n=== CONSOLE ERRORS ===');
      consoleMessages.forEach(msg => console.log(msg));

      await page.screenshot({ path: '/tmp/production-error.png', fullPage: true });
      console.log('\nScreenshot saved to /tmp/production-error.png');
    } else {
      console.log('\n✓ NO ERROR PAGE - Editor loaded successfully!');

      const editorHeading = await page.locator('text=Website Editor').count();
      if (editorHeading > 0) {
        console.log('✓ Website Editor heading found');
      }

      await page.screenshot({ path: '/tmp/production-success.png', fullPage: true });
    }

  } catch (error) {
    console.log('\nTest error:', error.message);
  } finally {
    await browser.close();
  }
}

testProduction();
