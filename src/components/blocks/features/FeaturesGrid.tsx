// ABOUTME: Grid features block variant displaying features in a responsive grid layout
// ABOUTME: Follows Single Responsibility Principle - handles only grid layout

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FeaturesContentGrid } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface FeaturesGridProps {
  content: FeaturesContentGrid;
}

/**
 * Grid-based features section with responsive column layout
 * Showcases features with icons, titles, and descriptions in a clean grid
 */
export function FeaturesGrid({ content }: FeaturesGridProps) {
  const { heading, subheading, features, columns = 3 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h2>
      </div>

      {/* Features Grid */}
      {features && features.length > 0 && (
        <div className={cn('grid gap-6 sm:gap-8', gridColsClass[columns])}>
          {features.map((feature, index) => (
          <Card key={index} className="border-2 transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
          ))}
        </div>
      )}
    </div>
  );
}
