---
# generated from modules/02-building-web-apps/nextjs-apps.md by site/scripts/sync-content.mjs
title: "Next.js Apps"
description: "Next.js is the standard for building production web apps with Claude Code."
---

Next.js is the standard for building production web apps with Claude Code. It gives you server-side rendering, API routes, file-based routing, TypeScript, Tailwind CSS and a one-command deploy to Vercel.

---

## Scaffolding a New Next.js App

The fastest way to start:

```bash
# Create the project
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app

# Add a CLAUDE.md
claude
> Create a CLAUDE.md for this project. It uses Next.js 15 App Router, TypeScript, 
  Tailwind CSS. The /app directory has pages, /components has shared components,
  /lib has utilities. Add permissions: allow npm run dev and npm run build without 
  asking. Require confirmation for git commit, git push and npm install.
```

Now you have a configured project and a working CLAUDE.md in under 3 minutes.

---

## The App Router Structure

Claude Code understands Next.js App Router conventions. Use them in your prompts:

```
app/
├── page.tsx              # Root route: /
├── layout.tsx            # Root layout (wraps everything)
├── dashboard/
│   ├── page.tsx          # /dashboard
│   └── layout.tsx        # Layout for /dashboard and children
├── dashboard/users/
│   └── page.tsx          # /dashboard/users
└── api/
    └── users/
        └── route.ts      # API route: GET/POST /api/users
```

In your prompts, reference these paths directly:
```
> Add a /dashboard/analytics page that shows monthly revenue as a line chart
> Add a POST /api/contacts route that saves a contact to the database
```

---

## Adding a Database

The fastest path is Neon (serverless PostgreSQL) + Drizzle ORM:

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

Then prompt Claude Code:
```
> Add a Neon PostgreSQL database to this project using Drizzle ORM.
  Create /lib/db.ts for the database client and /lib/schema.ts for the schema.
  The database needs a 'contacts' table with: id (uuid primary key), 
  name (text, not null), email (text, unique, not null), 
  created_at (timestamp, default now).
  Add a /api/contacts route that handles GET (list all contacts) and 
  POST (create a contact). Validate input with Zod before writing to the DB.
  Store the DATABASE_URL in .env.local.
```

Claude Code will create every file, set up the schema and wire up the API route.

---

## Adding Authentication

The fastest path is Clerk (handles sign-in, sign-up, user management):

```
> Add Clerk authentication to this app.
  - Protect all /dashboard/* routes — redirect to /sign-in if not authenticated
  - Add sign-in and sign-up pages at /sign-in and /sign-up using Clerk's prebuilt components
  - Show the user's name in the navbar with a sign-out button
  - Add the NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to .env.local
```

Claude Code will install the `@clerk/nextjs` package, add the middleware, create the auth pages and update the layout.

---

## Deploying to Vercel

```bash
# Install Vercel CLI if you don't have it
npm install -g vercel

# Deploy from your project folder
vercel

# Or deploy to production
vercel --prod
```

Or prompt Claude Code:
```
> Deploy this app to Vercel. Walk me through every step including setting up
  environment variables in the Vercel dashboard and connecting the GitHub repo.
```

---

## The Pattern for Full-Stack Features

For any feature that needs a UI and a backend:

**Step 1:** Define the data
```
> Add a schema for a 'projects' table: id, name, description, status 
  (active/archived), created_at, user_id (foreign key to users)
```

**Step 2:** Create the API
```
> Add CRUD API routes for projects at /api/projects:
  GET /api/projects — list all projects for the current user
  POST /api/projects — create a new project
  PATCH /api/projects/[id] — update a project
  DELETE /api/projects/[id] — delete a project
  All routes require authentication (Clerk). Validate with Zod.
```

**Step 3:** Build the UI
```
> Create a /dashboard/projects page that:
  - Shows all projects in a card grid
  - Has a "New Project" button that opens a modal with a form
  - Each card shows name, description, status badge and a menu (Edit, Archive, Delete)
  - Loading state: show skeleton cards while fetching
  - Empty state: show a friendly "No projects yet" message with a create button
```

Breaking it into three prompts (data, API, UI) produces cleaner, more reliable code than one massive prompt.

---

## Common Next.js + Claude Code Mistakes

**Mistake:** Asking for client-side data fetching when server components would be better
```
# Bad — fetches client-side unnecessarily
> Add a dashboard page that fetches user data

# Better — tells Claude where to fetch
> Add a /dashboard page as a Server Component that fetches user data 
  directly from the database (no API round-trip needed)
```

**Mistake:** Not specifying TypeScript types
```
# Bad
> Add a ContactCard component that shows name and email

# Better
> Add a ContactCard component with this TypeScript interface:
  interface Contact { id: string; name: string; email: string; role?: string; }
  Show name, email and role (if present). Props: contact: Contact, onEdit, onDelete
```

**Mistake:** Forgetting error and loading states
```
# Always add this to UI prompts:
> Handle loading state (show a skeleton), error state (show an error message
  with a retry button) and empty state (show a friendly empty message).
```

---

## Exercise

Build this complete app with Claude Code prompts:

1. Scaffold a new Next.js app
2. Add a Neon database with a `bookmarks` table (id, url, title, description, tags, created_at)
3. Build a `/bookmarks` page that lists bookmarks as cards with search filtering
4. Add a `/api/bookmarks` route for GET and POST
5. Add a form to submit new bookmarks
6. Deploy to Vercel

Write one prompt per step. The entire app should take 15–20 minutes end-to-end.

---

Next: [React Patterns](./react-patterns.md)
