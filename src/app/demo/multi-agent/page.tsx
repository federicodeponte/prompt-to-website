'use client';

// ABOUTME: Demo page for Multi-Agent AI System
// ABOUTME: Shows three specialized agents (Content, Design, SEO) working together

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Loader2,
  Brain,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Palette,
  Search,
  Users,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { AgentResult } from '@/lib/ai/multi-agent-system';

interface AgentCardProps {
  agent: 'content' | 'design' | 'seo';
  result?: AgentResult;
  isRunning: boolean;
}

function AgentCard({ agent, result, isRunning }: AgentCardProps) {
  const agentInfo = {
    content: {
      name: 'Content Writer',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Headlines, copy, CTAs',
    },
    design: {
      name: 'Design Expert',
      icon: Palette,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Colors, typography, layout',
    },
    seo: {
      name: 'SEO Specialist',
      icon: Search,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Meta tags, keywords, performance',
    },
  };

  const info = agentInfo[agent];
  const Icon = info.icon;

  return (
    <Card className={`transition-all ${isRunning ? 'ring-2 ring-blue-400 shadow-lg' : ''}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${info.bgColor}`}>
            <Icon className={`h-6 w-6 ${info.color}`} />
          </div>
          <div>
            <CardTitle className="text-lg">{info.name}</CardTitle>
            <CardDescription>{info.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!result && !isRunning && (
          <div className="text-sm text-gray-500">Waiting to start...</div>
        )}

        {isRunning && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Thinking...</span>
          </div>
        )}

        {result && (
          <div className="space-y-3">
            {/* Status */}
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="text-sm font-medium">
                {result.success ? 'Completed' : 'Failed'}
              </span>
              <span className="text-xs text-gray-500 ml-auto">{result.duration}ms</span>
            </div>

            {/* Reasoning */}
            {result.reasoning && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs font-semibold text-gray-700 mb-1">Reasoning:</div>
                <div className="text-sm text-gray-600">{result.reasoning}</div>
              </div>
            )}

            {/* Output Preview */}
            {result.success && result.output && (
              <div className="bg-white border border-gray-200 p-3 rounded-lg">
                <div className="text-xs font-semibold text-gray-700 mb-2">Output:</div>
                <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap max-h-32">
                  {JSON.stringify(result.output, null, 2).substring(0, 200)}...
                </pre>
              </div>
            )}

            {/* Error */}
            {result.error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                Error: {result.error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MultiAgentDemoPage() {
  const [businessName, setBusinessName] = useState('TechStart AI');
  const [industry, setIndustry] = useState('Artificial Intelligence SaaS');
  const [description, setDescription] = useState(
    'AI-powered platform that helps businesses automate customer support and boost productivity'
  );

  const [isRunning, setIsRunning] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [agentResults, setAgentResults] = useState<Record<string, AgentResult>>({});
  const [finalOutput, setFinalOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);

  const handleRun = async () => {
    setIsRunning(true);
    setCurrentAgent(null);
    setAgentResults({});
    setFinalOutput(null);
    setError(null);
    setDuration(0);

    try {
      const businessContext = {
        businessName,
        industry,
        description,
      };

      const response = await fetch('/api/multi-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Create a professional website for ${businessName}`,
          businessContext,
          mode: 'sequential',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Multi-agent orchestration failed');
        // Still show partial results
        if (data.agentResults) {
          const results: Record<string, AgentResult> = {};
          data.agentResults.forEach((r: AgentResult) => {
            results[r.agent] = r;
          });
          setAgentResults(results);
        }
        return;
      }

      // Update agent results
      const results: Record<string, AgentResult> = {};
      data.agentResults.forEach((r: AgentResult) => {
        results[r.agent] = r;
      });
      setAgentResults(results);
      setFinalOutput(data.output);
      setDuration(data.duration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
      setCurrentAgent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Demo Feature</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Multi-Agent AI System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch three specialized AI agents collaborate to create your website: Content Writer,
            Design Expert, and SEO Specialist working together
          </p>
        </div>

        {/* Input Card */}
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Tell us about your business and our AI agents will collaborate to create your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="TechStart AI"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                disabled={isRunning}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Artificial Intelligence SaaS"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={isRunning}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What does your business do?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isRunning}
                rows={3}
              />
            </div>

            <Button
              onClick={handleRun}
              disabled={isRunning || !businessName || !industry}
              size="lg"
              className="w-full"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Agents Working...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-5 w-5" />
                  Run Multi-Agent System
                </>
              )}
            </Button>

            {/* Progress Indicator */}
            {isRunning && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-900">
                  <div className="space-y-3">
                    <div className="font-medium">Multi-Agent Orchestration in Progress</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
                        <span className="text-sm">Content Writer</span>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-blue-600 animate-pulse animation-delay-1000" />
                        <span className="text-sm">Design Expert</span>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-green-600 animate-pulse animation-delay-2000" />
                        <span className="text-sm">SEO Specialist</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      Expected time: ~30-35 seconds for all 3 agents
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Agent Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <AgentCard
            agent="content"
            result={agentResults.content}
            isRunning={isRunning && (currentAgent === 'content' || !currentAgent)}
          />
          <AgentCard
            agent="design"
            result={agentResults.design}
            isRunning={isRunning && currentAgent === 'design'}
          />
          <AgentCard
            agent="seo"
            result={agentResults.seo}
            isRunning={isRunning && currentAgent === 'seo'}
          />
        </div>

        {/* Final Output */}
        {finalOutput && (
          <Card className="shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <CardTitle>Orchestration Complete!</CardTitle>
                  <CardDescription>
                    All agents completed in {(duration / 1000).toFixed(2)}s
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Agent Insights */}
              {finalOutput.agentInsights && (
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Agent Insights:</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-purple-200">
                      <div className="text-xs font-semibold text-purple-600 mb-1">
                        Content Strategy
                      </div>
                      <div className="text-sm text-gray-700">
                        {finalOutput.agentInsights.contentReasoning}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <div className="text-xs font-semibold text-blue-600 mb-1">
                        Design Decisions
                      </div>
                      <div className="text-sm text-gray-700">
                        {finalOutput.agentInsights.designReasoning}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <div className="text-xs font-semibold text-green-600 mb-1">
                        SEO Strategy
                      </div>
                      <div className="text-sm text-gray-700">
                        {finalOutput.agentInsights.seoReasoning}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Combined Output */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="font-semibold text-gray-900 mb-2">Combined Output:</div>
                <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {JSON.stringify(finalOutput, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Info */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-sm text-blue-800">
              <strong>How it works:</strong> Three specialized AI agents (Gemini 2.5 Flash)
              collaborate in sequence. Each agent has unique expertise and reasoning, then their
              outputs are combined into a cohesive website configuration.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
