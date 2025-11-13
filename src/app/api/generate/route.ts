// ABOUTME: API route for AI-powered website generation using Gemini
// ABOUTME: POST /api/generate - Generates WebsiteConfig from user prompt

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WebsiteConfig } from '@/lib/types/website-config';

// Mark as dynamic route to prevent build-time execution
export const dynamic = 'force-dynamic';

/**
 * System prompt for Gemini to generate website configurations
 * Provides structure and examples for consistent JSON generation
 */
const SYSTEM_PROMPT = `You are an expert web designer and developer. Your task is to generate a complete website configuration in JSON format based on user prompts.

The configuration must follow this exact TypeScript structure:

\`\`\`typescript
interface WebsiteConfig {
  version: string; // Always "1.0"
  template: "saas-landing" | "product-landing" | "portfolio" | "custom";
  theme: {
    colors: {
      primary: string; // Hex color
      secondary: string;
      background: string;
      text: string;
      muted: string;
    };
    fonts: {
      heading: string; // Font family
      body: string;
    };
  };
  blocks: Block[]; // Array of content blocks
  metadata: {
    title: string;
    description: string;
    author?: string;
    favicon?: string;
    ogImage?: string;
  };
}
\`\`\`

Available block types: hero, features, pricing, testimonials, cta, footer, stats, faq, contact, newsletter, team

Block variants:
- hero: centered, split, gradient
- features: grid, list
- pricing: simple, comparison
- testimonials: cards, carousel
- cta: simple, split
- footer: multi-column, simple
- stats: grid, bar
- faq: accordion, grid
- contact: simple, split
- newsletter: simple
- team: grid, list

IMPORTANT RULES:
1. Always return ONLY valid JSON, no markdown code blocks or extra text
2. Include at least 3-5 blocks for a complete website
3. Ensure all content is professional and relevant to the user's request
4. Use appropriate colors that match the brand/purpose
5. Include realistic placeholder content (company names, features, pricing, etc.)
6. For SaaS: include hero, features, pricing, testimonials, cta, footer
7. For Product: include hero, features, stats, testimonials, cta, footer
8. For Portfolio: include hero, stats, testimonials, contact, footer

Example structure:
{
  "version": "1.0",
  "template": "saas-landing",
  "theme": {
    "colors": {
      "primary": "#0070f3",
      "secondary": "#7928ca",
      "background": "#ffffff",
      "text": "#000000",
      "muted": "#666666"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    }
  },
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "variant": "centered",
      "content": {
        "heading": "Build Amazing Websites",
        "subheading": "The fastest way to create landing pages",
        "ctaPrimary": { "text": "Get Started", "href": "#pricing" },
        "ctaSecondary": { "text": "Learn More", "href": "#features" }
      }
    }
  ],
  "metadata": {
    "title": "Product Name - Tagline",
    "description": "Brief description of the product or service"
  }
}`;

/**
 * POST /api/generate
 * Generates a website configuration from a user prompt
 *
 * Body:
 * - prompt: string (required) - User's description of desired website
 * - template?: string (optional) - Preferred template type
 *
 * Returns: { config: WebsiteConfig }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, template } = body as {
      prompt: string;
      template?: string;
    };

    // Validation
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid prompt' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Gemini AI (done here to avoid build-time execution)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Prepare model with JSON mode
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
      },
    });

    // Build user message
    const userMessage = template
      ? `${prompt}\n\nPreferred template: ${template}`
      : prompt;

    // Generate content with system prompt + user message
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Request: ${userMessage}\n\nGenerate a complete WebsiteConfig JSON:`;

    const result = await model.generateContent(fullPrompt);

    const response = result.response;
    const text = response.text();

    // Parse JSON response
    let config: WebsiteConfig;
    try {
      config = JSON.parse(text);
    } catch {
      console.error('Failed to parse Gemini response as JSON:', text);
      return NextResponse.json(
        { error: 'AI generated invalid JSON response', details: text.substring(0, 200) },
        { status: 500 }
      );
    }

    // Validate config structure
    if (!config.version || !config.template || !config.theme || !config.blocks || !config.metadata) {
      return NextResponse.json(
        { error: 'AI generated incomplete configuration', details: config },
        { status: 500 }
      );
    }

    // Add unique IDs to blocks if missing
    config.blocks = config.blocks.map((block, index) => ({
      ...block,
      id: block.id || `${block.type}-${index + 1}`,
    }));

    return NextResponse.json({ config });
  } catch (error) {
    console.error('Unexpected error in POST /api/generate:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
