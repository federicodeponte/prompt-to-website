// ABOUTME: Enhanced template gallery with search, filters, and category navigation
// ABOUTME: Allows filtering by category, searching by name/description, and creating websites

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { templates } from '@/lib/templates';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWebsite } from '@/lib/hooks/use-websites';
import { useRouter } from 'next/navigation';
import { TemplateGrid } from './TemplateGrid';
import { toast } from 'sonner';
import { Search, X, SlidersHorizontal } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const { mutate: createWebsite, isPending } = useCreateWebsite();
  const router = useRouter();

  /**
   * Filter templates based on search query and category
   * Uses memoization for performance
   */
  const filteredTemplates = useMemo(() => {
    let result = templates;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(template => template.category === activeCategory);
    }

    // Filter by search query (search in name and description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.id.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

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

  /**
   * Clear search and show all templates
   */
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  /**
   * Get result count message
   */
  const getResultMessage = () => {
    const count = filteredTemplates.length;
    const total = templates.length;

    if (searchQuery.trim()) {
      return `Found ${count} template${count !== 1 ? 's' : ''} matching "${searchQuery}"`;
    }

    if (activeCategory !== 'all') {
      return `Showing ${count} ${activeCategory} template${count !== 1 ? 's' : ''}`;
    }

    return `Showing all ${total} templates`;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search templates by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {getResultMessage()}
          </p>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="text-xs"
            >
              Clear search
            </Button>
          )}
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as CategoryFilter)}
          className="space-y-8"
        >
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
          {(['all', 'business', 'product', 'personal'] as const).map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <TemplateGrid
                templates={filteredTemplates}
                isLoading={isInitialLoading}
                isPending={isPending}
                creatingTemplateId={creatingTemplateId}
                onUseTemplate={handleUseTemplate}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
