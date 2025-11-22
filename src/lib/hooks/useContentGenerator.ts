// ABOUTME: React hook for AI content generation with loading states and error handling
// ABOUTME: Provides simple interface for generating website content from business profiles

import { useState } from 'react';
import { BusinessProfile, GeneratedContent } from '@/lib/ai/content-generator';

interface UseContentGeneratorResult {
  generate: (profile: BusinessProfile) => Promise<GeneratedContent | null>;
  isGenerating: boolean;
  error: string | null;
  duration: number | null;
}

export function useContentGenerator(): UseContentGeneratorResult {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const generate = async (profile: BusinessProfile): Promise<GeneratedContent | null> => {
    setIsGenerating(true);
    setError(null);
    setDuration(null);

    try {
      const response = await fetch('/api/content-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setDuration(data.duration);
      return data.content as GeneratedContent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('[useContentGenerator] Error:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generate,
    isGenerating,
    error,
    duration,
  };
}
