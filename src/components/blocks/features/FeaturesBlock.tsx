// ABOUTME: Main Features block component that routes to appropriate variant
// ABOUTME: Implements Strategy pattern for variant selection

import React from 'react';
import { FeaturesGrid } from './FeaturesGrid';
import { FeaturesList } from './FeaturesList';
import { FeaturesContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface FeaturesBlockProps {
  content: FeaturesContent;
  settings?: BlockSettings;
}

/**
 * FeaturesBlock component selects and renders the appropriate features variant
 * Follows Strategy Pattern and Open/Closed Principle
 */
export function FeaturesBlock({ content, settings }: FeaturesBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'grid':
        return <FeaturesGrid content={content} />;
      case 'list':
        return <FeaturesList content={content} />;
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
