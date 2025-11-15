// ABOUTME: Premium grid features with Framer Motion animations and gradient accents
// ABOUTME: Production-quality design with staggered entrance and hover effects

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeaturesContentGrid } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface FeaturesGridProps {
  content: FeaturesContentGrid;
}

/**
 * Premium grid-based features with animations
 * Features: Staggered entrance, gradient icons, hover lift effects, badge component
 */
export function FeaturesGrid({ content }: FeaturesGridProps) {
  const { heading, subheading, features, columns = 3 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  } as const;

  // Gradient colors for icons (cycles through for variety)
  const gradientColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-violet-500',
    'from-pink-500 to-rose-500',
    'from-orange-500 to-amber-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-blue-500',
  ];

  return (
    <div className="space-y-16">
      {/* Animated Header */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-6 text-sm">
            {subheading}
          </Badge>
        </motion.div>

        <motion.h2
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {heading}
        </motion.h2>
      </motion.div>

      {/* Animated Features Grid */}
      {features && features.length > 0 && (
        <motion.div
          className={cn('grid gap-8', gridColsClass[columns])}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full border-2 transition-all duration-300 hover:shadow-xl hover:border-primary/50 bg-gradient-to-br from-background to-muted/20">
                <CardContent className="p-8">
                  {/* Gradient Icon */}
                  <motion.div
                    className={cn(
                      'mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-3xl',
                      'bg-gradient-to-br shadow-lg',
                      gradientColors[index % gradientColors.length]
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="filter drop-shadow-sm" role="img" aria-label={feature.title}>
                      {feature.icon}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
