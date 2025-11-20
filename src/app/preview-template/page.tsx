// ABOUTME: Template preview page for screenshot generation
// ABOUTME: Renders a template without any editor UI - just the website

'use client';

import { Suspense } from 'react';
import { WebsiteRenderer } from '@/components/renderer';
import { templates } from '@/lib/templates';
import { useSearchParams } from 'next/navigation';

function TemplatePreviewContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template') || 'saas-landing';

  // Find the template
  const template = templates.find((t) => t.id === templateId);

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Template not found: {templateId}</p>
      </div>
    );
  }

  return <WebsiteRenderer config={template.config} />;
}

export default function TemplatePreviewPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <TemplatePreviewContent />
    </Suspense>
  );
}
