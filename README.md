# milapmagar.com.np

Personal site of Milap Magar — a Next.js 15 app styled like a cork board of hand-pinned cards.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build + type check
```

## Pages

| Route | What it shows | Edit |
| --- | --- | --- |
| `/` | Sidebar + the home board (5 newest projects mixed with the about cards) | `src/data/profile.ts`, `src/app/_components/HomeBoard.tsx` |
| `/projects` | Every project as a card; click a screenshot for the full-size view | `src/data/projects.ts` |
| `/blog` and `/blog/[slug]` | Post list and read-in-place articles | `src/data/posts.ts` |
| `/experience` | Timeline of roles | `src/data/experience.ts` |

Adding content is a data edit, no JSX needed:

- **Project** — append to `projects` in `src/data/projects.ts` (newest first) and drop a screenshot in
  `public/Project-Showcase/` (≥1200px wide, WebP). Anything without `comingSoon: true` counts towards
  the "shipped" stamp. The first five entries appear on the home board.
- **Post** — append to `posts` in `src/data/posts.ts`; `body` is one string per paragraph. The route,
  sitemap entry and `BlogPosting` structured data are generated from it.
- **Experience** — append to `experience` in `src/data/experience.ts`; dates are `YYYY-MM`, leave `to`
  out for the current role.

## SEO

- Site-wide metadata (title template, Open Graph, Twitter card, robots, icons, manifest) lives in
  `src/app/layout.tsx`; the canonical origin is `SITE_URL` in `src/lib/site.ts`
  (override with `NEXT_PUBLIC_SITE_URL`).
- `src/app/sitemap.ts`, `robots.ts` and `manifest.ts` serve `/sitemap.xml`, `/robots.txt` and
  `/manifest.webmanifest`.
- JSON-LD: `Person` + `WebSite` on every page, plus `CollectionPage`/`ItemList` on `/projects`,
  `Blog`/`BlogPosting` on the blog and `ProfilePage` on `/experience`.
- The share image is `public/og.png` (1200×630).

## Deploy on Cloudflare

The site runs as a Cloudflare Worker (`milapmagar`) via the [OpenNext](https://opennext.js.org/cloudflare)
adapter, which keeps full Next.js behaviour: ISR, `next/image`, and the `/api/discord` route handler.

```bash
pnpm preview   # build + run the real Worker locally
pnpm deploy    # build + deploy from your machine
```

`wrangler.jsonc` is committed and is the source of truth — do not let `wrangler deploy`
regenerate it (see the Workers Builds settings below), or the `WORKER_SELF_REFERENCE`
service binding will point at a Worker name that does not exist.

### Workers Builds settings (dashboard)

| Setting | Value |
| --- | --- |
| Build command | `pnpm run build:cf` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Path / root directory | *(empty)* |

### Secrets

`/api/discord` needs `DISCORD_WEBHOOK_URL`:

- production: Worker → Settings → Variables and Secrets → add as **Secret**
- local `pnpm dev`: `.env`
- local `pnpm preview`: `.dev.vars`
