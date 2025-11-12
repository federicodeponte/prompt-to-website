// ABOUTME: Main Contact block component with variant routing

import React from 'react';
import { ContactSimple } from './ContactSimple';
import { ContactSplit } from './ContactSplit';
import { ContactContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface ContactBlockProps {
  content: ContactContent;
  settings?: BlockSettings;
}

export function ContactBlock({ content, settings }: ContactBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'simple':
        return <ContactSimple content={content} />;
      case 'split':
        return <ContactSplit content={content} />;
      default:
        const _exhaustiveCheck: never = content;
        return _exhaustiveCheck;
    }
  };

  return (
    <BlockWrapper settings={settings} id={content.id}>
      {renderVariant()}
    </BlockWrapper>
  );
}
