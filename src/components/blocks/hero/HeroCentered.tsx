// ABOUTME: Centered hero block variant with headline, subheading, and CTA buttons
// ABOUTME: Follows Single Responsibility Principle - handles only centered hero layout

import React from 'react';
import { Button } from '@/components/ui/button';
import { HeroContentCentered } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface HeroCenteredProps {
  content: HeroContentCentered;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Centered hero section with centered text and CTA buttons
 * Optimized for maximum impact with minimal distraction
 */
export function HeroCentered({ content, theme }: HeroCenteredProps) {
  const { heading, subheading, ctaPrimary, ctaSecondary, backgroundImage } = content;

  return (
    <div
      className={cn(
        'relative flex min-h-[600px] items-center justify-center',
        backgroundImage && 'bg-cover bg-center'
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Overlay for background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Subheading */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary opacity-90">
          {subheading}
        </p>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="min-w-[200px]"
            style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
          >
            <a href={ctaPrimary.link}>{ctaPrimary.text}</a>
          </Button>

          {ctaSecondary && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-w-[200px]"
            >
              <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
