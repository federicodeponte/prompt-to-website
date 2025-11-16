// ABOUTME: Grid-style FAQ block variant displaying questions in a grid layout
// ABOUTME: Follows Single Responsibility Principle

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQContentGrid } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface FAQGridProps {
  content: FAQContentGrid;
}

/**
 * FAQ section with grid layout
 * Better for visual scanning and browsing many FAQs
 */
export function FAQGrid({ content }: FAQGridProps) {
  const { heading, subheading, faqs, columns = 2 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h2>
      </div>

      {/* FAQ Grid */}
      <div className={cn('grid gap-6 sm:gap-8', gridColsClass[columns])}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
