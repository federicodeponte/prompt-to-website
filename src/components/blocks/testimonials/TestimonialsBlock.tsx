// ABOUTME: Main Testimonials block component with variant routing

import React from 'react';
import { TestimonialsCards } from './TestimonialsCards';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TestimonialsContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface TestimonialsBlockProps {
  content: TestimonialsContent;
  settings?: BlockSettings;
}

export function TestimonialsBlock({ content, settings }: TestimonialsBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'cards':
        return <TestimonialsCards content={content} />;
      case 'carousel':
        return <TestimonialsCarousel content={content} />;
      default:
        const _exhaustiveCheck: never = content;
        return _exhaustiveCheck;
    }
  };

  return (
    <BlockWrapper settings={settings} id={content.id}>
      {renderVariant()}
    </BlockWrapper>
  );
}
