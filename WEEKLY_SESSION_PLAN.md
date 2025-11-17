# 🚀 WEEKLY SESSION PLAN: Prompt-to-Website
## From C- to Production Excellence

**Current State**: Beautiful landing page with broken flows (Grade: C-)
**Target State**: Full-featured, production-ready SaaS (Grade: A)
**Timeline**: 7 Days (Nov 17-24, 2025)
**Estimated Effort**: 30-40 hours total

---

## 📊 CURRENT STATE ANALYSIS

### ✅ What's Already Built (Foundation - 65%)
- **UI Components** (A+): shadcn/ui, Framer Motion, responsive design
- **Landing Page** (A): Professional hero, features, FAQ, templates
- **AI Integration** (A+): Gemini 2.5 Flash, structured prompts, validation
- **Error Handling** (A+): Centralized messages, toast notifications
- **Storage** (A): IndexedDB with localStorage fallback
- **Testing** (B): Vitest + Playwright setup, some coverage
- **Build Pipeline** (A): Next.js 16, Turbopack, Vercel deployment

### 🚨 Critical Gaps (35% Missing)
- **Authentication** (0%): No login, signup, or user management
- **Dashboard** (0%): No user homepage or project management
- **Navigation** (D): Broken links to non-existent pages
- **Template System** (C): Previews broken, incomplete data
- **Export/Share** (0%): No way to publish or export sites
- **Monetization** (0%): No pricing, billing, or limits
- **Analytics** (0%): No tracking or monitoring
- **SEO** (D): Missing meta tags, sitemaps

---

## 🎯 STRATEGIC GOALS

### Week 1 Objectives (Critical Path)
1. **Make ALL navigation work** - No more 404s
2. **Complete end-to-end user flow** - Signup → Create → Export
3. **Production-ready experience** - Polish + performance
4. **Monetization foundation** - Pricing page + limits

### Success Metrics
- ✅ Zero 404 errors on deployed site
- ✅ User can complete full flow without auth
- ✅ Template previews load correctly
- ✅ Export functionality works
- ✅ Lighthouse score > 90
- ✅ Production grade jumps from C- to A-

---

## 📅 DAILY SESSION BREAKDOWN

---

## SESSION 8: NAVIGATION & AUTH FOUNDATION (Mon, Nov 18)
**Duration**: 4-5 hours
**Priority**: 🔴 CRITICAL
**Goal**: Fix all broken navigation + add auth stub pages

### Tasks

#### 1. Fix Navigation Links (30 min) 🔴 CRITICAL
**Files to modify:**
- `src/components/layout/Navigation.tsx`
- `src/app/layout.tsx`

**Changes:**
```typescript
// Fix template link
<Link href="/#templates">Templates</Link>

// Fix editor link
<Link href="/editor/demo">Try Demo</Link>

// Fix features/pricing anchors
<Link href="/#features">Features</Link>
<Link href="/#pricing">Pricing</Link>
```

**Verification**: All nav links work, no 404s

---

