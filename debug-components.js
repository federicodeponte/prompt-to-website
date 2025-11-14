const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Debugging Component Detection\n');
  
  await page.goto('https://prompt-to-website-fq31g4ez0-federico-de-pontes-projects.vercel.app');
  await page.waitForLoadState('networkidle');
  
  // Wait for skeleton loading to complete
  console.log('⏳ Waiting for skeleton loading to complete...');
  await page.waitForTimeout(1500);
  
  // 1. Check for Tooltip component in markup
  console.log('\n1. TOOLTIP INVESTIGATION:');
  
  const tooltipProviderExists = await page.locator('[data-radix-tooltip-provider]').count() > 0;
  console.log('  TooltipProvider exists:', tooltipProviderExists);
  
  const tooltipTriggerCount = await page.locator('[data-radix-tooltip-trigger]').count();
  console.log('  TooltipTrigger count:', tooltipTriggerCount);
  
  // Try hovering over Eye button
  const templateCard = page.locator('[data-template-id]').first();
  const eyeButton = templateCard.locator('button').filter({ has: page.locator('svg') }).nth(0);
  
  if (await eyeButton.count() > 0) {
    console.log('  Eye button found, hovering...');
    await eyeButton.hover();
    await page.waitForTimeout(1000); // Give tooltip time to appear
    
    const tooltipVisible = await page.locator('[role="tooltip"]').count();
    console.log('  Tooltip after hover:', tooltipVisible > 0 ? '✅ VISIBLE' : '❌ NOT VISIBLE');
    
    if (tooltipVisible === 0) {
      // Check for any tooltip-related elements
      const radixTooltipContent = await page.locator('[data-radix-tooltip-content]').count();
      console.log('  Radix tooltip content:', radixTooltipContent);
      
      // Get all attributes of the eye button
      const buttonAttrs = await eyeButton.first().evaluate(el => {
        return Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`).join(', ');
      });
      console.log('  Eye button attributes:', buttonAttrs);
    }
  } else {
    console.log('  ❌ Eye button not found');
  }
  
  // 2. Check for Sonner toaster
  console.log('\n2. SONNER INVESTIGATION:');
  
  const sonnerToaster = await page.locator('[data-sonner-toaster]').count();
  console.log('  [data-sonner-toaster]:', sonnerToaster);
  
  const olSonner = await page.locator('ol[data-sonner-toaster]').count();
  console.log('  ol[data-sonner-toaster]:', olSonner);
  
  // Check HTML source for "sonner"
  const html = await page.content();
  const hasSonnerInHTML = html.toLowerCase().includes('sonner');
  console.log('  "sonner" in HTML:', hasSonnerInHTML);
  
  // Check for Toaster component by looking for its typical structure
  const olWithRole = await page.locator('ol[role="list"]').count();
  console.log('  ol[role="list"]:', olWithRole);
  
  // Get the last few script tags to see what's loaded
  const scripts = await page.evaluate(() => {
    const scriptTags = Array.from(document.querySelectorAll('script[src]'));
    return scriptTags.map(s => s.src).slice(-5);
  });
  console.log('  Last 5 scripts:', scripts);
  
  await browser.close();
  console.log('\n✅ Debug complete!\n');
})();
