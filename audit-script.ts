import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://prompt-to-website-kxwgiux78-federico-de-pontes-projects.vercel.app';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'audit-screenshots');

interface AuditResult {
  url: string;
  screenshot: string;
  consoleErrors: string[];
  consoleWarnings: string[];
  networkErrors: string[];
  elements: {
    buttons: number;
    inputs: number;
    links: number;
  };
  loadTime: number;
  pageTitle: string;
  visible: boolean;
}

async function auditPage(url: string, name: string, actions?: (page: any) => Promise<void>): Promise<AuditResult> {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  const networkErrors: string[] = [];

  // Listen to console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[CONSOLE ERROR] ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(`[CONSOLE WARNING] ${msg.text()}`);
    }
  });

  // Listen to network failures
  page.on('requestfailed', request => {
    networkErrors.push(`[NETWORK ERROR] ${request.url()} - ${request.failure()?.errorText}`);
  });

  const startTime = Date.now();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (error) {
    consoleErrors.push(`[PAGE LOAD ERROR] ${error}`);
  }

  const loadTime = Date.now() - startTime;

  // Execute custom actions if provided
  if (actions) {
    try {
      await actions(page);
      await page.waitForTimeout(1000); // Wait for any animations
    } catch (error) {
      consoleErrors.push(`[ACTION ERROR] ${error}`);
    }
  }

  // Take screenshot
  const screenshotPath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // Count elements
  const buttons = await page.locator('button').count();
  const inputs = await page.locator('input, textarea').count();
  const links = await page.locator('a').count();

  const pageTitle = await page.title();
  const visible = await page.isVisible('body');

  await browser.close();

  return {
    url,
    screenshot: screenshotPath,
    consoleErrors,
    consoleWarnings,
    networkErrors,
    elements: { buttons, inputs, links },
    loadTime,
    pageTitle,
    visible
  };
}

