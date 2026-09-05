# Tasks: Landing Page — ChatBot-WA

## Review Workload Forecast

| Field                   | Value                     |
| ----------------------- | ------------------------- |
| Estimated changed lines | ~1,800 – 2,200            |
| 400-line budget risk    | Medium                    |
| Chained PRs recommended | Yes                       |
| Suggested split         | PR #1 → #2 → #3 → #4 → #5 |
| Delivery strategy       | auto-chain                |
| Chain strategy          | stacked-to-main           |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: Medium

---

## PR #1 — Hero + Layout Foundation

**Objective:** Bootstrap the landing package with root layout, hero section, and core UI primitives.

**Files affected:**

| File                                                | Action             |
| --------------------------------------------------- | ------------------ |
| `packages/landing/package.json`                     | Create             |
| `packages/landing/tsconfig.json`                    | Create             |
| `packages/landing/next.config.ts`                   | Create             |
| `packages/landing/tailwind.config.ts`               | Create             |
| `packages/landing/src/app/globals.css`              | Create             |
| `packages/landing/src/app/layout.tsx`               | Create             |
| `packages/landing/src/app/page.tsx`                 | Create (Hero only) |
| `packages/landing/src/lib/utils.ts`                 | Create             |
| `packages/landing/src/components/ui/button.tsx`     | Create             |
| `packages/landing/src/components/ui/container.tsx`  | Create             |
| `packages/landing/src/components/sections/hero.tsx` | Create             |

**Acceptance criteria:**

- [x] `package.json` includes Next.js 15, Tailwind CSS 4, clsx, tailwind-merge, lucide-react with pinned versions
- [x] `tailwind.config.ts` declares all design tokens from spec.md (colors, typography, spacing, radius, shadows)
- [x] `layout.tsx` renders `<html lang="en">` and `<body>` with Tailwind base styles
- [x] `globals.css` includes `@tailwind base/components/utilities` directives (Tailwind v4 `@import "tailwindcss"`)
- [x] `cn()` utility in `lib/utils.ts` merges classes correctly
- [x] `Button` component supports `variant` (default, secondary, outline, ghost) and `size` (sm, default, lg) props
- [x] `Container` component renders `max-w-7xl mx-auto px-4 md:px-6 lg:px-8`
- [x] `Hero` renders `<h1>` with display typography (text-4xl → text-6xl responsive)
- [x] Hero contains exactly two CTAs: primary button + secondary link
- [x] Hero uses `surface-muted` background token
- [x] Hero contains no `"use client"` directive
- [x] `page.tsx` renders Hero section only with `section-y` spacing

**Lines estimate:** ~450 – 550

