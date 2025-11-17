// ABOUTME: Custom React hook for undo/redo functionality
// ABOUTME: Maintains history stack with configurable max size

import { useState, useCallback, useRef } from 'react';

interface UseUndoRedoOptions<T> {
  initialValue: T;
  maxHistory?: number; // Default: 50
}

interface UseUndoRedoReturn<T> {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

/**
 * Hook for undo/redo functionality
 *
 * Usage:
 * const { state, setState, undo, redo, canUndo, canRedo } = useUndoRedo({
 *   initialValue: myConfig,
 *   maxHistory: 50
 * });
 */
export function useUndoRedo<T>({
  initialValue,
  maxHistory = 50,
}: UseUndoRedoOptions<T>): UseUndoRedoReturn<T> {
  // History stack: [older ... newer]
  const [history, setHistory] = useState<T[]>([initialValue]);

  // Current position in history (index)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Flag to prevent adding to history during undo/redo operations
  const isUndoRedoRef = useRef(false);

  const state = history[currentIndex];

  const setState = useCallback(
    (newState: T) => {
      // Don't add to history if this is an undo/redo operation
      if (isUndoRedoRef.current) {
        return;
      }

      setHistory((prev) => {
        // Remove any "future" states (anything after current index)
        const newHistory = prev.slice(0, currentIndex + 1);

        // Add new state
        newHistory.push(newState);

        // Limit history size
        if (newHistory.length > maxHistory) {
          newHistory.shift(); // Remove oldest
          return newHistory;
        }

        return newHistory;
      });

      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        return newIndex >= maxHistory ? maxHistory - 1 : newIndex;
      });
    },
    [currentIndex, maxHistory]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoRef.current = true;
      setCurrentIndex((prev) => prev - 1);
      // Reset flag after state update
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      setCurrentIndex((prev) => prev + 1);
      // Reset flag after state update
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
    }
  }, [currentIndex, history.length]);

  const clearHistory = useCallback(() => {
    setHistory([state]);
    setCurrentIndex(0);
  }, [state]);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    clearHistory,
  };
}