#### 2. Create Authentication Stub Pages (1.5 hours) 🔴 CRITICAL
**New files to create:**
- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`
- `src/components/auth/LoginForm.tsx` (stub)
- `src/components/auth/SignupForm.tsx` (stub)

**Implementation**:
```typescript
// Simple "Coming Soon" or functional forms
// Options:
// A) "Join Waitlist" with email collection
// B) Direct to /editor/demo for now
// C) Basic email/password forms (no backend yet)
```

**Recommended**: Option B - redirect to demo, collect emails via landing page

---

#### 3. Add Editor Base Route (30 min)
**New file:**
- `src/app/editor/page.tsx`

**Implementation**:
```typescript
// Redirect to demo or show project list
redirect('/editor/demo')
// OR show "Your Projects" if auth implemented
```

---

#### 4. Fix Template Images (1.5 hours) 🟡 HIGH
**Investigation steps:**
1. Check if images exist in `/public/templates/`
2. Verify image paths in template data
3. Generate placeholder images if missing
4. Update template data with correct paths

**Files to check:**
- `src/lib/templates/index.ts`
- `src/components/template-gallery/TemplateGallery.tsx`

**Quick fix**: Use gradient placeholders or Unsplash API for temp images

---

#### 5. Custom 404 Page (45 min)
**New file:**
- `src/app/not-found.tsx`

**Features:**
- Branded design matching site
- Helpful navigation links
- Search or suggestions
- Analytics tracking (which pages 404)

---

### Session 8 Deliverables
- ✅ All navigation links work
- ✅ Auth pages exist (no 404s)
- ✅ Template previews load
- ✅ Custom 404 page
- ✅ Grade improvement: C- → C+

---

## SESSION 9: USER DASHBOARD & PROJECT MANAGEMENT (Tue, Nov 19)
**Duration**: 5-6 hours
**Priority**: 🟡 HIGH
**Goal**: Create dashboard for managing websites

### Tasks

#### 1. Dashboard Layout (2 hours)
**New files:**
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/layout.tsx`
- `src/components/dashboard/DashboardNav.tsx`
- `src/components/dashboard/ProjectCard.tsx`
- `src/components/dashboard/StatsOverview.tsx`

**Features**:
- Header with user info (or "Guest" for now)
- Project grid/list view toggle
- Search and filters
- "New Project" CTA
- Recent activity

---

#### 2. Project List Integration (2 hours)
**Files to modify:**
- `src/app/dashboard/page.tsx`

**Use existing hooks:**
- `useWebsites()` from `src/lib/hooks/use-websites.ts`

**Features**:
- Display saved projects from IndexedDB
- Click to open in editor
- Delete/duplicate actions
- Sort by date/name
- Empty state for new users

---

#### 3. Project Actions (1.5 hours)
**Components to create:**
- `src/components/dashboard/ProjectActions.tsx`
- `src/components/dashboard/DeleteConfirmDialog.tsx`

**Actions**:
- Edit (→ `/editor/[id]`)
- Duplicate
- Export
- Delete (with confirmation)
- Share (coming soon)

---

#### 4. Empty States & Loading (45 min)
**Components:**
- `src/components/dashboard/EmptyState.tsx`
- `src/components/dashboard/ProjectSkeleton.tsx`

**UX polish**:
- Beautiful empty state for new users
- Skeleton loaders while fetching
- Error states with retry

---

### Session 9 Deliverables
- ✅ Functional dashboard at `/dashboard`
- ✅ Display projects from storage
- ✅ CRUD operations work
- ✅ Polish & loading states
- ✅ Grade: C+ → B-

---

## SESSION 10: EXPORT & SHARE FUNCTIONALITY (Wed, Nov 20)
**Duration**: 5-6 hours
**Priority**: 🟡 HIGH
**Goal**: Users can export and share their websites

### Tasks

#### 1. Export HTML Feature (2.5 hours)
**New files:**
- `src/lib/export/html-generator.ts`
- `src/lib/export/css-bundler.ts`
- `src/components/editor/ExportButton.tsx`
- `src/components/editor/ExportDialog.tsx`

**Implementation**:
```typescript
// Generate standalone HTML file with:
// - Inline CSS (Tailwind compiled)
// - All content from WebsiteConfig
// - Optional: include fonts, optimize images
// - Output: downloadable .zip or single .html
```

**Features**:
- Export as HTML + CSS
- Preview before download
- Include/exclude analytics
- Customizable footer attribution

---

#### 2. Hosting Integration (2 hours)
**Options** (pick one for MVP):
A) **Vercel Blob Storage** (easiest)
B) **Cloudflare Pages** (free tier)
C) **GitHub Pages** (via API)
D) **Custom subdomain** (prompt-to-website.vercel.app/u/[id])

**Recommended**: Option D - subdomain hosting

**New files:**
- `src/app/u/[id]/page.tsx` (public site viewer)
- `src/lib/hosting/deploy.ts`

---

#### 3. Share Links (1 hour)
**Features:**
- Generate shareable link
- Public preview (read-only)
- Copy link button
- QR code generation
- Social sharing (Twitter, LinkedIn)

