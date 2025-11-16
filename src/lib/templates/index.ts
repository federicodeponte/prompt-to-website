// ABOUTME: Barrel export for all website templates
// ABOUTME: Provides centralized access to template configurations

export { saasLandingTemplate } from './saas-landing';
export { productLandingTemplate } from './product-landing';
export { portfolioTemplate } from './portfolio';
export { agencyTemplate } from './agency';
export { ecommerceTemplate } from './ecommerce';
export { blogTemplate } from './blog';

import { WebsiteConfig } from '../types/website-config';
import { saasLandingTemplate } from './saas-landing';
import { productLandingTemplate } from './product-landing';
import { portfolioTemplate } from './portfolio';
import { agencyTemplate } from './agency';
import { ecommerceTemplate } from './ecommerce';
import { blogTemplate } from './blog';

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
    config: saasLandingTemplate,
  },
  {
    id: 'agency',
    name: 'Digital Agency',
    description: 'Professional services showcase with team, portfolio, and client testimonials. Ideal for agencies and consultants.',
    category: 'business',
    config: agencyTemplate,
  },
  {
    id: 'product-landing',
    name: 'Product Landing Page',
    description: 'Showcase a specific product with features, stats, FAQ, and compelling CTAs.',
    category: 'product',
    config: productLandingTemplate,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Product',
    description: 'Conversion-optimized product page with pricing tiers, customer reviews, and detailed features.',
    category: 'product',
    config: ecommerceTemplate,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal portfolio to showcase your work, skills, and client testimonials.',
    category: 'personal',
    config: portfolioTemplate,
  },
  {
    id: 'blog',
    name: 'Blog & Content',
    description: 'Content-focused website for writers, developers, and creators. Includes newsletter and author showcase.',
    category: 'personal',
    config: blogTemplate,
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
