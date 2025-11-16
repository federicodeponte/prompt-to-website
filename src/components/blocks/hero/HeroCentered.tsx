// ABOUTME: Clean, minimal centered hero matching shadcn/ui and Inbox Zero aesthetic
// ABOUTME: Professional design with subtle animations and maximum whitespace

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentCentered } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface HeroCenteredProps {
  content: HeroContentCentered;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Clean, minimal hero section inspired by shadcn/ui blocks and modern SaaS
 * Design principles: Maximum whitespace, subtle colors, large typography, professional
 */
export function HeroCentered({ content, theme }: HeroCenteredProps) {
  const { heading, subheading, ctaPrimary, ctaSecondary } = content;

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle gradient - very minimal */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" aria-hidden="true" />

      {/* Content - MUCH more whitespace */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center sm:py-40 lg:py-48">
        {/* Badge - clean and minimal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {subheading}
          </Badge>
        </motion.div>

        {/* Heading - HUGE, clean, no gradients */}
        <motion.h1
          className="mb-6 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {heading}
        </motion.h1>

        {/* CTA Buttons - clean, simple, professional */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            size="lg"
            asChild
            className="h-11 px-8 shadow-sm transition-shadow hover:shadow"
            style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
          >
            <a href={ctaPrimary.link} className="inline-flex items-center gap-2">
              {ctaPrimary.text}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>

          {ctaSecondary && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-11 px-8"
            >
              <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
