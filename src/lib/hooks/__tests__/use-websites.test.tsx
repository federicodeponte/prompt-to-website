import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useWebsites,
  useWebsite,
  useCreateWebsite,
  useUpdateWebsite,
  useDeleteWebsite,
  useGenerateWebsite
} from '../use-websites';
import { Website, WebsiteConfig } from '@/lib/types/website-config';
import { defaultTheme } from '@/lib/theme/defaults';

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

// Mock crypto.randomUUID (using defineProperty because crypto is read-only)
Object.defineProperty(global, 'crypto', {
  value: {
    ...global.crypto,
    randomUUID: vi.fn(() => 'mock-uuid-123') as () => `${string}-${string}-${string}-${string}-${string}`,
  },
  writable: true,
});

// Mock fetch for generateWebsite (still uses API endpoint)
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

// Test wrapper with React Query
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

// Mock data
const mockWebsite: Website = {
  id: '123',
  label: 'Test Website',
  user_id: 'user-1',
  is_favorite: false,
  config: {
    version: '1.0',
    template: 'saas-landing',
    theme: defaultTheme,
    blocks: [],
    metadata: {
      title: 'Test',
      description: 'Test',
      author: 'Test',
    },
  },
  prompt_history: [],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockConfig: WebsiteConfig = mockWebsite.config;

describe('useWebsites', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch websites from localStorage successfully', async () => {
    const websites = [mockWebsite];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(websites));

    const { result } = renderHook(() => useWebsites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(localStorageMock.getItem).toHaveBeenCalledWith('prompt-to-website:websites');
    expect(result.current.data).toEqual(websites);
  });

  it('should return empty array when localStorage is empty', async () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    const { result } = renderHook(() => useWebsites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });
});

describe('useWebsite', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch single website from localStorage successfully', async () => {
    const websites = [mockWebsite];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(websites));

    const { result } = renderHook(() => useWebsite('123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(localStorageMock.getItem).toHaveBeenCalledWith('prompt-to-website:websites');
    expect(result.current.data).toEqual(mockWebsite);
  });

  it('should not fetch when id is null', async () => {
    const { result } = renderHook(() => useWebsite(null), {
      wrapper: createWrapper(),
    });

    expect(localStorageMock.getItem).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it('should handle website not found', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useWebsite('999'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Website not found');
  });
});

describe('useCreateWebsite', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create website in localStorage successfully', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useCreateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      label: 'Test Website',
      config: mockConfig,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(result.current.data?.label).toBe('Test Website');
    expect(result.current.data?.config).toEqual(mockConfig);
    expect(result.current.data?.id).toBe('mock-uuid-123');
  });
});

describe('useUpdateWebsite', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update website in localStorage successfully', async () => {
    const websites = [mockWebsite];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(websites));

    const { result } = renderHook(() => useUpdateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      id: '123',
      label: 'Updated Website',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(result.current.data?.label).toBe('Updated Website');
  });

  it('should handle update error when website not found', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useUpdateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      id: '999',
      label: 'Updated Website',
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Website not found');
  });
});

describe('useDeleteWebsite', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should delete website from localStorage successfully', async () => {
    const websites = [mockWebsite];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(websites));

    const { result } = renderHook(() => useDeleteWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('123');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(localStorageMock.setItem).toHaveBeenCalled();
    const savedData = localStorageMock.setItem.mock.calls[0][1];
    expect(JSON.parse(savedData)).toEqual([]);
  });

  it('should handle delete error when website not found', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useDeleteWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('999');

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Website not found');
  });
});

describe('useGenerateWebsite', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should generate website successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ config: mockConfig }),
    });

    const { result } = renderHook(() => useGenerateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      prompt: 'Create a SaaS landing page',
      template: 'saas-landing',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Create a SaaS landing page',
        template: 'saas-landing',
      }),
    });
    expect(result.current.data).toEqual({ config: mockConfig });
  });

  it('should handle generation error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to generate website' }),
    });

    const { result } = renderHook(() => useGenerateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      prompt: 'Create a SaaS landing page',
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Failed to generate website');
  });
});
