// ABOUTME: Production-grade logging utility with environment awareness
// ABOUTME: Provides structured logging with levels, context, and development-only features

/**
 * Log Levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

/**
 * Log Context
 */
export interface LogContext {
  [key: string]: unknown;
}

/**
 * Logger Configuration
 */
interface LoggerConfig {
  minLevel: LogLevel;
  isDevelopment: boolean;
  enableColors: boolean;
  enableTimestamps: boolean;
}

/**
 * Default configuration based on environment
 */
function getDefaultConfig(): LoggerConfig {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    minLevel: isDev ? LogLevel.DEBUG : LogLevel.WARN,
    isDevelopment: isDev,
    enableColors: isDev,
    enableTimestamps: true,
  };
}

/**
 * Color codes for console output (development only)
 */
const COLORS = {
  DEBUG: '\x1b[36m', // Cyan
  INFO: '\x1b[34m',  // Blue
  WARN: '\x1b[33m',  // Yellow
  ERROR: '\x1b[31m', // Red
  RESET: '\x1b[0m',
};

/**
 * Logger class for structured, environment-aware logging
 *
 * Features:
 * - Log levels (DEBUG, INFO, WARN, ERROR)
 * - Automatic environment detection
 * - Structured context data
 * - Color-coded output in development
 * - Production-safe (strips debug logs)
 * - TypeScript type safety
 *
 * @example
 * ```typescript
 * const logger = new Logger('AIService');
 * logger.info('Generating website', { prompt: 'SaaS landing page' });
 * logger.error('Validation failed', error, { field: 'theme.colors.primary' });
 * ```
 */
export class Logger {
  private namespace: string;
  private config: LoggerConfig;

  constructor(namespace: string, config?: Partial<LoggerConfig>) {
    this.namespace = namespace;
    this.config = { ...getDefaultConfig(), ...config };
  }

  /**
   * Log at DEBUG level (development only)
   */
  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log at INFO level
   */
  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log at WARN level
   */
  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log at ERROR level
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: this.config.isDevelopment ? error.stack : undefined,
      } : error,
    };

    this.log(LogLevel.ERROR, message, errorContext);
  }

  /**
   * Core logging function
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    // Skip if below minimum level
    if (level < this.config.minLevel) {
      return;
    }

    const levelName = LogLevel[level];
    const timestamp = this.config.enableTimestamps
      ? new Date().toISOString()
      : null;

    // Format log entry
    const parts: string[] = [];

    // Timestamp
    if (timestamp) {
      parts.push(`[${timestamp}]`);
    }

    // Level
    if (this.config.enableColors && this.config.isDevelopment) {
      const color = COLORS[levelName as keyof typeof COLORS] || COLORS.RESET;
      parts.push(`${color}${levelName}${COLORS.RESET}`);
    } else {
      parts.push(levelName);
    }

    // Namespace
    parts.push(`[${this.namespace}]`);

    // Message
    parts.push(message);

    const logMessage = parts.join(' ');

    // Output based on level
    switch (level) {
      case LogLevel.DEBUG:
        if (this.config.isDevelopment) {
          console.debug(logMessage, context || '');
        }
        break;

      case LogLevel.INFO:
        console.log(logMessage, context || '');
        break;

      case LogLevel.WARN:
        console.warn(logMessage, context || '');
        break;

      case LogLevel.ERROR:
        console.error(logMessage, context || '');
        break;
    }
  }

  /**
   * Create a child logger with extended namespace
   */
  child(childNamespace: string): Logger {
    return new Logger(`${this.namespace}:${childNamespace}`, this.config);
  }

  /**
   * Performance timing utility
   */
  time(label: string): () => void {
    const start = performance.now();
    const timeLogger = this.child('perf');

    return () => {
      const duration = performance.now() - start;
      timeLogger.debug(`${label} took ${duration.toFixed(2)}ms`);
    };
  }
}

/**
 * Create a logger instance
 */
export function createLogger(namespace: string): Logger {
  return new Logger(namespace);
}

/**
 * Default logger instances for common use cases
 */
export const loggers = {
  api: createLogger('API'),
  ai: createLogger('AI'),
  storage: createLogger('Storage'),
  renderer: createLogger('Renderer'),
  validation: createLogger('Validation'),
  errors: createLogger('Errors'),
};

/**
 * Development-only assertion helper
 */
export function devAssert(condition: boolean, message: string): asserts condition {
  if (process.env.NODE_ENV === 'development' && !condition) {
    loggers.errors.error(`Assertion failed: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

/**
 * Development-only warning helper
 */
export function devWarn(condition: boolean, message: string): void {
  if (process.env.NODE_ENV === 'development' && !condition) {
    loggers.errors.warn(`Warning: ${message}`);
  }
}
