const { chromium } = require('playwright');

async function diagnose() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('=== DIAGNOSTIC TEST ===\n');

    // Navigate to homepage
    await page.goto('https://prompt-to-website-delta.vercel.app', { waitUntil: 'networkidle' });
    console.log('✓ Homepage loaded\n');

    // Click Use Template and wait for navigation
    console.log('Clicking Use Template...');
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(2000);

    // Check localStorage after navigation
    const websiteData = await page.evaluate(() => {
      const data = localStorage.getItem('prompt-to-website:websites');
      return data;
    });

    console.log('\n=== LOCAL STORAGE DATA ===');
    if (websiteData) {
      const parsed = JSON.parse(websiteData);
      console.log('Number of websites:', parsed.length);
      if (parsed.length > 0) {
        const latest = parsed[parsed.length - 1];
        console.log('\nLatest website:');
        console.log('- ID:', latest.id);
        console.log('- Label:', latest.label);
        console.log('- Has config:', !!latest.config);
        console.log('- Config keys:', latest.config ? Object.keys(latest.config) : 'N/A');
        console.log('- Has blocks:', !!(latest.config && latest.config.blocks));
        console.log('- Blocks length:', latest.config?.blocks?.length || 'undefined');
        console.log('\nFull config:');
        console.log(JSON.stringify(latest.config, null, 2));
      }
    } else {
      console.log('No localStorage data found!');
    }

  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    await browser.close();
  }
}

diagnose();
