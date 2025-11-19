# Week 1 Plan: High-Impact Polish

**Duration:** 5 days (22.75 hours + 2.25h buffer)
**Focus:** Make existing features feel professional

---

## Current State (Already Complete ✅)

- Real Supabase Auth + RLS
- AI generation (Gemini 2.5 Flash)
- 10 templates, manual editing, export
- 100% WCAG 2.1 AA accessibility
- Fully responsive (375px+)

---

## Day 1: Editor UX (4h)

**1.1 Breadcrumbs (1.5h)**
- `npx shadcn@latest add breadcrumb`
- Add to EditorLayout: `Home > Dashboard > [Project Name]`
- "Back to Dashboard" button

**1.2 Inline Rename (1.5h)**
- Click project name to edit inline
- Auto-save on blur/Enter
- Toast on success/error

**1.3 Unsaved Warning (1h)**
- Track dirty state
- AlertDialog before navigation
- "Save and Leave" / "Stay" buttons

**Files:** `src/components/editor/EditorLayout.tsx`, `src/lib/hooks/use-websites.ts`

---

## Day 2: Dashboard Power Features (4.5h)

**2.1 Search (1.5h)**
- Input above project grid
- Debounced filtering (300ms)
- Show "X of Y projects"

**2.2 Sort & Filter (2h)**
- Sort: Last Modified, Name A-Z, Date Created
- Filter: By template type
- Save to localStorage

**2.3 Favorites (1h)**
- Database: `ALTER TABLE websites ADD COLUMN is_favorite BOOLEAN DEFAULT FALSE`
- Star icon toggle
- Favorites appear first

**Files:** `src/app/dashboard/page.tsx`, `supabase/migrations/add_favorites.sql`

---

## Day 3: Analytics & Monitoring (3.75h)

**3.1 Vercel Analytics (0.75h)**
- `npm i @vercel/analytics @vercel/speed-insights`
- Add to `app/layout.tsx`
- Deploy and verify

**3.2 Event Tracking (1.5h)**
- Track: AI generation, template selection, export, auth
- `src/lib/analytics/events.ts` helper

**3.3 Sentry (1.5h)**
- `npx @sentry/wizard@latest -i nextjs`
- Configure sampling (10%)
- Set up Slack alerts

**Files:** `src/app/layout.tsx`, `src/lib/analytics/events.ts`, auto-generated Sentry configs

---

## Day 4: Performance (5h)

**4.1 Images (1h)**
- Replace `<img>` with `<Image>`
- Add width/height, blur placeholders

**4.2 Code Splitting (1.5h)**
- Lazy load AIModePanel, CommandPalette
- Add loading skeletons

**4.3 Lighthouse (1.5h)**
- Run audit on /, /dashboard, /editor
- Fix render-blocking resources
- Font preloading
- Target: 90+ performance

**4.4 Testing (1h)**
- Chrome, Firefox, Safari
- Mobile device testing
- 3G throttling

**Files:** All pages, `src/app/layout.tsx`, `next.config.js`

---

## Day 5: Template Previews (5.5h)

**5.1 Playwright (1h)**
- `npm i -D playwright && npx playwright install chromium`
- `scripts/generate-previews.ts`

**5.2 Generate (2h)**
- Screenshot all 10 templates (1200x900)
- Optimize with sharp → WebP (600x450, <50KB)
- Save to `public/templates/[id].webp`

**5.3 UI Update (1.5h)**
- Update template metadata
- `<Image>` in TemplateCard
- Hover zoom effect

**5.4 Final (1h)**
- Build test
- Update README, CHANGELOG
- Deploy to production

**Files:** `scripts/generate-previews.ts`, `src/lib/templates/metadata.ts`, `src/components/template-gallery/TemplateCard.tsx`

---

## Success Metrics

- Lighthouse Performance: 90+
- Template previews: 10/10
- Analytics: 8+ events tracked
- Error monitoring: Live

---

## Not Doing (Too Complex/Risky)

- AI streaming (20-30h)
- Single-file HTML export (problematic)
- Multi-page websites (40h+)
- Programmatic deployment (legal issues)

---

**Philosophy:** Ship fewer features done right, not many broken ones.
