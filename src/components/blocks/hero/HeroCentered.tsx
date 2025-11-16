// ABOUTME: Clean, minimal centered hero matching shadcn/ui and Inbox Zero aesthetic
// ABOUTME: Professional design with subtle animations and maximum whitespace

'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentCentered } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { spring, fadeInUp, buttonHoverPremium } from '@/lib/animations';
import { getGradientTextClasses, getMeshGradientClasses, getShimmerClasses } from '@/lib/visual-effects';

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

  // Parallax effect on background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Animated mesh gradient background with parallax - Framer-level */}
      <motion.div
        className={cn("absolute inset-0", getMeshGradientClasses())}
        style={{ y, opacity }}
        aria-hidden="true"
      />

      {/* Content - MUCH more whitespace */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center section-spacing">
        {/* Badge - clean and minimal */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={spring}
          className="mb-8 flex justify-center"
        >
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {subheading}
          </Badge>
        </motion.div>

        {/* Heading with gradient text - Framer-level */}
        <motion.h1
          className={cn("mb-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl", getGradientTextClasses())}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.1 }}
        >
          {heading}
        </motion.h1>

        {/* CTA Buttons with shimmer effect - Framer-level */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.2 }}
        >
          <motion.div
            variants={buttonHoverPremium}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              size="lg"
              asChild
              className={cn("h-11 px-8 group bg-theme-primary hover:bg-theme-primary/90 rounded-theme-button shadow-theme-button", getShimmerClasses())}
            >
              <a href={ctaPrimary.link} className="inline-flex items-center gap-2">
                {ctaPrimary.text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          {ctaSecondary && (
            <motion.div
              variants={buttonHoverPremium}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-11 px-8"
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
