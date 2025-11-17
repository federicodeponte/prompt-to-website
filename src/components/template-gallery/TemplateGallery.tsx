// ABOUTME: Template gallery component for displaying and selecting templates
// ABOUTME: Allows filtering by category and creating new websites from templates

'use client';

import React, { useState, useEffect } from 'react';
import { templates } from '@/lib/templates';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateWebsite } from '@/lib/hooks/use-websites';
import { useRouter } from 'next/navigation';
import { TemplateGrid } from './TemplateGrid';
import { toast } from 'sonner';
import type { TemplateMetadata } from '@/lib/templates';

type CategoryFilter = 'all' | 'business' | 'product' | 'personal';

export interface TemplateGalleryProps {
  /**
   * Skip initial loading delay (useful for testing)
   * @default false
   */
  skipLoadingDelay?: boolean;
}

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
 * - Testability: Configurable loading delay via props
 */
export function TemplateGallery({ skipLoadingDelay = false }: TemplateGalleryProps = {}) {
  const [creatingTemplateId, setCreatingTemplateId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(!skipLoadingDelay);

  const { mutate: createWebsite, isPending } = useCreateWebsite();
  const router = useRouter();

  // Simulate initial loading to demonstrate skeleton UI (skippable in tests)
  useEffect(() => {
    if (skipLoadingDelay) {
      setIsInitialLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [skipLoadingDelay]);

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
      <Tabs defaultValue="all" className="space-y-8">
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

        {/* Render TabsContent for each category */}
        {(['all', 'business', 'product', 'personal'] as const).map((category) => {
          // Filter templates for this specific category
          const categoryTemplates = templates.filter((template) => {
            if (category === 'all') return true;
            return template.category === category;
          });

          return (
            <TabsContent key={category} value={category} className="mt-8">
              <TemplateGrid
                templates={categoryTemplates}
                isLoading={isInitialLoading}
                isPending={isPending}
                creatingTemplateId={creatingTemplateId}
                onUseTemplate={handleUseTemplate}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </TooltipProvider>
  );
}
