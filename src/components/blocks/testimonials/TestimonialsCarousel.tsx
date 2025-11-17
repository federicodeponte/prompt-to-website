// ABOUTME: Premium testimonials carousel with autoplay and navigation
// ABOUTME: Production-quality design with Framer Motion animations and smooth transitions

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialsContentCarousel } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { cardHoverDramatic } from '@/lib/animations';

interface TestimonialsCarouselProps {
  content: TestimonialsContentCarousel;
}

/**
 * Premium testimonials carousel with autoplay
 * Features: Autoplay, navigation controls, star ratings, smooth transitions
 */
export function TestimonialsCarousel({ content }: TestimonialsCarouselProps) {
  const { heading, subheading, testimonials, autoplay = true, interval = 5000 } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  /**
   * Navigate to next testimonial
   */
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  /**
   * Navigate to previous testimonial
   */
  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  /**
   * Autoplay effect
   */
  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext, testimonials.length]);

  /**
   * Render star rating visualization
   */
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 justify-center" aria-label={`${rating} stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'h-5 w-5',
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

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  /**
   * Animation variants for carousel transitions
   */
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
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

      {/* Carousel Container */}
      <div className="relative mx-auto max-w-4xl">
        {/* Testimonial Card with AnimatePresence for smooth transitions */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <motion.div
                variants={cardHoverDramatic}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="h-full"
              >
                <Card className="h-full border-2 bg-gradient-to-br from-background to-muted/20 rounded-theme-card shadow-theme-card relative overflow-hidden">
                {/* Decorative Quote Icon */}
                <div className="absolute -top-4 -right-4 text-primary/10">
                  <Quote className="h-32 w-32" aria-hidden="true" />
                </div>

                <CardContent className="p-12 flex flex-col justify-center h-full relative z-10">
                  {/* Rating */}
                  {currentTestimonial.rating && (
                    <div className="mb-8">
                      {renderStars(currentTestimonial.rating)}
                    </div>
                  )}

                  {/* Quote */}
                  <blockquote className="mb-12">
                    <p className="font-theme-body text-2xl md:text-3xl font-medium text-center leading-relaxed italic text-muted-foreground">
                      &ldquo;{currentTestimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col items-center gap-6">
                    {/* Avatar */}
                    <Avatar className="h-16 w-16 border-2 border-theme-primary/20">
                      <AvatarImage
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.author}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-xl">
                        {getInitials(currentTestimonial.author)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Name and Role */}
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">
                        {currentTestimonial.author}
                      </div>
                      <div className="text-base text-muted-foreground">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="h-12 w-12 rounded-full border-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-12 w-12 rounded-full border-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        )}

        {/* Progress Indicator (if autoplay) */}
        {autoplay && testimonials.length > 1 && (
          <div className="mt-4 max-w-md mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                key={currentIndex}
                transition={{ duration: interval / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
