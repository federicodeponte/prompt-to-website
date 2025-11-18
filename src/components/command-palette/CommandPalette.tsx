// ABOUTME: Command palette component for quick access to app actions and navigation
// ABOUTME: Inspired by VS Code command palette with fuzzy search and keyboard navigation

'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Search,
  Home,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Command definition
 */
export interface Command {
  /** Unique command ID */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Command category */
  category?: string;
  /** Action to execute */
  action: () => void;
  /** Whether command is enabled */
  enabled?: boolean;
}

interface CommandPaletteProps {
  /** Whether palette is open */
  open: boolean;
  /** Callback when palette closes */
  onClose: () => void;
  /** List of available commands */
  commands: Command[];
}

/**
 * Simple fuzzy match function
 * Returns true if all characters in query appear in text in order
 */
function fuzzyMatch(text: string, query: string): boolean {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  let textIndex = 0;
  let queryIndex = 0;

  while (textIndex < textLower.length && queryIndex < queryLower.length) {
    if (textLower[textIndex] === queryLower[queryIndex]) {
      queryIndex++;
    }
    textIndex++;
  }

  return queryIndex === queryLower.length;
}

/**
 * Command Palette Component
 *
 * Features:
 * - Fuzzy search filtering
 * - Keyboard navigation (arrow keys)
 * - Execute with Enter
 * - Close with Escape
 * - Categories for organization
 */
export function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) {
      return commands.filter(cmd => cmd.enabled !== false);
    }

    return commands.filter(cmd => {
      if (cmd.enabled === false) {
        return false;
      }

      const searchText = `${cmd.label} ${cmd.description || ''} ${cmd.category || ''}`;
      return fuzzyMatch(searchText, query);
    });
  }, [commands, query]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {};

    filteredCommands.forEach(cmd => {
      const category = cmd.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(cmd);
    });

    return groups;
  }, [filteredCommands]);

  // Reset selection when filtered commands change
  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  // Focus input when opened
  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Execute selected command
  const executeCommand = (command: Command) => {
    command.action();
    onClose();
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        break;

      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;

      case 'Enter':
        event.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        onClose();
        break;

      default:
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            role="combobox"
            aria-expanded={true}
            aria-controls="command-list"
            aria-autocomplete="list"
            aria-label="Search commands"
            aria-activedescendant={filteredCommands[selectedIndex]?.id}
          />
        </div>

        {/* Live region for result count */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} available
        </div>

        {/* Commands List */}
        <div
          id="command-list"
          ref={listRef}
          className="max-h-[400px] overflow-y-auto"
          role="listbox"
          aria-label="Available commands"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground" role="status" aria-live="polite">
              No commands found
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, cmds]) => (
              <div key={category} className="p-2">
                {/* Category Header */}
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {category}
                </div>

                {/* Commands in Category */}
                {cmds.map((command, index) => {
                  const globalIndex = filteredCommands.indexOf(command);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={command.id}
                      id={command.id}
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected}
                      onClick={() => executeCommand(command)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-md px-2 py-2.5 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        isSelected && 'bg-accent text-accent-foreground'
                      )}
                    >
                      {/* Icon */}
                      {command.icon && (
                        <command.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      )}

                      {/* Label & Description */}
                      <div className="flex-1 text-left">
                        <div className="font-medium">{command.label}</div>
                        {command.description && (
                          <div className="text-xs text-muted-foreground">
                            {command.description}
                          </div>
                        )}
                      </div>

                      {/* Keyboard Shortcut */}
                      {command.shortcut && (
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          {command.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="border-t px-4 py-2 text-xs text-muted-foreground">
          <span>↑↓ Navigate</span>
          <span className="mx-2">·</span>
          <span>Enter Execute</span>
          <span className="mx-2">·</span>
          <span>Esc Close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook to create default command set for the app
 */
export function useDefaultCommands() {
  const router = useRouter();

  const commands: Command[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Go to Home',
      description: 'Navigate to homepage',
      icon: Home,
      category: 'Navigation',
      action: () => router.push('/'),
      shortcut: 'G H',
    },

    // Help
    {
      id: 'help-shortcuts',
      label: 'Show Keyboard Shortcuts',
      description: 'View all available shortcuts',
      icon: HelpCircle,
      category: 'Help',
      action: () => {
        // TODO: Implement shortcuts help dialog
        console.log('Show shortcuts help');
      },
      shortcut: '?',
    },
  ];

  return commands;
}
