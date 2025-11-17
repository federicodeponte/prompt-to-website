// ABOUTME: Main editor layout with resizable split-pane (editing panel + preview)
// ABOUTME: Follows LeadForm-Builder pattern with dual-mode editing (AI + Manual)

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { WebsiteConfig } from '@/lib/types/website-config';
import { AIModePanel } from './AIModePanel';
import { ManualModePanel } from './ManualModePanel';
import { ThemeModePanel } from './ThemeModePanel';
import { PreviewPane } from './PreviewPane';
import { useUpdateWebsite } from '@/lib/hooks/use-websites';
import { Save, CheckCircle2, Download, Undo2, Redo2, FileJson } from 'lucide-react';
import { exportToHTML, downloadHTML } from '@/lib/export/html-exporter';
import { exportToJSON, downloadJSON } from '@/lib/export/json-exporter';

interface EditorLayoutProps {
  initialConfig: WebsiteConfig;
  websiteId: string;
}

/**
 * EditorLayout provides a split-pane interface for website editing
 *
 * Architecture:
 * - Left pane (40%): Editing modes (AI chat or Manual forms)
 * - Right pane (60%): Live preview of website
 * - Resizable divider between panes
 *
 * Principles:
 * - Single Responsibility: Layout orchestration only
 * - Open/Closed: Easy to add new editing modes via tabs
 * - Composition: Child components handle specific functionality
 */
export function EditorLayout({ initialConfig, websiteId }: EditorLayoutProps) {
  // Normalize config to ensure blocks is always an array (defensive programming)
  const normalizedConfig: WebsiteConfig = {
    ...initialConfig,
    blocks: initialConfig.blocks || [],
  };

  const [activeMode, setActiveMode] = useState<'ai' | 'manual' | 'theme'>('ai');
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [isSaving, setIsSaving] = useState(false);

  // React Query mutation for updating website
  const { mutate: updateWebsite, isPending: isUpdating } = useUpdateWebsite();

  // Debounce timer ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Undo/Redo functionality
  const [config, setConfigInternal] = useState<WebsiteConfig>(normalizedConfig);
  const [history, setHistory] = useState<WebsiteConfig[]>([normalizedConfig]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const setConfig = (newConfig: WebsiteConfig) => {
    setConfigInternal(newConfig);

    // Add to history (remove any "future" states)
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newConfig);

      // Limit history to 50 items
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });

    setHistoryIndex(prev => Math.min(prev + 1, 49));
  };

  const undo = () => {
    if (canUndo) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setConfigInternal(history[newIndex]);

      // Trigger save with undo state
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        handleSave(history[newIndex]);
      }, 1000);
    }
  };

  const redo = () => {
    if (canRedo) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setConfigInternal(history[newIndex]);

      // Trigger save with redo state
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        handleSave(history[newIndex]);
      }, 1000);
    }
  };

  /**
   * Handle configuration updates from either AI or Manual mode
   * Triggers auto-save with debouncing (3 seconds)
   */
  const handleConfigUpdate = (newConfig: WebsiteConfig) => {
    setConfig(newConfig);

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for auto-save (3 second debounce)
    saveTimeoutRef.current = setTimeout(() => {
      handleSave(newConfig);
    }, 3000);
  };

  /**
   * Save configuration to database
   */
  const handleSave = (configToSave: WebsiteConfig = config) => {
    setIsSaving(true);
    updateWebsite(
      {
        id: websiteId,
        config: configToSave,
      },
      {
        onSuccess: () => {
          setLastSaved(new Date());
          setIsSaving(false);
        },
        onError: (error) => {
          console.error('Failed to save:', error);
          setIsSaving(false);
        },
      }
    );
  };

  /**
   * Manual save trigger
   */
  const handleManualSave = () => {
    // Clear debounce timer
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    handleSave();
  };

  /**
   * Export website as standalone HTML file
   */
  const handleExportHTML = () => {
    const html = exportToHTML(config);
    const filename = `${config.metadata.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    downloadHTML(html, filename);
  };

  /**
   * Export website configuration as JSON
   */
  const handleExportJSON = () => {
    const filename = `${config.metadata.title.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    downloadJSON(config, filename);
  };

  /**
   * Keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Cmd/Ctrl + Z: Undo
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Cmd/Ctrl + Shift + Z: Redo (also Cmd/Ctrl + Y)
      if ((cmdOrCtrl && e.key === 'z' && e.shiftKey) || (cmdOrCtrl && e.key === 'y')) {
        e.preventDefault();
        redo();
      }

      // Cmd/Ctrl + S: Save
      if (cmdOrCtrl && e.key === 's') {
        e.preventDefault();
        handleManualSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  /**
   * Cleanup timeout on unmount
   */
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Website Editor</h1>
            <p className="text-sm text-muted-foreground">
              ID: {websiteId}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Save status indicator */}
            {isSaving || isUpdating ? (
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Save className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}

            {/* Undo/Redo buttons */}
            <div className="flex items-center gap-1 border-r pr-3">
              <Button
                onClick={undo}
                disabled={!canUndo}
                variant="ghost"
                size="sm"
                title="Undo (Cmd+Z)"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                onClick={redo}
                disabled={!canRedo}
                variant="ghost"
                size="sm"
                title="Redo (Cmd+Shift+Z)"
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Manual save button */}
            <Button
              onClick={handleManualSave}
              disabled={isSaving || isUpdating}
              variant="outline"
              size="sm"
              title="Save (Cmd+S)"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>

            {/* Export buttons */}
            <Button
              onClick={handleExportHTML}
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Export HTML
            </Button>
            <Button
              onClick={handleExportJSON}
              variant="outline"
              size="sm"
            >
              <FileJson className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </div>
      </header>

      {/* Split-pane layout */}
      <PanelGroup direction="horizontal" className="flex-1">
        {/* Left pane: Editing modes */}
        <Panel defaultSize={40} minSize={30} maxSize={60}>
          <div className="h-full overflow-hidden border-r bg-background">
            <Tabs
              value={activeMode}
              onValueChange={(value) => setActiveMode(value as 'ai' | 'manual' | 'theme')}
              className="flex h-full flex-col"
            >
              {/* Mode selector tabs */}
              <div className="border-b px-4 pt-4">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="ai">
                    AI Mode
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    Manual Mode
                  </TabsTrigger>
                  <TabsTrigger value="theme">
                    Theme
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-hidden">
                <TabsContent value="ai" className="h-full m-0 p-0">
                  {/* AI Mode Panel - Chat interface */}
                  <AIModePanel
                    config={config}
                    onConfigUpdate={handleConfigUpdate}
                  />
                </TabsContent>

                <TabsContent value="manual" className="h-full m-0 p-0">
                  {/* Manual Mode Panel - Form editor */}
                  <ManualModePanel
                    config={config}
                    onConfigUpdate={handleConfigUpdate}
                  />
                </TabsContent>

                <TabsContent value="theme" className="h-full m-0 p-0">
                  {/* Theme Mode Panel - Theme customization */}
                  <ThemeModePanel
                    config={config}
                    onConfigUpdate={handleConfigUpdate}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Panel>

        {/* Resize handle */}
        <PanelResizeHandle className="w-2 bg-border hover:bg-primary/20 transition-colors" />

        {/* Right pane: Live preview */}
        <Panel defaultSize={60} minSize={40}>
          <PreviewPane config={config} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
