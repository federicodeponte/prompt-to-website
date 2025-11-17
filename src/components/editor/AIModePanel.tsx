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
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: '__health_check__' }),
        });

        if (response.status === 400) {
          // Expected response for health check (missing prompt is OK)
          setApiConfigured(true);
        } else if (response.status === 500) {
          const data = await response.json();
          if (data.error?.includes('API key')) {
            setApiConfigured(false);
          } else {
            setApiConfigured(true);
          }
        } else {
          setApiConfigured(true);
        }
      } catch (error) {
        console.error('API health check failed:', error);
        setApiConfigured(false);
      }
    }

    checkAPI();
  }, []);

  /**
   * Handle AI errors with helpful messages
   */
  const handleAIError = useCallback((error: unknown, action: 'generating' | 'editing') => {
    console.error(`AI ${action} error:`, error);

    const errorMsg = error instanceof Error ? error.message : `Failed to ${action === 'generating' ? 'generate' : 'edit'} website`;
    let helpText = '';

    if (errorMsg.includes('API key')) {
      helpText = '\n\n🔧 Fix: Add your Gemini API key to .env.local\n1. Get a key from https://aistudio.google.com/app/apikey\n2. Create .env.local file\n3. Add: GEMINI_API_KEY=your_key_here\n4. Restart dev server';
      setApiConfigured(false);
    } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
      helpText = '\n\n🌐 Network error. Check your internet connection and try again.';
    } else if (errorMsg.includes('JSON')) {
      helpText = '\n\n🤖 AI generated invalid response. Try simplifying your prompt.';
    }

    const errorMessage: Message = {
      id: generateId(),
      role: 'system',
      content: `❌ Error: ${errorMsg}${helpText}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
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
      // Edit existing website
      editWebsite(
        {
          config,
          instruction: promptText,
        },
        {
          onSuccess: (data) => {
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
            handleAIError(error, 'editing');
          },
        }
      );
    } else {
      // Generate new website
      generateWebsite(
        {
          prompt: promptText,
          template: config.template,
        },
        {
          onSuccess: (data) => {
            // Update config with AI-generated version
            onConfigUpdate(data.config);

            // Add success message
            const blocksCount = data.config.blocks?.length || 0;
            const assistantMessage: Message = {
              id: generateId(),
              role: 'assistant',
              content: `🎉 I've generated a ${data.config.template} website with ${blocksCount} blocks based on your request. Check the preview on the right!`,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
          },
          onError: (error) => {
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
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your website... (e.g., 'Create a SaaS landing page for a project management tool')"
            disabled={isPending}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isPending || !input.trim()}>
            {isPending
              ? hasExistingWebsite
                ? 'Editing...'
                : 'Generating...'
              : 'Send'}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
