# Portfolio

Personal portfolio for Karthik Kulkarni — backend engineer working on payment and banking systems.

Live: https://kartik1502.github.io/portfolio/

## Stack

Next.js 16 (App Router, static export), TypeScript, Tailwind CSS, shadcn/ui.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
BASE_PATH=/portfolio NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

The static export is written to `out/`.

## Content

- `src/lib/portfolio-data.ts` — profile, projects, experience, writing
- `src/components/` — page sections
- `public/` — images, resume, and the weekly WakaTime snapshot
