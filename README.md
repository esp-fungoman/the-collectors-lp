# The Collectors LP

Landing page for **The Collectors** (Next.js App Router + TypeScript + Tailwind + Yarn).

## Setup

```bash
yarn install --ignore-engines   # or rely on .yarnrc ignore-engines
cp .env.example .env.local
# fill Google service account + Sheet id
yarn dev
```

### Fonts

- **Montserrat** — loaded via `next/font/google`
- **SVN-Radiant Slender** — place `SVN-RadiantSlender.woff2` in `public/fonts/` (see `src/fonts/README.md`)

### Google Sheets leads

1. Create a Google Cloud service account and download the JSON key.
2. Share your Sheet with the service account email as **Editor**.
3. Set env vars from `.env.example` (columns: `timestamp | name | email | phone | message`).

## Scripts

- `yarn dev` — local server
- `yarn build` / `yarn start` — production
- `yarn lint` — ESLint
