// ABOUTME: Comprehensive Playwright tests for all demo pages
// ABOUTME: Tests UI, functionality, and captures screenshots for audit

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Demo Pages Audit', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Demo Hub Page', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo`);

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Advanced AI Features');

    // Verify all 4 demo cards are present
    await expect(page.locator('text=One-Click Vercel Deploy').first()).toBeVisible();
    await expect(page.locator('text=Multi-Agent AI System').first()).toBeVisible();
    await expect(page.locator('text=Real-Time Collaboration').first()).toBeVisible();
    await expect(page.locator('text=A/B Testing Engine').first()).toBeVisible();

    // Verify stats
    await expect(page.locator('text=4,417').first()).toBeVisible(); // lines of code
    await expect(page.locator('text=17').first()).toBeVisible(); // new files

    // Take full page screenshot
    await page.screenshot({
      path: 'tests/screenshots/demo-hub-full.png',
      fullPage: true
    });

    // Take viewport screenshot
    await page.screenshot({
      path: 'tests/screenshots/demo-hub-viewport.png'
    });
  });

  test('One-Click Vercel Deploy Demo', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/vercel-deploy`);

    // Verify header
    await expect(page.locator('h1')).toContainText('One-Click Vercel Deploy');

    // Verify input field
    const projectNameInput = page.locator('input[placeholder*="awesome"]');
    await expect(projectNameInput).toBeVisible();

    // Verify deploy button
    const deployButton = page.locator('button:has-text("Deploy to Vercel")');
    await expect(deployButton).toBeVisible();

    // Verify info cards
    await expect(page.locator('text=Generated Files')).toBeVisible();
    await expect(page.locator('text=Tech Stack')).toBeVisible();
    await expect(page.locator('text=Features')).toBeVisible();

    // Take screenshots
    await page.screenshot({
      path: 'tests/screenshots/vercel-deploy-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'tests/screenshots/vercel-deploy-viewport.png'
    });

    // Test code preview toggle
    const codePreviewButton = page.locator('button:has-text("Preview")');
    if (await codePreviewButton.isVisible()) {
      await codePreviewButton.click();
      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'tests/screenshots/vercel-deploy-code-preview.png',
        fullPage: true
      });
    }
  });

  test('Multi-Agent AI System Demo', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/multi-agent`);

    // Verify header
    await expect(page.locator('h1')).toContainText('Multi-Agent AI System');

    // Verify description
    await expect(page.locator('text=three specialized AI agents').first()).toBeVisible();

    // Verify agent cards
    await expect(page.locator('text=Content Writer').first()).toBeVisible();
    await expect(page.locator('text=Design Expert').first()).toBeVisible();
    await expect(page.locator('text=SEO Specialist').first()).toBeVisible();

    // Verify input fields
    await expect(page.locator('input#businessName')).toBeVisible();
    await expect(page.locator('input#industry')).toBeVisible();
    await expect(page.locator('textarea#description')).toBeVisible();

    // Verify run button
    const runButton = page.locator('button:has-text("Run Multi-Agent System")');
    await expect(runButton).toBeVisible();

    // Take screenshots
    await page.screenshot({
      path: 'tests/screenshots/multi-agent-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'tests/screenshots/multi-agent-viewport.png'
    });

    // Scroll to agent cards section
    const contentWriterCard = page.locator('div').filter({ hasText: /^Content Writer$/ }).first();
    await contentWriterCard.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: 'tests/screenshots/multi-agent-cards.png'
    });
  });

  test('Real-Time Collaboration Demo', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/collaboration`);

    // Verify header
    await expect(page.locator('h1')).toContainText('Real-Time Collaboration');

    // Verify description
    await expect(page.locator('text=live presence')).toBeVisible();

    // Verify join form
    const nameInput = page.locator('input#userName');
    await expect(nameInput).toBeVisible();

    const joinButton = page.locator('button:has-text("Join Room")');
    await expect(joinButton).toBeVisible();

    // Take screenshots of join page
    await page.screenshot({
      path: 'tests/screenshots/collaboration-join-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'tests/screenshots/collaboration-join-viewport.png'
    });

    // Test joining the room
    await nameInput.fill('Test User');
    await joinButton.click();

    // Wait for collaboration interface
    await page.waitForTimeout(1000);

    // Verify collaboration interface loaded
    await expect(page.locator('text=Collaborative Document')).toBeVisible();

    // Take screenshots of collaborative editor
    await page.screenshot({
      path: 'tests/screenshots/collaboration-editor-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'tests/screenshots/collaboration-editor-viewport.png'
    });

    // Test editing a field
    const titleInput = page.locator('input#title');
    await titleInput.fill('My Test Document');
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'tests/screenshots/collaboration-editing.png'
    });
  });

  test('A/B Testing Engine Demo', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/ab-testing`);

    // Verify header
    await expect(page.locator('h1')).toContainText('A/B Testing Engine');

    // Verify description
    await expect(page.locator('text=statistical significance')).toBeVisible();

    // Verify input fields
    await expect(page.locator('input#testName')).toBeVisible();
    await expect(page.locator('textarea#testDescription')).toBeVisible();

    // Verify variants display
    await expect(page.locator('text=Variant A')).toBeVisible();
    await expect(page.locator('text=Variant B')).toBeVisible();
    await expect(page.locator('text=Variant C')).toBeVisible();

    // Verify create button
    const createButton = page.locator('button:has-text("Create Test")');
    await expect(createButton).toBeVisible();

    // Take screenshots
    await page.screenshot({
      path: 'tests/screenshots/ab-testing-create-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'tests/screenshots/ab-testing-create-viewport.png'
    });

    // Test creating a test
    await createButton.click();
    await page.waitForTimeout(2000);

    // Verify test results interface
    await expect(page.locator('text=Hero Headline Test')).toBeVisible();

    // Take screenshots of results
    await page.screenshot({
      path: 'tests/screenshots/ab-testing-results-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'tests/screenshots/ab-testing-results-viewport.png'
    });

    // Scroll to variant cards section
    const variantCard = page.locator('div').filter({ hasText: /^Variant A - Original$/ }).first();
    await variantCard.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: 'tests/screenshots/ab-testing-variants.png'
    });
  });

  test('Mobile Responsiveness - Demo Hub', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    await page.goto(`${BASE_URL}/demo`);
    await expect(page.locator('h1')).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/demo-hub-mobile.png',
      fullPage: true
    });
  });

  test('Mobile Responsiveness - Vercel Deploy', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(`${BASE_URL}/demo/vercel-deploy`);
    await expect(page.locator('h1')).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/vercel-deploy-mobile.png',
      fullPage: true
    });
  });

  test('Mobile Responsiveness - Multi-Agent', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(`${BASE_URL}/demo/multi-agent`);
    await expect(page.locator('h1')).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/multi-agent-mobile.png',
      fullPage: true
    });
  });

  test('Tablet Responsiveness - Demo Hub', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad

    await page.goto(`${BASE_URL}/demo`);
    await expect(page.locator('h1')).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/demo-hub-tablet.png',
      fullPage: true
    });
  });

  test('Navigation Between Demos', async ({ page }) => {
    // Start at demo hub
    await page.goto(`${BASE_URL}/demo`);

    // Click on Vercel Deploy demo
    await page.locator('a[href="/demo/vercel-deploy"]').first().click();
    await expect(page.locator('h1')).toContainText('One-Click Vercel Deploy');

    // Go back
    await page.goBack();
    await expect(page.locator('h1')).toContainText('Advanced AI Features');

    // Click on Multi-Agent demo
    await page.locator('a[href="/demo/multi-agent"]').first().click();
    await expect(page.locator('h1')).toContainText('Multi-Agent AI System');

    // Screenshot navigation flow
    await page.screenshot({ path: 'tests/screenshots/navigation-flow.png' });
  });

  test('Accessibility - Demo Hub', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo`);

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    // Check for alt text on images (if any)
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check buttons have accessible labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const text = await buttons.nth(i).textContent();
      const ariaLabel = await buttons.nth(i).getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('Performance - Page Load Times', async ({ page }) => {
    const pages = [
      '/demo',
      '/demo/vercel-deploy',
      '/demo/multi-agent',
      '/demo/collaboration',
      '/demo/ab-testing'
    ];

    const results: Record<string, number> = {};

    for (const path of pages) {
      const startTime = Date.now();
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      results[path] = loadTime;
      console.log(`${path}: ${loadTime}ms`);
    }

    // All pages should load within 5 seconds
    Object.values(results).forEach(time => {
      expect(time).toBeLessThan(5000);
    });
  });
});
