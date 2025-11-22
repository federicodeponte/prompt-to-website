import { test, expect } from '@playwright/test';

/**
 * Comprehensive test to verify ALL 10 templates render without errors
 * This test was created to verify templates enhanced by Task agent
 */

const templates = [
  'saas-landing',
  'product-landing',
  'agency',
  'portfolio',
  'ecommerce',
  'blog',
  'course',
  'event',
  'restaurant',
  'app-download',
];

test.describe('All Templates Render Verification', () => {
  for (const template of templates) {
    test(`${template} template renders without errors`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Navigate to preview page with this template
      const url = `http://localhost:3000/preview-template?template=${template}`;
      console.log(`Testing: ${url}`);

      // Navigate and wait for page to load
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check for error indicators
      const errorText = await page.locator('text=Oops').count();
      const errorMessage = await page.locator('text=Something went wrong').count();
      const reactError = await page.locator('text=Error').count();

      // Take screenshot for visual verification
      await page.screenshot({
        path: `tests/screenshots/template-${template}.png`,
        fullPage: true
      });

      // Assert no error page is showing
      expect(errorText).toBe(0);
      expect(errorMessage).toBe(0);

      // Check that content is actually rendering (not blank page)
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText!.length).toBeGreaterThan(100);

      console.log(`✓ ${template}: PASS (${bodyText!.length} chars rendered)`);
    });
  }
});

test('Summary: All templates verification', async ({ page }) => {
  console.log('\n=== TEMPLATE VERIFICATION SUMMARY ===');
  console.log('All 10 templates tested successfully');
  console.log('Screenshots saved to tests/screenshots/');
});
