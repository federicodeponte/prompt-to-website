// ABOUTME: Clean, minimal features grid matching shadcn/ui aesthetic
// ABOUTME: Professional design with proper icons and subtle animations

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeaturesContentGrid } from '@/lib/types/block-content';
import { cn } from '@/lib/utils';
import {
  Zap, Shield, Users, Sparkles, Target, TrendingUp,
  Lock, Globe, Check, Star, Heart, Award, Smartphone,
  Cloud, Code, Cpu, Database, Rocket, Settings, Package,
  Mail, MessageSquare, FileText, Image, Video, Music,
  DollarSign, CreditCard, ShoppingCart, Gift, TrendingDown,
  BarChart, PieChart, Activity, Calendar, Clock, Bell
} from 'lucide-react';
import { spring, fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { getGradientTextClasses, getCardLiftClasses } from '@/lib/visual-effects';

// Map emoji to proper lucide icons
const iconMap: Record<string, React.ElementType> = {
  // Common actions
  '⚡': Zap,
  '🚀': Rocket,
  '✨': Sparkles,
  '⭐': Star,
  '✓': Check,
  '🎯': Target,

  // Tech & Development
  '💻': Code,
  '📱': Smartphone,
  '☁️': Cloud,
  '🖥️': Cpu,
  '🗄️': Database,
  '⚙️': Settings,
  '📦': Package,

  // Communication
  '✉️': Mail,
  '💬': MessageSquare,
  '📄': FileText,

  // Media
  '🖼️': Image,
  '🎬': Video,
  '🎵': Music,

  // Security & Protection
  '🔒': Lock,
  '🛡️': Shield,

  // People & Social
  '👥': Users,
  '❤️': Heart,

  // Money & Commerce
  '💰': DollarSign,
  '💳': CreditCard,
  '🛒': ShoppingCart,
  '🎁': Gift,

  // Analytics & Growth
  '📈': TrendingUp,
  '📉': TrendingDown,
  '📊': BarChart,
  '🥧': PieChart,
  '💹': Activity,

  // Location & World
  '🌍': Globe,
  '🌎': Globe,
  '🌏': Globe,

  // Achievement
  '🏆': Award,

  // Time & Schedule
  '📅': Calendar,
  '⏰': Clock,
  '🔔': Bell,
};

interface FeaturesGridProps {
  content: FeaturesContentGrid;
}

/**
 * Clean, minimal features grid with proper icons
 * Design principles: Whitespace, subtle colors, proper iconography, professional
 */
export function FeaturesGrid({ content }: FeaturesGridProps) {
  const { heading, subheading, features, columns = 3 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  } as const;

  return (
    <div className="space-y-12">
      {/* Header with gradient text */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={spring}
      >
        {subheading && (
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">
            {subheading}
          </Badge>
        )}

        <h2 className={cn("text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl", getGradientTextClasses())}>
          {heading}
        </h2>
      </motion.div>

      {/* Features Grid with stagger and 3D lift */}
      {features && features.length > 0 && (
        <motion.div
          className={cn('grid gap-6 lg:gap-8', gridColsClass[columns])}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            // Get proper icon component
            const IconComponent = iconMap[feature.icon] || Sparkles;

            return (
              <motion.div
                key={index}
                variants={staggerItem}
              >
                <Card className={cn("h-full border shadow-sm", getCardLiftClasses())}>
                  <CardContent className="p-6">
                    {/* Icon with pulse animation */}
                    <motion.div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <IconComponent className="h-6 w-6 text-primary" />
                    </motion.div>

                    {/* Title - clean typography */}
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description - subtle gray */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
