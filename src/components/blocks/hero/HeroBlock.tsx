// ABOUTME: Main Hero block component that routes to appropriate variant based on content
// ABOUTME: Implements Strategy pattern and Open/Closed Principle for extensibility

import React from 'react';
import { HeroCentered } from './HeroCentered';
import { HeroSplit } from './HeroSplit';
import { HeroGradient } from './HeroGradient';
import { HeroContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface HeroBlockProps {
  content: HeroContent;
  settings?: BlockSettings;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * HeroBlock component selects and renders the appropriate hero variant
 * based on the content's variant field.
 *
 * Follows Strategy Pattern: Each variant is a separate component (strategy)
 * Follows Open/Closed Principle: Easy to add new variants without modifying this component
 *
 * @param content - Strongly typed hero content (discriminated union)
 * @param settings - Optional block settings for spacing, background, etc.
 * @param theme - Optional theme overrides
 */
export function HeroBlock({ content, settings, theme }: HeroBlockProps) {
  /**
   * Variant selector using discriminated union type narrowing
   * TypeScript automatically narrows the content type based on variant
   */
  const renderVariant = () => {
    switch (content.variant) {
      case 'centered':
        return <HeroCentered content={content} theme={theme} />;
      case 'split':
        return <HeroSplit content={content} theme={theme} />;
      case 'gradient':
        return <HeroGradient content={content} theme={theme} />;
      default:
        // Exhaustive check - TypeScript will error if we miss a variant
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
