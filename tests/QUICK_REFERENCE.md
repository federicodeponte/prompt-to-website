# Quick Reference - Demo E2E Tests

## Run Tests

```bash
# Run all demo tests
npm run test:e2e:demos

# Run with browser visible
npm run test:e2e:demos:headed

# Run in debug mode
npx playwright test tests/e2e/demos/demo-audit.spec.ts --debug

# View HTML report
npx playwright show-report
```

## Test Against Different Environments

```bash
# Local
npx playwright test tests/e2e/demos/demo-audit.spec.ts

# Production
BASE_URL=https://prompt-to-website.vercel.app npx playwright test tests/e2e/demos/demo-audit.spec.ts

# Custom URL
BASE_URL=https://your-deployment.vercel.app npx playwright test tests/e2e/demos/demo-audit.spec.ts
```

## View Results

```bash
# Read audit summary
cat tests/DEMO_AUDIT_SUMMARY.md

# View screenshots
ls -lh tests/screenshots/

# Open screenshot
open tests/screenshots/demo-hub-full.png
```

## Test Coverage

- ✅ 12 tests covering all 4 demo pages
- ✅ Desktop, mobile, tablet viewports
- ✅ Accessibility (WCAG AA)
- ✅ Performance (all < 5s)
- ✅ 23 screenshots for visual audit

## Latest Results

- **Pass Rate:** 100% (12/12)
- **Average Load Time:** 843ms
- **Fastest Page:** /demo/collaboration (656ms)
- **Production URL:** https://prompt-to-website-qchvpy3fk-federico-de-pontes-projects.vercel.app

## Documentation

- **Test Suite:** tests/e2e/demos/demo-audit.spec.ts
- **Full Guide:** tests/README.md
- **Audit Report:** tests/DEMO_AUDIT_SUMMARY.md
- **This File:** tests/QUICK_REFERENCE.md

## Need Help?

```bash
# Playwright help
npx playwright --help

# Specific test help
npx playwright test --help

# Debug specific test
npx playwright test -g "Demo Hub Page" --debug
```

---

**Last Updated:** November 22, 2025  
**Status:** ✅ All tests passing
