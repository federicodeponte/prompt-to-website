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
   * Add a new block to the configuration
   */
  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      variant: undefined,
      content: {},
      settings: {
        spacing: 'normal',
        background: 'default',
        fullWidth: false,
        animation: false,
      },
    };

    const newConfig: WebsiteConfig = {
      ...config,
      blocks: [...config.blocks, newBlock],
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
      blocks: config.blocks.filter((b) => b.id !== blockId),
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

    const newBlocks = [...config.blocks];
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
    if (index === config.blocks.length - 1) return;

    const newBlocks = [...config.blocks];
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
              {config.blocks.length} blocks • {config.template} template
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => {
            // Cycle through available block types
            const blockTypes: BlockType[] = ['hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'];
            const nextType = blockTypes[config.blocks.length % blockTypes.length];
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
          {config.blocks.length === 0 ? (
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
            config.blocks.map((block, index) => (
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
                        disabled={index === config.blocks.length - 1}
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
