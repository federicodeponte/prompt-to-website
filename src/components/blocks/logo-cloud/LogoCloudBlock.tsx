// ABOUTME: Main Logo Cloud block component with variant routing

import React from 'react';
import { LogoCloudGrid } from './LogoCloudGrid';
import { LogoCloudCarousel } from './LogoCloudCarousel';
import { LogoCloudContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface LogoCloudBlockProps {
  content: LogoCloudContent;
  settings?: BlockSettings;
}

export function LogoCloudBlock({ content, settings }: LogoCloudBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'grid':
        return <LogoCloudGrid content={content} />;
      case 'carousel':
        return <LogoCloudCarousel content={content} />;
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
