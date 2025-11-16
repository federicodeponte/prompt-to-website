// ABOUTME: Clean testimonials card grid matching shadcn/ui aesthetic
// ABOUTME: Production-quality design with minimal animations and proper avatars

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { TestimonialsContentCards } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface TestimonialsCardsProps {
  content: TestimonialsContentCards;
}

/**
 * Clean testimonials card grid with shadcn/ui design
 * Design principles: Whitespace, subtle shadows, professional typography
 */
export function TestimonialsCards({ content }: TestimonialsCardsProps) {
  const { heading, subheading, testimonials, columns = 3 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  } as const;

  /**
   * Render star rating visualization
   */
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5" aria-label={`${rating} stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'h-4 w-4',
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-muted text-muted-foreground/30'
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  };

  /**
   * Get initials from name for avatar fallback
   */
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-12">
      {/* Header - clean and minimal */}
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

      {/* Testimonials Grid - clean cards */}
      {testimonials && testimonials.length > 0 && (
        <div className={cn('grid gap-6 lg:gap-8', gridColsClass[columns])}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full border shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                  )}

                  {/* Quote */}
                  <blockquote className="mb-6 flex-1">
                    <p className="text-sm leading-relaxed text-foreground">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {getInitials(testimonial.author)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Name and Role */}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-semibold text-sm text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
