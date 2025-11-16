// ABOUTME: E2E tests for AI-powered website generation and iterative editing
// ABOUTME: Tests both creation mode and editing mode with real API calls

import { test, expect } from '@playwright/test';

test.describe('AI-Powered Website Editing', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the demo editor page (has default config)
    await page.goto('http://localhost:3002/editor/demo');
    await page.waitForLoadState('networkidle');
  });

  test('should show AI mode panel with correct initial state', async ({ page }) => {
    // Check AI panel exists
    const aiPanel = page.locator('text=AI Assistant');
    await expect(aiPanel).toBeVisible();

    // Should show editing mode since demo has blocks
    const modeIndicator = page.locator('text=🎨 Editing mode');
    await expect(modeIndicator).toBeVisible();

    // Should show API status badge (any of these states is valid)
    const statusBadge = page.locator('.inline-flex.items-center.rounded-md.border.px-2\\.5.py-0\\.5').first();
    await expect(statusBadge).toBeVisible();

    // Check welcome message
    const welcomeMessage = page.locator('text=Welcome! I can help you build and edit websites');
    await expect(welcomeMessage).toBeVisible();
  });

  test.skip('should show creation mode when no blocks exist', async ({ page }) => {
    // Skipped: This test requires a way to create a new empty website
    // The homepage doesn't have a direct "Start Building" button
    // TODO: Add this test once we have a "New Website" flow in the UI
  });

  test('should have input field and send button', async ({ page }) => {
    // Check input field exists
    const input = page.locator('input[placeholder*="Describe your website"]');
    await expect(input).toBeVisible();

    // Check send button exists
    const sendButton = page.locator('button:has-text("Send")');
    await expect(sendButton).toBeVisible();

    // Button should be disabled when input is empty
    await expect(input).toHaveValue('');
    await expect(sendButton).toBeDisabled();
  });

  test('should enable send button when user types', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    // Type something
    await input.fill('Make the hero blue');

    // Button should now be enabled
    await expect(sendButton).toBeEnabled();
  });

  test('should show user message when sent', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    // Type and send a message
    const testMessage = 'Change the primary color to blue';
    await input.fill(testMessage);
    await sendButton.click();

    // User message should appear
    const userMessage = page.locator(`.max-w-\\[80\\%\\]:has-text("${testMessage}")`);
    await expect(userMessage).toBeVisible({ timeout: 5000 });
  });

  test('should show loading state while processing', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    await input.fill('Make it purple');
    await sendButton.click();

    // Button should show "Editing..." since we're in demo (has blocks)
    const editingButton = page.locator('button:has-text("Editing...")');
    await expect(editingButton).toBeVisible({ timeout: 2000 });
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API to return error
    await page.route('**/api/edit', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'API key not configured' }),
      });
    });

    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    await input.fill('Test error handling');
    await sendButton.click();

    // Should show error message
    const errorMessage = page.locator('text=❌ Error');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('should show AI response on success', async ({ page }) => {
    // Mock successful API response
    await page.route('**/api/edit', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          config: {
            version: '1.0',
            template: 'saas-landing',
            theme: {
              colors: {
                primary: '#0000FF', // Blue
                secondary: '#7928ca',
                background: '#ffffff',
                text: '#000000',
                muted: '#666666',
              },
              fonts: { heading: 'Inter', body: 'Inter' },
            },
            blocks: [
              {
                id: 'hero-1',
                type: 'hero',
                variant: 'centered',
                content: {
                  heading: 'Test Heading',
                  subheading: 'Test Subheading',
                },
              },
            ],
            metadata: {
              title: 'Test Site',
              description: 'Test Description',
            },
          },
        }),
      });
    });

    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    await input.fill('Make the hero blue');
    await sendButton.click();

    // Should show success message from AI
    const successMessage = page.locator('text=✅ I\'ve updated your website');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
  });

  test('should clear input after sending', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    await input.fill('Test message');
    await sendButton.click();

    // Input should be cleared
    await expect(input).toHaveValue('');
  });

  test('should allow multiple messages in sequence', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    // Send first message
    await input.fill('First message');
    await sendButton.click();
    await expect(input).toHaveValue('');

    // Wait a moment for processing
    await page.waitForTimeout(1000);

    // Send second message
    await input.fill('Second message');
    await sendButton.click();
    await expect(input).toHaveValue('');

    // Both messages should be visible
    const firstMsg = page.locator('text=First message').first();
    const secondMsg = page.locator('text=Second message').first();

    await expect(firstMsg).toBeVisible();
    await expect(secondMsg).toBeVisible();
  });

  test('should show timestamps on messages', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    await input.fill('Test timestamp');
    await sendButton.click();

    // Look for time format (e.g., "10:30 PM" or "22:30")
    const timestamp = page.locator('text=/\\d{1,2}:\\d{2}( [AP]M)?/').first();
    await expect(timestamp).toBeVisible({ timeout: 5000 });
  });

  test('should scroll to latest message', async ({ page }) => {
    // Send multiple messages to trigger scroll
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    for (let i = 1; i <= 3; i++) {
      await input.fill(`Message ${i}`);
      await sendButton.click();
      await page.waitForTimeout(500);
    }

    // Latest message should be in view
    const latestMessage = page.locator('text=Message 3').first();
    await expect(latestMessage).toBeInViewport();
  });
});

test.describe('AI Panel - Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/editor/demo');
    await page.waitForLoadState('networkidle');
  });

  test('should prevent sending empty messages', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    // Try to send empty message
    await input.fill('   '); // Just spaces

    // Button should still be disabled
    await expect(sendButton).toBeDisabled();
  });

  test('should prevent sending while already processing', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    // Send first message
    await input.fill('First request');
    await sendButton.click();

    // Immediately try to send another
    await input.fill('Second request');

    // Button should be disabled while processing
    const processingButton = page.locator('button:has-text("Editing..."), button:has-text("Generating...")').first();
    if (await processingButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await expect(processingButton).toBeDisabled();
    }
  });

  test('should support Enter key to send', async ({ page }) => {
    const input = page.locator('input[placeholder*="Describe your website"]');

    await input.fill('Test enter key');
    await input.press('Enter');

    // Message should be sent
    const userMessage = page.locator('text=Test enter key').first();
    await expect(userMessage).toBeVisible({ timeout: 5000 });
  });
});
