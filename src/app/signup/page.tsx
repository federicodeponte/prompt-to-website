// ABOUTME: Signup page stub - redirects to demo editor until auth is implemented
// ABOUTME: Professional placeholder with clear messaging and CTA

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Zap, Palette, Download } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/editor/demo');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Get Started for Free</CardTitle>
          <CardDescription className="text-base">
            No account needed! Try our demo editor now with full AI capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">AI-Powered Generation</p>
                <p className="text-xs text-muted-foreground">Describe your website and let AI build it</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                <Palette className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Professional Templates</p>
                <p className="text-xs text-muted-foreground">Choose from production-grade designs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                <Download className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Export & Deploy</p>
                <p className="text-xs text-muted-foreground">Download code or deploy instantly</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-3">
              <strong className="text-foreground">Coming Soon:</strong> Save your projects, team collaboration, and premium features.
            </p>
            <Button
              onClick={() => router.push('/editor/demo')}
              className="w-full"
              size="lg"
            >
              Try Demo Editor Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Redirecting automatically in 3 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
