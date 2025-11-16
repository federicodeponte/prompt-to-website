// ABOUTME: Color validation utilities for theme editor
// ABOUTME: Validates hex, rgb, rgba, hsl, hsla color formats

/**
 * Validate if a string is a valid CSS color
 * Supports: hex, rgb, rgba, hsl, hsla, named colors
 */
export function isValidColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false;

  // Trim whitespace
  const trimmed = color.trim();

  // Hex colors (#RGB, #RRGGBB, #RRGGBBAA)
  const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
  if (hexRegex.test(trimmed)) return true;

  // RGB/RGBA colors
  const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/;
  if (rgbRegex.test(trimmed)) {
    const match = trimmed.match(rgbRegex);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return r <= 255 && g <= 255 && b <= 255;
    }
  }

  // HSL/HSLA colors
  const hslRegex = /^hsla?\(\s*(\d{1,3}(?:\.\d+)?)\s*,?\s*(\d{1,3}(?:\.\d+)?)%?\s*,?\s*(\d{1,3}(?:\.\d+)?)%?\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/;
  if (hslRegex.test(trimmed)) {
    const match = trimmed.match(hslRegex);
    if (match) {
      const h = parseFloat(match[1]);
      const s = parseFloat(match[2]);
      const l = parseFloat(match[3]);
      return h <= 360 && s <= 100 && l <= 100;
    }
  }

  // CSS named colors (limited set of most common)
  const namedColors = [
    'transparent', 'black', 'white', 'red', 'green', 'blue',
    'yellow', 'cyan', 'magenta', 'gray', 'grey', 'orange',
    'purple', 'pink', 'brown', 'lime', 'navy', 'teal',
  ];
  if (namedColors.includes(trimmed.toLowerCase())) return true;

  return false;
}

/**
 * Get error message for invalid color
 */
export function getColorError(color: string): string | null {
  if (!color || color.trim() === '') {
    return 'Color cannot be empty';
  }

  if (!isValidColor(color)) {
    return 'Invalid color format. Use hex (#3B82F6), rgb (rgb(59, 130, 246)), or hsl (hsl(217, 91%, 60%))';
  }

  return null;
}

/**
 * Normalize color to hex format (if possible)
 * Falls back to original if conversion not possible
 */
export function normalizeColor(color: string): string {
  const trimmed = color.trim();

  // Already hex - return as is
  if (/^#[A-Fa-f0-9]{6}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  // Try to convert to hex using browser's canvas API
  if (typeof window !== 'undefined') {
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      if (ctx) {
        ctx.fillStyle = trimmed;
        return ctx.fillStyle;
      }
    } catch {
      // Fall through to return original
    }
  }

  return trimmed;
}
