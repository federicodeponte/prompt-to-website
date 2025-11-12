// ABOUTME: localStorage-based storage layer for websites (replaces Supabase for MVP)
// ABOUTME: Provides CRUD operations for WebsiteConfig with browser persistence

import { WebsiteConfig, Website } from '../types/website-config';

const STORAGE_KEY = 'prompt-to-website:websites';

/**
 * localStorage helper for website data
 * Simple CRUD operations with automatic JSON serialization
 *
 * Principles:
 * - Single Responsibility: Storage operations only
 * - Type Safety: Proper TypeScript typing (uses Website from website-config)
 * - Error Handling: Graceful fallbacks for storage errors
 * - DRY: Reuses Website type instead of duplicating interface
 */
export const websiteStorage = {
  /**
   * Get all websites from localStorage
   */
  getAll(): Website[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  /**
   * Get single website by ID
   */
  getById(id: string): Website | null {
    try {
      const websites = this.getAll();
      return websites.find((w) => w.id === id) || null;
    } catch (error) {
      console.error('Error getting website by ID:', error);
      return null;
    }
  },

  /**
   * Create new website
   */
  create(label: string, config: WebsiteConfig): Website {
    try {
      const website: Website = {
        id: crypto.randomUUID(),
        label,
        config,
        prompt_history: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const websites = this.getAll();
      websites.push(website);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));

      return website;
    } catch (error) {
      console.error('Error creating website:', error);
      throw new Error('Failed to create website');
    }
  },

  /**
   * Update existing website
   */
  update(id: string, updates: Partial<Omit<Website, 'id' | 'created_at'>>): Website | null {
    try {
      const websites = this.getAll();
      const index = websites.findIndex((w) => w.id === id);

      if (index === -1) {
        return null;
      }

      websites[index] = {
        ...websites[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
      return websites[index];
    } catch (error) {
      console.error('Error updating website:', error);
      return null;
    }
  },

  /**
   * Delete website
   */
  delete(id: string): boolean {
    try {
      const websites = this.getAll();
      const filtered = websites.filter((w) => w.id !== id);

      if (filtered.length === websites.length) {
        return false; // Website not found
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting website:', error);
      return false;
    }
  },

  /**
   * Export all websites as JSON (for backup)
   */
  exportAll(): string {
    const websites = this.getAll();
    return JSON.stringify(websites, null, 2);
  },

  /**
   * Import websites from JSON (restore from backup)
   */
  importAll(jsonData: string): { success: boolean; count: number; error?: string } {
    try {
      const websites: Website[] = JSON.parse(jsonData);

      // Validate data structure
      if (!Array.isArray(websites)) {
        return { success: false, count: 0, error: 'Invalid data format: expected array' };
      }

      // Merge with existing data (avoid duplicates by ID)
      const existing = this.getAll();
      const existingIds = new Set(existing.map((w) => w.id));
      const newWebsites = websites.filter((w) => !existingIds.has(w.id));

      const merged = [...existing, ...newWebsites];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

      return { success: true, count: newWebsites.length };
    } catch (error) {
      return {
        success: false,
        count: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
