// ABOUTME: Error handler utility with helpful messages and recovery suggestions
// ABOUTME: Provides actionable error messages for common failure scenarios

import { loggers } from './logger';
import { APIErrorResponse } from '../types/api-responses';

/**
 * Error Recovery Suggestion
 */
export interface ErrorRecoverySuggestion {
  message: string;
  suggestion: string;
  action?: () => void;
  actionLabel?: string;
}

/**
 * Error Categories
 */
export enum ErrorCategory {
  VALIDATION = 'validation',
  AI_GENERATION = 'ai_generation',
  NETWORK = 'network',
  STORAGE = 'storage',
  PARSING = 'parsing',
  AUTHENTICATION = 'authentication',
  UNKNOWN = 'unknown',
}

/**
 * Enhanced Error with recovery suggestions
 */
export class RecoverableError extends Error {
  category: ErrorCategory;
  suggestions: string[];
  action?: () => void;
  actionLabel?: string;
  originalError?: Error;

  constructor(
    message: string,
    category: ErrorCategory,
    suggestions: string[],
    options?: {
      action?: () => void;
      actionLabel?: string;
      originalError?: Error;
    }
  ) {
    super(message);
    this.name = 'RecoverableError';
    this.category = category;
    this.suggestions = suggestions;
    this.action = options?.action;
    this.actionLabel = options?.actionLabel;
    this.originalError = options?.originalError;
  }
}

/**
 * Centralized error messages with actionable suggestions
 * SINGLE SOURCE OF TRUTH for all API error responses
 */
export const ERROR_MESSAGES = {
  // Validation errors - Missing inputs
  MISSING_PROMPT: {
    error: 'Validation Error',
    message: 'Missing or invalid prompt',
    suggestions: [
      'Provide a description of the website you want to create',
      'Example: "Create a SaaS landing page for a project management tool"',
      'Be specific about the content and style you want',
    ],
  },
  MISSING_CONFIG: {
    error: 'Validation Error',
    message: 'Missing or invalid website configuration',
    suggestions: [
      'Ensure you have a valid website configuration',
      'Try generating a new website first',
      'Reload the page and try again',
    ],
  },
  MISSING_INSTRUCTION: {
    error: 'Validation Error',
    message: 'Missing or invalid instruction',
    suggestions: [
      'Provide a clear instruction for what to change',
      'Example: "Make the hero section blue"',
      'Example: "Add a pricing table with 3 tiers"',
      'Be specific about what you want to modify',
    ],
  },

  // Configuration errors
  MISSING_API_KEY: {
    error: 'Configuration Error',
    message: 'Gemini API key not configured',
    suggestions: [
      'Add GEMINI_API_KEY to your .env.local file',
      'Get a free API key from https://aistudio.google.com/app/apikey',
      'Restart the development server after adding the key',
      'Contact support if the issue persists',
    ],
  },

  // AI generation errors
  AI_PARSING_FAILED: {
    error: 'AI Generation Error',
    message: 'Failed to parse AI response',
    suggestions: [
      'The AI returned malformed JSON - try again',
      'Simplify your request if it was very complex',
      'Try rephrasing your instructions',
      'Contact support if this persists',
    ],
  },
  AI_VALIDATION_FAILED: {
    error: 'AI Validation Error',
    message: 'AI generated invalid configuration',
    suggestions: [
      'The AI output didn\'t match the required structure',
      'Try using simpler, more specific instructions',
      'Break complex requests into smaller steps',
      'Contact support if this happens repeatedly',
    ],
  },
} as const satisfies Record<string, APIErrorResponse>;

/**
 * Get error message by code (type-safe)
 */
export function getErrorMessage(code: keyof typeof ERROR_MESSAGES): APIErrorResponse {
  return ERROR_MESSAGES[code];
}

/**
 * Analyzes error and provides helpful suggestions
 */
export function analyzeError(error: unknown): ErrorRecoverySuggestion {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      message: 'Network connection failed',
      suggestion: 'Check your internet connection and try again. If the problem persists, the server may be down.',
    };
  }

  if (error instanceof Error && error.message.includes('Failed to fetch')) {
    return {
      message: 'Could not reach the server',
      suggestion: 'Verify your internet connection. If you\'re offline, save your work and try again when online.',
    };
  }

  // API errors
  if (error instanceof Error && error.message.includes('API key')) {
    return {
      message: 'API configuration error',
      suggestion: 'The Gemini API key is missing or invalid. Contact support or check your environment variables.',
    };
  }

  // Validation errors
  if (error instanceof Error && error.message.includes('Validation failed')) {
    return {
      message: 'Invalid website configuration',
      suggestion: 'The AI generated an invalid configuration. Try rephrasing your request or using simpler instructions.',
    };
  }

  if (error instanceof Error && error.message.includes('hex color')) {
    return {
      message: 'Invalid color format',
      suggestion: 'Colors must be in hexadecimal format (e.g., #FF0000). Use a color picker or specify standard color names.',
    };
  }

  // JSON parsing errors
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    return {
      message: 'Failed to parse AI response',
      suggestion: 'The AI returned malformed data. Try your request again or simplify your instructions.',
    };
  }

  // AI generation errors
  if (error instanceof Error && error.message.includes('AI generated invalid')) {
    return {
      message: 'AI generation produced invalid output',
      suggestion: 'Try rephrasing your request with more specific instructions. Avoid ambiguous or complex requirements.',
    };
  }

  // Storage errors
  if (error instanceof Error && (error.message.includes('storage') || error.message.includes('database'))) {
    return {
      message: 'Failed to save changes',
      suggestion: 'Check your browser storage settings. Try clearing cache or using a different browser if the issue persists.',
    };
  }

  // Authentication errors
  if (error instanceof Error && error.message.includes('auth')) {
    return {
      message: 'Authentication failed',
      suggestion: 'Your session may have expired. Try refreshing the page or logging in again.',
    };
  }

  // Generic error
  return {
    message: 'An unexpected error occurred',
    suggestion: error instanceof Error ? error.message : 'Please try again. If the problem persists, contact support.',
  };
}

