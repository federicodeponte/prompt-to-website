import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole('heading', { name: /Build Beautiful Websites/i })).toBeVisible();
  });

  test('should display all template categories', async ({ page }) => {
    // Check for category filter buttons
    await expect(page.getByRole('button', { name: /all templates/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /business/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /product/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /personal/i })).toBeVisible();
  });

  test('should display at least 3 templates', async ({ page }) => {
    // Check that we have multiple templates
    await expect(page.getByText('SaaS Landing Page').first()).toBeVisible();
    await expect(page.getByText('Product Landing Page').first()).toBeVisible();
    await expect(page.getByText('Portfolio').first()).toBeVisible();
  });

  test('should filter templates by category', async ({ page }) => {
    // Click Business filter
    await page.getByRole('button', { name: /💼 business/i }).click();

    // Should show SaaS template
    await expect(page.getByText('SaaS Landing Page').first()).toBeVisible();

    // Should NOT show Portfolio (personal category)
    await expect(page.getByText('Portfolio').first()).not.toBeVisible();

    // Click back to All
    await page.getByRole('button', { name: /all templates/i }).click();

    // Now Portfolio should be visible again
    await expect(page.getByText('Portfolio').first()).toBeVisible();
  });

  test('should have "Use Template" buttons', async ({ page }) => {
    const useTemplateButtons = page.getByRole('button', { name: /use template/i });
    await expect(useTemplateButtons.first()).toBeVisible();
  });

  test('should have "Preview" buttons', async ({ page }) => {
    const previewButtons = page.getByRole('button', { name: /preview/i });
    await expect(previewButtons.first()).toBeVisible();
  });
});
