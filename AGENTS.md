# AGENTS.md

## Purpose

This repository uses Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod, TanStack React Query, Zustand, Lucide React, and Day.js.

When making changes:

- Follow the existing architecture and patterns.
- Reuse existing components whenever possible.
- Keep code modular, strongly typed, and consistent with the rest of the project.
- Prefer modifying existing code over introducing new abstractions unless there is a clear benefit.
- Use the existing query wrappers and stores instead of manually duplicating organisation or student state.

---

# Project Structure

```text
src/
├── app/
│   ├── (auth)/         # Authentication routes
│   ├── (main)/         # Authenticated application routes
│   ├── layout.tsx
│   └── page.tsx
├── components/         # Reusable UI and feature components
└── lib/
    ├── queries/        # React Query hooks and query wrappers
    ├── stores/         # Zustand stores
    └── utils.ts        # cn() utility
```

## Route Organization

### Authentication

Place authentication pages inside:

```text
src/app/(auth)/
```

Examples:

- login
- register
- forgot-password
- reset-password
- verify-email

### Main Application

Place authenticated pages inside:

```text
src/app/(main)/
```

Examples:

- dashboard
- profile
- settings

---

# Coding Standards

## Functions

Always use arrow functions.

Preferred:

```tsx
const MyComponent = () => {};

const handleSubmit = () => {};
```

Avoid:

```tsx
function MyComponent() {}
```

---

## TypeScript

Always use TypeScript.

- Define interfaces for component props.
- Avoid `any`.
- Use proper inference where appropriate.
- Keep API/query types strongly typed.

Example:

```tsx
interface ButtonProps {
  label: string;
  disabled?: boolean;
}
```

---

## Imports

Use absolute imports.

Preferred:

```tsx
import { cn } from "@/src/lib/utils";
```

Avoid relative imports like:

```tsx
../../components/Button
```

unless required.

---

# Client Components

Add:

```tsx
"use client";
```

whenever a file uses:

- React hooks
- TanStack React Query hooks
- Zustand hooks
- Browser APIs
- Event handlers
- React Hook Form
- Client-only libraries

Do not add `"use client"` unnecessarily.

---

# React Query

Use **TanStack React Query** for client-side server-state fetching.

Query-related hooks and reusable query utilities belong inside:

```text
src/lib/queries/
```

## Student-Scoped Queries

A custom `useStudentQuery` wrapper exists in:

```text
src/lib/queries/
```

It automatically retrieves the current:

- `organisationId`
- `studentId`

from the Zustand `userStore`.

### Required Rule

If a query requires either:

- `organisationId`
- `studentId`
- both `organisationId` and `studentId`

use `useStudentQuery`.

Do **not** manually read these identifiers from the Zustand store inside individual query hooks when `useStudentQuery` can provide them.

Do **not** pass the current student's `organisationId` or `studentId` through component props solely for use in a query.

For queries that do **not** depend on `organisationId` or `studentId`, use the standard TanStack React Query `useQuery`.

### Preferred

```tsx
const query = useStudentQuery({
  identifiers: ["organisationId"],
  queryKey: ["classes"],
  queryFn: ({ organisationId }) => getClassesByOrganisation(organisationId),
});
```

For a query that requires both identifiers:

```tsx
const query = useStudentQuery({
  identifiers: ["organisationId", "studentId"],
  queryKey: ["student-courses"],
  queryFn: ({ organisationId, studentId }) =>
    getStudentCourses({
      organisationId,
      studentId,
    }),
});
```

For a query that only requires the student:

```tsx
const query = useStudentQuery({
  identifiers: ["studentId"],
  queryKey: ["student-profile"],
  queryFn: ({ studentId }) => getStudentProfile(studentId),
});
```

### Avoid

Do not manually retrieve the same identifiers:

```tsx
const user = useUserStore((state) => state.user);

const query = useQuery({
  queryKey: ["student-courses", user?.organisationId, user?._id],
  queryFn: () =>
    getStudentCourses({
      organisationId: user?.organisationId ?? "",
      studentId: user?._id ?? "",
    }),
  enabled: Boolean(user?.organisationId && user?._id),
});
```

Instead use:

```tsx
const query = useStudentQuery({
  identifiers: ["organisationId", "studentId"],
  queryKey: ["student-courses"],
  queryFn: ({ organisationId, studentId }) =>
    getStudentCourses({
      organisationId,
      studentId,
    }),
});
```

## Query Keys

When using `useStudentQuery`:

- Provide the base query key only.
- Do not manually append `organisationId` or `studentId`.
- The wrapper automatically scopes the query key using the requested identifiers.

Preferred:

```tsx
queryKey: ["student-courses"];
```

Avoid:

```tsx
queryKey: ["student-courses", organisationId, studentId];
```

The wrapper handles identifier-based query scoping automatically.

Additional query parameters that are **not** supplied by `useStudentQuery` should still be included in the query key.

Example:

```tsx
const query = useStudentQuery({
  identifiers: ["organisationId"],
  queryKey: ["classes", page, search],
  queryFn: ({ organisationId }) =>
    getClasses({
      organisationId,
      page,
      search,
    }),
});
```

## Query Enabling

`useStudentQuery` automatically prevents the query from running until all requested identifiers are available.

For example:

```tsx
identifiers: ["organisationId", "studentId"];
```

