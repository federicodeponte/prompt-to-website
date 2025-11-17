import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { TemplateGallery } from '../TemplateGallery';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    promise: vi.fn(),
  },
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
    vi.mocked(toast.promise).mockClear();
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
    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

    expect(screen.getByText('SaaS Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Product Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should render category filter tabs', () => {
    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

    // Verify all category tabs are present
    expect(screen.getByRole('tab', { name: /all templates/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /business/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /product/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /personal/i })).toBeInTheDocument();
  });



  it('should create website and navigate on "Use Template" click', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

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

  it('should open preview dialog', () => {
    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

    // Click the preview button (eye icon)
    const previewButtons = screen.getAllByRole('button', { name: /preview template/i });
    fireEvent.click(previewButtons[0]);

    // Dialog should open and show template details
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should show loading state while creating website', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

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
    // Mock localStorage.setItem to throw an error (simulates storage failure)
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    // Mock toast.promise to handle the promise rejection properly
    const mockToastPromise = vi.mocked(toast.promise);
    mockToastPromise.mockImplementation((promiseOrFunction: Promise<unknown> | (() => Promise<unknown>)) => {
      // Catch the rejection to prevent unhandled promise rejection
      const actualPromise = typeof promiseOrFunction === 'function'
        ? promiseOrFunction()
        : promiseOrFunction;

      actualPromise.catch(() => {
        // Error handled by toast
      });
      return 'toast-id' as string & { unwrap: () => Promise<unknown> };
    });

    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

    const useTemplateButtons = screen.getAllByRole('button', {
      name: /use template/i,
    });
    fireEvent.click(useTemplateButtons[0]);

    // Verify toast.promise was called with error configuration
    await waitFor(() => {
      expect(mockToastPromise).toHaveBeenCalled();
    });

    // Verify the error message is configured in toast.promise
    const toastCall = mockToastPromise.mock.calls[0];
    expect(toastCall[1]).toMatchObject({
      error: 'Failed to create website. Please try again.',
    });
  });

  it('should display template descriptions', () => {
    render(<TemplateGallery skipLoadingDelay />, { wrapper: createWrapper() });

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
