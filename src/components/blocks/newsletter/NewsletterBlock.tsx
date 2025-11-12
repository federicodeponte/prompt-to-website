// ABOUTME: Main Newsletter block component

import React from 'react';
import { NewsletterSimple } from './NewsletterSimple';
import { NewsletterContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface NewsletterBlockProps {
  content: NewsletterContent;
  settings?: BlockSettings;
  theme?: {
    primaryColor?: string;
  };
}

export function NewsletterBlock({ content, settings, theme }: NewsletterBlockProps) {
  return (
    <BlockWrapper settings={settings} id={content.id}>
      <NewsletterSimple content={content} theme={theme} />
    </BlockWrapper>
  );
}
