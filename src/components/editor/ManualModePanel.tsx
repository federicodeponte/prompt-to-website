// ABOUTME: Manual mode panel with form-based editor for website configuration
// ABOUTME: Allows direct manipulation of blocks, theme, and metadata

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WebsiteConfig, Block, BlockType } from '@/lib/types/website-config';
import { cn } from '@/lib/utils';
import { Plus, GripVertical, Trash2, Eye, EyeOff } from 'lucide-react';

interface ManualModePanelProps {
  config: WebsiteConfig;
  onConfigUpdate: (newConfig: WebsiteConfig) => void;
}

/**
 * ManualModePanel provides a form-based interface for direct config editing
 *
 * Architecture:
 * - Block list with add/remove/reorder capabilities
 * - Theme customization form
 * - Metadata editing
 * - Visual block preview/edit toggles
 *
 * Principles:
 * - Single Responsibility: Configuration form management
 * - Composition: Uses Card components for block items
 * - Separation of Concerns: Block editing handled in dedicated components
 */
export function ManualModePanel({ config, onConfigUpdate }: ManualModePanelProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());

  // Ensure blocks is always an array (safety check for race conditions)
  const blocks = config.blocks || [];

  /**
   * Toggle block expansion for editing
   */
  const toggleBlockExpansion = (blockId: string) => {
    const newExpanded = new Set(expandedBlocks);
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId);
    } else {
      newExpanded.add(blockId);
    }
    setExpandedBlocks(newExpanded);
  };

  /**
   * Get default content for a block type
   */
  const getDefaultBlockContent = (type: BlockType, id: string): any => {
    const defaults: Record<BlockType, any> = {
      hero: {
        id,
        variant: 'centered',
        heading: 'Welcome to Our Platform',
        subheading: 'Build amazing things with our tools',
        ctaPrimary: { text: 'Get Started', link: '#' },
        ctaSecondary: { text: 'Learn More', link: '#' },
      },
      features: {
        id,
        variant: 'grid',
        heading: 'Amazing Features',
        subheading: 'Everything you need to succeed',
        features: [
          { icon: '🚀', title: 'Fast', description: 'Lightning-fast performance' },
          { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
          { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
        ],
        columns: 3 as 3,
      },
      pricing: {
        id,
        variant: 'simple',
        heading: 'Simple Pricing',
        subheading: 'Choose the plan that fits your needs',
        tiers: [
          {
            name: 'Starter',
            price: '$9',
            period: '/month',
            description: 'Perfect for individuals',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            ctaText: 'Get Started',
            ctaLink: '#',
          },
        ],
      },
      testimonials: {
        id,
        variant: 'cards',
        heading: 'What Our Customers Say',
        subheading: 'Trusted by thousands worldwide',
        testimonials: [
          {
            quote: 'This product changed everything for us!',
            author: 'Jane Doe',
            role: 'CEO',
            company: 'Acme Inc',
            rating: 5,
          },
        ],
        columns: 3 as 3,
      },
      cta: {
        id,
        variant: 'simple',
        heading: 'Ready to Get Started?',
        subheading: 'Join thousands of happy customers today',
        ctaPrimary: { text: 'Start Free Trial', link: '#' },
      },
      footer: {
        id,
        variant: 'multi-column',
        logo: 'Your Logo',
        tagline: 'Building the future',
        copyright: '© 2024 Your Company',
        links: [
          {
            title: 'Product',
            links: [
              { text: 'Features', href: '#' },
              { text: 'Pricing', href: '#' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'twitter', url: '#' },
          { platform: 'github', url: '#' },
        ],
      },
      faq: {
        id,
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Find answers to common questions',
        questions: [
          { question: 'How does it work?', answer: 'It\'s simple and intuitive!' },
          { question: 'What are the benefits?', answer: 'Many amazing benefits!' },
        ],
      },
      stats: {
        id,
        variant: 'grid',
        heading: 'Our Impact',
        subheading: 'Numbers that matter',
        stats: [
          { value: '10K+', label: 'Happy Customers' },
          { value: '99%', label: 'Satisfaction Rate' },
          { value: '24/7', label: 'Support Available' },
        ],
      },
      contact: {
        id,
        variant: 'simple',
        heading: 'Get In Touch',
        subheading: 'We\'d love to hear from you',
        email: 'hello@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345',
      },
      newsletter: {
        id,
        variant: 'simple',
        heading: 'Stay Updated',
        subheading: 'Subscribe to our newsletter',
        placeholder: 'Enter your email',
        ctaText: 'Subscribe',
      },
      team: {
        id,
        variant: 'grid',
        heading: 'Meet Our Team',
        subheading: 'The people behind the magic',
        members: [
          {
            name: 'John Doe',
            role: 'CEO & Founder',
            bio: 'Passionate about innovation',
            image: '/placeholder-avatar.jpg',
            social: { twitter: '#', linkedin: '#' },
          },
        ],
      },
    };

    return defaults[type] || {};
  };

  /**
   * Add a new block to the configuration
   */
  const handleAddBlock = (type: BlockType) => {
    const blockId = `block-${Date.now()}`;
    const newBlock: Block = {
      id: blockId,
      type,
      variant: undefined,
      content: getDefaultBlockContent(type, blockId),
      settings: {
        spacing: 'normal',
        background: 'default',
        fullWidth: false,
        animation: false,
      },
    };

    const newConfig: WebsiteConfig = {
      ...config,
      blocks: [...blocks, newBlock],
    };

    onConfigUpdate(newConfig);
    setSelectedBlockId(newBlock.id);
    setExpandedBlocks(new Set([...expandedBlocks, newBlock.id]));
  };

  /**
   * Remove a block from the configuration
   */
  const handleRemoveBlock = (blockId: string) => {
    const newConfig: WebsiteConfig = {
      ...config,
      blocks: blocks.filter((b) => b.id !== blockId),
    };

    onConfigUpdate(newConfig);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  /**
   * Move block up in the order
   */
  const handleMoveBlockUp = (index: number) => {
    if (index === 0) return;

    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];

    const newConfig: WebsiteConfig = {
      ...config,
      blocks: newBlocks,
    };

    onConfigUpdate(newConfig);
  };

  /**
   * Move block down in the order
   */
  const handleMoveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];

    const newConfig: WebsiteConfig = {
      ...config,
      blocks: newBlocks,
    };

    onConfigUpdate(newConfig);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header with actions */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Manual Editor</h3>
            <p className="text-xs text-muted-foreground">
              {blocks.length} blocks • {config.template} template
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => {
            // Cycle through available block types
            const blockTypes: BlockType[] = ['hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'];
            const nextType = blockTypes[blocks.length % blockTypes.length];
            handleAddBlock(nextType);
          }}>
            <Plus className="mr-1 h-4 w-4" />
            Add Block
          </Button>
        </div>
      </div>

      {/* Blocks list */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {blocks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="mb-4 text-sm text-muted-foreground">
                  No blocks yet. Add your first block to get started.
                </p>
                <Button onClick={() => handleAddBlock('hero')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hero Block
                </Button>
              </CardContent>
            </Card>
          ) : (
            blocks.map((block, index) => (
              <Card
                key={block.id}
                className={cn(
                  'transition-colors',
                  selectedBlockId === block.id && 'ring-2 ring-primary'
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div>
                        <CardTitle className="text-sm">
                          {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                          {block.variant && ` (${block.variant})`}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          ID: {block.id}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => toggleBlockExpansion(block.id)}
                      >
                        {expandedBlocks.has(block.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleRemoveBlock(block.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedBlocks.has(block.id) && (
                  <CardContent className="space-y-3">
                    {/* Block controls */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveBlockUp(index)}
                        disabled={index === 0}
                        className="flex-1"
                      >
                        Move Up
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveBlockDown(index)}
                        disabled={index === blocks.length - 1}
                        className="flex-1"
                      >
                        Move Down
                      </Button>
                    </div>

                    {/* Block content editor */}
                    <div className="rounded-md border bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground mb-2">
                        Block Configuration
                      </p>
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(block.content, null, 2)}
                      </pre>
                      <p className="mt-2 text-xs text-muted-foreground italic">
                        Visual editor coming soon...
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Quick add menu */}
      <div className="border-t p-4">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Quick Add</p>
        <div className="grid grid-cols-2 gap-2">
          {(['hero', 'features', 'pricing', 'testimonials', 'cta', 'faq', 'stats', 'contact', 'newsletter', 'footer'] as BlockType[]).map((type) => (
            <Button
              key={type}
              size="sm"
              variant="outline"
              onClick={() => handleAddBlock(type)}
              className="justify-start"
            >
              <Plus className="mr-1 h-3 w-3" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
