// ABOUTME: Simple CTA block variant with centered call-to-action
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { Button } from '@/components/ui/button';
import { CTAContentSimple } from '@/lib/types/block-content';

interface CTASimpleProps {
  content: CTAContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

export function CTASimple({ content, theme }: CTASimpleProps) {
  const { heading, description, ctaPrimary, ctaSecondary } = content;

  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="mb-8 text-lg text-muted-foreground md:text-xl">
        {description}
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          asChild
          style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
        >
          <a href={ctaPrimary.link}>{ctaPrimary.text}</a>
        </Button>
        {ctaSecondary && (
          <Button size="lg" variant="outline" asChild>
            <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
          </Button>
        )}
      </div>
    </div>
  );
}
