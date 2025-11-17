// ABOUTME: Export utilities for website configurations
// ABOUTME: Handles JSON, HTML, shareable links, and clipboard operations

import { WebsiteConfig, Website } from '@/lib/types/website-config';

/**
 * Export website config as JSON file
 */
export function exportAsJSON(website: Website): void {
  const dataStr = JSON.stringify(website.config, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  const exportFileDefaultName = `${website.label.toLowerCase().replace(/\s+/g, '-')}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

/**
 * Generate shareable preview link with encoded config
 */
export function generateShareableLink(config: WebsiteConfig): string {
  const encodedConfig = btoa(JSON.stringify(config));
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/preview?config=${encodedConfig}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-HTTPS
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Export config as formatted HTML string (basic static HTML)
 */
export function exportAsHTML(config: WebsiteConfig): string {
  const { theme, blocks, metadata } = config;

  // Generate CSS from theme
  const css = `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-background: ${theme.colors.background};
      --color-text: ${theme.colors.text};
      --color-muted: ${theme.colors.muted};
      --font-heading: ${theme.fonts.heading}, sans-serif;
      --font-body: ${theme.fonts.body}, sans-serif;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-body);
      color: var(--color-text);
      background: var(--color-background);
      line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      font-weight: 700;
      line-height: 1.2;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .section {
      padding: 4rem 0;
    }

    .hero {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      color: white;
      padding: 6rem 0;
      text-align: center;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: white;
      color: var(--color-primary);
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-card {
      padding: 2rem;
      border: 1px solid var(--color-muted);
      border-radius: 0.5rem;
    }

    .feature-card h3 {
      margin-bottom: 0.5rem;
      color: var(--color-primary);
    }

    footer {
      background: var(--color-muted);
      padding: 2rem 0;
      text-align: center;
      margin-top: 4rem;
    }
  `;

  // Generate HTML for blocks
  const blocksHTML = blocks
    .map((block) => {
      if (block.type === 'hero' && 'heading' in block.content) {
        const content = block.content as { heading?: string; subheading?: string; ctaPrimary?: { text: string; href: string } };
        return `
          <section class="hero">
            <div class="container">
              <h1>${content.heading || 'Welcome'}</h1>
              <p>${content.subheading || 'Build amazing websites with AI'}</p>
              ${content.ctaPrimary ? `<a href="${content.ctaPrimary.href}" class="btn">${content.ctaPrimary.text}</a>` : ''}
            </div>
          </section>
        `;
      }

      if (block.type === 'features' && 'items' in block.content) {
        const content = block.content as { heading?: string; items?: Array<{ title: string; description: string }> };
        return `
          <section class="section">
            <div class="container">
              ${content.heading ? `<h2 style="text-align: center; margin-bottom: 3rem;">${content.heading}</h2>` : ''}
              <div class="features">
                ${(content.items || []).map((item) => `
                  <div class="feature-card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;
      }

      if (block.type === 'footer') {
        return `
          <footer>
            <div class="container">
              <p>&copy; ${new Date().getFullYear()} ${metadata.title}. All rights reserved.</p>
            </div>
          </footer>
        `;
      }

      return ''; // Skip other block types for basic export
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metadata.description}">
  <title>${metadata.title}</title>
  <style>${css}</style>
</head>
<body>
  ${blocksHTML}
</body>
</html>`;
}

/**
 * Download HTML file
 */
export function downloadHTML(website: Website): void {
  const html = exportAsHTML(website.config);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const filename = `${website.label.toLowerCase().replace(/\s+/g, '-')}.html`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Generate QR code data URL for shareable link
 */
export function generateQRCodeURL(text: string): string {
  // Using QR Server API (free, no registration required)
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
}

/**
 * Export format options
 */
export const EXPORT_FORMATS = {
  JSON: {
    id: 'json',
    label: 'JSON Configuration',
    description: 'Download the raw configuration file',
    icon: 'FileJson',
  },
  HTML: {
    id: 'html',
    label: 'Static HTML',
    description: 'Basic HTML page with inline CSS',
    icon: 'Code',
  },
  SHARE: {
    id: 'share',
    label: 'Shareable Link',
    description: 'Generate a preview link to share',
    icon: 'Share2',
  },
  QR: {
    id: 'qr',
    label: 'QR Code',
    description: 'QR code for mobile preview',
    icon: 'QrCode',
  },
} as const;

export type ExportFormat = keyof typeof EXPORT_FORMATS;
