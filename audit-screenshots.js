const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('📸 Taking screenshots for audit...\n');

  // 1. Our deployed site
  console.log('1. Navigating to our site...');
  await page.goto('https://prompt-to-website-ieqoc7ysw-federico-de-pontes-projects.vercel.app');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/our-site-full.png', fullPage: true });
  await page.screenshot({ path: '/tmp/our-site-hero.png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log('✅ Our site screenshots saved');

  // 2. shadcnblocks.com for reference
  console.log('\n2. Navigating to shadcnblocks.com...');
  await page.goto('https://shadcnblocks.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/shadcnblocks-full.png', fullPage: true });
  await page.screenshot({ path: '/tmp/shadcnblocks-hero.png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log('✅ shadcnblocks.com screenshots saved');

  // 3. Analyze our site structure
  console.log('\n3. Analyzing our site structure...');
  await page.goto('https://prompt-to-website-ieqoc7ysw-federico-de-pontes-projects.vercel.app');
  await page.waitForLoadState('networkidle');

  const analysis = await page.evaluate(() => {
    // Check for shadcn components
    const buttons = document.querySelectorAll('button, a[role="button"]');
    const cards = document.querySelectorAll('[class*="card"]');
    const badges = document.querySelectorAll('[class*="badge"]');

    // Check CSS variables
    const root = getComputedStyle(document.documentElement);
    const hasPrimary = root.getPropertyValue('--primary');
    const hasBackground = root.getPropertyValue('--background');
    const hasRadius = root.getPropertyValue('--radius');

    // Check for hardcoded colors
    const allElements = document.querySelectorAll('*');
    const hardcodedColors = [];
    allElements.forEach(el => {
      const classes = el.className;
      if (typeof classes === 'string') {
        if (classes.match(/bg-(blue|red|green|purple|gray)-\d{3}/)) {
          hardcodedColors.push(classes);
        }
      }
    });

    return {
      buttons: buttons.length,
      cards: cards.length,
      badges: badges.length,
      cssVars: {
        hasPrimary: !!hasPrimary,
        hasBackground: !!hasBackground,
        hasRadius: !!hasRadius,
      },
      hardcodedColors: [...new Set(hardcodedColors)].slice(0, 10),
    };
  });

  console.log('\n📊 Structure Analysis:');
  console.log(JSON.stringify(analysis, null, 2));

  await browser.close();
  console.log('\n✅ Audit complete! Screenshots saved to /tmp/');
})();
