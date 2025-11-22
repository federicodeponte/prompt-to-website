// ABOUTME: Auth callback handler for OAuth and email confirmations
// ABOUTME: Exchanges auth code for session and redirects appropriately

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();

    // If Supabase not configured, redirect to login
    if (!supabase) {
      return NextResponse.redirect(`${origin}/login`);
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Handle different callback types
      if (type === 'recovery') {
        // Password reset callback
        return NextResponse.redirect(`${origin}/auth/reset-password`);
      }

      // Default: OAuth or email confirmation
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  // If no code or error, redirect to login
  return NextResponse.redirect(`${origin}/login`);
}
