# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Week 1 Polish (November 19, 2025)

#### UX & Navigation (Day 1)
- Breadcrumb navigation with Home > Dashboard > Project Name hierarchy
- Inline project renaming with auto-save (click name to edit)
- Unsaved changes warning before navigation (already existed, documented)
- Mobile-responsive breadcrumbs with truncation

#### Dashboard Features (Day 2)
- Real-time project search with instant filtering
- Sort projects by Last Modified, Date Created, or Name A-Z
- Filter projects by template type
- Favorites system with star toggle and priority sorting
- Search/filter preferences persist to localStorage
- Empty states with "Clear Filters" button
- Result count display (X of Y projects)

#### Analytics & Monitoring (Day 3)
- Vercel Analytics and Speed Insights integration
- Custom event tracking system with 30+ events:
  - AI generation (started, success, error with duration)
  - AI editing (started, success, error with performance metrics)
  - Dashboard actions (search, filter, sort, delete, duplicate, favorites)
  - Authentication (login/signup for email + Google with error tracking)
  - Project lifecycle (created, renamed, duplicated, deleted)
  - Export actions (JSON, HTML with file sizes)
  - Editor operations (opened with block count)
- Type-safe analytics with automatic filtering of undefined values
- Graceful error handling (never breaks user experience)

#### Performance Optimization (Day 4)
- Code splitting for heavy components (AIModePanel, CommandPalette)
- Lazy loading with React.lazy() and Suspense boundaries
- Loading skeletons for better perceived performance
- All images already optimized (using Next.js Image component)
- Reduced initial bundle size

#### Template Previews (Day 5)
- Automated screenshot generation with Playwright
- High-quality WebP template previews (2KB each, 20KB total)
- Preview-template page for clean screenshot capture
- Next.js Image component integration with responsive sizing
- Hover zoom effects on template cards
- Fallback to simulated previews if images unavailable
- 10/10 templates with professional previews

#### Infrastructure
- Database migration for is_favorite column with index
- TypeScript types updated for all new features
- Comprehensive test coverage updates
- Build optimizations and error fixes

### Fixed
- Export analytics tracking (JSON, HTML file sizes now recorded)
- Editor opened analytics (includes block count)
- Dashboard analytics dependencies (inline handlers avoid race conditions)
- Test mock data updated with is_favorite field
- Preview-template page Suspense boundary for useSearchParams()

### Performance
- Template previews: 96% smaller than target (2KB vs 50KB)
- Code splitting reduces initial bundle size
- Lazy loading improves Time to Interactive
- Analytics events fire without blocking UI

---

## [0.1.0] - 2025-11-17

### Added
- Initial release with AI-powered website builder
- 10 professional templates
- 15 production-grade blocks
- Supabase authentication and database
- Multi-format export (JSON, HTML, Share Links, QR Codes)
- Real-time visual editor
- Gemini 2.5 Flash AI integration
- SEO optimization
- Responsive design with shadcn/ui
- TypeScript strict mode
- Vercel deployment configuration

[Unreleased]: https://github.com/federicodeponte/prompt-to-website/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/federicodeponte/prompt-to-website/releases/tag/v0.1.0
