// ABOUTME: Error boundary for editor page
// ABOUTME: Handles runtime errors gracefully with recovery options

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for editor page
 * Catches and handles runtime errors
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Editor error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mb-6 text-gray-600">
          An error occurred while loading the editor. Please try again.
        </p>
        {error.message && (
          <p className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            {error.message}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="default">
            Try Again
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
