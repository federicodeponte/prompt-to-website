// ABOUTME: AI Mode panel with chat interface for website generation/editing
// ABOUTME: Adapted from LeadForm-Builder pattern for AI-driven configuration

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WebsiteConfig } from '@/lib/types/website-config';
import { cn } from '@/lib/utils';
import { useGenerateWebsite } from '@/lib/hooks/use-websites';

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
      content: 'Welcome! Describe the website you want to create, and I\'ll help you build it.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use React Query mutation for AI generation
  const { mutate: generateWebsite, isPending } = useGenerateWebsite();

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /**
   * Handle sending a new message to AI
   * Calls Gemini API to generate website configuration
   */
  const handleSend = async () => {
    if (!input.trim() || isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const promptText = input.trim();
    setInput('');

    // Call AI generation API
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
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `I've generated a ${data.config.template} website with ${blocksCount} blocks based on your request. Check the preview on the right!`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        },
        onError: (error) => {
          // Add error message
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: `Error: ${error instanceof Error ? error.message : 'Failed to generate website'}. Please try again with a different prompt.`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        },
      }
    );
  };

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
        <h3 className="text-sm font-semibold">AI Assistant</h3>
        <p className="text-xs text-muted-foreground">
          Describe your website and I&apos;ll build it for you
        </p>
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
            {isPending ? 'Generating...' : 'Send'}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
