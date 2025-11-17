// ABOUTME: Health check endpoint for verifying API configuration
// ABOUTME: GET /api/health - Returns status of Gemini API key configuration

import { NextResponse } from 'next/server';

// Mark as dynamic route to prevent build-time execution
export const dynamic = 'force-dynamic';

/**
 * GET /api/health
 * Checks if the Gemini API key is configured
 *
 * Returns: { configured: boolean }
 */
export async function GET() {
  const isConfigured = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    configured: isConfigured,
    service: 'gemini-ai',
  });
}
