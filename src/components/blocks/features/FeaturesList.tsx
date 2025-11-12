// ABOUTME: List features block variant displaying features in a vertical list layout
// ABOUTME: Follows Single Responsibility Principle - handles only list layout

import React from 'react';
import { Check } from 'lucide-react';
import { FeaturesContentList } from '@/lib/types/block-content';

interface FeaturesListProps {
  content: FeaturesContentList;
}

/**
 * List-based features section with alternating layout
 * Ideal for detailed feature descriptions with more emphasis on each item
 */
export function FeaturesList({ content }: FeaturesListProps) {
  const { heading, subheading, features } = content;

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h2>
      </div>

      {/* Features List */}
      <div className="space-y-12">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col gap-8 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center`}
            >
              {/* Icon/Visual */}
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-4xl md:h-32 md:w-32 md:text-5xl">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
