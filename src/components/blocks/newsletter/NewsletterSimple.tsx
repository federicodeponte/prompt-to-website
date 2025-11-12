// ABOUTME: Simple newsletter block variant with email capture
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewsletterContentSimple } from '@/lib/types/block-content';

interface NewsletterSimpleProps {
  content: NewsletterContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

export function NewsletterSimple({ content, theme }: NewsletterSimpleProps) {
  const { heading, description, placeholder, ctaText } = content;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <p className="mb-8 text-lg text-muted-foreground">{description}</p>

      <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Input
          type="email"
          placeholder={placeholder}
          className="sm:w-80"
        />
        <Button
          type="submit"
          size="lg"
          style={theme?.primaryColor ? { backgroundColor: theme.primaryColor } : undefined}
        >
          {ctaText}
        </Button>
      </form>
    </div>
  );
}
