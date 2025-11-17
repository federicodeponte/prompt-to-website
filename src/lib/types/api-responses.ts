// ABOUTME: Typed API response interfaces for type-safe error handling
// ABOUTME: Ensures all API error data (suggestions, details) is preserved and accessible

import { WebsiteConfig } from './website-config';

/**
 * Success response from AI generation endpoint
 */
export interface GenerateSuccessResponse {
  config: WebsiteConfig;
}

/**
 * Success response from AI edit endpoint
 */
export interface EditSuccessResponse {
  config: WebsiteConfig;
}

/**
 * Enhanced error response with recovery suggestions
 * Returned by /api/generate and /api/edit when errors occur
 */
export interface APIErrorResponse {
  error: string; // Error title (e.g., "AI Generation Error")
  message: string; // Human-readable error message
  suggestions: string[]; // Array of actionable recovery suggestions
  details?: string; // Technical details (development only)
  issues?: Array<{
    // Validation errors (if applicable)
    path: string;
    message: string;
  }>;
}

/**
 * Type guard to check if response is an error
 */
export function isAPIErrorResponse(response: unknown): response is APIErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    'message' in response &&
    'suggestions' in response &&
    Array.isArray((response as APIErrorResponse).suggestions)
  );
}

/**
 * Enhanced error class that preserves API error details
 */
export class APIError extends Error {
  title: string;
  suggestions: string[];
  details?: string;
  issues?: Array<{
    path: string;
    message: string;
  }>;

  constructor(response: APIErrorResponse) {
    // Use message for Error.message (standard error handling)
    super(response.message);
    this.name = 'APIError';
    this.title = response.error;
    this.suggestions = response.suggestions;
    this.details = response.details;
    this.issues = response.issues;
  }

  /**
   * Format error for display
   */
  format(): string {
    let formatted = `${this.title}: ${this.message}`;

    if (this.suggestions.length > 0) {
      formatted += '\n\nSuggestions:\n' + this.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n');
    }

    if (this.details && process.env.NODE_ENV === 'development') {
      formatted += `\n\nDetails: ${this.details}`;
    }

    return formatted;
  }
}
