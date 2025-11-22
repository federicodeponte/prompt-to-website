# E2E Test Suite

Comprehensive end-to-end testing for the Prompt-to-Website demo pages using Playwright.

## Quick Start

```bash
# Install dependencies (if not already installed)
npm install -D @playwright/test
npx playwright install chromium

# Run all demo tests
npm run test:e2e:demos

# Or run directly
npx playwright test tests/e2e/demos/demo-audit.spec.ts

# Run against production
BASE_URL=https://prompt-to-website.vercel.app npx playwright test tests/e2e/demos/demo-audit.spec.ts

# View HTML report
npx playwright show-report
```

## Test Coverage

### Demo Pages (12 tests)

**Functional Tests:**
- ✅ Demo Hub Page - All 4 demo cards, stats, navigation
- ✅ One-Click Vercel Deploy - Input fields, deploy button, code preview
- ✅ Multi-Agent AI System - Agent cards, form inputs, run button
- ✅ Real-Time Collaboration - Join flow, editor interface, editing
- ✅ A/B Testing Engine - Test creation, results, variant display

**Responsive Design:**
- ✅ Mobile (375x667 - iPhone SE) - 3 pages tested
- ✅ Tablet (768x1024 - iPad) - 1 page tested

**Quality Assurance:**
- ✅ Navigation Flow - Routing between demo pages
- ✅ Accessibility - WCAG AA compliance (headings, alt text, ARIA)
- ✅ Performance - Load times under 5 seconds

## Directory Structure

```
tests/
├── README.md                          # This file
├── DEMO_AUDIT_SUMMARY.md             # Latest audit report
├── e2e/
│   └── demos/
│       └── demo-audit.spec.ts        # Demo pages test suite
└── screenshots/                       # Generated screenshots (23 files)
    ├── ab-testing-*.png              # A/B Testing demo (5 screenshots)
    ├── collaboration-*.png           # Collaboration demo (5 screenshots)
    ├── demo-hub-*.png                # Demo hub (4 screenshots)
    ├── multi-agent-*.png             # Multi-agent demo (4 screenshots)
    ├── vercel-deploy-*.png           # Vercel deploy demo (4 screenshots)
    └── navigation-flow.png           # Navigation test (1 screenshot)
```

## Test File: demo-audit.spec.ts

**Location:** `tests/e2e/demos/demo-audit.spec.ts`
**Lines of Code:** 360
**Test Cases:** 12
**Assertions:** 50+

### Test Cases

1. **Demo Hub Page** - Verifies all 4 demo cards, stats (4,417 lines, 17 files)
2. **One-Click Vercel Deploy Demo** - Tests input fields, deploy button, info cards, code preview
3. **Multi-Agent AI System Demo** - Validates description, 3 agent cards, input fields
4. **Real-Time Collaboration Demo** - Tests join form, editor interface, editing functionality
5. **A/B Testing Engine Demo** - Verifies test creation, results interface, variant cards
6. **Mobile Responsiveness - Demo Hub** - iPhone SE viewport (375x667)
7. **Mobile Responsiveness - Vercel Deploy** - iPhone SE viewport
8. **Mobile Responsiveness - Multi-Agent** - iPhone SE viewport
9. **Tablet Responsiveness - Demo Hub** - iPad viewport (768x1024)
10. **Navigation Between Demos** - Tests routing and page transitions
11. **Accessibility - Demo Hub** - WCAG AA compliance checks
12. **Performance - Page Load Times** - Validates all pages load < 5s

## Screenshots

All screenshots are saved to `tests/screenshots/` in PNG format.

### Screenshot Types

- **Full Page** - Complete page from top to bottom
- **Viewport** - Visible portion (1920x1080 desktop, or mobile/tablet viewport)
- **Mobile** - iPhone SE (375x667) layout
- **Tablet** - iPad (768x1024) layout
- **Interaction States** - Code preview, editing, test results

### Total: 23 screenshots, 7.4MB

## Performance Benchmarks

Based on latest test run (Production - Vercel):

| Page | Load Time | Status |
|------|-----------|--------|
| /demo/collaboration | 656ms | 🏆 Fastest |
| /demo/multi-agent | 750ms | ⚡ Excellent |
| /demo/ab-testing | 772ms | ⚡ Excellent |
| /demo/vercel-deploy | 820ms | ⚡ Excellent |
| /demo | 1,217ms | ⚡ Excellent |

**Average:** 843ms

## Configuration

Tests use the root `playwright.config.ts` with these settings:

```typescript
{
  testDir: './tests',
  fullyParallel: true,
  workers: 8,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3002', // Default
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  }
}
```

Override `BASE_URL` environment variable for different deployments.

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run demo tests
        run: BASE_URL=${{ secrets.VERCEL_URL }} npx playwright test tests/e2e/demos/

      - name: Upload screenshots
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-screenshots
          path: tests/screenshots/
```

## Troubleshooting

### Tests Failing?

**Check environment:**
```bash
npx playwright --version  # Should be 1.56.1+
node --version            # Should be 20.x
```

**Common issues:**

1. **Selector not found** - Page may not have loaded, increase timeout
2. **Strict mode violation** - Multiple elements match, use `.first()` or more specific selector
3. **Network timeout** - Check BASE_URL is correct and accessible

### View Test Report

```bash
npx playwright show-report
```

### Debug Mode

```bash
# Run in headed mode
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run specific test
npx playwright test -g "Demo Hub Page"
```

## Writing New Tests

### Example Test Structure

```typescript
test('My Demo Feature', async ({ page }) => {
  await page.goto(`${BASE_URL}/demo/my-feature`);

  // Verify page loaded
  await expect(page.locator('h1')).toContainText('My Feature');

  // Test interactions
  await page.locator('button').click();
  await expect(page.locator('.result')).toBeVisible();

  // Take screenshot
  await page.screenshot({
    path: 'tests/screenshots/my-feature.png',
    fullPage: true
  });
});
```

### Best Practices

1. **Use semantic selectors** - Prefer role, label, text over CSS classes
2. **Wait for elements** - Use `expect().toBeVisible()` rather than manual waits
3. **Test user flows** - Simulate real user interactions
4. **Take screenshots** - Document visual state for audit
5. **Keep tests independent** - Each test should run in isolation

## Related Documentation

- [Playwright Documentation](https://playwright.dev)
- [Latest Audit Report](./DEMO_AUDIT_SUMMARY.md)
- [Project README](../README.md)

## Maintenance

**Update frequency:** Run tests before each production deployment
**Screenshot review:** Monthly or when UI changes
**Performance baselines:** Update if infrastructure changes

---

**Last Updated:** November 22, 2025
**Test Status:** ✅ All 12 tests passing
**Coverage:** 100% of demo pages
