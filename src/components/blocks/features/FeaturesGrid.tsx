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
      {/* Header - clean and minimal */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
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

      {/* Features Grid - clean cards with subtle shadows */}
      {features && features.length > 0 && (
        <div className={cn('grid gap-6 lg:gap-8', gridColsClass[columns])}>
          {features.map((feature, index) => {
            // Get proper icon component
            const IconComponent = iconMap[feature.icon] || Sparkles;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full border shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    {/* Icon - clean, simple, one color */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>

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
        </div>
      )}
    </div>
  );
}
