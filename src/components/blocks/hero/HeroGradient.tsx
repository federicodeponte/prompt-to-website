// ABOUTME: Premium gradient hero with mesh backgrounds and animated particles
// ABOUTME: Modern, eye-catching design with feature highlights and advanced animations

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroContentGradient } from '@/lib/types/block-content';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

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
export function HeroGradient({ content, theme }: HeroGradientProps) {
  const { heading, subheading, description, ctaPrimary, features } = content;

  return (
    <div className="relative overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20" aria-hidden="true" />

      {/* Additional gradient layers for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-orange-500/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Blur overlay for glassmorphism */}
      <div className="absolute inset-0 backdrop-blur-3xl" aria-hidden="true" />

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <Badge variant="secondary" className="shadow-lg backdrop-blur-sm">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
            {subheading}
          </Badge>
        </motion.div>

        {/* Animated Heading with Shimmer */}
        <motion.h1
          className="mb-8 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.span
            className="relative inline-block bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            {heading}
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="h-12 min-w-[200px] px-8 text-base shadow-2xl hover:shadow-3xl group"
              style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
            >
              <a href={ctaPrimary.link}>
                {ctaPrimary.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Feature List */}
        {features && features.length > 0 && (
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full bg-background/50 px-4 py-2 backdrop-blur-sm border border-border/50 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                </motion.div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
