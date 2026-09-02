# Landing Specification

## Purpose

Define the WHAT of the ChatBot-WA public landing page: a single-page Next.js 15 (App Router) site deployed to Vercel that introduces the project, presents its features, communicates value, and routes visitors to conversion actions (GitHub, documentation, demo). This spec is the source of truth for component behavior, design tokens, file structure, and acceptance criteria; HOW to implement is delegated to the design and tasks phases.

Scope is a single route at `/`. Multi-page navigation, blog/CMS, i18n, dark-mode toggle, and A/B testing are explicitly out of scope for v1.

---

## Design Tokens

Design tokens are the single source of truth for visual values. They MUST be defined once and consumed via Tailwind utility classes; no raw hex values or ad-hoc `style` attributes are permitted in component code.

### Color Tokens

The palette is a neutral, high-contrast system tuned for both light and dark surfaces. Tokens MUST be declared in `tailwind.config.ts` and exposed as semantic Tailwind classes (e.g. `bg-surface`, `text-foreground`).

| Token                | Role                     | Light value                        | Dark value                        |
| -------------------- | ------------------------ | ---------------------------------- | --------------------------------- |
| `background`         | Page background          | `oklch(1 0 0)` (`#ffffff`)         | `oklch(0.145 0 0)` (`#0a0a0a`)    |
| `foreground`         | Default text             | `oklch(0.145 0 0)` (`#0a0a0a`)     | `oklch(0.985 0 0)` (`#fafafa`)    |
| `surface`            | Elevated cards/sections  | `oklch(0.97 0 0)` (`#f7f7f7`)      | `oklch(0.205 0 0)` (`#1a1a1a`)    |
| `surface-muted`      | Subtle background panels | `oklch(0.95 0 0)` (`#f2f2f2`)      | `oklch(0.245 0 0)` (`#222222`)    |
| `border`             | Dividers, card borders   | `oklch(0.9 0 0)` (`#e5e5e5`)       | `oklch(0.27 0 0)` (`#2e2e2e`)     |
| `primary`            | Brand accent + CTAs      | `oklch(0.55 0.18 260)` (`#3b5bdb`) | `oklch(0.7 0.18 260)` (`#7c8cff`) |
| `primary-foreground` | Text on `primary`        | `oklch(0.985 0 0)`                 | `oklch(0.145 0 0)`                |
| `muted-foreground`   | Secondary text, captions | `oklch(0.45 0 0)`                  | `oklch(0.65 0 0)`                 |
| `success`            | Positive states (badges) | `oklch(0.65 0.18 145)`             | `oklch(0.7 0.18 145)`             |
| `danger`             | Destructive/error states | `oklch(0.6 0.22 25)`               | `oklch(0.7 0.22 25)`              |

#### Scenario: Token consumption

- GIVEN a component needs the page background
- WHEN it renders in light mode
- THEN it MUST use the `bg-background` Tailwind class
- AND MUST NOT contain a raw color literal in `className` or `style`.

### Typography Tokens

Typography is composed from the system font stack so the landing loads with zero web-font requests and zero CLS from font swaps.

| Token     | Family                                 | Size (mobile → desktop)                        | Line height | Weight |
| --------- | -------------------------------------- | ---------------------------------------------- | ----------- | ------ |
| `display` | `ui-sans-serif, system-ui, sans-serif` | `2.25rem → 3.75rem` (`text-4xl` → `text-6xl`)  | `1.1`       | `700`  |
| `h2`      | same                                   | `1.875rem → 2.25rem` (`text-3xl` → `text-4xl`) | `1.2`       | `600`  |
| `h3`      | same                                   | `1.5rem → 1.875rem` (`text-2xl` → `text-3xl`)  | `1.3`       | `600`  |
| `body`    | same                                   | `1rem` (`text-base`)                           | `1.6`       | `400`  |
| `body-sm` | same                                   | `0.875rem` (`text-sm`)                         | `1.5`       | `400`  |
| `caption` | same                                   | `0.75rem` (`text-xs`)                          | `1.4`       | `500`  |

Letter spacing is default (`tracking-normal`); `display` and `h2` MAY use `tracking-tight` (`-0.02em`).

#### Scenario: Typography application

