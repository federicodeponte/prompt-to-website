# Week 2 Implementation Plan - Next Level Features

**Project:** Prompt to Website - AI-Powered Website Builder  
**Timeline:** Week of November 21-27, 2025  
**Goal:** Transform from "production-ready" to "market-leading"  
**Focus:** Advanced features, polish, scalability, monetization readiness

---

## 🎯 Strategic Objectives

### Vision
Take the app from "working well" to "industry-leading" by adding features that:
- Increase user engagement and retention
- Enable monetization pathways
- Improve AI capabilities significantly
- Create competitive advantages
- Build viral growth mechanisms

### Success Metrics
- **User Engagement:** +50% time on site (editor improvements)
- **AI Quality:** +30% user satisfaction (better prompts & suggestions)
- **Viral Coefficient:** >0.3 (sharing features)
- **Monetization Ready:** Payment integration complete
- **Performance:** <2s load time, 95+ Lighthouse score

---

## 📅 Week 2 Schedule (22.5 hours)

### Day 1: Advanced Editor UX (4.5 hours)
**Theme:** Professional editor that rivals Webflow/Framer

#### Session 1.1: Undo/Redo System (2h)
**Objective:** Implement full undo/redo with keyboard shortcuts

**Technical Approach:**
- Command pattern for all mutations
- History stack with max 50 states
- Keyboard shortcuts (Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z)
- Visual indicator of undo/redo availability
- Optimized state snapshots (JSON.stringify only changed blocks)

**Implementation:**
```typescript
// src/lib/editor/history.ts
interface HistoryCommand {
  execute: () => void;
  undo: () => void;
  timestamp: number;
  description: string;
}

class EditorHistory {
  private past: HistoryCommand[] = [];
  private future: HistoryCommand[] = [];
  private maxHistory = 50;
  
  execute(command: HistoryCommand) { /* ... */ }
  undo() { /* ... */ }
  redo() { /* ... */ }
}
```

**Files:**
- Create: `src/lib/editor/history.ts`, `src/lib/editor/commands.ts`
- Modify: `src/components/editor/EditorLayout.tsx`
- Add: Toast notifications for undo/redo actions

**Success Criteria:**
- [ ] All block operations (add, delete, edit, reorder) support undo
- [ ] Keyboard shortcuts work
- [ ] History persists during session
- [ ] Visual feedback for undo/redo state

---

#### Session 1.2: Drag & Drop Block Reordering (1.5h)
**Objective:** Intuitive block reordering with smooth animations

**Technical Approach:**
- Use `@dnd-kit/core` (already in Next.js ecosystem)
- Sortable blocks with visual drag handles
- Smooth animations during reorder
- Auto-scroll during drag
- Undo/redo integration

**Implementation:**
```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Wrap blocks in sortable container
<DndContext onDragEnd={handleDragEnd}>
  <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
    {blocks.map(block => <SortableBlock key={block.id} block={block} />)}
  </SortableContext>
</DndContext>
```

**Files:**
- Install: `@dnd-kit/core`, `@dnd-kit/sortable`
- Create: `src/components/editor/SortableBlock.tsx`
- Modify: `src/components/editor/ManualModePanel.tsx`

**Success Criteria:**
- [ ] Blocks can be reordered via drag & drop
- [ ] Visual indicators during drag (placeholder, drag handle)
- [ ] Smooth animations
- [ ] Works on mobile (touch events)

---

#### Session 1.3: Block Templates Library (1h)
**Objective:** Quick insertion of pre-designed block variations

**Features:**
- Block library sidebar with search
- Categories: Hero, Features, Pricing, etc.
- Preview thumbnails for each variation
- One-click insertion at cursor position
- Favorites/recent blocks

**Implementation:**
```typescript
// src/lib/blocks/templates.ts
export const blockTemplates = {
  hero: [
    { id: 'hero-centered', name: 'Centered Hero', preview: '...', config: {...} },
    { id: 'hero-split', name: 'Split Hero', preview: '...', config: {...} },
  ],
  features: [...]
};
```

**Files:**
- Create: `src/lib/blocks/templates.ts`, `src/components/editor/BlockLibrary.tsx`
- Modify: `src/components/editor/EditorLayout.tsx`

**Success Criteria:**
- [ ] Block library accessible via button/shortcut
- [ ] Search and filter blocks
- [ ] Preview before insertion
- [ ] Analytics tracking for popular blocks

---

