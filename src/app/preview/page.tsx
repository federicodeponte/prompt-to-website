// ABOUTME: Template preview page for viewing templates before selection
// ABOUTME: Renders template in full-page view without editor UI

import { WebsiteRenderer } from '@/components/renderer';
import { getTemplateById } from '@/lib/templates';
import { notFound } from 'next/navigation';

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
      {/* Preview header */}
      <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold">Template Preview</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {config.template.replace('-', ' ')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.close()}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Template content */}
      <WebsiteRenderer config={config} />
    </div>
  );
}
