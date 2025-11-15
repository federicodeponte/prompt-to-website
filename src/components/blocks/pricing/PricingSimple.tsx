// ABOUTME: Premium simple pricing with Framer Motion animations and gradient accents
// ABOUTME: Production-quality design with staggered entrance and enhanced popular badge

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { PricingContentSimple } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';

interface PricingSimpleProps {
  content: PricingContentSimple;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Premium simple pricing with animations and modern design
 * Features: Staggered entrance, gradient popular badge, hover effects, badge component
 */
export function PricingSimple({ content, theme }: PricingSimpleProps) {
  const { heading, subheading, tiers } = content;

  return (
    <div className="space-y-16">
      {/* Animated Header */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-6 text-sm">
            {subheading}
          </Badge>
        </motion.div>

        <motion.h2
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {heading}
        </motion.h2>
      </motion.div>

      {/* Animated Pricing Tiers */}
      {tiers && tiers.length > 0 && (
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {tiers.map((tier, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative"
          >
            <Card
              className={cn(
                'relative flex h-full flex-col border-2 transition-all duration-300',
                tier.highlighted
                  ? 'border-primary shadow-2xl bg-gradient-to-br from-primary/5 via-background to-primary/10'
                  : 'hover:border-primary/50 hover:shadow-xl bg-gradient-to-br from-background to-muted/20'
              )}
            >
              {tier.highlighted && (
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-5 py-2 shadow-lg"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                    <span className="text-sm font-bold text-primary-foreground">Most Popular</span>
                  </div>
                </motion.div>
              )}

              <CardHeader className="text-center pb-8 pt-10">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mt-6">
                  <motion.span
                    className="text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tier.price}
                  </motion.span>
                  <span className="text-lg text-muted-foreground">/{tier.period}</span>
                </div>
                <p className="mt-4 text-base text-muted-foreground">{tier.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col space-y-6 px-6 pb-8">
                {tier.features && tier.features.length > 0 && (
                  <ul className="space-y-4 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + featureIndex * 0.05 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                        </motion.div>
                        <span className="text-base">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-12 text-base font-semibold shadow-lg"
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
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
