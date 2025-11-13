/**
 * Test script for HTML export functionality
 * Tests exportToHTML with a sample WebsiteConfig
 */

import { exportToHTML } from './src/lib/export/html-exporter.ts';

// Sample WebsiteConfig for testing
const sampleConfig = {
  version: '1.0',
  template: 'saas-landing',
  theme: {
    colors: {
      primary: '#0070f3',
      secondary: '#7928ca',
      background: '#ffffff',
      text: '#000000',
      muted: '#666666',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      variant: 'centered',
      content: {
        heading: 'Build Amazing Websites',
        subheading: 'The fastest way to create landing pages',
      },
    },
    {
      id: 'features-1',
      type: 'features',
      variant: 'grid',
      content: {
        heading: 'Features',
        features: [],
      },
    },
  ],
  metadata: {
    title: 'Test Website',
    description: 'A test website for export functionality',
    author: 'Test Author',
  },
};

console.log('🧪 Testing HTML Export...\n');

try {
  // Generate HTML
  const html = exportToHTML(sampleConfig);

  // Verify HTML structure
  const checks = [
    {
      test: html.includes('<!DOCTYPE html>'),
      name: 'Has DOCTYPE',
    },
    {
      test: html.includes('<html lang="en">'),
      name: 'Has HTML tag with lang',
    },
    {
      test: html.includes('<title>Test Website</title>'),
      name: 'Has correct title',
    },
    {
      test: html.includes('<meta name="description" content="A test website for export functionality">'),
      name: 'Has correct description',
    },
    {
      test: html.includes('<meta name="author" content="Test Author">'),
      name: 'Has author meta tag',
    },
    {
      test: html.includes('https://cdn.tailwindcss.com'),
      name: 'Includes Tailwind CDN',
    },
    {
      test: html.includes('--color-primary: #0070f3'),
      name: 'Includes theme primary color',
    },
    {
      test: html.includes('--font-heading: Inter'),
      name: 'Includes theme heading font',
    },
    {
      test: html.includes('Your website contains 2 blocks'),
      name: 'Shows correct block count',
    },
    {
      test: html.includes('Generated with Prompt to Website'),
      name: 'Has footer attribution',
    },
  ];

  // Print results
  let passed = 0;
  let failed = 0;

  checks.forEach((check) => {
    if (check.test) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      failed++;
    }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log('\n✨ All tests passed! Export functionality is working correctly.\n');

    // Print sample HTML (first 500 chars)
    console.log('📄 Sample HTML output (first 500 chars):');
    console.log('─'.repeat(80));
    console.log(html.substring(0, 500) + '...\n');

    process.exit(0);
  } else {
    console.error('\n❌ Some tests failed. Please review the export implementation.\n');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error during export:', error.message);
  console.error(error.stack);
  process.exit(1);
}
