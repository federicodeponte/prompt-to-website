// ABOUTME: Demo editor page for testing without authentication
// ABOUTME: Provides a live demo of the editor with a sample website

'use client';

import { EditorLayout } from '@/components/editor/EditorLayout';
import { templates } from '@/lib/templates';

/**
 * Demo Editor Page
 * Allows users to try the editor without creating an account
 * Uses the first template as a demo website
 */
export default function DemoEditorPage() {
  // Use the first template as the demo
  const demoTemplate = templates[0];

  return (
    <EditorLayout
      initialConfig={demoTemplate.config}
      websiteId="demo"
      websiteLabel="Demo Website"
    />
  );
}
