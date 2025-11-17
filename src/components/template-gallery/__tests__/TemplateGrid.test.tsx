import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TemplateGrid } from '../TemplateGrid';
import { templates } from '@/lib/templates';
import type { TemplateMetadata } from '@/lib/templates';

// Mock the Tooltip component to avoid Portal issues in tests
vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => <>{children}</>,
  TooltipContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('TemplateGrid', () => {
  const mockGetCategoryIcon = (category: string) => {
    switch (category) {
      case 'business': return '💼';
      case 'product': return '📦';
      case 'personal': return '👤';
      default: return '🌐';
    }
  };

  const mockGetCategoryColor = (category: string) => {
    switch (category) {
      case 'business': return 'bg-blue-500/10 text-blue-700';
      case 'product': return 'bg-purple-500/10 text-purple-700';
      case 'personal': return 'bg-green-500/10 text-green-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const mockOnUseTemplate = vi.fn();

  describe('Loading State', () => {
    it('should render skeleton cards when loading', () => {
      const { container } = render(
        <TemplateGrid
          templates={[]}
          isLoading={true}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      // Should render grid container
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.className).toContain('sm:grid-cols-2');
      expect(grid?.className).toContain('lg:grid-cols-3');

      // Should render multiple skeleton cards
      const skeletonCards = container.querySelectorAll('.animate-pulse');
      expect(skeletonCards.length).toBeGreaterThan(0);
    });
  });

  describe('Empty State', () => {
    it('should show empty message when no templates', () => {
      render(
        <TemplateGrid
          templates={[]}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      expect(screen.getByText(/no templates found/i)).toBeInTheDocument();
    });
  });

  describe('Template Display', () => {
    it('should render all provided templates', () => {
      const testTemplates = templates.slice(0, 3); // Get first 3 templates

      render(
        <TemplateGrid
          templates={testTemplates}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      // Verify all 3 templates are rendered
      testTemplates.forEach((template) => {
        expect(screen.getByText(template.name)).toBeInTheDocument();
        expect(screen.getByText(template.description)).toBeInTheDocument();
      });
    });

    it('should display correct category icons', () => {
      const businessTemplate = templates.find(t => t.category === 'business') as TemplateMetadata;

      render(
        <TemplateGrid
          templates={[businessTemplate]}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      expect(screen.getByText('💼')).toBeInTheDocument();
    });

    it('should display block count and template type', () => {
      const testTemplate = templates[0];

      render(
        <TemplateGrid
          templates={[testTemplate]}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      expect(screen.getByText(`${testTemplate.config.blocks.length} blocks`)).toBeInTheDocument();
    });
  });

  describe('Category Filtering', () => {
    it('should only show business templates when filtered', () => {
      const businessTemplates = templates.filter(t => t.category === 'business');

      render(
        <TemplateGrid
          templates={businessTemplates}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      // Should have business templates
      businessTemplates.forEach((template) => {
        expect(screen.getByText(template.name)).toBeInTheDocument();
      });

      // Should NOT have product or personal templates
      const productTemplates = templates.filter(t => t.category === 'product');
      const personalTemplates = templates.filter(t => t.category === 'personal');

      productTemplates.forEach((template) => {
        expect(screen.queryByText(template.name)).not.toBeInTheDocument();
      });

      personalTemplates.forEach((template) => {
        expect(screen.queryByText(template.name)).not.toBeInTheDocument();
      });
    });

    it('should only show product templates when filtered', () => {
      const productTemplates = templates.filter(t => t.category === 'product');

      render(
        <TemplateGrid
          templates={productTemplates}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      // Should have product templates
      productTemplates.forEach((template) => {
        expect(screen.getByText(template.name)).toBeInTheDocument();
      });

      // Should NOT have business or personal templates
      const businessTemplates = templates.filter(t => t.category === 'business');
      const personalTemplates = templates.filter(t => t.category === 'personal');

      businessTemplates.forEach((template) => {
        expect(screen.queryByText(template.name)).not.toBeInTheDocument();
      });

      personalTemplates.forEach((template) => {
        expect(screen.queryByText(template.name)).not.toBeInTheDocument();
      });
    });

    it('should only show personal templates when filtered', () => {
      const personalTemplates = templates.filter(t => t.category === 'personal');

      render(
        <TemplateGrid
          templates={personalTemplates}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      // Should have personal templates
      personalTemplates.forEach((template) => {
        expect(screen.getByText(template.name)).toBeInTheDocument();
      });

      // Should NOT have business or product templates
      const businessTemplates = templates.filter(t => t.category === 'business');
      const productTemplates = templates.filter(t => t.category === 'product');

      businessTemplates.forEach((template) => {
        expect(screen.queryByText(template.name)).not.toBeInTheDocument();
      });

      productTemplates.forEach((template) => {
        expect(screen.queryByText(template.name)).not.toBeInTheDocument();
      });
    });

    it('should show all templates when no filter applied', () => {
      render(
        <TemplateGrid
          templates={templates}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      // Should have at least one from each category
      expect(screen.getByText('SaaS Landing Page')).toBeInTheDocument(); // business
      expect(screen.getByText('Product Landing Page')).toBeInTheDocument(); // product
      expect(screen.getByText('Portfolio')).toBeInTheDocument(); // personal
    });
  });

  describe('User Interactions', () => {
    it('should call onUseTemplate when "Use Template" clicked', () => {
      const testTemplate = templates[0];

      render(
        <TemplateGrid
          templates={[testTemplate]}
          isLoading={false}
          isPending={false}
          creatingTemplateId={null}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      const useButton = screen.getByRole('button', { name: /use template/i });
      fireEvent.click(useButton);

      expect(mockOnUseTemplate).toHaveBeenCalledWith(testTemplate);
    });

    it('should show loading state for specific template', () => {
      const testTemplate = templates[0];

      render(
        <TemplateGrid
          templates={[testTemplate]}
          isLoading={false}
          isPending={true}
          creatingTemplateId={testTemplate.id}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      expect(screen.getByText(/creating/i)).toBeInTheDocument();
    });

    it('should disable button while creating', () => {
      const testTemplate = templates[0];

      render(
        <TemplateGrid
          templates={[testTemplate]}
          isLoading={false}
          isPending={true}
          creatingTemplateId={testTemplate.id}
          onUseTemplate={mockOnUseTemplate}
          getCategoryIcon={mockGetCategoryIcon}
          getCategoryColor={mockGetCategoryColor}
        />
      );

      const useButton = screen.getByRole('button', { name: /creating/i });
      expect(useButton).toBeDisabled();
    });
  });
});
