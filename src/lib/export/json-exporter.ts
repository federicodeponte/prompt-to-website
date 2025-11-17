// ABOUTME: Exports WebsiteConfig to JSON file for backup/restore
// ABOUTME: Provides import/export functionality for configuration persistence

import { WebsiteConfig } from '../types/website-config';

/**
 * Export a WebsiteConfig to JSON string
 * Includes pretty-printing for readability
 */
export function exportToJSON(config: WebsiteConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Download WebsiteConfig as JSON file in the browser
 */
export function downloadJSON(
  config: WebsiteConfig,
  filename: string = 'website-config.json'
): void {
  const json = exportToJSON(config);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Parse and validate JSON config from file upload
 */
export function importFromJSON(jsonString: string): WebsiteConfig {
  try {
    const config = JSON.parse(jsonString);

    // Basic validation
    if (!config.version || !config.template || !config.theme || !config.blocks) {
      throw new Error('Invalid WebsiteConfig format');
    }

    return config as WebsiteConfig;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format');
    }
    throw error;
  }
}
