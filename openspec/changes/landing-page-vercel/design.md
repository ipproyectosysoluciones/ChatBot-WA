# Design: Landing Page — Vercel

Status: design phase (post-proposal / post-spec).
Scope: single route `/` (packages/landing/). Multi-page, blog, CMS, i18n out of scope (v1).

## Component Architecture

Components live under `packages/landing/src/components/`. All components are Server Components by default (Next.js 15 App Router); client interactivity only where required (e.g. mobile menu toggle, form submit). No arbitrary Tailwind `[]` values; all spacing uses the section-y / container-max / stack-md tokens from spec.md.

### Component Tree

```
Layout (layout.tsx)
├── Header (components/layout/header.tsx)
│   ├── Nav links (single-page anchors: #hero, #features, #pricing, #cta)
│   └── Mobile hamburger toggle (client component: HeaderMobileToggle)
├── Main
│   ├── Hero (components/sections/hero.tsx) — server, static content
│   │   ├── Headline (h1) — display token (text-4xl → text-6xl)
│   │   ├── Subheadline (p) — body token
│   │   ├── Primary CTA button (Button component)
│   │   └── Secondary CTA link (Link component)
│   ├── Features (components/sections/features.tsx) — server, static list
│   │   ├── FeatureCard (reusable, 4 cards in grid)
│   │   └── FeatureIcon (lucide-react icon per card)
│   ├── Pricing (components/sections/pricing.tsx) — server, static tiers
│   │   ├── PricingCard (3 tiers: Free / Pro / Enterprise)
│   │   └── PricingCTA (button linking to GitHub/demo)
│   └── CTA (components/sections/cta.tsx) — server, static banner
│       ├── Headline — h2 token
│       ├── Subheadline — body token
│       └── CTA button — primary token
└── Footer (components/layout/footer.tsx) — server, static links
    ├── Brand + description
    ├── Link groups (Project, Resources, Connect)
    └── Social icons (GitHub, Twitter, LinkedIn — external links)
```

### Composition Rules

