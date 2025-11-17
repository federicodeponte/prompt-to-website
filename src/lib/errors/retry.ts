// ABOUTME: Retry utility with exponential backoff for resilient operations
// ABOUTME: Implements production-grade retry logic with jitter and circuit breaker pattern

import { isRetryableError, toAppError, type AppError } from './types';

export interface RetryOptions {
  /**
   * Maximum number of retry attempts
   * @default 3
   */
  maxAttempts?: number;

  /**
   * Initial delay in milliseconds
   * @default 1000
   */
  initialDelay?: number;

  /**
   * Maximum delay in milliseconds
   * @default 10000
   */
  maxDelay?: number;

  /**
   * Exponential backoff multiplier
   * @default 2
   */
  backoffMultiplier?: number;

  /**
   * Add random jitter to prevent thundering herd
   * @default true
   */
  useJitter?: boolean;

  /**
   * Custom function to determine if error is retryable
   * If not provided, uses isRetryableError() from error types
   */
  shouldRetry?: (error: AppError, attempt: number) => boolean;

  /**
   * Callback called before each retry attempt
   */
  onRetry?: (error: AppError, attempt: number, delay: number) => void;
}

/**
 * Default retry options
 */
const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  useJitter: true,
  shouldRetry: (error) => isRetryableError(error),
  onRetry: () => {},
};

/**
 * Calculate delay with exponential backoff and optional jitter
 */
function calculateDelay(
  attempt: number,
  initialDelay: number,
  backoffMultiplier: number,
  maxDelay: number,
  useJitter: boolean
): number {
  // Exponential backoff: delay * (multiplier ^ attempt)
  const exponentialDelay = initialDelay * Math.pow(backoffMultiplier, attempt);

  // Cap at max delay
  let delay = Math.min(exponentialDelay, maxDelay);

  // Add jitter: random value between 0 and delay
  if (useJitter) {
    delay = Math.random() * delay;
  }

  return Math.floor(delay);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async operation with exponential backoff
 *
 * @example
 * ```typescript
 * const data = await retry(
 *   () => fetchData(),
 *   {
 *     maxAttempts: 5,
 *     initialDelay: 500,
 *     onRetry: (error, attempt) => {
 *       console.log(`Retry attempt ${attempt}: ${error.message}`);
 *     }
 *   }
 * );
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: AppError | null = null;

  for (let attempt = 0; attempt < opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = toAppError(error);

      // If last attempt or error is not retryable, throw immediately
      const isLastAttempt = attempt === opts.maxAttempts - 1;
      const shouldRetryError = opts.shouldRetry(lastError, attempt);

      if (isLastAttempt || !shouldRetryError) {
        throw lastError;
      }

      // Calculate delay for next attempt
      const delay = calculateDelay(
        attempt,
        opts.initialDelay,
        opts.backoffMultiplier,
        opts.maxDelay,
        opts.useJitter
      );

      // Call onRetry callback
      opts.onRetry(lastError, attempt + 1, delay);

      // Wait before retrying
      await sleep(delay);
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError || new Error('Retry failed without error');
}

/**
 * Retry with custom predicate
 *
 * @example
 * ```typescript
 * const data = await retryIf(
 *   () => fetchData(),
 *   (error) => error.statusCode === 503, // Retry only on 503
 *   { maxAttempts: 5 }
 * );
 * ```
 */
export async function retryIf<T>(
  fn: () => Promise<T>,
  shouldRetry: (error: AppError) => boolean,
  options: Omit<RetryOptions, 'shouldRetry'> = {}
): Promise<T> {
  return retry(fn, {
    ...options,
    shouldRetry: (error) => shouldRetry(error),
  });
}

/**
 * Retry network operations specifically
 * Uses higher max attempts and longer delays
 */
export async function retryNetwork<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  return retry(fn, {
    maxAttempts: 5,
    initialDelay: 2000,
    maxDelay: 30000,
    ...options,
  });
}

/**
 * Circuit breaker state
 */
interface CircuitBreakerState {
  failureCount: number;
  lastFailureTime: number;
  state: 'closed' | 'open' | 'half-open';
}

/**
 * Circuit breaker options
 */
export interface CircuitBreakerOptions {
  /**
   * Number of failures before opening circuit
   * @default 5
   */
  failureThreshold?: number;

  /**
   * Time in milliseconds to wait before attempting to close circuit
   * @default 60000 (1 minute)
   */
  resetTimeout?: number;

  /**
   * Callback when circuit opens
   */
  onOpen?: () => void;

  /**
   * Callback when circuit closes
   */
  onClose?: () => void;
}

/**
 * Circuit breaker pattern implementation
 * Prevents cascading failures by failing fast when service is down
 *
 * @example
 * ```typescript
 * const breaker = createCircuitBreaker({
 *   failureThreshold: 3,
 *   resetTimeout: 30000
 * });
 *
 * const data = await breaker(() => fetchData());
 * ```
 */
export function createCircuitBreaker(options: CircuitBreakerOptions = {}) {
  const {
    failureThreshold = 5,
    resetTimeout = 60000,
    onOpen = () => {},
    onClose = () => {},
  } = options;

  const state: CircuitBreakerState = {
    failureCount: 0,
    lastFailureTime: 0,
    state: 'closed',
  };

  async function execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit should transition from open to half-open
    if (state.state === 'open') {
      const timeSinceLastFailure = Date.now() - state.lastFailureTime;
      if (timeSinceLastFailure >= resetTimeout) {
        state.state = 'half-open';
      } else {
        throw toAppError(new Error('Circuit breaker is open'));
      }
    }

    try {
      const result = await fn();

      // Success: reset circuit if it was half-open
      if (state.state === 'half-open') {
        state.state = 'closed';
        state.failureCount = 0;
        onClose();
      }

      return result;
    } catch (error) {
      state.failureCount++;
      state.lastFailureTime = Date.now();

      // Open circuit if threshold reached
      if (state.state === 'closed' && state.failureCount >= failureThreshold) {
        state.state = 'open';
        onOpen();
      }

      // Go back to open if half-open attempt failed
      if (state.state === 'half-open') {
        state.state = 'open';
      }

      throw toAppError(error);
    }
  }

  return {
    execute,
    getState: () => state.state,
    reset: () => {
      state.failureCount = 0;
      state.state = 'closed';
    },
  };
}
