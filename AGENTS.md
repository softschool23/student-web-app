# AGENTS.md

## Purpose

This repository uses Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod, Lucide React, and Day.js.

When making changes:

- Follow the existing architecture and patterns.
- Reuse existing components whenever possible.
- Keep code modular, strongly typed, and consistent with the rest of the project.
- Prefer modifying existing code over introducing new abstractions unless there is a clear benefit.

---

# Project Structure

```
src/
├── app/
│   ├── (auth)/         # Authentication routes
│   ├── (main)/         # Authenticated application routes
│   ├── layout.tsx
│   └── page.tsx
├── components/         # Reusable UI and feature components
└── lib/
    └── utils.ts        # cn() utility
```

### Route Organization

### Authentication

Place authentication pages inside:

```
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

```
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
import { cn } from "@/lib/utils";
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
- Browser APIs
- Event handlers
- React Hook Form
- Client-only libraries

Do not add `"use client"` unnecessarily.

---

# Components

## Reuse Existing Components First

Before creating a new component, check:

```
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

import { cn } from "@/lib/utils";

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

Example:

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

```
w-4 h-4
w-5 h-5
```

Prefer semantic color classes such as:

```
text-foreground
text-muted-foreground
```

---

# Forms

Always use:

- React Hook Form
- Zod
- @hookform/resolvers/zod

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

```
lib/dayjs.ts
```

Usage:

```tsx
import dayjs from "@/lib/dayjs";

dayjs(date).format("MMM D, YYYY");
dayjs(date).fromNow();
```

---

# Utilities

Shared helpers belong inside:

```
src/lib/
```

Examples:

- API clients
- validation schemas
- formatters
- constants
- utility functions

---

# Naming

Use:

- PascalCase for components
- camelCase for variables and functions
- descriptive names

---

# Exports

Use:

- default exports for React components
- named exports for utilities

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
- [ ] Code remains modular, clean, and consistent with the existing codebase.
