// ABOUTME: Template gallery component for displaying and selecting templates
// ABOUTME: Allows filtering by category and creating new websites from templates

'use client';

import React, { useState, useEffect } from 'react';
import { templates, TemplateMetadata } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateWebsite } from '@/lib/hooks/use-websites';
import { useRouter } from 'next/navigation';
import { Loader2, MoreVertical, Eye, Copy, ExternalLink } from 'lucide-react';
import { TemplateCardSkeleton } from './TemplateCardSkeleton';
import { toast } from 'sonner';

type CategoryFilter = 'all' | 'business' | 'product' | 'personal';

/**
 * TemplateGallery displays available templates and handles template selection
 *
 * Architecture:
 * - Category filtering for easy template discovery
 * - Template cards with preview and description
 * - One-click website creation from template
 * - Navigation to editor after creation
 *
 * Principles:
 * - Single Responsibility: Template display and selection only
 * - Composition: Uses Card components for consistent UI
 * - User Experience: Clear CTAs and loading states
 */
export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [creatingTemplateId, setCreatingTemplateId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { mutate: createWebsite, isPending } = useCreateWebsite();
  const router = useRouter();

  // Simulate initial loading to demonstrate skeleton UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Filter templates by category
   */
  const filteredTemplates = templates.filter((template) => {
    if (activeCategory === 'all') return true;
    return template.category === activeCategory;
  });

  /**
   * Handle template selection and website creation with toast notifications
   */
  const handleUseTemplate = (template: TemplateMetadata) => {
    setCreatingTemplateId(template.id);

    // Create promise for toast.promise
    const createWebsitePromise = new Promise((resolve, reject) => {
      createWebsite(
        {
          label: `${template.name} - New Website`,
          config: template.config,
        },
        {
          onSuccess: (data) => {
            resolve(data);
            // Navigate to editor with the new website
            router.push(`/editor/${data.id}`);
          },
          onError: (error) => {
            console.error('Failed to create website:', error);
            setCreatingTemplateId(null);
            reject(error);
          },
        }
      );
    });

    // Show toast with loading/success/error states
    toast.promise(createWebsitePromise, {
      loading: `Creating ${template.name}...`,
      success: 'Website created! Opening editor...',
      error: 'Failed to create website. Please try again.',
    });
  };

  /**
   * Get icon and color for category
   */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'business':
        return '💼';
      case 'product':
        return '📦';
      case 'personal':
        return '👤';
      default:
        return '🌐';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'product':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'personal':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <TooltipProvider>
      <Tabs defaultValue="all" className="space-y-8" onValueChange={(value) => setActiveCategory(value as CategoryFilter)}>
        {/* Category Tabs */}
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-auto p-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="all" className="text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            All Templates
          </TabsTrigger>
          <TabsTrigger value="business" className="text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <span className="mr-1.5">💼</span>
            <span className="hidden sm:inline">Business</span>
          </TabsTrigger>
          <TabsTrigger value="product" className="text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <span className="mr-1.5">📦</span>
            <span className="hidden sm:inline">Product</span>
          </TabsTrigger>
          <TabsTrigger value="personal" className="text-sm sm:text-base data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <span className="mr-1.5">👤</span>
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-8">
          {/* Template Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isInitialLoading ? (
          // Show skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => (
            <TemplateCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          filteredTemplates.map((template, index) => (
          <Card
            key={template.id}
            data-template-id={template.id}
            className="group flex flex-col shadow-sm transition-all hover:shadow-2xl hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            <CardHeader className="pb-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${getCategoryColor(template.category)}`}>
                  {template.category}
                </span>
              </div>
              <CardTitle className="text-xl">{template.name}</CardTitle>
              <CardDescription className="text-base">{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              {/* Premium preview with glassmorphism */}
              <div className="aspect-video overflow-hidden rounded-xl border-2 bg-gradient-to-br from-muted via-background to-muted/50 shadow-inner backdrop-blur-sm">
                <div className="flex h-full flex-col gap-3 p-4">
                  {/* Simulated header */}
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive/60" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
                    <div className="h-2 w-2 rounded-full bg-green-400/60" />
                    <div className="ml-auto h-3 w-20 rounded bg-primary/10" />
                  </div>

                  {/* Simulated content blocks */}
                  <div className="h-12 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 ring-1 ring-primary/20" />
                  <div className="flex flex-1 gap-3">
                    <div className="flex-1 rounded-lg bg-accent/30 ring-1 ring-border" />
                    <div className="flex-1 rounded-lg bg-muted ring-1 ring-border" />
                  </div>
                  <div className="h-10 rounded-lg bg-gradient-to-r from-primary/15 to-primary/5" />
                </div>
              </div>

              {/* Template details with badge */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="font-medium">{template.config.blocks.length} blocks</span>
                  <span>•</span>
                  <span className="capitalize">{template.config.template}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleUseTemplate(template)}
                disabled={isPending && creatingTemplateId === template.id}
              >
                {isPending && creatingTemplateId === template.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Use Template'
                )}
              </Button>

              {/* Dialog for Preview */}
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Preview template details</p>
                  </TooltipContent>
                </Tooltip>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                      {template.name}
                    </DialogTitle>
                    <DialogDescription>{template.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Preview with glassmorphism */}
                    <div className="aspect-video overflow-hidden rounded-xl border-2 bg-gradient-to-br from-muted via-background to-muted/50 shadow-inner backdrop-blur-sm">
                      <div className="flex h-full flex-col gap-3 p-4">
                        {/* macOS window dots */}
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-destructive/60" />
                          <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
                          <div className="h-2 w-2 rounded-full bg-green-400/60" />
                          <div className="ml-auto h-3 w-20 rounded bg-primary/10" />
                        </div>

                        {/* Simulated content blocks */}
                        <div className="h-12 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 ring-1 ring-primary/20" />
                        <div className="flex flex-1 gap-3">
                          <div className="flex-1 rounded-lg bg-accent/30 ring-1 ring-border" />
                          <div className="flex-1 rounded-lg bg-muted ring-1 ring-border" />
                        </div>
                        <div className="h-10 rounded-lg bg-gradient-to-r from-primary/15 to-primary/5" />
                      </div>
                    </div>

                    {/* Template details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Category</p>
                        <p className="text-lg capitalize">{template.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Blocks</p>
                        <p className="text-lg">{template.config.blocks.length} content blocks</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Template Type</p>
                        <p className="text-lg capitalize">{template.config.template}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Primary Color</p>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded border" style={{ backgroundColor: template.config.theme.colors.primary }} />
                          <p className="text-sm font-mono">{template.config.theme.colors.primary}</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => handleUseTemplate(template)}>
                      Use This Template
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* DropdownMenu for More Actions */}
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More options</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleUseTemplate(template)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    const url = `/preview?template=${template.id}`;
                    window.open(url, '_blank');
                  }}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in New Tab
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))
        )}
      </div>

          {/* Empty state */}
          {!isInitialLoading && filteredTemplates.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No templates found in this category.
              </p>
            </div>
          )}
          </div>
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
}
