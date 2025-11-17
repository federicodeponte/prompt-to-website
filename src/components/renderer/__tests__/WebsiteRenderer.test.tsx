import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { WebsiteRenderer } from '../WebsiteRenderer';
import { WebsiteConfig } from '@/lib/types/website-config';
import { defaultTheme } from '@/lib/theme/defaults';

describe('WebsiteRenderer', () => {
  const mockTheme = defaultTheme;

  const mockMetadata = {
    title: 'Test Website',
    description: 'A test website',
  };

  it('should render without blocks', () => {
    const config: WebsiteConfig = {
      version: '1.0',
      template: 'custom',
      theme: mockTheme,
      blocks: [],
      metadata: mockMetadata,
    };

    const { container } = render(<WebsiteRenderer config={config} />);
    const renderer = container.querySelector('.website-renderer');

    expect(renderer).toBeInTheDocument();
    expect(renderer?.tagName).toBe('DIV');
  });

  it('should apply theme CSS custom properties correctly', () => {
    const config: WebsiteConfig = {
      version: '1.0',
      template: 'custom',
      theme: mockTheme,
      blocks: [],
      metadata: mockMetadata,
    };

    const { container } = render(<WebsiteRenderer config={config} />);
    const renderer = container.querySelector('.website-renderer') as HTMLElement;

    const style = renderer?.style;
    expect(style?.getPropertyValue('--color-primary')).toBe(defaultTheme.colors.primary);
    expect(style?.getPropertyValue('--color-secondary')).toBe(defaultTheme.colors.secondary);
    expect(style?.getPropertyValue('--color-background')).toBe(defaultTheme.colors.background);
    expect(style?.getPropertyValue('--color-text')).toBe(defaultTheme.colors.text);
    expect(style?.getPropertyValue('--color-muted')).toBe(defaultTheme.colors.muted);
    expect(style?.getPropertyValue('--font-heading')).toBe(defaultTheme.fonts.heading);
    expect(style?.getPropertyValue('--font-body')).toBe(defaultTheme.fonts.body);
  });

  it('should have min-h-screen class for full height', () => {
    const config: WebsiteConfig = {
      version: '1.0',
      template: 'custom',
      theme: mockTheme,
      blocks: [],
      metadata: mockMetadata,
    };

    const { container } = render(<WebsiteRenderer config={config} />);
    const renderer = container.querySelector('.website-renderer');

    expect(renderer?.classList.contains('min-h-screen')).toBe(true);
  });

  it('should render main element', () => {
    const config: WebsiteConfig = {
      version: '1.0',
      template: 'custom',
      theme: mockTheme,
      blocks: [],
      metadata: mockMetadata,
    };

    const { container } = render(<WebsiteRenderer config={config} />);
    const main = container.querySelector('main');

    expect(main).toBeInTheDocument();
  });

  it('should handle undefined blocks gracefully', () => {
    const config: WebsiteConfig = {
      version: '1.0',
      template: 'custom',
      theme: mockTheme,
      // @ts-expect-error - Testing edge case
      blocks: undefined,
      metadata: mockMetadata,
    };

    const { container } = render(<WebsiteRenderer config={config} />);
    const renderer = container.querySelector('.website-renderer');

    // Should still render without crashing
    expect(renderer).toBeInTheDocument();
  });

  it('should apply different theme colors', () => {
    const customTheme = {
      colors: {
        primary: '#ff0000',
        secondary: '#00ff00',
        background: '#000000',
        text: '#ffffff',
        muted: '#cccccc',
      },
      fonts: {
        heading: 'Arial',
        body: 'Helvetica',
      },
    };

    const config: WebsiteConfig = {
      version: '1.0',
      template: 'custom',
      theme: customTheme,
      blocks: [],
      metadata: mockMetadata,
    };

    const { container } = render(<WebsiteRenderer config={config} />);
    const renderer = container.querySelector('.website-renderer') as HTMLElement;

    const style = renderer?.style;
    expect(style?.getPropertyValue('--color-primary')).toBe('#ff0000');
    expect(style?.getPropertyValue('--color-secondary')).toBe('#00ff00');
    expect(style?.getPropertyValue('--color-background')).toBe('#000000');
    expect(style?.getPropertyValue('--font-heading')).toBe('Arial');
    expect(style?.getPropertyValue('--font-body')).toBe('Helvetica');
  });
});
