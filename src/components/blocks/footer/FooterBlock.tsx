// ABOUTME: Main Footer block component with variant routing

import React from 'react';
import { FooterSimple } from './FooterSimple';
import { FooterMultiColumn } from './FooterMultiColumn';
import { FooterContent } from '@/lib/types/block-content';
import { BlockSettings } from '@/lib/types/website-config';

interface FooterBlockProps {
  content: FooterContent;
  settings?: BlockSettings;
}

export function FooterBlock({ content }: FooterBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'simple':
        return <FooterSimple content={content} />;
      case 'multi-column':
        return <FooterMultiColumn content={content} />;
      default:
        const _exhaustiveCheck: never = content;
        return _exhaustiveCheck;
    }
  };

  return renderVariant();
}
