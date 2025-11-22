'use client';

// ABOUTME: Demo page for One-Click Vercel Deploy feature
// ABOUTME: Shows deployment process with live logs and progress

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Rocket, CheckCircle2, ExternalLink, Code2, ArrowLeft, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VercelDeployDemoPage() {
  const [projectName, setProjectName] = useState('my-awesome-website');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filesGenerated, setFilesGenerated] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentUrl(null);
    setLogs([]);
    setError(null);
    setFilesGenerated(0);
    setDuration(0);

    try {
      // Demo website config (simplified)
      const demoConfig = {
        label: projectName,
        template: 'startup',
        seo: {
          title: projectName,
          description: `Welcome to ${projectName} - built with AI`,
        },
        blocks: [
          {
            id: '1',
            type: 'hero',
            props: {
              headline: `Welcome to ${projectName}`,
              subheadline: 'Built with AI and deployed in seconds',
              cta: { text: 'Get Started', link: '#' },
            },
          },
          {
            id: '2',
            type: 'features',
            props: {
              items: [
                {
                  title: 'Fast Deployment',
                  description: 'Deploy to production in under 60 seconds',
                },
                {
                  title: 'AI-Powered',
                  description: 'Generated with advanced AI technology',
                },
                {
                  title: 'Production-Ready',
                  description: 'Full Next.js app with TypeScript and Tailwind',
                },
              ],
            },
          },
          {
            id: '3',
            type: 'cta',
            props: {
              headline: 'Ready to get started?',
              description: 'Join thousands of users building with AI',
              buttonText: 'Sign Up Now',
            },
          },
        ],
      };

      const response = await fetch('/api/deploy/vercel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: demoConfig,
          projectName: projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          useMock: true, // Use mock deployment for demo (set to false if you have VERCEL_TOKEN)
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Deployment failed');
        setLogs(data.logs || []);
        return;
      }

      setDeploymentUrl(data.url);
      setLogs(data.logs || []);
      setFilesGenerated(data.filesGenerated || 0);
      setDuration(data.duration || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsDeploying(false);
    }
  };

  // Sample generated code for preview
  const sampleGeneratedCode = `// Generated Next.js App Router page
import Hero0 from '@/components/Hero0'
import Features1 from '@/components/Features1'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero0 />
      <Features1 />
    </main>
  )
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back to Demos Link */}
        <div className="mb-6">
          <Link href="/demo" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Demos</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Rocket className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Demo Feature</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            One-Click Vercel Deploy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch your AI-generated website transform into a production-ready Next.js app
            and deploy to Vercel in under 60 seconds
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Deploy Your Website</CardTitle>
            <CardDescription>
              Enter a project name and click deploy to see the magic happen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="my-awesome-website"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={isDeploying}
              />
              <p className="text-sm text-gray-500">
                Will be deployed to: {projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-')}
                .vercel.app
              </p>
            </div>

            {/* Deploy Button */}
            <Button
              onClick={handleDeploy}
              disabled={isDeploying || !projectName}
              size="lg"
              className="w-full"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Deploy to Vercel
                </>
              )}
            </Button>

            {/* Logs */}
            {logs.length > 0 && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="animate-in fade-in slide-in-from-bottom-2">
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Success */}
            {deploymentUrl && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-3">
                    <div>
                      <strong>Deployment Successful!</strong>
                      <div className="mt-2 space-y-1 text-sm">
                        <div>✅ {filesGenerated} files generated</div>
                        <div>✅ Deployed in {(duration / 1000).toFixed(1)}s</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Live Site
                      </a>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(deploymentUrl);
                        }}
                      >
                        Copy URL
                      </Button>
                    </div>

                    <div className="text-xs text-gray-600 break-all">
                      {deploymentUrl}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Error */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Deployment Failed</strong>
                  <div className="mt-1 text-sm">{error}</div>
                </AlertDescription>
              </Alert>
            )}

            {/* Code Preview Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCodePreview(!showCodePreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showCodePreview ? 'Hide' : 'Preview'} Generated Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Preview Card */}
        {showCodePreview && (
          <Card className="shadow-xl bg-gray-900 text-gray-100 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Generated Code Sample (app/page.tsx)
              </CardTitle>
              <CardDescription className="text-gray-400">
                Preview of the Next.js App Router code that will be generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-green-400">{sampleGeneratedCode}</code>
              </pre>
              <div className="mt-4 text-xs text-gray-400">
                💡 The generator creates 12 files including: package.json, next.config.js,
                tsconfig.json, Tailwind config, components, and more.
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generated Files</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <ul className="space-y-1">
                <li>✓ package.json</li>
                <li>✓ next.config.js</li>
                <li>✓ app/layout.tsx</li>
                <li>✓ app/page.tsx</li>
                <li>✓ components/*.tsx</li>
                <li>✓ tailwind.config.ts</li>
                <li>✓ README.md</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <ul className="space-y-1">
                <li>✓ Next.js 15</li>
                <li>✓ React 19</li>
                <li>✓ TypeScript 5</li>
                <li>✓ Tailwind CSS 4</li>
                <li>✓ App Router</li>
                <li>✓ Production-ready</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <ul className="space-y-1">
                <li>✓ SSL included</li>
                <li>✓ Global CDN</li>
                <li>✓ Auto-scaling</li>
                <li>✓ Custom domains</li>
                <li>✓ Full source code</li>
                <li>✓ Own your data</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Demo Note */}
        <Card className="mt-8 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Code2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <strong>Demo Mode:</strong> This demo uses mock deployment for demonstration
                purposes. In production, set <code className="bg-amber-100 px-1 rounded">VERCEL_TOKEN</code>{' '}
                environment variable to enable real Vercel API deployments.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
