// ABOUTME: Main navigation header component
// ABOUTME: Professional SaaS-style navigation with logo, menu, and auth buttons

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-6">
        {/* Logo */}
        <div className="mr-8 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-lg font-bold">P</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              Prompt to Website
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/#templates"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Templates
          </Link>
          <Link
            href="/#features"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
