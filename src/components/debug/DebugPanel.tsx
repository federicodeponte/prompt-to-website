// ABOUTME: Development-only debug panel for inspecting config, validation, and AI interactions
// ABOUTME: Only renders in development mode, provides JSON viewer and error inspection

'use client';

import React, { useState } from 'react';
import { WebsiteConfig } from '@/lib/types/website-config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Bug,
  ChevronDown,
  ChevronRight,
  Code,
  AlertTriangle,
  CheckCircle,
  Copy,
  X,
} from 'lucide-react';

interface DebugPanelProps {
  config?: WebsiteConfig;
  validationErrors?: Array<{ path: string; message: string }>;
  aiRequestData?: {
    prompt?: string;
    instruction?: string;
    model?: string;
    temperature?: number;
    timestamp?: Date;
  };
  aiResponseData?: {
    rawResponse?: string;
    parsedData?: unknown;
    validationPassed?: boolean;
    timestamp?: Date;
  };
  performanceMetrics?: {
    aiRequestDuration?: number;
    validationDuration?: number;
    totalDuration?: number;
  };
}

type TabType = 'config' | 'validation' | 'ai-request' | 'ai-response' | 'performance';

/**
 * DebugPanel - Development-only debugging interface
 *
 * Features:
 * - Config JSON viewer with syntax highlighting
 * - Validation error inspector
 * - AI request/response viewer
 * - Performance metrics display
 * - Copy to clipboard functionality
 * - Collapsible/expandable sections
 *
 * Only renders in development mode (process.env.NODE_ENV === 'development')
 */
/**
 * DebugPanelContent - Internal component with hooks
 * Separated to comply with React Rules of Hooks
 */
