// ABOUTME: React Query hooks for website CRUD operations
// ABOUTME: Uses Supabase backend with real-time database and auth

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Website, WebsiteConfig } from '@/lib/types/website-config';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/database.types';
import {
  APIError,
  isAPIErrorResponse,
  GenerateSuccessResponse,
  EditSuccessResponse,
} from '@/lib/types/api-responses';

/**
 * Fetch all websites for the authenticated user from Supabase
 */
async function fetchWebsites(): Promise<Website[]> {
  const supabase = createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;

  // Type adapter: Database types use Json, we transform to WebsiteConfig at boundary
  // This maintains separation of concerns - database layer stays generic
  return data as unknown as Website[];
}

/**
 * Fetch a single website by ID from Supabase
 */
async function fetchWebsite(id: string): Promise<Website> {
  const supabase = createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Website not found');

  // Type adapter: Transform Json to WebsiteConfig at data access boundary
  return data as unknown as Website;
}

/**
 * Create a new website in Supabase
 */
async function createWebsite(data: {
  label: string;
  config: WebsiteConfig;
}): Promise<Website> {
  const supabase = createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to create a website');

  const { data: website, error } = await supabase
    .from('websites')
    .insert({
      user_id: user.id,
      label: data.label,
      config: data.config as unknown as Database['public']['Tables']['websites']['Insert']['config'],
    })
    .select()
    .single();

  if (error) throw error;
  // Type adapter: Transform Json to WebsiteConfig at data access boundary
  return website as unknown as Website;
}

/**
 * Update a website in Supabase
 */
async function updateWebsite(data: {
  id: string;
  label?: string;
  config?: WebsiteConfig;
  prompt_history?: string[];
  is_favorite?: boolean;
}): Promise<Website> {
  const supabase = createClient();
  if (!supabase) throw new Error('Database not configured');

  const { id, ...updates } = data;

  const { data: website, error } = await supabase
    .from('websites')
    .update(updates as unknown as Database['public']['Tables']['websites']['Update'])
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  if (!website) throw new Error('Website not found');

  // Type adapter: Transform Json to WebsiteConfig at data access boundary
  return website as unknown as Website;
}

/**
 * Delete a website from Supabase
 */
async function deleteWebsite(id: string): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error('Database not configured');

  const { error } = await supabase
    .from('websites')
    .delete()
    .eq('id', id);

  if (error) throw error;
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
