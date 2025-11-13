import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { WebsiteRenderer } from '../WebsiteRenderer';
import { WebsiteConfig } from '@/lib/types/website-config';

describe('WebsiteRenderer', () => {
  const mockTheme = {
    colors: {
      primary: '#0070f3',
      secondary: '#7928ca',
      background: '#ffffff',
      text: '#000000',
      muted: '#666666',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  };

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
    const renderer = container.querySelector('.website-renderer');

    const style = renderer?.style;
    expect(style?.getPropertyValue('--color-primary')).toBe('#0070f3');
    expect(style?.getPropertyValue('--color-secondary')).toBe('#7928ca');
    expect(style?.getPropertyValue('--color-background')).toBe('#ffffff');
    expect(style?.getPropertyValue('--color-text')).toBe('#000000');
    expect(style?.getPropertyValue('--color-muted')).toBe('#666666');
    expect(style?.getPropertyValue('--font-heading')).toBe('Inter');
    expect(style?.getPropertyValue('--font-body')).toBe('Inter');
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
    const renderer = container.querySelector('.website-renderer');

    const style = renderer?.style;
    expect(style?.getPropertyValue('--color-primary')).toBe('#ff0000');
    expect(style?.getPropertyValue('--color-secondary')).toBe('#00ff00');
    expect(style?.getPropertyValue('--color-background')).toBe('#000000');
    expect(style?.getPropertyValue('--font-heading')).toBe('Arial');
    expect(style?.getPropertyValue('--font-body')).toBe('Helvetica');
  });
});
