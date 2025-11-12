const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  // Click "Use Template" to create a website
  await page.getByRole('button', { name: /use template/i }).first().click();
  await page.waitForTimeout(2000);

  // Check localStorage
  const storageData = await page.evaluate(() => {
    const data = localStorage.getItem('prompt-to-website:websites');
    return data ? JSON.parse(data) : [];
  });

  console.log('=== LOCALSTORAGE DATA ===');
  console.log(JSON.stringify(storageData, null, 2));

  if (storageData.length > 0) {
    const website = storageData[0];
    console.log('\n=== FIRST WEBSITE ===');
    console.log('ID:', website.id);
    console.log('Label:', website.label);
    console.log('Has config:', !!website.config);
    console.log('Config has blocks:', !!website.config?.blocks);
    console.log('Number of blocks:', website.config?.blocks?.length);
    console.log('\n=== CONFIG STRUCTURE ===');
    console.log(JSON.stringify(website.config, null, 2).substring(0, 1000));
  }

  await browser.close();
})();
