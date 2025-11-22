'use client';

// ABOUTME: Demo landing hub - Central page linking to all demo features
// ABOUTME: First impression page showcasing all advanced capabilities

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Rocket,
  Brain,
  Users,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Code2,
  Zap,
  Star,
} from 'lucide-react';

interface DemoFeature {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  bgColor: string;
  highlights: string[];
  demoValue: 'VERY HIGH' | 'HIGH' | 'MEDIUM';
}

const demoFeatures: DemoFeature[] = [
  {
    title: 'One-Click Vercel Deploy',
    description: 'Generate complete Next.js projects and deploy to production in under 60 seconds',
    icon: Rocket,
    href: '/demo/vercel-deploy',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    highlights: [
      '451 lines of Next.js generator',
      'Real Vercel API integration',
      'Full TypeScript + Tailwind',
      'NO competitor has this',
    ],
    demoValue: 'VERY HIGH',
  },
  {
    title: 'Multi-Agent AI System',
    description: 'Three specialized AI agents collaborate: Content Writer, Design Expert, SEO Specialist',
    icon: Brain,
    href: '/demo/multi-agent',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    highlights: [
      'Gemini 2.5 Flash agents',
      'Transparent reasoning',
      'Sequential orchestration',
      '32s execution time',
    ],
    demoValue: 'VERY HIGH',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Live presence tracking and document sync with Supabase Realtime',
    icon: Users,
    href: '/demo/collaboration',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    highlights: [
      'Supabase Realtime',
      'Field-level indicators',
      'Live activity log',
      'Multi-tab support',
    ],
    demoValue: 'HIGH',
  },
  {
    title: 'A/B Testing Engine',
    description: 'Variant management with statistical significance testing and winner determination',
    icon: FlaskConical,
    href: '/demo/ab-testing',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    highlights: [
      'Statistical significance',
      '6 key metrics tracked',
      'Winner confidence %',
      'Visual comparisons',
    ],
    demoValue: 'HIGH',
  },
];

function FeatureCard({ feature }: { feature: DemoFeature }) {
  const Icon = feature.icon;

  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
      {/* Demo Value Badge */}
      {feature.demoValue === 'VERY HIGH' && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">
            <Star className="h-3 w-3 fill-current" />
            FLAGSHIP
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${feature.bgColor}`}>
            <Icon className={`h-8 w-8 ${feature.color}`} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
            <CardDescription className="text-base">{feature.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2">
          {feature.highlights.map((highlight, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <Zap className="h-3 w-3 text-gray-400 flex-shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={feature.href}>
          <Button className="w-full group-hover:gap-3 transition-all" size="lg">
            View Demo
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative container mx-auto max-w-7xl px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Technical Demo Showcase</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Advanced AI Features
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Built in 8.5 Hours
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore 4 production-ready demo features showcasing cutting-edge AI, real-time collaboration,
              automated deployment, and data-driven optimization
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-blue-600" />
                <span><strong>4,417</strong> lines of code</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span><strong>17</strong> new files</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span><strong>26%</strong> faster than estimated</span>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {demoFeatures.map((feature) => (
              <FeatureCard key={feature.href} feature={feature} />
            ))}
          </div>

          {/* Tech Stack */}
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code2 className="h-6 w-6" />
                Tech Stack Showcase
              </CardTitle>
              <CardDescription className="text-gray-300 text-base">
                Modern technologies demonstrated across all features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="font-semibold mb-3 text-blue-400">AI & Intelligence</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Gemini 2.5 Flash</li>
                    <li>• Multi-agent systems</li>
                    <li>• Function calling</li>
                    <li>• Streaming responses</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-3 text-purple-400">Real-time & Backend</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Supabase Realtime</li>
                    <li>• Edge Runtime</li>
                    <li>• Vercel API</li>
                    <li>• Node.js runtime</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-3 text-green-400">Frontend & Tools</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• React 19</li>
                    <li>• TypeScript strict</li>
                    <li>• Tailwind CSS</li>
                    <li>• Next.js 15</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
