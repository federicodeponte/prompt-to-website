// ABOUTME: API route for individual website operations (get, update, delete)
// ABOUTME: GET/PATCH/DELETE /api/websites/[id]

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Website, WebsiteConfig } from '@/lib/types/website-config';

// Mark as dynamic route to prevent build-time execution
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/websites/[id]
 * Fetches a single website by ID
 *
 * Returns: Website
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Website not found' },
          { status: 404 }
        );
      }

      console.error('Error fetching website:', error);
      return NextResponse.json(
        { error: 'Failed to fetch website', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Website);
  } catch (error) {
    console.error('Unexpected error in GET /api/websites/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/websites/[id]
 * Updates a website's configuration
 *
 * Body:
 * - label?: string (optional)
 * - config?: WebsiteConfig (optional)
 * - prompt_history?: string[] (optional)
 *
 * Returns: Website
 */
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { label, config, prompt_history } = body as {
      label?: string;
      config?: WebsiteConfig;
      prompt_history?: string[];
    };

    // Build update object with only provided fields
    const updates: {
      label?: string;
      config?: WebsiteConfig;
      prompt_history?: string[];
    } = {};

    if (label !== undefined) updates.label = label;
    if (config !== undefined) {
      // Validate config structure if provided
      if (!config.version || !config.template || !config.theme || !config.blocks || !config.metadata) {
        return NextResponse.json(
          { error: 'Invalid config structure' },
          { status: 400 }
        );
      }
      updates.config = config;
    }
    if (prompt_history !== undefined) updates.prompt_history = prompt_history;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('websites')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Website not found' },
          { status: 404 }
        );
      }

      console.error('Error updating website:', error);
      return NextResponse.json(
        { error: 'Failed to update website', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Website);
  } catch (error) {
    console.error('Unexpected error in PATCH /api/websites/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/websites/[id]
 * Deletes a website
 *
 * Returns: { success: true }
 */
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting website:', error);
      return NextResponse.json(
        { error: 'Failed to delete website', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in DELETE /api/websites/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
