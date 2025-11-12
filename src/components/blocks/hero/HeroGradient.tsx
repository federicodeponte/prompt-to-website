// ABOUTME: Gradient hero block variant with animated gradient background and feature list
// ABOUTME: Follows Single Responsibility Principle - handles only gradient hero layout

import React from 'react';
import { Button } from '@/components/ui/button';
import { HeroContentGradient } from '@/lib/types/block-content';
import { Check } from 'lucide-react';

interface HeroGradientProps {
  content: HeroContentGradient;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Gradient hero section with animated background and feature highlights
 * Creates modern, eye-catching landing page experience
 */
export function HeroGradient({ content, theme }: HeroGradientProps) {
  const { heading, subheading, description, ctaPrimary, features } = content;

  return (
    <div className="relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift" aria-hidden="true" />

      {/* Blur overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-3xl" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl py-20 md:py-28 text-center">
        {/* Subheading */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {description}
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          asChild
          className="min-w-[200px]"
          style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
        >
          <a href={ctaPrimary.link}>{ctaPrimary.text}</a>
        </Button>

        {/* Feature List */}
        {features && features.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
