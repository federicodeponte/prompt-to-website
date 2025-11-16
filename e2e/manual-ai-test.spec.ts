// Manual AI testing with screenshots and detailed inspection
import { test, expect } from '@playwright/test';

test.describe('Manual AI Feature Verification', () => {
  test('full AI conversation flow with screenshots', async ({ page }) => {
    console.log('📸 Step 1: Navigate to /editor/demo');
    await page.goto('http://localhost:3002/editor/demo');
    await page.waitForLoadState('networkidle');

    // Take initial screenshot
    await page.screenshot({ path: 'test-results/01-initial-page.png', fullPage: true });
    console.log('✅ Screenshot saved: 01-initial-page.png');

    // Verify AI Assistant panel exists
    console.log('\n📸 Step 2: Verify AI Assistant panel');
    const aiPanel = page.locator('text=AI Assistant');
    await expect(aiPanel).toBeVisible();
    console.log('✅ AI Assistant panel found');

    // Check mode indicator
    const modeIndicator = page.locator('text=🎨 Editing mode');
    await expect(modeIndicator).toBeVisible();
    console.log('✅ Editing mode indicator visible');

    // Take screenshot of AI panel
    await page.locator('div.flex.h-full.flex-col').first().screenshot({
      path: 'test-results/02-ai-panel.png'
    });
    console.log('✅ Screenshot saved: 02-ai-panel.png');

    // Find input and button
    console.log('\n📸 Step 3: Locate input and send button');
    const input = page.locator('input[placeholder*="Describe your website"]');
    const sendButton = page.locator('button:has-text("Send")');

    await expect(input).toBeVisible();
    await expect(sendButton).toBeVisible();
    await expect(sendButton).toBeDisabled();
    console.log('✅ Input and button found (button disabled as expected)');

    // Type a message
    console.log('\n📸 Step 4: Type test message');
    const testMessage = 'Change the primary color to purple';
    await input.fill(testMessage);
    await expect(sendButton).toBeEnabled();
    console.log(`✅ Typed: "${testMessage}"`);

    await page.screenshot({ path: 'test-results/03-message-typed.png', fullPage: true });
    console.log('✅ Screenshot saved: 03-message-typed.png');

    // Send the message
    console.log('\n📸 Step 5: Send message and wait for response');
    await sendButton.click();

    // Wait for loading state
    const loadingButton = page.locator('button:has-text("Editing...")');
    await expect(loadingButton).toBeVisible({ timeout: 2000 });
    console.log('✅ Loading state detected (Editing...)');

    await page.screenshot({ path: 'test-results/04-loading-state.png', fullPage: true });
    console.log('✅ Screenshot saved: 04-loading-state.png');

    // Wait for response (max 15 seconds for real API)
    console.log('⏳ Waiting for AI response...');
    await page.waitForSelector('text=Send', { state: 'visible', timeout: 20000 });
    console.log('✅ Response received (Send button back)');

    // Check if user message is visible
    const userMessage = page.locator(`text=${testMessage}`).first();
    await expect(userMessage).toBeVisible();
    console.log('✅ User message displayed in chat');

    // Take screenshot after response
    await page.screenshot({ path: 'test-results/05-after-response.png', fullPage: true });
    console.log('✅ Screenshot saved: 05-after-response.png');

    // Inspect the preview area for color change
    console.log('\n📸 Step 6: Inspect preview for color changes');
    const preview = page.locator('.website-renderer').first();
    const previewHtml = await preview.innerHTML();

    // Check if primary color variable changed
    const styleAttr = await preview.getAttribute('style');
    console.log('Preview style attribute:', styleAttr);

    if (styleAttr?.includes('purple') || styleAttr?.includes('#') || styleAttr?.includes('rgb')) {
      console.log('✅ Color CSS variable detected in preview');
    } else {
      console.log('⚠️  No obvious color change detected (might still be valid)');
    }

    await page.screenshot({ path: 'test-results/06-final-state.png', fullPage: true });
    console.log('✅ Screenshot saved: 06-final-state.png');

    // Print chat history
    console.log('\n📸 Step 7: Inspect full chat history');
    const messages = await page.locator('.space-y-4 > div').all();
    console.log(`✅ Total messages in chat: ${messages.length}`);

    for (let i = 0; i < messages.length; i++) {
      const text = await messages[i].textContent();
      console.log(`   Message ${i + 1}: ${text?.substring(0, 100)}...`);
    }

    console.log('\n🎉 Manual test complete!');
  });

  test('verify API endpoint directly', async ({ request }) => {
    console.log('\n🔍 Testing /api/edit endpoint directly');

    const testConfig = {
      version: '1.0',
      template: 'saas-landing',
      theme: {
        colors: {
          primary: '#3B82F6',
          secondary: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937',
          muted: '#6B7280',
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
    };

    const response = await request.post('http://localhost:3002/api/edit', {
      data: {
        config: testConfig,
        instruction: 'Change the primary color to red',
      },
    });

    console.log('API Response Status:', response.status());

    if (response.status() === 200) {
      const data = await response.json();
      console.log('✅ API returned 200 OK');
      console.log('Response has config:', !!data.config);
      console.log('New primary color:', data.config?.theme?.colors?.primary);

      expect(response.status()).toBe(200);
      expect(data.config).toBeDefined();
      expect(data.config.theme.colors.primary).toBeDefined();
    } else {
      const error = await response.text();
      console.log('❌ API Error:', error);
      throw new Error(`API returned ${response.status()}: ${error}`);
    }
  });
});
