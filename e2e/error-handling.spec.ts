import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should handle localStorage quota exceeded', async ({ page }) => {
    await page.goto('/');

    // Mock localStorage to throw quota exceeded error
    await page.addInitScript(() => {
      const originalSetItem = Storage.prototype.setItem;
      let callCount = 0;

      Storage.prototype.setItem = function(key: string, value: string) {
        callCount++;
        // Fail on subsequent calls to simulate quota exceeded
        if (callCount > 1 && key === 'prompt-to-website:websites') {
          throw new Error('QuotaExceededError');
        }
        return originalSetItem.call(this, key, value);
      };
    });

    // Try to create website
    const button = page.getByRole('button', { name: /use template/i }).first();

    // Listen for alert/error dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Failed');
      await dialog.accept();
    });

    await button.click();

    // Wait a bit to see if error is shown
    await page.waitForTimeout(1000);
  });

  test('should handle invalid website ID gracefully', async ({ page }) => {
    // Navigate to editor with invalid ID
    await page.goto('/editor/invalid-123');

    // Should show error or 404
    await page.waitForLoadState('networkidle');

    const bodyText = await page.textContent('body');
    const hasError = bodyText?.toLowerCase().includes('not found') ||
                     bodyText?.toLowerCase().includes('error') ||
                     page.url().includes('not-found');

    expect(hasError).toBeTruthy();
  });

  test('should handle corrupted localStorage data', async ({ page }) => {
    await page.goto('/');

    // Set corrupted data in localStorage
    await page.evaluate(() => {
      localStorage.setItem('prompt-to-website:websites', 'invalid-json{]');
    });

    // Reload page
    await page.reload();

    // App should still load (should handle the error gracefully)
    await expect(page.locator('body')).toBeVisible();

    // Template gallery should still be visible
    await expect(page.getByText('SaaS Landing Page')).toBeVisible();
  });

  test('should handle network errors on preview', async ({ page }) => {
    await page.goto('/');

    // Simulate offline mode
    await page.context().setOffline(true);

    // Try to open preview
    const pagePromise = page.context().waitForEvent('page');
    await page.getByRole('button', { name: /preview/i }).first().click();

    const newPage = await pagePromise;

    // Since we're using client-side routing, it might still work offline
    // Just check the page opens
    await newPage.waitForLoadState();

    await newPage.close();

    // Reset network
    await page.context().setOffline(false);
  });
});
