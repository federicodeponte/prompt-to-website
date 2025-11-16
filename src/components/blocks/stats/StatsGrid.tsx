// ABOUTME: Clean, minimal stats grid with professional typography
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatsContentGrid } from '@/lib/types/block-content';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatsGridProps {
  content: StatsContentGrid;
}

/**
 * Clean stats grid with minimal design
 * Design principles: Professional typography, subtle animations, whitespace
 */
export function StatsGrid({ content }: StatsGridProps) {
  const { heading, subheading, stats, columns = 4 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      {heading && (
        <motion.div
          className="mx-auto max-w-2xl text-center"
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
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className={cn('grid gap-8 lg:gap-12', gridColsClass[columns])}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="mb-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-base font-medium text-foreground">{stat.label}</div>
            {stat.description && (
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
