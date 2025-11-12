// ABOUTME: Comparison pricing block variant (simplified for MVP)
// ABOUTME: Renders same as simple pricing for now, can be enhanced later

import React from 'react';
import { PricingContentComparison } from '@/lib/types/block-content';
import { PricingSimple } from './PricingSimple';

interface PricingComparisonProps {
  content: PricingContentComparison;
  theme?: {
    primaryColor?: string;
  };
}

export function PricingComparison({ content, theme }: PricingComparisonProps) {
  // For MVP, render as simple pricing
  // Can be enhanced later with comparison table
  // Convert comparison content to simple format
  const simpleContent = {
    ...content,
    variant: 'simple' as const,
  };
  return <PricingSimple content={simpleContent} theme={theme} />;
}
