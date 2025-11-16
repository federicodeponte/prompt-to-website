// ABOUTME: Clean, minimal pricing with shadcn/ui aesthetic
// ABOUTME: Production-quality design matching Inbox Zero and modern SaaS standards

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PricingContentSimple } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface PricingSimpleProps {
  content: PricingContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Clean, minimal pricing with shadcn/ui design
 * Design principles: Whitespace, subtle shadows, professional typography
 */
export function PricingSimple({ content, theme }: PricingSimpleProps) {
  const { heading, subheading, tiers } = content;

  return (
    <div className="space-y-12">
      {/* Header - clean and minimal */}
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        {subheading && (
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">
            {subheading}
          </Badge>
        )}

        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </motion.div>

      {/* Pricing Tiers - clean cards */}
      {tiers && tiers.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              <Card
                className={cn(
                  'relative flex h-full flex-col border shadow-sm transition-shadow hover:shadow-md',
                  tier.highlighted && 'border-primary shadow-md'
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="px-3 py-1 text-xs font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="flex flex-1 flex-col p-6">
                  {/* Tier name and pricing */}
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {tier.name}
                    </h3>
                    <div className="mt-4">
                      <span className="text-4xl font-semibold tracking-tight text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/{tier.period}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features list */}
                  {tier.features && tier.features.length > 0 && (
                    <ul className="mb-6 flex-1 space-y-3 text-sm">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Button */}
                  <Button
                    className="w-full font-medium"
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
