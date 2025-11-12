// ABOUTME: Main website renderer component that converts WebsiteConfig JSON to React components
// ABOUTME: Implements Factory pattern for block type to component mapping

'use client';

import React from 'react';
import { WebsiteConfig, Block } from '@/lib/types/website-config';
import { HeroBlock } from '../blocks/hero';
import { FeaturesBlock } from '../blocks/features';
import { PricingBlock } from '../blocks/pricing';
import { TestimonialsBlock } from '../blocks/testimonials';
import { CTABlock } from '../blocks/cta';
import { FooterBlock } from '../blocks/footer';
import { FAQBlock } from '../blocks/faq';
import { StatsBlock } from '../blocks/stats';
import { ContactBlock } from '../blocks/contact';
import { NewsletterBlock } from '../blocks/newsletter';
import {
  isHeroContent,
  isFeaturesContent,
  isPricingContent,
  isTestimonialsContent,
  isCTAContent,
  isFooterContent,
  isFAQContent,
  isStatsContent,
  isContactContent,
  isNewsletterContent,
} from '@/lib/types/block-content';

interface WebsiteRendererProps {
  config: WebsiteConfig;
}

/**
 * WebsiteRenderer component renders a complete website from a WebsiteConfig object
 *
 * Architecture:
 * - Applies global theme via CSS custom properties
 * - Maps each block to its corresponding component using Factory pattern
 * - Ensures type safety through discriminated unions and type guards
 *
 * Principles:
 * - Single Responsibility: Only responsible for rendering the config
 * - Open/Closed: Easy to add new block types without modifying existing code
 * - Dependency Inversion: Depends on Block abstractions, not concrete implementations
 */
export function WebsiteRenderer({ config }: WebsiteRendererProps) {
  const { theme } = config;
  const blocks = config.blocks || [];

  /**
   * Render a single block based on its type
   * Uses type guards to ensure type safety and proper component selection
   */
  const renderBlock = (block: Block) => {
    const { type, settings } = block;
    // Cast content to unknown first, then validate with type guards
    const content = block.content as unknown;

    try {
      switch (type) {
        case 'hero':
          if (isHeroContent(content)) {
            return (
              <HeroBlock
                key={block.id}
                content={content}
                settings={settings}
                theme={{ primaryColor: theme.colors.primary }}
              />
            );
          }
          break;

        case 'features':
          if (isFeaturesContent(content)) {
            return (
              <FeaturesBlock
                key={block.id}
                content={content}
                settings={settings}
              />
            );
          }
          break;

        case 'pricing':
          if (isPricingContent(content)) {
            return (
              <PricingBlock
                key={block.id}
                content={content}
                settings={settings}
                theme={{ primaryColor: theme.colors.primary }}
              />
            );
          }
          break;

        case 'testimonials':
          if (isTestimonialsContent(content)) {
            return (
              <TestimonialsBlock
                key={block.id}
                content={content}
                settings={settings}
              />
            );
          }
          break;

        case 'cta':
          if (isCTAContent(content)) {
            return (
              <CTABlock
                key={block.id}
                content={content}
                settings={settings}
                theme={{ primaryColor: theme.colors.primary }}
              />
            );
          }
          break;

        case 'footer':
          if (isFooterContent(content)) {
            return (
              <FooterBlock
                key={block.id}
                content={content}
                settings={settings}
              />
            );
          }
          break;

        case 'faq':
          if (isFAQContent(content)) {
            return (
              <FAQBlock
                key={block.id}
                content={content}
                settings={settings}
              />
            );
          }
          break;

        case 'stats':
          if (isStatsContent(content)) {
            return (
              <StatsBlock
                key={block.id}
                content={content}
                settings={settings}
              />
            );
          }
          break;

        case 'contact':
          if (isContactContent(content)) {
            return (
              <ContactBlock
                key={block.id}
                content={content}
                settings={settings}
              />
            );
          }
          break;

        case 'newsletter':
          if (isNewsletterContent(content)) {
            return (
              <NewsletterBlock
                key={block.id}
                content={content}
                settings={settings}
                theme={{ primaryColor: theme.colors.primary }}
              />
            );
          }
          break;

        case 'team':
          // Future block type - not implemented yet
          console.warn(`Block type "${type}" is not implemented yet`);
          return null;

        default:
          // Exhaustive check ensures we handle all block types
          const _exhaustiveCheck: never = type;
          console.warn(`Unknown block type: ${_exhaustiveCheck}`);
          return null;
      }

      // If type guard failed, content doesn't match expected shape
      console.error(`Invalid content for block type "${type}":`, content);
      return null;
    } catch (error) {
      // Graceful error handling - don't crash entire site if one block fails
      console.error(`Error rendering block "${block.id}" of type "${type}":`, error);
      return null;
    }
  };

  return (
    <div
      className="website-renderer min-h-screen"
      style={
        {
          '--color-primary': theme.colors.primary,
          '--color-secondary': theme.colors.secondary,
          '--color-background': theme.colors.background,
          '--color-text': theme.colors.text,
          '--color-muted': theme.colors.muted,
          '--font-heading': theme.fonts.heading,
          '--font-body': theme.fonts.body,
        } as React.CSSProperties
      }
    >
      {/* Render all blocks in order */}
      <main>
        {blocks.map((block) => renderBlock(block))}
      </main>
    </div>
  );
}
