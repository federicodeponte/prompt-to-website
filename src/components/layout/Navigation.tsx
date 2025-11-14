// ABOUTME: Main navigation header component
// ABOUTME: Professional SaaS-style navigation with logo, menu, and auth buttons

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-6">
        {/* Logo */}
        <div className="mr-8 flex items-center space-x-2">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 shadow-md ring-1 ring-primary/20 transition-transform group-hover:scale-105">
              <span className="text-lg font-bold text-primary-foreground">P</span>
              <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60 ring-1 ring-background" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight sm:inline-block">
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
