// ABOUTME: React Query provider for client-side data fetching and caching
// ABOUTME: Configures QueryClient with optimized defaults for production

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider wraps the app with React Query for data fetching
 *
 * Configuration:
 * - Stale time: 5 minutes (data considered fresh)
 * - Cache time: 10 minutes (data kept in cache)
 * - Retry: 1 attempt on failure
 * - Refetch on window focus: enabled for latest data
 *
 * Principles:
 * - Client-side only: Uses 'use client' directive
 * - Instance per request: useState ensures fresh QueryClient
 * - Production-ready: Optimized defaults for performance
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: 1,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
