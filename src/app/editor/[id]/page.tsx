// ABOUTME: Dynamic editor page for editing websites by ID
// ABOUTME: Loads website config from localStorage and renders EditorLayout

'use client';

import { useParams, notFound } from 'next/navigation';
import { EditorLayout } from '@/components/editor';
import { useWebsite } from '@/lib/hooks/use-websites';

/**
 * Editor page for a specific website
 *
 * Architecture:
 * - Client Component using React Query for data fetching
 * - Loads website from localStorage via useWebsite hook
 * - Handles loading and error states gracefully
 *
 * Principles:
 * - Single Responsibility: Data fetching and rendering coordination only
 * - Fail Fast: Show 404 immediately if website doesn't exist
 * - Type Safety: Proper typing throughout the data flow
 * - Client-Side: Uses localStorage, no server database needed for MVP
 */
export default function EditorPage() {
  const params = useParams();
  const id = params.id as string;

  // Fetch website from localStorage via React Query
  const { data: website, isLoading, error } = useWebsite(id);

  // Handle loading state (uses loading.tsx in same directory)
  if (isLoading) {
    return null; // Next.js loading.tsx will be shown
  }

  // Handle error or not found case
  if (error || !website) {
    notFound();
  }

  // Render editor with actual website data
  return <EditorLayout initialConfig={website.config} websiteId={id} websiteLabel={website.label} />;
}
