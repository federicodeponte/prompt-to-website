// ABOUTME: Main Video block component with variant routing

import React from 'react';
import { VideoEmbed } from './VideoEmbed';
import { VideoSplit } from './VideoSplit';
import { VideoContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface VideoBlockProps {
  content: VideoContent;
  settings?: BlockSettings;
}

export function VideoBlock({ content, settings }: VideoBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'embed':
        return <VideoEmbed content={content} />;
      case 'split':
        return <VideoSplit content={content} />;
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
