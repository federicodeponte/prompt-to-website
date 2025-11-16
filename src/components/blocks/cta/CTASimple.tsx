// ABOUTME: Clean, minimal CTA with shadcn/ui aesthetic
// ABOUTME: Production-quality design matching modern SaaS standards

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CTAContentSimple } from '@/lib/types/block-content';
import { ArrowRight } from 'lucide-react';

interface CTASimpleProps {
  content: CTAContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Clean, minimal CTA with shadcn/ui design
 * Design principles: Whitespace, subtle background, professional typography
 */
export function CTASimple({ content, theme }: CTASimpleProps) {
  const { heading, description, ctaPrimary, ctaSecondary } = content;

  return (
    <motion.div
      className="overflow-hidden rounded-lg border bg-muted/50 p-8 md:p-12"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Heading */}
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {heading}
        </h2>

        {/* Description */}
        <p className="mb-8 text-base text-muted-foreground leading-relaxed sm:text-lg">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="group"
            style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
          >
            <a href={ctaPrimary.link}>
              {ctaPrimary.text}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          {ctaSecondary && (
            <Button size="lg" variant="outline" asChild>
              <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
