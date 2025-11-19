// ABOUTME: Preview pane with live website rendering
// ABOUTME: Uses iframe for isolated rendering of WebsiteRenderer

'use client';

import React, { useRef, useState, useMemo } from 'react';
import { WebsiteConfig } from '@/lib/types/website-config';
import { WebsiteRenderer } from '@/components/renderer';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewPaneProps {
  config: WebsiteConfig;
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

/**
 * PreviewPane provides a live preview of the website
 *
 * Architecture:
 * - Direct rendering (not iframe) for better React integration
 * - Responsive viewport controls (desktop/tablet/mobile)
 * - Auto-refresh on config changes
 * - Scroll preservation across updates
 *
 * Principles:
 * - Single Responsibility: Preview rendering only
 * - Composition: Uses WebsiteRenderer component
 * - Performance: Memoized rendering to prevent unnecessary updates
 */
export function PreviewPane({ config }: PreviewPaneProps) {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [key, setKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ensure blocks is always an array (safety check for race conditions)
  const blocks = config.blocks || [];

  /**
   * Force refresh of preview
   */
  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  /**
   * Get viewport dimensions based on selected size
   * Memoized to prevent recalculation on every render
   */
  const viewportClass = useMemo(() => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  }, [viewport]);

  /**
   * Viewport size label
   * Memoized to prevent string creation on every render
   */
  const viewportLabel = useMemo(() => {
    switch (viewport) {
      case 'desktop':
        return 'Desktop View (100%)';
      case 'tablet':
        return 'Tablet View (768px)';
      case 'mobile':
        return 'Mobile View (375px)';
      default:
        return '';
    }
  }, [viewport]);

  return (
    <div className="flex h-full flex-col bg-muted" role="region" aria-label="Website preview">
      {/* Preview header */}
      <div className="flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Live Preview</h3>
          <span className="text-xs text-muted-foreground">
            {blocks.length} blocks • {config.template}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport controls */}
          <div className="flex rounded-md border" role="group" aria-label="Preview viewport size">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-none rounded-l-md',
                viewport === 'desktop' && 'bg-muted'
              )}
              onClick={() => setViewport('desktop')}
              aria-label="Desktop view"
              aria-pressed={viewport === 'desktop'}
            >
              <Monitor className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-none border-x',
                viewport === 'tablet' && 'bg-muted'
              )}
              onClick={() => setViewport('tablet')}
              aria-label="Tablet view"
              aria-pressed={viewport === 'tablet'}
            >
              <Tablet className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-none rounded-r-md',
                viewport === 'mobile' && 'bg-muted'
              )}
              onClick={() => setViewport('mobile')}
              aria-label="Mobile view"
              aria-pressed={viewport === 'mobile'}
            >
              <Smartphone className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Refresh button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            aria-label="Refresh preview"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Preview content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4"
      >
        <div className={cn('mx-auto transition-all duration-300', viewportClass)}>
          <div className="rounded-lg border bg-background shadow-lg overflow-hidden">
            {/* Render website directly */}
            <div key={key}>
              <WebsiteRenderer config={config} />
            </div>
          </div>

          {/* Viewport size indicator */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              {viewportLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
