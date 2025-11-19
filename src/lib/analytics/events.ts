// ABOUTME: Analytics event tracking helper for Vercel Analytics
// ABOUTME: Type-safe wrapper for tracking key user actions across the app

import { track } from '@vercel/analytics';

/**
 * Analytics event types
 * Add new events here to maintain type safety
 */
export type AnalyticsEvent =
  // AI Generation Events
  | 'ai_generation_started'
  | 'ai_generation_success'
  | 'ai_generation_error'
  | 'ai_edit_started'
  | 'ai_edit_success'
  | 'ai_edit_error'

  // Template Events
  | 'template_selected'
  | 'template_previewed'

  // Project Management Events
  | 'project_created'
  | 'project_duplicated'
  | 'project_deleted'
  | 'project_renamed'
  | 'project_favorited'
  | 'project_unfavorited'

  // Export Events
  | 'export_json'
  | 'export_html'
  | 'export_zip'

  // Auth Events
  | 'auth_signup_started'
  | 'auth_signup_success'
  | 'auth_signup_error'
  | 'auth_login_started'
  | 'auth_login_success'
  | 'auth_login_error'
  | 'auth_logout'

  // Dashboard Events
  | 'dashboard_search'
  | 'dashboard_filter'
  | 'dashboard_sort'

  // Editor Events
  | 'editor_opened'
  | 'editor_block_added'
  | 'editor_block_removed'
  | 'editor_block_reordered';

/**
 * Event properties for additional context
 */
export interface EventProperties {
  // AI Generation
  template?: string;
  prompt_length?: number;
  generation_time_ms?: number;
  error_type?: string;

  // Template
  template_id?: string;
  template_category?: string;

  // Project
  project_id?: string;
  block_count?: number;

  // Export
  export_format?: 'json' | 'html' | 'zip';
  file_size_kb?: number;

  // Auth
  auth_provider?: 'email' | 'google' | 'github';

  // Dashboard
  search_query?: string;
  filter_type?: string;
  sort_by?: string;

  // Editor
  block_type?: string;

  // Generic
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track analytics event with optional properties
 * Only tracks in production to avoid polluting analytics data
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: EventProperties
): void {
  // Only track in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics] Event:', event, properties);
    return;
  }

  try {
    // Filter out undefined values to satisfy Vercel Analytics type requirements
    const cleanedProperties = properties
      ? (Object.fromEntries(
          Object.entries(properties).filter(([, value]) => value !== undefined)
        ) as Record<string, string | number | boolean>)
      : undefined;

    track(event, cleanedProperties);
  } catch (error) {
    // Silently fail - don't break user experience
    console.error('[Analytics] Error tracking event:', error);
  }
}

/**
 * Helper functions for common tracking scenarios
 */
export const analytics = {
  /**
   * Track AI generation workflow
   */
  aiGeneration: {
    started: (template: string, promptLength: number) =>
      trackEvent('ai_generation_started', { template, prompt_length: promptLength }),

    success: (template: string, generationTimeMs: number, blockCount: number) =>
      trackEvent('ai_generation_success', {
        template,
        generation_time_ms: generationTimeMs,
        block_count: blockCount,
      }),

    error: (errorType: string, template?: string) =>
      trackEvent('ai_generation_error', { error_type: errorType, template }),
  },

  /**
   * Track AI editing workflow
   */
  aiEdit: {
    started: (instructionLength: number) =>
      trackEvent('ai_edit_started', { prompt_length: instructionLength }),

    success: (generationTimeMs: number) =>
      trackEvent('ai_edit_success', { generation_time_ms: generationTimeMs }),

    error: (errorType: string) =>
      trackEvent('ai_edit_error', { error_type: errorType }),
  },

  /**
   * Track template interactions
   */
  template: {
    selected: (templateId: string, category: string) =>
      trackEvent('template_selected', { template_id: templateId, template_category: category }),

    previewed: (templateId: string) =>
      trackEvent('template_previewed', { template_id: templateId }),
  },

  /**
   * Track project management actions
   */
  project: {
    created: (templateId: string) =>
      trackEvent('project_created', { template_id: templateId }),

    duplicated: (projectId: string, blockCount: number) =>
      trackEvent('project_duplicated', { project_id: projectId, block_count: blockCount }),

    deleted: (projectId: string) =>
      trackEvent('project_deleted', { project_id: projectId }),

    renamed: (projectId: string) =>
      trackEvent('project_renamed', { project_id: projectId }),

    favorited: (projectId: string) =>
      trackEvent('project_favorited', { project_id: projectId }),

    unfavorited: (projectId: string) =>
      trackEvent('project_unfavorited', { project_id: projectId }),
  },

  /**
   * Track export actions
   */
  export: {
    json: (projectId: string, fileSizeKb: number) =>
      trackEvent('export_json', { project_id: projectId, file_size_kb: fileSizeKb }),

    html: (projectId: string, fileSizeKb: number) =>
      trackEvent('export_html', { project_id: projectId, file_size_kb: fileSizeKb }),

    zip: (projectId: string, fileSizeKb: number) =>
      trackEvent('export_zip', { project_id: projectId, file_size_kb: fileSizeKb }),
  },

  /**
   * Track authentication events
   */
  auth: {
    signupStarted: (provider: 'email' | 'google' | 'github') =>
      trackEvent('auth_signup_started', { auth_provider: provider }),

    signupSuccess: (provider: 'email' | 'google' | 'github') =>
      trackEvent('auth_signup_success', { auth_provider: provider }),

    signupError: (errorType: string, provider: 'email' | 'google' | 'github') =>
      trackEvent('auth_signup_error', { error_type: errorType, auth_provider: provider }),

    loginStarted: (provider: 'email' | 'google' | 'github') =>
      trackEvent('auth_login_started', { auth_provider: provider }),

    loginSuccess: (provider: 'email' | 'google' | 'github') =>
      trackEvent('auth_login_success', { auth_provider: provider }),

    loginError: (errorType: string, provider: 'email' | 'google' | 'github') =>
      trackEvent('auth_login_error', { error_type: errorType, auth_provider: provider }),

    logout: () =>
      trackEvent('auth_logout'),
  },

  /**
   * Track dashboard interactions
   */
  dashboard: {
    search: (query: string, resultCount: number) =>
      trackEvent('dashboard_search', { search_query: query, result_count: resultCount }),

    filter: (filterType: string) =>
      trackEvent('dashboard_filter', { filter_type: filterType }),

    sort: (sortBy: string) =>
      trackEvent('dashboard_sort', { sort_by: sortBy }),
  },

  /**
   * Track editor actions
   */
  editor: {
    opened: (projectId: string, blockCount: number) =>
      trackEvent('editor_opened', { project_id: projectId, block_count: blockCount }),

    blockAdded: (blockType: string) =>
      trackEvent('editor_block_added', { block_type: blockType }),

    blockRemoved: (blockType: string) =>
      trackEvent('editor_block_removed', { block_type: blockType }),

    blockReordered: () =>
      trackEvent('editor_block_reordered'),
  },
};
