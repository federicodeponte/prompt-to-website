// ABOUTME: Main Gallery block component with variant routing

import React from 'react';
import { GalleryGrid } from './GalleryGrid';
import { GalleryFeatured } from './GalleryFeatured';
import { GalleryContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface GalleryBlockProps {
  content: GalleryContent;
  settings?: BlockSettings;
}

export function GalleryBlock({ content, settings }: GalleryBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'grid':
        return <GalleryGrid content={content} />;
      case 'featured':
        return <GalleryFeatured content={content} />;
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
