// ABOUTME: 404 page for non-existent websites in editor
// ABOUTME: Provides helpful navigation back to home

import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Not Found page for editor
 * Displayed when website ID doesn't exist in database
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Website Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          The website you are looking for does not exist or has been deleted.
        </p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
