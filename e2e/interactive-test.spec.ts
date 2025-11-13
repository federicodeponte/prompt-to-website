import { test, expect } from '@playwright/test';

const siteUrl = 'https://prompt-to-website-ihu08z8cn-federico-de-pontes-projects.vercel.app';

test.describe('Interactive Elements Testing', () => {
  test('Test button clicks and navigation', async ({ page }) => {
    console.log('=== TESTING INTERACTIVE ELEMENTS ===');
    
    await page.goto(siteUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Test "Try Demo" button
    console.log('\nTesting "Try Demo" button...');
    const tryDemoButton = page.locator('text=Try Demo').first();
    const isVisible = await tryDemoButton.isVisible();
    console.log('Try Demo button visible: ' + isVisible);
    
    if (isVisible) {
      await tryDemoButton.click();
      await page.waitForTimeout(3000);
      
      const currentUrl = page.url();
      console.log('After clicking Try Demo, URL is: ' + currentUrl);
      
      await page.screenshot({ path: '/tmp/after-try-demo.png', fullPage: true });
      console.log('Screenshot saved: /tmp/after-try-demo.png');
      
      // Check if we're on the editor page
      if (currentUrl.includes('/editor')) {
        console.log('✓ Successfully navigated to editor');
        
        // Check for editor elements
        const editorText = await page.textContent('body');
        console.log('Editor page content length: ' + (editorText ? editorText.length : 0));
        
        // Take screenshot of editor
        await page.screenshot({ path: '/tmp/editor-page.png', fullPage: true });
        console.log('Editor screenshot saved: /tmp/editor-page.png');
      } else {
        console.log('✗ Did not navigate to editor page');
      }
      
      // Go back to homepage
      await page.goto(siteUrl);
      await page.waitForTimeout(2000);
    }

    // Test "Use Template" buttons
    console.log('\nTesting template buttons...');
    const useTemplateButtons = await page.locator('text=Use Template').all();
    console.log('Found ' + useTemplateButtons.length + ' "Use Template" buttons');
    
    if (useTemplateButtons.length > 0) {
      console.log('Clicking first "Use Template" button...');
      await useTemplateButtons[0].click();
      await page.waitForTimeout(3000);
      
      const urlAfterTemplate = page.url();
      console.log('After clicking Use Template, URL is: ' + urlAfterTemplate);
      
      await page.screenshot({ path: '/tmp/after-use-template.png', fullPage: true });
      console.log('Screenshot saved: /tmp/after-use-template.png');
      
      await page.goto(siteUrl);
      await page.waitForTimeout(2000);
    }

    // Test "Preview" buttons
    console.log('\nTesting preview buttons...');
    const previewButtons = await page.locator('text=Preview').all();
    console.log('Found ' + previewButtons.length + ' "Preview" buttons');
    
    if (previewButtons.length > 0) {
      console.log('Clicking first "Preview" button...');
      await previewButtons[0].click();
      await page.waitForTimeout(3000);
      
      const urlAfterPreview = page.url();
      console.log('After clicking Preview, URL is: ' + urlAfterPreview);
      
      await page.screenshot({ path: '/tmp/after-preview.png', fullPage: true });
      console.log('Screenshot saved: /tmp/after-preview.png');
    }
  });

  test('Check template previews rendering', async ({ page }) => {
    console.log('=== CHECKING TEMPLATE PREVIEW IMAGES ===');
    
    await page.goto(siteUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check for images in template cards
    const images = await page.locator('img').all();
    console.log('Total images on page: ' + images.length);
    
    for (let i = 0; i < images.length; i++) {
      const src = await images[i].getAttribute('src');
      const alt = await images[i].getAttribute('alt');
      const isVisible = await images[i].isVisible();
      
      console.log('Image ' + (i+1) + ':');
      console.log('  src: ' + src);
      console.log('  alt: ' + alt);
      console.log('  visible: ' + isVisible);
      
      // Check if image loaded
      const naturalWidth = await images[i].evaluate((img: HTMLImageElement) => img.naturalWidth);
      console.log('  naturalWidth: ' + naturalWidth + (naturalWidth === 0 ? ' ✗ FAILED TO LOAD' : ' ✓'));
    }

    // Screenshot the template section
    const templateSection = page.locator('text=Choose Your Template').locator('..');
    if (await templateSection.count() > 0) {
      await templateSection.screenshot({ path: '/tmp/template-section.png' });
      console.log('\nTemplate section screenshot saved');
    }
  });

  test('Test responsive design', async ({ page }) => {
    console.log('=== TESTING RESPONSIVE DESIGN ===');
    
    const viewports = [
      { width: 375, height: 667, name: 'Mobile (iPhone SE)' },
      { width: 768, height: 1024, name: 'Tablet (iPad)' },
      { width: 1920, height: 1080, name: 'Desktop (FHD)' }
    ];

    for (const vp of viewports) {
      console.log('\nTesting viewport: ' + vp.name + ' (' + vp.width + 'x' + vp.height + ')');
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(siteUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      
      const screenshotName = '/tmp/viewport-' + vp.width + 'x' + vp.height + '.png';
      await page.screenshot({ path: screenshotName, fullPage: false });
      console.log('Screenshot saved: ' + screenshotName);
      
      // Check for horizontal scrollbar
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth;
      });
      
      if (hasHorizontalScroll) {
        console.log('⚠ ISSUE: Horizontal scrollbar detected at ' + vp.name);
      } else {
        console.log('✓ No horizontal scrollbar');
      }
      
      // Check if buttons are visible and clickable
      const buttonsVisible = await page.locator('button:visible').count();
      console.log('Visible buttons: ' + buttonsVisible);
    }
  });
});
