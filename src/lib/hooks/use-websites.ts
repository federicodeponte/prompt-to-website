// ABOUTME: React Query hooks for website CRUD operations
// ABOUTME: Provides type-safe hooks for API interactions with caching and optimistic updates

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Website, WebsiteConfig } from '@/lib/types/website-config';

/**
 * Fetch all websites
 */
async function fetchWebsites(): Promise<Website[]> {
  const response = await fetch('/api/websites');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch websites');
  }
  return response.json();
}

/**
 * Fetch a single website by ID
 */
async function fetchWebsite(id: string): Promise<Website> {
  const response = await fetch(`/api/websites/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch website');
  }
  return response.json();
}

/**
 * Create a new website
 */
async function createWebsite(data: {
  label: string;
  config: WebsiteConfig;
  user_id?: string;
}): Promise<Website> {
  const response = await fetch('/api/websites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create website');
  }

  return response.json();
}

/**
 * Update a website
 */
async function updateWebsite(data: {
  id: string;
  label?: string;
  config?: WebsiteConfig;
  prompt_history?: string[];
}): Promise<Website> {
  const { id, ...updates } = data;
  const response = await fetch(`/api/websites/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update website');
  }

  return response.json();
}

/**
 * Delete a website
 */
async function deleteWebsite(id: string): Promise<void> {
  const response = await fetch(`/api/websites/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete website');
  }
}

/**
 * Generate website from AI prompt
 */
async function generateWebsite(data: {
  prompt: string;
  template?: string;
}): Promise<{ config: WebsiteConfig }> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate website');
  }

  return response.json();
}

/**
 * Hook: Get all websites
 */
export function useWebsites() {
  return useQuery({
    queryKey: ['websites'],
    queryFn: fetchWebsites,
  });
}

/**
 * Hook: Get single website by ID
 */
export function useWebsite(id: string | null) {
  return useQuery({
    queryKey: ['websites', id],
    queryFn: () => fetchWebsite(id!),
    enabled: !!id,
  });
}

/**
 * Hook: Create new website
 */
export function useCreateWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWebsite,
    onSuccess: () => {
      // Invalidate and refetch websites list
      queryClient.invalidateQueries({ queryKey: ['websites'] });
    },
  });
}

/**
 * Hook: Update website
 */
export function useUpdateWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWebsite,
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['websites', variables.id] });

      // Snapshot previous value
      const previousWebsite = queryClient.getQueryData<Website>(['websites', variables.id]);

      // Optimistically update
      if (previousWebsite) {
        queryClient.setQueryData<Website>(['websites', variables.id], {
          ...previousWebsite,
          ...variables,
          updated_at: new Date().toISOString(),
        });
      }

      return { previousWebsite };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousWebsite) {
        queryClient.setQueryData(['websites', variables.id], context.previousWebsite);
      }
    },
    onSettled: (data, error, variables) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['websites', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['websites'] });
    },
  });
}

/**
 * Hook: Delete website
 */
export function useDeleteWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWebsite,
    onSuccess: () => {
      // Invalidate websites list
      queryClient.invalidateQueries({ queryKey: ['websites'] });
    },
  });
}

/**
 * Hook: Generate website with AI
 */
export function useGenerateWebsite() {
  return useMutation({
    mutationFn: generateWebsite,
  });
}
