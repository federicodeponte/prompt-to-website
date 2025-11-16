// ABOUTME: Premium pricing comparison table with feature matrix
// ABOUTME: Production-quality design with Framer Motion animations and responsive layout

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X, Sparkles } from 'lucide-react';
import { PricingContentComparison } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import { spring, springMedium, fadeInUp, staggerContainer, staggerItem, cardHoverDramatic } from '@/lib/animations';
import { getGradientTextClasses, getShimmerClasses } from '@/lib/visual-effects';

interface PricingComparisonProps {
  content: PricingContentComparison;
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Premium pricing comparison with feature matrix table
 * Features: Comparison table, feature rows, mobile responsive, animations
 */
export function PricingComparison({ content, theme }: PricingComparisonProps) {
  const { heading, subheading, tiers, comparisonFeatures } = content;

  /**
   * Render feature value based on type (boolean, string, or undefined)
   */
  const renderFeatureValue = (value: boolean | string | undefined) => {
    if (value === true) {
      return (
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={springMedium}
        >
          <Check className="h-5 w-5 text-primary mx-auto" aria-label="Included" />
        </motion.div>
      );
    }
    if (value === false) {
      return (
        <X className="h-5 w-5 text-muted-foreground/40 mx-auto" aria-label="Not included" />
      );
    }
    if (typeof value === 'string') {
      return <span className="text-sm font-medium">{value}</span>;
    }
    return <span className="text-muted-foreground/40">—</span>;
  };

  return (
    <div className="space-y-16">
      {/* Animated Header with gradient text */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={spring}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-6 text-sm">
            {subheading}
          </Badge>
        </motion.div>

        <motion.h2
          className={cn("text-4xl font-bold tracking-tight sm:text-5xl", getGradientTextClasses())}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring, delay: 0.2 }}
        >
          {heading}
        </motion.h2>
      </motion.div>

      {/* Desktop: Comparison Table */}
      <motion.div
        className="hidden lg:block overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-background to-muted/20 shadow-xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...spring, delay: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 hover:bg-transparent">
              {/* Empty cell for feature names column */}
              <TableHead className="w-1/4 bg-muted/50">
                <span className="text-base font-bold">Features</span>
              </TableHead>

              {/* Tier headers */}
              {tiers.map((tier, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    'text-center relative',
                    tier.highlighted
                      ? 'bg-gradient-to-br from-primary/10 via-background to-primary/5'
                      : 'bg-background/50'
                  )}
                >
                  {tier.highlighted && (
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-4 py-1 shadow-lg"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                        <span className="text-xs font-bold text-primary-foreground">
                          Popular
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-3 py-6">
                    <div className="text-2xl font-bold">{tier.name}</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {tier.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/{tier.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground px-4">{tier.description}</p>

                    <div className="px-4 pt-2">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className={cn(
                            "w-full shadow-lg",
                            tier.highlighted && getShimmerClasses()
                          )}
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
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {comparisonFeatures.map((feature, featureIndex) => (
              <motion.tr
                key={featureIndex}
                className={cn(
                  'border-b transition-colors hover:bg-muted/30',
                  featureIndex % 2 === 0 ? 'bg-muted/10' : 'bg-background'
                )}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: featureIndex * 0.03 }}
              >
                {/* Feature name */}
                <TableCell className="font-semibold bg-muted/30">
                  {feature.feature}
                </TableCell>

                {/* Feature values for each tier */}
                {tiers.map((tier, tierIndex) => (
                  <TableCell
                    key={tierIndex}
                    className={cn(
                      'text-center',
                      tier.highlighted && 'bg-primary/5'
                    )}
                  >
                    {renderFeatureValue(feature.tiers[tier.name])}
                  </TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Mobile & Tablet: Cards for each tier */}
      <motion.div
        className="grid gap-8 lg:hidden md:grid-cols-2"
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
            className="relative"
          >
            <motion.div
              variants={cardHoverDramatic}
              initial="rest"
              whileHover="hover"
              animate="rest"
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
                    <span className="text-sm font-bold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                </motion.div>
              )}

              <CardContent className="flex-1 flex flex-col p-6 pt-10">
                {/* Tier header */}
                <div className="text-center mb-6 pb-6 border-b">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    <span className="text-lg text-muted-foreground">/{tier.period}</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{tier.description}</p>
                </div>

                {/* Features list for this tier */}
                <ul className="space-y-3 flex-1 mb-6">
                  {comparisonFeatures.map((feature, featureIndex) => {
                    const value = feature.tiers[tier.name];
                    return (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {renderFeatureValue(value)}
                        </div>
                        <span className={cn(
                          value === false && 'text-muted-foreground/60 line-through'
                        )}>
                          {feature.feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA Button with shimmer */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={cn(
                      "w-full h-12 text-base font-semibold shadow-lg",
                      tier.highlighted && getShimmerClasses()
                    )}
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
