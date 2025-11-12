// ABOUTME: Carousel testimonials block variant (simplified for MVP)
// ABOUTME: Renders same as cards for now, can be enhanced with carousel later

import React from 'react';
import { TestimonialsContentCarousel } from '@/lib/types/block-content';
import { TestimonialsCards } from './TestimonialsCards';

interface TestimonialsCarouselProps {
  content: TestimonialsContentCarousel;
}

export function TestimonialsCarousel({ content }: TestimonialsCarouselProps) {
  // For MVP, render as cards
  // Can be enhanced later with actual carousel functionality
  return <TestimonialsCards content={{ ...content, variant: 'cards', columns: 3 }} />;
}
