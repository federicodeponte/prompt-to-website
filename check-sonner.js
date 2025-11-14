const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://prompt-to-website-f1ycpoc2g-federico-de-pontes-projects.vercel.app');
  await page.waitForLoadState('networkidle');
  
  // Check for Sonner in HTML
  const html = await page.content();
  const hasSonnerInHTML = html.includes('sonner') || html.includes('Toaster');
  console.log('Sonner/Toaster in HTML:', hasSonnerInHTML);
  
  // Check for specific selectors
  const selectors = [
    '[data-sonner-toaster]',
    'ol[data-sonner-toaster]',
    '[data-sonner]',
    '.sonner',
    'ol[role="list"]'
  ];
  
  for (const selector of selectors) {
    const count = await page.locator(selector).count();
    console.log(selector + ':', count);
  }
  
  await browser.close();
})();
