// ABOUTME: Global error boundary for root app
// ABOUTME: Catches unhandled errors at the app level

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root error boundary
 * Last line of defense for unhandled errors
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="max-w-lg text-center">
            <div className="mb-6">
              <h1 className="mb-2 text-5xl font-bold text-gray-900">Oops!</h1>
              <h2 className="text-xl text-gray-600">Something went wrong</h2>
            </div>

            <p className="mb-6 text-gray-500">
              We encountered an unexpected error. Our team has been notified.
            </p>

            {error.message && (
              <details className="mb-6 rounded-lg bg-red-50 p-4 text-left">
                <summary className="cursor-pointer font-semibold text-red-800">
                  Error details
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-red-700">
                  {error.message}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={reset} size="lg">
                Try Again
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                size="lg"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
