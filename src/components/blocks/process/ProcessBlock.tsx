// ABOUTME: Main Process block component with variant routing

import React from 'react';
import { ProcessTimeline } from './ProcessTimeline';
import { ProcessSteps } from './ProcessSteps';
import { ProcessContent } from '@/lib/types/block-content';
import { BlockWrapper } from '../BlockWrapper';
import { BlockSettings } from '@/lib/types/website-config';

interface ProcessBlockProps {
  content: ProcessContent;
  settings?: BlockSettings;
}

export function ProcessBlock({ content, settings }: ProcessBlockProps) {
  const renderVariant = () => {
    switch (content.variant) {
      case 'timeline':
        return <ProcessTimeline content={content} />;
      case 'steps':
        return <ProcessSteps content={content} />;
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
