import { test, expect } from '@playwright/test';

const siteUrl = 'https://prompt-to-website-ihu08z8cn-federico-de-pontes-projects.vercel.app';

test.describe('Detailed Issue Detection', () => {
  test('Inspect HTML structure and find issues', async ({ page }) => {
    console.log('=== DETAILED HTML INSPECTION ===');
    
    await page.goto(siteUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Get full HTML to check for image tags
    const htmlContent = await page.content();
    
    // Check for img tags in HTML
    const imgTagCount = (htmlContent.match(/<img/g) || []).length;
    console.log('IMG tags in HTML: ' + imgTagCount);
    
    // Check template cards specifically
    const templateCards = await page.locator('[class*="template"], [class*="card"]').all();
    console.log('\nTemplate/Card elements found: ' + templateCards.length);
    
    // Look for template preview areas
    const templateAreas = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('button, div, section'));
      const templateRelated = cards.filter(el => {
        const text = el.textContent || '';
        return text.includes('SaaS') || text.includes('Product') || text.includes('Portfolio');
      });
      
      return templateRelated.map(el => {
        const hasImage = el.querySelector('img') !== null;
        const hasSVG = el.querySelector('svg') !== null;
        const hasCanvas = el.querySelector('canvas') !== null;
        return {
          tagName: el.tagName,
          className: el.className,
          hasImage: hasImage,
          hasSVG: hasSVG,
          hasCanvas: hasCanvas,
          innerHTML: el.innerHTML.substring(0, 200)
        };
      });
    });
    
    console.log('\nTemplate-related elements analysis:');
    console.log(JSON.stringify(templateAreas, null, 2));
    
    // Check for broken images or missing assets
    const brokenElements = await page.evaluate(() => {
      const issues = [];
      
      // Check all img elements
      const images = Array.from(document.querySelectorAll('img'));
      images.forEach((img, i) => {
        if (!img.complete || img.naturalWidth === 0) {
          issues.push({
            type: 'broken-image',
            index: i,
            src: img.src,
            alt: img.alt
          });
        }
      });
      
      // Check for empty preview areas
      const previews = Array.from(document.querySelectorAll('[class*="preview"], [class*="thumbnail"]'));
      previews.forEach((preview, i) => {
        const hasContent = preview.children.length > 0 || preview.textContent.trim().length > 0;
        if (!hasContent) {
          issues.push({
            type: 'empty-preview',
            index: i,
            className: preview.className
          });
        }
      });
      
      return issues;
    });
    
    console.log('\n=== BROKEN/MISSING ELEMENTS ===');
    if (brokenElements.length === 0) {
      console.log('No broken elements detected');
    } else {
      console.log('Found ' + brokenElements.length + ' issues:');
      brokenElements.forEach((issue, i) => {
        console.log('Issue ' + (i+1) + ': ' + JSON.stringify(issue, null, 2));
      });
    }
    
    // Check all links and their destinations
    const linkAnalysis = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.map(link => ({
        text: link.textContent.trim().substring(0, 50),
        href: link.href,
        isExternal: link.href.startsWith('http') && !link.href.includes(window.location.hostname),
        hasHash: link.href.includes('#'),
        target: link.target
      }));
    });
    
    console.log('\n=== LINK ANALYSIS ===');
    linkAnalysis.forEach((link, i) => {
      console.log('Link ' + (i+1) + ':');
      console.log('  Text: ' + link.text);
      console.log('  Href: ' + link.href);
      console.log('  Type: ' + (link.hasHash ? 'Anchor' : link.isExternal ? 'External' : 'Internal'));
    });
    
    // Check button functionality expectations
    const buttonAnalysis = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.map(btn => ({
        text: btn.textContent.trim(),
        disabled: btn.disabled,
        type: btn.type,
        hasClickHandler: btn.onclick !== null,
        className: btn.className
      }));
    });
    
    console.log('\n=== BUTTON ANALYSIS ===');
    buttonAnalysis.forEach((btn, i) => {
      console.log('Button ' + (i+1) + ': ' + btn.text);
      console.log('  Disabled: ' + btn.disabled);
      console.log('  Type: ' + btn.type);
      console.log('  Has onClick: ' + btn.hasClickHandler);
    });
  });

  test('Check for missing routes', async ({ page, context }) => {
    console.log('=== CHECKING CRITICAL ROUTES ===');
    
    const routes = [
      '/',
      '/editor/demo',
      '/templates',
      '/features',
      '/pricing'
    ];
    
    for (const route of routes) {
      const url = siteUrl + route;
      console.log('\nChecking: ' + url);
      
      try {
        const response = await page.goto(url, { timeout: 15000, waitUntil: 'domcontentloaded' });
        const status = response ? response.status() : 0;
        console.log('  Status: ' + status);
        
        if (status === 404) {
          console.log('  ✗ ROUTE NOT FOUND');
          await page.screenshot({ path: '/tmp/404-' + route.replace(/\//g, '-') + '.png' });
        } else if (status === 200) {
          console.log('  ✓ Route exists');
        }
        
        await page.waitForTimeout(1000);
      } catch (e) {
        console.log('  ✗ ERROR: ' + e.message);
      }
    }
  });
});
