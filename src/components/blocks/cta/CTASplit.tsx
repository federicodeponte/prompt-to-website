// ABOUTME: Premium split CTA with Framer Motion animations and image effects
// ABOUTME: Production-quality design with slide-in animations and enhanced layout

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CTAContentSplit } from '@/lib/types/block-content';
import { ArrowRight } from 'lucide-react';

interface CTASplitProps {
  content: CTAContentSplit;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Premium split CTA with animations and image hover effects
 * Features: Slide-in animations, image parallax, gradient borders
 */
export function CTASplit({ content }: CTASplitProps) {
  const { heading, description, ctaPrimary, image, imageAlt } = content;

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
      {/* Text Content - Slide in from left */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Heading */}
        <motion.h2
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            {heading}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xl text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="h-14 px-8 text-lg bg-theme-primary hover:bg-theme-primary/90 rounded-theme-button shadow-theme-button group"
            >
              <a href={ctaPrimary.link}>
                {ctaPrimary.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Image - Slide in from right */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />

          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Decorative gradient blur behind image */}
        <div
          className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl opacity-50"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
