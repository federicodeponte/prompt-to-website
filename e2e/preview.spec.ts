import { test, expect } from '@playwright/test';

test.describe('Preview Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open preview in new tab', async ({ context, page }) => {
    // Listen for new page (tab) creation
    const pagePromise = context.waitForEvent('page');

    // Click Preview button
    await page.getByRole('button', { name: /preview/i }).first().click();

    // Wait for new tab
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Verify preview URL
    expect(newPage.url()).toContain('/preview?template=');

    // Close the preview tab
    await newPage.close();
  });

  test('should load preview page with template parameter', async ({ page }) => {
    // Navigate directly to preview page
    await page.goto('/preview?template=saas-landing');

    // Page should load successfully
    await expect(page.locator('body')).toBeVisible();
  });
});
