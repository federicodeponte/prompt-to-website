// ABOUTME: Home page with template gallery and website creation flow
// ABOUTME: Professional shadcn/ui implementation with premium spacing and typography

import Link from 'next/link';
import { TemplateGallery } from '@/components/template-gallery';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Palette, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Navigation />

      <main className="flex-1">
        {/* Hero Section - PREMIUM SPACING */}
        <section className="border-b bg-gradient-to-b from-background via-background to-muted/20 px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-8">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              AI-Powered Website Builder
            </Badge>

            {/* STRONGER TYPOGRAPHY */}
            <h1 className="mb-8 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
              Build Beautiful Websites
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                In Minutes, Not Hours
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              Choose a template, describe your vision to AI, and watch your website come to life.
              No coding required.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <a href="#templates">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="/editor/demo">
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section - SEMANTIC TOKENS ONLY */}
        <section className="px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Everything you need to build stunning websites, fast
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Card 1 - PRIMARY */}
              <Card className="border-2 transition-all hover:shadow-xl hover:scale-[1.02]">
                <CardHeader className="pb-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">AI-Powered</CardTitle>
                  <CardDescription className="text-base">
                    Describe your website in plain English and let AI generate a complete design for you.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Card 2 - SECONDARY */}
              <Card className="border-2 transition-all hover:shadow-xl hover:scale-[1.02]">
                <CardHeader className="pb-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 ring-1 ring-secondary/20">
                    <Zap className="h-7 w-7 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Lightning Fast</CardTitle>
                  <CardDescription className="text-base">
                    Create professional websites in minutes with our intuitive editor and templates.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Card 3 - ACCENT */}
              <Card className="border-2 transition-all hover:shadow-xl hover:scale-[1.02]">
                <CardHeader className="pb-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/50 ring-1 ring-accent">
                    <Palette className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Beautiful Design</CardTitle>
                  <CardDescription className="text-base">
                    Professional templates built with modern design principles and best practices.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Template Gallery */}
        <section id="templates" className="bg-muted/30 px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-6 text-sm">
                Templates
              </Badge>
              <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Choose Your Template
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Start with a professionally designed template and customize it to your needs
              </p>
            </div>
            <TemplateGallery />
          </div>
        </section>

        {/* CTA Section - SEMANTIC GRADIENT */}
        <section className="px-6 py-24 sm:py-32">
          <Card className="container mx-auto max-w-4xl border-2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl">
            <CardContent className="px-8 py-20 text-center sm:px-16 sm:py-24">
              <h2 className="mb-6 text-4xl font-bold text-primary-foreground sm:text-5xl">
                Ready to Build Your Website?
              </h2>
              <p className="mb-10 text-xl text-primary-foreground/90 sm:text-2xl">
                Join thousands of creators building beautiful websites with AI
              </p>
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base shadow-lg" asChild>
                <a href="#templates">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t bg-muted/30 px-6 py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-xl font-semibold">
                  Prompt to Website
                </h3>
                <p className="text-base text-muted-foreground">
                  Build beautiful websites with AI in minutes
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Product
                </h4>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li>
                    <a href="#templates" className="transition-colors hover:text-primary">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="transition-colors hover:text-primary">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="transition-colors hover:text-primary">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Resources
                </h4>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li>
                    <a href="#docs" className="transition-colors hover:text-primary">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#help" className="transition-colors hover:text-primary">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="transition-colors hover:text-primary">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
              © 2025 Prompt to Website. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
