// ABOUTME: Preview page for viewing templates or shared configurations
// ABOUTME: Supports both template ID and encoded config from shareable links

import { WebsiteRenderer } from '@/components/renderer';
import { getTemplateById } from '@/lib/templates';
import { notFound } from 'next/navigation';
import { PreviewHeader } from './preview-header';
import { WebsiteConfig } from '@/lib/types/website-config';

interface PreviewPageProps {
  searchParams: Promise<{
    template?: string;
    config?: string;
  }>;
}

/**
 * Preview page for templates and shared configurations
 *
 * Supports two modes:
 * 1. Template preview: ?template=saas-landing
 * 2. Shared config: ?config=base64EncodedJSON
 */
export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams;
  const templateId = params.template;
  const encodedConfig = params.config;

  let config: WebsiteConfig | null = null;
  let displayName = 'Preview';

  // Mode 1: Shared configuration from URL
  if (encodedConfig) {
    try {
      const decodedConfig = atob(encodedConfig);
      config = JSON.parse(decodedConfig) as WebsiteConfig;
      displayName = config.metadata?.title || 'Shared Website';
    } catch (error) {
      console.error('Failed to decode shared configuration:', error);
      notFound();
    }
  }
  // Mode 2: Template preview
  else if (templateId) {
    config = getTemplateById(templateId);
    if (config) {
      displayName = config.template.replace('-', ' ');
    }
  }

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <PreviewHeader templateName={displayName} />
      <WebsiteRenderer config={config} />
    </div>
  );
}
