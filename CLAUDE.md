# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript rules)
npm run start    # serve production build
```

No test runner is configured.

## Stack

- **Next.js 16** (App Router) — this is a newer version; read `node_modules/next/dist/docs/` before writing any Next-specific code
- **React 19**
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, not via `tailwind.config`; v4 has breaking changes from v3
- **Framer Motion 12** — used for all animations; nearly every component is `"use client"`
- **Lucide React** — icon library
- **TypeScript strict mode** — `@/*` maps to `src/*`

## Architecture

### Routing & pages

| Route | File | Content component |
|---|---|---|
| `/` | `src/app/page.tsx` | Assembles homepage sections in order |
| `/products` | `src/app/products/page.tsx` | `ProductCatalog` |
| `/about` | `src/app/about/page.tsx` | `AboutContent` |

Every page follows the same shell: `<Navbar /> + <ContentComponent /> + <Footer />`. Page-level `metadata` exports live in the route file; the content lives entirely in the corresponding component.

### Homepage sections

`src/app/page.tsx` stacks these in order:
1. `HeroSection` — headline, infrastructure topology SVG visual, status overlay cards
2. `WhySection` — 6-pillar feature grid (id="solutions")
3. `TrustSection` — stats, certifications, industries (id="about")
4. `DemoSection` — contact/demo request form (id="demo") — **submission is simulated with a 1.2s fake delay; there is no backend**

### Adding a product page

Products are driven by the `products` array in `src/components/products/ProductCatalog.tsx`. Each entry has a `hasPage: boolean` flag:

- `hasPage: false` → "Visit Product" button renders as a disabled "Coming Soon" label
- `hasPage: true` → button links to `/products/<slug>`

**To add a new product:**
1. Add an entry to the `products` array with `hasPage: false`
2. Create the route at `src/app/products/<slug>/page.tsx` (use the same `<Navbar /> + content + <Footer />` shell)
3. Flip `hasPage: true` in the array entry

Do not create the route file and leave `hasPage: false`, and do not set `hasPage: true` before the route file exists.

### Navigation

`Navbar` (always `"use client"`) handles two scroll behaviors:
- Links prefixed `/#` (e.g., `/#demo`, `/#solutions`) smooth-scroll when already on `/`; on other pages they navigate home and let the browser anchor-jump
- Regular path links use Next.js `Link` with active-state detection via `usePathname`

### Design system

Global CSS variables are defined in `src/app/globals.css`:

```
--bg: #0c0c0c        background
--surface: #111111   card backgrounds
--accent: #5b8def    blue accent
--text-1: #f0f0f0    primary text
--text-2: #8a8a8a    secondary text
--text-3: #505050    tertiary/muted text
```

Utility classes defined in `globals.css` (not Tailwind plugins — use the class names directly):
- `.dot-grid` — radial dot background pattern
- `.line-grid` — subtle line grid
- `.marquee-fade` — fade mask for scroll marquees
- `.noise` — pseudo-element noise texture overlay
- `.status-pulse` — pulsing opacity animation for live status indicators
- `.marquee-track` — scrolling marquee animation (pauses on hover)

All inline color values in components use literal hex/rgba rather than CSS variables — this is the existing pattern; follow it when adding new components.
