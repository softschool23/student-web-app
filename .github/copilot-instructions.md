# GitHub Copilot Instructions

## Project Structure

```
src/
├── app/
│   ├── (auth)/         # Authentication pages (login, forgot password, etc.)
│   ├── (main)/         # Main application pages (dashboard, etc.)
│   ├── layout.tsx
│   └── page.tsx
├── components/         # Reusable components
└── lib/               # Helper functions and utilities
    └── utils.ts       # Contains cn() function for className merging
```

## Code Style Guidelines

### 1. Function Declarations

- **Always use arrow functions** for all function declarations
- Example:

```typescript
const MyComponent = () => {
  // component code
};

const handleClick = () => {
  // handler code
};
```

### 2. Client Components

- Add `"use client"` directive at the top of files that use:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs
  - Event handlers
  - Third-party libraries like react-hook-form

### 3. Styling with Tailwind CSS

#### Use the `cn()` utility function

- Import: `import { cn } from "@/lib/utils"`
- Use for conditional classes and merging className strings
- Example:

```typescript
  className={cn(
    "w-full px-3 py-2 border rounded focus:outline-none focus:ring",
    error ? "border-red-500" : "border-gray-300",
    disabled && "opacity-50 cursor-not-allowed"
  )}
```

- Note: use `cn` only if there are conditional classes or styling; otherwise, use a simple string.

#### Color Usage

- **Always use CSS variables from `globals.css` first**
- Use Tailwind's color utilities only when necessary
- Example of preferred approach:

```typescript
className = "bg-background text-foreground border-border";
```

#### Dark Mode Support

- **Every component must include dark mode styles**
- Use the `dark:` prefix for dark mode variants
- Example:

```typescript
className = "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100";
```

### 4. File Organization

#### Authentication Pages (`app/(auth)/`)

- Place all authentication-related pages here
- Examples: login, register, forgot-password, reset-password, verify-email

#### Main Application Pages (`app/(main)/`)

- Place all authenticated/main application pages here
- Examples: dashboard, profile, settings

#### Components (`components/`)

- **Always use existing components from the project first**
- **Only create new components if no corresponding component exists**
- Check these directories before creating new components:

```
  components/
  ├── ui/           # Basic UI components (Button, Input, Card, etc.)
  ├── forms/        # Form-related components
  ├── layout/       # Layout components (Header, Sidebar, etc.)
  └── shared/       # Shared feature components
```

- Create reusable, modular components when building new ones
- Use subdirectories for organization

#### Library (`lib/`)

- Place all helper functions, utilities, and configurations here
- Examples: API clients, validation schemas, formatters, constants

### 5. Component Structure

```typescript
"use client"; // if needed

import React from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  // props definition
}

const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // hooks

  // handlers
  const handleAction = () => {
    // logic
  };

  // render
  return (
    <div
      className={cn(
        "base-classes",
        "dark:dark-classes",
        conditionalClass && "conditional-classes"
      )}
    >
      {/* content */}
    </div>
  );
};

export default ComponentName;
```

### 6. Icons

- **Always use Lucide React for all icons**
- Import icons from `lucide-react`
- Example:

```typescript
import { Search, User, Menu, X, ChevronDown } from "lucide-react";

const Component = () => {
  return (
    <div>
      <Search className="w-4 h-4" />
      <User className="w-5 h-5 text-foreground" />
    </div>
  );
};
```

- Use consistent sizing: `w-4 h-4` or `w-5 h-5` for most cases
- Apply color classes as needed: `text-foreground`, `text-muted-foreground`, etc.

### 7. Date Formatting

- **Always use Day.js for all date formatting and manipulation**
- Never use the native `Date` object methods or other date libraries (e.g. `date-fns`, `moment`) for formatting
- Import dayjs and any needed plugins from `dayjs`
- Example:

```typescript
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

// Formatting
const formatted = dayjs(date).format("MMMM D, YYYY"); // "March 26, 2026"
const shortDate = dayjs(date).format("MM/DD/YYYY"); // "03/26/2026"
const withTime = dayjs(date).format("YYYY-MM-DD HH:mm:ss"); // ISO-style

// Relative time
const relative = dayjs(date).fromNow(); // "2 hours ago"

// UTC
const utcDate = dayjs.utc(date).format();
```

- Register plugins once at the app entry point (e.g. `lib/dayjs.ts`) and import that file where needed:

```typescript
// lib/dayjs.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
```

```typescript
// Usage in components
import dayjs from "@/lib/dayjs";

const FormattedDate = ({ date }: { date: string }) => (
  <span>{dayjs(date).format("MMM D, YYYY")}</span>
);
```

### 8. Form Handling

- **Always use React Hook Form with Zod for form validation**
- Define schemas with Zod for type safety and validation
- Example:

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // handle submission
    console.log(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* form fields */}</form>;
};
```

### 9. Best Practices

- **TypeScript**: Always use TypeScript with proper type definitions
- **Props Interface**: Define interfaces for component props
- **Imports**: Use absolute imports with `@/` prefix
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Modularity**: Keep components small and focused on a single responsibility
- **Exports**: Use default exports for components, named exports for utilities
- **Component Reuse**: Always check for existing components before creating new ones
- **Form Validation**: Use React Hook Form + Zod for all forms
- **Icons**: Use Lucide React for all icon needs
- **Dates**: Use Day.js for all date formatting and manipulation

## Key Reminders

✅ Arrow functions for all declarations  
✅ Use `cn()` for className management  
✅ Colors from `globals.css` first  
✅ Always include `dark:` variants  
✅ Add `"use client"` when needed  
✅ **Use existing components first, create only when needed**  
✅ **React Hook Form + Zod for all forms**  
✅ **Lucide React for all icons**  
✅ **Day.js for all date formatting — never native Date methods or other libraries**  
✅ Keep code modular and clean  
✅ Proper TypeScript typing  
✅ Organize files by feature/domain
