// ABOUTME: API endpoint for multi-agent AI system
// ABOUTME: Orchestrates Content, Design, and SEO agents to generate comprehensive website configs

import { NextRequest, NextResponse } from 'next/server';
import { orchestrateAgentsSequential } from '@/lib/ai/multi-agent-system';

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      prompt,
      businessContext,
      mode = 'sequential', // 'sequential' for demo (shows reasoning), 'parallel' for speed
    } = body;

    if (!prompt || !businessContext) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, businessContext' },
        { status: 400 }
      );
    }

    console.log('[Multi-Agent] Starting orchestration:', {
      prompt: prompt.substring(0, 100),
      mode,
    });

    // Get API key from environment
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Run orchestration
    const result = await orchestrateAgentsSequential(
      prompt,
      businessContext,
      apiKey
    );

    const duration = Date.now() - startTime;

    if (!result.success) {
      console.error('[Multi-Agent] Orchestration failed:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          agentResults: result.agentResults,
          duration,
        },
        { status: 500 }
      );
    }

    console.log('[Multi-Agent] Orchestration successful:', {
      duration: `${duration}ms`,
      agents: result.agentResults.map((r) => ({
        agent: r.agent,
        success: r.success,
        duration: r.duration,
      })),
    });

    return NextResponse.json({
      success: true,
      output: result.output,
      agentResults: result.agentResults,
      duration,
      metadata: {
        totalAgents: result.agentResults.length,
        successfulAgents: result.agentResults.filter((r) => r.success).length,
        totalDuration: result.totalDuration,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[Multi-Agent] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to orchestrate agents',
        duration,
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'multi-agent-ai',
    agents: ['content', 'design', 'seo'],
    hasApiKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
}
