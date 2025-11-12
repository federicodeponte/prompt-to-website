const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', error => pageErrors.push(error.message + '\n' + error.stack));

  try {
    console.log('Loading homepage on port 3002...');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    console.log('✓ Homepage loaded');

    console.log('\nClicking Use Template...');
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(3000);

    console.log('\n=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => console.log(msg));

    console.log('\n=== PAGE ERRORS ===');
    if (pageErrors.length > 0) {
      pageErrors.forEach(err => console.log(err));
    } else {
      console.log('No errors!');
    }

    const errorPage = await page.locator('text=Something went wrong').count();
    if (errorPage > 0) {
      console.log('\n✗ ERROR PAGE DETECTED');
      await page.screenshot({ path: '/tmp/error.png' });
    } else {
      console.log('\n✓ NO ERROR PAGE - Editor loaded successfully!');
      await page.screenshot({ path: '/tmp/success.png' });
    }

  } catch (error) {
    console.log('\nTest error:', error.message);
  } finally {
    await browser.close();
  }
}

test();
