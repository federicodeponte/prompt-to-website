// ABOUTME: Curated theme presets for quick styling
// ABOUTME: Professional color palettes for different use cases

import { WebsiteTheme } from '../types/website-config';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: WebsiteTheme;
}

/**
 * Curated theme presets covering common design aesthetics
 * Each preset is a complete, production-ready color palette
 */
export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default Blue',
    description: 'Clean, professional blue theme',
    theme: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        background: '#FFFFFF',
        text: '#1F2937',
        muted: '#6B7280',
        accent: '#8B5CF6',
        border: 'hsl(214.3 31.8% 91.4%)',
      },
      fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
      },
      spacing: {
        section: '6rem',
        container: '1280px',
      },
      radius: {
        button: '0.5rem',
        card: '1rem',
        input: '0.5rem',
      },
      shadows: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        button: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark, sophisticated purple and blue',
    theme: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        background: '#0F172A',
        text: '#F1F5F9',
        muted: '#94A3B8',
        accent: '#A855F7',
        border: 'hsl(217 33% 17%)',
      },
      fonts: {
        heading: 'Poppins, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
      },
      spacing: {
        section: '6rem',
        container: '1280px',
      },
      radius: {
        button: '0.75rem',
        card: '1rem',
        input: '0.75rem',
      },
      shadows: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        button: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Calm teal and cyan palette',
    theme: {
      colors: {
        primary: '#06B6D4',
        secondary: '#14B8A6',
        background: '#FFFFFF',
        text: '#0F172A',
        muted: '#64748B',
        accent: '#0EA5E9',
        border: 'hsl(185 20% 88%)',
      },
      fonts: {
        heading: 'Montserrat, system-ui, sans-serif',
        body: 'Open Sans, system-ui, sans-serif',
      },
      spacing: {
        section: '5rem',
        container: '1280px',
      },
      radius: {
        button: '0.5rem',
        card: '1.25rem',
        input: '0.5rem',
      },
      shadows: {
        card: '0 4px 6px -1px rgba(6, 182, 212, 0.1), 0 2px 4px -1px rgba(6, 182, 212, 0.06)',
        button: '0 4px 6px -1px rgba(6, 182, 212, 0.2), 0 2px 4px -1px rgba(6, 182, 212, 0.1)',
      },
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and pink gradient',
    theme: {
      colors: {
        primary: '#F97316',
        secondary: '#EC4899',
        background: '#FFFBF5',
        text: '#1C1917',
        muted: '#78716C',
        accent: '#FB923C',
        border: 'hsl(25 20% 90%)',
      },
      fonts: {
        heading: 'Playfair Display, serif',
        body: 'Lato, system-ui, sans-serif',
      },
      spacing: {
        section: '7rem',
        container: '1280px',
      },
      radius: {
        button: '9999px',
        card: '1.5rem',
        input: '9999px',
      },
      shadows: {
        card: '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
        button: '0 4px 6px -1px rgba(249, 115, 22, 0.2), 0 2px 4px -1px rgba(249, 115, 22, 0.1)',
      },
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green and earth tones',
    theme: {
      colors: {
        primary: '#059669',
        secondary: '#84CC16',
        background: '#FAFAF9',
        text: '#1C1917',
        muted: '#57534E',
        accent: '#22C55E',
        border: 'hsl(60 9% 85%)',
      },
      fonts: {
        heading: 'Roboto, system-ui, sans-serif',
        body: 'Roboto, system-ui, sans-serif',
      },
      spacing: {
        section: '6rem',
        container: '1200px',
      },
      radius: {
        button: '0.375rem',
        card: '0.75rem',
        input: '0.375rem',
      },
      shadows: {
        card: '0 1px 3px 0 rgba(5, 150, 105, 0.1), 0 1px 2px 0 rgba(5, 150, 105, 0.06)',
        button: '0 4px 6px -1px rgba(5, 150, 105, 0.15), 0 2px 4px -1px rgba(5, 150, 105, 0.1)',
      },
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean monochrome with subtle accents',
    theme: {
      colors: {
        primary: '#18181B',
        secondary: '#52525B',
        background: '#FFFFFF',
        text: '#09090B',
        muted: '#71717A',
        accent: '#A1A1AA',
        border: 'hsl(0 0% 90%)',
      },
      fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
      },
      spacing: {
        section: '8rem',
        container: '1140px',
      },
      radius: {
        button: '0.25rem',
        card: '0.5rem',
        input: '0.25rem',
      },
      shadows: {
        card: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        button: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
];

/**
 * Get a preset by ID
 */
export function getPresetById(id: string): ThemePreset | undefined {
  return themePresets.find((preset) => preset.id === id);
}

/**
 * Get all preset IDs and names for UI selection
 */
export function getPresetOptions() {
  return themePresets.map((preset) => ({
    id: preset.id,
    name: preset.name,
    description: preset.description,
  }));
}
