# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Issue Tracker application built with Next.js 16 (App Router). Users can create, view, edit, delete, and assign issues to users. Authentication powered by BetterAuth.

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Database Commands

```bash
npx prisma generate                        # Generate Prisma Client (after schema changes)
npx prisma migrate dev --name <name>       # Create and apply migrations
npx prisma studio                          # Open Prisma Studio to view/edit data
npx prisma migrate reset                   # Reset database (WARNING: deletes all data)
```

## Architecture

### Database Layer

- **ORM**: Prisma with MariaDB adapter
- **Client Location**: `generated/prisma` (custom output path configured in schema)
- **Client Instance**: Singleton pattern in `prisma/client.ts`
- **Models**:
  - `Issue`: title, description, status (OPEN/IN_PROGRESS/CLOSED), assignedToUserId (optional FK to User)
  - `User`, `Session`, `Account`, `Verification`: BetterAuth authentication tables

### Authentication

- **Provider**: BetterAuth
- **Configuration**: `app/lib/auth.ts` (server-side), `app/lib/auth-client.ts` (client-side)
- **API Route**: `app/api/auth/[...all]/route.ts`

### API Routes

- `app/api/issues/route.ts`: GET (list all), POST (create)
- `app/api/issues/[id]/route.ts`: PATCH (update status, title, description, assignee), DELETE
- `app/api/users/route.ts`: GET (list all users for assignment dropdown)
- `app/api/auth/[...all]/route.ts`: BetterAuth handlers

### Validation

- **Library**: Zod
- **Schemas** in `app/validationSchema.ts`:
  - `issueSchema`: For creating issues (title, description required)
  - `patchIssueSchema`: For updates (all fields optional, includes status and assignedToUserId)
  - `IssueStatus` enum: TypeScript enum mirroring Prisma's Status enum

### UI Stack

- **Component Library**: Radix UI Themes
- **Styling**: Tailwind CSS v4
- **Markdown Editor**: `@uiw/react-md-editor` with rehype-sanitize
- **Forms**: react-hook-form with Zod resolver
- **Data Fetching**: TanStack Query for client-side data fetching (e.g., AssigneeSelect)
- **Notifications**: Sonner for toast notifications
- **Security**: Arcjet (available in dependencies for rate limiting/bot protection)

### Key Components

- `app/issues/_components/IssueForm.tsx`: Create/edit form using Controller for markdown editor
- `app/issues/_components/StatusSelect.tsx`: Dropdown to change issue status
- `app/issues/[id]/AssigneeSelect.tsx`: User assignment dropdown (uses TanStack Query)
- `app/issues/list/IssueStatusFilter.tsx`: Filter issues list by status
- `app/components/IssueStatusBadge.tsx`: Visual badge for status display

### Path Aliases

`@/*` maps to root directory. Examples:
- `@/prisma/client` for Prisma instance
- `@/generated/prisma/client` for generated types
- `@/app/components` for shared components

## Key Implementation Details

### Client vs Server Components

- **Server Components**: Pages with data fetching (default)
- **Client Components**: Forms, dropdowns, interactive UI (marked with `'use client'`)
- Use `export const dynamic = 'force-dynamic'` for pages that need fresh data on each request

### Issue Assignment Flow

Issues can be assigned to users via `AssigneeSelect`:
1. Component fetches users from `/api/users` using TanStack Query
2. PATCH request to `/api/issues/[id]` with `assignedToUserId`
3. Toast notification on success/error via Sonner
4. `router.refresh()` to revalidate server components

### Router Usage

- Use `useRouter` from `next/navigation` (not `next/router`)
- After mutations, call `router.refresh()` to revalidate server components

### Environment Variables

Required in `.env`:
- `DATABASE_PASSWORD`: MariaDB password (connection configured in `prisma/client.ts`)
- `BETTER_AUTH_URL`: Base URL (http://localhost:3000 in dev)
- `BETTER_AUTH_SECRET`: Secret for auth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: For Google OAuth
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: For GitHub OAuth

## Common Patterns

### Adding a New Issue Field

1. Add field to Prisma schema
2. `npx prisma migrate dev --name <description>`
3. Update `app/validationSchema.ts` (both create and patch schemas if applicable)
4. Update `IssueForm.tsx` for UI
5. Update API routes to handle the field
6. `npx prisma generate` to update types

### Adding Authentication Guards

Use BetterAuth's `auth` from `app/lib/auth.ts` to check sessions in server components or API routes.

### Pagination Pattern

Server-side pagination is implemented via URL search params:
1. Page reads `page` param from `searchParams` and calculates `skip`/`take` for Prisma
2. `Pagination` component (client) uses `useSearchParams` to update URL
3. Example: `app/issues/list/page.tsx` shows filtering + sorting + pagination together
