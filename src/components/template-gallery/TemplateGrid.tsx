// ABOUTME: Reusable template grid component for displaying filtered templates
// ABOUTME: Extracted from TemplateGallery to follow DRY principle

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2, MoreVertical, Eye, Copy, ExternalLink } from 'lucide-react';
import { TemplateCardSkeleton } from './TemplateCardSkeleton';
import type { TemplateMetadata } from '@/lib/templates';

interface TemplateGridProps {
  templates: TemplateMetadata[];
  isLoading: boolean;
  isPending: boolean;
  creatingTemplateId: string | null;
  onUseTemplate: (template: TemplateMetadata) => void;
  getCategoryIcon: (category: string) => string;
  getCategoryColor: (category: string) => string;
}

/**
 * TemplateGrid displays a grid of template cards with actions
 *
 * Principles:
 * - Single Responsibility: Only displays template grid
 * - Reusability: Used by multiple TabsContent elements
 * - DRY: Eliminates JSX duplication
 */
export function TemplateGrid({
  templates,
  isLoading,
  isPending,
  creatingTemplateId,
  onUseTemplate,
  getCategoryIcon,
  getCategoryColor,
}: TemplateGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TemplateCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground">
          No templates found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <Card
            data-template-id={template.id}
            className="group flex flex-col shadow-sm transition-all hover:shadow-2xl h-full"
          >
            <CardHeader className="pb-4">
              <div className="mb-3 flex items-center gap-2">
                <motion.span
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 10, transition: { duration: 0.2 } }}
                >
                  {getCategoryIcon(template.category)}
                </motion.span>
                <motion.span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${getCategoryColor(template.category)}`}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  {template.category}
                </motion.span>
              </div>
              <motion.div
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <CardTitle className="text-xl">{template.name}</CardTitle>
              </motion.div>
              <CardDescription className="text-base">{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              {/* Template preview screenshot */}
              {template.previewImage ? (
                <motion.div
                  className="aspect-video overflow-hidden rounded-xl border-2 border-border bg-muted shadow-inner relative group-hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Image
                    src={template.previewImage}
                    alt={`${template.name} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              ) : (
                // Fallback to simulated preview if image not available
                <div
                  className={`aspect-video overflow-hidden rounded-xl border-2 shadow-inner backdrop-blur-sm ${
                    template.category === 'business'
                      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800'
                      : template.category === 'product'
                      ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 border-green-200 dark:border-green-800'
                      : 'bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-orange-950/30 dark:via-pink-950/30 dark:to-rose-950/30 border-orange-200 dark:border-orange-800'
                  }`}
                >
                  <div className="flex h-full flex-col gap-3 p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-400/80 dark:bg-red-500/60" />
                      <div className="h-2 w-2 rounded-full bg-yellow-400/80 dark:bg-yellow-500/60" />
                      <div className="h-2 w-2 rounded-full bg-green-400/80 dark:bg-green-500/60" />
                      <div className="ml-auto h-3 w-20 rounded bg-background/40 backdrop-blur-sm" />
                    </div>
                    <div className={`h-12 rounded-lg ring-1 ${
                      template.category === 'business'
                        ? 'bg-gradient-to-r from-blue-200/40 to-indigo-200/40 dark:from-blue-800/40 dark:to-indigo-800/40 ring-blue-300/50 dark:ring-blue-700/50'
                        : template.category === 'product'
                        ? 'bg-gradient-to-r from-green-200/40 to-emerald-200/40 dark:from-green-800/40 dark:to-emerald-800/40 ring-green-300/50 dark:ring-green-700/50'
                        : 'bg-gradient-to-r from-orange-200/40 to-pink-200/40 dark:from-orange-800/40 dark:to-pink-800/40 ring-orange-300/50 dark:ring-orange-700/50'
                    }`} />
                    <div className="flex flex-1 gap-3">
                      <div className="flex-1 rounded-lg bg-background/30 backdrop-blur-sm ring-1 ring-border/50" />
                      <div className="flex-1 rounded-lg bg-background/20 backdrop-blur-sm ring-1 ring-border/50" />
                    </div>
                    <div className={`h-10 rounded-lg ${
                      template.category === 'business'
                        ? 'bg-gradient-to-r from-blue-300/30 to-blue-200/20 dark:from-blue-700/30 dark:to-blue-800/20'
                        : template.category === 'product'
                        ? 'bg-gradient-to-r from-green-300/30 to-green-200/20 dark:from-green-700/30 dark:to-green-800/20'
                        : 'bg-gradient-to-r from-orange-300/30 to-orange-200/20 dark:from-orange-700/30 dark:to-orange-800/20'
                    }`} />
                  </div>
                </div>
              )}

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
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="flex-1"
                  onClick={() => onUseTemplate(template)}
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
              </motion.div>

              {/* Dialog for Preview */}
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" aria-label="Preview template">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </motion.div>
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
                    {/* Preview image */}
                    {template.previewImage ? (
                      <div className="aspect-video overflow-hidden rounded-xl border-2 border-border bg-muted shadow-inner relative">
                        <Image
                          src={template.previewImage}
                          alt={`${template.name} full preview`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    ) : (
                      // Fallback to simulated preview
                      <div className="aspect-video overflow-hidden rounded-xl border-2 bg-gradient-to-br from-muted via-background to-muted/50 shadow-inner backdrop-blur-sm">
                        <div className="flex h-full flex-col gap-3 p-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-destructive/60" />
                            <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
                            <div className="h-2 w-2 rounded-full bg-green-400/60" />
                            <div className="ml-auto h-3 w-20 rounded bg-primary/10" />
                          </div>
                          <div className="h-12 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 ring-1 ring-primary/20" />
                          <div className="flex flex-1 gap-3">
                            <div className="flex-1 rounded-lg bg-accent/30 ring-1 ring-border" />
                            <div className="flex-1 rounded-lg bg-muted ring-1 ring-border" />
                          </div>
                          <div className="h-10 rounded-lg bg-gradient-to-r from-primary/15 to-primary/5" />
                        </div>
                      </div>
                    )}

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

                    <Button className="w-full" onClick={() => onUseTemplate(template)}>
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
                      <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More options</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onUseTemplate(template)}>
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
        </motion.div>
      ))}
    </div>
  );
}
