// ABOUTME: Unified storage interface implementing Strategy pattern for IndexedDB/localStorage fallback
// ABOUTME: Provides automatic migration from localStorage to IndexedDB with graceful degradation

import { WebsiteConfig, Website } from '../types/website-config';
import { indexedDBStorage } from './indexed-db';
import { websiteStorage as localStorageImpl } from './local-storage';
import { StorageError } from '../errors/types';

/**
 * Storage interface matching both implementations
 * Defines contract for all storage operations
 */
export interface WebsiteStorage {
  getAll(): Website[] | Promise<Website[]>;
  getById(id: string): Website | null | Promise<Website | null>;
  create(label: string, config: WebsiteConfig): Website | Promise<Website>;
  update(
    id: string,
    updates: Partial<Omit<Website, 'id' | 'created_at'>>
  ): Website | null | Promise<Website | null>;
  delete(id: string): boolean | Promise<boolean>;
  exportAll(): string | Promise<string>;
  importAll(jsonData: string): { success: boolean; count: number; error?: string } | Promise<{ success: boolean; count: number; error?: string }>;
}

/**
 * Storage strategy type
 */
type StorageStrategy = 'indexeddb' | 'localstorage';

/**
 * Storage configuration
 */
interface StorageConfig {
  preferredStrategy: StorageStrategy;
  autoMigrate: boolean;
  migrationKey: string;
}

const DEFAULT_CONFIG: StorageConfig = {
  preferredStrategy: 'indexeddb',
  autoMigrate: true,
  migrationKey: 'prompt-to-website:storage-migrated',
};

/**
 * Unified storage manager
 * Implements Strategy pattern to switch between IndexedDB and localStorage
 *
 * Features:
 * - Automatic fallback if IndexedDB unavailable
 * - One-time migration from localStorage to IndexedDB
 * - Consistent async/sync API through normalization
 */
class StorageManager {
  private strategy: StorageStrategy;
  private config: StorageConfig;
  private initialized: boolean = false;

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.strategy = this.config.preferredStrategy;
  }

  /**
   * Initialize storage and run migration if needed
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Check if IndexedDB is available
    const indexedDBAvailable = await indexedDBStorage.isAvailable();

    if (!indexedDBAvailable && this.strategy === 'indexeddb') {
      console.warn('IndexedDB not available, falling back to localStorage');
      this.strategy = 'localstorage';
    }

    // Run migration if enabled and needed
    if (this.config.autoMigrate && this.strategy === 'indexeddb') {
      await this.runMigration();
    }

    this.initialized = true;
  }

  /**
   * Get current storage strategy
   */
  getStrategy(): StorageStrategy {
    return this.strategy;
  }

  /**
   * Migrate data from localStorage to IndexedDB (one-time operation)
   */
  private async runMigration(): Promise<void> {
    try {
      // Check if migration already completed
      const migrated = localStorage.getItem(this.config.migrationKey);
      if (migrated === 'true') {
        return;
      }

      console.info('Starting migration from localStorage to IndexedDB...');

      // Get data from localStorage
      const localData = localStorageImpl.getAll();

      if (localData.length === 0) {
        // No data to migrate
        localStorage.setItem(this.config.migrationKey, 'true');
        return;
      }

      // Import into IndexedDB
      const exportedData = localStorageImpl.exportAll();
      const result = await indexedDBStorage.importAll(exportedData);

      if (result.success) {
        console.info(`Successfully migrated ${result.count} websites to IndexedDB`);
        localStorage.setItem(this.config.migrationKey, 'true');
      } else {
        throw new StorageError(`Migration failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Migration failed, will retry on next load:', error);
      // Don't set migration flag so it retries next time
    }
  }

  /**
   * Get all websites
   */
  async getAll(): Promise<Website[]> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.getAll();
    } else {
      return Promise.resolve(localStorageImpl.getAll());
    }
  }

  /**
   * Get website by ID
   */
  async getById(id: string): Promise<Website | null> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.getById(id);
    } else {
      return Promise.resolve(localStorageImpl.getById(id));
    }
  }

  /**
   * Create new website
   */
  async create(label: string, config: WebsiteConfig): Promise<Website> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.create(label, config);
    } else {
      return Promise.resolve(localStorageImpl.create(label, config));
    }
  }

  /**
   * Update existing website
   */
  async update(
    id: string,
    updates: Partial<Omit<Website, 'id' | 'created_at'>>
  ): Promise<Website | null> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.update(id, updates);
    } else {
      return Promise.resolve(localStorageImpl.update(id, updates));
    }
  }

  /**
   * Delete website
   */
  async delete(id: string): Promise<boolean> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.delete(id);
    } else {
      return Promise.resolve(localStorageImpl.delete(id));
    }
  }

  /**
   * Export all websites as JSON
   */
  async exportAll(): Promise<string> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.exportAll();
    } else {
      return Promise.resolve(localStorageImpl.exportAll());
    }
  }

  /**
   * Import websites from JSON
   */
  async importAll(jsonData: string): Promise<{ success: boolean; count: number; error?: string }> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      return indexedDBStorage.importAll(jsonData);
    } else {
      return Promise.resolve(localStorageImpl.importAll(jsonData));
    }
  }

  /**
   * Get storage statistics
   */
  async getStats(): Promise<{ strategy: StorageStrategy; count: number; estimatedSize: number }> {
    await this.initialize();

    if (this.strategy === 'indexeddb') {
      const stats = await indexedDBStorage.getStats();
      return { strategy: 'indexeddb', ...stats };
    } else {
      const websites = localStorageImpl.getAll();
      const jsonSize = JSON.stringify(websites).length;
      return {
        strategy: 'localstorage',
        count: websites.length,
        estimatedSize: jsonSize * 2,
      };
    }
  }

  /**
   * Force re-initialization (useful for testing)
   */
  async reset(): Promise<void> {
    this.initialized = false;
    await this.initialize();
  }
}

/**
 * Singleton instance
 * Default export uses IndexedDB with automatic fallback and migration
 */
export const storage = new StorageManager();

/**
 * Create custom storage instance (useful for testing)
 */
export function createStorage(config?: Partial<StorageConfig>): StorageManager {
  return new StorageManager(config);
}

/**
 * Backward compatibility: websiteStorage maintains same interface as before
 * Can be used as drop-in replacement for previous localStorage implementation
 *
 * Important: These methods are async! Update calling code to use await.
 */
export const websiteStorage = {
  getAll: () => storage.getAll(),
  getById: (id: string) => storage.getById(id),
  create: (label: string, config: WebsiteConfig) => storage.create(label, config),
  update: (id: string, updates: Partial<Omit<Website, 'id' | 'created_at'>>) =>
    storage.update(id, updates),
  delete: (id: string) => storage.delete(id),
  exportAll: () => storage.exportAll(),
  importAll: (jsonData: string) => storage.importAll(jsonData),
};
