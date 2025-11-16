// ABOUTME: Premium testimonials card grid with ratings and avatars
// ABOUTME: Production-quality design with Framer Motion animations and star ratings

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';
import { TestimonialsContentCards } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface TestimonialsCardsProps {
  content: TestimonialsContentCards;
}

/**
 * Premium testimonials card grid with star ratings
 * Features: Avatar, star ratings, staggered animations, quote icons
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

      {/* Animated Testimonials Grid */}
      {testimonials && testimonials.length > 0 && (
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full border-2 transition-all duration-300 hover:shadow-xl hover:border-primary/50 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
                {/* Decorative Quote Icon */}
                <motion.div
                  className="absolute -top-2 -right-2 text-primary/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Quote className="h-24 w-24" aria-hidden="true" />
                </motion.div>

                <CardContent className="p-8 flex flex-col h-full relative z-10">
                  {/* Rating */}
                  {testimonial.rating && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {renderStars(testimonial.rating)}
                    </motion.div>
                  )}

                  {/* Quote */}
                  <blockquote className="flex-1 mb-8">
                    <p className="text-lg text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {/* Avatar */}
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
                        {getInitials(testimonial.author)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Name and Role */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground truncate">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
