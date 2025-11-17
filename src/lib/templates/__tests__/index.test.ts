import { describe, it, expect } from 'vitest';
import { getTemplateById, getAllTemplates, getTemplatesByCategory, templates } from '../index';

describe('Template utilities', () => {
  describe('getTemplateById', () => {
    it('should return template config for valid ID', () => {
      const template = getTemplateById('saas-landing');
      expect(template).toBeDefined();
      expect(template?.template).toBe('saas-landing');
      expect(template?.blocks).toBeDefined();
      expect(template?.blocks.length).toBeGreaterThan(0);
    });

    it('should return null for invalid ID', () => {
      const template = getTemplateById('non-existent-template');
      expect(template).toBeNull();
    });

    it('should return product-landing template', () => {
      const template = getTemplateById('product-landing');
      expect(template).toBeDefined();
      expect(template?.template).toBe('product-landing');
    });

    it('should return portfolio template', () => {
      const template = getTemplateById('portfolio');
      expect(template).toBeDefined();
      expect(template?.template).toBe('portfolio');
    });
  });

  describe('getAllTemplates', () => {
    it('should return all templates', () => {
      const allTemplates = getAllTemplates();
      // Dynamic check - should match actual template count
      expect(allTemplates.length).toBeGreaterThan(0);
      expect(allTemplates).toEqual(templates);
      // Verify we have the core templates
      const templateIds = allTemplates.map(t => t.id);
      expect(templateIds).toContain('saas-landing');
      expect(templateIds).toContain('product-landing');
      expect(templateIds).toContain('portfolio');
    });

    it('should return templates with required metadata', () => {
      const allTemplates = getAllTemplates();
      allTemplates.forEach((template) => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('category');
        expect(template).toHaveProperty('config');
        expect(['business', 'product', 'personal']).toContain(template.category);
      });
    });
  });

  describe('getTemplatesByCategory', () => {
    it('should return all templates when category is "all"', () => {
      const filtered = getTemplatesByCategory('all');
      const allTemplates = getAllTemplates();
      // Should return same count as getAllTemplates()
      expect(filtered).toHaveLength(allTemplates.length);
      expect(filtered).toEqual(allTemplates);
    });

    it('should return only business templates', () => {
      const filtered = getTemplatesByCategory('business');
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((template) => {
        expect(template.category).toBe('business');
      });
    });

    it('should return only product templates', () => {
      const filtered = getTemplatesByCategory('product');
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((template) => {
        expect(template.category).toBe('product');
      });
    });

    it('should return only personal templates', () => {
      const filtered = getTemplatesByCategory('personal');
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((template) => {
        expect(template.category).toBe('personal');
      });
    });
  });

  describe('Template validation', () => {
    it('should have valid WebsiteConfig structure for all templates', () => {
      const allTemplates = getAllTemplates();
      allTemplates.forEach((template) => {
        const config = template.config;
        expect(config.version).toBe('1.0');
        expect(config.template).toBeDefined();
        expect(config.theme).toBeDefined();
        expect(config.theme.colors).toBeDefined();
        expect(config.blocks).toBeInstanceOf(Array);
        expect(config.blocks.length).toBeGreaterThan(0);
      });
    });

    it('should have valid block structure', () => {
      const allTemplates = getAllTemplates();
      allTemplates.forEach((template) => {
        template.config.blocks.forEach((block) => {
          expect(block.id).toBeDefined();
          expect(block.type).toBeDefined();
          expect(block.content).toBeDefined();
        });
      });
    });
  });
});
