// ABOUTME: Cards testimonials block variant displaying testimonials in a grid
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TestimonialsContentCards } from '@/lib/types/block-content';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialsCardsProps {
  content: TestimonialsContentCards;
}

export function TestimonialsCards({ content }: TestimonialsCardsProps) {
  const { heading, subheading, testimonials, columns = 3 } = content;

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

      {/* Testimonials Grid */}
      <div className={cn('grid gap-6 sm:gap-8', gridColsClass[columns])}>
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6 space-y-4">
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar && (
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
