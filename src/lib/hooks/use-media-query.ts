// ABOUTME: React hook for responsive design using CSS media queries
// ABOUTME: Provides mobile/tablet/desktop breakpoint detection with SSR safety

'use client';

import { useState, useEffect } from 'react';

/**
 * useMediaQuery hook for responsive design
 *
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Define listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (modern browsers)
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Common breakpoint helpers
 * Based on Tailwind CSS default breakpoints
 */
export const useBreakpoints = () => {
  const isMobile = useMediaQuery('(max-width: 767px)'); // sm breakpoint
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)'); // md breakpoint
  const isDesktop = useMediaQuery('(min-width: 1024px)'); // lg breakpoint
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)'); // xl breakpoint

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Convenience flags
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop,
  };
};

/**
 * Specific mobile detection hook
 * Matches Tailwind's 'sm' breakpoint (< 640px)
 */
export const useIsMobile = () => {
  return useMediaQuery('(max-width: 639px)');
};

/**
 * Tablet detection hook
 * Matches Tailwind's 'md' to 'lg' range (640px - 1023px)
 */
export const useIsTablet = () => {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
};

/**
 * Desktop detection hook
 * Matches Tailwind's 'lg' and above (>= 1024px)
 */
export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1024px)');
};
