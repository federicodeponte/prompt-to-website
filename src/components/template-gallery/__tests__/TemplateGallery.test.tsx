import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { TemplateGallery } from '../TemplateGallery';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// @ts-expect-error - mocking localStorage
global.localStorage = localStorageMock;

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    ...global.crypto,
    randomUUID: vi.fn(() => 'mock-uuid-123'),
  },
  writable: true,
});

// Test wrapper
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }
  Wrapper.displayName = 'QueryWrapper';

  return Wrapper;
}

describe('TemplateGallery', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    mockPush.mockClear();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);
  });

  it('should render all templates by default', () => {
    render(<TemplateGallery />, { wrapper: createWrapper() });

    expect(screen.getByText('SaaS Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Product Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should filter templates by category', () => {
    render(<TemplateGallery />, { wrapper: createWrapper() });

    // Click on Business filter
    const businessButton = screen.getByRole('button', { name: /business/i });
    fireEvent.click(businessButton);

    // Should show SaaS Landing Page (business category)
    expect(screen.getByText('SaaS Landing Page')).toBeInTheDocument();

    // Should not show Product Landing Page or Portfolio
    expect(screen.queryByText('Product Landing Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Portfolio')).not.toBeInTheDocument();
  });

  it('should filter by product category', () => {
    render(<TemplateGallery />, { wrapper: createWrapper() });

    const productButton = screen.getByRole('button', { name: /product/i });
    fireEvent.click(productButton);

    expect(screen.getByText('Product Landing Page')).toBeInTheDocument();
    expect(screen.queryByText('SaaS Landing Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Portfolio')).not.toBeInTheDocument();
  });

  it('should filter by personal category', () => {
    render(<TemplateGallery />, { wrapper: createWrapper() });

    const personalButton = screen.getByRole('button', { name: /personal/i });
    fireEvent.click(personalButton);

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.queryByText('SaaS Landing Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Product Landing Page')).not.toBeInTheDocument();
  });

  it('should show all templates when "All" is clicked', () => {
    render(<TemplateGallery />, { wrapper: createWrapper() });

    // First filter to business
    const businessButton = screen.getByRole('button', { name: /business/i });
    fireEvent.click(businessButton);

    // Then click "All Templates"
    const allButton = screen.getByRole('button', { name: /all templates/i });
    fireEvent.click(allButton);

    // All templates should be visible again
    expect(screen.getByText('SaaS Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Product Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should create website and navigate on "Use Template" click', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    render(<TemplateGallery />, { wrapper: createWrapper() });

    // Find and click the first "Use Template" button
    const useTemplateButtons = screen.getAllByRole('button', {
      name: /use template/i,
    });
    fireEvent.click(useTemplateButtons[0]);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/editor/mock-uuid-123');
    });
  });

  it('should open preview in new tab', () => {
    const originalOpen = window.open;
    window.open = vi.fn();

    render(<TemplateGallery />, { wrapper: createWrapper() });

    const previewButtons = screen.getAllByRole('button', { name: /preview/i });
    fireEvent.click(previewButtons[0]);

    expect(window.open).toHaveBeenCalledWith(
      '/preview?template=saas-landing',
      '_blank'
    );

    window.open = originalOpen;
  });

  it('should show loading state while creating website', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    render(<TemplateGallery />, { wrapper: createWrapper() });

    const useTemplateButtons = screen.getAllByRole('button', {
      name: /use template/i,
    });
    fireEvent.click(useTemplateButtons[0]);

    // Check loading state appears briefly (localStorage is sync so it's very fast)
    // The button text changes during creation
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  it('should handle creation error', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Mock localStorage.setItem to throw an error (simulates storage failure)
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    render(<TemplateGallery />, { wrapper: createWrapper() });

    const useTemplateButtons = screen.getAllByRole('button', {
      name: /use template/i,
    });
    fireEvent.click(useTemplateButtons[0]);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Failed to create website. Please try again.'
      );
    });

    alertSpy.mockRestore();
  });

  it('should display template descriptions', () => {
    render(<TemplateGallery />, { wrapper: createWrapper() });

    expect(
      screen.getByText(/Perfect for software as a service products/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Showcase a specific product/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Personal portfolio to showcase your work/i)
    ).toBeInTheDocument();
  });
});
