// ABOUTME: AI Mode panel with chat interface for website generation/editing
// ABOUTME: Adapted from LeadForm-Builder pattern for AI-driven configuration

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { WebsiteConfig } from '@/lib/types/website-config';
import { cn } from '@/lib/utils';
import { generateId } from '@/lib/utils/id-generator';
import { useGenerateWebsite, useEditWebsiteWithAI } from '@/lib/hooks/use-websites';
import { APIError } from '@/lib/types/api-responses';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics/events';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIModePanelProps {
  config: WebsiteConfig;
  onConfigUpdate: (newConfig: WebsiteConfig) => void;
}

/**
 * AIModePanel provides a chat interface for AI-powered website editing
 *
 * Architecture:
 * - Chat history display with auto-scroll
 * - Prompt input with loading states
 * - Message differentiation (user vs assistant)
 * - Configuration update integration
 *
 * Principles:
 * - Single Responsibility: Chat UI management only
 * - Separation of Concerns: API calls handled via React Query hooks
 * - Composition: Uses UI primitives from shadcn/ui
 */
export function AIModePanel({ config, onConfigUpdate }: AIModePanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome! I can help you build and edit websites.\n\n✨ Start from scratch: "Create a SaaS landing page for TaskMaster with pricing and testimonials"\n\n🎨 Edit existing: "Make the hero blue", "Add a pricing block", "Change the heading to Welcome Home"\n\n💡 Tip: Be specific for best results!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use React Query mutations for AI generation and editing
  const { mutate: generateWebsite, isPending: isGenerating } = useGenerateWebsite();
  const { mutate: editWebsite, isPending: isEditing } = useEditWebsiteWithAI();

  // Determine if we're editing or generating
  const isPending = isGenerating || isEditing;
  const hasExistingWebsite = config && config.blocks && config.blocks.length > 0;

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /**
   * Check if API is configured on mount
   */
  useEffect(() => {
    async function checkAPI() {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        setApiConfigured(data.configured);
      } catch (error) {
        console.error('API health check failed:', error);
        setApiConfigured(false);
      }
    }

    checkAPI();
  }, []);

  /**
   * Handle AI errors with helpful messages and toast notifications
   */
  const handleAIError = useCallback((error: unknown, action: 'generating' | 'editing') => {
    console.error(`AI ${action} error:`, error);

    // Check if this is our enhanced APIError with suggestions
    if (error instanceof APIError) {
      // Show error message in chat
      const errorMessage: Message = {
        id: generateId(),
        role: 'system',
        content: `❌ ${error.title}: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Show toast with suggestions
      toast.error(error.title, {
        description: (
          <div className="space-y-2">
            <p className="font-medium">{error.message}</p>
            {error.suggestions.length > 0 && (
              <div className="text-xs">
                <p className="font-semibold mb-1">Suggestions:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {error.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ),
        duration: 10000, // 10 seconds to read suggestions
      });

      // Update API configured status if it's an API key error
      if (error.message.includes('API key')) {
        setApiConfigured(false);
      }
    } else {
      // Fallback for non-APIError errors
      const errorMsg = error instanceof Error ? error.message : `Failed to ${action === 'generating' ? 'generate' : 'edit'} website`;

      const errorMessage: Message = {
        id: generateId(),
        role: 'system',
        content: `❌ Error: ${errorMsg}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast.error('Error', {
        description: errorMsg,
        duration: 5000,
      });
    }
  }, []);

  /**
   * Handle sending a new message to AI
   * Uses edit endpoint if website exists, generate endpoint otherwise
   */
  const handleSend = useCallback(async () => {
    if (!input.trim() || isPending) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const promptText = input.trim();
    setInput('');

    // Decide whether to edit or generate
    if (hasExistingWebsite) {
      // Track AI edit started
      const startTime = performance.now();
      analytics.aiEdit.started(promptText.length);

      // Edit existing website
      editWebsite(
        {
          config,
          instruction: promptText,
        },
        {
          onSuccess: (data) => {
            // Track AI edit success
            const duration = performance.now() - startTime;
            analytics.aiEdit.success(Math.round(duration));

            // Update config with AI-edited version
            onConfigUpdate(data.config);

            // Add success message
            const assistantMessage: Message = {
              id: generateId(),
              role: 'assistant',
              content: `✅ I've updated your website based on your request. Check the preview on the right!`,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
          },
          onError: (error) => {
            // Track AI edit error
            const errorType = error instanceof APIError ? error.title : 'Unknown error';
            analytics.aiEdit.error(errorType);
            handleAIError(error, 'editing');
          },
        }
      );
    } else {
      // Track AI generation started
      const startTime = performance.now();
      analytics.aiGeneration.started(config.template, promptText.length);

      // Generate new website
      generateWebsite(
        {
          prompt: promptText,
          template: config.template,
        },
        {
          onSuccess: (data) => {
            // Track AI generation success
            const duration = performance.now() - startTime;
            const blockCount = data.config.blocks?.length || 0;
            analytics.aiGeneration.success(data.config.template, Math.round(duration), blockCount);

            // Update config with AI-generated version
            onConfigUpdate(data.config);

            // Add success message
            const assistantMessage: Message = {
              id: generateId(),
              role: 'assistant',
              content: `🎉 I've generated a ${data.config.template} website with ${blockCount} blocks based on your request. Check the preview on the right!`,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
          },
          onError: (error) => {
            // Track AI generation error
            const errorType = error instanceof APIError ? error.title : 'Unknown error';
            analytics.aiGeneration.error(errorType, config.template);
            handleAIError(error, 'generating');
          },
        }
      );
    }
  }, [input, isPending, hasExistingWebsite, config, onConfigUpdate, editWebsite, generateWebsite, handleAIError]);

  /**
   * Handle Enter key to send message
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">
              {hasExistingWebsite
                ? '🎨 Editing mode - I can modify your existing website'
                : '✨ Creation mode - Describe your website and I\'ll build it'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {apiConfigured === null && (
              <Badge variant="secondary" className="text-xs">
                Checking...
              </Badge>
            )}
            {apiConfigured === true && (
              <Badge variant="default" className="bg-green-500 text-xs">
                ✓ Ready
              </Badge>
            )}
            {apiConfigured === false && (
              <Badge variant="destructive" className="text-xs">
                ⚠ Not Configured
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-muted/50 border border-dashed'
                )}
              >
                {message.role !== 'user' && (
                  <div className="mb-1 text-xs font-semibold opacity-70">
                    {message.role === 'assistant' ? 'AI' : 'System'}
                  </div>
                )}
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="mt-1 text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t p-4">
        <label htmlFor="ai-prompt-input" className="sr-only">
          AI prompt: Describe your website or request changes
        </label>
        <div className="flex gap-2">
          <Input
            id="ai-prompt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your website... (e.g., 'Create a SaaS landing page for a project management tool')"
            disabled={isPending}
            className="flex-1"
            aria-label="AI prompt input"
          />
          <Button onClick={handleSend} disabled={isPending || !input.trim()} aria-label={isPending ? "Processing request" : "Send AI request"}>
            {isPending
              ? hasExistingWebsite
                ? 'Editing...'
                : 'Generating...'
              : 'Send'}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground" id="ai-prompt-hint">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
