import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { createStorage } from '../storage';
import { websiteStorage as localStorage } from '../local-storage';
import { indexedDBStorage } from '../indexed-db';
import { WebsiteConfig } from '../../types/website-config';

const mockConfig: WebsiteConfig = {
  version: '1.0',
  template: 'saas-landing',
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  blocks: [],
  metadata: {
    title: 'Test Website',
    description: 'A test website',
  },
};

describe('Unified Storage Manager', () => {
  beforeEach(() => {
    // Clear all storage
    window.localStorage.clear();
    indexedDBStorage.clear();
  });

  afterEach(async () => {
    // Clean up
    window.localStorage.clear();
    await indexedDBStorage.clear();
  });

  describe('Initialization', () => {
    it('should default to IndexedDB strategy', async () => {
      const storage = createStorage();
      await storage.initialize();

      expect(storage.getStrategy()).toBe('indexeddb');
    });

    it('should respect custom strategy', async () => {
      const storage = createStorage({ preferredStrategy: 'localstorage' });
      await storage.initialize();

      expect(storage.getStrategy()).toBe('localstorage');
    });

    it('should only initialize once', async () => {
      const storage = createStorage();

      await storage.initialize();
      await storage.initialize();
      await storage.initialize();

      // Should not throw or cause issues
      expect(storage.getStrategy()).toBe('indexeddb');
    });
  });

  describe('Strategy Pattern', () => {
    it('should use IndexedDB when available', async () => {
      const storage = createStorage({ preferredStrategy: 'indexeddb' });
      await storage.initialize();

      const website = await storage.create('Test', mockConfig);
      expect(website.id).toBeDefined();

      // Verify it's in IndexedDB
      const retrieved = await indexedDBStorage.getById(website.id);
      expect(retrieved).not.toBeNull();
    });

    it('should use localStorage when specified', async () => {
      const storage = createStorage({ preferredStrategy: 'localstorage' });
      await storage.initialize();

      const website = await storage.create('Test', mockConfig);
      expect(website.id).toBeDefined();

      // Verify it's in localStorage
      const retrieved = localStorage.getById(website.id);
      expect(retrieved).not.toBeNull();
    });
  });

  describe('CRUD Operations with IndexedDB', () => {
    let storage: ReturnType<typeof createStorage>;

    beforeEach(async () => {
      storage = createStorage({ preferredStrategy: 'indexeddb' });
      await storage.initialize();
    });

    it('should create a website', async () => {
      const website = await storage.create('Test Site', mockConfig);

      expect(website.id).toBeDefined();
      expect(website.label).toBe('Test Site');
    });

    it('should get all websites', async () => {
      await storage.create('Site 1', mockConfig);
      await storage.create('Site 2', mockConfig);

      const all = await storage.getAll();
      expect(all).toHaveLength(2);
    });

    it('should get website by ID', async () => {
      const created = await storage.create('Test', mockConfig);
      const retrieved = await storage.getById(created.id);

      expect(retrieved?.id).toBe(created.id);
    });

    it('should update website', async () => {
      const created = await storage.create('Original', mockConfig);
      const updated = await storage.update(created.id, { label: 'Updated' });

      expect(updated?.label).toBe('Updated');
    });

    it('should delete website', async () => {
      const created = await storage.create('Test', mockConfig);
      const deleted = await storage.delete(created.id);

      expect(deleted).toBe(true);

      const retrieved = await storage.getById(created.id);
      expect(retrieved).toBeNull();
    });
  });

  describe('CRUD Operations with localStorage', () => {
    let storage: ReturnType<typeof createStorage>;

    beforeEach(async () => {
      storage = createStorage({ preferredStrategy: 'localstorage' });
      await storage.initialize();
    });

    it('should create a website', async () => {
      const website = await storage.create('Test Site', mockConfig);

      expect(website.id).toBeDefined();
      expect(website.label).toBe('Test Site');
    });

    it('should get all websites', async () => {
      await storage.create('Site 1', mockConfig);
      await storage.create('Site 2', mockConfig);

      const all = await storage.getAll();
      expect(all).toHaveLength(2);
    });

    it('should get website by ID', async () => {
      const created = await storage.create('Test', mockConfig);
      const retrieved = await storage.getById(created.id);

      expect(retrieved?.id).toBe(created.id);
    });

    it('should update website', async () => {
      const created = await storage.create('Original', mockConfig);
      const updated = await storage.update(created.id, { label: 'Updated' });

      expect(updated?.label).toBe('Updated');
    });

    it('should delete website', async () => {
      const created = await storage.create('Test', mockConfig);
      const deleted = await storage.delete(created.id);

      expect(deleted).toBe(true);

      const retrieved = await storage.getById(created.id);
      expect(retrieved).toBeNull();
    });
  });

  describe('Migration', () => {
    it('should migrate data from localStorage to IndexedDB', async () => {
      // Setup: Create data in localStorage directly
      const site1 = localStorage.create('Site 1', mockConfig);
      const site2 = localStorage.create('Site 2', mockConfig);
      const localData = localStorage.getAll();

      expect(localData).toHaveLength(2);

      // Create storage with auto-migration enabled
      const storage = createStorage({
        preferredStrategy: 'indexeddb',
        autoMigrate: true,
      });

      await storage.initialize();

      // Verify data migrated to IndexedDB
      const migratedData = await storage.getAll();
      expect(migratedData).toHaveLength(2);

      // Sort by label for comparison (IndexedDB doesn't guarantee order)
      const labels = migratedData.map((w) => w.label).sort();
      expect(labels).toEqual(['Site 1', 'Site 2']);

      // Verify IDs match
      const ids = migratedData.map((w) => w.id).sort();
      expect(ids).toContain(site1.id);
      expect(ids).toContain(site2.id);

      // Verify migration flag set
      expect(window.localStorage.getItem('prompt-to-website:storage-migrated')).toBe('true');
    });

    it('should not migrate if already migrated', async () => {
      // Mark as already migrated
      window.localStorage.setItem('prompt-to-website:storage-migrated', 'true');

      // Create data in localStorage AFTER migration flag
      localStorage.create('New Site', mockConfig);

      const storage = createStorage({
        preferredStrategy: 'indexeddb',
        autoMigrate: true,
      });

      await storage.initialize();

      // Should NOT migrate (migration flag already set)
      const indexedDBData = await indexedDBStorage.getAll();
      expect(indexedDBData).toHaveLength(0);
    });

    it('should skip migration if autoMigrate is false', async () => {
      // Create data in localStorage
      localStorage.create('Site 1', mockConfig);

      const storage = createStorage({
        preferredStrategy: 'indexeddb',
        autoMigrate: false,
      });

      await storage.initialize();

      // Should not migrate
      const indexedDBData = await storage.getAll();
      expect(indexedDBData).toHaveLength(0);
    });

    it('should skip migration if no data in localStorage', async () => {
      const storage = createStorage({
        preferredStrategy: 'indexeddb',
        autoMigrate: true,
      });

      await storage.initialize();

      // Migration flag should be set
      expect(window.localStorage.getItem('prompt-to-website:storage-migrated')).toBe('true');
    });
  });

  describe('Import/Export', () => {
    it('should export data from IndexedDB', async () => {
      const storage = createStorage({ preferredStrategy: 'indexeddb' });
      await storage.initialize();

      await storage.create('Site 1', mockConfig);
      await storage.create('Site 2', mockConfig);

      const exported = await storage.exportAll();
      const parsed = JSON.parse(exported);

      expect(parsed).toHaveLength(2);
    });

    it('should import data to IndexedDB', async () => {
      const storage = createStorage({ preferredStrategy: 'indexeddb' });
      await storage.initialize();

      const websites = [
        {
          id: 'test-1',
          label: 'Imported 1',
          config: mockConfig,
          prompt_history: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      const result = await storage.importAll(JSON.stringify(websites));

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
    });

    it('should export data from localStorage', async () => {
      const storage = createStorage({ preferredStrategy: 'localstorage' });
      await storage.initialize();

      await storage.create('Site 1', mockConfig);
      await storage.create('Site 2', mockConfig);

      const exported = await storage.exportAll();
      const parsed = JSON.parse(exported);

      expect(parsed).toHaveLength(2);
    });
  });

  describe('Statistics', () => {
    it('should return stats with strategy for IndexedDB', async () => {
      const storage = createStorage({ preferredStrategy: 'indexeddb' });
      await storage.initialize();

      await storage.create('Site 1', mockConfig);
      await storage.create('Site 2', mockConfig);

      const stats = await storage.getStats();

      expect(stats.strategy).toBe('indexeddb');
      expect(stats.count).toBe(2);
      expect(stats.estimatedSize).toBeGreaterThan(0);
    });

    it('should return stats with strategy for localStorage', async () => {
      const storage = createStorage({ preferredStrategy: 'localstorage' });
      await storage.initialize();

      await storage.create('Site 1', mockConfig);
      await storage.create('Site 2', mockConfig);

      const stats = await storage.getStats();

      expect(stats.strategy).toBe('localstorage');
      expect(stats.count).toBe(2);
      expect(stats.estimatedSize).toBeGreaterThan(0);
    });
  });

  describe('Reset', () => {
    it('should allow re-initialization', async () => {
      const storage = createStorage({ preferredStrategy: 'indexeddb' });

      await storage.initialize();
      expect(storage.getStrategy()).toBe('indexeddb');

      await storage.reset();
      expect(storage.getStrategy()).toBe('indexeddb');
    });
  });
});
