// ABOUTME: Premium gradient hero with mesh backgrounds and animated particles
// ABOUTME: Modern, eye-catching design with feature highlights and advanced animations

'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentGradient } from '@/lib/types/block-content';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { spring, fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { getGradientTextClasses, getMeshGradientClasses, getShimmerClasses, getFloatingClasses } from '@/lib/visual-effects';
import { cn } from '@/lib/utils';

interface HeroGradientProps {
  content: HeroContentGradient;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Premium gradient hero with animated mesh background
 * Features: Gradient mesh, floating particles, animated features, premium typography
 */
export function HeroGradient({ content }: HeroGradientProps) {
  const { heading, subheading, description, ctaPrimary, features } = content;

  // Parallax effect on background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative overflow-hidden">
      {/* Animated Gradient Mesh Background with parallax - Framer-level */}
      <motion.div
        className={cn("absolute inset-0", getMeshGradientClasses())}
        style={{ y, opacity }}
        aria-hidden="true"
      />

      {/* Floating particles with physics animation */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={cn("absolute h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl", getFloatingClasses())}
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center section-spacing">
        {/* Animated Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={spring}
          className="mb-8 flex justify-center"
        >
          <Badge variant="secondary" className="shadow-lg backdrop-blur-sm">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
            {subheading}
          </Badge>
        </motion.div>

        {/* Heading with gradient text animation */}
        <motion.h1
          className={cn("mb-8 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl", getGradientTextClasses())}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.1 }}
        >
          {heading}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* CTA Button with shimmer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className={cn("h-12 min-w-[200px] px-8 text-base bg-theme-primary hover:bg-theme-primary/90 rounded-theme-button shadow-theme-button hover:shadow-3xl group", getShimmerClasses())}
            >
              <a href={ctaPrimary.link}>
                {ctaPrimary.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Feature List with stagger */}
        {features && features.length > 0 && (
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full bg-background/50 px-4 py-2 backdrop-blur-sm border border-border/50 shadow-sm"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
              >
                <Check className="h-5 w-5 text-theme-primary" aria-hidden="true" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
