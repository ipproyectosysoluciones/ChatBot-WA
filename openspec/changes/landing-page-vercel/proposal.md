# Proposal: Landing Page — ChatBot-WA

## Summary

Landing page for ChatBot-WA project deployed on Vercel, built with Next.js 15 (App Router), styled with Tailwind CSS 4, optimized for SEO (meta tags, Open Graph, JSON-LD structured data), and fully responsive (mobile-first approach).

## Problem Statement

ChatBot-WA lacks a public-facing landing page to showcase the project, attract users, and provide documentation/getting-started information. This creates a poor first impression and limits discoverability.

## Goals

1. **Visibility**: Improve project discoverability via search engines and social sharing
2. **Credibility**: Present a professional, polished first impression
3. **Conversion**: Guide visitors to key actions (GitHub, documentation, demo)
4. **Performance**: Achieve optimal Core Web Vitals scores on Vercel Edge Network

## Technical Constraints

- **Framework**: Next.js 15 with App Router (Server Components by default)
- **Styling**: Tailwind CSS 4 (no `var()` in className, use `cn()` for conditional classes)
- **Deployment**: Vercel (Edge-ready, automatic SSL, analytics)
- **SEO**: Metadata API, Open Graph, JSON-LD structured data, sitemap, robots.txt
- **Responsive**: Mobile-first breakpoints (320px → 768px → 1024px → 1280px)

## Proposed Solution

### Architecture

```
packages/
└── landing/                    # Next.js 15 landing page
    ├── app/
    │   ├── layout.tsx          # Root layout with metadata
    │   ├── page.tsx            # Home (/)
    │   ├── not-found.tsx       # 404 page
    │   └── sitemap.ts           # Dynamic sitemap
    ├── components/
    │   ├── ui/                 # Reusable UI primitives
    │   │   ├── button.tsx
    │   │   └── container.tsx
    │   ├── sections/           # Landing sections
    │   │   ├── hero.tsx
    │   │   ├── features.tsx
    │   │   ├── pricing.tsx
    │   │   └── cta.tsx
    │   └── layout/
    │       ├── header.tsx
    │       └── footer.tsx
    ├── lib/
    │   └── utils.ts            # cn() utility
    ├── public/
    │   └── og-image.jpg        # Social sharing image
    ├── next.config.ts
    ├── tailwind.config.ts
    └── package.json
```

### Key Technical Decisions

| Decision                         | Rationale                                 |
| -------------------------------- | ----------------------------------------- |
| **Server Components by default** | Next.js 15 default; reduces client bundle |
| **Tailwind CSS 4**               | Utility-first, optimized for performance  |
| **cn() utility**                 | Merge Tailwind classes conditionally      |
| **Static metadata**              | No dynamic SEO content needed for v1      |
| **Vercel Analytics**             | Built-in Core Web Vitals tracking         |
| **No client components**         | Unless interactive (forms, animations)    |

### SEO Implementation

- [ ] `generateMetadata()` in `layout.tsx`
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Twitter Card tags
- [ ] JSON-LD: `Organization` schema
- [ ] `app/sitemap.ts` for XML sitemap
- [ ] `app/robots.ts` for robots.txt
- [ ] Canonical URLs
- [ ] hreflang if internationalized (future)

### Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Dependencies

```json
{
    "next": "^15.0.0",
    "tailwindcss": "^4.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.400.0"
}
```

## Out of Scope (v1)

- Blog / CMS integration
- Internationalization (i18n)
- A/B testing
- Dark mode toggle
- Multi-page navigation (single landing page only)

## Success Criteria

1. Lighthouse score ≥ 90 for Performance, Accessibility, Best Practices, SEO
2. Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
3. Social preview renders correctly (Facebook, Twitter, LinkedIn)
4. Renders on mobile (320px width) without horizontal scroll
5. Vercel deployment succeeds with zero build warnings

## Risks & Mitigations

| Risk                         | Mitigation                                                    |
| ---------------------------- | ------------------------------------------------------------- |
| Tailwind 4 API changes       | Pin to stable minor version                                   |
| SEO configuration complexity | Start with static metadata, add structured data incrementally |
| Responsive testing coverage  | Use Playwright for cross-device visual regression             |

## Next Steps

1. **SPEC**: Define component specifications and design tokens
2. **DESIGN**: Create wireframes and component architecture
3. **TASKS**: Break down implementation into PR-sized chunks
4. **APPLY**: Implement iteratively with code review

---

**Change**: landing-page-vercel  
**Created**: 2025-01-XX  
**Chain Strategy**: stacked-to-main (PR per section)
