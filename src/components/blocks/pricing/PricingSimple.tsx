// ABOUTME: Simple pricing block variant with pricing cards in a grid
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PricingContentSimple } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface PricingSimpleProps {
  content: PricingContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

export function PricingSimple({ content, theme }: PricingSimpleProps) {
  const { heading, subheading, tiers } = content;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h2>
      </div>

      {/* Pricing Tiers */}
      {tiers && tiers.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
          <Card
            key={index}
            className={cn(
              'relative flex flex-col',
              tier.highlighted && 'border-2 border-primary shadow-lg'
            )}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                Popular
              </div>
            )}
            <CardHeader className="text-center">
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">/{tier.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              {tier.features && tier.features.length > 0 && (
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Button
                className="w-full"
                variant={tier.highlighted ? 'default' : 'outline'}
                asChild
                style={
                  tier.highlighted && theme?.primaryColor
                    ? { backgroundColor: theme.primaryColor }
                    : undefined
                }
              >
                <a href={tier.ctaLink}>{tier.ctaText}</a>
              </Button>
            </CardContent>
          </Card>
          ))}
        </div>
      )}
    </div>
  );
}
