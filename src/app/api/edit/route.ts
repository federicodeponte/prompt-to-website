// ABOUTME: API route for AI-powered website configuration editing using Gemini
// ABOUTME: POST /api/edit - Modifies existing WebsiteConfig based on user instructions

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WebsiteConfig } from '@/lib/types/website-config';

// Mark as dynamic route to prevent build-time execution
export const dynamic = 'force-dynamic';

/**
 * System prompt for Gemini to edit website configurations
 * Follows LeadForm-Builder pattern for iterative AI-driven editing
 */
const SYSTEM_PROMPT = `You are an expert web designer and developer. Your task is to modify an existing website configuration JSON based on user instructions.

CRITICAL RULES:
1. You will receive a COMPLETE WebsiteConfig JSON
2. You will receive a user instruction describing what to change
3. You MUST return ONLY the modified JSON - no explanations, no markdown formatting
4. Preserve ALL parts of the configuration that are not explicitly mentioned in the instruction
5. Ensure the output is valid JSON that follows the WebsiteConfig structure
6. Do NOT add or remove blocks unless explicitly instructed
7. Do NOT change theme colors unless explicitly instructed
8. Do NOT modify metadata unless explicitly instructed

Available block types: hero, features, pricing, testimonials, cta, footer, stats, faq, contact, newsletter, team, logo-cloud, gallery, process, video

When editing:
- "make it blue" → Update theme.colors.primary
- "add a pricing block" → Add new block to blocks array
- "remove the footer" → Remove footer block from blocks array
- "change the heading" → Update the heading in the appropriate block's content
- "make it 3 columns" → Update columns property in block content (if applicable)

Example instruction: "Change the primary color to red and update the hero heading to 'Welcome Home'"
Example response: { "version": "1.0", "template": "saas-landing", ... (full modified JSON) }

Return ONLY valid JSON, no extra text.`;

/**
 * POST /api/edit
 * Modifies a website configuration based on user instruction
 *
 * Body:
 * - config: WebsiteConfig (required) - Current website configuration
 * - instruction: string (required) - User's instruction for modification
 *
 * Returns: { config: WebsiteConfig }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { config, instruction } = body as {
      config: WebsiteConfig;
      instruction: string;
    };

    // Validation
    if (!config || typeof config !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid config' },
        { status: 400 }
      );
    }

    if (!instruction || typeof instruction !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid instruction' },
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
        temperature: 0.2, // Low temperature for consistent editing
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
      },
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build edit prompt following LeadForm-Builder pattern
    const fullPrompt = `You are given this WebsiteConfig JSON (no extra text):
${JSON.stringify(config, null, 2)}

Apply this instruction and output ONLY the modified, valid JSON:
"${instruction}" and make sure to keep everything ELSE, apart from instructed changes, the same.

Make sure all block types are from this list: hero, features, pricing, testimonials, cta, footer, stats, faq, contact, newsletter, team, logo-cloud, gallery, process, video`;

    // Generate edited content
    const result = await model.generateContent(fullPrompt);

    const response = result.response;
    const text = response.text();

    // Parse JSON response
    let editedConfig: WebsiteConfig;
    try {
      // Extract JSON from response (handle any markdown formatting)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;

      editedConfig = JSON.parse(jsonString);
    } catch {
      console.error('Failed to parse Gemini edit response as JSON:', text);
      return NextResponse.json(
        { error: 'AI generated invalid JSON response', details: text.substring(0, 200) },
        { status: 500 }
      );
    }

    // Validate edited config structure
    if (!editedConfig.version || !editedConfig.template || !editedConfig.theme || !editedConfig.blocks || !editedConfig.metadata) {
      return NextResponse.json(
        { error: 'AI generated incomplete configuration', details: editedConfig },
        { status: 500 }
      );
    }

    // Ensure block IDs exist (add if missing)
    editedConfig.blocks = editedConfig.blocks.map((block, index) => ({
      ...block,
      id: block.id || `${block.type}-${index + 1}`,
    }));

    return NextResponse.json({ config: editedConfig });
  } catch (error) {
    console.error('Unexpected error in POST /api/edit:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
