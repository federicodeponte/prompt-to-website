'use client';

// ABOUTME: Demo page for A/B Testing Engine
// ABOUTME: Visual test builder with variant comparison and winner determination

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Trophy,
  Users,
  MousePointer,
  Clock,
  Target,
  Play,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  createABTest,
  simulateTestMetrics,
  determineWinner,
  startTest,
  completeTest,
  formatNumber,
  type ABTest,
  type TestVariant,
  type TestMetrics,
} from '@/lib/ab-testing/test-engine';

function MetricCard({
  label,
  value,
  icon: Icon,
  change,
  isPercentage = false,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  change?: { value: number; isBetter: boolean };
  isPercentage?: boolean;
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold">
          {isPercentage ? `${value.toFixed(2)}%` : formatNumber(value)}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm ${
              change.isBetter ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.isBetter ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change.value > 0 ? '+' : ''}{change.value.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VariantCard({
  variant,
  metrics,
  isWinner,
  isBaseline,
  comparison,
}: {
  variant: TestVariant;
  metrics: TestMetrics;
  isWinner: boolean;
  isBaseline: boolean;
  comparison?: { metric: string; difference: number; percentChange: number; isBetter: boolean }[];
}) {
  return (
    <Card className={isWinner ? 'ring-2 ring-yellow-400' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{variant.name}</CardTitle>
            <CardDescription>{variant.description}</CardDescription>
          </div>
          {isWinner && (
            <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              <Trophy className="h-4 w-4" />
              Winner
            </div>
          )}
          {isBaseline && (
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Baseline
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Visitors"
            value={metrics.visitors}
            icon={Users}
            change={
              comparison
                ? {
                    value: comparison.find((c) => c.metric === 'visitors')?.percentChange || 0,
                    isBetter: comparison.find((c) => c.metric === 'visitors')?.isBetter || false,
                  }
                : undefined
            }
          />
          <MetricCard
            label="Conversions"
            value={metrics.conversions}
            icon={Target}
            change={
              comparison
                ? {
                    value: comparison.find((c) => c.metric === 'conversions')?.percentChange || 0,
                    isBetter: comparison.find((c) => c.metric === 'conversions')?.isBetter || false,
                  }
                : undefined
            }
          />
          <MetricCard
            label="Conversion Rate"
            value={metrics.conversionRate}
            icon={TrendingUp}
            isPercentage
            change={
              comparison
                ? {
                    value: comparison.find((c) => c.metric === 'conversionRate')?.percentChange || 0,
                    isBetter: comparison.find((c) => c.metric === 'conversionRate')?.isBetter || false,
                  }
                : undefined
            }
          />
          <MetricCard
            label="Bounce Rate"
            value={metrics.bounceRate}
            icon={TrendingDown}
            isPercentage
            change={
              comparison
                ? {
                    value: comparison.find((c) => c.metric === 'bounceRate')?.percentChange || 0,
                    isBetter: comparison.find((c) => c.metric === 'bounceRate')?.isBetter || false,
                  }
                : undefined
            }
          />
          <MetricCard
            label="Clicks"
            value={metrics.clicks}
            icon={MousePointer}
            change={
              comparison
                ? {
                    value: comparison.find((c) => c.metric === 'clicks')?.percentChange || 0,
                    isBetter: comparison.find((c) => c.metric === 'clicks')?.isBetter || false,
                  }
                : undefined
            }
          />
          <MetricCard
            label="Avg. Time"
            value={metrics.avgTimeOnPage}
            icon={Clock}
            change={
              comparison
                ? {
                    value: comparison.find((c) => c.metric === 'avgTimeOnPage')?.percentChange || 0,
                    isBetter: comparison.find((c) => c.metric === 'avgTimeOnPage')?.isBetter || false,
                  }
                : undefined
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ABTestingDemoPage() {
  const [testName, setTestName] = useState('Hero Headline Test');
  const [testDescription, setTestDescription] = useState('Compare different hero headlines for conversion optimization');
  const [variants] = useState<Omit<TestVariant, 'id' | 'createdAt'>[]>([
    {
      name: 'Variant A - Original',
      description: 'Current headline focusing on speed',
      config: { headline: 'Build Websites 10x Faster with AI' },
    },
    {
      name: 'Variant B - Benefit',
      description: 'Emphasizes time savings',
      config: { headline: 'Save 100+ Hours Building Your Website' },
    },
    {
      name: 'Variant C - Question',
      description: 'Engaging question format',
      config: { headline: 'Ready to Build Your Dream Website?' },
    },
  ]);

  const [test, setTest] = useState<ABTest | null>(null);
  const [baselineVariantId, setBaselineVariantId] = useState<string>('');

  const handleCreateTest = () => {
    const newTest = createABTest(testName, testDescription, variants);
    const testWithMetrics = simulateTestMetrics(newTest);
    setTest(testWithMetrics);
    setBaselineVariantId(testWithMetrics.variants[0].id);
  };

  const handleStartTest = () => {
    if (!test) return;
    const startedTest = startTest(test);
    setTest(startedTest);
  };

  const handleCompleteTest = () => {
    if (!test) return;
    const completedTest = completeTest(test);
    setTest(completedTest);
  };

  const handleRefreshMetrics = () => {
    if (!test) return;
    const updatedTest = simulateTestMetrics(test);
    setTest(updatedTest);
  };

  const winner = test ? determineWinner(test) : null;

  // Get comparison data for each variant vs baseline
  const getComparison = (variantId: string) => {
    if (!test || variantId === baselineVariantId) return undefined;

    const baselineMetrics = test.metrics[baselineVariantId];
    const variantMetrics = test.metrics[variantId];

    return Object.keys(baselineMetrics).map((key) => {
      const metric = key as keyof TestMetrics;
      const baseValue = baselineMetrics[metric];
      const variantValue = variantMetrics[metric];
      const difference = variantValue - baseValue;
      const percentChange = baseValue !== 0 ? (difference / baseValue) * 100 : 0;
      const isBetter = metric === 'bounceRate' ? difference < 0 : difference > 0;

      return {
        metric,
        difference,
        percentChange,
        isBetter,
      };
    });
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
              <FlaskConical className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Demo Feature</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              A/B Testing Engine
            </h1>
            <p className="text-xl text-gray-600">
              Create variant tests, track metrics, and determine winners with statistical significance
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Create A/B Test</CardTitle>
              <CardDescription>
                Set up your test with multiple variants to compare performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="Hero Headline Test"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testDescription">Description</Label>
                <Textarea
                  id="testDescription"
                  value={testDescription}
                  onChange={(e) => setTestDescription(e.target.value)}
                  placeholder="What are you testing?"
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <Label>Variants ({variants.length})</Label>
                {variants.map((variant, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="font-medium text-sm text-gray-700">{variant.name}</div>
                        <div className="text-sm text-gray-600">{variant.description}</div>
                        <div className="text-xs font-mono bg-white p-2 rounded border">
                          {JSON.stringify(variant.config)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={handleCreateTest} size="lg" className="w-full">
                <BarChart3 className="mr-2 h-5 w-5" />
                Create Test & Generate Metrics
              </Button>

              <Alert className="bg-purple-50 border-purple-200">
                <AlertDescription className="text-purple-800">
                  <strong>Demo Mode:</strong> This demo uses mock data to simulate A/B test results.
                  In production, metrics would be collected from real user interactions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{test.name}</h1>
              <p className="text-gray-600">{test.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  test.status === 'running'
                    ? 'bg-green-100 text-green-700'
                    : test.status === 'completed'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {test.status === 'draft' && (
              <Button onClick={handleStartTest}>
                <Play className="mr-2 h-4 w-4" />
                Start Test
              </Button>
            )}
            {test.status === 'running' && (
              <>
                <Button onClick={handleRefreshMetrics} variant="outline">
                  Refresh Metrics
                </Button>
                <Button onClick={handleCompleteTest}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Complete Test
                </Button>
              </>
            )}
            {test.status === 'completed' && (
              <Button onClick={() => setTest(null)} variant="outline">
                Create New Test
              </Button>
            )}
          </div>
        </div>

        {/* Winner Banner */}
        {winner && winner.isSignificant && test.status === 'completed' && (
          <Alert className="mb-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <AlertDescription className="text-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-lg">
                    {test.variants.find((v) => v.id === winner.winnerId)?.name} is the winner!
                  </strong>
                  <div className="text-sm text-gray-700 mt-1">
                    {winner.confidence.toFixed(2)}% confidence - Statistically significant result
                  </div>
                </div>
                <div className="text-4xl">🎉</div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Not Significant Warning */}
        {winner && !winner.isSignificant && test.status === 'completed' && (
          <Alert className="mb-8 bg-amber-50 border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-900">
              <strong>Results are not statistically significant.</strong> More data needed to
              determine a clear winner. Continue testing or increase sample size.
            </AlertDescription>
          </Alert>
        )}

        {/* Variants Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {test.variants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              metrics={test.metrics[variant.id]}
              isWinner={winner?.winnerId === variant.id && winner.isSignificant}
              isBaseline={variant.id === baselineVariantId}
              comparison={getComparison(variant.id)}
            />
          ))}
        </div>

        {/* Test Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Test Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Traffic Split</div>
              <div className="space-y-2">
                {test.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between">
                    <span className="text-sm">{variant.name}</span>
                    <span className="text-sm font-medium">{test.trafficSplit[variant.id]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Test Timeline</div>
              <div className="space-y-2 text-sm">
                {test.startDate && (
                  <div>Started: {new Date(test.startDate).toLocaleString()}</div>
                )}
                {test.endDate && (
                  <div>Ended: {new Date(test.endDate).toLocaleString()}</div>
                )}
                {!test.startDate && <div className="text-gray-500">Not started yet</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
