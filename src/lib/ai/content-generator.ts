// ABOUTME: AI-powered content generator that creates complete website content from business description
// ABOUTME: Uses Gemini 2.5 Pro for high-quality, industry-specific content generation

import { GoogleGenerativeAI } from '@google/generative-ai';

// Business profile for content generation
export interface BusinessProfile {
  industry: string;
  businessName: string;
  description: string;
  targetAudience: string;
  uniqueValue: string;
  tone?: 'professional' | 'friendly' | 'bold' | 'minimal';
  primaryColor?: string;
}

// Generated content structure
export interface GeneratedContent {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  about: {
    title: string;
    content: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company?: string;
  }>;
  cta: {
    headline: string;
    description: string;
    buttonText: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

// Industry-specific knowledge base
const industryKnowledge = {
  'saas': {
    keywords: ['software', 'cloud', 'automation', 'productivity', 'integration'],
    ctaExamples: ['Start Free Trial', 'Get Started', 'Sign Up Free'],
    focusAreas: ['features', 'integrations', 'security', 'pricing'],
  },
  'ecommerce': {
    keywords: ['shop', 'products', 'quality', 'fast shipping', 'guarantee'],
    ctaExamples: ['Shop Now', 'Browse Products', 'View Collection'],
    focusAreas: ['products', 'reviews', 'shipping', 'returns'],
  },
  'agency': {
    keywords: ['expert', 'creative', 'strategy', 'results', 'partnership'],
    ctaExamples: ['Get a Quote', 'Start Project', 'Book Consultation'],
    focusAreas: ['portfolio', 'services', 'process', 'team'],
  },
  'restaurant': {
    keywords: ['fresh', 'delicious', 'authentic', 'local', 'experience'],
    ctaExamples: ['Reserve Table', 'Order Now', 'View Menu'],
    focusAreas: ['menu', 'location', 'hours', 'reservations'],
  },
  'fitness': {
    keywords: ['transform', 'strength', 'health', 'goals', 'community'],
    ctaExamples: ['Join Now', 'Book Free Session', 'Start Training'],
    focusAreas: ['programs', 'trainers', 'results', 'pricing'],
  },
  'education': {
    keywords: ['learn', 'expert', 'certified', 'career', 'skills'],
    ctaExamples: ['Enroll Now', 'Start Learning', 'View Courses'],
    focusAreas: ['courses', 'instructors', 'outcomes', 'pricing'],
  },
  'healthcare': {
    keywords: ['care', 'expert', 'compassionate', 'trusted', 'health'],
    ctaExamples: ['Book Appointment', 'Contact Us', 'Learn More'],
    focusAreas: ['services', 'team', 'insurance', 'location'],
  },
  'realestate': {
    keywords: ['dream home', 'expert', 'local', 'trusted', 'investment'],
    ctaExamples: ['View Listings', 'Schedule Tour', 'Contact Agent'],
    focusAreas: ['listings', 'services', 'testimonials', 'contact'],
  },
  'consulting': {
    keywords: ['expert', 'strategy', 'growth', 'insights', 'results'],
    ctaExamples: ['Schedule Call', 'Get Started', 'Book Consultation'],
    focusAreas: ['services', 'approach', 'results', 'contact'],
  },
  'portfolio': {
    keywords: ['creative', 'innovative', 'professional', 'unique', 'quality'],
    ctaExamples: ['View Work', 'Get in Touch', 'Hire Me'],
    focusAreas: ['projects', 'skills', 'about', 'contact'],
  },
};

// Get industry knowledge or use default
function getIndustryKnowledge(industry: string) {
  const normalizedIndustry = industry.toLowerCase().replace(/[^a-z]/g, '');
  return industryKnowledge[normalizedIndustry as keyof typeof industryKnowledge] || {
    keywords: ['professional', 'quality', 'trusted', 'expert', 'service'],
    ctaExamples: ['Get Started', 'Learn More', 'Contact Us'],
    focusAreas: ['services', 'about', 'contact', 'testimonials'],
  };
}

// Generate content using Gemini 2.5 Pro
export async function generateWebsiteContent(
  profile: BusinessProfile,
  apiKey?: string
): Promise<GeneratedContent> {
  const genAI = new GoogleGenerativeAI(apiKey || process.env.GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' }); // Use Pro for quality

  const industryInfo = getIndustryKnowledge(profile.industry);
  const tone = profile.tone || 'professional';

  const systemPrompt = `You are an expert copywriter and marketing strategist specializing in high-converting website content.

BUSINESS PROFILE:
- Industry: ${profile.industry}
- Business Name: ${profile.businessName}
- Description: ${profile.description}
- Target Audience: ${profile.targetAudience}
- Unique Value: ${profile.uniqueValue}
- Tone: ${tone}

INDUSTRY CONTEXT:
- Keywords to incorporate: ${industryInfo.keywords.join(', ')}
- Focus areas: ${industryInfo.focusAreas.join(', ')}
- CTA examples: ${industryInfo.ctaExamples.join(', ')}

INSTRUCTIONS:
1. Write compelling, conversion-focused copy that speaks directly to the target audience
2. Use the ${tone} tone throughout
3. Highlight the unique value proposition clearly
4. Create emotionally engaging headlines that grab attention
5. Include specific benefits, not just features
6. Use power words and action-oriented language
7. Keep copy concise and scannable
8. Ensure brand voice is consistent across all sections

Generate complete website content following this structure:
- Hero section: Attention-grabbing headline, clear subheadline, strong CTA
- About section: Compelling story that builds trust
- Features: 3-4 key benefits with clear descriptions
- Testimonials: 2-3 realistic customer testimonials
- CTA section: Final conversion push
- Footer: Memorable tagline and copyright

Format the response as valid JSON matching this TypeScript interface:
{
  hero: { headline: string; subheadline: string; cta: string },
  about: { title: string; content: string },
  features: [{ title: string; description: string; icon?: string }],
  testimonials: [{ quote: string; author: string; role: string; company?: string }],
  cta: { headline: string; description: string; buttonText: string },
  footer: { tagline: string; copyright: string }
}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      generationConfig: {
        temperature: 0.8, // Creative but controlled
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const response = result.response;
    const text = response.text();

    // Extract JSON from response (may be wrapped in markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response as JSON');
    }

    const content = JSON.parse(jsonMatch[0]) as GeneratedContent;

    // Validate the structure
    if (!content.hero || !content.about || !content.features || !content.testimonials || !content.cta || !content.footer) {
      throw new Error('Generated content missing required sections');
    }

    return content;
  } catch (error) {
    console.error('Error generating content:', error);

    // Fallback to basic template if AI fails
    return generateFallbackContent(profile);
  }
}

// Fallback content generator if AI fails
function generateFallbackContent(profile: BusinessProfile): GeneratedContent {
  const industryInfo = getIndustryKnowledge(profile.industry);

  return {
    hero: {
      headline: `Welcome to ${profile.businessName}`,
      subheadline: profile.description,
      cta: industryInfo.ctaExamples[0] || 'Get Started',
    },
    about: {
      title: 'About Us',
      content: `${profile.businessName} is dedicated to serving ${profile.targetAudience}. ${profile.uniqueValue}`,
    },
    features: [
      {
        title: 'Quality Service',
        description: 'We provide top-notch service to all our customers.',
      },
      {
        title: 'Expert Team',
        description: 'Our experienced team is here to help you succeed.',
      },
      {
        title: 'Proven Results',
        description: 'Join hundreds of satisfied customers who trust us.',
      },
    ],
    testimonials: [
      {
        quote: `${profile.businessName} exceeded our expectations. Highly recommended!`,
        author: 'John Smith',
        role: 'Customer',
      },
      {
        quote: 'Professional, efficient, and results-driven. A pleasure to work with.',
        author: 'Sarah Johnson',
        role: 'Client',
      },
    ],
    cta: {
      headline: 'Ready to Get Started?',
      description: `Join ${profile.targetAudience} who trust ${profile.businessName}.`,
      buttonText: industryInfo.ctaExamples[0] || 'Contact Us',
    },
    footer: {
      tagline: `${profile.businessName} - ${profile.uniqueValue}`,
      copyright: `© ${new Date().getFullYear()} ${profile.businessName}. All rights reserved.`,
    },
  };
}

// Quick content generation for testing
export async function generateQuickContent(businessName: string, industry: string): Promise<GeneratedContent> {
  return generateWebsiteContent({
    industry,
    businessName,
    description: `A leading ${industry} business`,
    targetAudience: `${industry} customers`,
    uniqueValue: 'Quality service and expert solutions',
    tone: 'professional',
  });
}

// Available industries
export const AVAILABLE_INDUSTRIES = [
  'SaaS',
  'E-commerce',
  'Agency',
  'Restaurant',
  'Fitness',
  'Education',
  'Healthcare',
  'Real Estate',
  'Consulting',
  'Portfolio',
  'Photography',
  'Law Firm',
  'Dental',
  'Automotive',
  'Beauty Salon',
  'Construction',
  'Financial Services',
  'Non-Profit',
  'Travel',
  'Event Planning',
] as const;

export type Industry = typeof AVAILABLE_INDUSTRIES[number];
