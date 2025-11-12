// ABOUTME: Main Stats block component with variant routing

import React from 'react';
import { StatsGrid } from './StatsGrid';
import { StatsBar } from './StatsBar';
import { StatsContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface StatsBlockProps {
  content: StatsContent;
  settings?: BlockSettings;
}

export function StatsBlock({ content, settings }: StatsBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'grid':
        return <StatsGrid content={content} />;
      case 'bar':
        return <StatsBar content={content} />;
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
