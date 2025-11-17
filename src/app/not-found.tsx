// ABOUTME: Custom 404 page with helpful navigation
// ABOUTME: Branded design that matches the application style

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-2">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold">404</CardTitle>
            <CardDescription className="text-lg">
              Page Not Found
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
              <Link href="/editor/demo">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Try Editor</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
              <Link href="/#templates">
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Templates</span>
              </Link>
            </Button>
          </div>

          <div className="border-t pt-6">
            <p className="text-xs text-center text-muted-foreground">
              Need help? Contact us or visit our{' '}
              <Link href="/" className="underline hover:text-foreground">
                homepage
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