means the query will only execute when both identifiers exist.

Do not duplicate this logic with:

```tsx
enabled: Boolean(organisationId && studentId);
```

Use `enabled` only for additional conditions unrelated to the availability of the requested student identifiers.

Example:

```tsx
const query = useStudentQuery({
  identifiers: ["studentId"],
  queryKey: ["student-result", semesterId],
  queryFn: ({ studentId }) =>
    getStudentResult({
      studentId,
      semesterId,
    }),
  enabled: Boolean(semesterId),
});
```

## Standard Queries

Use the standard `useQuery` when the request does not depend on the current student's organisation or student ID.

Example:

```tsx
const query = useQuery({
  queryKey: ["countries"],
  queryFn: getCountries,
});
```

Do not use `useStudentQuery` for unrelated queries.

---

# Components

## Reuse Existing Components First

Before creating a new component, check:

```text
components/
├── ui/
├── forms/
├── layout/
└── shared/
```

If a suitable component already exists:

- reuse it
- extend it if appropriate

Only create a new component when one does not already exist.

---

## Component Structure

Preferred structure:

```tsx
"use client";

import { cn } from "@/src/lib/utils";

interface ComponentProps {}

const Component = ({ ...props }: ComponentProps) => {
  // hooks

  // handlers

  // render

  return <div />;
};

export default Component;
```

Keep components:

- focused
- reusable
- small
- easy to understand

---

# Styling

## Tailwind CSS

Use Tailwind for styling.

Use the `cn()` helper only when class names are conditional or merged.

Preferred:

```tsx
className={cn(
  "rounded-md",
  isActive && "bg-primary"
)}
```

If there are no conditional classes:

```tsx
className = "rounded-md";
```

---

## Colors

Prefer design tokens defined in `globals.css`.

Preferred:

```tsx
bg - background;
text - foreground;
border - border;
text - muted - foreground;
```

Only use Tailwind color utilities when design tokens are insufficient.

---

## Dark Mode

Every UI component should support dark mode.

Prefer semantic design tokens where possible:

```tsx
bg - background;
text - foreground;
```

If explicit colors are necessary:

```tsx
bg-white dark:bg-gray-900
text-gray-900 dark:text-gray-100
```

---

# Icons

Always use **Lucide React**.

```tsx
import { Search, User, Menu, ChevronDown } from "lucide-react";
```

Preferred sizes:

```text
w-4 h-4
w-5 h-5
```

Prefer semantic color classes such as:

```text
text-foreground
text-muted-foreground
```

---

# Forms

Always use:

- React Hook Form
- Zod
- `@hookform/resolvers/zod`

Every form should:

- define a Zod schema
- infer its TypeScript type from the schema
- use `zodResolver`

Preferred pattern:

```tsx
const formSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;
```

---

# Dates

Always use **Day.js**.

Never use:

- native `Date` formatting
- date-fns
- moment

Plugins should be registered once inside:

```text
src/lib/dayjs.ts
```

Usage:

```tsx
import dayjs from "@/src/lib/dayjs";

dayjs(date).format("MMM D, YYYY");
dayjs(date).fromNow();
```

---

# Utilities

Shared helpers belong inside:

```text
src/lib/
```

Examples:

- API clients
- query hooks
- validation schemas
- Zustand stores
- formatters
- constants
- utility functions

Query-specific utilities and hooks should be placed inside:

```text
src/lib/queries/
```

---

# Naming

Use:

- PascalCase for components
- camelCase for variables and functions
- descriptive names

Query hooks should follow descriptive `use...` naming.

Examples:

```tsx
useStudentQuery;
useStudentCourses;
useOrganisationClasses;
```

---

# Exports

Use:

- default exports for React components
- named exports for utilities and hooks

---

# General Principles

When making changes:

- Keep components modular.
- Prefer composition over duplication.
- Follow existing project conventions.
- Avoid unnecessary abstractions.
- Make the smallest reasonable change that satisfies the request.
- Maintain strong TypeScript typing.
- Keep files organized by feature/domain.
- Keep server-state fetching inside reusable query hooks where appropriate.
- Do not duplicate student or organisation identifier retrieval across queries.
- Use `useStudentQuery` whenever a query depends on the current student's `organisationId` or `studentId`.
- Use standard `useQuery` for queries that do not depend on those identifiers.

---

# Checklist

Before completing a task, verify:

- [ ] Arrow functions are used.
- [ ] Proper TypeScript types are defined.
- [ ] Existing components were reused where possible.
- [ ] `"use client"` is present only when required.
- [ ] Tailwind follows project conventions.
- [ ] `cn()` is used only for conditional classes.
- [ ] Colors use design tokens from `globals.css` when available.
- [ ] Dark mode is supported.
- [ ] Lucide React is used for icons.
- [ ] React Hook Form + Zod is used for forms.
- [ ] Day.js is used for all date formatting.
- [ ] Absolute `@/` imports are used.
- [ ] `useStudentQuery` is used for queries requiring `organisationId` or `studentId`.
- [ ] Standard `useQuery` is used when student/organisation identifiers are not required.
- [ ] `organisationId` and `studentId` are not manually added to query keys when using `useStudentQuery`.
- [ ] Student identifiers are not manually retrieved from Zustand when `useStudentQuery` can provide them.
- [ ] Code remains modular, clean, and consistent with the existing codebase.
