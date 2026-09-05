---
# generated from modules/02-building-web-apps/react-patterns.md by site/scripts/sync-content.mjs
title: "React Patterns"
description: "These are the React patterns Claude Code handles best. Reference them in your prompts to get clean, maintainable component code without having to specify…"
---

These are the React patterns Claude Code handles best. Reference them in your prompts to get clean, maintainable component code without having to specify low-level implementation details.

---

## 1. Data Fetching with Server Components (Next.js)

The default for any data display page should be a Server Component:

```
> Create a /users page as an async Server Component that fetches users
  directly from the database and renders them in a table.
  No 'use client', no useState, no useEffect - just async/await in the component.
```

Claude Code will generate:
```tsx
// app/users/page.tsx
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export default async function UsersPage() {
  const allUsers = await db.select().from(users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        {allUsers.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
```

---

## 2. Client Components with Forms

For interactive forms that need state:

```
> Create a 'use client' ContactForm component with name, email and message fields.
  Validate all fields on submit (name required, valid email, message at least 10 chars).
  Show inline validation errors. On submit, POST to /api/contacts.
  Show a loading state during submission and a success message on completion.
  Reset the form after successful submit.
```

This prompt produces a fully functional form with all the right patterns.

---

## 3. Optimistic Updates

For actions that should feel instant:

```
> When the user clicks the delete button on a task, optimistically remove it
  from the UI immediately, then delete it from the server. If the server
  returns an error, add the task back to the list and show a toast notification.
```

Claude Code will implement this using `useOptimistic` (React 19) or a manual optimistic state pattern.

---

## 4. Infinite Scroll / Pagination

```
> Add pagination to the /posts page. Show 20 posts per page.
  Add "Previous" and "Next" buttons at the bottom.
  The current page number is a URL search param (?page=2) so it's shareable and
  works with the browser back button.
```

Or for infinite scroll:
```
> Add infinite scroll to the posts list. Load the next 20 posts when
  the user scrolls to within 200px of the bottom of the page.
  Show a loading spinner while fetching. Stop loading when there are no more posts.
```

---

## 5. Modal Dialogs

```
> Add a modal dialog for the "Edit Contact" action. The modal should:
  - Open when the user clicks "Edit" on any contact card
  - Show a form pre-populated with the contact's current data
  - Trap focus inside the modal when open
  - Close when the user clicks outside it or presses Escape
  - Use the native HTML <dialog> element (no third-party library needed)
```

---

## 6. Search and Filtering

```
> Add real-time client-side search to the contacts list.
  As the user types in the search box, filter the displayed contacts by
  name or email (case-insensitive). Show a count of matching results.
  Keep the search term in the URL (?q=searchterm) so the filtered view is shareable.
```

---

## 7. Toast Notifications

```
> Add toast notifications for user actions: success on save, error on failure,
  warning when deleting. Toasts appear in the top-right corner, auto-dismiss
  after 3 seconds and can be manually dismissed. Use Sonner (npm install sonner)
  which is the standard for Next.js Tailwind projects.
```

---

## 8. Loading Skeletons

```
> While the contacts data is loading, show 6 skeleton cards that match
  the shape of a real contact card (placeholder for name, email and avatar).
  Use the Tailwind animate-pulse class for the skeleton shimmer effect.
```

---

## 9. Empty States

Always include empty state handling:

```
> If there are no contacts, show an empty state with:
  - An icon (use a Lucide icon - import ContactIcon from 'lucide-react')
  - Headline: "No contacts yet"
  - Subtext: "Add your first contact to get started"
  - A primary button that opens the Add Contact modal
```

---

## 10. Responsive Layout

```
> The layout should be:
  - Desktop (>1024px): 3-column card grid
  - Tablet (768px–1024px): 2-column grid
  - Mobile (<768px): single column, full-width cards
  Use Tailwind responsive prefixes (sm:, md:, lg:) - no custom media queries.
```

---

## Prompt Shorthand: The Component Spec

For any component, this spec format produces clean results:

```
> Create a [ComponentName] component with:
  Props: { field1: Type1; field2: Type2; onAction: () => void }
  State: [describe any internal state]
  Behavior: [describe interactions]
  Design: [describe visual appearance]
  Edge cases: [empty state, loading state, error state]
```

Example:
```
> Create a TaskCard component with:
  Props: { task: { id: string; title: string; status: 'todo' | 'done'; dueDate?: Date }; onToggle: (id: string) => void; onDelete: (id: string) => void }
  State: none (fully controlled)
  Behavior: clicking the checkbox calls onToggle, clicking Delete calls onDelete with a window.confirm
  Design: white card, subtle shadow, title in medium weight, due date in small gray text, strikethrough title when status is 'done'
  Edge cases: show 'Overdue' badge in red if dueDate is in the past and status is 'todo'
```

---

Next module: [AI Agents](/curriculum/03-ai-agents/overview/)
