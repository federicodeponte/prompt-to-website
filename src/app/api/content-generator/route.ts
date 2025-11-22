// ABOUTME: API endpoint for AI-powered website content generation
// ABOUTME: Generates complete website content from business profile using Gemini 2.5 Pro

import { NextRequest, NextResponse } from 'next/server';
import { generateWebsiteContent, BusinessProfile } from '@/lib/ai/content-generator';
import { trackEvent } from '@/lib/analytics/events';

export const runtime = 'edge'; // Use edge runtime for faster responses
export const maxDuration = 30; // Allow up to 30s for AI generation

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse request body
    const body = await request.json();
    const profile: BusinessProfile = body.profile;

    // Validate required fields
    if (!profile || !profile.businessName || !profile.industry || !profile.description) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, industry, description' },
        { status: 400 }
      );
    }

    // Validate description length
    if (profile.description.length < 20) {
      return NextResponse.json(
        { error: 'Description must be at least 20 characters' },
        { status: 400 }
      );
    }

    // Validate unique value if provided
    if (profile.uniqueValue && profile.uniqueValue.length < 10) {
      return NextResponse.json(
        { error: 'Unique value must be at least 10 characters if provided' },
        { status: 400 }
      );
    }

    console.log('[Content Generator] Generating content for:', {
      businessName: profile.businessName,
      industry: profile.industry,
      tone: profile.tone || 'professional',
    });

    // Generate content using AI
    const content = await generateWebsiteContent(profile);

    const duration = Date.now() - startTime;

    console.log('[Content Generator] Generation successful:', {
      duration: `${duration}ms`,
      sections: Object.keys(content).length,
    });

    // Track analytics
    trackEvent('ai_content_generated', {
      industry: profile.industry,
      tone: profile.tone || 'professional',
      duration,
      success: true,
    });

    return NextResponse.json({
      success: true,
      content,
      duration,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('[Content Generator] Error:', error);

    // Track error
    trackEvent('ai_content_generated', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration,
      success: false,
    });

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate content',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'content-generator',
    timestamp: new Date().toISOString(),
  });
}
