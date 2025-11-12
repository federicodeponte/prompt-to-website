// ABOUTME: Grid-style stats block variant with metrics in a responsive grid
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { StatsContentGrid } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface StatsGridProps {
  content: StatsContentGrid;
}

/**
 * Stats section with grid layout for key metrics
 * Clean, scannable display of important numbers
 */
export function StatsGrid({ content }: StatsGridProps) {
  const { heading, subheading, stats, columns = 4 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      {heading && (
        <div className="mx-auto max-w-3xl text-center">
          {subheading && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
              {subheading}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
        </div>
      )}

      {/* Stats Grid */}
      <div className={cn('grid gap-8', gridColsClass[columns])}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-lg font-semibold">{stat.label}</div>
            {stat.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
