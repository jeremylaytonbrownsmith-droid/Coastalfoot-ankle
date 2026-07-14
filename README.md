# Coastal Foot & Ankle Center — practice website

A production-ready podiatry practice website built with Next.js (App
Router), Tailwind CSS, and TypeScript. Designed for patients over 60:
large type (18px base), high contrast, big tap targets, shallow navigation,
and multiple equal ways to reach the office — call, email, or request a
callback (the practice phone is answered during office hours; Halo, an
AI receptionist, is a planned future integration, not live today).

**Everything brand-specific is config-driven.** One file —
`configs/coastal-foot-ankle.config.ts` — controls the practice name, logo,
color palette, doctors, services, testimonials, products, and contact
details. Cloning this site for a second practice is a config swap; see
[CLONE.md](./CLONE.md).

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project layout

```
configs/            One config file per practice (all branding & content)
lib/site-config.ts  Config types + loader (SITE_CONFIG env var selects a config)
app/                Pages — all read from the active config
components/         Shared, brand-agnostic UI
public/logo/        Logo (placeholder SVG until the real vector arrives)
public/team/        Headshots (missing files fall back to initials avatars)
public/store/       Product photos (missing files fall back to a graphic)
```

## Before launch — placeholders to replace

Search `configs/coastal-foot-ankle.config.ts` for `[` to find remaining
placeholders. The big ones:

- Real phone number, email, and production domain
- Real headshot at `public/team/lauren-thornberry.jpg` (and other team photos)
- Real vector logo at `public/logo/logo.svg`
- Red light therapy / bed pricing (or set `pricing: null` to hide)
- Google review link and real testimonials (with patient permission)
- Callback form email delivery: set `RESEND_API_KEY` and
  `STAFF_NOTIFICATION_EMAIL` (see `.env.example`)
- Privacy policy review by the practice's compliance advisor

## Hosting

Connect the repo to Vercel (or Netlify), set any env vars from
`.env.example`, and every push gets a live preview URL to share with the
practice.
