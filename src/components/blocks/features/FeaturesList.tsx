// ABOUTME: Premium list features with alternating animations and glassmorphism
// ABOUTME: Production-quality design with slide-in effects and gradient icons

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FeaturesContentList } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { spring, springMedium, fadeInUp, cardHover } from '@/lib/animations';
import { getGradientTextClasses } from '@/lib/visual-effects';

interface FeaturesListProps {
  content: FeaturesContentList;
}

/**
 * Premium list-based features with alternating animations
 * Features: Slide-in from left/right, gradient icons, glassmorphism cards
 */
export function FeaturesList({ content }: FeaturesListProps) {
  const { heading, subheading, features } = content;

  // Gradient colors for icons (alternates)
  const gradientColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-violet-500',
    'from-amber-500 to-orange-500',
  ];

  return (
    <div className="space-y-20">
      {/* Animated Header with gradient text */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={spring}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-6 text-sm">
            {subheading}
          </Badge>
        </motion.div>

        <motion.h2
          className={cn("text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl", getGradientTextClasses())}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring, delay: 0.2 }}
        >
          {heading}
        </motion.h2>
      </motion.div>

      {/* Animated Features List */}
      <div className="space-y-16">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={spring}
            >
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Card className="border-2 bg-gradient-to-br from-background to-muted/20 rounded-theme-card shadow-theme-card">
                <CardContent className="p-8">
                  <div
                    className={cn(
                      'flex flex-col gap-8 items-center',
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                  >
                    {/* Animated Gradient Icon with spring physics */}
                    <motion.div
                      className={cn(
                        'flex h-28 w-28 md:h-36 md:w-36 flex-shrink-0 items-center justify-center',
                        'rounded-3xl text-5xl md:text-6xl shadow-2xl',
                        'bg-gradient-to-br',
                        gradientColors[index % gradientColors.length]
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={springMedium}
                    >
                      <span className="filter drop-shadow-lg" role="img" aria-label={feature.title}>
                        {feature.icon}
                      </span>
                    </motion.div>

                    {/* Content with spring animations */}
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <motion.div
                        className="flex items-center justify-center gap-3 md:justify-start"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ ...spring, delay: 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={springMedium}
                        >
                          <Check className="h-6 w-6 text-theme-primary" aria-hidden="true" />
                        </motion.div>
                        <h3 className={cn("text-3xl font-bold", getGradientTextClasses())}>
                          {feature.title}
                        </h3>
                      </motion.div>

                      <motion.p
                        className="text-xl text-muted-foreground leading-relaxed"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ ...spring, delay: 0.2 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