### Day 2: AI Enhancements (5 hours)
**Theme:** Make AI feel magical, not just functional

#### Session 2.1: AI Suggestions Engine (2h)
**Objective:** Proactive AI suggestions for improvements

**Features:**
- Auto-analyze website on save
- Suggest improvements:
  - "Your CTA could be more compelling"
  - "Add testimonials for trust"
  - "Pricing section missing - want one?"
  - "Color contrast issue on button"
- One-click apply suggestions
- Dismiss/snooze options

**Implementation:**
```typescript
// src/lib/ai/suggestions.ts
interface Suggestion {
  id: string;
  type: 'missing-section' | 'content-improvement' | 'design-issue' | 'seo';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: () => Promise<void>;
}

async function analyzeSite(config: WebsiteConfig): Promise<Suggestion[]> {
  // Use Gemini to analyze structure
  // Check for common issues (missing sections, weak CTAs, etc.)
  // Return prioritized suggestions
}
```

**Files:**
- Create: `src/lib/ai/suggestions.ts`, `src/components/editor/SuggestionsPanel.tsx`
- API: `src/app/api/suggestions/route.ts`

**Success Criteria:**
- [ ] Suggestions appear in sidebar
- [ ] Relevant and actionable (not generic)
- [ ] One-click apply works
- [ ] Analytics: % of suggestions accepted

---

#### Session 2.2: Smart Prompt Enhancement (1.5h)
**Objective:** Improve user prompts automatically before sending to AI

**Features:**
- Analyze user prompt for vagueness
- Auto-enhance with context:
  - "Modern website" → "Modern, clean website with gradient backgrounds, glassmorphism effects, and smooth animations"
  - "Restaurant site" → "Restaurant website with online menu, reservation system, photo gallery, and location map"
- Show before/after enhancement
- Option to use original or enhanced

**Implementation:**
```typescript
// src/lib/ai/prompt-enhancer.ts
async function enhancePrompt(userPrompt: string, context: {
  template?: string;
  industry?: string;
}): Promise<{
  original: string;
  enhanced: string;
  improvements: string[];
}> {
  // Use Gemini to analyze and enhance
}
```

**Files:**
- Create: `src/lib/ai/prompt-enhancer.ts`
- Modify: `src/components/template-gallery/TemplateGallery.tsx`
- API: `src/app/api/enhance-prompt/route.ts`

**Success Criteria:**
- [ ] Prompts auto-enhanced with user consent
- [ ] Enhancement improves output quality (A/B test)
- [ ] Users can see what was enhanced
- [ ] Analytics: enhancement acceptance rate

---

#### Session 2.3: AI-Powered SEO Optimizer (1.5h)
**Objective:** Auto-generate SEO-optimized metadata

**Features:**
- Analyze website content
- Generate:
  - Meta title (optimal length, keywords)
  - Meta description (compelling, under 160 chars)
  - Open Graph tags
  - Structured data (JSON-LD)
- Keyword suggestions
- SEO score (1-100)

**Implementation:**
```typescript
// src/lib/ai/seo-optimizer.ts
interface SEOAnalysis {
  score: number; // 0-100
  title: string;
  description: string;
  keywords: string[];
  issues: string[];
  suggestions: string[];
  structuredData: object;
}

async function generateSEO(config: WebsiteConfig): Promise<SEOAnalysis> {
  // Use Gemini to analyze content
  // Generate optimized metadata
  // Check for common SEO issues
}
```

**Files:**
- Create: `src/lib/ai/seo-optimizer.ts`, `src/components/editor/SEOPanel.tsx`
- API: `src/app/api/seo/route.ts`

**Success Criteria:**
- [ ] SEO panel in editor
- [ ] Auto-generated metadata is high quality
- [ ] SEO score helps users improve
- [ ] One-click apply to website config

---

### Day 3: Collaboration & Sharing (4 hours)
**Theme:** Viral growth through sharing features

#### Session 3.1: Public Portfolio/Showcase (1.5h)
**Objective:** Users can publish websites to public gallery

**Features:**
- Public gallery page (`/showcase`)
- Filter by template, industry, popularity
- Like/bookmark websites
- "Use This Template" button
- Profile page showing user's published sites

**Implementation:**
```typescript
// Database schema
CREATE TABLE showcase_websites (
  id UUID PRIMARY KEY,
  website_id UUID REFERENCES websites(id),
  user_id UUID,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT true,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ
);
```

