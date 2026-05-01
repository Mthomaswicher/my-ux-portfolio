# MTW.ARCADE

Personal portfolio for Matthew Thomas-Wicher. Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Supabase.

## Run it

```bash
npm install
npm run dev
# http://localhost:3000
```

## Routes

| Path | What it is |
|------|------------|
| `/` | Boot screen — `[ ENTER ]` to sign the guestbook, `[ SKIP ]` to go straight to work |
| `/home` | Cartridge grid (the work) |
| `/about` | Player profile — bio, stats, communities, faves |
| `/lab` | B-sides / experiments (placeholder) |
| `/sign` | Sign the guestbook — name, tag, color, canvas signature |
| `/guestbook` | High score wall — every visitor's signed card |
| `/work/[slug]` | Case studies — `idp-release-plugin`, `oportun-homepage-widgets` |

## Easter eggs

- Pixel pet that wanders along the bottom edge
- Konami code (↑↑↓↓←→←→BA) — cycles the accent color, drops a "+1UP" toast
- Blinking terminal cursor on display headings
- Cursor trail (desktop only, respects `prefers-reduced-motion`)
- CRT scanlines, vignette, and slow vertical sweep across every page

## Guestbook persistence

Until Supabase is wired up, the guestbook falls back to `localStorage` so the flow works end-to-end on `localhost`.

To make it real:

1. Create a Supabase project at https://supabase.com.
2. Open the SQL editor, paste `supabase/schema.sql`, and run it.
3. Copy `.env.local.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. Restart `npm run dev`.

The browser talks to Supabase directly (anon key + RLS). Insert policy enforces length limits at the DB level. To enable Supabase on the deployed site, add the same two `NEXT_PUBLIC_*` values as repository secrets named `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Settings → Secrets and variables → Actions).

## Deploy (GitHub Pages)

This site is a static Next.js export, published to GitHub Pages.

1. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds `out/` and deploys.
2. In repo Settings → Pages, set Source to **GitHub Actions**.
3. Site is served at `https://mthomaswicher.github.io/my-ux-portfolio/`.

`NEXT_PUBLIC_BASE_PATH=/my-ux-portfolio` is hardcoded in the workflow so all asset URLs are correctly prefixed. To deploy under a different repo name or a custom domain, change that env (or remove it for a custom domain).

## Adding work

- New project card: edit `lib/projects.ts`.
- New case study (gets a `/work/<slug>` page): add an entry to `lib/caseStudies.ts`.
- Drop screenshots into `public/images/case-studies/<slug>/` and reference them from the case study sections (you'll need to extend the section schema if you want inline images — easy when you're ready).

## Updating the changelog

Edit `lib/log.ts`. The most recent entry shows in the sidebar's "LATEST LOG" block.

## Stack notes

- **Next 14.2.33** — pinned at the patched line. Next 15 is the future-proof move when you want to do that bump.
- **Tailwind** — design tokens live in `tailwind.config.ts` (palette, keyframes, shadows).
- **CRT effects** — pure CSS in `app/globals.css` (`crt-noise`, `crt-vignette`, `crt-scanlines`, `crt-sweep`). All four mounted in `components/CrtOverlays.tsx`.
- **Fonts** — VT323 (display), Press Start 2P (pixel), JetBrains Mono (body). All from Google Fonts via `next/font`.

## TODO when you're ready

- Real case-study screenshots (slots reserved in `public/images/case-studies/<slug>/`)
- About page faves — the four placeholder cards in `app/about/page.tsx` are guesses; replace with the real ones
- Headshot — currently using `public/headshot.jpg` from the LinkedIn export
- OG image at `public/og.png` — referenced in `app/layout.tsx` metadata once you make one
- Domain — point your DNS at Vercel, set `metadataBase` in `app/layout.tsx`

Built in D.C., late at night, with too much coffee.