- GIVEN the Hero component renders its headline
- WHEN the viewport is `< 768px`
- THEN the headline MUST render at `text-4xl` (`2.25rem`)
- AND when the viewport is `≥ 1024px` it MUST render at `text-6xl` (`3.75rem`).

### Spacing Tokens

All spacing MUST use the Tailwind default scale (`0`, `1`, `2`, `4`, `6`, `8`, `12`, `16`, `20`, `24`, `32`) and the section padding scale below. No arbitrary `[]` spacing values except where explicitly noted.

| Token           | Value                     | Use                                         |
| --------------- | ------------------------- | ------------------------------------------- |
| `section-y`     | `py-16 md:py-24 lg:py-32` | Vertical padding of full landing sections   |
| `section-x`     | `px-4 md:px-6 lg:px-8`    | Horizontal padding of full landing sections |
| `container-max` | `max-w-7xl mx-auto`       | Max width of the central content rail       |
| `stack-xs`      | `space-y-2`               | Tight vertical rhythm (form fields)         |
| `stack-sm`      | `space-y-4`               | Tight rhythm inside cards                   |
| `stack-md`      | `space-y-6`               | Default vertical rhythm inside sections     |
| `stack-lg`      | `space-y-12`              | Rhythm between sibling blocks               |

#### Scenario: Section rhythm

- GIVEN the Pricing section renders
- WHEN viewed on a mobile viewport (`< 768px`)
- THEN it MUST apply `py-16 px-4`
- AND when viewed at `≥ 1024px` it MUST apply `py-32 px-8`.

### Radius & Elevation Tokens

| Token       | Value                     | Use                                  |
| ----------- | ------------------------- | ------------------------------------ |
| `radius-sm` | `rounded-md` (`0.375rem`) | Inputs, badges                       |
| `radius-md` | `rounded-lg` (`0.5rem`)   | Buttons, small cards                 |
| `radius-lg` | `rounded-xl` (`0.75rem`)  | Feature cards, pricing cards         |
| `shadow-sm` | `shadow-sm`               | Subtle elevation (buttons)           |
| `shadow-md` | `shadow-md`               | Hover elevation (cards, buttons)     |
| `shadow-lg` | `shadow-lg`               | Floating elements (header on scroll) |

### Breakpoints

Mobile-first responsive rules use Tailwind defaults. Custom values are forbidden in v1.

| Token | Min-width | Use                               |
| ----- | --------- | --------------------------------- |
| `sm`  | `640px`   | Large phones                      |
| `md`  | `768px`   | Tablets                           |
| `lg`  | `1024px`  | Laptops, hero multi-column layout |
| `xl`  | `1280px`  | Desktops                          |
| `2xl` | `1536px`  | Wide screens                      |

#### Scenario: Breakpoint policy