**Files:**
- Migration: `supabase/migrations/add_showcase.sql`
- Pages: `src/app/showcase/page.tsx`, `src/app/showcase/[id]/page.tsx`
- Component: `src/components/showcase/ShowcaseGallery.tsx`

**Success Criteria:**
- [ ] Users can publish to showcase
- [ ] Gallery is discoverable and attractive
- [ ] "Use This Template" creates copy
- [ ] Analytics: views, likes, conversions

---

#### Session 3.2: Embed Code Generation (1h)
**Objective:** Allow websites to be embedded anywhere

**Features:**
- Generate iframe embed code
- Responsive embed options
- Custom sizing (small, medium, large, custom)
- Preview embed before copying
- Analytics tracking for embeds

**Implementation:**
```typescript
// src/lib/embed/generator.ts
function generateEmbedCode(websiteId: string, options: {
  width: string | number;
  height: string | number;
  responsive: boolean;
}): string {
  return `<iframe src="${baseUrl}/embed/${websiteId}" 
    width="${options.width}" 
    height="${options.height}"
    ${options.responsive ? 'style="width:100%;aspect-ratio:16/9"' : ''}
    frameborder="0"></iframe>`;
}
```

**Files:**
- Create: `src/lib/embed/generator.ts`, `src/app/embed/[id]/page.tsx`
- Component: `src/components/export/EmbedModal.tsx`

**Success Criteria:**
- [ ] Embed code works on external sites
- [ ] Responsive embeds maintain aspect ratio
- [ ] Analytics track embed views
- [ ] Preview before copying

---

#### Session 3.3: Social Sharing Optimization (1.5h)
**Objective:** Beautiful social shares that drive traffic

**Features:**
- Auto-generate social preview images (Open Graph)
- Twitter/X card optimization
- LinkedIn preview optimization
- Custom share text generation
- Pre-filled social share links
- Track shares via analytics

**Implementation:**
```typescript
// src/app/api/og/route.tsx (Edge function)
import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const websiteId = searchParams.get('id');
  
  // Fetch website data
  // Generate beautiful OG image with website screenshot
  return new ImageResponse(<div>...</div>);
}
```

**Files:**
- API: `src/app/api/og/route.tsx`
- Modify: `src/app/preview/page.tsx` (add OG tags)
- Component: `src/components/export/SocialShareButtons.tsx`

**Success Criteria:**
- [ ] Rich previews on all social platforms
- [ ] OG images are attractive
- [ ] Share buttons work correctly
- [ ] Analytics track social shares

---

### Day 4: Monetization Foundation (4.5 hours)
**Theme:** Prepare for revenue generation

#### Session 4.1: Stripe Integration (2h)
**Objective:** Payment infrastructure ready

**Features:**
- Stripe Checkout integration
- Subscription plans:
  - Free: 3 websites, basic templates
  - Pro ($9/mo): Unlimited websites, all templates, export
  - Business ($29/mo): Pro + custom domain, white-label
- Usage-based limits enforcement
- Billing portal integration

**Implementation:**
```typescript
// src/lib/stripe/products.ts
export const plans = {
  free: {
    price: 0,
    limits: { websites: 3, exports: 10, ai_edits: 50 }
  },
  pro: {
    price: 9,
    stripePriceId: 'price_xxx',
    limits: { websites: -1, exports: -1, ai_edits: 500 }
  },
  business: {
    price: 29,
    stripePriceId: 'price_yyy',
    limits: { websites: -1, exports: -1, ai_edits: -1 }
  }
};
```

**Files:**
- Install: `@stripe/stripe-js`, `stripe`
- Create: `src/lib/stripe/`, `src/app/api/stripe/`
- Database: Add `subscriptions` table
- Pages: `src/app/pricing/page.tsx`, `src/app/billing/page.tsx`

**Success Criteria:**
- [ ] Users can upgrade to paid plans
- [ ] Limits enforced correctly
- [ ] Billing portal works
- [ ] Webhook handling for events

---

#### Session 4.2: Usage Limits & Gating (1.5h)
**Objective:** Enforce plan limits gracefully

**Features:**
- Usage tracking (websites, AI edits, exports)
- Soft limits (warnings at 80%)
- Hard limits (gated features)
- Upgrade prompts at limits
- Usage dashboard

