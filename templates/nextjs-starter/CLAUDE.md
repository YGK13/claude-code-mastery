# CLAUDE.md - Next.js Starter

## Project Overview
[Describe this app - what it does, who uses it, what problem it solves]

## Tech Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- Drizzle ORM + Neon PostgreSQL
- Clerk (authentication)
- Vercel (deployment)

## Project Structure
- /app - App Router pages and layouts
- /app/api - API routes (server-side only)
- /app/(auth) - Auth pages (sign-in, sign-up)
- /app/dashboard - Protected dashboard routes
- /components - Shared React components
- /components/ui - shadcn/ui base components (do not modify directly)
- /lib - Server-side utilities
- /lib/db.ts - Drizzle database client
- /lib/schema.ts - Database schema definitions
- /hooks - Custom React hooks (client-side)
- /types - TypeScript type definitions

## Coding Conventions
- Server Components by default; add 'use client' only when needed
- No TypeScript `any` - use proper types or `unknown`
- All database queries through /lib/db.ts - never in components
- API routes validate input with Zod before touching the database
- Error boundaries on all route-level layouts
- Loading.tsx files for all routes that fetch data

## Definition of Done
- [ ] Feature works end-to-end in browser
- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes
- [ ] Loading state implemented
- [ ] Error state implemented
- [ ] Mobile layout works at 375px

## Allowed Commands
- npm run dev
- npm run build
- npm run lint
- git status, git diff, git log

## Commands Requiring Confirmation
- git commit, git push
- npm install (any package)
- npx drizzle-kit push (touches database)
- vercel --prod (production deploy)
