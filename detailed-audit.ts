import { chromium } from 'playwright';

async function detailedAudit() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const failedRequests: Array<{url: string, status: number}> = [];

  // Track all failed requests with details
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  const consoleMessages: Array<{type: string, text: string}> = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  console.log('🔍 Loading homepage...\n');
  await page.goto('https://prompt-to-website-kxwgiux78-federico-de-pontes-projects.vercel.app', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(3000);

  console.log('📊 Failed Requests:');
  failedRequests.forEach(req => {
    console.log(`  ${req.status} - ${req.url}`);
  });

  console.log('\n📝 Console Messages:');
  consoleMessages.forEach(msg => {
    console.log(`  [${msg.type.toUpperCase()}] ${msg.text}`);
  });

  console.log('\n🔍 Page Analysis:');

  // Check for specific elements
  const hasHero = await page.locator('h1').count() > 0;
  const hasNav = await page.locator('nav').count() > 0;
  const hasTemplates = await page.locator('[class*="template"]').count() > 0;
  const hasImages = await page.locator('img').count();

  console.log(`  - Has H1 (Hero): ${hasHero ? '✅' : '❌'}`);
  console.log(`  - Has Navigation: ${hasNav ? '✅' : '❌'}`);
  console.log(`  - Has Template Elements: ${hasTemplates ? '✅' : '❌'}`);
  console.log(`  - Number of Images: ${hasImages}`);

  // Get page text content
  const bodyText = await page.locator('body').textContent();
  console.log(`\n📄 Page Text Content (first 500 chars):`);
  console.log(bodyText?.slice(0, 500));

  // Check if it's actually the homepage or a different page
  const url = page.url();
  const title = await page.title();
  console.log(`\n🌐 Current URL: ${url}`);
  console.log(`📋 Page Title: ${title}`);

  // Try to interact with buttons
  console.log(`\n🖱️ Interactive Elements:`);
  const buttons = await page.locator('button').all();
  console.log(`  - Buttons found: ${buttons.length}`);
  for (let i = 0; i < Math.min(5, buttons.length); i++) {
    const text = await buttons[i].textContent();
    const visible = await buttons[i].isVisible();
    console.log(`    ${i + 1}. "${text?.trim()}" - Visible: ${visible ? '✅' : '❌'}`);
  }

  await browser.close();
}

detailedAudit().catch(console.error);
