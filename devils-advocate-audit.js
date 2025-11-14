const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('🔥 BRUTAL AUDIT: Comparing to Cursor.com & Lovable.ai\n');

  // 1. Our site (latest deployment with color variety)
  console.log('1. Analyzing our site...');
  await page.goto('https://prompt-to-website-5bjqo5v52-federico-de-pontes-projects.vercel.app');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/our-final.png', fullPage: false });

  // Initial analysis before interactions
  let ourAnalysis = await page.evaluate(() => {
    const body = document.body;
    const allElements = document.querySelectorAll('*');

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
      animatedElements: animatedElements.length,
      colorVariety: colorClasses.length,
      glassmorphism: glassmorphism.length,
      h1Text: document.querySelector('h1')?.textContent?.trim()?.substring(0, 50),
    };
  });

  // Test interactive components by triggering them
  console.log('Testing interactive components...');

  // Wait for skeleton loading to complete (1.2s)
  await page.waitForTimeout(1500);

  // Test Dialog - click first Eye button in template cards
  let hasDialog = false;
  try {
    // Look for template cards first, then find Eye button within
    const templateCard = page.locator('[data-template-id]').first();
    const eyeButton = templateCard.locator('button').filter({ has: page.locator('svg') }).nth(0);

    if (await eyeButton.count() > 0) {
      console.log('  Found Eye button, clicking to test Dialog...');
      await eyeButton.click();
      await page.waitForTimeout(800);
      hasDialog = await page.locator('[role="dialog"]').count() > 0;
      console.log('  Dialog present:', hasDialog);
      // Close dialog
      if (hasDialog) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }
    } else {
      console.log('  No Eye button found');
    }
  } catch (e) {
    console.log('  Dialog test error:', e.message);
  }

  // Test DropdownMenu - click MoreVertical button in template cards
  let hasDropdown = false;
  try {
    const templateCard = page.locator('[data-template-id]').first();
    // Look for all buttons within card footer, last one should be dropdown
    const allButtons = templateCard.locator('button');
    const buttonCount = await allButtons.count();
    console.log('  Found ' + buttonCount + ' buttons in template card');

    // Last button should be the MoreVertical dropdown
    const moreButton = allButtons.last();

    if (await moreButton.count() > 0) {
      console.log('  Clicking last button to test DropdownMenu...');
      await moreButton.click();
      await page.waitForTimeout(800);
      hasDropdown = await page.locator('[role="menu"]').count() > 0;
      console.log('  Dropdown present:', hasDropdown);
      // Close dropdown
      if (hasDropdown) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }
    } else {
      console.log('  No More button found');
    }
  } catch (e) {
    console.log('  Dropdown test error:', e.message);
  }

  // Test Command palette - press Cmd+K
  let hasCommand = false;
  try {
    await page.keyboard.press('Meta+k');
    await page.waitForTimeout(500);
    hasCommand = await page.locator('[cmdk-root]').count() > 0 ||
                 await page.locator('[role="dialog"]:has([cmdk-root])').count() > 0;
    // Close command
    if (hasCommand) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    }
  } catch (e) {
    console.log('  Command test skipped:', e.message);
  }

  // Check for Tooltip - hover over Eye button to trigger tooltip
  let hasTooltip = false;
  try {
    const templateCard = page.locator('[data-template-id]').first();
    const eyeButton = templateCard.locator('button').filter({ has: page.locator('svg') }).nth(0);

    if (await eyeButton.count() > 0) {
      console.log('  Hovering over Eye button to test Tooltip...');
      await eyeButton.hover();
      await page.waitForTimeout(1000); // Wait 1 second for tooltip animation
      hasTooltip = await page.locator('[role="tooltip"]').count() > 0;
      console.log('  Tooltip present:', hasTooltip);
    }
  } catch (e) {
    console.log('  Tooltip test error:', e.message);
  }

  // Check for Tabs, Popover, Sheet in markup
  const hasTabs = await page.locator('[role="tablist"]').count() > 0;
  const hasPopover = await page.locator('[data-radix-popper]').count() > 0;
  const hasSheet = await page.content().then(html => html.includes('sheet'));

  // Check for Sonner toasts - check if sonner code is in HTML
  const hasSonner = await page.evaluate(() => {
    const html = document.documentElement.innerHTML;
    return html.toLowerCase().includes('sonner');
  });

  // Combine results
  ourAnalysis = {
    ...ourAnalysis,
    advancedComponents: {
      hasDialog,
      hasDropdown,
      hasTooltip,
      hasPopover,
      hasTabs,
      hasCommand,
      hasSheet,
      hasSonner,
    },
  };

  console.log('Our Analysis:', JSON.stringify(ourAnalysis, null, 2));

  // 2. Cursor.com
  console.log('\n2. Analyzing Cursor.com...');
  let cursorAnalysis = null;
  try {
    await page.goto('https://www.cursor.com', { timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 45000 });
    await page.screenshot({ path: '/tmp/cursor.png', fullPage: false });

    cursorAnalysis = await page.evaluate(() => {
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
  } catch (error) {
    console.log('⚠️  Cursor.com analysis failed:', error.message);
    console.log('   Skipping Cursor comparison...');
  }

  // 3. Lovable.ai
  console.log('\n3. Analyzing Lovable.ai...');
  let lovableAnalysis = null;
  try {
    await page.goto('https://lovable.ai', { timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 45000 });
    await page.screenshot({ path: '/tmp/lovable.png', fullPage: false });

    lovableAnalysis = await page.evaluate(() => {
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
  } catch (error) {
    console.log('⚠️  Lovable.ai analysis failed:', error.message);
    console.log('   Skipping Lovable comparison...');
  }

  console.log('\n🔥 GAPS IDENTIFIED:\n');

  // Check our components
  if (!ourAnalysis.advancedComponents.hasDialog) {
    console.log('❌ NO DIALOGS - Not showing off shadcn Dialog component');
  } else {
    console.log('✅ DIALOGS - shadcn Dialog detected');
  }

  if (!ourAnalysis.advancedComponents.hasDropdown) {
    console.log('❌ NO DROPDOWNS - Missing shadcn DropdownMenu');
  } else {
    console.log('✅ DROPDOWNS - shadcn DropdownMenu detected');
  }

  if (!ourAnalysis.advancedComponents.hasTooltip) {
    console.log('❌ NO TOOLTIPS - Missing shadcn Tooltip');
  } else {
    console.log('✅ TOOLTIPS - shadcn Tooltip detected');
  }

  if (!ourAnalysis.advancedComponents.hasCommand) {
    console.log('❌ NO COMMAND PALETTE - Missing shadcn Command (⌘K search)');
  } else {
    console.log('✅ COMMAND PALETTE - shadcn Command detected');
  }

  if (!ourAnalysis.advancedComponents.hasSonner) {
    console.log('❌ NO TOAST NOTIFICATIONS - Missing Sonner toasts');
  } else {
    console.log('✅ TOAST NOTIFICATIONS - Sonner detected');
  }

  if (ourAnalysis.glassmorphism === 0) {
    console.log('❌ NO GLASSMORPHISM - Missing backdrop-blur effects');
  } else {
    console.log('✅ GLASSMORPHISM - ' + ourAnalysis.glassmorphism + ' elements with backdrop-blur');
  }

  if (ourAnalysis.colorVariety === 0) {
    console.log('⚠️  BORING COLORS - Only using primary/secondary/accent, no variety');
  } else {
    console.log('✅ COLOR VARIETY - ' + ourAnalysis.colorVariety + ' colored elements');
  }

  // Compare with Cursor if available
  if (cursorAnalysis) {
    if (cursorAnalysis.hasVideo) {
      console.log('📊 CURSOR COMPARISON - Cursor uses ' + cursorAnalysis.videoCount + ' videos for engagement');
    }
  }

  // Compare with Lovable if available
  if (lovableAnalysis) {
    if (lovableAnalysis.animations > ourAnalysis.animatedElements) {
      console.log('⚠️  FEWER ANIMATIONS - Lovable has ' + lovableAnalysis.animations + ' animated elements, we have ' + ourAnalysis.animatedElements);
    } else {
      console.log('✅ ANIMATION PARITY - We have ' + ourAnalysis.animatedElements + ' animated elements (Lovable: ' + lovableAnalysis.animations + ')');
    }
  }

  await browser.close();
  console.log('\n✅ Analysis complete!\n');
})();
