// ABOUTME: Supabase client for browser-side operations
// ABOUTME: Uses @supabase/ssr for Next.js App Router compatibility

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './database.types';

/**
 * Create a Supabase client for client-side operations
 * Automatically handles cookies and auth state
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
