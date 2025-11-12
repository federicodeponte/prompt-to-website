// ABOUTME: API route for listing and creating websites
// ABOUTME: GET /api/websites - List all websites, POST /api/websites - Create new website

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Website, WebsiteConfig } from '@/lib/types/website-config';

// Mark as dynamic route to prevent build-time execution
export const dynamic = 'force-dynamic';

/**
 * GET /api/websites
 * Lists all websites for the current user
 *
 * Query params:
 * - limit: number (default: 50)
 * - offset: number (default: 0)
 *
 * Returns: Website[]
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching websites:', error);
      return NextResponse.json(
        { error: 'Failed to fetch websites', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Website[]);
  } catch (error) {
    console.error('Unexpected error in GET /api/websites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/websites
 * Creates a new website
 *
 * Body:
 * - label: string (required)
 * - config: WebsiteConfig (required)
 * - user_id?: string (optional)
 *
 * Returns: Website
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, config, user_id } = body as {
      label: string;
      config: WebsiteConfig;
      user_id?: string;
    };

    // Validation
    if (!label || !config) {
      return NextResponse.json(
        { error: 'Missing required fields: label, config' },
        { status: 400 }
      );
    }

    // Validate config structure
    if (!config.version || !config.template || !config.theme || !config.blocks || !config.metadata) {
      return NextResponse.json(
        { error: 'Invalid config structure' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('websites')
      .insert({
        label,
        config,
        user_id: user_id || null,
        prompt_history: [],
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating website:', error);
      return NextResponse.json(
        { error: 'Failed to create website', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Website, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/websites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
