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
  useGenerateWebsite,
} from '../use-websites';
import { Website, WebsiteConfig } from '@/lib/types/website-config';

// Mock fetch
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
  config: {
    version: '1.0',
    template: 'saas-landing',
    theme: {
      colors: {
        primary: '#000',
        secondary: '#fff',
        background: '#fff',
        text: '#000',
        muted: '#ccc',
      },
      fonts: {
        heading: 'Arial',
        body: 'Arial',
      },
    },
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
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch websites successfully', async () => {
    const websites = [mockWebsite];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => websites,
    });

    const { result } = renderHook(() => useWebsites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith('/api/websites');
    expect(result.current.data).toEqual(websites);
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to fetch' }),
    });

    const { result } = renderHook(() => useWebsites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toContain('Failed to fetch');
  });
});

describe('useWebsite', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch single website successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWebsite,
    });

    const { result } = renderHook(() => useWebsite('123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith('/api/websites/123');
    expect(result.current.data).toEqual(mockWebsite);
  });

  it('should not fetch when id is null', async () => {
    const { result } = renderHook(() => useWebsite(null), {
      wrapper: createWrapper(),
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Website not found' }),
    });

    const { result } = renderHook(() => useWebsite('999'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Website not found');
  });
});

describe('useCreateWebsite', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create website successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWebsite,
    });

    const { result } = renderHook(() => useCreateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      label: 'Test Website',
      config: mockConfig,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith('/api/websites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: 'Test Website',
        config: mockConfig,
      }),
    });
    expect(result.current.data).toEqual(mockWebsite);
  });

  it('should handle create error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to create website' }),
    });

    const { result } = renderHook(() => useCreateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      label: 'Test Website',
      config: mockConfig,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Failed to create website');
  });
});

describe('useUpdateWebsite', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update website successfully', async () => {
    const updatedWebsite = { ...mockWebsite, label: 'Updated Website' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedWebsite,
    });

    const { result } = renderHook(() => useUpdateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      id: '123',
      label: 'Updated Website',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith('/api/websites/123', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: 'Updated Website',
      }),
    });
    expect(result.current.data).toEqual(updatedWebsite);
  });

  it('should handle update error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to update website' }),
    });

    const { result } = renderHook(() => useUpdateWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      id: '123',
      label: 'Updated Website',
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Failed to update website');
  });
});

describe('useDeleteWebsite', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should delete website successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    const { result } = renderHook(() => useDeleteWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('123');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith('/api/websites/123', {
      method: 'DELETE',
    });
  });

  it('should handle delete error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to delete website' }),
    });

    const { result } = renderHook(() => useDeleteWebsite(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('123');

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Failed to delete website');
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
