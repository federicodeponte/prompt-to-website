// ABOUTME: Template gallery component for displaying and selecting templates
// ABOUTME: Allows filtering by category and creating new websites from templates

'use client';

import React, { useState } from 'react';
import { templates, TemplateMetadata } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreateWebsite } from '@/lib/hooks/use-websites';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

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

  const { mutate: createWebsite, isPending } = useCreateWebsite();
  const router = useRouter();

  /**
   * Filter templates by category
   */
  const filteredTemplates = templates.filter((template) => {
    if (activeCategory === 'all') return true;
    return template.category === activeCategory;
  });

  /**
   * Handle template selection and website creation
   */
  const handleUseTemplate = (template: TemplateMetadata) => {
    setCreatingTemplateId(template.id);

    createWebsite(
      {
        label: `${template.name} - New Website`,
        config: template.config,
      },
      {
        onSuccess: (data) => {
          // Navigate to editor with the new website
          router.push(`/editor/${data.id}`);
        },
        onError: (error) => {
          console.error('Failed to create website:', error);
          setCreatingTemplateId(null);
          alert('Failed to create website. Please try again.');
        },
      }
    );
  };

  /**
   * Get icon for category
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

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('all')}
        >
          All Templates
        </Button>
        <Button
          variant={activeCategory === 'business' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('business')}
        >
          💼 Business
        </Button>
        <Button
          variant={activeCategory === 'product' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('product')}
        >
          📦 Product
        </Button>
        <Button
          variant={activeCategory === 'personal' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('personal')}
        >
          👤 Personal
        </Button>
      </div>

      {/* Template Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group flex flex-col shadow-sm transition-all hover:shadow-2xl hover:scale-[1.02]">
            <CardHeader className="pb-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <CardTitle className="text-xl">{template.name}</CardTitle>
              <CardDescription className="text-base">{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              {/* Premium preview with modern gradient pattern */}
              <div className="aspect-video overflow-hidden rounded-xl border-2 bg-gradient-to-br from-muted via-background to-muted/50 shadow-inner">
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
              <Button
                variant="outline"
                onClick={() => {
                  // Preview in a new tab
                  const url = `/preview?template=${template.id}`;
                  window.open(url, '_blank');
                }}
              >
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">
            No templates found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