- Sections are stacked vertically in `page.tsx` with `section-y` spacing (py-16 md:py-24 lg:py-32) and `section-x` padding (px-4 md:px-6 lg:px-8).
- Each section uses `container-max` (`max-w-7xl mx-auto`) for the content rail.
- Hero: full-width background (surface-muted token), centered content (flex, justify-center, items-center), vertical stack-lg spacing.
- Features: 4-column grid on lg (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`), 2 rows max on mobile, gap-6 (`gap-6`).
- Pricing: 3-column grid (`grid-cols-1 md:grid-cols-3`), cards with surface token (`bg-surface`), radius-lg, shadow-md.
- CTA: full-width banner (`bg-primary`), white text, centered, shadow-lg.
- Footer: 3-column links grid (`grid-cols-1 md:grid-cols-3`), muted text.

### File Structure (aligned with spec.md)

```
packages/landing/src/
├── app/
│   ├── layout.tsx              (metadata, root layout)
│   ├── page.tsx                (section stack: Hero → Features → Pricing → CTA → Footer)
│   ├── sitemap.ts              (dynamic sitemap, server)
│   ├── robots.ts               (robots.txt content)
│   └── not-found.tsx           (404, minimal)
├── components/
│   ├── ui/
│   │   ├── button.tsx          (primary/secondary variants, cn() utility)
│   │   ├── container.tsx       (max-w-7xl wrapper)
│   │   └── card.tsx            (surface, radius-lg, shadow-md)
│   ├── sections/
│   │   ├── hero.tsx            (headline, subheadline, 2 CTAs)
│   │   ├── features.tsx        (4 FeatureCard children)
│   │   ├── pricing.tsx         (3 PricingCard tiers)
│   │   └── cta.tsx             (banner with headline + button)
│   └── layout/
│       ├── header.tsx          (sticky header: logo + nav + mobile toggle)
│       └── footer.tsx          (3-column links + socials)
├── lib/
│   └── utils.ts                (cn() from clsx + tailwind-merge)
├── public/
│   └── og-image.jpg            (Open Graph image, 1200x630)
├── tailwind.config.ts          (color tokens, typography, spacing)
├── next.config.ts              (Vercel edge, static export config if needed)
└── package.json                (dependencies pinned)
```

### Key Technical Decisions (design-level)

| Decision                                | Rationale                                                                                                                                                             |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header sticky (`sticky top-0`)**      | Keeps navigation accessible during scroll; shadow-sm on scroll (client-only `useScroll` hook).                                                                        |
| **Mobile hamburger (client)**           | Only interactive element; HeaderMobileToggle is a Client Component (`"use client"`) with `useState`.                                                                  |
| **Hero full-width background**          | Uses `surface-muted` token; no arbitrary hex; responsive image via `Image` component (`next/image`) with `fill` + `object-cover`.                                     |
| **Features grid (4 columns)**           | Aligns with proposal's 4 key features; collapses to 1 column on mobile.                                                                                               |
| **Pricing cards (surface + shadow-md)** | Elevated appearance; shadow-md only at `md:` and above to avoid mobile clutter.                                                                                       |
| **CTA banner (`bg-primary`)**           | Full-width, high-contrast, white text; no dark-mode toggle needed (v1 uses light surface only).                                                                       |
| **No external CMS**                     | Content static (hard-coded in components); future CMS integration out of scope.                                                                                       |
| **No dark-mode toggle**                 | Dark mode not in proposal scope; design tokens include dark values for future extension.                                                                              |
| **No animations (v1)**                  | Motion token (`motion-default`) reserved; v1 uses static rendering for performance; future phase can add scroll-triggered fade-in via Framer Motion or CSS keyframes. |

### Responsive Design (mobile-first)

- **Mobile (`< 768px`)**: single column (`grid-cols-1`), header collapses to hamburger, hero headline `text-4xl`, pricing cards stacked vertically, footer links stacked.
- **Tablet (`md: 768px`)**: features become 2-column grid (`md:grid-cols-2`), pricing cards 3-column (`md:grid-cols-3`), header shows full nav.
- **Desktop (`lg: 1024px`)**: container max-w-7xl, hero headline `text-6xl`, footer 3-column.
- **Large screen (`xl: 1280px`, `2xl: 1536px`)**: spacing increases (`section-y` `py-32`, `py-24` for large screens).

### Wireframes (text-based structure)

```
[Desktop wireframe — single page, vertical scroll]
+--------------------------------------------------+
| HEADER (sticky)                                  |
| Logo (left) | Nav links (anchor links) | Mobile toggle|
+--------------------------------------------------+
| HERO (full-width, surface-muted bg)              |
|  [Headline: display, text-6xl]                   |
|  [Subheadline: body]                             |
|  [Primary CTA button]  [Secondary link]         |
+--------------------------------------------------+
| FEATURES (container-max, py-24)                  |
|  [Feature 1 card] [Feature 2 card]              |
|  [Feature 3 card] [Feature 4 card]              |
+--------------------------------------------------+
| PRICING (container-max, py-24)                    |
|  [Free] [Pro] [Enterprise] — 3 cards, grid-cols-3|
+--------------------------------------------------+
| CTA (full-width, bg-primary, text-white)         |
|  [Headline h2] [Button: Get Started]             |
+--------------------------------------------------+
| FOOTER (container-max, surface-muted)            |
|  Brand | Project links | Resources | Connect     |
+--------------------------------------------------+

[Mobile wireframe — vertical stack]
+--------------------------------------------------+
| HEADER (sticky, hamburger only)                   |
+--------------------------------------------------+
| HERO (full-width, text-4xl)                       |
|  [Headline] [Subheadline] [CTA button]           |
+--------------------------------------------------+
| FEATURES (grid-cols-1, 4 cards stacked)           |
|  [Card 1] [Card 2] [Card 3] [Card 4]             |
+--------------------------------------------------+
| PRICING (grid-cols-1, stacked)                    |
|  [Free card] [Pro card] [Enterprise card]         |
+--------------------------------------------------+
| CTA (full-width banner)                           |
+--------------------------------------------------+
| FOOTER (stacked links)                            |
+--------------------------------------------------+
```

### Data Dependencies (v1 — static)

No external CMS or database required for v1. All content is static and embedded in components:

- Hero text: hard-coded in `hero.tsx`.
- Feature cards: array of objects (`name`, `description`, `iconName`) passed as props or defined locally.
- Pricing tiers: array (`name`, `price`, `features`, `ctaText`) defined locally.
- Footer links: static arrays.
- SEO metadata: static values in `layout.tsx` (`generateMetadata()` returns fixed object).
- OG image: static file (`public/og-image.jpg`).

Future phases (post-v1) may introduce:

- CMS integration (Sanity, Contentful) for blog or dynamic pricing.
- Dynamic sitemap generation from CMS routes.
- A/B testing framework (split.io, Optimizely) for pricing cards.

### Key Interactions

1. **Header sticky scroll behavior** (client): `useScroll` hook detects scroll > 50px; applies `shadow-lg` and `bg-background/95 backdrop-blur-md` to header. Mobile hamburger toggles `useState` for mobile nav menu.
2. **CTA button hover**: `transition-colors`, `hover:bg-opacity-90`, `hover:-translate-y-0.5` (subtle lift) using Tailwind transition utilities. No arbitrary values; uses default `duration-300`.
3. **Feature card hover**: `hover:shadow-lg`, `hover:-translate-y-1` (subtle elevation). Card uses `group` class; icon uses `group-hover:text-primary`.
4. **Pricing card hover**: `hover:shadow-lg`, `hover:-translate-y-1`, border color changes (`border-border` → `border-primary`).
5. **Anchor scroll** (single-page navigation): nav links (`#hero`, `#features`, `#pricing`, `#cta`) scroll smoothly (`scroll-behavior: smooth`) to section IDs.
6. **External links** (GitHub, demo, social): open in new tab (`target="_blank"`, `rel="noopener noreferrer"`).

### Design Tokens Applied (from spec.md)

- **Colors**: `background` (`#ffffff` light), `surface` (`#f7f7f7`), `primary` (`#3b5bdb`), `primary-foreground` (white on blue).
- **Typography**: Hero headline `text-4xl md:text-6xl font-bold tracking-tight`; feature cards `text-xl font-semibold`; pricing tier names `text-2xl font-semibold`.
- **Spacing**: Section padding `py-16 md:py-24 lg:py-32`; container `max-w-7xl mx-auto px-4 md:px-6 lg:px-8`; card gap `gap-6`; internal card spacing `p-6` (padding token).
- **Radius**: Feature/pricing cards `rounded-xl`; buttons `rounded-md`; header `rounded-none` (sticky, full-width).
- **Elevation**: Feature cards `shadow-md`; pricing cards `shadow-md`; header on scroll `shadow-lg`; buttons `shadow-sm` (hover `shadow-md`).

### Acceptance Criteria by Component (design-level)

- **Hero**: Renders full-width, headline `display` token (`text-6xl` at `lg`), 2 CTAs visible (primary + secondary), responsive without overflow at 320px.
- **Features**: 4 cards visible, each with icon + title + description, grid collapses to single column on mobile, no horizontal overflow.
- **Pricing**: 3 cards visible (`Free`, `Pro`, `Enterprise`), each with price, feature list (bullet list), CTA button; cards align vertically at same height; mobile stacks vertically.
- **CTA Banner**: Full-width, `bg-primary`, white text, visible on scroll to bottom of page; button has hover effect (`hover:-translate-y-0.5`).
- **Header**: Sticky at top, visible on all scroll positions; mobile hamburger shows/hides mobile nav; links scroll smoothly to sections.
- **Footer**: Visible at bottom, 3-column links, brand description, social icons; responsive stacks vertically on mobile.
- **SEO (layout)**: `generateMetadata()` returns `title`, `description`, `openGraph`, `twitter`; sitemap and robots files exist; no broken links; Lighthouse score ≥ 90.

### Next Recommended Phase: `tasks`

Break down implementation into PR-sized chunks (stacked-to-main chain strategy):

1. PR #1 (Hero + Layout) — `packages/landing/src/app/layout.tsx`, `page.tsx` (Hero only), `components/ui/button.tsx`, `components/ui/container.tsx`.
2. PR #2 (Features + Pricing sections) — `components/sections/features.tsx`, `components/sections/pricing.tsx`.
3. PR #3 (CTA + Footer + Header) — `components/sections/cta.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx`.
4. PR #4 (SEO + Metadata + Sitemap + Public assets) — `layout.tsx` metadata, `public/og-image.jpg`, `app/sitemap.ts`, `app/robots.ts`.
5. PR #5 (Tests + Verification) — Vitest unit tests for components, Playwright e2e for responsive + SEO, Lighthouse CI.

If proposal intended additional sections (testimonials, FAQ, integrations), add PR #6 for extensions after PR #5.
