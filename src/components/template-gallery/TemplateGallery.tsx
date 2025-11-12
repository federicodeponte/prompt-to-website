// ABOUTME: Template gallery component for displaying and selecting templates
// ABOUTME: Allows filtering by category and creating new websites from templates

'use client';

import React, { useState } from 'react';
import { templates, TemplateMetadata } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateWebsite } from '@/lib/hooks/use-websites';
import { useRouter } from 'next/navigation';

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
          <Card key={template.id} className="flex flex-col transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                <span className="text-xs uppercase text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              {/* Preview placeholder - could be replaced with actual screenshot */}
              <div className="aspect-video rounded-lg border bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                <div className="flex h-full flex-col gap-2">
                  {/* Simulated preview */}
                  <div className="h-8 rounded bg-white/80" />
                  <div className="flex flex-1 gap-2">
                    <div className="flex-1 rounded bg-white/60" />
                    <div className="flex-1 rounded bg-white/60" />
                  </div>
                  <div className="h-12 rounded bg-white/80" />
                </div>
              </div>

              {/* Template details */}
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{template.config.blocks.length} blocks</span>
                <span>•</span>
                <span className="capitalize">{template.config.template}</span>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleUseTemplate(template)}
                disabled={isPending && creatingTemplateId === template.id}
              >
                {isPending && creatingTemplateId === template.id
                  ? 'Creating...'
                  : 'Use Template'}
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