**Components:**
- `src/components/editor/ShareDialog.tsx`
- `src/components/editor/ShareButton.tsx`

---

#### 4. Preview Mode Enhancements (30 min)
**Files to modify:**
- `src/app/preview/page.tsx`

**Add**:
- Mobile/tablet/desktop preview toggle
- Responsive iframe viewer
- Screenshot capture
- Performance metrics

---

### Session 10 Deliverables
- ✅ Export HTML works
- ✅ Public sharing links
- ✅ Hosted preview at /u/[id]
- ✅ Enhanced preview mode
- ✅ Grade: B- → B

---

## SESSION 11: TEMPLATE SYSTEM OVERHAUL (Thu, Nov 21)
**Duration**: 4-5 hours
**Priority**: 🟡 MEDIUM
**Goal**: Production-quality template library

### Tasks

#### 1. Template Data Expansion (2 hours)
**Files to modify:**
- `src/lib/templates/index.ts`

**Add 15+ high-quality templates**:
- 5 business templates (corporate, startup, agency, etc.)
- 5 product templates (SaaS, app, tool, etc.)
- 5 personal templates (portfolio, blog, resume, etc.)

**Each template needs:**
- Realistic preview image (generate with screenshots or Figma)
- Complete WebsiteConfig JSON
- Category, tags, description
- Difficulty level
- Use case

---

#### 2. Template Preview Images (1.5 hours)
**Methods**:
A) Use Playwright to screenshot each template
B) Design in Figma and export
C) Use existing screenshots from demos

**New files:**
- `scripts/generate-template-previews.ts` (automation)
- Store in `/public/templates/previews/`

---

#### 3. Template Filtering & Search (1 hour)
**Files to modify:**
- `src/components/template-gallery/TemplateGallery.tsx`

**Features**:
- Full-text search
- Multi-select category filters
- Sort by: popular, recent, name
- Tags/keywords
- "Start from blank" option

---

#### 4. Template Preview Modal (1 hour)
**New components:**
- `src/components/template-gallery/TemplatePreviewDialog.tsx`

**Features**:
- Full-screen preview
- Responsive preview (mobile/desktop)
- "Use Template" CTA
- Live demo link
- Template details sidebar

---

### Session 11 Deliverables
- ✅ 15+ production templates
- ✅ All preview images load
- ✅ Advanced filtering/search
- ✅ Preview modal polish
- ✅ Grade: B → B+

---

## SESSION 12: MONETIZATION & LIMITS (Fri, Nov 22)
**Duration**: 4-5 hours
**Priority**: 🟢 MEDIUM
**Goal**: Pricing page + usage limits foundation

### Tasks

#### 1. Pricing Page (2.5 hours)
**New file:**
- `src/app/pricing/page.tsx`
- `src/components/pricing/PricingTable.tsx`
- `src/components/pricing/PricingFAQ.tsx`

**Tiers** (example):
- **Free**: 3 websites, export HTML, community support
- **Pro** ($9/mo): 25 websites, custom domain, priority support
- **Business** ($29/mo): Unlimited, team collaboration, white-label

**Features**:
- Feature comparison table
- Toggle monthly/annual billing
- "Most Popular" badge
- CTAs for each tier
- FAQ section

---

#### 2. Usage Limits System (1.5 hours)
**New files:**
- `src/lib/limits/usage-tracker.ts`
- `src/lib/limits/tier-config.ts`

**Implementation**:
```typescript
interface UsageLimits {
  maxWebsites: number;
  maxExports: number;
  canCustomDomain: boolean;
  canRemoveBranding: boolean;
  supportLevel: 'community' | 'email' | 'priority';
}

// Track in IndexedDB or localStorage for now
// Later: move to Supabase with auth
```

---

#### 3. Limit Enforcement UI (1 hour)
**Components:**
- `src/components/limits/UpgradeDialog.tsx`
- `src/components/limits/UsageBar.tsx`

**Show when**:
- User hits website limit
- Trying to use pro features
- On dashboard (usage overview)

---

