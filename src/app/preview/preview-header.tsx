'use client';

import { Button } from '@/components/ui/button';

interface PreviewHeaderProps {
  templateName: string;
}

export function PreviewHeader({ templateName }: PreviewHeaderProps) {
  return (
    <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">Template Preview</h1>
          <p className="text-sm text-muted-foreground capitalize">
            {templateName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => window.close()}
            variant="outline"
            size="sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
