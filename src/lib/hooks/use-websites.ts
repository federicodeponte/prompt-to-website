// ABOUTME: React Query hooks for website CRUD operations
// ABOUTME: Uses IndexedDB with localStorage fallback (no backend required)

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Website, WebsiteConfig } from '@/lib/types/website-config';
import { websiteStorage } from '@/lib/storage/storage';
import {
  APIError,
  isAPIErrorResponse,
  GenerateSuccessResponse,
  EditSuccessResponse,
} from '@/lib/types/api-responses';

/**
 * Fetch all websites from storage (IndexedDB with localStorage fallback)
 */
async function fetchWebsites(): Promise<Website[]> {
  return await websiteStorage.getAll();
}

/**
 * Fetch a single website by ID from storage
 */
async function fetchWebsite(id: string): Promise<Website> {
  const website = await websiteStorage.getById(id);
  if (!website) {
    throw new Error('Website not found');
  }
  return website;
}

/**
 * Create a new website in storage
 */
async function createWebsite(data: {
  label: string;
  config: WebsiteConfig;
}): Promise<Website> {
  return await websiteStorage.create(data.label, data.config);
}

/**
 * Update a website in storage
 */
async function updateWebsite(data: {
  id: string;
  label?: string;
  config?: WebsiteConfig;
  prompt_history?: string[];
}): Promise<Website> {
  const { id, ...updates } = data;
  const website = await websiteStorage.update(id, updates);

  if (!website) {
    throw new Error('Website not found');
  }

  return website;
}

/**
 * Delete a website from storage
 */
async function deleteWebsite(id: string): Promise<void> {
  const success = await websiteStorage.delete(id);
  if (!success) {
    throw new Error('Website not found');
  }
}

/**
 * Generate website from AI prompt
 * NOTE: Still uses API endpoint for Gemini AI generation
 *
 * Throws APIError with full error details (message, suggestions) on failure
 */
async function generateWebsite(data: {
  prompt: string;
  template?: string;
}): Promise<GenerateSuccessResponse> {
  const startTime = performance.now();

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const duration = performance.now() - startTime;

  if (!response.ok) {
    const errorData = await response.json();

    // Check if response matches our enhanced error format
    if (isAPIErrorResponse(errorData)) {
      // Throw APIError with full details (preserves suggestions, details, etc.)
      throw new APIError(errorData);
    }

    // Fallback for unexpected error format
    throw new Error(errorData.error || errorData.message || 'Failed to generate website');
  }

  const successData = await response.json();

  // Log performance in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[AI Generation] Completed in ${duration.toFixed(0)}ms`);
  }

  return successData;
}

/**
 * Edit website configuration with AI
 * NOTE: Uses API endpoint for Gemini AI editing
 *
 * Throws APIError with full error details (message, suggestions) on failure
 */
async function editWebsiteWithAI(data: {
  config: WebsiteConfig;
  instruction: string;
}): Promise<EditSuccessResponse> {
  const startTime = performance.now();

  const response = await fetch('/api/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const duration = performance.now() - startTime;

  if (!response.ok) {
    const errorData = await response.json();

    // Check if response matches our enhanced error format
    if (isAPIErrorResponse(errorData)) {
      // Throw APIError with full details (preserves suggestions, details, etc.)
      throw new APIError(errorData);
    }

    // Fallback for unexpected error format
    throw new Error(errorData.error || errorData.message || 'Failed to edit website');
  }

  const successData = await response.json();

  // Log performance in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[AI Editing] Completed in ${duration.toFixed(0)}ms`);
  }

  return successData;
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

/**
 * Hook: Edit website configuration with AI
 */
export function useEditWebsiteWithAI() {
  return useMutation({
    mutationFn: editWebsiteWithAI,
  });
}
