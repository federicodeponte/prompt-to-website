// ABOUTME: Home page with template gallery and website creation flow
// ABOUTME: Provides template selection and quick start options - FULL shadcn/ui implementation

import Link from 'next/link';
import { TemplateGallery } from '@/components/template-gallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Palette, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20 px-6 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered Website Builder
          </Badge>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Build Beautiful Websites
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              In Minutes, Not Hours
            </span>
          </h1>

          <p className="mb-8 text-xl text-muted-foreground">
            Choose a template, describe your vision to AI, and watch your website come to life.
            No coding required.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#templates">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/editor/demo">
                Try Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground">
              Everything you need to build stunning websites, fast
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Powered</CardTitle>
                <CardDescription>
                  Describe your website in plain English and let AI generate a complete design for you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Create professional websites in minutes with our intuitive editor and templates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Palette className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Beautiful Design</CardTitle>
                <CardDescription>
                  Professional templates built with modern design principles and best practices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="bg-muted/30 px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              Templates
            </Badge>
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Choose Your Template
            </h2>
            <p className="text-xl text-muted-foreground">
              Start with a professionally designed template and customize it to your needs
            </p>
          </div>
          <TemplateGallery />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <Card className="container mx-auto max-w-4xl border-2 bg-gradient-to-r from-primary to-purple-600 text-white">
          <CardContent className="px-8 py-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Ready to Build Your Website?
            </h2>
            <p className="mb-8 text-xl text-primary-foreground/90">
              Join thousands of creators building beautiful websites with AI
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="#templates">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Prompt to Website
              </h3>
              <p className="text-muted-foreground">
                Build beautiful websites with AI in minutes
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                Product
              </h4>
              <ul className="space-y-2 text-muted-foreground">
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
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                Resources
              </h4>
              <ul className="space-y-2 text-muted-foreground">
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
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 Prompt to Website. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
