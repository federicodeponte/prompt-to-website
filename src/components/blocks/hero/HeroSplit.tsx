// ABOUTME: Premium split hero with parallax effects and glassmorphism
// ABOUTME: Professional two-column layout with animated entrance and hover effects

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentSplit } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSplitProps {
  content: HeroContentSplit;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Premium split hero with modern animations and glassmorphism
 * Features: Staggered entrance, hover effects, badge, gradient accents
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
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center py-16 md:py-24">
      {/* Text Content */}
      <motion.div
        className={cn('space-y-8', isImageRight ? 'lg:order-1' : 'lg:order-2')}
        initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge className="mb-4">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {subheading}
          </Badge>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {heading}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="h-12 px-8 text-base shadow-lg hover:shadow-xl group"
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
                className="h-12 px-8 text-base"
              >
                <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Image with Glassmorphism */}
      <motion.div
        className={cn('relative', isImageRight ? 'lg:order-2' : 'lg:order-1')}
        initial={{ opacity: 0, x: isImageRight ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-border/50 shadow-2xl backdrop-blur-sm">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 mix-blend-overlay z-10" />

          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Floating accent element */}
        <motion.div
          className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
