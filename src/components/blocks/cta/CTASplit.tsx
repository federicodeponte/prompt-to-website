// ABOUTME: Split CTA block variant with image and call-to-action side by side
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CTAContentSplit } from '@/lib/types/block-content';

interface CTASplitProps {
  content: CTAContentSplit;
  theme?: {
    primaryColor?: string;
  };
}

export function CTASplit({ content, theme }: CTASplitProps) {
  const { heading, description, ctaPrimary, image, imageAlt } = content;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
        <Button
          size="lg"
          asChild
          style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
        >
          <a href={ctaPrimary.link}>{ctaPrimary.text}</a>
        </Button>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
