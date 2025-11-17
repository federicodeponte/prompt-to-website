// ABOUTME: Main navigation header component with authentication state
// ABOUTME: Shows different navigation based on user login status

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Menu, User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to log out', {
        description: 'Please check your connection and try again.',
      });
    }
  };

  // Close dropdown when auth state changes (prevents stale data display)
  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  // Only show loading skeleton if loading takes > 200ms (prevents flash)
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [loading]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm" role="banner">
      <nav className="container mx-auto flex h-16 items-center px-6" aria-label="Main navigation">
        {/* Logo */}
        <div className="mr-8 flex items-center space-x-2">
          <Link href="/" className="group flex items-center space-x-3" aria-label="Prompt to Website - Go to homepage">
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
        <div className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
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
        </div>

        {/* Mobile Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Desktop Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {showLoading ? (
            // Loading skeleton
            <>
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </>
          ) : user ? (
            // Authenticated user menu
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" aria-label="Go to your project dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2" aria-label={`Account menu for ${user.email}`}>
                    <User className="h-4 w-4" />
                    <span className="max-w-[150px] truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Not authenticated
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" aria-label="Log in to your account">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup" aria-label="Sign up for a new account">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open mobile navigation menu">
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
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              )}
              <div className="border-t pt-4 mt-4 space-y-2">
                {showLoading ? (
                  <>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </>
                ) : user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate max-w-[200px]">{user.email || 'User'}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={async () => {
                        setOpen(false); // Close sheet immediately
                        await handleSignOut();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login" onClick={() => setOpen(false)} aria-label="Log in to your account">Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/signup" onClick={() => setOpen(false)} aria-label="Sign up for a new account">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
