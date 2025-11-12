# E2E Testing with Playwright

## Overview

Comprehensive end-to-end tests for the Prompt to Website application using Playwright.

## Test Coverage

### Homepage Tests (`homepage.spec.ts`)
- ✅ Homepage loads successfully
- ✅ Template categories displayed correctly
- ✅ Template cards rendering
- ✅ Category filtering functionality
- ✅ "Use Template" and "Preview" buttons visible

### Create Website Flow (`create-website.spec.ts`)
- ✅ Create website from template
- ✅ Navigate to editor after creation
- ✅ localStorage persistence
- ✅ Multiple website creation
- ✅ Loading states

### Editor Page (`editor.spec.ts`)
- ✅ Editor page loads correctly
- ✅ Website data loads from localStorage
- ✅ 404 handling for non-existent websites
- ✅ Data persistence across reloads

### Preview Functionality (`preview.spec.ts`)
- ✅ Preview opens in new tab
- ✅ Preview page loads with template parameter

### Error Handling (`error-handling.spec.ts`)
- ✅ localStorage quota exceeded
- ✅ Invalid website ID
- ✅ Corrupted localStorage data
- ✅ Network errors

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug
```

## Configuration

The Playwright configuration is in `playwright.config.ts`:
- **Port:** 3001 (avoids conflicts with other projects)
- **Browser:** Chromium only (can add Firefox/WebKit)
- **Timeout:** 30 seconds per test
- **Screenshots:** On failure only
- **Trace:** On first retry

## Test Files

- `e2e/homepage.spec.ts` - Homepage and template gallery tests
- `e2e/create-website.spec.ts` - Website creation flow tests
- `e2e/editor.spec.ts` - Editor page tests
- `e2e/preview.spec.ts` - Preview functionality tests
- `e2e/error-handling.spec.ts` - Error scenarios tests

## Debugging Failed Tests

1. Check screenshots in `test-results/` directory
2. View HTML report: `npx playwright show-report`
3. Run in UI mode: `npm run test:e2e:ui`
4. Run in headed mode to see browser: `npm run test:e2e:headed`

## CI/CD Integration

Tests are configured to run in CI with:
- Retries: 2 attempts
- Workers: 1 (sequential execution)
- No existing server reuse

## Notes

- Dev server runs on port 3001 to avoid conflicts
- Tests use localStorage for data persistence
- All tests are independent and isolated
- Tests clear localStorage between runs