**Implementation:**
```typescript
// src/lib/limits/checker.ts
async function checkLimit(userId: string, action: 'website' | 'ai_edit' | 'export'): Promise<{
  allowed: boolean;
  used: number;
  limit: number;
  plan: string;
}> {
  // Check user's plan
  // Count usage this month
  // Return limit status
}
```

**Files:**
- Create: `src/lib/limits/`, `src/components/limits/UpgradePrompt.tsx`
- Modify: API routes to check limits
- Component: `src/components/dashboard/UsageWidget.tsx`

**Success Criteria:**
- [ ] Limits enforced on all gated actions
- [ ] Clear upgrade prompts
- [ ] Usage visible to users
- [ ] Analytics: conversion rate at limits

---

#### Session 4.3: Referral Program (1h)
**Objective:** Viral growth through incentives

**Features:**
- Unique referral links
- Rewards:
  - Referrer: 1 month free Pro per signup
  - Referee: 20% off first month
- Referral dashboard (signups, earnings)
- Email notifications for referrals
- Leaderboard (optional)

**Implementation:**
```typescript
// Database schema
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  referrer_id UUID REFERENCES users(id),
  referee_id UUID REFERENCES users(id),
  code TEXT UNIQUE,
  status TEXT, -- 'pending', 'active', 'expired'
  reward_granted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ
);
```

**Files:**
- Migration: `supabase/migrations/add_referrals.sql`
- Create: `src/lib/referrals/`, `src/app/referrals/page.tsx`
- Component: `src/components/referrals/ReferralDashboard.tsx`

**Success Criteria:**
- [ ] Referral links work
- [ ] Rewards granted automatically
- [ ] Dashboard shows referral stats
- [ ] Analytics: viral coefficient

---

### Day 5: Advanced Features & Polish (4.5 hours)
**Theme:** Delightful details that create wow moments

#### Session 5.1: AI Chat Assistant (2h)
**Objective:** Conversational AI for website building

**Features:**
- Chat interface in editor
- Context-aware responses
- Actions:
  - "Add a pricing section"
  - "Make the hero more modern"
  - "Change color scheme to blue"
- Memory of conversation
- Suggested follow-up questions

**Implementation:**
```typescript
// src/lib/ai/chat-assistant.ts
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  action?: {
    type: 'update_config' | 'add_block' | 'suggest';
    payload: any;
  };
}

async function chatWithAssistant(
  messages: ChatMessage[],
  currentConfig: WebsiteConfig
): Promise<ChatMessage> {
  // Use Gemini with function calling
  // Maintain conversation context
  // Execute actions on config
}
```

**Files:**
- Create: `src/lib/ai/chat-assistant.ts`, `src/components/editor/ChatPanel.tsx`
- API: `src/app/api/chat-assistant/route.ts`

**Success Criteria:**
- [ ] Chat understands natural language
- [ ] Actions execute correctly
- [ ] Conversation feels natural
- [ ] Analytics: chat engagement

---

#### Session 5.2: Version History & Restore (1.5h)
**Objective:** Never lose work, restore any version

**Features:**
- Auto-save every 30 seconds
- Version snapshots on major changes
- Version history list (last 30 days)
- Preview before restore
- Compare versions (diff view)

**Implementation:**
```typescript
// Database schema
CREATE TABLE website_versions (
  id UUID PRIMARY KEY,
  website_id UUID REFERENCES websites(id),
  config JSONB,
  version_number INTEGER,
  created_at TIMESTAMPTZ,
  created_by UUID,
  description TEXT
);
```

**Files:**
- Migration: `supabase/migrations/add_versions.sql`
- Create: `src/lib/versions/`, `src/components/editor/VersionHistory.tsx`
- Modify: `src/lib/hooks/use-websites.ts` (auto-save)

**Success Criteria:**
- [ ] Versions saved automatically
- [ ] Restore works perfectly
- [ ] Preview before restore
- [ ] Analytics: restore usage

---

#### Session 5.3: Accessibility Checker (1h)
**Objective:** Ensure websites are accessible

**Features:**
- Auto-scan for WCAG issues:
  - Color contrast
  - Missing alt text
  - Heading hierarchy
  - Keyboard navigation
  - ARIA labels
- Accessibility score (0-100)
- One-click fixes where possible
- Manual fix guidance

**Implementation:**
```typescript
// src/lib/accessibility/checker.ts
interface AccessibilityIssue {
  type: 'contrast' | 'alt-text' | 'heading' | 'aria';
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  element: string;
  message: string;
  fix?: () => void; // Auto-fix if available
}

function checkAccessibility(config: WebsiteConfig): AccessibilityIssue[] {
  // Check color contrast ratios
  // Verify alt text on images
  // Check heading hierarchy
  // etc.
}
```

