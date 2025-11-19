# 🎯 Realistic 1-Week Plan: High-Impact Polish & Features

**Created:** November 19, 2025
**Duration:** 5 working days (Monday-Friday)
**Total Time:** ~20-25 hours (4-5 hours/day)
**Philosophy:** Ship fewer features that delight users, not many features that frustrate them

---

## ✅ What's Already Complete (Don't Rebuild)

- ✅ Real Supabase Authentication (email/password + Google OAuth)
- ✅ Email verification & password reset flows
- ✅ Row Level Security (RLS) for data isolation
- ✅ Navigation shows auth state with user dropdown
- ✅ AI generation with Gemini 2.5 Flash
- ✅ Manual block editing with drag & drop
- ✅ Export to HTML/React/Next.js
- ✅ 100% WCAG 2.1 AA accessibility
- ✅ Fully responsive mobile design (375px+)
- ✅ Command palette (Cmd+K)
- ✅ Dashboard with project management
- ✅ 10 professional templates

---

## 🎯 Week Focus: Polish → Analytics → Performance

**Priority:** High-value, low-risk improvements that enhance UX without major rewrites

---

## 📅 DAY 1 (Monday): Editor UX Polish - 4 hours

**Goal:** Make editor feel professional and intuitive

### Session 1.1: Add Breadcrumb Navigation (90 min)
**Value:** Users know where they are, can navigate back easily
**Risk:** Low - Simple UI component

**Tasks:**
- [ ] Install shadcn breadcrumb component
- [ ] Add to EditorLayout: `Home > Dashboard > Project Name`
- [ ] Make project name clickable (goes to rename flow)
- [ ] Add "Back to Dashboard" button
- [ ] Test keyboard navigation

**Files:**
- `src/components/editor/EditorLayout.tsx` (add breadcrumb)
- `npx shadcn@latest add breadcrumb`

**Acceptance Criteria:**
- Breadcrumb visible on all screen sizes
- "Back to Dashboard" works on mobile
- Keyboard accessible (Tab + Enter)

---

### Session 1.2: Inline Project Rename (90 min)
**Value:** Quick project renaming without modals
**Risk:** Low - Single field inline edit

**Tasks:**
- [ ] Click project name in breadcrumb to edit
- [ ] Auto-save on blur or Enter key
- [ ] Show loading state during save
- [ ] Toast notification on success/error
- [ ] Validation: 1-100 characters, no special chars

**Files:**
- `src/components/editor/EditorLayout.tsx` (inline edit)
- `src/lib/hooks/use-websites.ts` (rename mutation)

**Acceptance Criteria:**
- Click → Edit → Save flow works smoothly
- No broken state if user navigates away
- Accessible (screen reader announces rename)

---

### Session 1.3: Unsaved Changes Warning (60 min)
**Value:** Prevent accidental data loss
**Risk:** Low - Browser API + React state

**Tasks:**
- [ ] Track dirty state (has unsaved changes)
- [ ] Show warning before navigation if dirty
- [ ] Use AlertDialog instead of window.confirm
- [ ] Clear warning after successful save
- [ ] Test with browser back button

**Files:**
- `src/components/editor/EditorLayout.tsx` (dirty tracking)
- Use existing AlertDialog component

**Acceptance Criteria:**
- Warning only shows when changes exist
- "Save and Leave" button works
- "Stay" button cancels navigation
- No warning after save

---

## 📅 DAY 2 (Tuesday): Dashboard Power Features - 4.5 hours

**Goal:** Make dashboard efficient for power users

### Session 2.1: Project Search (90 min)
**Value:** Find projects quickly as list grows
**Risk:** Low - Client-side filtering

**Tasks:**
- [ ] Add search input above project grid
- [ ] Filter by project name (case-insensitive)
- [ ] Show result count: "5 of 12 projects"
- [ ] Clear search button (X icon)
- [ ] Debounce input (300ms)
- [ ] Empty state: "No projects match 'query'"

**Files:**
- `src/app/dashboard/page.tsx` (add search UI)
- Use existing Input component

**Acceptance Criteria:**
- Search updates instantly (no lag)
- Works with keyboard only
- Preserves grid layout
- Mobile-friendly

---

### Session 2.2: Sort & Filter (120 min)
**Value:** Organize projects by recency or name
**Risk:** Low - Client-side array sorting

**Tasks:**
- [ ] Add sort dropdown: "Last Modified" (default), "Name A-Z", "Date Created"
- [ ] Add filter dropdown: "All Templates", [list of templates]
- [ ] Combine search + sort + filter
- [ ] Save preference to localStorage
- [ ] Show active filters as badges

