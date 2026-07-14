# Spinning up site #2 from this codebase

This site is a template. **All** branding, content, colors, photos, and
contact details live in one config file — the components never hardcode
anything practice-specific. Launching a second practice (e.g. Dr. Dyal's)
is a config swap, not a rebuild.

## The short version

1. Copy the repo (new GitHub repo, or a new branch if you prefer one repo).
2. Copy `configs/coastal-foot-ankle.config.ts` → `configs/<new-practice>.config.ts`.
3. Edit every value in the new config (it's fully commented — work top to bottom).
4. Swap the logo and photos in `/public`.
5. Register the config and build with `SITE_CONFIG=<new-practice>`.

Done. No component or page changes needed.

## Step by step

### 1. Copy the repo

```bash
git clone <this-repo-url> <new-practice>-site
cd <new-practice>-site
npm install
```

### 2. Create the new config

```bash
cp configs/coastal-foot-ankle.config.ts configs/dyal-podiatry.config.ts
```

Open the new file and change, top to bottom:

- `key` — e.g. `"dyal-podiatry"` (used by the `SITE_CONFIG` env var)
- Practice name, short name, tagline
- **Colors** — the whole palette is 9 values. Keep the pattern:
  `primary` is the brand accent, `primaryDark`/`primaryDarker` are deepened
  versions used for buttons (aim for ≥ 7:1 contrast with white text —
  check at https://webaim.org/resources/contrastchecker/)
- Phone, email, city, service area, hours, map coordinates
- `address` — leave `null` until the practice wants it published; filling it
  in automatically enables the address block, map pin, and SEO address
- Doctors and staff (photos go in `/public/team/` — missing photos show an
  initials avatar automatically, so you can launch before headshots arrive)
- Services, featured service pages (each entry here becomes a full page at
  `/services/<slug>` with FAQ and optional pricing)
- Testimonials, Google review link, store products
- SEO block — set the new domain

Search the file for `[` to find every placeholder that still needs a real value.

### 3. Register the config

In `lib/site-config.ts`, add:

```ts
import dyalPodiatry from "@/configs/dyal-podiatry.config";

const registry: Record<string, SiteConfig> = {
  "coastal-foot-ankle": coastalFootAnkle,
  "dyal-podiatry": dyalPodiatry,
};
```

### 4. Swap the assets

| Asset | Where | Notes |
| --- | --- | --- |
| Logo | `public/logo/logo.svg` | Or any file — update `logo.src`/`width`/`height` in the config |
| Team photos | `public/team/*.jpg` | Square crops look best; filenames match the config |
| Product photos | `public/store/*.jpg` | Square crops |
| Favicon | `app/favicon.ico` | |

### 5. Build the new site

```bash
SITE_CONFIG=dyal-podiatry npm run dev    # local preview
SITE_CONFIG=dyal-podiatry npm run build  # production build
```

On Vercel/Netlify, set `SITE_CONFIG=dyal-podiatry` in the project's
environment variables. The same codebase can power both practices as two
hosting projects pointed at the same repo with different `SITE_CONFIG`
values (or two repos, if the practices want independent code).

### 6. Email for the callback form

Set in the host's environment settings (see `.env.example`):

```
RESEND_API_KEY=re_xxx
STAFF_NOTIFICATION_EMAIL=frontdesk@newpractice.com
NOTIFICATION_FROM_EMAIL=website@newpracticedomain.com
```

## What deliberately does NOT change per site

- Layout, page structure, accessibility features (18px+ type, 48px+ tap
  targets, no hamburger on desktop) — these are the template's value
- The callback form flow and its HIPAA-conscious behavior
- Digital check-in stays out of the website — it lives in Halo Health's
  product, not here
