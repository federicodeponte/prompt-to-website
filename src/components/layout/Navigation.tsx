// ABOUTME: Main navigation header component
// ABOUTME: Professional SaaS-style navigation with logo, menu, and auth buttons

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/#templates"
              className="relative transition-colors hover:text-foreground text-foreground/60 group"
            >
              Templates
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/#features"
              className="relative transition-colors hover:text-foreground text-foreground/60 group"
            >
              Features
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/#pricing"
              className="relative transition-colors hover:text-foreground text-foreground/60 group"
            >
              Pricing
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Desktop Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate to different sections of the site
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-8">
              <Link
                href="/#templates"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span>📋</span>
                <span>Templates</span>
              </Link>
              <Link
                href="/#features"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span>✨</span>
                <span>Features</span>
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span>💰</span>
                <span>Pricing</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span>📊</span>
                <span>Dashboard</span>
              </Link>
              <div className="border-t pt-4 mt-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup" onClick={() => setOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