**Files:**
- `src/app/dashboard/page.tsx` (sort/filter logic)
- Use existing DropdownMenu component

**Acceptance Criteria:**
- Sorting works correctly
- Filter by template type works
- Preferences persist across sessions
- Clear all filters button

---

### Session 2.3: Project Favorites (60 min)
**Value:** Quick access to important projects
**Risk:** Medium - Requires database schema update

**Tasks:**
- [ ] Add `is_favorite` column to websites table
- [ ] Star icon on project cards (toggle)
- [ ] Favorites appear first in list
- [ ] Optimistic UI update (instant feedback)
- [ ] Filter: "Show Only Favorites"

**Database Migration:**
```sql
ALTER TABLE websites ADD COLUMN is_favorite BOOLEAN DEFAULT FALSE;
CREATE INDEX idx_websites_favorite ON websites(user_id, is_favorite, updated_at);
```

**Files:**
- `supabase/migrations/add_favorites.sql` (new)
- `src/app/dashboard/page.tsx` (UI)
- `src/lib/hooks/use-websites.ts` (toggle mutation)

**Acceptance Criteria:**
- Star toggles instantly (optimistic UI)
- Favorites persist after refresh
- Filter works correctly

---

## 📅 DAY 3 (Wednesday): Analytics & Monitoring - 4 hours

**Goal:** Understand user behavior and catch errors early

### Session 3.1: Vercel Analytics Setup (45 min)
**Value:** Real user metrics, no configuration needed
**Risk:** Very Low - Install & deploy

**Tasks:**
- [ ] `npm install @vercel/analytics @vercel/speed-insights`
- [ ] Add to `app/layout.tsx`
- [ ] Deploy to Vercel
- [ ] Verify data appears in Vercel dashboard
- [ ] Test Web Vitals tracking

**Files:**
- `package.json` (dependencies)
- `src/app/layout.tsx` (add components)

**Acceptance Criteria:**
- Analytics visible in Vercel dashboard
- Speed Insights showing metrics
- Zero impact on performance

---

### Session 3.2: Custom Event Tracking (90 min)
**Value:** Track key user actions for product decisions
**Risk:** Low - Simple function calls

**Tasks:**
- [ ] Track: AI generation start/success/failure
- [ ] Track: Template selection
- [ ] Track: Project creation
- [ ] Track: Export action (HTML/React/Next.js)
- [ ] Track: Auth events (signup/login)

**Implementation:**
```typescript
import { track } from '@vercel/analytics';

track('ai_generation_started', {
  template: config.template,
  mode: 'create' // or 'edit'
});

track('template_selected', {
  template_id: template.id,
  source: 'homepage' // or 'dashboard'
});
```

**Files:**
- `src/lib/analytics/events.ts` (new - helper functions)
- `src/components/editor/AIModePanel.tsx` (track AI events)
- `src/components/template-gallery/TemplateGrid.tsx` (track selections)

**Acceptance Criteria:**
- Events appear in Vercel Analytics
- No PII (personally identifiable info) tracked
- Events fire consistently

---

### Session 3.3: Error Monitoring with Sentry (90 min)
**Value:** Catch production errors before users complain
**Risk:** Low - Well-documented setup

**Tasks:**
- [ ] Create Sentry account (free tier)
- [ ] `npx @sentry/wizard@latest -i nextjs`
- [ ] Configure error sampling (10% for free tier)
- [ ] Test with intentional error
- [ ] Set up Slack alerts for critical errors

**Files:**
- `sentry.client.config.ts` (auto-generated)
- `sentry.server.config.ts` (auto-generated)
- `next.config.js` (updated by wizard)

**Acceptance Criteria:**
- Errors captured in Sentry dashboard
- Source maps working (can see original code)
- Alerts configured for critical errors

---

## 📅 DAY 4 (Thursday): Performance Optimization - 5 hours

**Goal:** Achieve Lighthouse Performance 90+ and fast perceived load times

### Session 4.1: Image Optimization Audit (60 min)
**Value:** Faster page loads, better SEO
**Risk:** Low - Replace with next/image

**Tasks:**
- [ ] Audit all `<img>` tags in codebase
- [ ] Replace with Next.js `<Image>` component
- [ ] Add proper width/height attributes
- [ ] Use `loading="lazy"` for below-fold images
- [ ] Add blur placeholders for LCP images

**Files:**
- Search for: `<img` in src/
- Common locations: homepage, template cards, dashboard

