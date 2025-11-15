// ABOUTME: Premium centered hero block with Framer Motion animations and shadcn/ui components
// ABOUTME: Production-quality design matching modern SaaS landing pages

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentCentered } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroCenteredProps {
  content: HeroContentCentered;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Premium centered hero section with animations and modern design
 * Features: Gradient backgrounds, animated text, floating badge, smooth entrance animations
 */
export function HeroCentered({ content, theme }: HeroCenteredProps) {
  const { heading, subheading, ctaPrimary, ctaSecondary, backgroundImage } = content;

  return (
    <div
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden',
        backgroundImage && 'bg-cover bg-center'
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Gradient background (when no image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" aria-hidden="true" />
      )}

      {/* Overlay for background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <Badge variant="secondary" className="animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
            {subheading}
          </Badge>
        </motion.div>

        {/* Animated Heading with Gradient */}
        <motion.h1
          className="mb-8 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.span
            className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {heading}
          </motion.span>
        </motion.h1>

        {/* CTA Buttons with Animations */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="h-12 min-w-[200px] px-8 text-base shadow-lg transition-all hover:shadow-xl group"
              style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
            >
              <a href={ctaPrimary.link}>
                {ctaPrimary.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          {ctaSecondary && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 min-w-[200px] px-8 text-base transition-all"
              >
                <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
