// ABOUTME: Helper utilities for working with WebsiteConfig objects
// ABOUTME: Provides type-safe functions for common configuration operations

import { WebsiteConfig, Block } from '@/lib/types/website-config';

/**
 * Find a block by ID
 */
export function findBlockById(config: WebsiteConfig, blockId: string): Block | undefined {
  return config.blocks.find(block => block.id === blockId);
}

/**
 * Find all blocks of a specific type
 */
export function findBlocksByType(config: WebsiteConfig, type: Block['type']): Block[] {
  return config.blocks.filter(block => block.type === type);
}

/**
 * Update a block by ID
 */
export function updateBlock(
  config: WebsiteConfig,
  blockId: string,
  updater: (block: Block) => Block
): WebsiteConfig {
  return {
    ...config,
    blocks: config.blocks.map(block =>
      block.id === blockId ? updater(block) : block
    ),
  };
}

/**
 * Remove a block by ID
 */
export function removeBlock(config: WebsiteConfig, blockId: string): WebsiteConfig {
  return {
    ...config,
    blocks: config.blocks.filter(block => block.id !== blockId),
  };
}

/**
 * Add a new block
 */
export function addBlock(
  config: WebsiteConfig,
  block: Block,
  position?: number
): WebsiteConfig {
  const newBlocks = [...config.blocks];

  if (position !== undefined && position >= 0 && position <= newBlocks.length) {
    newBlocks.splice(position, 0, block);
  } else {
    newBlocks.push(block);
  }

  return {
    ...config,
    blocks: newBlocks,
  };
}

/**
 * Move a block to a new position
 */
export function moveBlock(
  config: WebsiteConfig,
  blockId: string,
  newPosition: number
): WebsiteConfig {
  const blockIndex = config.blocks.findIndex(block => block.id === blockId);

  if (blockIndex === -1) {
    return config;
  }

  const newBlocks = [...config.blocks];
  const [movedBlock] = newBlocks.splice(blockIndex, 1);
  newBlocks.splice(newPosition, 0, movedBlock);

  return {
    ...config,
    blocks: newBlocks,
  };
}

/**
 * Duplicate a block
 */
export function duplicateBlock(
  config: WebsiteConfig,
  blockId: string,
  newId?: string
): WebsiteConfig {
  const block = findBlockById(config, blockId);

  if (!block) {
    return config;
  }

  const blockIndex = config.blocks.findIndex(b => b.id === blockId);
  const duplicatedBlock: Block = {
    ...block,
    id: newId || `${block.type}-${Date.now()}`,
  };

  return addBlock(config, duplicatedBlock, blockIndex + 1);
}

/**
 * Update theme colors
 */
export function updateThemeColors(
  config: WebsiteConfig,
  colors: Partial<WebsiteConfig['theme']['colors']>
): WebsiteConfig {
  return {
    ...config,
    theme: {
      ...config.theme,
      colors: {
        ...config.theme.colors,
        ...colors,
      },
    },
  };
}

/**
 * Update theme fonts
 */
export function updateThemeFonts(
  config: WebsiteConfig,
  fonts: Partial<WebsiteConfig['theme']['fonts']>
): WebsiteConfig {
  return {
    ...config,
    theme: {
      ...config.theme,
      fonts: {
        ...config.theme.fonts,
        ...fonts,
      },
    },
  };
}

/**
 * Update metadata
 */
export function updateMetadata(
  config: WebsiteConfig,
  metadata: Partial<WebsiteConfig['metadata']>
): WebsiteConfig {
  return {
    ...config,
    metadata: {
      ...config.metadata,
      ...metadata,
    },
  };
}

/**
 * Get block count by type
 */
export function getBlockCountByType(config: WebsiteConfig): Record<string, number> {
  return config.blocks.reduce((acc, block) => {
    acc[block.type] = (acc[block.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Validate block ID uniqueness
 */
export function hasUniqueBlockIds(config: WebsiteConfig): boolean {
  const ids = config.blocks.map(block => block.id);
  const uniqueIds = new Set(ids);
  return ids.length === uniqueIds.size;
}

/**
 * Generate unique block ID
 */
export function generateBlockId(config: WebsiteConfig, type: Block['type']): string {
  const existingIds = new Set(config.blocks.map(block => block.id));
  let counter = 1;
  let id = `${type}-${counter}`;

  while (existingIds.has(id)) {
    counter++;
    id = `${type}-${counter}`;
  }

  return id;
}

/**
 * Ensure all blocks have unique IDs
 */
export function ensureUniqueBlockIds(config: WebsiteConfig): WebsiteConfig {
  const seenIds = new Set<string>();

  return {
    ...config,
    blocks: config.blocks.map(block => {
      if (seenIds.has(block.id)) {
        // Generate new unique ID
        const newId = generateBlockId({ ...config, blocks: Array.from(seenIds).map(id => ({ id, type: block.type, content: {}, settings: undefined })) as Block[] }, block.type);
        seenIds.add(newId);
        return { ...block, id: newId };
      }

      seenIds.add(block.id);
      return block;
    }),
  };
}

/**
 * Deep clone config (for undo/redo or testing)
 */
export function cloneConfig(config: WebsiteConfig): WebsiteConfig {
  return JSON.parse(JSON.stringify(config));
}

/**
 * Compare two configs for equality
 */
export function areConfigsEqual(configA: WebsiteConfig, configB: WebsiteConfig): boolean {
  return JSON.stringify(configA) === JSON.stringify(configB);
}

/**
 * Get config summary for logging/debugging
 */
export function getConfigSummary(config: WebsiteConfig): string {
  const blockCounts = getBlockCountByType(config);
  const blockSummary = Object.entries(blockCounts)
    .map(([type, count]) => `${count} ${type}`)
    .join(', ');

  return `${config.template} | ${blockSummary} | ${config.metadata.title}`;
}
