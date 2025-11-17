// ABOUTME: Premium split hero with parallax effects and glassmorphism
// ABOUTME: Professional two-column layout with animated entrance and hover effects

'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentSplit } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import { spring, fadeInUp } from '@/lib/animations';
import { getGradientTextClasses, getShimmerClasses, getFloatingClasses } from '@/lib/visual-effects';

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
export function HeroSplit({ content }: HeroSplitProps) {
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

  // Parallax effect on image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center section-spacing">
      {/* Text Content */}
      <motion.div
        className={cn('space-y-8', isImageRight ? 'lg:order-1' : 'lg:order-2')}
        initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={spring}
      >
        {/* Animated Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.1 }}
        >
          <Badge className="mb-4">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {subheading}
          </Badge>
        </motion.div>

        {/* Heading with gradient text */}
        <motion.h1
          className={cn("text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl", getGradientTextClasses())}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.2 }}
        >
          {heading}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl text-muted-foreground leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* CTA Buttons with shimmer */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className={cn("h-12 px-8 text-base bg-theme-primary hover:bg-theme-primary/90 rounded-theme-button shadow-theme-button hover:shadow-xl group", getShimmerClasses())}
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

      {/* Image with Glassmorphism, 3D lift, and parallax */}
      <motion.div
        className={cn('relative', isImageRight ? 'lg:order-2' : 'lg:order-1')}
        initial={{ opacity: 0, x: isImageRight ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.2 }}
        whileHover={{ scale: 1.02, y: -8 }}
        style={{ y, opacity }}
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

        {/* Floating accent element with physics animation */}
        <motion.div
          className={cn("absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl", getFloatingClasses())}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