**Acceptance Criteria:**
- No `<img>` tags (all using `<Image>`)
- No layout shift (CLS < 0.1)
- Faster initial load

---

### Session 4.2: Code Splitting & Lazy Loading (90 min)
**Value:** Reduce initial JavaScript bundle size
**Risk:** Low - Dynamic imports

**Tasks:**
- [ ] Lazy load editor panels (AI Mode, Manual Mode)
- [ ] Lazy load command palette (only when Cmd+K pressed)
- [ ] Lazy load heavy components (charts, icons)
- [ ] Add loading skeletons for lazy components
- [ ] Measure bundle size before/after

**Implementation:**
```typescript
import dynamic from 'next/dynamic';

const AIModePanel = dynamic(() => import('./AIModePanel'), {
  loading: () => <PanelSkeleton />,
  ssr: false
});

const CommandPalette = dynamic(() => import('./CommandPalette'), {
  ssr: false
});
```

**Files:**
- `src/components/editor/EditorLayout.tsx` (lazy load panels)
- `src/app/dashboard/page.tsx` (lazy load charts if any)

**Acceptance Criteria:**
- Initial bundle smaller (check with `npm run build`)
- No broken functionality
- Smooth loading experience

---

### Session 4.3: Lighthouse Audit & Fixes (90 min)
**Value:** Identify and fix performance bottlenecks
**Risk:** Low - Follow Lighthouse recommendations

**Tasks:**
- [ ] Run Lighthouse on all pages (/, /dashboard, /editor)
- [ ] Fix render-blocking resources
- [ ] Add font preloading for critical fonts
- [ ] Optimize Tailwind CSS (ensure purging works)
- [ ] Add `fetchPriority="high"` to hero image
- [ ] Re-run Lighthouse, target 90+ scores

**Target Metrics:**
- Performance: 90+
- Accessibility: 100 (already achieved)
- Best Practices: 95+
- SEO: 95+

**Files:**
- `src/app/layout.tsx` (font preloading)
- `next.config.js` (optimizations)
- `tailwind.config.ts` (verify purge paths)

**Acceptance Criteria:**
- All pages score 90+ Performance
- FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- No console errors

---

### Session 4.4: Testing & QA (60 min)
**Value:** Ensure optimizations didn't break anything
**Risk:** None - Critical step

**Tasks:**
- [ ] Test all pages in Chrome, Firefox, Safari
- [ ] Test on mobile (real device or BrowserStack)
- [ ] Verify auth flow still works
- [ ] Verify AI generation still works
- [ ] Check Network tab for unnecessary requests
- [ ] Test with slow 3G network throttling

**Acceptance Criteria:**
- No regressions in functionality
- Performance improvements visible
- Mobile experience smooth

---

## 📅 DAY 5 (Friday): Template Previews & Polish - 5.5 hours

**Goal:** Professional template showcase with visual previews

### Session 5.1: Set Up Playwright for Screenshots (60 min)
**Value:** Automated preview generation
**Risk:** Low - Playwright is well-documented

**Tasks:**
- [ ] `npm install -D playwright`
- [ ] `npx playwright install chromium`
- [ ] Create screenshot script in `scripts/generate-previews.ts`
- [ ] Test with one template
- [ ] Ensure fonts and styles load correctly

**Script Structure:**
```typescript
import { chromium } from 'playwright';
import { renderTemplate } from '@/lib/templates';

async function generatePreview(templateId: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

  const html = renderTemplate(templateId);
  await page.setContent(html);
  await page.waitForLoadState('networkidle');

  const screenshot = await page.screenshot({ type: 'png' });
  await browser.close();

  return screenshot;
}
```

**Files:**
- `scripts/generate-previews.ts` (new)
- `package.json` (add script: "generate-previews")

**Acceptance Criteria:**
- Script generates clean screenshots
- Fonts render correctly
- Colors match actual templates

---

### Session 5.2: Generate & Optimize Preview Images (120 min)
**Value:** Beautiful template gallery
**Risk:** Medium - Manual tweaking per template

**Tasks:**
- [ ] Generate preview for all 10 templates
- [ ] Optimize with `sharp` (convert to WebP, 600x450px)
- [ ] Save to `public/templates/[id].webp`
- [ ] Create responsive versions (600w, 1200w)
- [ ] Test file sizes (target < 50KB per image)

**Script:**
```typescript
import sharp from 'sharp';

await sharp(screenshot)
  .resize(600, 450, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(`public/templates/${templateId}.webp`);
```

**Files:**
- `public/templates/` (new directory)
- `scripts/generate-previews.ts` (optimize logic)

