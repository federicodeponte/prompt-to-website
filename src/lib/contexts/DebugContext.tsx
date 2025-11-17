// ABOUTME: Debug Context for tracking AI interactions and validation errors
// ABOUTME: Provides centralized debug data to DebugPanel component (development only)

'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { WebsiteConfig } from '@/lib/types/website-config';

/**
 * AI Request Data
 */
export interface AIRequestData {
  prompt?: string;
  instruction?: string;
  config?: WebsiteConfig;
  model: string;
  temperature: number;
  timestamp: Date;
}

/**
 * AI Response Data
 */
export interface AIResponseData {
  rawResponse?: string;
  parsedData?: WebsiteConfig;
  validationPassed: boolean;
  timestamp: Date;
  error?: {
    title: string;
    message: string;
    suggestions: string[];
  };
}

/**
 * Performance Metrics
 */
export interface PerformanceMetrics {
  aiRequestDuration: number;
  validationDuration?: number;
  totalDuration: number;
}

/**
 * Validation Error
 */
export interface ValidationError {
  path: string;
  message: string;
}

/**
 * Debug State
 */
interface DebugState {
  // Latest AI request data
  latestRequest: AIRequestData | null;
  // Latest AI response data
  latestResponse: AIResponseData | null;
  // Latest performance metrics
  latestMetrics: PerformanceMetrics | null;
  // Current validation errors
  validationErrors: ValidationError[];
}

/**
 * Debug Context Value
 */
interface DebugContextValue extends DebugState {
  // Log AI request
  logRequest: (data: AIRequestData) => void;
  // Log AI response
  logResponse: (data: AIResponseData) => void;
  // Log performance metrics
  logMetrics: (data: PerformanceMetrics) => void;
  // Set validation errors
  setValidationErrors: (errors: ValidationError[]) => void;
  // Clear all debug data
  clearDebugData: () => void;
}

const DebugContext = createContext<DebugContextValue | null>(null);

/**
 * Debug Provider Props
 */
interface DebugProviderProps {
  children: ReactNode;
}

/**
 * Debug Provider Component
 *
 * Provides centralized debug data storage for development tools
 * Only active in development mode
 */
export function DebugProvider({ children }: DebugProviderProps) {
  const [state, setState] = useState<DebugState>({
    latestRequest: null,
    latestResponse: null,
    latestMetrics: null,
    validationErrors: [],
  });

  const logRequest = useCallback((data: AIRequestData) => {
    if (process.env.NODE_ENV !== 'development') return;

    setState((prev) => ({
      ...prev,
      latestRequest: data,
    }));
  }, []);

  const logResponse = useCallback((data: AIResponseData) => {
    if (process.env.NODE_ENV !== 'development') return;

    setState((prev) => ({
      ...prev,
      latestResponse: data,
    }));
  }, []);

  const logMetrics = useCallback((data: PerformanceMetrics) => {
    if (process.env.NODE_ENV !== 'development') return;

    setState((prev) => ({
      ...prev,
      latestMetrics: data,
    }));
  }, []);

  const setValidationErrors = useCallback((errors: ValidationError[]) => {
    setState((prev) => ({
      ...prev,
      validationErrors: errors,
    }));
  }, []);

  const clearDebugData = useCallback(() => {
    setState({
      latestRequest: null,
      latestResponse: null,
      latestMetrics: null,
      validationErrors: [],
    });
  }, []);

  const value: DebugContextValue = {
    ...state,
    logRequest,
    logResponse,
    logMetrics,
    setValidationErrors,
    clearDebugData,
  };

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
}

/**
 * Hook to access debug context
 */
export function useDebugContext(): DebugContextValue {
  const context = useContext(DebugContext);

  if (!context) {
    throw new Error('useDebugContext must be used within DebugProvider');
  }

  return context;
}

/**
 * Hook to access debug context (returns null if not in provider)
 * Safe version for optional debug features
 */
export function useDebugContextOptional(): DebugContextValue | null {
  return useContext(DebugContext);
}
