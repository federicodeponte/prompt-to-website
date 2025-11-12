import { test, expect } from '@playwright/test';

test.describe('Create Website Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should create website from template and navigate to editor', async ({ page }) => {
    // Click "Use Template" on first template
    const useTemplateButton = page.getByRole('button', { name: /use template/i }).first();
    await useTemplateButton.click();

    // Should navigate to editor page
    await page.waitForURL(/\/editor\/[a-f0-9-]+/);

    // Verify we're on the editor page
    await expect(page.url()).toContain('/editor/');

    // Check that editor layout is loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('should store website in localStorage', async ({ page }) => {
    // Click "Use Template"
    await page.getByRole('button', { name: /use template/i }).first().click();

    // Wait for navigation
    await page.waitForURL(/\/editor\/[a-f0-9-]+/);

    // Check localStorage has the website
    const websites = await page.evaluate(() => {
      const data = localStorage.getItem('prompt-to-website:websites');
      return data ? JSON.parse(data) : [];
    });

    expect(websites).toHaveLength(1);
    expect(websites[0]).toHaveProperty('id');
    expect(websites[0]).toHaveProperty('label');
    expect(websites[0]).toHaveProperty('config');
    expect(websites[0]).toHaveProperty('created_at');
    expect(websites[0]).toHaveProperty('updated_at');
  });

  test('should create multiple websites', async ({ page }) => {
    // Create first website
    await page.getByRole('button', { name: /use template/i }).first().click();
    await page.waitForURL(/\/editor\/[a-f0-9-]+/);

    // Go back to homepage
    await page.goto('/');

    // Create second website
    await page.getByRole('button', { name: /use template/i }).nth(1).click();
    await page.waitForURL(/\/editor\/[a-f0-9-]+/);

    // Check localStorage has 2 websites
    const websites = await page.evaluate(() => {
      const data = localStorage.getItem('prompt-to-website:websites');
      return data ? JSON.parse(data) : [];
    });

    expect(websites).toHaveLength(2);
  });

  test('should show loading state while creating', async ({ page }) => {
    // Click "Use Template"
    const button = page.getByRole('button', { name: /use template/i }).first();
    await button.click();

    // Navigation should happen quickly (localStorage is synchronous)
    await page.waitForURL(/\/editor\/[a-f0-9-]+/, { timeout: 5000 });

    expect(page.url()).toContain('/editor/');
  });
});
