// ABOUTME: IndexedDB storage layer providing async browser persistence with versioning and migrations
// ABOUTME: Implements the same interface as localStorage but with IndexedDB for larger quotas and async operations

import { WebsiteConfig, Website } from '../types/website-config';
import {
  StorageError,
  StorageQuotaError,
  StorageUnavailableError,
  NotFoundError,
  toAppError,
} from '../errors/types';
import { retry } from '../errors/retry';

const DB_NAME = 'prompt-to-website';
const DB_VERSION = 1;
const STORE_NAME = 'websites';

/**
 * IndexedDB Schema Version 1
 *
 * Object Store: websites
 * Key: id (string, UUID)
 * Indexes:
 *   - created_at (for sorting)
 *   - updated_at (for sorting)
 *   - user_id (for multi-tenant support later)
 */

/**
 * Open IndexedDB connection with version management
 */
async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new StorageUnavailableError(new Error('IndexedDB not available')));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new StorageError('Failed to open IndexedDB', request.error as Error));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

        // Create indexes
        store.createIndex('created_at', 'created_at', { unique: false });
        store.createIndex('updated_at', 'updated_at', { unique: false });
        store.createIndex('user_id', 'user_id', { unique: false });
      }
    };

    request.onblocked = () => {
      reject(
        new StorageError(
          'IndexedDB upgrade blocked by another tab. Please close other tabs and try again.'
        )
      );
    };
  });
}

/**
 * Execute IndexedDB transaction with retry logic
 */
async function executeTransaction<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return retry(
    async () => {
      const db = await openDB();

      return new Promise<T>((resolve, reject) => {
        try {
          const transaction = db.transaction(STORE_NAME, mode);
          const store = transaction.objectStore(STORE_NAME);
          const request = operation(store);

          request.onsuccess = () => {
            resolve(request.result);
            db.close();
          };

          request.onerror = () => {
            db.close();
            const error = request.error;

            // Check for quota exceeded
            if (error?.name === 'QuotaExceededError') {
              reject(new StorageQuotaError(error as Error));
            } else {
              reject(new StorageError('Transaction failed', error as Error));
            }
          };

          transaction.onerror = () => {
            db.close();
            reject(new StorageError('Transaction error', transaction.error as Error));
          };

          transaction.onabort = () => {
            db.close();
            reject(new StorageError('Transaction aborted', transaction.error as Error));
          };
        } catch (error) {
          db.close();
          reject(toAppError(error));
        }
      });
    },
    {
      maxAttempts: 3,
      initialDelay: 100,
      onRetry: (error, attempt) => {
        console.warn(`IndexedDB operation retry attempt ${attempt}:`, error.message);
      },
    }
  );
}

/**
 * IndexedDB storage implementation
 * Provides async CRUD operations matching localStorage interface
 */
export const indexedDBStorage = {
  /**
   * Get all websites from IndexedDB
   */
  async getAll(): Promise<Website[]> {
    try {
      return await executeTransaction('readonly', (store) => store.getAll());
    } catch (error) {
      console.error('Error reading from IndexedDB:', error);
      throw toAppError(error);
    }
  },

  /**
   * Get single website by ID
   */
  async getById(id: string): Promise<Website | null> {
    try {
      const website = await executeTransaction('readonly', (store) => store.get(id));

      if (!website) {
        return null;
      }

      // Normalize config to ensure blocks is always an array (defensive programming)
      if (website.config) {
        website.config.blocks = website.config.blocks || [];
      }

      return website;
    } catch (error) {
      console.error('Error getting website by ID:', error);
      throw toAppError(error);
    }
  },

  /**
   * Create new website
   */
  async create(label: string, config: WebsiteConfig): Promise<Website> {
    try {
      const website: Website = {
        id: crypto.randomUUID(),
        label,
        config,
        prompt_history: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await executeTransaction('readwrite', (store) => store.add(website));

      return website;
    } catch (error) {
      console.error('Error creating website:', error);
      throw toAppError(error);
    }
  },

  /**
   * Update existing website
   */
  async update(
    id: string,
    updates: Partial<Omit<Website, 'id' | 'created_at'>>
  ): Promise<Website | null> {
    try {
      const existing = await this.getById(id);

      if (!existing) {
        throw new NotFoundError('Website', id);
      }

      const updated: Website = {
        ...existing,
        ...updates,
        id, // Ensure ID cannot be changed
        created_at: existing.created_at, // Preserve creation date
        updated_at: new Date().toISOString(),
      };

      await executeTransaction('readwrite', (store) => store.put(updated));

      return updated;
    } catch (error) {
      console.error('Error updating website:', error);

      if (error instanceof NotFoundError) {
        return null;
      }

      throw toAppError(error);
    }
  },

  /**
   * Delete website
   */
  async delete(id: string): Promise<boolean> {
    try {
      const existing = await this.getById(id);

      if (!existing) {
        return false;
      }

      await executeTransaction('readwrite', (store) => store.delete(id));

      return true;
    } catch (error) {
      console.error('Error deleting website:', error);
      throw toAppError(error);
    }
  },

  /**
   * Clear all websites (use with caution)
   */
  async clear(): Promise<void> {
    try {
      await executeTransaction('readwrite', (store) => store.clear());
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
      throw toAppError(error);
    }
  },

  /**
   * Export all websites as JSON (for backup)
   */
  async exportAll(): Promise<string> {
    try {
      const websites = await this.getAll();
      return JSON.stringify(websites, null, 2);
    } catch (error) {
      console.error('Error exporting websites:', error);
      throw toAppError(error);
    }
  },

  /**
   * Import websites from JSON (restore from backup)
   */
  async importAll(jsonData: string): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      const websites: Website[] = JSON.parse(jsonData);

      // Validate data structure
      if (!Array.isArray(websites)) {
        return { success: false, count: 0, error: 'Invalid data format: expected array' };
      }

      // Get existing websites
      const existing = await this.getAll();
      const existingIds = new Set(existing.map((w) => w.id));

      // Filter out duplicates
      const newWebsites = websites.filter((w) => !existingIds.has(w.id));

      // Add new websites
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      for (const website of newWebsites) {
        store.add(website);
      }

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          db.close();
          resolve({ success: true, count: newWebsites.length });
        };

        transaction.onerror = () => {
          db.close();
          reject(new StorageError('Import transaction failed', transaction.error as Error));
        };
      });
    } catch (error) {
      return {
        success: false,
        count: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Check if IndexedDB is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      if (typeof indexedDB === 'undefined') {
        return false;
      }

      // Try to open database
      const db = await openDB();
      db.close();
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get database statistics
   */
  async getStats(): Promise<{ count: number; estimatedSize: number }> {
    try {
      const websites = await this.getAll();
      const count = websites.length;

      // Estimate size (rough approximation)
      const jsonSize = JSON.stringify(websites).length;
      const estimatedSize = jsonSize * 2; // UTF-16 encoding overhead

      return { count, estimatedSize };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { count: 0, estimatedSize: 0 };
    }
  },
};