/**
 * Get detailed error information for developers
 */
export function getErrorDetails(error: unknown): {
  name: string;
  message: string;
  stack?: string;
  details?: unknown;
} {
  if (error instanceof RecoverableError) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      details: {
        category: error.category,
        suggestions: error.suggestions,
        originalError: error.originalError ? {
          name: error.originalError.name,
          message: error.originalError.message,
        } : undefined,
      },
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  return {
    name: 'Unknown Error',
    message: String(error),
  };
}

/**
 * Log error with context and suggestions
 */
export function logError(
  error: unknown,
  context?: {
    component?: string;
    action?: string;
    metadata?: Record<string, unknown>;
  }
) {
  const errorDetails = getErrorDetails(error);
  const recovery = analyzeError(error);

  loggers.errors.error(
    `${context?.component || 'Unknown'}: ${context?.action || 'Error'}`,
    error,
    {
      ...context?.metadata,
      errorName: errorDetails.name,
      errorMessage: errorDetails.message,
      recoverySuggestion: recovery.suggestion,
    }
  );
}

/**
 * Common error handlers for specific scenarios
 */
export const errorHandlers = {
  /**
   * Handle AI generation errors
   */
  aiGeneration: (error: unknown, context?: { prompt?: string; instruction?: string }) => {
    const recovery = analyzeError(error);

    logError(error, {
      component: 'AI Generation',
      action: context?.prompt ? 'Generate' : 'Edit',
      metadata: {
        promptLength: context?.prompt?.length,
        instructionLength: context?.instruction?.length,
      },
    });

    return new RecoverableError(
      recovery.message,
      ErrorCategory.AI_GENERATION,
      [
        recovery.suggestion,
        'Try using simpler, more specific instructions',
        'Break complex requests into smaller steps',
        'Check the AI response in the Debug Panel (development mode)',
      ],
      { originalError: error instanceof Error ? error : undefined }
    );
  },

  /**
   * Handle validation errors
   */
  validation: (error: unknown, context?: { field?: string; value?: unknown }) => {
    const recovery = analyzeError(error);

    logError(error, {
      component: 'Validation',
      action: 'Validate',
      metadata: {
        field: context?.field,
        valueType: typeof context?.value,
      },
    });

    return new RecoverableError(
      recovery.message,
      ErrorCategory.VALIDATION,
      [
        recovery.suggestion,
        context?.field ? `Check the "${context.field}" field for valid input` : 'Review all form fields',
        'Refer to the validation error details for specific issues',
      ],
      { originalError: error instanceof Error ? error : undefined }
    );
  },

  /**
   * Handle network errors
   */
  network: (error: unknown, context?: { endpoint?: string; method?: string }) => {
    const recovery = analyzeError(error);

    logError(error, {
      component: 'Network',
      action: `${context?.method || 'Request'} ${context?.endpoint || ''}`,
    });

    return new RecoverableError(
      recovery.message,
      ErrorCategory.NETWORK,
      [
        recovery.suggestion,
        'Retry your last action',
        'Check browser console for more details',
        'Save your work locally before retrying',
      ],
      { originalError: error instanceof Error ? error : undefined }
    );
  },

  /**
   * Handle storage errors
   */
  storage: (error: unknown, context?: { operation?: string; key?: string }) => {
    const recovery = analyzeError(error);

    logError(error, {
      component: 'Storage',
      action: context?.operation || 'Access',
      metadata: { key: context?.key },
    });

    return new RecoverableError(
      recovery.message,
      ErrorCategory.STORAGE,
      [
        recovery.suggestion,
        'Export your website configuration as backup',
        'Check browser storage quotas',
        'Clear browser cache and reload',
      ],
      { originalError: error instanceof Error ? error : undefined }
    );
  },
};

/**
 * Format error for user display
 */
export function formatErrorForUser(error: unknown): {
  title: string;
  message: string;
  suggestions: string[];
} {
  if (error instanceof RecoverableError) {
    return {
      title: error.category.charAt(0).toUpperCase() + error.category.slice(1).replace('_', ' ') + ' Error',
      message: error.message,
      suggestions: error.suggestions,
    };
  }

  const recovery = analyzeError(error);
  return {
    title: 'Error',
    message: recovery.message,
    suggestions: [recovery.suggestion],
  };
}
