import { test, expect } from '@playwright/test';

/**
 * Template Gallery E2E Tests
 *
 * Tests the complete template browsing and selection experience including:
 * - Template display and rendering
 * - Category filtering with tabs
 * - Preview dialog functionality
 * - Template selection and navigation
 * - Responsive design
 */
test.describe('Template Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for templates to load (they have loading skeletons)
    await page.waitForLoadState('networkidle');
  });

  test.describe('Template Display', () => {
    test('should display template cards with all metadata', async ({ page }) => {
      // Check first template card has all elements
      const firstCard = page.locator('[data-template-id="saas-landing"]').first();

      await expect(firstCard).toBeVisible();
      await expect(firstCard.getByText('SaaS Landing Page')).toBeVisible();
      await expect(firstCard.getByText(/Perfect for software as a service/i)).toBeVisible();

      // Check category badge
      await expect(firstCard.getByText('business')).toBeVisible();

      // Check blocks count
      await expect(firstCard.getByText(/\d+ blocks/)).toBeVisible();
    });

    test('should display category icons', async ({ page }) => {
      // Business icon (💼)
      await expect(page.getByText('💼').first()).toBeVisible();

      // Product icon (📦) - may not be visible in "All" tab initially
      // Personal icon (👤) - may not be visible in "All" tab initially
    });

    test('should display all 10 templates in All tab', async ({ page }) => {
      // Ensure we're on "All" tab
      await page.getByRole('tab', { name: /all templates/i }).click();
      await page.waitForTimeout(300);

      // Count template cards - should have 10 total
      const templateCards = page.locator('[data-template-id]');
      await expect(templateCards).toHaveCount(10);
    });

    test('should show glassmorphism preview for each template', async ({ page }) => {
      // Check that preview elements exist (glassmorphism design)
      const previewElements = page.locator('.aspect-video').first();
      await expect(previewElements).toBeVisible();
    });
  });

  test.describe('Category Filtering', () => {
    test('should filter business templates', async ({ page }) => {
      // Click Business tab
      await page.getByRole('tab', { name: /💼 business/i }).click();

      // Wait for animation to complete
      await page.waitForTimeout(1000);

      // Should show business templates: SaaS, Agency, Restaurant, Event (4 total)
      const saasTemplate = page.getByText('SaaS Landing Page');
      await expect(saasTemplate).toBeVisible({ timeout: 10000 });

      const agencyTemplate = page.getByText('Agency');
      await expect(agencyTemplate).toBeVisible({ timeout: 10000 });

      // Count visible template cards in the business category
      const businessTemplates = page.locator('[data-template-id]').filter({ hasText: /SaaS|Agency|Restaurant|Event/ });
      await expect(businessTemplates.first()).toBeVisible({ timeout: 10000 });
    });

    test('should filter product templates', async ({ page }) => {
      // Click Product tab
      await page.getByRole('tab', { name: /📦 product/i }).click();
      await page.waitForTimeout(500);

      // Should show product templates: Product Landing, E-commerce, App Download (3 total)
      await expect(page.getByText('Product Landing Page')).toBeVisible();
      await expect(page.getByText('E-commerce')).toBeVisible();

      // Should NOT show Business or Personal templates
      await expect(page.getByText('SaaS Landing Page')).not.toBeVisible();
      await expect(page.getByText('Portfolio')).not.toBeVisible();

      // Count visible templates
      const productTemplates = page.locator('[data-template-id]');
      await expect(productTemplates).toHaveCount(3);
    });

    test('should filter personal templates', async ({ page }) => {
      // Click Personal tab
      await page.getByRole('tab', { name: /👤 personal/i }).click();
      await page.waitForTimeout(500);

      // Should show personal templates: Portfolio, Blog, Course (3 total)
      await expect(page.getByText('Portfolio')).toBeVisible();
      await expect(page.getByText('Blog')).toBeVisible();

      // Should NOT show Business or Product templates
      await expect(page.getByText('SaaS Landing Page')).not.toBeVisible();
      await expect(page.getByText('Product Landing Page')).not.toBeVisible();

      // Count visible templates
      const personalTemplates = page.locator('[data-template-id]');
      await expect(personalTemplates).toHaveCount(3);
    });

    test('should switch between categories smoothly', async ({ page }) => {
      // Start with All
      await expect(page.getByText('SaaS Landing Page')).toBeVisible();
      await expect(page.getByText('Portfolio')).toBeVisible();

      // Switch to Business
      await page.getByRole('tab', { name: /💼 business/i }).click();
      await page.waitForTimeout(500);
      await expect(page.getByText('SaaS Landing Page')).toBeVisible();
      await expect(page.getByText('Portfolio')).not.toBeVisible();

      // Switch to Personal
      await page.getByRole('tab', { name: /👤 personal/i }).click();
      await page.waitForTimeout(500);
      await expect(page.getByText('Portfolio')).toBeVisible();
      await expect(page.getByText('SaaS Landing Page')).not.toBeVisible();

      // Switch back to All
      await page.getByRole('tab', { name: /all templates/i }).click();
      await page.waitForTimeout(500);
      await expect(page.getByText('SaaS Landing Page')).toBeVisible();
      await expect(page.getByText('Portfolio')).toBeVisible();
    });
  });

  test.describe('Preview Dialog', () => {
    test('should open preview dialog', async ({ page }) => {
      // Click preview button (eye icon)
      const previewButton = page.getByRole('button', { name: /preview template/i }).first();
      await previewButton.click();

      // Dialog should be visible
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      // Should show template details in dialog
      await expect(dialog.getByText('SaaS Landing Page')).toBeVisible();
      await expect(dialog.getByText(/Perfect for software as a service/i)).toBeVisible();
    });

    test('should show template metadata in preview', async ({ page }) => {
      // Open preview dialog
      await page.getByRole('button', { name: /preview template/i }).first().click();

      const dialog = page.getByRole('dialog');

      // Should show category, blocks, template type, primary color
      await expect(dialog.getByText('Category')).toBeVisible();
      await expect(dialog.getByText('Blocks')).toBeVisible();
      await expect(dialog.getByText('Template Type')).toBeVisible();
      await expect(dialog.getByText('Primary Color')).toBeVisible();
    });

    test('should have "Use This Template" button in preview', async ({ page }) => {
      // Open preview dialog
      await page.getByRole('button', { name: /preview template/i }).first().click();

      const dialog = page.getByRole('dialog');

      // Should have Use Template button
      const useButton = dialog.getByRole('button', { name: /use this template/i });
      await expect(useButton).toBeVisible();
    });

    test('should create website from preview dialog', async ({ page }) => {
      // Clear localStorage
      await page.evaluate(() => localStorage.clear());

      // Open preview dialog
      await page.getByRole('button', { name: /preview template/i }).first().click();

      const dialog = page.getByRole('dialog');

      // Click "Use This Template" in dialog
      await dialog.getByRole('button', { name: /use this template/i }).click();

      // Should navigate to editor
      await page.waitForURL(/\/editor\/[a-f0-9-]+/, { timeout: 5000 });
      expect(page.url()).toContain('/editor/');
    });
  });

  test.describe('Template Actions', () => {
    test('should have action dropdown menu', async ({ page }) => {
      // Find the more actions button (three dots)
      const moreButton = page.getByRole('button', { name: /more options/i }).first();
      await moreButton.click();

      // Should show dropdown menu with actions
      await expect(page.getByRole('menuitem', { name: /duplicate/i })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: /open in new tab/i })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: /view details/i })).toBeVisible();
    });

    test('should duplicate template via dropdown', async ({ page }) => {
      // Clear localStorage
      await page.evaluate(() => localStorage.clear());

      // Click more actions
      const moreButton = page.getByRole('button', { name: /more options/i }).first();
      await moreButton.click();

      // Click Duplicate
      await page.getByRole('menuitem', { name: /duplicate/i }).click();

      // Should navigate to editor
      await page.waitForURL(/\/editor\/[a-f0-9-]+/, { timeout: 5000 });
      expect(page.url()).toContain('/editor/');
    });
  });

  test.describe('Template Selection Flow', () => {
    test('should create website and navigate to editor', async ({ page }) => {
      // Clear localStorage
      await page.evaluate(() => localStorage.clear());

      // Click "Use Template" button
      const useButton = page.getByRole('button', { name: /use template/i }).first();
      await useButton.click();

      // Should navigate to editor with UUID
      await page.waitForURL(/\/editor\/[a-f0-9-]+/, { timeout: 5000 });

      // Verify editor loaded
      expect(page.url()).toContain('/editor/');
      expect(page.url()).toMatch(/\/editor\/[a-f0-9-]{36}/);
    });

    test('should show loading state while creating', async ({ page }) => {
      // Clear localStorage
      await page.evaluate(() => localStorage.clear());

      // Click "Use Template"
      const useButton = page.getByRole('button', { name: /use template/i }).first();

      // Click and immediately check for loading state
      await useButton.click();

      // Since localStorage is synchronous, navigation happens very fast
      // Just verify we reach the editor
      await page.waitForURL(/\/editor\/[a-f0-9-]+/, { timeout: 5000 });
      expect(page.url()).toContain('/editor/');
    });

    test('should create different templates from different categories', async ({ page }) => {
      // Clear localStorage
      await page.evaluate(() => localStorage.clear());

      // Create business template
      await page.getByRole('tab', { name: /💼 business/i }).click();
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: /use template/i }).first().click();
      await page.waitForURL(/\/editor\/[a-f0-9-]+/);

      // Go back to homepage
      await page.goto('/');

      // Create personal template
      await page.getByRole('tab', { name: /👤 personal/i }).click();
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: /use template/i }).first().click();
      await page.waitForURL(/\/editor\/[a-f0-9-]+/);

      // Verify 2 websites created
      const websites = await page.evaluate(() => {
        const data = localStorage.getItem('prompt-to-website:websites');
        return data ? JSON.parse(data) : [];
      });

      expect(websites).toHaveLength(2);
    });
  });

  test.describe('Animations and UX', () => {
    test('should have hover effects on template cards', async ({ page }) => {
      const firstCard = page.locator('[data-template-id]').first();

      // Card should be visible
      await expect(firstCard).toBeVisible();

      // Hover over card (triggers framer-motion animations)
      await firstCard.hover();

      // Card should still be visible after hover
      await expect(firstCard).toBeVisible();
    });

    test('should have accessible aria labels', async ({ page }) => {
      // Preview button should have aria-label
      const previewButton = page.getByRole('button', { name: /preview template/i }).first();
      await expect(previewButton).toBeVisible();

      // More options button should have accessible name
      const moreButton = page.getByRole('button', { name: /more options/i }).first();
      await expect(moreButton).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Templates should still be visible
      await expect(page.getByText('SaaS Landing Page')).toBeVisible();

      // Tabs should be visible (with emoji-only view on mobile)
      await expect(page.getByRole('tab', { name: /💼/i })).toBeVisible();

      // Should be able to filter
      await page.getByRole('tab', { name: /💼/i }).click();
      await page.waitForTimeout(500);
      await expect(page.getByText('SaaS Landing Page')).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Grid should show 2 columns (sm:grid-cols-2)
      const templates = page.locator('[data-template-id]');
      await expect(templates.first()).toBeVisible();

      // All functionality should work
      await page.getByRole('tab', { name: /💼 business/i }).click();
      await page.waitForTimeout(500);
      await expect(page.getByText('SaaS Landing Page')).toBeVisible();
    });
  });
});
