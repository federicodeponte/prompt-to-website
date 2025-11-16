import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing
 * Tests the complete user flows in a real browser environment
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3002',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Use existing dev server on port 3002
  // webServer disabled - run 'npm run dev' manually before tests
  /*
  webServer: {
    command: 'cd /home/federicodeponte/prompt-to-website && npm run dev -- --port 3002',
    url: 'http://localhost:3002',
    reuseExistingServer: true,
    timeout: 120000,
  },
  */
});
