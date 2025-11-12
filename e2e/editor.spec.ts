import { test, expect } from '@playwright/test';

test.describe('Editor Page', () => {
  let websiteId: string;

  test.beforeEach(async ({ page }) => {
    // Clear localStorage and create a test website
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Create website from template
    await page.getByRole('button', { name: /use template/i }).first().click();

    // Wait for navigation and extract ID
    await page.waitForURL(/\/editor\/[a-f0-9-]+/);
    websiteId = page.url().split('/').pop() || '';
  });

  test('should load editor page successfully', async ({ page }) => {
    // Already on editor page from beforeEach
    expect(page.url()).toContain('/editor/');
    expect(page.url()).toContain(websiteId);

    // Page should be loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load website data from localStorage', async ({ page }) => {
    // Verify the website exists in localStorage
    const website = await page.evaluate((id) => {
      const data = localStorage.getItem('prompt-to-website:websites');
      const websites = data ? JSON.parse(data) : [];
      return websites.find((w: { id: string }) => w.id === id);
    }, websiteId);

    expect(website).toBeTruthy();
    expect(website.id).toBe(websiteId);
    expect(website.config).toBeTruthy();
  });

  test('should handle 404 for non-existent website', async ({ page }) => {
    // Navigate to non-existent website ID
    await page.goto('/editor/non-existent-id');

    // Should show 404 page or error state
    // Wait for Next.js to handle the 404
    await page.waitForLoadState('networkidle');

    // Check if we got a 404 or error page
    const content = await page.textContent('body');
    const is404 = content?.toLowerCase().includes('not found') ||
                  content?.toLowerCase().includes('404') ||
                  page.url().includes('not-found');

    expect(is404).toBeTruthy();
  });

  test('should maintain data persistence across page reloads', async ({ page }) => {
    // Get current URL
    const currentUrl = page.url();

    // Reload the page
    await page.reload();

    // Should still be on the same editor page
    expect(page.url()).toBe(currentUrl);

    // Data should still be in localStorage
    const website = await page.evaluate((id) => {
      const data = localStorage.getItem('prompt-to-website:websites');
      const websites = data ? JSON.parse(data) : [];
      return websites.find((w: { id: string }) => w.id === id);
    }, websiteId);

    expect(website).toBeTruthy();
  });
});
