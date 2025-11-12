// ABOUTME: Main FAQ block component with variant routing

import React from 'react';
import { FAQAccordion } from './FAQAccordion';
import { FAQGrid } from './FAQGrid';
import { FAQContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface FAQBlockProps {
  content: FAQContent;
  settings?: BlockSettings;
}

export function FAQBlock({ content, settings }: FAQBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'accordion':
        return <FAQAccordion content={content} />;
      case 'grid':
        return <FAQGrid content={content} />;
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
