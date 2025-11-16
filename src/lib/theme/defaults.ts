// ABOUTME: Default design token values for WebsiteTheme
// ABOUTME: DRY principle - centralized defaults used across all templates

import { WebsiteTheme } from '../types/website-config';

/**
 * Default design tokens matching shadcn/ui aesthetic
 * Used as fallback values when theme properties are not specified
 */
export const defaultTheme: WebsiteTheme = {
  colors: {
    primary: '#3B82F6', // Blue-500
    secondary: '#10B981', // Emerald-500
    background: '#FFFFFF',
    text: '#1F2937', // Gray-800
    muted: '#6B7280', // Gray-500
    accent: '#8B5CF6', // Violet-500
    border: 'hsl(214.3 31.8% 91.4%)', // shadcn/ui default
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  spacing: {
    section: '6rem', // 96px - spacing between sections
    container: '1280px', // Max container width
  },
  radius: {
    button: '0.5rem', // 8px - button border radius
    card: '1rem', // 16px - card border radius
    input: '0.5rem', // 8px - input border radius
  },
  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // shadcn/ui shadow-sm
    button: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
  },
};

/**
 * Merge user theme with defaults
 * Ensures all theme properties are always defined
 */
export function mergeWithDefaults(theme: WebsiteTheme): WebsiteTheme {
  return {
    colors: {
      ...defaultTheme.colors,
      ...theme.colors,
    },
    fonts: {
      ...defaultTheme.fonts,
      ...theme.fonts,
    },
    spacing: theme.spacing || defaultTheme.spacing,
    radius: theme.radius || defaultTheme.radius,
    shadows: theme.shadows || defaultTheme.shadows,
  };
}
