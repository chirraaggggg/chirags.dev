# chiragsharma.dev

Minimal, type-led portfolio for Chirag Sharma — solo founder, full-stack + AI.
A 620px column of Inter 14/21 on near-white paper, a sticky breadcrumb header,
plain entry lists and a floating pill dock. The design is deliberately quiet:
no hero art, no cards, no dark mode on these pages.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Intro, featured works, experience, contact |
| `/about` | Intro, experience, skills & tools, "How I approach" accordions |
| `/play` | Interactive experiments in a list, each opens a demo dialog |
| `/projects` | Legacy project binder, no longer linked from the nav |

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4; the portfolio layout lives in `src/styles/minimal.css`,
  scoped under `.mp` so the legacy retro pages keep their own styles
- `lucide-react` for the skill and entry icons
- Motion (`motion/react`) for the play demos and dialog transitions
- Resend HTTP API for the (currently unlinked) contact action

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:1408
pnpm check-types
pnpm build
```

## Editing content

Everything the site renders lives in data/config files — no JSX changes needed.

| What | Where |
| --- | --- |
| Intro copy, experience, skills, approach steps, name/handles | `src/config/folio.ts` |
| Featured works, taglines, links | `src/data/projects.ts` |
| Play page experiments | `src/data/experiments.ts` |
| Route metadata, canonical URLs | each page's `metadata` export, `src/config/site.ts` |
| Design tokens and layout | `src/styles/minimal.css` |

Shared pieces live in `src/components/minimal/`: `page-shell`, `site-header`
(sticky breadcrumb), `navigation-dock`, `experience-list`, `skills`,
`approach` and `socials`.

The header avatar reads `FOLIO.avatar` (default `/avatar.jpg`). Drop a square
portrait at `public/avatar.jpg`; if the file is missing the tile falls back to
the monogram glyph.

## Things worth knowing

- The new pages are light-only by design; the old folio theme toggle, command
  palette, pond/pixel-garden hero and contact postcard are still in the repo
  (`src/components/ui/folio/*`, `src/components/sections/*`) but are no longer
  rendered.
- `src/app/actions/contact.ts` still posts to Resend via `fetch` if you wire a
  form back up: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Sticky headers and accordions degrade to plain native behaviour under
  `prefers-reduced-motion`.
- Deploy to Vercel as-is. The OG image is generated at `/opengraph-image`.

Built by me and Claude Code.
