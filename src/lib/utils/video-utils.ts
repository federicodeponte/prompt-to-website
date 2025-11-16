// ABOUTME: Video URL parsing and validation utilities for YouTube and Vimeo embeds
// ABOUTME: Type-safe, defensive programming with comprehensive error handling

/**
 * Supported video platforms
 */
export type VideoProvider = 'youtube' | 'vimeo' | 'unknown';

/**
 * Result type for video URL parsing
 * Using Result pattern instead of throwing errors (functional programming approach)
 */
export interface VideoParseResult {
  success: boolean;
  provider: VideoProvider;
  videoId: string | null;
  error: string | null;
}

/**
 * Parse video URL to extract provider and video ID
 *
 * @param url - Video URL to parse
 * @returns VideoParseResult with success/error information
 *
 * @example
 * parseVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
 * // => { success: true, provider: 'youtube', videoId: 'dQw4w9WgXcQ', error: null }
 */
export function parseVideoUrl(url: string): VideoParseResult {
  // Defensive: validate input
  if (!url || typeof url !== 'string') {
    return {
      success: false,
      provider: 'unknown',
      videoId: null,
      error: 'Invalid URL: must be a non-empty string',
    };
  }

  const trimmedUrl = url.trim();

  // YouTube detection and parsing
  if (trimmedUrl.includes('youtube.com') || trimmedUrl.includes('youtu.be')) {
    let videoId: string | undefined;

    // youtu.be format
    if (trimmedUrl.includes('youtu.be/')) {
      const parts = trimmedUrl.split('youtu.be/')[1];
      videoId = parts?.split('?')[0]?.split('/')[0];
    }
    // youtube.com/watch?v= format
    else if (trimmedUrl.includes('v=')) {
      const parts = trimmedUrl.split('v=')[1];
      videoId = parts?.split('&')[0]?.split('#')[0];
    }
    // youtube.com/embed/ format
    else if (trimmedUrl.includes('/embed/')) {
      const parts = trimmedUrl.split('/embed/')[1];
      videoId = parts?.split('?')[0]?.split('/')[0];
    }

    // Validate extracted ID
    if (!videoId || videoId.length === 0) {
      return {
        success: false,
        provider: 'youtube',
        videoId: null,
        error: 'Invalid YouTube URL: could not extract video ID',
      };
    }

    // YouTube video IDs are typically 11 characters
    if (videoId.length !== 11) {
      return {
        success: false,
        provider: 'youtube',
        videoId: null,
        error: `Invalid YouTube video ID: expected 11 characters, got ${videoId.length}`,
      };
    }

    return {
      success: true,
      provider: 'youtube',
      videoId,
      error: null,
    };
  }

  // Vimeo detection and parsing
  if (trimmedUrl.includes('vimeo.com')) {
    let videoId: string | undefined;

    // vimeo.com/123456 format
    if (trimmedUrl.includes('vimeo.com/')) {
      const parts = trimmedUrl.split('vimeo.com/')[1];
      videoId = parts?.split('?')[0]?.split('/')[0]?.split('#')[0];
    }

    // Validate extracted ID
    if (!videoId || videoId.length === 0) {
      return {
        success: false,
        provider: 'vimeo',
        videoId: null,
        error: 'Invalid Vimeo URL: could not extract video ID',
      };
    }

    // Vimeo IDs should be numeric
    if (!/^\d+$/.test(videoId)) {
      return {
        success: false,
        provider: 'vimeo',
        videoId: null,
        error: 'Invalid Vimeo video ID: must be numeric',
      };
    }

    return {
      success: true,
      provider: 'vimeo',
      videoId,
      error: null,
    };
  }

  // Unknown provider
  return {
    success: false,
    provider: 'unknown',
    videoId: null,
    error: 'Unsupported video provider: only YouTube and Vimeo are supported',
  };
}

/**
 * Generate embed URL for supported video providers
 *
 * @param url - Original video URL
 * @param autoplay - Whether to autoplay the video
 * @returns Embed URL or original URL if parsing fails
 *
 * @example
 * getEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', true)
 * // => 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1'
 */
export function getEmbedUrl(url: string, autoplay: boolean = false): string {
  const parseResult = parseVideoUrl(url);

  if (!parseResult.success || !parseResult.videoId) {
    // Defensive: log error but don't throw - return original URL as fallback
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.warn(`[video-utils] Failed to parse video URL: ${parseResult.error}`, url);
    }
    return url;
  }

  const autoplayParam = autoplay ? '&autoplay=1' : '';

  switch (parseResult.provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${parseResult.videoId}?rel=0${autoplayParam}`;

    case 'vimeo':
      return `https://player.vimeo.com/video/${parseResult.videoId}?${autoplayParam}`;

    default:
      return url;
  }
}

/**
 * Get thumbnail URL for video
 *
 * @param url - Original video URL
 * @param quality - Thumbnail quality ('default' | 'medium' | 'high' | 'standard' | 'maxres')
 * @returns Thumbnail URL or null if not available
 *
 * @example
 * getVideoThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'high')
 * // => 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
 */
export function getVideoThumbnail(
  url: string,
  quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'
): string | null {
  const parseResult = parseVideoUrl(url);

  if (!parseResult.success || !parseResult.videoId) {
    return null;
  }

  switch (parseResult.provider) {
    case 'youtube': {
      // YouTube thumbnail quality mapping
      const qualityMap = {
        default: 'default.jpg',      // 120x90
        medium: 'mqdefault.jpg',     // 320x180
        high: 'hqdefault.jpg',       // 480x360 (always available)
        standard: 'sddefault.jpg',   // 640x480
        maxres: 'maxresdefault.jpg', // 1280x720 (not always available)
      };

      return `https://img.youtube.com/vi/${parseResult.videoId}/${qualityMap[quality]}`;
    }

    case 'vimeo':
      // Vimeo thumbnails require API call - not supported without API key
      // Return null to use poster image instead
      return null;

    default:
      return null;
  }
}

/**
 * Validate if URL is a supported video URL
 *
 * @param url - URL to validate
 * @returns true if URL is a valid YouTube or Vimeo URL
 */
export function isValidVideoUrl(url: string): boolean {
  const parseResult = parseVideoUrl(url);
  return parseResult.success;
}

/**
 * Get video provider from URL
 *
 * @param url - Video URL
 * @returns Video provider type
 */
export function getVideoProvider(url: string): VideoProvider {
  const parseResult = parseVideoUrl(url);
  return parseResult.provider;
}
