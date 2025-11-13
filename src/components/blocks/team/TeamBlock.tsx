// ABOUTME: Main Team block component that routes to appropriate variant
// ABOUTME: Implements Strategy pattern for variant selection

import React from 'react';
import { TeamGrid } from './TeamGrid';
import { TeamList } from './TeamList';
import { TeamContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface TeamBlockProps {
  content: TeamContent;
  settings?: BlockSettings;
}

/**
 * TeamBlock component selects and renders the appropriate team variant
 * Follows Strategy Pattern and Open/Closed Principle
 */
export function TeamBlock({ content, settings }: TeamBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'grid':
        return <TeamGrid content={content} />;
      case 'list':
        return <TeamList content={content} />;
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
