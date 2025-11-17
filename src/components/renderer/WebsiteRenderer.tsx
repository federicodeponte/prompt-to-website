// ABOUTME: Main website renderer component that converts WebsiteConfig JSON to React components
// ABOUTME: Implements Factory pattern for block type to component mapping with lazy loading

'use client';

import React, { Suspense, lazy } from 'react';
import { WebsiteConfig, Block } from '@/lib/types/website-config';
import { mergeWithDefaults } from '@/lib/theme/defaults';
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
  isTeamContent,
  isLogoCloudContent,
  isGalleryContent,
  isProcessContent,
  isVideoContent,
} from '@/lib/types/block-content';

/**
 * Lazy-loaded block components
 * Reduces initial bundle size by loading blocks only when needed
 */
const HeroBlock = lazy(() => import('../blocks/hero').then(m => ({ default: m.HeroBlock })));
const FeaturesBlock = lazy(() => import('../blocks/features').then(m => ({ default: m.FeaturesBlock })));
const PricingBlock = lazy(() => import('../blocks/pricing').then(m => ({ default: m.PricingBlock })));
const TestimonialsBlock = lazy(() => import('../blocks/testimonials').then(m => ({ default: m.TestimonialsBlock })));
const CTABlock = lazy(() => import('../blocks/cta').then(m => ({ default: m.CTABlock })));
const FooterBlock = lazy(() => import('../blocks/footer').then(m => ({ default: m.FooterBlock })));
const FAQBlock = lazy(() => import('../blocks/faq').then(m => ({ default: m.FAQBlock })));
const StatsBlock = lazy(() => import('../blocks/stats').then(m => ({ default: m.StatsBlock })));
const ContactBlock = lazy(() => import('../blocks/contact').then(m => ({ default: m.ContactBlock })));
const NewsletterBlock = lazy(() => import('../blocks/newsletter').then(m => ({ default: m.NewsletterBlock })));
const TeamBlock = lazy(() => import('../blocks/team').then(m => ({ default: m.TeamBlock })));
const LogoCloudBlock = lazy(() => import('../blocks/logo-cloud/LogoCloudBlock').then(m => ({ default: m.LogoCloudBlock })));
const GalleryBlock = lazy(() => import('../blocks/gallery/GalleryBlock').then(m => ({ default: m.GalleryBlock })));
const ProcessBlock = lazy(() => import('../blocks/process/ProcessBlock').then(m => ({ default: m.ProcessBlock })));
const VideoBlock = lazy(() => import('../blocks/video/VideoBlock').then(m => ({ default: m.VideoBlock })));

/**
 * Loading fallback component
 * Displays while lazy components are loading
 */
function BlockLoadingFallback() {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

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
 * - Memoized to prevent unnecessary re-renders when config hasn't changed
 *
 * Principles:
 * - Single Responsibility: Only responsible for rendering the config
 * - Open/Closed: Easy to add new block types without modifying existing code
 * - Dependency Inversion: Depends on Block abstractions, not concrete implementations
 * - Performance: React.memo prevents re-renders when config is unchanged
 */
function WebsiteRendererComponent({ config }: WebsiteRendererProps) {
  // Merge user theme with defaults to ensure all properties exist
  const theme = mergeWithDefaults(config.theme);
  const blocks = config.blocks || [];

  /**
   * Render a single block based on its type
   * Uses type guards to ensure type safety and proper component selection
   * Each block is wrapped in Suspense for lazy loading
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
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <HeroBlock
                  content={content}
                  settings={settings}
                  theme={{ primaryColor: theme.colors.primary }}
                />
              </Suspense>
            );
          }
          break;

        case 'features':
          if (isFeaturesContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <FeaturesBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'pricing':
          if (isPricingContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <PricingBlock
                  content={content}
                  settings={settings}
                  theme={{ primaryColor: theme.colors.primary }}
                />
              </Suspense>
            );
          }
          break;

        case 'testimonials':
          if (isTestimonialsContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <TestimonialsBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'cta':
          if (isCTAContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <CTABlock
                  content={content}
                  settings={settings}
                  theme={{ primaryColor: theme.colors.primary }}
                />
              </Suspense>
            );
          }
          break;

        case 'footer':
          if (isFooterContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <FooterBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'faq':
          if (isFAQContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <FAQBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'stats':
          if (isStatsContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <StatsBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'contact':
          if (isContactContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <ContactBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'newsletter':
          if (isNewsletterContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <NewsletterBlock
                  content={content}
                  settings={settings}
                  theme={{ primaryColor: theme.colors.primary }}
                />
              </Suspense>
            );
          }
          break;

        case 'team':
          if (isTeamContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <TeamBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'logo-cloud':
          if (isLogoCloudContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <LogoCloudBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'gallery':
          if (isGalleryContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <GalleryBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'process':
          if (isProcessContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <ProcessBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

        case 'video':
          if (isVideoContent(content)) {
            return (
              <Suspense key={block.id} fallback={<BlockLoadingFallback />}>
                <VideoBlock
                  content={content}
                  settings={settings}
                />
              </Suspense>
            );
          }
          break;

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
          // Colors
          '--color-primary': theme.colors.primary,
          '--color-secondary': theme.colors.secondary,
          '--color-background': theme.colors.background,
          '--color-text': theme.colors.text,
          '--color-muted': theme.colors.muted,
          '--color-accent': theme.colors.accent || theme.colors.secondary,
          '--color-border': theme.colors.border || 'hsl(214.3 31.8% 91.4%)',
          // Fonts
          '--font-heading': theme.fonts.heading,
          '--font-body': theme.fonts.body,
          // Spacing
          '--spacing-section': theme.spacing!.section,
          '--spacing-container': theme.spacing!.container,
          // Radius
          '--radius-button': theme.radius!.button,
          '--radius-card': theme.radius!.card,
          '--radius-input': theme.radius!.input,
          // Shadows
          '--shadow-card': theme.shadows!.card,
          '--shadow-button': theme.shadows!.button,
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

/**
 * Memoized WebsiteRenderer to prevent unnecessary re-renders
 * Only re-renders when config reference changes (shallow comparison)
 */
export const WebsiteRenderer = React.memo(WebsiteRendererComponent);
