// ABOUTME: Zod schemas for runtime validation of WebsiteConfig from AI responses
// ABOUTME: Provides type-safe validation with detailed error messages

import { z } from 'zod';

/**
 * Block Types
 */
export const blockTypeSchema = z.enum([
  'hero',
  'features',
  'pricing',
  'testimonials',
  'cta',
  'footer',
  'stats',
  'faq',
  'team',
  'contact',
  'newsletter',
  'logo-cloud',
  'gallery',
  'process',
  'video',
]);

/**
 * Block Variants
 */
export const blockVariantSchema = z.enum([
  'centered',
  'split',
  'gradient',
  'grid',
  'list',
  'simple',
  'comparison',
  'cards',
  'carousel',
  'multi-column',
  'accordion',
  'bar',
  'featured',
  'timeline',
  'steps',
  'embed',
]);

/**
 * Block Settings
 */
export const blockSettingsSchema = z.object({
  spacing: z.enum(['tight', 'normal', 'loose']).optional(),
  background: z.string().optional(),
  animation: z.boolean().optional(),
  fullWidth: z.boolean().optional(),
}).optional();

/**
 * Block Schema
 * Uses record for content to allow block-specific validation
 */
export const blockSchema = z.object({
  id: z.string().min(1, 'Block ID is required'),
  type: blockTypeSchema,
  variant: blockVariantSchema.optional(),
  content: z.record(z.string(), z.unknown()), // Block-specific content (key-value pairs)
  settings: blockSettingsSchema,
});

/**
 * Website Theme Schema
 */
export const websiteThemeSchema = z.object({
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Primary color must be a valid hex color'),
    secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Secondary color must be a valid hex color'),
    background: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color'),
    text: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Text color must be a valid hex color'),
    muted: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Muted color must be a valid hex color'),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Accent color must be a valid hex color').optional(),
    border: z.string().optional(),
  }),
  fonts: z.object({
    heading: z.string().min(1, 'Heading font is required'),
    body: z.string().min(1, 'Body font is required'),
  }),
  spacing: z.object({
    section: z.string(),
    container: z.string(),
  }).optional(),
  radius: z.object({
    button: z.string(),
    card: z.string(),
    input: z.string(),
  }).optional(),
  shadows: z.object({
    card: z.string(),
    button: z.string(),
  }).optional(),
});

/**
 * Website Metadata Schema
 */
export const websiteMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(300, 'Description must be less than 300 characters'),
  author: z.string().optional(),
  favicon: z.string().url('Favicon must be a valid URL').optional().or(z.literal('')),
  ogImage: z.string().url('OG Image must be a valid URL').optional().or(z.literal('')),
});

/**
 * Template Types
 */
export const templateSchema = z.enum([
  'saas-landing',
  'product-landing',
  'portfolio',
  'agency',
  'ecommerce',
  'blog',
  'restaurant',
  'event',
  'course',
  'app-download',
  'custom',
]);

/**
 * Main WebsiteConfig Schema
 */
export const websiteConfigSchema = z.object({
  version: z.string().regex(/^\d+\.\d+$/, 'Version must be in format "X.Y" (e.g., "1.0")'),
  template: templateSchema,
  theme: websiteThemeSchema,
  blocks: z.array(blockSchema).min(1, 'At least one block is required'),
  metadata: websiteMetadataSchema,
});

/**
 * Exported type for runtime validation
 */
export type WebsiteConfigInput = z.input<typeof websiteConfigSchema>;
export type WebsiteConfigOutput = z.output<typeof websiteConfigSchema>;

/**
 * Validation Result Types
 */
export interface ValidationSuccess<T> {
  success: true;
  data: T;
}

export interface ValidationError {
  success: false;
  error: string;
  details: z.ZodIssue[];
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

/**
 * Validate WebsiteConfig with detailed error reporting
 *
 * @param data - Data to validate against WebsiteConfig schema
 * @returns Validation result with typed data or detailed errors
 */
export function validateWebsiteConfig(data: unknown): ValidationResult<WebsiteConfigOutput> {
  try {
    const result = websiteConfigSchema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    // Format error messages for user-friendly display
    const errorMessages = result.error.issues.map((issue) => {
      const path = issue.path.join('.');
      return `${path}: ${issue.message}`;
    });

    return {
      success: false,
      error: `Validation failed:\n${errorMessages.join('\n')}`,
      details: result.error.issues,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown validation error',
      details: [],
    };
  }
}

/**
 * Partial validation for AI editing
 * Allows partial updates while preserving type safety
 */
export const websiteConfigPartialSchema = websiteConfigSchema.partial();

/**
 * Validate partial WebsiteConfig update
 */
export function validatePartialWebsiteConfig(
  data: unknown
): ValidationResult<Partial<WebsiteConfigOutput>> {
  try {
    const result = websiteConfigPartialSchema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    const errorMessages = result.error.issues.map((issue) => {
      const path = issue.path.join('.');
      return `${path}: ${issue.message}`;
    });

    return {
      success: false,
      error: `Partial validation failed:\n${errorMessages.join('\n')}`,
      details: result.error.issues,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown validation error',
      details: [],
    };
  }
}
