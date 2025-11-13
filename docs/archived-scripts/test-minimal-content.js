const { chromium } = require('playwright');

async function testMinimalContent() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  try {
    console.log('Testing minimal/empty block content...\n');

    // Clear existing data
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Create a website with minimal blocks (no optional fields)
    const minimalConfig = {
      version: '1.0',
      template: 'test-minimal',
      theme: {
        colors: { primary: '#000', secondary: '#111', background: '#fff', text: '#000', muted: '#666' },
        fonts: { heading: 'Arial', body: 'Arial' }
      },
      metadata: { title: 'Test', description: 'Test', author: 'Test' },
      blocks: [
        // Hero with minimal fields
        { id: 'hero-1', type: 'hero', content: { variant: 'centered', heading: 'Test', subheading: 'Test', ctaPrimary: { text: 'Test', link: '#' } } },

        // Features with empty array
        { id: 'features-1', type: 'features', content: { variant: 'grid', heading: 'Test', subheading: 'Test', features: [], columns: 3 } },

        // Pricing with empty tiers
        { id: 'pricing-1', type: 'pricing', content: { variant: 'simple', heading: 'Test', subheading: 'Test', tiers: [] } },

        // Testimonials with empty array
        { id: 'testimonials-1', type: 'testimonials', content: { variant: 'cards', heading: 'Test', subheading: 'Test', testimonials: [], columns: 2 } },

        // FAQ with empty array
        { id: 'faq-1', type: 'faq', content: { variant: 'accordion', heading: 'Test', subheading: 'Test', faqs: [] } },

        // Stats with empty array
        { id: 'stats-1', type: 'stats', content: { variant: 'grid', stats: [], columns: 3 } },

        // Footer with minimal fields only
        { id: 'footer-1', type: 'footer', content: { variant: 'simple', logo: 'Test' } }
      ]
    };

    // Save to localStorage
    const websiteId = await page.evaluate((config) => {
      const website = {
        id: crypto.randomUUID(),
        label: 'Minimal Content Test',
        config: config,
        prompt_history: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      localStorage.setItem('prompt-to-website:websites', JSON.stringify([website]));
      return website.id;
    }, minimalConfig);

    // Navigate to editor
    await page.goto(`http://localhost:3000/editor/${websiteId}`);
    await page.waitForTimeout(3000);

    const errorPage = await page.locator('text=Something went wrong').count();

    if (errorPage > 0 || pageErrors.length > 0) {
      console.log('❌ FAILED - App crashed with minimal content\n');

      if (pageErrors.length > 0) {
        console.log('Errors:');
        pageErrors.forEach(err => {
          console.log(`  - ${err.message}`);
          console.log(`    ${err.stack.split('\n')[0]}`);
        });
      }
    } else {
      console.log('✅ PASSED - App handles minimal content gracefully');
    }

  } catch (error) {
    console.log(`❌ TEST ERROR: ${error.message}`);
  } finally {
    await browser.close();
  }
}

testMinimalContent();