function DebugPanelContent({
  config,
  validationErrors = [],
  aiRequestData,
  aiResponseData,
  performanceMetrics,
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('config');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  /**
   * Copy text to clipboard with visual feedback
   */
  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  /**
   * Format JSON with indentation
   */
  const formatJSON = (data: unknown): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return String(data);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="gap-2 shadow-lg"
          variant="outline"
          aria-label="Open debug panel (development only)"
          aria-expanded={false}
        >
          <Bug className="h-4 w-4" aria-hidden="true" />
          Debug Panel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[600px] max-h-[600px] flex flex-col">
      <Card className="flex flex-col shadow-xl border-2">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4" aria-hidden="true" />
            <h3 className="text-sm font-semibold">Debug Panel</h3>
            <span className="text-xs text-muted-foreground">(Development Only)</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close debug panel"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-muted/30" role="tablist" aria-label="Debug panel sections">
          <TabButton
            active={activeTab === 'config'}
            onClick={() => setActiveTab('config')}
            icon={<Code className="h-3 w-3" />}
            disabled={!config}
          >
            Config
          </TabButton>
          <TabButton
            active={activeTab === 'validation'}
            onClick={() => setActiveTab('validation')}
            icon={
              validationErrors.length > 0 ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <CheckCircle className="h-3 w-3" />
              )
            }
            badge={validationErrors.length > 0 ? validationErrors.length : undefined}
          >
            Validation
          </TabButton>
          <TabButton
            active={activeTab === 'ai-request'}
            onClick={() => setActiveTab('ai-request')}
            disabled={!aiRequestData}
          >
            AI Request
          </TabButton>
          <TabButton
            active={activeTab === 'ai-response'}
            onClick={() => setActiveTab('ai-response')}
            disabled={!aiResponseData}
          >
            AI Response
          </TabButton>
          <TabButton
            active={activeTab === 'performance'}
            onClick={() => setActiveTab('performance')}
            disabled={!performanceMetrics}
          >
            Performance
          </TabButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-background">
          {activeTab === 'config' && config && (
            <DebugSection
              title="WebsiteConfig JSON"
              content={formatJSON(config)}
              onCopy={() => handleCopy(formatJSON(config), 'config')}
              copied={copiedSection === 'config'}
            />
          )}

          {activeTab === 'validation' && (
            <div className="space-y-2">
              {validationErrors.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  No validation errors
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-red-600 mb-3">
                    <AlertTriangle className="h-4 w-4" />
                    {validationErrors.length} validation error(s)
                  </div>
                  {validationErrors.map((error, index) => (
                    <div
                      key={index}
                      className="border rounded-md p-3 bg-red-50 dark:bg-red-950/20"
                    >
                      <div className="font-mono text-xs font-semibold text-red-700 dark:text-red-400">
                        {error.path}
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-300 mt-1">
                        {error.message}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {activeTab === 'ai-request' && aiRequestData && (
            <div className="space-y-3">
              {aiRequestData.prompt && (
                <DebugSection
                  title="Prompt"
                  content={aiRequestData.prompt}
                  onCopy={() => handleCopy(aiRequestData.prompt!, 'prompt')}
                  copied={copiedSection === 'prompt'}
                />
              )}
              {aiRequestData.instruction && (
                <DebugSection
                  title="Instruction"
                  content={aiRequestData.instruction}
                  onCopy={() => handleCopy(aiRequestData.instruction!, 'instruction')}
                  copied={copiedSection === 'instruction'}
                />
              )}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {aiRequestData.model && (
                  <div>
                    <span className="text-muted-foreground">Model:</span>{' '}
                    <span className="font-mono">{aiRequestData.model}</span>
                  </div>
                )}
                {aiRequestData.temperature !== undefined && (
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>{' '}
                    <span className="font-mono">{aiRequestData.temperature}</span>
                  </div>
                )}
                {aiRequestData.timestamp && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Time:</span>{' '}
                    <span className="font-mono">
                      {aiRequestData.timestamp.toISOString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ai-response' && aiResponseData && (
            <div className="space-y-3">
              {aiResponseData.rawResponse && (
                <DebugSection
                  title="Raw Response"
                  content={aiResponseData.rawResponse.substring(0, 1000)}
                  onCopy={() => handleCopy(aiResponseData.rawResponse!, 'raw-response')}
                  copied={copiedSection === 'raw-response'}
                />
              )}
              {aiResponseData.parsedData !== undefined && (
                <DebugSection
                  title="Parsed Data"
                  content={formatJSON(aiResponseData.parsedData)}
                  onCopy={() =>
                    handleCopy(formatJSON(aiResponseData.parsedData), 'parsed-data')
                  }
                  copied={copiedSection === 'parsed-data'}
                />
              )}
              {aiResponseData.validationPassed !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  {aiResponseData.validationPassed ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Validation passed</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">Validation failed</span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && performanceMetrics && (
            <div className="space-y-2">
              {performanceMetrics.aiRequestDuration !== undefined && (
                <MetricRow
                  label="AI Request Duration"
                  value={`${performanceMetrics.aiRequestDuration.toFixed(2)}ms`}
                />
              )}
              {performanceMetrics.validationDuration !== undefined && (
                <MetricRow
                  label="Validation Duration"
                  value={`${performanceMetrics.validationDuration.toFixed(2)}ms`}
                />
              )}
              {performanceMetrics.totalDuration !== undefined && (
                <MetricRow
                  label="Total Duration"
                  value={`${performanceMetrics.totalDuration.toFixed(2)}ms`}
                  highlight
                />
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

/**
 * DebugPanel - Public wrapper component
 *
 * Handles environment check before rendering to comply with Rules of Hooks.
 * Hooks must be called unconditionally - this wrapper ensures the early return
 * happens before any hooks are called in DebugPanelContent.
 */
export function DebugPanel(props: DebugPanelProps) {
  // Early return BEFORE any hooks are called
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Only render content component in development
  return <DebugPanelContent {...props} />;
}

/**
 * Tab button component
 */
function TabButton({
  active,
  onClick,
  children,
  icon,
  badge,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: number;
  disabled?: boolean;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors relative',
        active && 'bg-background border-b-2 border-primary',
        !active && !disabled && 'text-muted-foreground hover:text-foreground',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span aria-hidden="true">{icon}</span>
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center" aria-label={`${badge} errors`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/**
 * Debug section with copy button
 */
function DebugSection({
  title,
  content,
  onCopy,
  copied,
}: {
  title: string;
  content: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-muted-foreground">{title}</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="h-6 px-2 text-xs"
        >
          <Copy className="h-3 w-3 mr-1" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <pre className="text-xs bg-muted/50 rounded-md p-3 overflow-auto max-h-[300px] font-mono border">
        {content}
      </pre>
    </div>
  );
}

/**
 * Metric row component
 */
function MetricRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-2 rounded-md',
        highlight && 'bg-primary/10 font-semibold'
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-mono">{value}</span>
    </div>
  );
}
