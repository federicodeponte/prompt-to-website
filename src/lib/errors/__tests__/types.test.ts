import { describe, it, expect } from 'vitest';
import {
  AppError,
  StorageError,
  StorageQuotaError,
  StorageUnavailableError,
  ValidationError,
  NetworkError,
  APIError,
  NotFoundError,
  ConfigError,
  isAppError,
  isRetryableError,
  getUserMessage,
  getErrorCode,
  toAppError,
} from '../types';

describe('Error Types', () => {
  describe('AppError', () => {
    it('should create error with all properties', () => {
      const error = new AppError(
        'Test error',
        'TEST_CODE',
        'User friendly message',
        true
      );

      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.userMessage).toBe('User friendly message');
      expect(error.isRetryable).toBe(true);
      expect(error.name).toBe('AppError');
    });

    it('should capture original error', () => {
      const originalError = new Error('Original');
      const error = new AppError(
        'Wrapped error',
        'WRAPPED',
        'User message',
        false,
        originalError
      );

      expect(error.originalError).toBe(originalError);
    });

    it('should have proper stack trace', () => {
      const error = new AppError('Test', 'TEST', 'Message');
      expect(error.stack).toBeDefined();
    });
  });

  describe('StorageError', () => {
    it('should create storage error', () => {
      const error = new StorageError('Storage failed');

      expect(error).toBeInstanceOf(StorageError);
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe('STORAGE_ERROR');
      expect(error.userMessage).toContain('storage');
      expect(error.isRetryable).toBe(false);
    });

    it('should be retryable if specified', () => {
      const error = new StorageError('Storage failed', undefined, true);
      expect(error.isRetryable).toBe(true);
    });
  });

  describe('StorageQuotaError', () => {
    it('should create quota error with specific message', () => {
      const error = new StorageQuotaError();

      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe('STORAGE_QUOTA_EXCEEDED');
      expect(error.userMessage).toContain('Storage limit');
      expect(error.isRetryable).toBe(false);
    });

    it('should wrap original error', () => {
      const original = new Error('Quota exceeded');
      const error = new StorageQuotaError(original);

      expect(error.originalError).toBe(original);
    });
  });

  describe('StorageUnavailableError', () => {
    it('should create unavailable error', () => {
      const error = new StorageUnavailableError();

      expect(error.code).toBe('STORAGE_UNAVAILABLE');
      expect(error.userMessage).toContain('not available');
      expect(error.isRetryable).toBe(false);
    });
  });

  describe('ValidationError', () => {
    it('should create validation error', () => {
      const error = new ValidationError('Invalid input', 'email');

      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.field).toBe('email');
      expect(error.userMessage).toBe('Invalid input');
      expect(error.isRetryable).toBe(false);
    });

    it('should work without field', () => {
      const error = new ValidationError('Invalid data');
      expect(error.field).toBeUndefined();
    });
  });

  describe('NetworkError', () => {
    it('should create network error', () => {
      const error = new NetworkError('Connection failed');

      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.userMessage).toContain('Network');
      expect(error.isRetryable).toBe(true);
    });
  });

  describe('APIError', () => {
    it('should create API error with status code', () => {
      const error = new APIError('API failed', 500);

      expect(error.code).toBe('API_ERROR');
      expect(error.statusCode).toBe(500);
      expect(error.isRetryable).toBe(true); // 500 is retryable
    });

    it('should not retry 4xx errors', () => {
      const error = new APIError('Bad request', 400);
      expect(error.isRetryable).toBe(false);
    });

    it('should have specific message for 429', () => {
      const error = new APIError('Too many requests', 429);
      expect(error.userMessage).toContain('Too many requests');
    });

    it('should work without status code', () => {
      const error = new APIError('Generic API error');
      expect(error.statusCode).toBeUndefined();
      expect(error.isRetryable).toBe(false);
    });
  });

  describe('NotFoundError', () => {
    it('should create not found error', () => {
      const error = new NotFoundError('Website', 'abc-123');

      expect(error.code).toBe('NOT_FOUND');
      expect(error.resourceType).toBe('Website');
      expect(error.resourceId).toBe('abc-123');
      expect(error.userMessage).toContain('Website not found');
      expect(error.isRetryable).toBe(false);
    });
  });

  describe('ConfigError', () => {
    it('should create config error', () => {
      const error = new ConfigError('Invalid config');

      expect(error.code).toBe('CONFIG_ERROR');
      expect(error.userMessage).toContain('Configuration');
      expect(error.isRetryable).toBe(false);
    });
  });

  describe('Type Guards', () => {
    describe('isAppError', () => {
      it('should return true for AppError instances', () => {
        const error = new AppError('Test', 'TEST', 'Message');
        expect(isAppError(error)).toBe(true);
      });

      it('should return true for subclass instances', () => {
        const error = new NetworkError('Test');
        expect(isAppError(error)).toBe(true);
      });

      it('should return false for regular Error', () => {
        const error = new Error('Test');
        expect(isAppError(error)).toBe(false);
      });

      it('should return false for non-errors', () => {
        expect(isAppError('string')).toBe(false);
        expect(isAppError(null)).toBe(false);
        expect(isAppError(undefined)).toBe(false);
        expect(isAppError({})).toBe(false);
      });
    });

    describe('isRetryableError', () => {
      it('should return true for retryable errors', () => {
        const error = new NetworkError('Test');
        expect(isRetryableError(error)).toBe(true);
      });

      it('should return false for non-retryable errors', () => {
        const error = new ValidationError('Test');
        expect(isRetryableError(error)).toBe(false);
      });

      it('should return false for non-AppErrors', () => {
        const error = new Error('Test');
        expect(isRetryableError(error)).toBe(false);
      });
    });
  });

  describe('Utility Functions', () => {
    describe('getUserMessage', () => {
      it('should return user message from AppError', () => {
        const error = new NetworkError('Technical message');
        const message = getUserMessage(error);
        expect(message).toContain('Network');
      });

      it('should return error message from regular Error', () => {
        const error = new Error('Error message');
        const message = getUserMessage(error);
        expect(message).toBe('Error message');
      });

      it('should return default message for unknown errors', () => {
        const message = getUserMessage('string error');
        expect(message).toContain('unexpected error');
      });

      it('should handle null and undefined', () => {
        expect(getUserMessage(null)).toContain('unexpected error');
        expect(getUserMessage(undefined)).toContain('unexpected error');
      });
    });

    describe('getErrorCode', () => {
      it('should return code from AppError', () => {
        const error = new NetworkError('Test');
        expect(getErrorCode(error)).toBe('NETWORK_ERROR');
      });

      it('should return UNKNOWN_ERROR for non-AppErrors', () => {
        const error = new Error('Test');
        expect(getErrorCode(error)).toBe('UNKNOWN_ERROR');
      });

      it('should return UNKNOWN_ERROR for unknown types', () => {
        expect(getErrorCode('string')).toBe('UNKNOWN_ERROR');
        expect(getErrorCode(null)).toBe('UNKNOWN_ERROR');
      });
    });

    describe('toAppError', () => {
      it('should return same error if already AppError', () => {
        const error = new NetworkError('Test');
        const result = toAppError(error);
        expect(result).toBe(error);
      });

      it('should convert QuotaExceededError to StorageQuotaError', () => {
        const error = new Error('QuotaExceededError: Storage quota exceeded');
        error.name = 'QuotaExceededError';
        const result = toAppError(error);

        expect(result).toBeInstanceOf(StorageQuotaError);
        expect(result.code).toBe('STORAGE_QUOTA_EXCEEDED');
      });

      it('should detect quota errors from message', () => {
        const error = new Error('Storage quota exceeded');
        const result = toAppError(error);

        expect(result).toBeInstanceOf(StorageQuotaError);
      });

      it('should detect storage errors from message', () => {
        const error = new Error('localStorage is not available');
        const result = toAppError(error);

        expect(result).toBeInstanceOf(StorageError);
      });

      it('should convert regular Error to AppError', () => {
        const error = new Error('Something went wrong');
        const result = toAppError(error);

        expect(result).toBeInstanceOf(AppError);
        expect(result.code).toBe('UNKNOWN_ERROR');
        expect(result.originalError).toBe(error);
      });

      it('should convert non-Error objects to AppError', () => {
        const result = toAppError('string error');

        expect(result).toBeInstanceOf(AppError);
        expect(result.message).toBe('string error');
        expect(result.code).toBe('UNKNOWN_ERROR');
      });

      it('should handle null and undefined', () => {
        const nullResult = toAppError(null);
        expect(nullResult).toBeInstanceOf(AppError);

        const undefinedResult = toAppError(undefined);
        expect(undefinedResult).toBeInstanceOf(AppError);
      });
    });
  });

  describe('Error Inheritance', () => {
    it('should maintain instanceof relationships', () => {
      const storage = new StorageError('Test');
      expect(storage).toBeInstanceOf(StorageError);
      expect(storage).toBeInstanceOf(AppError);
      expect(storage).toBeInstanceOf(Error);

      const quota = new StorageQuotaError();
      expect(quota).toBeInstanceOf(StorageQuotaError);
      expect(quota).toBeInstanceOf(AppError);
      expect(quota).toBeInstanceOf(Error);
    });

    it('should have correct error names', () => {
      expect(new AppError('', '', '').name).toBe('AppError');
      expect(new StorageError('').name).toBe('StorageError');
      expect(new NetworkError('').name).toBe('NetworkError');
      expect(new ValidationError('').name).toBe('ValidationError');
    });
  });
});
