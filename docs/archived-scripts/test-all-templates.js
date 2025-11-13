const { chromium } = require('playwright');

async function testAllTemplates() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  const templates = ['saas-landing', 'product-landing', 'portfolio'];

  for (const template of templates) {
    console.log(`\n========================================`);
    console.log(`Testing: ${template.toUpperCase()}`);
    console.log(`========================================`);

    pageErrors.length = 0; // Clear previous errors

    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

      // Find the specific template card and click its "Use Template" button
      const templateCards = await page.locator('button:has-text("Use Template")').all();

      // Click the button for this template (they appear in order: saas, product, portfolio)
      const index = templates.indexOf(template);
      if (templateCards[index]) {
        await templateCards[index].click();
        await page.waitForTimeout(3000);

        const errorPage = await page.locator('text=Something went wrong').count();

        if (errorPage > 0) {
          console.log(`❌ CRASHED\n`);

          if (pageErrors.length > 0) {
            console.log('Error:', pageErrors[0].message);
            console.log('Stack:', pageErrors[0].stack.split('\n').slice(0, 5).join('\n'));
          }
        } else {
          const editorHeading = await page.locator('text=Website Editor').count();
          if (editorHeading > 0) {
            console.log(`✅ WORKS - Editor loaded successfully`);
          } else {
            console.log(`⚠️ UNKNOWN STATE - No error page but no editor heading`);
          }
        }
      }
    } catch (error) {
      console.log(`❌ TEST ERROR: ${error.message}`);
    }
  }

  await browser.close();
}

testAllTemplates();
