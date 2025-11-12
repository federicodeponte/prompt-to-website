// ABOUTME: Strongly typed content definitions for each block type
// ABOUTME: Ensures type safety and prevents runtime errors from missing/incorrect content

import { BlockVariant } from './website-config';

/**
 * Base interface that all block content types must extend
 * Provides common fields across all blocks
 */
export interface BaseBlockContent {
  id: string;
  variant?: BlockVariant;
}

/**
 * Hero Block Content Types
 */
export interface HeroContentCentered extends BaseBlockContent {
  variant: 'centered';
  heading: string;
  subheading: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

export interface HeroContentSplit extends BaseBlockContent {
  variant: 'split';
  heading: string;
  subheading: string;
  description: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
}

export interface HeroContentGradient extends BaseBlockContent {
  variant: 'gradient';
  heading: string;
  subheading: string;
  description: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  features?: string[];
}

export type HeroContent =
  | HeroContentCentered
  | HeroContentSplit
  | HeroContentGradient;

/**
 * Features Block Content Types
 */
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesContentGrid extends BaseBlockContent {
  variant: 'grid';
  heading: string;
  subheading: string;
  features: Feature[];
  columns: 2 | 3 | 4;
}

export interface FeaturesContentList extends BaseBlockContent {
  variant: 'list';
  heading: string;
  subheading: string;
  features: Feature[];
}

export type FeaturesContent =
  | FeaturesContentGrid
  | FeaturesContentList;

/**
 * Pricing Block Content Types
 */
export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlighted?: boolean;
}

export interface PricingContentSimple extends BaseBlockContent {
  variant: 'simple';
  heading: string;
  subheading: string;
  tiers: PricingTier[];
}

export interface PricingContentComparison extends BaseBlockContent {
  variant: 'comparison';
  heading: string;
  subheading: string;
  tiers: PricingTier[];
  comparisonFeatures: {
    feature: string;
    tiers: Record<string, boolean | string>;
  }[];
}

export type PricingContent =
  | PricingContentSimple
  | PricingContentComparison;

/**
 * Testimonials Block Content Types
 */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsContentCards extends BaseBlockContent {
  variant: 'cards';
  heading: string;
  subheading: string;
  testimonials: Testimonial[];
  columns: 2 | 3;
}

export interface TestimonialsContentCarousel extends BaseBlockContent {
  variant: 'carousel';
  heading: string;
  subheading: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
}

export type TestimonialsContent =
  | TestimonialsContentCards
  | TestimonialsContentCarousel;

/**
 * CTA Block Content Types
 */
export interface CTAContentSimple extends BaseBlockContent {
  variant: 'simple';
  heading: string;
  description: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
}

export interface CTAContentSplit extends BaseBlockContent {
  variant: 'split';
  heading: string;
  description: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  image: string;
  imageAlt: string;
}

export type CTAContent =
  | CTAContentSimple
  | CTAContentSplit;

/**
 * Footer Block Content Types
 */
export interface FooterLink {
  text: string;
  link: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContentSimple extends BaseBlockContent {
  variant: 'simple';
  logo: string;
  tagline: string;
  links: FooterLink[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  copyright: string;
}

export interface FooterContentMultiColumn extends BaseBlockContent {
  variant: 'multi-column';
  logo: string;
  tagline: string;
  sections: FooterSection[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  copyright: string;
}

export type FooterContent =
  | FooterContentSimple
  | FooterContentMultiColumn;

/**
 * FAQ Block Content Types
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContentAccordion extends BaseBlockContent {
  variant: 'accordion';
  heading: string;
  subheading: string;
  faqs: FAQItem[];
}

export interface FAQContentGrid extends BaseBlockContent {
  variant: 'grid';
  heading: string;
  subheading: string;
  faqs: FAQItem[];
  columns: 2 | 3;
}

export type FAQContent =
  | FAQContentAccordion
  | FAQContentGrid;

/**
 * Stats Block Content Types
 */
export interface Stat {
  value: string;
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsContentGrid extends BaseBlockContent {
  variant: 'grid';
  heading?: string;
  subheading?: string;
  stats: Stat[];
  columns: 2 | 3 | 4;
}

export interface StatsContentBar extends BaseBlockContent {
  variant: 'bar';
  heading?: string;
  subheading?: string;
  stats: Stat[];
}

export type StatsContent =
  | StatsContentGrid
  | StatsContentBar;

/**
 * Contact Block Content Types
 */
export interface ContactContentSimple extends BaseBlockContent {
  variant: 'simple';
  heading: string;
  description: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm: boolean;
}

export interface ContactContentSplit extends BaseBlockContent {
  variant: 'split';
  heading: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  imageAlt: string;
}

export type ContactContent =
  | ContactContentSimple
  | ContactContentSplit;

/**
 * Newsletter Block Content Types
 */
export interface NewsletterContentSimple extends BaseBlockContent {
  variant: 'simple';
  heading: string;
  description: string;
  placeholder: string;
  ctaText: string;
}

export type NewsletterContent = NewsletterContentSimple;

/**
 * Union type of all possible block content types
 * Used by the WebsiteRenderer to determine which component to render
 */
export type BlockContent =
  | HeroContent
  | FeaturesContent
  | PricingContent
  | TestimonialsContent
  | CTAContent
  | FooterContent
  | FAQContent
  | StatsContent
  | ContactContent
  | NewsletterContent;

/**
 * Type guard functions to narrow block content types
 * Enables type-safe content access in components
 * Accept unknown for safer type narrowing from JSON
 */
export function isHeroContent(content: unknown): content is HeroContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'heading' in content &&
    'ctaPrimary' in content
  );
}

export function isFeaturesContent(content: unknown): content is FeaturesContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'features' in content &&
    Array.isArray((content as Record<string, unknown>).features)
  );
}

export function isPricingContent(content: unknown): content is PricingContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'tiers' in content &&
    Array.isArray((content as Record<string, unknown>).tiers)
  );
}

export function isTestimonialsContent(content: unknown): content is TestimonialsContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'testimonials' in content &&
    Array.isArray((content as Record<string, unknown>).testimonials)
  );
}

export function isCTAContent(content: unknown): content is CTAContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'heading' in content &&
    'description' in content &&
    'ctaPrimary' in content
  );
}

export function isFooterContent(content: unknown): content is FooterContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'logo' in content &&
    'copyright' in content
  );
}

export function isFAQContent(content: unknown): content is FAQContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'faqs' in content &&
    Array.isArray((content as Record<string, unknown>).faqs)
  );
}

export function isStatsContent(content: unknown): content is StatsContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'stats' in content &&
    Array.isArray((content as Record<string, unknown>).stats)
  );
}

export function isContactContent(content: unknown): content is ContactContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'heading' in content &&
    'description' in content &&
    ('email' in content || 'showForm' in content)
  );
}

export function isNewsletterContent(content: unknown): content is NewsletterContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'heading' in content &&
    'placeholder' in content &&
    'ctaText' in content
  );
}
