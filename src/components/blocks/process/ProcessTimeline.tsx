// ABOUTME: Vertical timeline for process/history display
// ABOUTME: Production-quality with connecting lines and staggered animations

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { ProcessContentTimeline } from '@/lib/types/block-content';

interface ProcessTimelineProps {
  content: ProcessContentTimeline;
}

/**
 * Vertical timeline for showcasing processes, history, or milestones
 * Features: Connecting lines, icons, dates, smooth reveal animations
 */
export function ProcessTimeline({ content }: ProcessTimelineProps) {
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

      {/* Timeline */}
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-theme-border" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Icon/Checkpoint */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-theme-primary shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 rounded-theme-card border-2 border-theme-border bg-background p-6 shadow-theme-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  whileHover={{ scale: 1.02, borderColor: 'var(--color-theme-primary)' }}
                >
                  {/* Date (optional) */}
                  {step.date && (
                    <div className="mb-2 text-sm font-semibold text-theme-primary">
                      {step.date}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-theme-heading mb-3 text-xl font-bold">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-theme-body text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
