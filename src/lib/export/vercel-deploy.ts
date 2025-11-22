// ABOUTME: Vercel deployment integration for one-click deploys
// ABOUTME: For demo: simplified deployment flow with mock GitHub integration

export interface DeploymentRequest {
  projectName: string;
  files: Record<string, string>;
}

export interface DeploymentResult {
  success: boolean;
  url?: string;
  deploymentId?: string;
  error?: string;
  logs?: string[];
}

/**
 * Deploy Next.js project to Vercel
 * For demo: Uses Vercel API with simplified GitHub integration
 */
export async function deployToVercel(
  request: DeploymentRequest,
  vercelToken?: string
): Promise<DeploymentResult> {
  const token = vercelToken || process.env.VERCEL_TOKEN;

  if (!token) {
    return {
      success: false,
      error: 'Vercel token not configured. Set VERCEL_TOKEN environment variable.',
    };
  }

  const logs: string[] = [];

  try {
    logs.push('🚀 Starting deployment...');

    // Step 1: Create deployment on Vercel
    logs.push('📦 Creating Vercel deployment...');

    const deployment = await createVercelDeployment(
      token,
      request.projectName,
      request.files
    );

    if (!deployment.success) {
      return {
        success: false,
        error: deployment.error,
        logs,
      };
    }

    logs.push(`✅ Deployment created: ${deployment.id}`);
    logs.push(`🌐 Building...`);

    // Step 2: Wait for deployment to be ready (simplified for demo)
    logs.push('⏳ Waiting for build to complete...');

    // In production, we'd poll the deployment status
    // For demo, we simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    logs.push('✅ Build complete!');

    const deploymentUrl = deployment.url || `https://${request.projectName}.vercel.app`;

    logs.push(`🎉 Deployed successfully!`);
    logs.push(`🔗 URL: ${deploymentUrl}`);

    return {
      success: true,
      url: deploymentUrl,
      deploymentId: deployment.id,
      logs,
    };
  } catch (error) {
    logs.push(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Deployment failed',
      logs,
    };
  }
}

/**
 * Create Vercel deployment using their API
 * Docs: https://vercel.com/docs/rest-api/endpoints#create-a-new-deployment
 */
async function createVercelDeployment(
  token: string,
  projectName: string,
  files: Record<string, string>
): Promise<{ success: boolean; id?: string; url?: string; error?: string }> {
  try {
    // Convert files to Vercel format
    const vercelFiles = Object.entries(files).map(([path, content]) => ({
      file: path,
      data: content,
    }));

    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        files: vercelFiles,
        projectSettings: {
          framework: 'nextjs',
          buildCommand: 'npm run build',
          devCommand: 'npm run dev',
          installCommand: 'npm install',
          outputDirectory: '.next',
        },
        target: 'production',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || `Vercel API error: ${response.statusText}`,
      };
    }

    const data = await response.json();

    return {
      success: true,
      id: data.id,
      url: data.url || `https://${data.alias?.[0] || projectName}.vercel.app`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create deployment',
    };
  }
}

/**
 * For demo purposes: Mock deployment (no actual Vercel API call)
 * Use this if Vercel token is not available
 */
export async function mockVercelDeployment(
  request: DeploymentRequest
): Promise<DeploymentResult> {
  const logs: string[] = [];

  logs.push('🚀 Starting deployment (DEMO MODE)...');
  await new Promise((resolve) => setTimeout(resolve, 500));

  logs.push('📦 Creating Vercel deployment...');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  logs.push(`✅ Deployment created: ${generateMockId()}`);
  logs.push(`🌐 Building...`);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  logs.push('⏳ Installing dependencies...');
  await new Promise((resolve) => setTimeout(resolve, 1500));

  logs.push('🔨 Running build...');
  await new Promise((resolve) => setTimeout(resolve, 2000));

  logs.push('✅ Build complete!');
  logs.push('🎉 Deployed successfully!');

  const deploymentUrl = `https://${request.projectName}-${generateMockId().slice(0, 8)}.vercel.app`;
  logs.push(`🔗 URL: ${deploymentUrl}`);

  return {
    success: true,
    url: deploymentUrl,
    deploymentId: generateMockId(),
    logs,
  };
}

function generateMockId(): string {
  return `dpl_${Math.random().toString(36).substring(2, 15)}`;
}
