const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('🔥 BRUTAL AUDIT: Comparing to Cursor.com & Lovable.ai\n');

  // 1. Our site
  console.log('1. Analyzing our site...');
  await page.goto('https://prompt-to-website-j0e943ih9-federico-de-pontes-projects.vercel.app');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/our-final.png', fullPage: false });

  const ourAnalysis = await page.evaluate(() => {
    const body = document.body;
    const allElements = document.querySelectorAll('*');

    // Check for advanced shadcn usage
    const hasDialog = !!document.querySelector('[role="dialog"]');
    const hasDropdown = !!document.querySelector('[role="menu"]');
    const hasTooltip = !!document.querySelector('[role="tooltip"]');
    const hasPopover = !!document.querySelector('[role="dialog"][data-radix-popper]');
    const hasTabs = !!document.querySelector('[role="tablist"]');
    const hasCommand = !!document.querySelector('[cmdk-root]');
    const hasSheet = body.innerHTML.includes('sheet');

    // Check for animations
    const animatedElements = [];
    allElements.forEach(el => {
      const style = getComputedStyle(el);
      if (style.animation !== 'none' || style.transition !== 'all 0s ease 0s') {
        animatedElements.push(el.tagName);
      }
    });

    // Check for color variety
    const colorClasses = [];
    allElements.forEach(el => {
      const classes = el.className;
      if (typeof classes === 'string') {
        if (classes.match(/bg-(blue|purple|green|amber|rose|cyan|pink|indigo)-/)) {
          colorClasses.push(classes);
        }
      }
    });

    // Check for glassmorphism
    const glassmorphism = [];
    allElements.forEach(el => {
      const classes = el.className;
      if (typeof classes === 'string') {
        if (classes.includes('backdrop-blur')) {
          glassmorphism.push(el.tagName);
        }
      }
    });

    return {
      advancedComponents: {
        hasDialog,
        hasDropdown,
        hasTooltip,
        hasPopover,
        hasTabs,
        hasCommand,
        hasSheet,
      },
      animatedElements: animatedElements.length,
      colorVariety: colorClasses.length,
      glassmorphism: glassmorphism.length,
      h1Text: document.querySelector('h1')?.textContent?.trim()?.substring(0, 50),
    };
  });

  console.log('Our Analysis:', JSON.stringify(ourAnalysis, null, 2));

  // 2. Cursor.com
  console.log('\n2. Analyzing Cursor.com...');
  await page.goto('https://www.cursor.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/cursor.png', fullPage: false });

  const cursorAnalysis = await page.evaluate(() => {
    const videos = document.querySelectorAll('video');
    const canvases = document.querySelectorAll('canvas');
    const allElements = document.querySelectorAll('*');

    let gradientCount = 0;
    allElements.forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg.includes('gradient')) gradientCount++;
    });

    return {
      hasVideo: videos.length > 0,
      videoCount: videos.length,
      hasCanvas: canvases.length > 0,
      canvasCount: canvases.length,
      gradients: gradientCount,
      h1Text: document.querySelector('h1')?.textContent?.trim()?.substring(0, 50),
    };
  });

  console.log('Cursor Analysis:', JSON.stringify(cursorAnalysis, null, 2));

  // 3. Lovable.ai
  console.log('\n3. Analyzing Lovable.ai...');
  await page.goto('https://lovable.ai');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/lovable.png', fullPage: false });

  const lovableAnalysis = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');

    let animationCount = 0;
    let transformCount = 0;
    allElements.forEach(el => {
      const style = getComputedStyle(el);
      if (style.animation !== 'none') animationCount++;
      if (style.transform !== 'none') transformCount++;
    });

    return {
      animations: animationCount,
      transforms: transformCount,
      h1Text: document.querySelector('h1')?.textContent?.trim()?.substring(0, 50),
    };
  });

  console.log('Lovable Analysis:', JSON.stringify(lovableAnalysis, null, 2));

  console.log('\n🔥 GAPS IDENTIFIED:\n');

  if (!ourAnalysis.advancedComponents.hasDialog) {
    console.log('❌ NO DIALOGS - Not showing off shadcn Dialog component');
  }
  if (!ourAnalysis.advancedComponents.hasDropdown) {
    console.log('❌ NO DROPDOWNS - Missing shadcn DropdownMenu');
  }
  if (!ourAnalysis.advancedComponents.hasTooltip) {
    console.log('❌ NO TOOLTIPS - Missing shadcn Tooltip');
  }
  if (!ourAnalysis.advancedComponents.hasCommand) {
    console.log('❌ NO COMMAND PALETTE - Missing shadcn Command (⌘K search)');
  }

  if (ourAnalysis.colorVariety === 0) {
    console.log('⚠️  BORING COLORS - Only using primary/secondary/accent, no variety');
  }

  if (cursorAnalysis.hasVideo && !ourAnalysis.hasVideo) {
    console.log('❌ NO VIDEO - Cursor uses ' + cursorAnalysis.videoCount + ' videos for engagement');
  }

  if (lovableAnalysis.animations > ourAnalysis.animatedElements) {
    console.log('⚠️  FEWER ANIMATIONS - Lovable has ' + lovableAnalysis.animations + ' animated elements, we have ' + ourAnalysis.animatedElements);
  }

  await browser.close();
  console.log('\n✅ Analysis complete!\n');
})();
