// ABOUTME: A/B Testing engine for comparing website variants
// ABOUTME: Manages test variants, tracks metrics, and determines winners

export interface TestVariant {
  id: string;
  name: string;
  description?: string;
  config: Record<string, any>; // Website configuration for this variant
  createdAt: string;
}

export interface TestMetrics {
  visitors: number;
  conversions: number;
  conversionRate: number;
  bounceRate: number;
  avgTimeOnPage: number; // seconds
  clicks: number;
  engagement: number; // 0-100 score
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variants: TestVariant[];
  metrics: Record<string, TestMetrics>; // variantId -> metrics
  startDate?: string;
  endDate?: string;
  winnerVariantId?: string;
  trafficSplit: Record<string, number>; // variantId -> percentage (0-100)
}

/**
 * Create a new A/B test
 */
export function createABTest(
  name: string,
  description: string,
  variants: Omit<TestVariant, 'id' | 'createdAt'>[]
): ABTest {
  const testId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // Create variants with IDs
  const testVariants: TestVariant[] = variants.map((v, index) => ({
    id: `${testId}-variant-${index}`,
    createdAt,
    ...v,
  }));

  // Initialize metrics for each variant
  const metrics: Record<string, TestMetrics> = {};
  testVariants.forEach((v) => {
    metrics[v.id] = {
      visitors: 0,
      conversions: 0,
      conversionRate: 0,
      bounceRate: 0,
      avgTimeOnPage: 0,
      clicks: 0,
      engagement: 0,
    };
  });

  // Equal traffic split by default
  const splitPercentage = Math.floor(100 / testVariants.length);
  const trafficSplit: Record<string, number> = {};
  testVariants.forEach((v, index) => {
    // Give remainder to first variant
    trafficSplit[v.id] = index === 0 ? 100 - splitPercentage * (testVariants.length - 1) : splitPercentage;
  });

  return {
    id: testId,
    name,
    description,
    status: 'draft',
    variants: testVariants,
    metrics,
    trafficSplit,
  };
}

/**
 * Generate mock metrics for a variant (for demo purposes)
 */
export function generateMockMetrics(seed?: number): TestMetrics {
  let currentSeed = seed || 0;
  const random = seed !== undefined ? () => {
    const x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
  } : Math.random;

  const visitors = Math.floor(random() * 10000) + 1000;
  const conversions = Math.floor(random() * visitors * 0.15);
  const conversionRate = (conversions / visitors) * 100;
  const bounceRate = random() * 60 + 20; // 20-80%
  const avgTimeOnPage = random() * 180 + 30; // 30-210 seconds
  const clicks = Math.floor(random() * visitors * 0.8);
  const engagement = Math.min(100, (clicks / visitors) * 100 + random() * 20);

  return {
    visitors,
    conversions,
    conversionRate: parseFloat(conversionRate.toFixed(2)),
    bounceRate: parseFloat(bounceRate.toFixed(2)),
    avgTimeOnPage: parseFloat(avgTimeOnPage.toFixed(2)),
    clicks,
    engagement: parseFloat(engagement.toFixed(2)),
  };
}

/**
 * Update test with mock metrics (for demo)
 */
export function simulateTestMetrics(test: ABTest): ABTest {
  const updatedMetrics: Record<string, TestMetrics> = {};

  test.variants.forEach((variant, index) => {
    // Use variant index as seed for consistent "random" data
    updatedMetrics[variant.id] = generateMockMetrics(index * 1000);
  });

  return {
    ...test,
    metrics: updatedMetrics,
  };
}

/**
 * Calculate statistical significance between two variants
 * Returns p-value (simplified calculation for demo)
 */
export function calculateSignificance(
  variantA: TestMetrics,
  variantB: TestMetrics
): number {
  const n1 = variantA.visitors;
  const n2 = variantB.visitors;
  const p1 = variantA.conversionRate / 100;
  const p2 = variantB.conversionRate / 100;

  // Simplified z-test calculation
  const pooled = ((p1 * n1) + (p2 * n2)) / (n1 + n2);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  const z = Math.abs((p1 - p2) / se);

  // Approximate p-value from z-score (simplified)
  const pValue = Math.exp(-0.717 * z - 0.416 * z * z);

  return parseFloat(pValue.toFixed(4));
}

/**
 * Determine the winning variant
 * Returns variant ID and confidence level
 */
export function determineWinner(test: ABTest): {
  winnerId: string | null;
  confidence: number;
  isSignificant: boolean;
} {
  if (test.variants.length < 2) {
    return { winnerId: null, confidence: 0, isSignificant: false };
  }

  // Find variant with highest conversion rate
  let bestVariant = test.variants[0];
  let bestMetrics = test.metrics[bestVariant.id];

  test.variants.forEach((variant) => {
    const metrics = test.metrics[variant.id];
    if (metrics.conversionRate > bestMetrics.conversionRate) {
      bestVariant = variant;
      bestMetrics = metrics;
    }
  });

  // Compare with second-best variant
  const otherVariants = test.variants.filter((v) => v.id !== bestVariant.id);
  if (otherVariants.length === 0) {
    return { winnerId: bestVariant.id, confidence: 100, isSignificant: true };
  }

  const secondBest = otherVariants.reduce((best, variant) => {
    const metrics = test.metrics[variant.id];
    const bestSecondMetrics = test.metrics[best.id];
    return metrics.conversionRate > bestSecondMetrics.conversionRate ? variant : best;
  }, otherVariants[0]);

  const pValue = calculateSignificance(bestMetrics, test.metrics[secondBest.id]);
  const confidence = (1 - pValue) * 100;
  const isSignificant = pValue < 0.05; // 95% confidence

  return {
    winnerId: bestVariant.id,
    confidence: parseFloat(confidence.toFixed(2)),
    isSignificant,
  };
}

/**
 * Get variant performance comparison
 */
export function compareVariants(
  test: ABTest,
  baseVariantId: string
): Record<string, {
  metric: keyof TestMetrics;
  difference: number;
  percentChange: number;
  isBetter: boolean;
}[]> {
  const baseMetrics = test.metrics[baseVariantId];
  const comparisons: Record<string, any[]> = {};

  test.variants.forEach((variant) => {
    if (variant.id === baseVariantId) return;

    const variantMetrics = test.metrics[variant.id];
    const metricComparisons: any[] = [];

    (Object.keys(baseMetrics) as (keyof TestMetrics)[]).forEach((metric) => {
      const baseValue = baseMetrics[metric];
      const variantValue = variantMetrics[metric];
      const difference = variantValue - baseValue;
      const percentChange = baseValue !== 0 ? (difference / baseValue) * 100 : 0;

      // Higher is better for most metrics, but not bounce rate
      const isBetter = metric === 'bounceRate' ? difference < 0 : difference > 0;

      metricComparisons.push({
        metric,
        difference: parseFloat(difference.toFixed(2)),
        percentChange: parseFloat(percentChange.toFixed(2)),
        isBetter,
      });
    });

    comparisons[variant.id] = metricComparisons;
  });

  return comparisons;
}

/**
 * Start a test (set status to running)
 */
export function startTest(test: ABTest): ABTest {
  return {
    ...test,
    status: 'running',
    startDate: new Date().toISOString(),
  };
}

/**
 * Complete a test and set winner
 */
export function completeTest(test: ABTest): ABTest {
  const { winnerId } = determineWinner(test);

  return {
    ...test,
    status: 'completed',
    endDate: new Date().toISOString(),
    winnerVariantId: winnerId || undefined,
  };
}

/**
 * Format time duration for display
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${Math.round(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

/**
 * Format large numbers with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}
