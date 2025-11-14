// ABOUTME: Home page with template gallery and website creation flow
// ABOUTME: Professional shadcn/ui implementation with premium spacing and typography

'use client';

import Link from 'next/link';
import { TemplateGallery } from '@/components/template-gallery';
import { Navigation } from '@/components/layout/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sparkles, Zap, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        {/* Command Palette - Global Search (⌘K) */}
        <CommandPalette />

        {/* Navigation */}
        <Navigation />

      <main className="flex-1">
        {/* Hero Section - PREMIUM SPACING */}
        <section className="border-b bg-gradient-to-b from-background via-background to-muted/20 px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700" style={{ animationFillMode: 'backwards' }}>
              <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
              AI-Powered Website Builder
            </Badge>

            {/* STRONGER TYPOGRAPHY */}
            <motion.h1
              className="mb-8 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Build Beautiful Websites
              </motion.span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 },
                  y: { duration: 0.5, delay: 0.5 },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                In Minutes, Not Hours
              </motion.span>
            </motion.h1>

            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-muted-foreground sm:text-2xl animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
              Choose a template, describe your vision to AI, and watch your website come to life.
              No coding required.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in zoom-in-95 duration-700" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
              <Button size="lg" className="h-12 px-8 text-base shadow-lg transition-all hover:shadow-xl hover:scale-105" asChild>
                <a href="#templates">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base transition-all hover:scale-105" asChild>
                <Link href="/editor/demo">
                  Try Demo
                </Link>
              </Button>
            </div>

            {/* Command Palette Hint */}
            <p className="mt-8 text-sm text-muted-foreground animate-in fade-in duration-700" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
              Press{' '}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100 transition-all hover:scale-110">
                <span className="text-xs">⌘</span>K
              </kbd>{' '}
              to search templates
            </p>
          </div>
        </section>

        {/* Features Section - SEMANTIC TOKENS ONLY */}
        <section className="px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationFillMode: 'backwards' }}>
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Everything you need to build stunning websites, fast
              </p>
            </div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, staggerChildren: 0.2 }}
            >
              {/* Card 1 - PRIMARY with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full bg-gradient-to-br from-background to-blue-50/30 dark:to-blue-950/30">
                      <CardHeader className="pb-8">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                          <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AI-Powered</CardTitle>
                        <CardDescription className="text-base">
                          Describe your website in plain English and let AI generate a complete design for you.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="font-medium">Powered by Gemini 2.5 Flash</p>
                  <p className="text-sm text-muted-foreground">Advanced AI model with function calling for intelligent website generation</p>
                </TooltipContent>
              </Tooltip>

              {/* Card 2 - SECONDARY with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full bg-gradient-to-br from-background to-purple-50/30 dark:to-purple-950/30">
                      <CardHeader className="pb-8">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/50">
                          <Zap className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Lightning Fast</CardTitle>
                        <CardDescription className="text-base">
                          Create professional websites in minutes with our intuitive editor and templates.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="font-medium">Average creation time: 30 seconds</p>
                  <p className="text-sm text-muted-foreground">From idea to deployed website in under a minute</p>
                </TooltipContent>
              </Tooltip>

              {/* Card 3 - ACCENT with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full bg-gradient-to-br from-background to-pink-50/30 dark:to-pink-950/30">
                      <CardHeader className="pb-8">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/50">
                          <Palette className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Beautiful Design</CardTitle>
                        <CardDescription className="text-base">
                          Professional templates built with modern design principles and best practices.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="font-medium">Built with shadcn/ui</p>
                  <p className="text-sm text-muted-foreground">Accessible, customizable components with Tailwind CSS</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </div>
        </section>

        {/* Template Gallery */}
        <section id="templates" className="bg-muted/30 px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-6 text-sm animate-in fade-in zoom-in-95 duration-500" style={{ animationFillMode: 'backwards' }}>
                Templates
              </Badge>
              <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
                Choose Your Template
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
                Start with a professionally designed template and customize it to your needs
              </p>
            </div>
            <TemplateGallery />
          </div>
        </section>

        {/* FAQ Section with Accordion */}
        <section className="px-6 py-24 sm:py-32">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Everything you need to know about building websites with AI
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <motion.span className="text-lg font-semibold" whileHover={{ x: 4 }}>
                      How does the AI website builder work?
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Simply choose a template, describe your website vision in plain English, and our AI powered by Gemini 2.5 Flash generates a complete design with content blocks, styling, and layout. You can then customize every aspect in our intuitive editor.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <motion.span className="text-lg font-semibold" whileHover={{ x: 4 }}>
                      Do I need coding knowledge?
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Not at all! Our platform is designed for everyone. The AI handles all the technical complexity, and our visual editor lets you make changes with simple clicks and drags. No code required.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <motion.span className="text-lg font-semibold" whileHover={{ x: 4 }}>
                      Can I customize the AI-generated website?
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Absolutely! The AI gives you a professional starting point, but you have full control. Edit text, change colors, modify layouts, add or remove blocks - everything is customizable in real-time with instant preview.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <motion.span className="text-lg font-semibold" whileHover={{ x: 4 }}>
                      How long does it take to create a website?
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Most users create and customize their website in under 30 seconds. The AI generates your initial design instantly, and our editor makes customization incredibly fast. From idea to published website in minutes.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <motion.span className="text-lg font-semibold" whileHover={{ x: 4 }}>
                      What templates are available?
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    We offer professionally designed templates for Business (SaaS, Agency, Consulting), Product (Landing Pages, E-commerce), and Personal (Portfolio, Blog) use cases. Each template is built with modern design principles and best practices.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </div>
        </section>

        {/* CTA Section - SEMANTIC GRADIENT */}
        <section className="px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="container mx-auto max-w-4xl border-2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl">
              <CardContent className="px-8 py-20 text-center sm:px-16 sm:py-24">
                <motion.h2
                  className="mb-6 text-4xl font-bold text-primary-foreground sm:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Ready to Build Your Website?
                </motion.h2>
                <motion.p
                  className="mb-10 text-xl text-primary-foreground/90 sm:text-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Join thousands of creators building beautiful websites with AI
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base shadow-lg transition-all hover:scale-105" asChild>
                    <a href="#templates">
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-muted/30 px-6 py-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="grid gap-12 md:grid-cols-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="mb-4 text-xl font-semibold">
                  Prompt to Website
                </h3>
                <p className="text-base text-muted-foreground">
                  Build beautiful websites with AI in minutes
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Product
                </h4>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li>
                    <a href="#templates" className="transition-all hover:text-primary hover:translate-x-1 inline-block">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="transition-all hover:text-primary hover:translate-x-1 inline-block">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="transition-all hover:text-primary hover:translate-x-1 inline-block">
                      Pricing
                    </a>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Resources
                </h4>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li>
                    <a href="#docs" className="transition-all hover:text-primary hover:translate-x-1 inline-block">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#help" className="transition-all hover:text-primary hover:translate-x-1 inline-block">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="transition-all hover:text-primary hover:translate-x-1 inline-block">
                      Contact
                    </a>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
            <motion.div
              className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              © 2025 Prompt to Website. All rights reserved.
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
    </TooltipProvider>
  );
}