async function runAudit() {
  console.log('🔍 Starting Production Deployment Audit...\n');

  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const results: Record<string, AuditResult> = {};

  // 1. Homepage
  console.log('📸 Auditing Homepage...');
  results.homepage = await auditPage(BASE_URL, 'homepage');

  // 2. Editor page (if exists)
  console.log('📸 Auditing Editor...');
  results.editor = await auditPage(`${BASE_URL}/editor`, 'editor');

  // 3. Templates page (if exists)
  console.log('📸 Auditing Templates...');
  results.templates = await auditPage(`${BASE_URL}/templates`, 'templates');

  // 4. AI Mode Panel - Check if it loads
  console.log('📸 Auditing AI Mode Panel...');
  results.aiMode = await auditPage(BASE_URL, 'ai-mode', async (page) => {
    // Try to find and click AI mode button
    const aiButton = page.locator('button:has-text("AI"), [data-testid="ai-mode"]').first();
    if (await aiButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await aiButton.click();
      await page.waitForTimeout(2000);
    }
  });

  // 5. Template Gallery - Try to interact
  console.log('📸 Auditing Template Interaction...');
  results.templateInteraction = await auditPage(`${BASE_URL}/templates`, 'template-interaction', async (page) => {
    const templateCard = page.locator('[data-testid="template-card"], .template-card').first();
    if (await templateCard.isVisible({ timeout: 2000 }).catch(() => false)) {
      await templateCard.click();
      await page.waitForTimeout(2000);
    }
  });

  // 6. Check 404 page
  console.log('📸 Auditing 404 Page...');
  results.notFound = await auditPage(`${BASE_URL}/this-does-not-exist`, '404-page');

  // Generate report
  console.log('\n' + '='.repeat(80));
  console.log('📊 AUDIT REPORT');
  console.log('='.repeat(80) + '\n');

  let totalErrors = 0;
  let totalWarnings = 0;
  const criticalIssues: string[] = [];
  const minorIssues: string[] = [];
  const workingFeatures: string[] = [];

  for (const [pageName, result] of Object.entries(results)) {
    console.log(`\n### ${pageName.toUpperCase()}`);
    console.log(`URL: ${result.url}`);
    console.log(`Title: ${result.pageTitle}`);
    console.log(`Load Time: ${result.loadTime}ms`);
    console.log(`Visible: ${result.visible ? '✅' : '❌'}`);
    console.log(`Elements: ${result.elements.buttons} buttons, ${result.elements.inputs} inputs, ${result.elements.links} links`);

    if (result.consoleErrors.length > 0) {
      console.log(`\n🔴 Console Errors (${result.consoleErrors.length}):`);
      result.consoleErrors.forEach(err => console.log(`  - ${err}`));
      totalErrors += result.consoleErrors.length;

      // Categorize critical vs minor
      result.consoleErrors.forEach(err => {
        if (err.includes('Failed to load') || err.includes('404') || err.includes('500')) {
          criticalIssues.push(`[${pageName}] ${err}`);
        } else {
          minorIssues.push(`[${pageName}] ${err}`);
        }
      });
    }

    if (result.consoleWarnings.length > 0) {
      console.log(`\n⚠️  Console Warnings (${result.consoleWarnings.length}):`);
      result.consoleWarnings.forEach(warn => console.log(`  - ${warn}`));
      totalWarnings += result.consoleWarnings.length;
    }

    if (result.networkErrors.length > 0) {
      console.log(`\n🌐 Network Errors (${result.networkErrors.length}):`);
      result.networkErrors.forEach(err => console.log(`  - ${err}`));
      totalErrors += result.networkErrors.length;
      result.networkErrors.forEach(err => criticalIssues.push(`[${pageName}] ${err}`));
    }

    if (result.visible && result.consoleErrors.length === 0 && result.networkErrors.length === 0) {
      workingFeatures.push(`${pageName} page loads successfully`);
    }

    console.log(`Screenshot: ${result.screenshot}`);
  }

  // Final Grade Calculation
  console.log('\n' + '='.repeat(80));
  console.log('🎯 FINAL ASSESSMENT');
  console.log('='.repeat(80) + '\n');

  let grade = 'A+';
  let reasoning = '';

  if (criticalIssues.length > 5) {
    grade = 'F';
    reasoning = 'Multiple critical failures preventing core functionality';
  } else if (criticalIssues.length > 2) {
    grade = 'D';
    reasoning = 'Several critical issues affecting user experience';
  } else if (criticalIssues.length > 0 || totalErrors > 10) {
    grade = 'C';
    reasoning = 'Some critical issues or many minor errors';
  } else if (totalErrors > 5 || totalWarnings > 10) {
    grade = 'B';
    reasoning = 'Minor errors and warnings present';
  } else if (totalErrors > 0 || totalWarnings > 5) {
    grade = 'B+';
    reasoning = 'Few minor issues, mostly working';
  } else if (totalWarnings > 0) {
    grade = 'A';
    reasoning = 'Fully functional with minor warnings';
  } else {
    grade = 'A+';
    reasoning = 'Perfect deployment with no issues';
  }

  console.log(`\n📊 Overall Grade: ${grade}`);
  console.log(`📝 Reasoning: ${reasoning}\n`);

  console.log(`📈 Statistics:`);
  console.log(`  - Total Errors: ${totalErrors}`);
  console.log(`  - Total Warnings: ${totalWarnings}`);
  console.log(`  - Critical Issues: ${criticalIssues.length}`);
  console.log(`  - Minor Issues: ${minorIssues.length}`);
  console.log(`  - Working Features: ${workingFeatures.length}\n`);

  if (criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES (Fix Immediately):');
    criticalIssues.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
    console.log('');
  }

  if (minorIssues.length > 0) {
    console.log('⚠️  MINOR ISSUES (Fix Later):');
    minorIssues.slice(0, 10).forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
    if (minorIssues.length > 10) {
      console.log(`  ... and ${minorIssues.length - 10} more`);
    }
    console.log('');
  }

  if (workingFeatures.length > 0) {
    console.log('✅ WORKING FEATURES:');
    workingFeatures.forEach((feature, i) => console.log(`  ${i + 1}. ${feature}`));
    console.log('');
  }

  console.log('='.repeat(80));
  console.log('✨ Audit Complete! Screenshots saved to:', SCREENSHOTS_DIR);
  console.log('='.repeat(80));

  // Save detailed report as JSON
  const reportPath = path.join(SCREENSHOTS_DIR, 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    grade,
    reasoning,
    statistics: {
      totalErrors,
      totalWarnings,
      criticalIssues: criticalIssues.length,
      minorIssues: minorIssues.length,
      workingFeatures: workingFeatures.length
    },
    criticalIssues,
    minorIssues,
    workingFeatures,
    detailedResults: results
  }, null, 2));

  console.log(`📄 Detailed JSON report saved to: ${reportPath}\n`);
}

runAudit().catch(console.error);
