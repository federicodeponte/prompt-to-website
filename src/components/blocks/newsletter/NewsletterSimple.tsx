// ABOUTME: Clean newsletter block with professional input styling
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewsletterContentSimple } from '@/lib/types/block-content';
import { Mail } from 'lucide-react';

interface NewsletterSimpleProps {
  content: NewsletterContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

export function NewsletterSimple({ content, theme }: NewsletterSimpleProps) {
  const { heading, description, placeholder, ctaText } = content;

  return (
    <motion.div
      className="mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-theme-heading mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>
      <p className="font-theme-body mb-8 text-base text-muted-foreground leading-relaxed">{description}</p>

      <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <div className="relative flex-1 sm:max-w-md">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder={placeholder}
            className="pl-10 rounded-theme-input"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="bg-theme-primary hover:bg-theme-primary/90 rounded-theme-button shadow-theme-button"
        >
          {ctaText}
        </Button>
      </form>

      <p className="font-theme-body mt-4 text-xs text-muted-foreground">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
}
