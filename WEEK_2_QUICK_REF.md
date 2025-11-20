# Week 2 Quick Reference

**Goal:** Transform from "production-ready" to "market-leading"  
**Time:** 22.5 hours over 5 days

---

## 📋 Daily Breakdown

### Day 1: Advanced Editor (4.5h)
- ✅ Undo/Redo (2h) - Command pattern, keyboard shortcuts
- ✅ Drag & Drop (1.5h) - @dnd-kit, smooth animations
- ✅ Block Library (1h) - Search, preview, quick insert

**Why:** Professional editor = longer sessions = more engagement

---

### Day 2: AI Magic (5h)
- ✅ AI Suggestions (2h) - Proactive improvement tips
- ✅ Prompt Enhancement (1.5h) - Auto-improve user prompts
- ✅ SEO Optimizer (1.5h) - Auto-generate metadata

**Why:** Better AI = better output = happier users

---

### Day 3: Viral Growth (4h)
- ✅ Public Showcase (1.5h) - Gallery of user sites
- ✅ Embed Codes (1h) - Iframe embeds for distribution
- ✅ Social Sharing (1.5h) - OG images, share buttons

**Why:** Viral features = organic growth = lower CAC

---

### Day 4: Monetization (4.5h)
- ✅ Stripe Integration (2h) - Payment infrastructure
- ✅ Usage Limits (1.5h) - Gating & upgrade prompts
- ✅ Referral Program (1h) - Incentivized growth

**Why:** Revenue = sustainability = growth

---

### Day 5: Polish & Delight (4.5h)
- ✅ AI Chat (2h) - Conversational website building
- ✅ Version History (1.5h) - Never lose work
- ✅ Accessibility (1h) - WCAG checker

**Why:** Wow moments = word of mouth = brand loyalty

---

## 🎯 Priorities (If Short on Time)

### Must Do (Core Value)
1. Undo/Redo - Table stakes
2. Stripe Integration - Revenue
3. AI Suggestions - Differentiation
4. Drag & Drop - UX leap

### Should Do (High Impact)
5. Public Showcase - Growth
6. Usage Limits - Monetization
7. AI Chat - Wow factor
8. Version History - Trust

### Nice to Do (Polish)
9. SEO Optimizer - Value-add
10. Embed Codes - Distribution
11. Referral Program - Viral
12. Accessibility - Responsibility

---

## 📊 Success Criteria

### Engagement
- Session time: >10 min
- Weekly retention: >50%
- Feature adoption: >30%

### Growth
- Showcase CTR: >5%
- Social shares: >2/site
- Referrals: >10% of signups

### Revenue
- Free-to-paid: >2%
- Upgrade prompts: 100% at limits
- Churn: <5%

### Technical
- Lighthouse: >95
- Zero bugs in undo/redo
- API latency: <500ms p95

---

## 🛠️ Tech Stack Additions

**New Dependencies:**
- `@dnd-kit/core` - Drag & drop
- `stripe` + `@stripe/stripe-js` - Payments
- `@vercel/og` - OG image generation

**New DB Tables:**
- `showcase_websites` - Public gallery
- `website_versions` - History
- `subscriptions` - Stripe data
- `referrals` - Growth program
- `usage_tracking` - Limits

**New API Routes:**
- `/api/suggestions` - AI tips
- `/api/seo` - SEO generation
- `/api/chat-assistant` - AI chat
- `/api/stripe/*` - Webhooks
- `/api/og` - Dynamic images

---

## 💡 Quick Tips

### For Implementation
- Start with undo/redo (foundation for other features)
- Test Stripe in test mode first
- Use feature flags for gradual rollout
- Analytics on EVERYTHING
- Error boundaries on new features

### For Quality
- TypeScript strict mode
- E2E tests for payment flow
- Accessibility from day 1
- Performance budget: <200KB bundle
- Mobile-first for all features

### For Growth
- Showcase live by Day 3
- Referral program by Day 4
- Social sharing optimized
- Analytics dashboard for tracking
- A/B test pricing tiers

---

## 🚀 Expected Transformation

### Before (Week 1)
- Production-ready app
- Basic features working
- Good UX foundation
- Analytics in place

### After (Week 2)
- Market-leading editor
- Magical AI capabilities
- Viral growth mechanisms
- Revenue infrastructure
- Public launch ready

**Impact:** 10x better product, ready to scale

---

## 📞 Need Help?

### Resources
- Stripe docs: stripe.com/docs
- @dnd-kit docs: docs.dndkit.com
- Vercel OG: vercel.com/docs/functions/edge-functions/og-image-generation
- Gemini AI: ai.google.dev/docs

### Common Issues
- Stripe webhooks: Use Stripe CLI for local testing
- DnD performance: Use React.memo on sortable items
- OG images: Cache aggressively, use edge functions
- AI costs: Set rate limits, cache suggestions

---

**Status:** Ready to start Day 1 whenever you're ready!

🎯 **First Step:** Install @dnd-kit and start undo/redo system