**Files:**
- Create: `src/lib/accessibility/`, `src/components/editor/AccessibilityPanel.tsx`

**Success Criteria:**
- [ ] Issues detected accurately
- [ ] Score helps users improve
- [ ] Auto-fixes work
- [ ] Analytics: % of sites with issues

---

## 📊 Week 2 Success Metrics

### User Engagement
- [ ] Average session time: >10 minutes
- [ ] Editor retention: >50% return within 7 days
- [ ] Feature adoption: >30% use new features

### AI Quality
- [ ] Suggestion acceptance rate: >40%
- [ ] Prompt enhancement adoption: >60%
- [ ] Chat assistant engagement: >20% try it

### Viral Growth
- [ ] Showcase CTR: >5%
- [ ] Social shares per website: >2
- [ ] Referral signups: >10% of new users

### Monetization
- [ ] Upgrade prompts shown: 100% at limits
- [ ] Free-to-paid conversion: >2%
- [ ] Referral program participation: >15%

### Technical Excellence
- [ ] Lighthouse score: >95
- [ ] Undo/redo: 0 bugs
- [ ] Accessibility score: >90 average
- [ ] Zero production incidents

---

## 🎯 Prioritization Framework

### Must Have (Do First)
1. Undo/Redo - Industry standard feature
2. Drag & Drop - Huge UX improvement
3. Stripe Integration - Revenue enablement
4. AI Suggestions - Competitive advantage

### Should Have (Do Second)
5. Public Showcase - Viral growth
6. AI Chat Assistant - Wow factor
7. Usage Limits - Monetization
8. Version History - Trust builder

### Nice to Have (Do If Time)
9. SEO Optimizer - Value-add
10. Embed Codes - Distribution
11. Referral Program - Growth hack
12. Accessibility Checker - Responsible

---

## 🛠️ Technical Considerations

### New Dependencies
```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@stripe/stripe-js": "^2.4.0",
  "stripe": "^14.10.0",
  "@vercel/og": "^0.6.0"
}
```

### Database Migrations
- `showcase_websites` table
- `website_versions` table
- `subscriptions` table
- `referrals` table
- `usage_tracking` table

### API Routes to Create
- `/api/suggestions` - AI suggestions
- `/api/enhance-prompt` - Prompt enhancement
- `/api/seo` - SEO optimization
- `/api/chat-assistant` - Chat AI
- `/api/stripe/*` - Payment webhooks
- `/api/og` - OG image generation

### Performance Budget
- Initial bundle: <200KB (after gzip)
- Time to Interactive: <3s
- Lighthouse: >95 all metrics
- API response: <500ms p95

---

## 📝 Implementation Notes

### Code Quality
- All new features TypeScript strict mode
- Unit tests for critical logic
- E2E tests for user flows
- Comprehensive error handling
- Analytics on all new features

### User Experience
- Loading states everywhere
- Optimistic UI for mutations
- Clear error messages
- Tooltips for new features
- Onboarding tooltips

### Documentation
- Update README with new features
- CHANGELOG entries for each day
- API documentation for new endpoints
- User guide for advanced features

---

## 🎓 Learning Opportunities

### For User
- Stripe integration patterns
- Advanced AI prompt engineering
- Viral growth mechanics
- SaaS metrics tracking
- Accessibility best practices

### For Project
- Payment infrastructure
- Multi-tenant patterns
- Advanced editor UX
- AI agent patterns
- Growth hacking techniques

---

## 🚀 Expected Outcomes

By end of Week 2, this app will:
- ✅ Have a professional, polished editor (Undo, DnD, templates)
- ✅ Provide AI capabilities that feel magical
- ✅ Enable viral growth (showcase, embeds, referrals)
- ✅ Have monetization infrastructure ready
- ✅ Include accessibility and SEO tools
- ✅ Maintain 95+ Lighthouse scores
- ✅ Be ready for public launch

**Status:** From "production-ready" to "market-leading"

---

**Total Time:** 22.5 hours  
**Complexity:** High  
**Risk:** Medium (payment integration needs testing)  
**ROI:** Very High (revenue + viral growth)

🎯 **Next Action:** Review plan, prioritize based on goals, begin Day 1!

