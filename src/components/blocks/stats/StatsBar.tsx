// ABOUTME: Clean, minimal stats bar with horizontal layout
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatsContentBar } from '@/lib/types/block-content';
import { Badge } from '@/components/ui/badge';

interface StatsBarProps {
  content: StatsContentBar;
}

/**
 * Clean stats bar with horizontal layout
 * Design principles: Professional typography, subtle animations, compact
 */
export function StatsBar({ content }: StatsBarProps) {
  const { heading, subheading, stats } = content;

  return (
    <div className="space-y-8">
      {/* Header */}
      {heading && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {subheading && (
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">
              {subheading}
            </Badge>
          )}
          <h2 className="font-theme-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {heading}
          </h2>
        </motion.div>
      )}

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="mb-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
