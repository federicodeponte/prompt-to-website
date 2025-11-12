// ABOUTME: Split hero block variant with text on one side and image on the other
// ABOUTME: Follows Single Responsibility Principle - handles only split hero layout

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroContentSplit } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface HeroSplitProps {
  content: HeroContentSplit;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Split hero section with text on one side and image on the other
 * Provides visual balance and showcases product/service imagery
 */
export function HeroSplit({ content, theme }: HeroSplitProps) {
  const {
    heading,
    subheading,
    description,
    ctaPrimary,
    ctaSecondary,
    image,
    imageAlt,
    imagePosition = 'right',
  } = content;

  const isImageRight = imagePosition === 'right';

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center py-12 md:py-20">
      {/* Text Content */}
      <div className={cn('space-y-6', isImageRight ? 'lg:order-1' : 'lg:order-2')}>
        {/* Subheading */}
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {heading}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground md:text-xl">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
          >
            <a href={ctaPrimary.link}>{ctaPrimary.text}</a>
          </Button>

          {ctaSecondary && (
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
            </Button>
          )}
        </div>
      </div>

      {/* Image */}
      <div className={cn('relative', isImageRight ? 'lg:order-2' : 'lg:order-1')}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
