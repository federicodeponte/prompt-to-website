// ABOUTME: Supabase client initialization for browser-side database operations
// ABOUTME: Provides configured Supabase client instance with environment variables

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

let clientInstance: SupabaseClient | null = null;

/**
 * Get or create Supabase client instance
 * Lazy initialization to avoid build-time errors
 */
function getSupabaseClient(): SupabaseClient {
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
}

// Export client instance (created lazily on first access)
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});