**Acceptance Criteria:**
- All 10 templates have previews
- Images < 50KB each
- Look professional

---

### Session 5.3: Update Template Gallery with Previews (90 min)
**Value:** Visual template selection
**Risk:** Low - UI update

**Tasks:**
- [ ] Update template metadata with image paths
- [ ] Replace placeholder with `<Image>` from next/image
- [ ] Add hover effect (slight zoom)
- [ ] Add "Preview" badge/overlay
- [ ] Lazy load images below fold

**Files:**
- `src/lib/templates/metadata.ts` (add image_url field)
- `src/components/template-gallery/TemplateCard.tsx` (show image)
- `src/components/template-gallery/TemplateGrid.tsx` (layout)

**Acceptance Criteria:**
- All templates show previews
- Images load fast with blur placeholder
- Hover effects smooth
- Mobile layout responsive

---

### Session 5.4: Final Testing & Documentation (60 min)
**Value:** Ensure week's work is solid
**Risk:** None - Essential

**Tasks:**
- [ ] Run full build (`npm run build`)
- [ ] Test all new features end-to-end
- [ ] Update README with new features
- [ ] Create CHANGELOG entry for this week
- [ ] Git commit all work
- [ ] Deploy to Vercel
- [ ] Smoke test production

**Acceptance Criteria:**
- Build passes with no errors
- All features work in production
- Documentation up to date
- No console errors in production

---

## 🎯 Success Metrics

**After this week, the app will have:**

### Quantitative
- [ ] Lighthouse Performance: 90+ (up from ~80)
- [ ] Initial bundle size: < 200KB (down from ~250KB)
- [ ] Template previews: 10/10 templates (up from 0/10)
- [ ] Analytics: Tracking 8+ key events
- [ ] Error monitoring: Live in production

### Qualitative
- [ ] Editor feels more polished (breadcrumbs, rename, warnings)
- [ ] Dashboard is power-user friendly (search, sort, filter, favorites)
- [ ] Template gallery is visually appealing (real previews)
- [ ] Team can make data-driven decisions (analytics)
- [ ] Production issues caught early (Sentry)

---

## ⏱️ Time Breakdown

| Day | Session | Time | Total |
|-----|---------|------|-------|
| Mon | Breadcrumbs | 1.5h | |
| Mon | Inline Rename | 1.5h | |
| Mon | Unsaved Warning | 1h | **4h** |
| Tue | Search | 1.5h | |
| Tue | Sort & Filter | 2h | |
| Tue | Favorites | 1h | **4.5h** |
| Wed | Vercel Analytics | 0.75h | |
| Wed | Event Tracking | 1.5h | |
| Wed | Sentry Setup | 1.5h | **3.75h** |
| Thu | Image Optimization | 1h | |
| Thu | Code Splitting | 1.5h | |
| Thu | Lighthouse Fixes | 1.5h | |
| Thu | Testing & QA | 1h | **5h** |
| Fri | Playwright Setup | 1h | |
| Fri | Generate Previews | 2h | |
| Fri | Update Gallery | 1.5h | |
| Fri | Final Testing | 1h | **5.5h** |
| **TOTAL** | | | **22.75h** |

**Buffer:** 2.25 hours for unexpected issues

---

## 🚨 Risk Mitigation

### High-Risk Items
- **Favorites feature** - Database migration required
  - **Plan B:** Use localStorage instead (client-side only)
  - **Rollback:** Remove column if issues arise

- **Template previews** - Manual work per template
  - **Plan B:** Use placeholder images temporarily
  - **Scope Cut:** Start with 5 templates instead of 10

### Low-Risk Items
- Breadcrumbs, search, analytics, image optimization
- These are isolated changes with minimal dependencies

---

## 🎓 Testing Strategy

**Each session includes testing:**
- Unit tests: Not required for UI polish
- Integration tests: Manual QA sufficient
- E2E tests: Smoke test critical flows
- Manual QA: Test on real devices

**Quality gates before merging:**
- [ ] Build passes
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Feature works on mobile
- [ ] Accessibility unchanged (100% maintained)

---

## 💰 Cost-Benefit Analysis

### High Value, Low Effort ⭐⭐⭐
1. **Breadcrumbs** (1.5h) - Better UX, trivial to implement
2. **Search** (1.5h) - Power user feature, client-side only
3. **Vercel Analytics** (0.75h) - Free, zero config
4. **Image Optimization** (1h) - SEO boost, easy wins

### High Value, Medium Effort ⭐⭐
5. **Template Previews** (3.5h) - Professional appearance
6. **Code Splitting** (1.5h) - Performance improvement
7. **Event Tracking** (1.5h) - Data-driven decisions

