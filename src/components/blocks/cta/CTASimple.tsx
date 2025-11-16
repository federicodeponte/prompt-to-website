// ABOUTME: Premium simple CTA with Framer Motion animations and gradient effects
// ABOUTME: Production-quality design with staggered entrance and enhanced buttons

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
 * Premium simple CTA with animations and gradient backgrounds
 * Features: Staggered entrance, gradient mesh background, button animations
 */
export function CTASimple({ content, theme }: CTASimpleProps) {
  const { heading, description, ctaPrimary, ctaSecondary } = content;

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-12 md:p-16">
      {/* Animated gradient background orbs */}
      <motion.div
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Animated Heading */}
        <motion.h2
          className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            {heading}
          </span>
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          className="mb-10 text-xl text-muted-foreground md:text-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="h-14 px-8 text-lg shadow-xl group"
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
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg shadow-lg">
                <a href={ctaSecondary.link}>{ctaSecondary.text}</a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
