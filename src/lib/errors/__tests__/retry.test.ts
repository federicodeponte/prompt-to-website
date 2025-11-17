import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { retry, retryIf, retryNetwork, createCircuitBreaker } from '../retry';
import { NetworkError, AppError } from '../types';

describe('Retry Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('retry', () => {
    it('should succeed on first attempt', async () => {
      const fn = vi.fn().mockResolvedValue('success');

      const promise = retry(fn);
      const result = await promise;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on retryable error', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Failed'))
        .mockResolvedValue('success');

      const promise = retry(fn, { maxAttempts: 3, initialDelay: 100 });

      // Fast-forward through retry delay
      await vi.advanceTimersByTimeAsync(100);

      const result = await promise;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should not retry on non-retryable error', async () => {
      const nonRetryableError = new AppError(
        'Non-retryable',
        'TEST',
        'Message',
        false
      );
      const fn = vi.fn().mockRejectedValue(nonRetryableError);

      await expect(retry(fn, { maxAttempts: 3 })).rejects.toThrow(
        'Non-retryable'
      );

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should respect maxAttempts', async () => {
      const error = new NetworkError('Always fails');
      const fn = vi.fn().mockRejectedValue(error);

      const promise = retry(fn, {
        maxAttempts: 3,
        initialDelay: 10,
        useJitter: false,
      });

      // Fast-forward through all retry attempts
      await vi.advanceTimersByTimeAsync(10); // First retry
      await vi.advanceTimersByTimeAsync(20); // Second retry

      await expect(promise).rejects.toThrow('Always fails');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should use exponential backoff', async () => {
      const error = new NetworkError('Fails');
      const fn = vi.fn().mockRejectedValue(error);
      const onRetry = vi.fn();

      retry(fn, {
        maxAttempts: 4,
        initialDelay: 100,
        backoffMultiplier: 2,
        useJitter: false,
        onRetry,
      });

      // First retry after 100ms
      await vi.advanceTimersByTimeAsync(100);
      expect(onRetry).toHaveBeenNthCalledWith(1, error, 1, 100);

      // Second retry after 200ms
      await vi.advanceTimersByTimeAsync(200);
      expect(onRetry).toHaveBeenNthCalledWith(2, error, 2, 200);

      // Third retry after 400ms
      await vi.advanceTimersByTimeAsync(400);
      expect(onRetry).toHaveBeenNthCalledWith(3, error, 3, 400);
    });

    it('should cap delay at maxDelay', async () => {
      const error = new NetworkError('Fails');
      const fn = vi.fn().mockRejectedValue(error);
      const onRetry = vi.fn();

      retry(fn, {
        maxAttempts: 5,
        initialDelay: 1000,
        backoffMultiplier: 10,
        maxDelay: 2000,
        useJitter: false,
        onRetry,
      });

      // First retry: 1000ms
      await vi.advanceTimersByTimeAsync(1000);
      expect(onRetry).toHaveBeenNthCalledWith(1, error, 1, 1000);

      // Second retry: 10000ms but capped at 2000ms
      await vi.advanceTimersByTimeAsync(2000);
      expect(onRetry).toHaveBeenNthCalledWith(2, error, 2, 2000);
    });

    it('should call onRetry callback', async () => {
      const error = new NetworkError('Fails');
      const fn = vi.fn().mockRejectedValue(error);
      const onRetry = vi.fn();

      retry(fn, {
        maxAttempts: 2,
        initialDelay: 50,
        onRetry,
      });

      await vi.advanceTimersByTimeAsync(50);

      expect(onRetry).toHaveBeenCalledWith(
        error,
        1,
        expect.any(Number)
      );
    });
  });

  describe('retryIf', () => {
    it('should retry based on custom predicate', async () => {
      const error503 = new AppError('Service unavailable', 'API', '', false);
      const error404 = new AppError('Not found', 'API', '', false);

      const fn = vi
        .fn()
        .mockRejectedValueOnce(error503)
        .mockRejectedValueOnce(error404);

      const shouldRetry = (error: AppError) => error.message.includes('Service');

      const promise = retryIf(fn, shouldRetry, {
        maxAttempts: 3,
        initialDelay: 10,
      });

      await vi.advanceTimersByTimeAsync(10);

      await expect(promise).rejects.toThrow('Not found');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('retryNetwork', () => {
    it('should use higher max attempts for network operations', async () => {
      const error = new NetworkError('Network error');
      const fn = vi.fn().mockRejectedValue(error);

      const promise = retryNetwork(fn, {
        initialDelay: 10,
        useJitter: false,
      });

      // Should retry 5 times (default for retryNetwork)
      await vi.advanceTimersByTimeAsync(10);
      await vi.advanceTimersByTimeAsync(20);
      await vi.advanceTimersByTimeAsync(40);
      await vi.advanceTimersByTimeAsync(80);

      await expect(promise).rejects.toThrow('Network error');
      expect(fn).toHaveBeenCalledTimes(5);
    });
  });

  describe('Circuit Breaker', () => {
    it('should allow requests when closed', async () => {
      const breaker = createCircuitBreaker();
      const fn = vi.fn().mockResolvedValue('success');

      const result = await breaker.execute(fn);

      expect(result).toBe('success');
      expect(breaker.getState()).toBe('closed');
    });

    it('should open after failure threshold', async () => {
      const breaker = createCircuitBreaker({
        failureThreshold: 3,
      });
      const fn = vi.fn().mockRejectedValue(new Error('Fail'));

      // Fail 3 times to reach threshold
      await expect(breaker.execute(fn)).rejects.toThrow();
      await expect(breaker.execute(fn)).rejects.toThrow();
      await expect(breaker.execute(fn)).rejects.toThrow();

      expect(breaker.getState()).toBe('open');
    });

    it('should reject immediately when open', async () => {
      const breaker = createCircuitBreaker({
        failureThreshold: 1,
        resetTimeout: 1000,
      });
      const fn = vi.fn().mockRejectedValue(new Error('Fail'));

      // Open the circuit
      await expect(breaker.execute(fn)).rejects.toThrow();

      // Next call should fail immediately
      await expect(breaker.execute(fn)).rejects.toThrow('Circuit breaker');
      expect(fn).toHaveBeenCalledTimes(1); // Not called again
    });

    it('should transition to half-open after reset timeout', async () => {
      const breaker = createCircuitBreaker({
        failureThreshold: 1,
        resetTimeout: 1000,
      });
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValue('success');

      // Open the circuit
      await expect(breaker.execute(fn)).rejects.toThrow('Fail');
      expect(breaker.getState()).toBe('open');

      // Wait for reset timeout
      vi.advanceTimersByTime(1000);

      // Should now be half-open and allow one test request
      const result = await breaker.execute(fn);
      expect(result).toBe('success');
      expect(breaker.getState()).toBe('closed');
    });

    it('should go back to open if half-open attempt fails', async () => {
      const breaker = createCircuitBreaker({
        failureThreshold: 1,
        resetTimeout: 1000,
      });
      const fn = vi.fn().mockRejectedValue(new Error('Still failing'));

      // Open the circuit
      await expect(breaker.execute(fn)).rejects.toThrow();

      // Wait for reset timeout
      vi.advanceTimersByTime(1000);

      // Half-open attempt fails
      await expect(breaker.execute(fn)).rejects.toThrow();
      expect(breaker.getState()).toBe('open');
    });

    it('should call onOpen callback', async () => {
      const onOpen = vi.fn();
      const breaker = createCircuitBreaker({
        failureThreshold: 2,
        onOpen,
      });
      const fn = vi.fn().mockRejectedValue(new Error('Fail'));

      await expect(breaker.execute(fn)).rejects.toThrow();
      expect(onOpen).not.toHaveBeenCalled();

      await expect(breaker.execute(fn)).rejects.toThrow();
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onClose callback', async () => {
      const onClose = vi.fn();
      const breaker = createCircuitBreaker({
        failureThreshold: 1,
        resetTimeout: 1000,
        onClose,
      });
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValue('success');

      // Open circuit
      await expect(breaker.execute(fn)).rejects.toThrow();

      // Wait and succeed
      vi.advanceTimersByTime(1000);
      await breaker.execute(fn);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should reset circuit manually', () => {
      const breaker = createCircuitBreaker();
      const fn = vi.fn().mockRejectedValue(new Error('Fail'));

      // Open circuit (assume threshold is reached)
      breaker.execute(fn).catch(() => {});

      breaker.reset();
      expect(breaker.getState()).toBe('closed');
    });
  });
});
