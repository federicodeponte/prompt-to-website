// ABOUTME: Barrel export for all website templates
// ABOUTME: Provides centralized access to template configurations

export { saasLandingTemplate } from './saas-landing';
export { productLandingTemplate } from './product-landing';
export { portfolioTemplate } from './portfolio';
export { agencyTemplate } from './agency';
export { ecommerceTemplate } from './ecommerce';
export { blogTemplate } from './blog';
export { restaurantTemplate } from './restaurant';
export { eventTemplate } from './event';
export { courseTemplate } from './course';
export { appDownloadTemplate } from './app-download';

import { WebsiteConfig } from '../types/website-config';
import { saasLandingTemplate } from './saas-landing';
import { productLandingTemplate } from './product-landing';
import { portfolioTemplate } from './portfolio';
import { agencyTemplate } from './agency';
import { ecommerceTemplate } from './ecommerce';
import { blogTemplate } from './blog';
import { restaurantTemplate } from './restaurant';
import { eventTemplate } from './event';
import { courseTemplate } from './course';
import { appDownloadTemplate } from './app-download';

/**
 * Template metadata for UI display
 */
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'product' | 'personal';
  previewImage?: string;
  config: WebsiteConfig;
}

/**
 * All available templates with metadata
 * Used for template gallery and selection UI
 */
export const templates: TemplateMetadata[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    description: 'Perfect for software as a service products. Includes pricing, features, and testimonials.',
    category: 'business',
    previewImage: '/templates/saas-landing.webp',
    config: saasLandingTemplate,
  },
  {
    id: 'agency',
    name: 'Digital Agency',
    description: 'Professional services showcase with team, portfolio, and client testimonials. Ideal for agencies and consultants.',
    category: 'business',
    previewImage: '/templates/agency.webp',
    config: agencyTemplate,
  },
  {
    id: 'product-landing',
    name: 'Product Landing Page',
    description: 'Showcase a specific product with features, stats, FAQ, and compelling CTAs.',
    category: 'product',
    previewImage: '/templates/product-landing.webp',
    config: productLandingTemplate,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Product',
    description: 'Conversion-optimized product page with pricing tiers, customer reviews, and detailed features.',
    category: 'product',
    previewImage: '/templates/ecommerce.webp',
    config: ecommerceTemplate,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal portfolio to showcase your work, skills, and client testimonials.',
    category: 'personal',
    previewImage: '/templates/portfolio.webp',
    config: portfolioTemplate,
  },
  {
    id: 'blog',
    name: 'Blog & Content',
    description: 'Content-focused website for writers, developers, and creators. Includes newsletter and author showcase.',
    category: 'personal',
    previewImage: '/templates/blog.webp',
    config: blogTemplate,
  },
  {
    id: 'restaurant',
    name: 'Restaurant/Local Business',
    description: 'Perfect for restaurants, cafes, and local businesses. Features menu, location, hours, and reviews.',
    category: 'business',
    previewImage: '/templates/restaurant.webp',
    config: restaurantTemplate,
  },
  {
    id: 'event',
    name: 'Event/Conference',
    description: 'Event landing page with speakers, schedule, tickets, and venue information. Ideal for conferences and meetups.',
    category: 'business',
    previewImage: '/templates/event.webp',
    config: eventTemplate,
  },
  {
    id: 'course',
    name: 'Online Course',
    description: 'Education and course platform with curriculum, instructor info, pricing tiers, and student testimonials.',
    category: 'personal',
    previewImage: '/templates/course.webp',
    config: courseTemplate,
  },
  {
    id: 'app-download',
    name: 'App Download Page',
    description: 'Mobile app landing page with features, screenshots, user reviews, and download buttons for iOS/Android.',
    category: 'product',
    previewImage: '/templates/app-download.webp',
    config: appDownloadTemplate,
  },
];

/**
 * Get all templates
 */
export function getAllTemplates(): TemplateMetadata[] {
  return templates;
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): WebsiteConfig | null {
  const template = templates.find((t) => t.id === id);
  return template ? template.config : null;
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(
  category: 'business' | 'product' | 'personal' | 'all'
): TemplateMetadata[] {
  if (category === 'all') return templates;
  return templates.filter((t) => t.category === category);
}