### Medium Value, Low Effort ⭐
8. **Sort & Filter** (2h) - Convenience feature
9. **Favorites** (1h) - Nice-to-have

---

## ✅ What We're NOT Doing (And Why)

### Deferred to Future Weeks
- ❌ **AI Streaming** - Too complex (20-30h), high risk
- ❌ **Multi-page websites** - Major feature (40+ hours)
- ❌ **Component library** - Scope too large
- ❌ **Advanced export** - Single-file HTML is problematic
- ❌ **Programmatic Vercel deploy** - Legal/cost issues

### Reason: Focus on High-Impact Polish
This week focuses on **making what exists feel professional**, not adding big risky features.

---

## 📊 Before & After Comparison

### Before This Week
- ✅ Functional but basic editor
- ❌ No project search or organization
- ❌ No analytics or error tracking
- ❌ Performance ~80 Lighthouse score
- ❌ Template gallery text-only

### After This Week
- ✅ Polished editor with breadcrumbs & warnings
- ✅ Power user dashboard (search, sort, filter, favorites)
- ✅ Full analytics & error monitoring
- ✅ Performance 90+ Lighthouse score
- ✅ Beautiful template gallery with previews

---

## 🎯 Definition of Done

A session is **done** when:
1. Feature works as described
2. No console errors
3. Mobile responsive
4. Accessibility intact (WCAG AA maintained)
5. Git committed with clear message
6. Deployed to staging/production
7. Manually tested

**Don't ship half-finished features.**

---

## 🔧 Recommended Development Flow

### Daily Routine
1. **Morning (30 min):** Review plan, prioritize sessions
2. **Work Session (3-4 hours):** Focus time, no distractions
3. **Testing (30-60 min):** Manual QA, fix bugs
4. **Commit & Deploy (15 min):** Ship daily progress
5. **Reflect (10 min):** What went well? What took longer?

### When Behind Schedule
- **Cut scope, not quality**
- Skip "nice-to-have" sessions (favorites, some previews)
- Don't skip testing or QA
- Ship fewer features that work perfectly

### When Ahead of Schedule
- Add buffer to Friday for polish
- Improve documentation
- Add unit tests
- Start Session 6 early (AI streaming research)

---

## 🚀 Deployment Strategy

### Continuous Deployment
- Deploy to Vercel after each session
- Use Vercel preview deployments for testing
- Merge to main = production deploy
- Monitor Sentry for errors after each deploy

### Rollback Plan
- Git revert if critical bug found
- Feature flags for risky features (favorites)
- Database migrations are reversible

---

## 📝 Documentation Requirements

### Update Throughout Week
- `README.md` - Add new features to list
- `CHANGELOG.md` - Document each session's changes
- `DEPLOYMENT.md` - Add analytics/Sentry setup steps

### End of Week
- Create `WEEK_1_COMPLETION.md` summary
- Update `NEXT_LEVEL_SESSION_PLAN.md` status
- Plan Week 2 based on learnings

---

## 🎓 Key Principles

1. **Quality over Quantity** - 5 perfect features > 10 broken ones
2. **User Value First** - Only build what users will notice/appreciate
3. **Measure Everything** - Analytics guide future decisions
4. **Ship Daily** - Don't wait until Friday to deploy
5. **Test Thoroughly** - No feature is done until it's tested
6. **Document As You Go** - Future you will thank present you
7. **Stay Flexible** - Adjust plan based on what you learn

---

## ✅ Final Checklist (End of Week)

- [ ] All features tested in production
- [ ] Lighthouse scores improved
- [ ] Analytics tracking events
- [ ] Sentry catching errors
- [ ] Documentation updated
- [ ] CHANGELOG created
- [ ] No regressions in existing features
- [ ] Mobile experience smooth
- [ ] Accessibility still 100%
- [ ] User feedback collected (if possible)

---

## 🎉 What Success Looks Like

**By Friday evening:**
- App feels more professional and polished
- Dashboard is efficient for returning users
- Template gallery looks like a real product
- Team has data to make decisions
- Performance is noticeably faster
- Production errors are caught automatically

**User Impact:**
- "Wow, this feels really polished now"
- "I can find my projects so easily"
- "The template previews look amazing"
- "The editor just feels better to use"

---

**This plan is realistic, achievable, and high-impact. Let's build something great! 🚀**

---

**Created by:** Claude Code
**Date:** November 19, 2025
**Next Review:** Friday, November 22, 2025
**Philosophy:** Underpromise, overdeliver
