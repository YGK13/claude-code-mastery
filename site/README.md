# Claude Code Mastery: site

Astro 6 + Starlight docs site for the curriculum in `../modules` and `../reference`. Live at https://claude-code-mastery-self.vercel.app (Vercel project `claude-code-mastery`, output `site/dist`).

## Commands (run inside `site/`)

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run sync` | Create site pages for any lesson in `../modules` or `../reference` that has no page yet (non-destructive). Add `-- --refresh-meta` to fix auto-generated titles/descriptions, `-- --force <slug>` to regenerate one page from source. |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Runs `sync`, then builds to `dist/` |
| `npm run preview` | Preview the production build |

## Where things live

- `src/content/docs/` - pages. `index.mdx` is the landing page; `curriculum/**` and `reference/**` mirror the repo; `welcome.md`, `who-its-for.md`, `cohort.md`, `404.md` are site-only.
- `src/lib-site.ts` - single source of truth for site name, URL, author/publisher entities, the curriculum map and the FAQ (rendered on the page and as FAQPage JSON-LD).
- `src/components/` - `SiteBanner` (proof strip + mobile sticky CTA + reveal script), `SiteFooter` (newsletter, sister products, trademark line), `CurriculumMap`, `Faq`, `HomeSchema` (Course/FAQPage/Breadcrumb JSON-LD), `EmptyThemeSelect` (site is dark-only).
- `src/pages/` - build-time endpoints: `llms.txt`, `llms-full.txt`, `sitemap.xml` (with git `lastmod`).
- `src/styles/portlev-brand.css` - PortLev tokens on a locked dark canvas. Every Starlight colour variable is defined once; do not add light-theme overrides.
- `public/` - `robots.txt`, `og-image.png` (1200x630), `portlev-mark-256.png`, `favicon.png`.
- `scripts/sync-content.mjs` - the content sync described above.

## Changing the domain

Edit `SITE_URL` in `astro.config.mjs` and `SITE.url` in `src/lib-site.ts`. Nothing else hardcodes the host.
