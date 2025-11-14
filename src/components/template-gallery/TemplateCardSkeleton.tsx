// ABOUTME: Skeleton loading state for template cards
// ABOUTME: Provides visual feedback while template data is loading

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton placeholder for template cards
 * Matches the exact layout of TemplateGallery cards for seamless loading UX
 */
export function TemplateCardSkeleton() {
  return (
    <Card className="group flex flex-col shadow-sm">
      <CardHeader className="pb-4">
        {/* Category icon and label */}
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Title */}
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* Description - 2 lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Preview area - matches aspect-video */}
        <Skeleton className="aspect-video w-full rounded-xl" />

        {/* Template details */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Use Template button */}
        <Skeleton className="h-10 flex-1" />
        {/* Eye button */}
        <Skeleton className="h-10 w-10" />
        {/* More menu button */}
        <Skeleton className="h-10 w-10" />
      </CardFooter>
    </Card>
  );
}