- GIVEN a developer writes a responsive class
- WHEN it changes layout at a given viewport
- THEN it MUST use one of `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- AND MUST NOT introduce an arbitrary `min-[Xpx]:` class.

### Motion Tokens

Motion is minimal and respects `prefers-reduced-motion`.

| Token         | Duration | Easing        | Use                    |
| ------------- | -------- | ------------- | ---------------------- |
| `motion-fast` | `150ms`  | `ease-out`    | Hover, focus           |
| `motion-base` | `250ms`  | `ease-out`    | Default transitions    |
| `motion-slow` | `400ms`  | `ease-in-out` | Hero / section reveals |

All animated elements MUST wrap their transitions in `motion-safe:` Tailwind variants and be neutralized under `motion-reduce:`.

---

## File Structure

The landing package MUST live at `packages/landing/` inside the existing monorepo (consistent with `packages/` layout referenced in the proposal). No files outside `packages/landing/` may be modified by this change.

```text
packages/landing/
├── app/
│   ├── layout.tsx              # Root layout, <html>/<body>, metadata, fonts
│   ├── page.tsx                # Home route composition (Hero, Features, Pricing, CTA, Footer)
│   ├── not-found.tsx           # 404 view (uses CTA)
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── opengraph-image.tsx     # Dynamic OG image (or static in /public)
│   └── globals.css             # Tailwind directives + CSS variables
├── components/
│   ├── ui/
│   │   ├── button.tsx          # Primary/secondary/ghost variants
│   │   ├── container.tsx       # max-w-7xl centered wrapper
│   │   ├── card.tsx            # Surface card primitive
│   │   └── badge.tsx           # Inline status pill
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   └── cta.tsx
│   └── layout/
│       ├── header.tsx
│       └── footer.tsx
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── public/
│   └── og-image.jpg            # Static social sharing image (1200x630)
├── tests/
│   ├── components/             # Component tests (Vitest + Testing Library)
│   │   ├── hero.test.tsx
│   │   ├── features.test.tsx
│   │   ├── pricing.test.tsx
│   │   ├── cta.test.tsx
│   │   ├── header.test.tsx
│   │   └── footer.test.tsx
│   ├── seo/
│   │   └── metadata.test.ts    # Validates metadata + sitemap.ts output
│   └── e2e/
│       └── landing.spec.ts     # Playwright cross-device + a11y + Lighthouse
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── vitest.config.ts
└── playwright.config.ts
```

#### Scenario: File layout enforcement

- GIVEN the change is implemented
- WHEN listing `packages/landing/`
- THEN every path above MUST exist
- AND no file under `packages/landing/` MAY import from a sibling package (`@chatbot-wa/*`) — the landing MUST remain an isolated, independently deployable unit.

---

## Components

All sections are Server Components by default. A component MUST be a Client Component (`"use client"`) only when it requires interactivity (form state, scroll listener, animation on intersection). Each section below lists its component type and required props.

### Header

**Type:** Client Component (sticky scroll behavior requires `useEffect`).

**Responsibilities:**

- Render the brand mark on the left (text or logo SVG).
- Render navigation anchors on the right (`Features`, `Pricing`, `GitHub`) at `md`+ breakpoints.
- On `< md`, render a compact nav (anchors stacked OR a simple text link list — no hamburger menu in v1).
- Apply `bg-background/80 backdrop-blur` and `shadow-sm` after the user scrolls past `40px`.
- Anchor links MUST point to in-page section IDs: `#features`, `#pricing`.

**Props:** none (single instance).

**Acceptance:**

1. The header MUST render above the Hero on the initial paint.
2. Anchors MUST smooth-scroll to the corresponding section via CSS `scroll-behavior: smooth` on `html`.
3. The "GitHub" link MUST open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) and point at the configured repository URL.
4. After the user scrolls `≥ 40px`, the header MUST acquire the elevated background; below `40px` it MUST be transparent.

#### Scenario: Header anchors

- GIVEN the user clicks the "Pricing" nav anchor in the header
- WHEN the click handler runs
- THEN the viewport MUST scroll to the element with `id="pricing"`
- AND the browser history MUST be updated with `#pricing`.

#### Scenario: Header elevation

- GIVEN the user is at the top of the page (`scrollY < 40`)
- WHEN the header paints
- THEN it MUST NOT show `shadow-sm`
- AND MUST NOT show `bg-background/80`.
- WHEN `scrollY ≥ 40`
- THEN the header MUST show `shadow-sm` and `bg-background/80 backdrop-blur`.

### Hero

**Type:** Server Component.

**Required props:** none.

**Structure:**

- `display` headline summarizing the product (single sentence, ≤ 12 words).
- `body` sub-headline (≤ 24 words) explaining the value proposition.
- Two CTAs side-by-side: primary (`Start now` → `#cta` or external) and secondary (`View on GitHub` → repo URL).
- A small `caption` "Trusted by..." OR a row of placeholder logos (optional in v1).
- Below the headline: a visual element (decorative SVG/gradient block, no real screenshot required in v1).

**Acceptance:**

1. The headline MUST communicate the project name AND one benefit.
2. The Hero MUST contain exactly two CTAs.
3. The primary CTA MUST use the `primary` token (`bg-primary text-primary-foreground`).
4. The Hero MUST render a `<h1>` element (semantic requirement for SEO).
5. The Hero MUST NOT contain any interactive client-side logic (no `useState`, no `useEffect`).

#### Scenario: Hero accessibility

- GIVEN a screen reader visits the page
- WHEN the Hero section is announced
- THEN the document MUST have exactly one `<h1>`
- AND the heading MUST come from the Hero component (not duplicated in metadata only).

#### Scenario: Hero CTAs

- GIVEN the Hero renders
- WHEN the primary CTA is clicked (or activated via keyboard)
- THEN it MUST navigate to the configured target (anchor or external URL)
- AND it MUST be reachable in the tab order with a visible focus ring (`focus-visible:ring-2 ring-primary`).

### Features

**Type:** Server Component.

**Required props:** none.

**Structure:**

- `<h2>` section title (e.g. "Everything you need to ship faster").
- Responsive grid of feature cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Each card contains: icon (lucide-react, server-rendered SVG), title (`h3`), short description (1–2 sentences).
- The grid MUST render between 3 and 6 feature cards (exactly 3 in v1, but the layout MUST tolerate 6).

**Acceptance:**

1. Each feature card MUST be wrapped in the `Card` primitive using `surface` token.
2. Icons MUST be from `lucide-react` (consistent stroke width).
3. The grid MUST collapse to a single column below `md` (`< 768px`).
4. Each card MUST have an accessible name from the heading (`<h3>`); the icon is decorative (`aria-hidden="true"`).

#### Scenario: Features grid responsiveness

- GIVEN the viewport is `320px` wide
- WHEN the Features section renders
- THEN the cards MUST stack vertically (one column)
- AND no horizontal scrollbar MUST appear on the page.

#### Scenario: Feature card a11y

- GIVEN a screen reader iterates over feature cards
- WHEN each card is announced
- THEN the icon MUST NOT be announced (decorative)
- AND the card title (`<h3>`) MUST be the accessible name.

### Pricing

**Type:** Server Component.

**Required props:** none.

**Structure:**

- `<h2>` section title (e.g. "Simple, transparent pricing").
- Responsive grid of plan cards: `grid-cols-1 md:grid-cols-3 gap-6`.
- Exactly 3 plans in v1: `Free`, `Pro` (highlighted), `Enterprise`.
- Each plan card MUST contain: plan name, price (use `$0`, `$29`, `Custom`), short feature list (3–5 bullets), and one CTA button per plan.
- The middle (`Pro`) card MUST be visually distinguished (`ring-2 ring-primary`, optional `shadow-md`).

**Acceptance:**

1. The Pricing section MUST render exactly 3 plan cards.
2. The middle card MUST be highlighted using `ring-2 ring-primary`.
3. CTA on the `Free` plan MUST scroll to `#cta` or to `app/layout.tsx` configured primary action.
4. CTA on `Pro` and `Enterprise` MUST link to the GitHub repo or a contact mailto (placeholder is acceptable in v1, declared as a TODO).
5. Each plan MUST list its features as a `<ul>` of `<li>` items, NOT as free text.

#### Scenario: Pricing comparison

- GIVEN a user scans the pricing grid
- WHEN the grid renders
- THEN the three plans MUST appear in order: Free → Pro → Enterprise
- AND the Pro card MUST be visually distinguishable from Free and Enterprise.

#### Scenario: Pricing CTA accessibility

- GIVEN keyboard navigation traverses the pricing section
- WHEN the user reaches a CTA
- THEN it MUST have a visible focus indicator
- AND MUST activate on `Enter`/`Space`.

### CTA (Call-to-Action band)

**Type:** Server Component.

**Required props:** none.

**Structure:**

- Full-width band using `bg-primary text-primary-foreground`.
- `<h2>` headline inviting the visitor to try the product.
- One primary CTA button (light variant `bg-white text-primary hover:bg-gray-50`).

**Acceptance:**

1. The CTA band MUST use `bg-primary` as its background.
2. The CTA band MUST render a `<h2>` as its headline (not `<p>` or `<div>`).
3. The CTA button MUST be a `Button` component in `variant="default"` or the equivalent primary style.
4. The CTA section MUST be the last major section before the Footer.

#### Scenario: CTA accessibility

- GIVEN a screen reader lands on the CTA band
- WHEN it reads the section
- THEN the `<h2>` MUST be the first heading encountered in the band
- AND the CTA button MUST be reachable in a single Tab press from the heading.

### Footer

**Type:** Server Component.

**Required props:** none.

**Structure:**

- Three columns at `lg`+ breakpoints: (1) Brand + tagline, (2) Navigation links, (3) Social / external links.
- Bottom row: copyright, a minimal privacy/TOS link pair.
- Full-width border-top separating it from page content.
- All links MUST be either in-page anchors (`#features`) or external URLs with `target="_blank"` and `rel="noopener noreferrer"`.

**Acceptance:**

1. The Footer MUST render a `<footer>` semantic element.
2. The brand column MUST contain the project name and a one-line description.
3. The navigation column MUST link to `#features`, `#pricing`, and any documentation URL.
4. The social column MUST link to GitHub and any other relevant social profile.
5. The copyright line MUST include the current year (dynamic `new Date().getFullYear()`).

#### Scenario: Footer copyright

- GIVEN the landing page renders in 2025
- WHEN the Footer renders
- THEN the copyright line MUST read "© 2025 ChatBot-WA" (or equivalent dynamic year)
- AND the year MUST NOT be hardcoded as a string literal.

---

## SEO & Metadata

### Page Metadata (layout.tsx)

The root layout MUST export static metadata via Next.js `generateMetadata` or the `metadata` export.

**Title:** `ChatBot-WA — AI-Powered WhatsApp Chatbot Framework`

**Description:** `Build, deploy, and scale WhatsApp chatbots with AI. Open-source, TypeScript-first, and ready for production.`

**Open Graph:**

| Property         | Value               |
| ---------------- | ------------------- |
| `og:type`        | `website`           |
| `og:title`       | Same as page title  |
| `og:description` | Same as description |
| `og:image`       | `/og-image.jpg`     |
| `og:url`         | Canonical URL       |
| `og:site_name`   | `ChatBot-WA`        |

**Twitter Card:**

| Property              | Value                 |
| --------------------- | --------------------- |
| `twitter:card`        | `summary_large_image` |
| `twitter:title`       | Same as page title    |
| `twitter:description` | Same as description   |
| `twitter:image`       | `/og-image.jpg`       |

**JSON-LD (Organization schema):**

```json
{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChatBot-WA",
    "description": "AI-Powered WhatsApp Chatbot Framework",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "TypeScript",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
}
```

#### Scenario: Metadata presence

- GIVEN `curl -s https://chatbot-wa.vercel.app | grep '<title>'` runs against the deployed site
- WHEN the response is parsed
- THEN the `<title>` tag MUST contain "ChatBot-WA"
- AND the `<meta name="description">` MUST contain between 120 and 160 characters.

#### Scenario: Open Graph preview

- GIVEN a social platform scrapes the URL (Facebook Debugger / LinkedIn Post Inspector)
- WHEN it fetches the page
- THEN the preview MUST show the correct title, description, and `og-image.jpg`.

### sitemap.ts

The file MUST export a default async function returning an array of `MetadataRoute.Sitemap` objects.

**Entries:**

| URL                              | Change frequency | Priority |
| -------------------------------- | ---------------- | -------- |
| `https://chatbot-wa.vercel.app/` | `weekly`         | `1.0`    |

**Acceptance:**

1. `app/sitemap.ts` MUST export a default async function.
2. The function MUST return an array with at least the root URL.
3. The sitemap MUST be valid XML and served at `/sitemap.xml`.

#### Scenario: Sitemap validity

- GIVEN `curl -s https://chatbot-wa.vercel.app/sitemap.xml` runs
- WHEN the XML is validated
- THEN it MUST be well-formed
- AND it MUST contain exactly one `<loc>` element with the root URL.

### robots.ts

The file MUST export a default `MetadataRoute.Robots` object.

**Rules:**

- `UserAgent: *`
- `Allow: /`
- `Sitemap: https://chatbot-wa.vercel.app/sitemap.xml`

**Acceptance:**

1. `app/robots.ts` MUST export a default object.
2. The robots.txt MUST be served at `/robots.txt`.
3. The `Sitemap` directive MUST point to the absolute URL of the sitemap.

---

## UI Primitives

### Button

**Variants:** `default` (primary), `secondary` (surface), `outline` (border), `ghost` (transparent), `destructive` (danger).

**Sizes:** `sm` (`h-8 px-3 text-sm`), `default` (`h-10 px-4 text-base`), `lg` (`h-12 px-6 text-lg`).

**Acceptance:**

1. `button.tsx` MUST accept `variant` and `size` props with the exact enum values above.
2. The `default` variant MUST map to `bg-primary text-primary-foreground hover:bg-primary/90`.
3. Buttons MUST render as `<button>` elements (not `<div>` or `<a>`).
4. `aria-disabled="true"` MUST be set when `disabled={true}` to avoid screen readers skipping the element.

#### Scenario: Button disabled state

- GIVEN a button receives `disabled={true}`
- WHEN it renders
- THEN it MUST render `aria-disabled="true"`
- AND MUST NOT be focusable via Tab.

### Container

**Acceptance:**

1. `container.tsx` MUST render a `<div>` with `class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"`.
2. The Container MUST accept an optional `as` prop for semantic HTML elements (default: `div`).
3. The Container MUST be a Server Component (no client state).

### Card

**Acceptance:**

1. `card.tsx` MUST render with `bg-surface border border-border rounded-xl p-6`.
2. Card MUST support optional `title` (renders as `<h3>`), `description` (renders as `<p>`), and `footer` (renders in a bordered top section).
3. Card MUST be a Server Component.

### Badge

**Variants:** `default` (primary tint), `success` (green tint), `secondary` (surface-muted).

**Acceptance:**

1. `badge.tsx` MUST render as `<span>` with `rounded-full px-2.5 py-0.5 text-xs font-medium`.
2. Badge MUST be used for feature highlights and plan labels (e.g. "Most Popular").
3. Badge MUST be a Server Component.

---

## Tests

Tests are organized into three tiers: unit/component (Vitest + React Testing Library), SEO integration, and end-to-end (Playwright).

### Unit & Component Tests (Vitest)

Each section component MUST have a corresponding test file under `tests/components/`.

| Test file           | What it covers                                                                |
| ------------------- | ----------------------------------------------------------------------------- |
| `hero.test.tsx`     | Renders `<h1>`, two CTA buttons, no client logic, all content visible         |
| `features.test.tsx` | Grid renders correct column count per breakpoint, 3–6 cards, icons decorative |
| `pricing.test.tsx`  | Exactly 3 plan cards, Pro card has `ring-2` class, features in `<ul>`         |
| `cta.test.tsx`      | Background is primary, `<h2>` present, CTA button present                     |
| `header.test.tsx`   | Brand link present, nav anchors present, `scrollY ≥ 40` triggers class change |
| `footer.test.tsx`   | `<footer>` element, copyright with current year, all links have valid `href`  |

**Acceptance:**

1. Each test MUST use `@testing-library/react` `render()` to mount the component.
2. Each test MUST use `screen.getByRole(...)` or `screen.getAllByRole(...)` for assertions (no `container.querySelector()`).
3. All tests MUST pass with `vitest run`.
4. Coverage MUST be ≥ 80% on components under `components/sections/`.

#### Scenario: Hero h1 requirement

- GIVEN `vitest run` executes `hero.test.tsx`
- WHEN the test passes
- THEN the Hero MUST have been verified to contain exactly one `<h1>` element
- AND the `<h1>` text MUST be non-empty.

### SEO Integration Tests (`tests/seo/metadata.test.ts`)

**Acceptance:**

1. `metadata.test.ts` MUST validate that `generateMetadata()` exports are present in `app/layout.tsx`.
2. It MUST assert that the description meta tag length is between 120 and 160 characters.
3. It MUST assert that `og:title`, `og:description`, `og:image`, `og:url` are all present in the HTML.
4. It MUST assert that the JSON-LD `<script type="application/ld+json">` is present and valid JSON.
5. `sitemap.ts` output MUST be a non-empty array with a root URL entry.
6. `robots.ts` output MUST contain a `Sitemap` entry pointing to the absolute sitemap URL.

### End-to-End Tests (Playwright, `tests/e2e/landing.spec.ts`)

**Acceptance:**

1. `landing.spec.ts` MUST run on Chromium, Firefox, and WebKit.
2. The spec MUST visit `/` and assert:
    - `<title>` contains "ChatBot-WA".
    - `<h1>` exists and is unique on the page.
    - All navigation anchor links (`a[href^="#"]`) navigate to their respective section IDs.
    - No console errors (Error level) appear on page load.
3. The spec MUST assert `page` renders correctly at `320px` wide (mobile) without horizontal overflow.
4. The spec MUST assert keyboard navigation order is logical (Header → Hero CTAs → Features → Pricing → CTA → Footer).
5. The spec MUST pass on Vercel preview deployments (URL injected via environment variable).

#### Scenario: Mobile viewport

- GIVEN Playwright opens `http://localhost:3000` at `320px` width
- WHEN the page loads
- THEN `page.viewportSize().width` MUST equal `320`
- AND `page.evaluate(() => document.documentElement.scrollWidth)` MUST NOT exceed `320`.

#### Scenario: No console errors

- GIVEN Playwright captures `console` events
- WHEN `page.goto()` resolves on `/`
- THEN no `console` event with `type === 'error'` MUST have been emitted
- AND the page MUST have a `200` HTTP status.

---

## Requirements Summary

| ID            | Requirement                                                                                          | Component       | Priority |
| ------------- | ---------------------------------------------------------------------------------------------------- | --------------- | -------- |
| REQ-DESIGN-01 | All visual values MUST come from Tailwind design tokens; no raw hex/literal colors in component code | All             | MUST     |
| REQ-DESIGN-02 | Typography MUST use system font stack; no external web-font requests                                 | All             | MUST     |
| REQ-DESIGN-03 | All interactive elements MUST respect `prefers-reduced-motion`                                       | All             | MUST     |
| REQ-COMP-01   | All sections MUST be Server Components unless interactivity is required                              | All sections    | MUST     |
| REQ-COMP-02   | Every section MUST render a semantic heading (`<h2>`) as its title                                   | All sections    | MUST     |
| REQ-COMP-03   | The document MUST have exactly one `<h1>` sourced from the Hero                                      | Hero            | MUST     |
| REQ-SEO-01    | Page title and description MUST be present via Next.js Metadata API                                  | layout.tsx      | MUST     |
| REQ-SEO-02    | Open Graph and Twitter Card tags MUST be present in `<head>`                                         | layout.tsx      | MUST     |
| REQ-SEO-03    | JSON-LD Organization/SoftwareApplication schema MUST be present                                      | layout.tsx      | MUST     |
| REQ-SEO-04    | `/sitemap.xml` MUST be valid and served                                                              | sitemap.ts      | MUST     |
| REQ-SEO-05    | `/robots.txt` MUST be valid and served                                                               | robots.ts       | MUST     |
| REQ-A11Y-01   | All images and icons MUST be decorative or have alt/aria-label                                       | All             | MUST     |
| REQ-A11Y-02   | All interactive elements MUST have visible focus indicators                                          | All             | MUST     |
| REQ-A11Y-03   | Color contrast ratio MUST be ≥ 4.5:1 for normal text, ≥ 3:1 for large text                           | All             | MUST     |
| REQ-TEST-01   | All component tests MUST pass with ≥ 80% coverage on section components                              | Vitest          | MUST     |
| REQ-TEST-02   | SEO integration tests MUST validate all metadata and structured data                                 | Vitest          | MUST     |
| REQ-TEST-03   | Playwright e2e tests MUST pass on Chromium, Firefox, and WebKit                                      | Playwright      | MUST     |
| REQ-PERF-01   | LCP MUST be < 2.5s on a simulated 4G connection                                                      | Vercel          | SHOULD   |
| REQ-PERF-02   | CLS MUST be < 0.1 with zero font-swap layout shift                                                   | Vercel          | MUST     |
| REQ-PERF-03   | No JavaScript bundle errors on production build                                                      | Vercel          | MUST     |
| REQ-DEPLOY-01 | Vercel build MUST succeed with zero warnings                                                         | Vercel          | MUST     |
| REQ-FILE-01   | Landing package MUST be isolated; no imports from sibling packages                                   | File layout     | MUST     |
| REQ-FILE-02   | No arbitrary Tailwind breakpoint classes (e.g. `min-[Xpx]:`)                                         | tailwind.config | MUST     |

---

## Out of Scope (v1)

- Blog or CMS integration
- Internationalization (i18n)
- A/B testing or analytics beyond Vercel built-in
- Dark mode toggle
- Multi-page navigation
- Real screenshot/media assets in the Hero

---

**Change:** `landing-page-vercel`  
**Spec artifact:** `openspec/changes/landing-page-vercel/specs/landing/spec.md`  
**Proposal:** `openspec/changes/landing-page-vercel/proposal.md`
