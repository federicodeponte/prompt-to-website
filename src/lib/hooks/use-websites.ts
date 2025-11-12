// ABOUTME: React Query hooks for website CRUD operations
// ABOUTME: Uses localStorage for MVP (no backend required)

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Website, WebsiteConfig } from '@/lib/types/website-config';
import { websiteStorage } from '@/lib/storage/local-storage';

/**
 * Fetch all websites from localStorage
 */
async function fetchWebsites(): Promise<Website[]> {
  // Simulate async for React Query compatibility
  return Promise.resolve(websiteStorage.getAll());
}

/**
 * Fetch a single website by ID from localStorage
 */
async function fetchWebsite(id: string): Promise<Website> {
  const website = websiteStorage.getById(id);
  if (!website) {
    throw new Error('Website not found');
  }
  return Promise.resolve(website);
}

/**
 * Create a new website in localStorage
 */
async function createWebsite(data: {
  label: string;
  config: WebsiteConfig;
}): Promise<Website> {
  const website = websiteStorage.create(data.label, data.config);
  return Promise.resolve(website);
}

/**
 * Update a website in localStorage
 */
async function updateWebsite(data: {
  id: string;
  label?: string;
  config?: WebsiteConfig;
  prompt_history?: string[];
}): Promise<Website> {
  const { id, ...updates } = data;
  const website = websiteStorage.update(id, updates);

  if (!website) {
    throw new Error('Website not found');
  }

  return Promise.resolve(website);
}

/**
 * Delete a website from localStorage
 */
async function deleteWebsite(id: string): Promise<void> {
  const success = websiteStorage.delete(id);
  if (!success) {
    throw new Error('Website not found');
  }
  return Promise.resolve();
}

/**
 * Generate website from AI prompt
 * NOTE: Still uses API endpoint for Gemini AI generation
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