### Session 12 Deliverables
- ✅ Pricing page complete
- ✅ Usage limits defined
- ✅ Upgrade prompts work
- ✅ Foundation for billing
- ✅ Grade: B+ → A-

---

## SESSION 13: SEO & PERFORMANCE (Sat, Nov 23)
**Duration**: 4-5 hours
**Priority**: 🟢 MEDIUM
**Goal**: Lighthouse score > 90, proper SEO

### Tasks

#### 1. SEO Meta Tags (1.5 hours)
**Files to modify:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/editor/[id]/page.tsx`

**Add to every page**:
```typescript
export const metadata: Metadata = {
  title: 'Page Title | Prompt to Website',
  description: 'Description...',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

**Create**:
- `public/og-image.png` (1200x630)
- `public/robots.txt`
- `public/sitemap.xml`

---

#### 2. Performance Optimization (2 hours)
**Image optimization**:
- Use Next.js Image component everywhere
- Add blur placeholders
- Lazy load below fold
- WebP format

**Code splitting**:
- Dynamic imports for heavy components
- Route-based splitting (already done by Next.js)
- Tree shaking verification

**Bundle analysis**:
```bash
npm run build -- --profile
# Check for large dependencies
```

---

#### 3. Accessibility Audit (1 hour)
**Tools**:
- Lighthouse (built into Chrome DevTools)
- axe DevTools
- Keyboard navigation testing

**Fix**:
- Alt text for all images
- ARIA labels for interactive elements
- Focus visible styles
- Skip to content link
- Semantic HTML

---

#### 4. Analytics Integration (30 min)
**Options**:
- Google Analytics 4
- Plausible (privacy-friendly)
- Vercel Analytics (easiest)

**Track**:
- Page views
- Button clicks (CTAs)
- Template selections
- Export actions
- 404 errors

---

### Session 13 Deliverables
- ✅ Lighthouse score > 90
- ✅ SEO meta tags complete
- ✅ Accessibility AA compliance
- ✅ Analytics tracking
- ✅ Grade: A- → A

---

## SESSION 14: POLISH & PRODUCTION LAUNCH (Sun, Nov 24)
**Duration**: 5-6 hours
**Priority**: 🔴 CRITICAL
**Goal**: Final polish + production launch

### Tasks

#### 1. Final Bug Fixes (1.5 hours)
**Test every flow:**
- Landing page → Template selection → Editor → Export
- Navigation (all links)
- Mobile responsiveness
- Error states
- Loading states
- Form validation

**Fix any issues found**

---

#### 2. Production Checklist (1 hour)
- [ ] Environment variables set in Vercel
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured
- [ ] Custom domain (if applicable)
- [ ] SSL certificate
- [ ] Monitoring alerts
- [ ] Backup strategy for user data
- [ ] Terms of Service + Privacy Policy pages

---

#### 3. Documentation (1.5 hours)
**Create**:
- `README.md` (comprehensive)
- `CONTRIBUTING.md` (if open source)
- `CHANGELOG.md`
- User guide / Help center (basic)

---

#### 4. Launch Preparation (1.5 hours)
**Marketing assets**:
- Landing page copy refinement
- Social media posts
- Product Hunt submission (optional)
- Launch email/announcement

**Monitoring**:
- Set up error alerts
- Performance monitoring
- User feedback form

---

#### 5. Deploy & Monitor (30 min)
```bash
# Final production deploy
npm run build
vercel --prod

# Monitor for first hour
- Check analytics dashboard
- Watch error logs
- Test from different devices/browsers
```

---

### Session 14 Deliverables
- ✅ All bugs fixed
- ✅ Production checklist complete
- ✅ Deployed to production
- ✅ Monitoring active
- ✅ **Grade: A (95%+)**

---

## 📈 PROGRESS TRACKING

### Grade Progression
```
Current:  C- (65%) ██████████░░░░░░░░░░
Session 8:  C+ (72%) ███████████░░░░░░░░░
Session 9:  B- (78%) ████████████░░░░░░░░
Session 10: B  (82%) █████████████░░░░░░░
Session 11: B+ (87%) ██████████████░░░░░░
Session 12: A- (92%) ███████████████░░░░░
Session 13: A  (95%) ████████████████░░░░
Session 14: A  (98%) ████████████████████
```

### Feature Completion
```
Navigation:      0% → 100% ████████████████████
Auth Flow:       0% → 80%  ████████████████░░░░
Dashboard:       0% → 100% ████████████████████
Templates:      40% → 100% ████████████████████
Export:          0% → 90%  ██████████████████░░
Monetization:    0% → 70%  ██████████████░░░░░░
SEO:            20% → 95%  ███████████████████░
Performance:    70% → 95%  ███████████████████░
```

---

## 🛠️ TOOLS & SETUP

### Required Tools
- **Code Editor**: VS Code with extensions (ESLint, Prettier, Tailwind IntelliSense)
- **Browser**: Chrome DevTools + Extensions (React DevTools, Lighthouse)
- **Design**: Figma (for template previews) OR Playwright screenshots
- **Testing**: Playwright UI mode (`npm run test:e2e:ui`)
- **Monitoring**: Vercel Dashboard + Analytics

### Commands Reference
```bash
# Development
npm run dev              # Local dev server
npm run build            # Production build
npm run test             # Run unit tests
npm run test:e2e:ui      # E2E tests with UI
npm run lint             # ESLint check

# Deployment
vercel                   # Preview deploy
vercel --prod            # Production deploy

# Analysis
npm run build -- --profile  # Bundle analysis
lighthouse https://...      # Performance audit
```

---

## 🚨 RISK MITIGATION

### High-Risk Areas
1. **Template Image Generation** - Could take longer than planned
   - **Mitigation**: Use placeholders initially, add real images incrementally

2. **Export HTML Complexity** - CSS compilation tricky
   - **Mitigation**: Start with simple export, enhance later

3. **Hosting Integration** - Third-party API issues
   - **Mitigation**: Use simple subdomain hosting first

### Scope Creep Prevention
- ✅ Focus on critical path (Sessions 8-10)
- ✅ Nice-to-haves go in Session 11+
- ✅ Can skip Session 13-14 if time-constrained
- ✅ Minimum viable: Complete through Session 10 = B grade

---

## 📊 SUCCESS CRITERIA

### Must-Have (Critical)
- ✅ No 404 errors on live site
- ✅ User can create, edit, and export a website
- ✅ Template previews work correctly
- ✅ Mobile responsive throughout
- ✅ Performance: Lighthouse > 80

### Should-Have (Important)
- ✅ Dashboard for project management
- ✅ 15+ quality templates
- ✅ Pricing page exists
- ✅ SEO meta tags complete
- ✅ Analytics tracking

### Nice-to-Have (Optional)
- ⚪ Authentication fully implemented
- ⚪ Payment integration
- ⚪ Collaboration features
- ⚪ Custom domains
- ⚪ Advanced export options

---

## 🎯 FINAL TARGET

**By End of Week:**
- **Grade**: A (95%+)
- **Production Ready**: ✅ Yes
- **User Flow**: Complete end-to-end
- **Performance**: Lighthouse > 90
- **SEO**: Fully optimized
- **Monetization**: Foundation ready
- **Launch Status**: LIVE 🚀

---

## 📝 NOTES

### Session Flexibility
- Sessions can be split or combined based on progress
- If ahead of schedule: Add Session 15 (Advanced Features)
- If behind: Focus on Sessions 8-10 only

### Advanced Features (Future Sessions)
- **Session 15**: AI Chat Mode (conversational editing)
- **Session 16**: Collaboration & Sharing
- **Session 17**: Advanced Components (forms, animations)
- **Session 18**: Mobile App Builder
- **Session 19**: White-label Solution
- **Session 20**: API & Integrations

### Community Feedback
After launch, prioritize based on user feedback:
1. Most requested features
2. Biggest pain points
3. Performance issues
4. Bug reports

---

**END OF WEEKLY PLAN**

*Last Updated: November 17, 2025*
*Created by: Claude Code*
*Status: Ready for Execution*
