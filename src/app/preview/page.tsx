// ABOUTME: Template preview page for viewing templates before selection
// ABOUTME: Renders template in full-page view without editor UI

import { WebsiteRenderer } from '@/components/renderer';
import { getTemplateById } from '@/lib/templates';
import { notFound } from 'next/navigation';
import { PreviewHeader } from './preview-header';

interface PreviewPageProps {
  searchParams: Promise<{
    template?: string;
  }>;
}

/**
 * Preview page for templates
 * Shows full template rendering without editor UI
 */
export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams;
  const templateId = params.template;

  if (!templateId) {
    notFound();
  }

  const config = getTemplateById(templateId);

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <PreviewHeader templateName={config.template.replace('-', ' ')} />
      <WebsiteRenderer config={config} />
    </div>
  );
}
