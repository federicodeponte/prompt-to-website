// ABOUTME: Main CTA block component with variant routing

import React from 'react';
import { CTASimple } from './CTASimple';
import { CTASplit } from './CTASplit';
import { CTAContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface CTABlockProps {
  content: CTAContent;
  settings?: BlockSettings;
  theme?: {
    primaryColor?: string;
  };
}

export function CTABlock({ content, settings, theme }: CTABlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'simple':
        return <CTASimple content={content} theme={theme} />;
      case 'split':
        return <CTASplit content={content} theme={theme} />;
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
