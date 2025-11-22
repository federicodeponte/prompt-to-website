import { test, expect } from '@playwright/test';

test('Screenshot preview-template page and generated websites', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Screenshot 1: Preview template page
  console.log('Navigating to preview-template...');
  await page.goto('http://localhost:3000/preview-template');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: 'tests/screenshots/preview-template-page.png',
    fullPage: true
  });
  console.log('✓ Saved: preview-template-page.png');

  // Screenshot 2: Main app homepage
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: 'tests/screenshots/app-homepage.png',
    fullPage: true
  });
  console.log('✓ Saved: app-homepage.png');

  // Screenshot 3: Dashboard
  try {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'tests/screenshots/app-dashboard.png',
      fullPage: true
    });
    console.log('✓ Saved: app-dashboard.png');
  } catch (e) {
    console.log('Dashboard requires auth, skipping');
  }
});
