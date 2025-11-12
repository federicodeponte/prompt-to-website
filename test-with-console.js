const { chromium } = require('playwright');

async function testWithConsole() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture console errors
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message + '\n' + error.stack);
  });

  try {
    console.log('Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });

    console.log('Clicking Use Template...');
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(3000);

    console.log('\n=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => console.log(msg));

    console.log('\n=== PAGE ERRORS ===');
    pageErrors.forEach(err => console.log(err));

  } catch (error) {
    console.log('Test error:', error.message);
  } finally {
    await browser.close();
  }
}

testWithConsole();
