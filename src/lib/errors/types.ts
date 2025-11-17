// ABOUTME: Custom error types for the application
// ABOUTME: Provides specific error classes for better error handling and user feedback

/**
 * Base application error
 * All custom errors extend this class
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly userMessage: string;
  public readonly isRetryable: boolean;
  public readonly originalError?: Error;

  constructor(
    message: string,
    code: string,
    userMessage: string,
    isRetryable = false,
    originalError?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.userMessage = userMessage;
    this.isRetryable = isRetryable;
    this.originalError = originalError;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Storage-related errors (localStorage, IndexedDB, etc.)
 */
export class StorageError extends AppError {
  constructor(message: string, originalError?: Error, isRetryable = false) {
    super(
      message,
      'STORAGE_ERROR',
      'Unable to save your data. Please check your browser storage settings.',
      isRetryable,
      originalError
    );
  }
}

/**
 * Storage quota exceeded
 */
export class StorageQuotaError extends AppError {
  constructor(originalError?: Error) {
    super(
      'Storage quota exceeded',
      'STORAGE_QUOTA_EXCEEDED',
      'Storage limit reached. Please delete some websites to free up space.',
      false,
      originalError
    );
  }
}

/**
 * Storage not available (private browsing, etc.)
 */
export class StorageUnavailableError extends AppError {
  constructor(originalError?: Error) {
    super(
      'Storage is not available',
      'STORAGE_UNAVAILABLE',
      'Browser storage is not available. Please disable private browsing mode or check your browser settings.',
      false,
      originalError
    );
  }
}

/**
 * Validation errors
 */
export class ValidationError extends AppError {
  public readonly field?: string;

  constructor(message: string, field?: string, originalError?: Error) {
    super(
      message,
      'VALIDATION_ERROR',
      message, // Validation errors are already user-friendly
      false,
      originalError
    );
    this.field = field;
  }
}

/**
 * Network-related errors
 */
export class NetworkError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(
      message,
      'NETWORK_ERROR',
      'Network connection failed. Please check your internet connection and try again.',
      true, // Network errors are retryable
      originalError
    );
  }
}

/**
 * API errors
 */
export class APIError extends AppError {
  public readonly statusCode?: number;

  constructor(message: string, statusCode?: number, originalError?: Error) {
    const isRetryable = statusCode ? statusCode >= 500 : false;
    super(
      message,
      'API_ERROR',
      statusCode === 429
        ? 'Too many requests. Please wait a moment and try again.'
        : statusCode && statusCode >= 500
        ? 'Server error. Please try again in a moment.'
        : 'Request failed. Please try again.',
      isRetryable,
      originalError
    );
    this.statusCode = statusCode;
  }
}

/**
 * Not found errors
 */
export class NotFoundError extends AppError {
  public readonly resourceType: string;
  public readonly resourceId: string;

  constructor(resourceType: string, resourceId: string) {
    super(
      `${resourceType} not found: ${resourceId}`,
      'NOT_FOUND',
      `${resourceType} not found. It may have been deleted.`,
      false
    );
    this.resourceType = resourceType;
    this.resourceId = resourceId;
  }
}

/**
 * Configuration errors
 */
export class ConfigError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(
      message,
      'CONFIG_ERROR',
      'Configuration error. Please refresh the page.',
      false,
      originalError
    );
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Type guard to check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  return isAppError(error) && error.isRetryable;
}

/**
 * Get user-friendly error message from any error
 */
export function getUserMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.userMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Get error code from any error
 */
export function getErrorCode(error: unknown): string {
  if (isAppError(error)) {
    return error.code;
  }

  return 'UNKNOWN_ERROR';
}

/**
 * Convert unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    // Check for specific error types
    if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
      return new StorageQuotaError(error);
    }

    if (error.message.includes('storage') || error.message.includes('localStorage')) {
      return new StorageError(error.message, error);
    }

    // Generic error
    return new AppError(
      error.message,
      'UNKNOWN_ERROR',
      'An unexpected error occurred. Please try again.',
      false,
      error
    );
  }

  // Non-Error object
  return new AppError(
    String(error),
    'UNKNOWN_ERROR',
    'An unexpected error occurred. Please try again.',
    false
  );
}
