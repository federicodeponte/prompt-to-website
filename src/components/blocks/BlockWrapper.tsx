// ABOUTME: Reusable wrapper component for all blocks to ensure consistent spacing and layout
// ABOUTME: Implements DRY principle by centralizing common block styling logic

import React from 'react';
import { cn } from '@/lib/utils';
import { BlockSettings } from '@/lib/types/website-config';

interface BlockWrapperProps {
  children: React.ReactNode;
  settings?: BlockSettings;
  className?: string;
  id?: string;
}

/**
 * BlockWrapper component provides consistent spacing, background, and layout
 * for all block components. Centralizes common styling logic (DRY principle).
 *
 * @param children - Block content to wrap
 * @param settings - Optional block-specific settings (spacing, background, etc.)
 * @param className - Additional CSS classes to apply
 * @param id - Optional HTML id for anchor links
 */
export function BlockWrapper({
  children,
  settings,
  className,
  id,
}: BlockWrapperProps) {
  const spacingClasses = {
    tight: 'py-8 md:py-12',
    normal: 'py-12 md:py-16 lg:py-20',
    loose: 'py-16 md:py-24 lg:py-32',
  };

  const spacing = settings?.spacing || 'normal';
  const background = settings?.background;
  const fullWidth = settings?.fullWidth || false;

  return (
    <section
      id={id}
      className={cn(
        spacingClasses[spacing],
        background && `bg-[${background}]`,
        className
      )}
      style={background ? { backgroundColor: background } : undefined}
    >
      <div className={cn(!fullWidth && 'container mx-auto px-4 sm:px-6 lg:px-8')}>
        {children}
      </div>
    </section>
  );
}
