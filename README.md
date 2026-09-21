This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

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
