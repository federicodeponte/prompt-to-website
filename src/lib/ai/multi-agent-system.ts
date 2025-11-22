// ABOUTME: Multi-agent AI system with specialized agents for content, design, and SEO
// ABOUTME: Orchestrates collaboration between agents to generate comprehensive website configs

import { GoogleGenerativeAI } from '@google/generative-ai';

// Agent types
export type AgentType = 'content' | 'design' | 'seo' | 'orchestrator';

export interface AgentMessage {
  agent: AgentType;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  reasoning?: string; // Agent's internal reasoning (for demo)
}

export interface AgentResult {
  agent: AgentType;
  success: boolean;
  output: any;
  reasoning: string;
  duration: number;
  error?: string;
}

export interface MultiAgentSession {
  id: string;
  messages: AgentMessage[];
  results: AgentResult[];
  finalOutput?: any;
  status: 'running' | 'completed' | 'failed';
}

/**
 * Content Writer Agent
 * Specializes in: Headlines, copy, microcopy, CTAs, brand voice
 */
export async function runContentAgent(
  prompt: string,
  context: Record<string, any>,
  apiKey?: string
): Promise<AgentResult> {
  const startTime = Date.now();
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!key) {
    return {
      agent: 'content',
      success: false,
      output: null,
      reasoning: 'API key not configured',
      duration: 0,
      error: 'Missing GEMINI_API_KEY',
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = `You are a CONTENT WRITING SPECIALIST.

Your expertise:
- Compelling headlines and subheadlines
- Persuasive copy that converts
- Brand voice and tone consistency
- Microcopy and UX writing
- Call-to-action optimization

Task: Generate website content (headlines, descriptions, CTAs) based on the business context.

Output format (JSON):
{
  "reasoning": "Your thought process about the content strategy",
  "content": {
    "hero": {
      "headline": "Main headline",
      "subheadline": "Supporting text",
      "cta": "Button text"
    },
    "value_props": ["Benefit 1", "Benefit 2", "Benefit 3"],
    "features": [
      {"title": "Feature name", "description": "Feature description"}
    ],
    "testimonials": [
      {"quote": "Customer quote", "author": "Name", "role": "Position"}
    ],
    "cta": {
      "headline": "CTA headline",
      "description": "CTA description",
      "buttonText": "Button text"
    }
  }
}`;

    const userPrompt = `Business Context:
${JSON.stringify(context, null, 2)}

User Request: ${prompt}

Generate compelling website content that resonates with the target audience.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = result.response.text();

    // Extract JSON from response (remove markdown code blocks if present)
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : response;
    const parsed = JSON.parse(jsonStr);

    const duration = Date.now() - startTime;

    return {
      agent: 'content',
      success: true,
      output: parsed.content,
      reasoning: parsed.reasoning || 'Content strategy focused on conversion and clarity',
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      agent: 'content',
      success: false,
      output: null,
      reasoning: 'Error generating content',
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Design Expert Agent
 * Specializes in: Colors, typography, spacing, visual hierarchy, brand identity
 */
export async function runDesignAgent(
  prompt: string,
  context: Record<string, any>,
  apiKey?: string
): Promise<AgentResult> {
  const startTime = Date.now();
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!key) {
    return {
      agent: 'design',
      success: false,
      output: null,
      reasoning: 'API key not configured',
      duration: 0,
      error: 'Missing GEMINI_API_KEY',
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = `You are a DESIGN SYSTEM SPECIALIST.

Your expertise:
- Color theory and palette generation
- Typography scales and pairings
- Spacing and layout systems
- Visual hierarchy and composition
- Brand identity and consistency

Task: Generate a complete design system based on the business context.

Output format (JSON):
{
  "reasoning": "Your thought process about the design decisions",
  "design": {
    "colors": {
      "primary": "#HEX",
      "secondary": "#HEX",
      "background": "#HEX",
      "text": "#HEX",
      "muted": "#HEX",
      "accent": "#HEX"
    },
    "fonts": {
      "heading": "Font name",
      "body": "Font name"
    },
    "spacing": {
      "section": "Value with unit",
      "container": "Max width"
    },
    "radius": {
      "button": "Value with unit",
      "card": "Value with unit",
      "input": "Value with unit"
    }
  }
}`;

    const userPrompt = `Business Context:
${JSON.stringify(context, null, 2)}

User Request: ${prompt}

Generate a cohesive design system that reflects the brand personality.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = result.response.text();

    // Extract JSON from response
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : response;
    const parsed = JSON.parse(jsonStr);

    const duration = Date.now() - startTime;

    return {
      agent: 'design',
      success: true,
      output: parsed.design,
      reasoning: parsed.reasoning || 'Design system optimized for brand consistency',
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      agent: 'design',
      success: false,
      output: null,
      reasoning: 'Error generating design system',
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * SEO Specialist Agent
 * Specializes in: Meta tags, keywords, structured data, performance, accessibility
 */
export async function runSEOAgent(
  prompt: string,
  context: Record<string, any>,
  apiKey?: string
): Promise<AgentResult> {
  const startTime = Date.now();
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!key) {
    return {
      agent: 'seo',
      success: false,
      output: null,
      reasoning: 'API key not configured',
      duration: 0,
      error: 'Missing GEMINI_API_KEY',
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = `You are an SEO & PERFORMANCE SPECIALIST.

Your expertise:
- SEO meta tags and descriptions
- Keyword research and optimization
- Structured data (schema.org)
- Performance optimization
- Accessibility best practices

Task: Generate SEO strategy and metadata based on the business context.

Output format (JSON):
{
  "reasoning": "Your thought process about the SEO strategy",
  "seo": {
    "title": "Page title (50-60 chars)",
    "description": "Meta description (150-160 chars)",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "og_image_alt": "Social preview description",
    "structured_data": {
      "@type": "Organization or Product",
      "name": "Business name",
      "description": "Description"
    },
    "recommendations": [
      "SEO recommendation 1",
      "SEO recommendation 2"
    ]
  }
}`;

    const userPrompt = `Business Context:
${JSON.stringify(context, null, 2)}

User Request: ${prompt}

Generate comprehensive SEO strategy and metadata.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = result.response.text();

    // Extract JSON from response
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : response;
    const parsed = JSON.parse(jsonStr);

    const duration = Date.now() - startTime;

    return {
      agent: 'seo',
      success: true,
      output: parsed.seo,
      reasoning: parsed.reasoning || 'SEO strategy optimized for search visibility',
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      agent: 'seo',
      success: false,
      output: null,
      reasoning: 'Error generating SEO strategy',
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Orchestrator
 * Coordinates all agents and combines their outputs into final website config
 */
export async function orchestrateAgents(
  userPrompt: string,
  businessContext: Record<string, any>,
  apiKey?: string,
  onAgentComplete?: (result: AgentResult) => void
): Promise<{
  success: boolean;
  output: any;
  agentResults: AgentResult[];
  totalDuration: number;
  error?: string;
}> {
  const startTime = Date.now();
  const agentResults: AgentResult[] = [];

  try {
    // Run all agents in parallel for speed (demo optimization)
    const [contentResult, designResult, seoResult] = await Promise.all([
      runContentAgent(userPrompt, businessContext, apiKey),
      runDesignAgent(userPrompt, businessContext, apiKey),
      runSEOAgent(userPrompt, businessContext, apiKey),
    ]);

    agentResults.push(contentResult, designResult, seoResult);

    // Notify progress (for demo UI)
    if (onAgentComplete) {
      agentResults.forEach((result) => onAgentComplete(result));
    }

    // Check if all agents succeeded
    const allSuccess = agentResults.every((r) => r.success);

    if (!allSuccess) {
      const failedAgents = agentResults.filter((r) => !r.success).map((r) => r.agent);
      return {
        success: false,
        output: null,
        agentResults,
        totalDuration: Date.now() - startTime,
        error: `Agents failed: ${failedAgents.join(', ')}`,
      };
    }

    // Combine agent outputs into final website config
    const combinedOutput = {
      content: contentResult.output,
      design: designResult.output,
      seo: seoResult.output,
      metadata: {
        title: seoResult.output?.title || businessContext.businessName || 'Website',
        description: seoResult.output?.description || 'Welcome to our website',
      },
      agentInsights: {
        contentReasoning: contentResult.reasoning,
        designReasoning: designResult.reasoning,
        seoReasoning: seoResult.reasoning,
      },
    };

    const totalDuration = Date.now() - startTime;

    return {
      success: true,
      output: combinedOutput,
      agentResults,
      totalDuration,
    };
  } catch (error) {
    return {
      success: false,
      output: null,
      agentResults,
      totalDuration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Orchestration failed',
    };
  }
}

/**
 * Demo helper: Run agents sequentially to show reasoning
 * (In production, parallel is faster, but sequential is better for demo)
 */
export async function orchestrateAgentsSequential(
  userPrompt: string,
  businessContext: Record<string, any>,
  apiKey?: string,
  onAgentStart?: (agent: AgentType) => void,
  onAgentComplete?: (result: AgentResult) => void
): Promise<{
  success: boolean;
  output: any;
  agentResults: AgentResult[];
  totalDuration: number;
  error?: string;
}> {
  const startTime = Date.now();
  const agentResults: AgentResult[] = [];

  try {
    // Content Agent
    if (onAgentStart) onAgentStart('content');
    const contentResult = await runContentAgent(userPrompt, businessContext, apiKey);
    agentResults.push(contentResult);
    if (onAgentComplete) onAgentComplete(contentResult);

    // Design Agent
    if (onAgentStart) onAgentStart('design');
    const designResult = await runDesignAgent(userPrompt, businessContext, apiKey);
    agentResults.push(designResult);
    if (onAgentComplete) onAgentComplete(designResult);

    // SEO Agent
    if (onAgentStart) onAgentStart('seo');
    const seoResult = await runSEOAgent(userPrompt, businessContext, apiKey);
    agentResults.push(seoResult);
    if (onAgentComplete) onAgentComplete(seoResult);

    // Check success
    const allSuccess = agentResults.every((r) => r.success);

    if (!allSuccess) {
      const failedAgents = agentResults.filter((r) => !r.success).map((r) => r.agent);
      return {
        success: false,
        output: null,
        agentResults,
        totalDuration: Date.now() - startTime,
        error: `Agents failed: ${failedAgents.join(', ')}`,
      };
    }

    // Combine outputs
    const combinedOutput = {
      content: contentResult.output,
      design: designResult.output,
      seo: seoResult.output,
      metadata: {
        title: seoResult.output?.title || businessContext.businessName || 'Website',
        description: seoResult.output?.description || 'Welcome to our website',
      },
      agentInsights: {
        contentReasoning: contentResult.reasoning,
        designReasoning: designResult.reasoning,
        seoReasoning: seoResult.reasoning,
      },
    };

    const totalDuration = Date.now() - startTime;

    return {
      success: true,
      output: combinedOutput,
      agentResults,
      totalDuration,
    };
  } catch (error) {
    return {
      success: false,
      output: null,
      agentResults,
      totalDuration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Orchestration failed',
    };
  }
}
