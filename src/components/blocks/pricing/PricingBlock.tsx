// ABOUTME: Main Pricing block component with variant routing

import React from 'react';
import { PricingSimple } from './PricingSimple';
import { PricingComparison } from './PricingComparison';
import { PricingContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface PricingBlockProps {
  content: PricingContent;
  settings?: BlockSettings;
  theme?: {
    primaryColor?: string;
  };
}

export function PricingBlock({ content, settings, theme }: PricingBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'simple':
        return <PricingSimple content={content} theme={theme} />;
      case 'comparison':
        return <PricingComparison content={content} theme={theme} />;
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
