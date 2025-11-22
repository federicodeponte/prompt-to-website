// ABOUTME: API endpoint for deploying websites to Vercel
// ABOUTME: Generates Next.js project and triggers Vercel deployment

import { NextRequest, NextResponse } from 'next/server';
import { generateNextJsProject } from '@/lib/export/nextjs-generator';
import { deployToVercel, mockVercelDeployment } from '@/lib/export/vercel-deploy';
import type { WebsiteConfig } from '@/lib/types/website-config';

export const runtime = 'nodejs'; // Need Node runtime for Vercel API
export const maxDuration = 60; // Allow up to 60s for deployment

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const config: WebsiteConfig = body.config;
    const projectName: string = body.projectName || 'my-website';
    const useMock: boolean = body.useMock || false; // For demo without Vercel token

    if (!config || !config.blocks) {
      return NextResponse.json(
        { error: 'Missing required field: config with blocks' },
        { status: 400 }
      );
    }

    console.log('[Vercel Deploy] Starting deployment for:', projectName);

    // Step 1: Generate Next.js project
    console.log('[Vercel Deploy] Generating Next.js project...');
    const project = await generateNextJsProject(config, projectName);

    console.log('[Vercel Deploy] Generated project:', {
      files: Object.keys(project.files).length,
      projectName: project.projectName,
    });

    // Step 2: Deploy to Vercel (or mock)
    console.log('[Vercel Deploy] Deploying to Vercel...');

    const deployment = useMock
      ? await mockVercelDeployment({
          projectName: project.projectName,
          files: project.files,
        })
      : await deployToVercel({
          projectName: project.projectName,
          files: project.files,
        });

    const duration = Date.now() - startTime;

    if (!deployment.success) {
      console.error('[Vercel Deploy] Deployment failed:', deployment.error);

      return NextResponse.json(
        {
          success: false,
          error: deployment.error,
          logs: deployment.logs,
          duration,
        },
        { status: 500 }
      );
    }

    console.log('[Vercel Deploy] Deployment successful:', {
      url: deployment.url,
      deploymentId: deployment.deploymentId,
      duration: `${duration}ms`,
    });

    return NextResponse.json({
      success: true,
      url: deployment.url,
      deploymentId: deployment.deploymentId,
      logs: deployment.logs,
      duration,
      filesGenerated: Object.keys(project.files).length,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('[Vercel Deploy] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to deploy',
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
    service: 'vercel-deploy',
    hasVercelToken: !!process.env.VERCEL_TOKEN,
    timestamp: new Date().toISOString(),
  });
}
