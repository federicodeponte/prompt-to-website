// ABOUTME: Bar-style stats block variant with horizontal layout
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { StatsContentBar } from '@/lib/types/block-content';

interface StatsBarProps {
  content: StatsContentBar;
}

/**
 * Stats section with horizontal bar layout
 * Compact display for smaller stat sets
 */
export function StatsBar({ content }: StatsBarProps) {
  const { heading, subheading, stats } = content;

  return (
    <div className="space-y-8">
      {/* Header */}
      {heading && (
        <div className="text-center">
          {subheading && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
              {subheading}
            </p>
          )}
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {heading}
          </h2>
        </div>
      )}

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="mb-1 text-3xl font-bold sm:text-4xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
