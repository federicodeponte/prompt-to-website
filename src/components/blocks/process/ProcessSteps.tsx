// ABOUTME: Horizontal step-by-step process flow
// ABOUTME: Production-quality for showcasing workflows and procedures

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProcessContentSteps } from '@/lib/types/block-content';
import { Badge } from '@/components/ui/badge';

interface ProcessStepsProps {
  content: ProcessContentSteps;
}

/**
 * Horizontal process steps for workflows and procedures
 * Features: Numbered steps, connecting arrows, responsive stacking
 */
export function ProcessSteps({ content }: ProcessStepsProps) {
  const { heading, subheading, steps } = content;

  return (
    <div className="space-y-12">
      {/* Header (optional) */}
      {(heading || subheading) && (
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {subheading && (
            <p className="font-theme-body mb-4 text-sm font-semibold uppercase tracking-wide text-theme-primary">
              {subheading}
            </p>
          )}
          {heading && (
            <h2 className="font-theme-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {heading}
            </h2>
          )}
        </motion.div>
      )}

      {/* Steps */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Arrow connector (hidden on mobile, shown on larger screens between cards) */}
            {index < steps.length - 1 && (
              <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block lg:block">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                >
                  <ArrowRight className="h-8 w-8 text-theme-primary" />
                </motion.div>
              </div>
            )}

            {/* Step Card */}
            <motion.div
              className="relative h-full rounded-theme-card border-2 border-theme-border bg-background p-6 shadow-theme-card transition-all duration-300"
              whileHover={{ scale: 1.05, borderColor: 'var(--color-theme-primary)' }}
            >
              {/* Step Number Badge */}
              <Badge
                variant="default"
                className="mb-4 h-12 w-12 rounded-full bg-theme-primary text-xl font-bold text-white flex items-center justify-center"
              >
                {index + 1}
              </Badge>

              {/* Title */}
              <h3 className="font-theme-heading mb-3 text-xl font-bold">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-theme-body text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Date (optional) */}
              {step.date && (
                <div className="mt-4 text-sm font-medium text-theme-primary">
                  {step.date}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
