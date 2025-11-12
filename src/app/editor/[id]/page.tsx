// ABOUTME: Dynamic editor page for editing websites by ID
// ABOUTME: Loads website config from database and renders EditorLayout

import { notFound } from 'next/navigation';
import { EditorLayout } from '@/components/editor';
import { supabase } from '@/lib/supabase/client';
import { Website } from '@/lib/types/website-config';

interface EditorPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Fetch website from database
 * Direct database access from Server Component for optimal performance
 */
async function fetchWebsite(id: string): Promise<Website | null> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      console.error('Error fetching website:', error);
      return null;
    }

    return data as Website;
  } catch (error) {
    console.error('Unexpected error fetching website:', error);
    return null;
  }
}

/**
 * Editor page for a specific website
 *
 * Architecture:
 * - Server Component with direct database access
 * - Handles 404 errors gracefully with Next.js notFound()
 * - Passes real data to client-side EditorLayout
 *
 * Principles:
 * - Single Responsibility: Data fetching and error handling only
 * - Fail Fast: Return 404 immediately if website doesn't exist
 * - Type Safety: Proper typing throughout the data flow
 * - Performance: Direct DB access instead of HTTP round-trip
 */
export default async function EditorPage({ params }: EditorPageProps) {
  const { id } = await params;

  // Fetch website data from database
  const website = await fetchWebsite(id);

  // Handle not found case
  if (!website) {
    notFound();
  }

  // Render editor with actual website data
  return <EditorLayout initialConfig={website.config} websiteId={id} />;
}
