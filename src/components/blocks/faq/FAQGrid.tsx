// ABOUTME: Grid-style FAQ block variant displaying questions in a grid layout
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQContentGrid } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

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
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
