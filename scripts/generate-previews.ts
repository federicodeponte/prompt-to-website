#!/usr/bin/env tsx
// ABOUTME: Script to generate preview screenshots for all templates
// ABOUTME: Uses Playwright to capture screenshots and sharp to optimize to WebP

import { chromium } from 'playwright';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { templates } from '../src/lib/templates';

const OUTPUT_DIR = join(process.cwd(), 'public', 'templates');
const SCREENSHOT_WIDTH = 1200;
const SCREENSHOT_HEIGHT = 900;
const OPTIMIZED_WIDTH = 600;
const OPTIMIZED_HEIGHT = 450;
const MAX_FILE_SIZE_KB = 50;

interface ScreenshotResult {
  templateId: string;
  success: boolean;
  filePath?: string;
  fileSizeKb?: number;
  error?: string;
}

async function generatePreviews(): Promise<void> {
  console.log('🎬 Starting template preview generation...\n');

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created output directory: ${OUTPUT_DIR}\n`);

  // Launch browser
  console.log('🌐 Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: SCREENSHOT_WIDTH, height: SCREENSHOT_HEIGHT },
    deviceScaleFactor: 2, // 2x for retina displays
  });

  const results: ScreenshotResult[] = [];

  for (const template of templates) {
    console.log(`\n📸 Processing: ${template.name} (${template.id})`);

    try {
      // Create a new page
      const page = await context.newPage();

      // Navigate to the preview page with this template
      const port = process.env.PORT || '3001';
      const url = `http://localhost:${port}/preview-template?template=${template.id}`;
      console.log(`   Loading: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for content to fully render
      console.log('   Waiting for render...');
      await page.waitForTimeout(2000);

      // Take full page screenshot
      console.log('   Capturing screenshot...');
      const screenshotBuffer = await page.screenshot({
        type: 'png',
        fullPage: false, // Just the viewport
      });

      // Optimize and convert to WebP
      console.log('   Optimizing to WebP...');
      const optimizedBuffer = await sharp(screenshotBuffer)
        .resize(OPTIMIZED_WIDTH, OPTIMIZED_HEIGHT, {
          fit: 'cover',
          position: 'top',
        })
        .webp({
          quality: 85,
          effort: 6,
        })
        .toBuffer();

      const fileSizeKb = Math.round(optimizedBuffer.length / 1024);

      // Save the optimized image
      const filePath = join(OUTPUT_DIR, `${template.id}.webp`);
      await writeFile(filePath, optimizedBuffer);

      console.log(`   ✅ Saved: ${filePath} (${fileSizeKb}KB)`);

      if (fileSizeKb > MAX_FILE_SIZE_KB) {
        console.log(`   ⚠️  Warning: File size (${fileSizeKb}KB) exceeds target (${MAX_FILE_SIZE_KB}KB)`);
      }

      results.push({
        templateId: template.id,
        success: true,
        filePath,
        fileSizeKb,
      });

      await page.close();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`   ❌ Error: ${errorMessage}`);

      results.push({
        templateId: template.id,
        success: false,
        error: errorMessage,
      });
    }
  }

  await browser.close();

  // Print summary
  console.log('\n\n📊 Generation Summary');
  console.log('='.repeat(60));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`✅ Successful: ${successful.length}/${templates.length}`);
  console.log(`❌ Failed: ${failed.length}/${templates.length}`);

  if (successful.length > 0) {
    console.log('\n✅ Successfully generated:');
    successful.forEach((r) => {
      console.log(`   - ${r.templateId} (${r.fileSizeKb}KB)`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed to generate:');
    failed.forEach((r) => {
      console.log(`   - ${r.templateId}: ${r.error}`);
    });
  }

  const totalSize = successful.reduce((sum, r) => sum + (r.fileSizeKb || 0), 0);
  const avgSize = totalSize / successful.length;

  console.log(`\n📦 Total size: ${totalSize}KB`);
  console.log(`📊 Average size: ${avgSize.toFixed(1)}KB`);
  console.log('\n✨ Done!');

  // Exit with error code if any failed
  if (failed.length > 0) {
    process.exit(1);
  }
}

// Run the script
generatePreviews().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
