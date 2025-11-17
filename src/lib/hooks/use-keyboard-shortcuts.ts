// ABOUTME: Reusable hook for registering keyboard shortcuts with platform detection
// ABOUTME: Handles Cmd (Mac) vs Ctrl (Windows/Linux) automatically and provides cleanup

'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  /** Key combination (e.g., 'cmd+s', 'ctrl+k', 'shift+?') */
  key: string;
  /** Callback to execute when shortcut is triggered */
  callback: (event: KeyboardEvent) => void;
  /** Description for help/documentation */
  description?: string;
  /** Whether to prevent default browser behavior */
  preventDefault?: boolean;
  /** Whether to stop event propagation */
  stopPropagation?: boolean;
  /** Whether shortcut is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Platform detection
 */
const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

/**
 * Normalize key combinations to handle platform differences
 * Converts 'mod' to 'cmd' on Mac, 'ctrl' on Windows/Linux
 */
function normalizeKey(key: string): string {
  const normalized = key.toLowerCase();

  // Replace 'mod' with platform-specific modifier
  if (normalized.includes('mod')) {
    return normalized.replace('mod', isMac ? 'meta' : 'ctrl');
  }

  // Convert user-friendly names to event.key values
  return normalized
    .replace('cmd', 'meta')
    .replace('ctrl', 'control')
    .replace('shift', 'shift')
    .replace('alt', 'alt')
    .replace('option', 'alt'); // Mac option key
}

/**
 * Parse key combination into modifier keys and main key
 */
function parseKeyCombo(keyCombo: string): {
  modifiers: Set<string>;
  key: string;
} {
  const normalized = normalizeKey(keyCombo);
  const parts = normalized.split('+').map(p => p.trim());

  const modifiers = new Set<string>();
  let mainKey = '';

  parts.forEach(part => {
    if (['meta', 'control', 'shift', 'alt'].includes(part)) {
      modifiers.add(part);
    } else {
      mainKey = part;
    }
  });

  return { modifiers, key: mainKey };
}

/**
 * Check if keyboard event matches the key combination
 */
function matchesKeyCombo(event: KeyboardEvent, keyCombo: string): boolean {
  const { modifiers, key } = parseKeyCombo(keyCombo);

  // Check main key (case-insensitive)
  const eventKey = event.key.toLowerCase();
  if (eventKey !== key.toLowerCase()) {
    return false;
  }

  // Check modifiers
  const hasMetaKey = event.metaKey;
  const hasCtrlKey = event.ctrlKey;
  const hasShiftKey = event.shiftKey;
  const hasAltKey = event.altKey;

  const requiredMeta = modifiers.has('meta');
  const requiredCtrl = modifiers.has('control');
  const requiredShift = modifiers.has('shift');
  const requiredAlt = modifiers.has('alt');

  return (
    hasMetaKey === requiredMeta &&
    hasCtrlKey === requiredCtrl &&
    hasShiftKey === requiredShift &&
    hasAltKey === requiredAlt
  );
}

/**
 * Hook to register keyboard shortcuts
 *
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   {
 *     key: 'mod+s',
 *     callback: handleSave,
 *     description: 'Save changes',
 *     preventDefault: true,
 *   },
 *   {
 *     key: 'mod+k',
 *     callback: openCommandPalette,
 *     description: 'Open command palette',
 *   },
 * ]);
 * ```
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const shortcutsRef = useRef(shortcuts);

  // Update ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore shortcuts when typing in input fields (unless explicitly allowed)
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.contentEditable === 'true';

    for (const shortcut of shortcutsRef.current) {
      // Skip if disabled
      if (shortcut.enabled === false) {
        continue;
      }

      // Check if key combination matches
      if (matchesKeyCombo(event, shortcut.key)) {
        // Skip if typing in input and shortcut is not a global shortcut
        // Global shortcuts like Cmd+K should work everywhere
        const isGlobalShortcut = shortcut.key.includes('mod+k') ||
                                 shortcut.key.includes('meta+k') ||
                                 shortcut.key.includes('ctrl+k');

        if (isInput && !isGlobalShortcut) {
          continue;
        }

        // Prevent default behavior if specified
        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }

        // Stop propagation if specified
        if (shortcut.stopPropagation) {
          event.stopPropagation();
        }

        // Execute callback
        shortcut.callback(event);

        // Break after first match (shortcuts are prioritized by order)
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Hook to get platform-specific modifier key name for display
 * Returns '⌘' on Mac, 'Ctrl' on Windows/Linux
 */
export function useModifierKey(): string {
  return isMac ? '⌘' : 'Ctrl';
}

/**
 * Format key combination for display
 * Converts 'mod+s' to '⌘S' on Mac, 'Ctrl+S' on Windows/Linux
 */
export function formatKeyCombo(keyCombo: string): string {
  let formatted = keyCombo;

  // Replace 'mod' with platform-specific symbol
  if (isMac) {
    formatted = formatted
      .replace(/mod/gi, '⌘')
      .replace(/cmd/gi, '⌘')
      .replace(/ctrl/gi, '⌃')
      .replace(/alt/gi, '⌥')
      .replace(/option/gi, '⌥')
      .replace(/shift/gi, '⇧');
  } else {
    formatted = formatted
      .replace(/mod/gi, 'Ctrl')
      .replace(/cmd/gi, 'Ctrl')
      .replace(/ctrl/gi, 'Ctrl')
      .replace(/alt/gi, 'Alt')
      .replace(/shift/gi, 'Shift');
  }

  // Capitalize the main key
  const parts = formatted.split('+');
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    parts[parts.length - 1] = lastPart.toUpperCase();
  }

  return parts.join(isMac ? '' : '+');
}
