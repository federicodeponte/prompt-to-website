const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3001');
  await page.waitForTimeout(2000);

  // Take screenshot of homepage
  await page.screenshot({ path: '/tmp/homepage.png', fullPage: true });
  console.log('Screenshot saved to /tmp/homepage.png');

  // Get HTML content
  const html = await page.content();
  console.log('\n=== PAGE HTML (first 3000 chars) ===');
  console.log(html.substring(0, 3000));

  // Check for shadcn components
  const buttons = await page.locator('button').count();
  const cards = await page.locator('[class*="card"]').count();
  console.log('\n=== COMPONENT COUNT ===');
  console.log(`Buttons found: ${buttons}`);
  console.log(`Card-like elements: ${cards}`);

  // Get computed styles of first button
  if (buttons > 0) {
    const firstButton = page.locator('button').first();
    const styles = await firstButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        padding: computed.padding,
        borderRadius: computed.borderRadius,
        fontSize: computed.fontSize,
      };
    });
    console.log('\n=== FIRST BUTTON STYLES ===');
    console.log(JSON.stringify(styles, null, 2));
  }

  await browser.close();
})();
