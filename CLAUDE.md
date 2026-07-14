# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # local dev server, http://localhost:3000
npm run build    # production build (Turbopack)
npm run start    # serve a production build
npm run lint     # eslint (eslint-config-next core-web-vitals + typescript)
```

There is no test suite/command in this repo.

Build/dev against a specific practice config with the `SITE_CONFIG` env var (defaults to `coastal-foot-ankle`):

```bash
SITE_CONFIG=coastal-foot-ankle npm run dev
```

## Architecture

**This is a multi-tenant template, not a single-practice site.** Every brand-specific value — name, colors, logo, copy, doctors, services, pricing, contact info — lives in one file per practice under `configs/*.config.ts`, typed by the `SiteConfig` interface in `lib/site-config.ts`. Components and pages never hardcode anything practice-specific; they always read from `getSiteConfig()`, which picks a config out of a `registry` object keyed by `SITE_CONFIG`. Adding a second practice is a new config file + one registry entry — no component/page changes (see `CLONE.md` for the full walkthrough).

When editing content, **edit the config file, not the component**. If a change seems to require touching a component to special-case one practice's content, that's a sign it should be a new config field instead.

### Theming

Brand colors are not in `globals.css`. `app/layout.tsx` reads `config.colors` and injects them as `--site-*` CSS custom properties on `<html>` via an inline `<style>` tag; `globals.css`'s `@theme inline` block maps Tailwind utilities (`bg-primary`, `text-muted`, etc.) to those variables. Changing a brand's palette is a config edit, never a CSS edit. Fonts follow the same split: `next/font` self-hosts Playfair Display (headings) and Inter (body) in `layout.tsx`, exposed as `--font-heading`/`--font-body`.

### Routing (App Router)

Most routes are static (`○`); `/services/[slug]` is SSG via `generateStaticParams` off `config.featuredServicePages`; `/request-appointment` and `/api/callback` are dynamic. `/request-appointment` reads `product` from `searchParams` (an async prop in this Next version) to reframe its heading/copy/form when arrived at from a store product's "Ask About This" link, rather than being a separate page.

### Scroll reset

`components/GlobalScrollReset.tsx` is mounted once in the root layout and force-scrolls to `(0,0)` on every pathname change — Next's built-in scroll-to-top on navigation isn't reliable on every real device (notably iOS Safari). `components/ScrollToTop.tsx` is a second, narrower version used only on `/request-appointment`, keyed on the `product` query param, because that page's navigations are often same-pathname/search-params-only, which the pathname-based global reset doesn't catch.

### Content/asset fallbacks

Team and product photos degrade gracefully when a file is missing: `TeamPhoto` falls back to an initials avatar, `ProductCard` falls back to the practice logo — driven by an `onError` handler plus a post-mount `naturalWidth === 0` check (for images that fail before hydration). This means placeholder configs can ship before real photos exist.

`ServiceIcon` maps a string key (from config service/nav data) to a `lucide-react` icon component, so config data never imports React components directly.

### Callback form flow

`CallbackForm` posts to `app/api/callback/route.ts`, which emails via Resend's REST API if `RESEND_API_KEY`/`STAFF_NOTIFICATION_EMAIL`/`NOTIFICATION_FROM_EMAIL` are set (see `.env.example`); without them, submissions are just logged server-side so the form still works in development. The route has an unused `HALO_INTAKE_WEBHOOK_URL` hook reserved for forwarding Halo-handled calls into the same queue once that integration exists.

### Halo is an external product, not built here

"Halo" (referenced in `config.aiReceptionist`) is Halo Health's AI phone receptionist — a real third-party product the practice would separately sign up for, not something implemented in this codebase. Nothing in this repo currently calls out to it; the site only describes it in copy (blurb + FAQ). Don't build a phone/telephony integration here — the `HALO_INTAKE_WEBHOOK_URL` env var is the intended future integration point once the practice has a real webhook URL from Halo Health to forward callback-form-shaped data to. Copy referencing Halo (and any "answered anytime" type claims generally) must match the practice's actual current phone coverage — this repo's history has had to walk back several instances of copy overpromising 24/7 phone availability that wasn't real.

### Accessibility constraints (apply to all new UI)

Audience is patients 60+: 18px base font (`html { font-size: 112.5% }` in `globals.css`), 48–52px minimum tap targets, no hamburger nav on desktop (full nav always visible, `lg:flex`/`lg:hidden` split in `Header.tsx`), large visible focus rings, `prefers-reduced-motion`-safe scroll-reveal (`Reveal.tsx` + a `<noscript>` fallback in the root layout that disables it entirely without JS).

### Content-editing guardrails

- `contact.address` in a config stays `null` until the real practice confirms it can be published — setting it turns on the full address block, map pin, and JSON-LD address across the site, so don't fill it in speculatively.
- Don't source or generate photorealistic photos of real or fictional people for staff/testimonials.
- `reviewUrl`/testimonials should stay clearly placeholder (or absent) until real ones exist — a fake review link or count reads as fabricated.
