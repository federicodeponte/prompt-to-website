// ABOUTME: Supabase client for browser-side operations
// ABOUTME: Uses @supabase/ssr for Next.js App Router compatibility

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './database.types';

/**
 * Create a Supabase client for client-side operations
 * Automatically handles cookies and auth state
 * Returns null if Supabase credentials are not configured
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null if credentials not configured (allows demo pages to work)
  if (!url || !key) {
    return null;
  }

  return createBrowserClient<Database>(url, key);
}