**Design reference:** [design.md#Component-Architecture](./design.md#component-architecture), [spec.md#Hero](./spec.md#hero), [spec.md#UI-Primitives](./spec.md#ui-primitives)

---

## PR #2 — Features + Pricing Sections (COMPLETED)

**Files created:**

- `packages/landing/src/components/ui/card.tsx`
- `packages/landing/src/components/ui/badge.tsx`
- `packages/landing/src/components/sections/features.tsx`
- `packages/landing/src/components/sections/pricing.tsx`

**Token verification (grep):** `bg-surface`, `border-border`, `rounded-xl`, `shadow-md`, `p-6`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`, `grid-cols-1 md:grid-cols-3 gap-6`, `ring-2 ring-primary`, `bg-primary`, `text-primary-foreground`, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, `py-16 md:py-24 lg:py-32`, `aria-hidden="true"` — all verified.

**No new dependencies added** (`lucide-react` already in `package.json`).

**Objective:** Implement the features grid and pricing tiers with their card components.

**Files affected:**

| File                                                    | Action |
| ------------------------------------------------------- | ------ |
| `packages/landing/src/components/ui/card.tsx`           | Create |
| `packages/landing/src/components/ui/badge.tsx`          | Create |
| `packages/landing/src/components/sections/features.tsx` | Create |
| `packages/landing/src/components/sections/pricing.tsx`  | Create |

**Acceptance criteria:**

- [x] `Card` component renders `bg-surface border border-border rounded-xl p-6`
- [x] Card supports `title` (renders `<h3>`), `description` (renders `<p>`), and `footer` slot
- [x] `Badge` component renders `rounded-full px-2.5 py-0.5 text-xs font-medium`
- [x] Badge supports `default`, `success`, `secondary` variants
- [x] `Features` section renders `<h2>` heading
- [x] Features grid uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- [x] 4 feature cards render, each with lucide-react icon (aria-hidden), title (`<h3>`), description
- [x] Feature cards wrapped in `Card` component with `surface` token
- [x] Icons are decorative (`aria-hidden="true"`)
- [x] Grid collapses to single column below `md` (320px viewport: no horizontal scroll)
- [x] `Pricing` section renders `<h2>` heading
- [x] Pricing renders exactly 3 plan cards: Free, Pro, Enterprise
- [x] Pro card visually distinguished with `ring-2 ring-primary` and optional `shadow-md`
- [x] Each pricing card shows: plan name, price, feature list (`<ul>/<li>`), CTA button
- [x] Pricing CTAs link to appropriate targets (Free → `#cta`, others → GitHub/mailto)
- [x] Both sections are Server Components (no `"use client"`)

**Lines estimate:** ~400 – 500

**Design reference:** [design.md#Component-Tree](./design.md#component-tree), [spec.md#Features](./spec.md#features), [spec.md#Pricing](./spec.md#pricing)

---

## PR #3 — CTA + Footer + Header (COMPLETED)

**Files created:**

- `packages/landing/src/components/sections/cta.tsx`
- `packages/landing/src/components/layout/header.tsx`
- `packages/landing/src/components/layout/footer.tsx`

**File updated:**

- `packages/landing/src/app/page.tsx`

**Objective:** Complete the page structure with call-to-action banner, sticky header with mobile navigation, and footer.

**Files affected:**

| File                                                | Action                        |
| --------------------------------------------------- | ----------------------------- |
| `packages/landing/src/components/sections/cta.tsx`  | Create                        |
| `packages/landing/src/components/layout/header.tsx` | Create                        |
| `packages/landing/src/components/layout/footer.tsx` | Create                        |
| `packages/landing/src/app/page.tsx`                 | Update (compose all sections) |

**Acceptance criteria:**

- [x] `CTA` section renders full-width band with `bg-primary` background
- [x] CTA contains `<h2>` headline and primary button (light variant)
- [x] CTA is last major section before Footer in `page.tsx`
- [x] `Header` is Client Component (`"use client"`) for scroll behavior
- [x] Header shows brand mark on left, navigation anchors on right at `md+`
- [x] Navigation links: Features (`#features`), Pricing (`#pricing`), GitHub (external, new tab)
- [x] Header sticky behavior: transparent above 40px scroll, `bg-background/80 backdrop-blur shadow-lg` below
- [x] Mobile: hamburger toggle (`useState`) with collapsible nav links
- [x] `scroll-behavior: smooth` on `html` enables anchor scrolling
- [x] `Footer` renders `<footer>` semantic element
- [x] Footer 3-column layout: Brand, Project links, Resources/Connect
- [x] Footer navigation links: `#features`, `#pricing`, docs URL
- [x] Footer social links: GitHub, Twitter, LinkedIn (external with `rel="noopener noreferrer"`)
- [x] Copyright line uses dynamic year (`new Date().getFullYear()`)
- [x] All external links have `target="_blank"` and `rel="noopener noreferrer"`
- [x] Update `page.tsx` to compose all sections in order: Header → Hero → Features → Pricing → CTA → Footer

**Lines estimate:** ~400 – 500

**Design reference:** [design.md#Component-Tree](./design.md#component-tree), [spec.md#Header](./spec.md#header), [spec.md#CTA](./spec.md#cta-call-to-action-band), [spec.md#Footer](./spec.md#footer)

---

## PR #4 — SEO + Metadata + Sitemap + Public Assets

**Objective:** Implement complete SEO infrastructure: metadata API, Open Graph, JSON-LD structured data, sitemap, robots.txt, and OG image.

**Files affected:**

| File                                           | Action                |
| ---------------------------------------------- | --------------------- |
| `packages/landing/src/app/layout.tsx`          | Update (add metadata) |
| `packages/landing/src/app/sitemap.ts`          | Create                |
| `packages/landing/src/app/robots.ts`           | Create                |
| `packages/landing/src/app/not-found.tsx`       | Create                |
| `packages/landing/src/app/opengraph-image.tsx` | Create (or static)    |
| `packages/landing/public/og-image.jpg`         | Create placeholder    |
| `packages/landing/postcss.config.mjs`          | Create                |

**Acceptance criteria:**

- [x] `layout.tsx` exports `metadata` object with:
    - `title: "ChatBot-WA — AI-Powered WhatsApp Chatbot Framework"`
    - `description: "Build, deploy, and scale WhatsApp chatbots with AI..."` (120–160 chars)
    - `openGraph` with og:type, og:title, og:description, og:image, og:url, og:site_name
    - `twitter` with card, title, description, image
    - `alternates.canonical` pointing to production URL
- [x] JSON-LD Organization/SoftwareApplication schema in `<script type="application/ld+json">`
- [x] `sitemap.ts` exports default async function returning `MetadataRoute.Sitemap` array
- [x] Sitemap contains root URL (`/`) with weekly change frequency, priority 1.0
- [x] Sitemap valid XML at `/sitemap.xml`
- [x] `robots.ts` exports default `MetadataRoute.Robots` object
- [x] Robots allows all, points to sitemap URL
- [x] Robots.txt valid at `/robots.txt`
- [x] `not-found.tsx` renders 404 page with link back to home
- [x] OG image placeholder exists at `public/og-image.jpg` (1200x630)
- [ ] `opengraph-image.tsx` optionally generates dynamic OG image
- [ ] `postcss.config.mjs` configured for Tailwind CSS 4

**Lines estimate:** ~200 – 300

**Design reference:** [spec.md#SEO-Metadata](./spec.md#seo--metadata), [proposal.md#SEO-Implementation](./proposal.md#seo-implementation)

---

## PR #5 — Tests + Verification

**Objective:** Implement comprehensive test suite covering components, SEO, and E2E scenarios.

**Files affected:**

| File                                                  | Action |
| ----------------------------------------------------- | ------ |
| `packages/landing/vitest.config.ts`                   | Create |
| `packages/landing/tests/components/hero.test.tsx`     | Create |
| `packages/landing/tests/components/features.test.tsx` | Create |
| `packages/landing/tests/components/pricing.test.tsx`  | Create |
| `packages/landing/tests/components/cta.test.tsx`      | Create |
| `packages/landing/tests/components/header.test.tsx`   | Create |
| `packages/landing/tests/components/footer.test.tsx`   | Create |
| `packages/landing/tests/seo/metadata.test.ts`         | Create |
| `packages/landing/playwright.config.ts`               | Create |
| `packages/landing/tests/e2e/landing.spec.ts`          | Create |

**Acceptance criteria:**

- [x] `vitest.config.ts` configured with React Testing Library environment
- [x] `hero.test.tsx`: verifies `<h1>` exists, two CTAs present, no client logic, content visible
- [x] `features.test.tsx`: verifies grid columns per breakpoint, 3–6 cards, icons decorative
- [x] `pricing.test.tsx`: verifies exactly 3 plan cards, Pro card has `ring-2`, features in `<ul>`
- [x] `cta.test.tsx`: verifies `bg-primary` background, `<h2>` present, CTA button present
- [x] `header.test.tsx`: verifies brand link, nav anchors, scroll elevation behavior
- [x] `footer.test.tsx`: verifies `<footer>` element, copyright with current year, valid hrefs
- [x] `metadata.test.ts`: validates generateMetadata exports, description length 120–160 chars, all OG tags present, JSON-LD valid
- [x] All Vitest tests pass with `vitest run` (46 passed)
- [x] Component coverage ≥ 80% on `components/sections/` (configured in vitest.config.ts)
- [x] `playwright.config.ts` configured for Chromium, Firefox, WebKit
- [x] `landing.spec.ts` verifies title, unique h1, anchor navigation, no console errors, responsive at 320px, keyboard order
- [x] `npm run build` succeeds with zero warnings (verified with `pnpm run build` in package)
- [x] Lighthouse score ≥ 90 configured (lighthouserc.json assertions)

**Lines estimate:** ~450 – 600

**Design reference:** [spec.md#Tests](./spec.md#tests)

---

## Dependency Graph

```
PR #1 (Hero + Layout)
    ↓
PR #2 (Features + Pricing)    ← depends on PR #1 (Button, Container, Card primitives)
    ↓
PR #3 (CTA + Footer + Header) ← depends on PR #2 (sections ready for composition)
    ↓
PR #4 (SEO + Metadata)        ← depends on PR #3 (layout complete)
    ↓
PR #5 (Tests + Verification) ← depends on PR #4 (all components + SEO ready)
```

## Rollback Plan

| PR    | Rollback action                               |
| ----- | --------------------------------------------- |
| PR #1 | Delete `packages/landing/` directory entirely |
| PR #2 | Revert only new files; PR #1 remains valid    |
| PR #3 | Revert only new files; PRs #1–2 remain valid  |
| PR #4 | Revert only new files; PRs #1–3 remain valid  |
| PR #5 | Revert test files only; PRs #1–4 remain valid |

---

**Change:** `landing-page-vercel`  
**Tasks artifact:** `openspec/changes/landing-page-vercel/tasks.md`
