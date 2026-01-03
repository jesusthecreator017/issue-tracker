# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Issue Tracker application built with Next.js 16, using the App Router architecture. The application allows users to create, view, edit, and delete issues, with authentication powered by BetterAuth.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Database Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio to view/edit data
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Architecture

### Database Layer

- **ORM**: Prisma with MariaDB adapter
- **Database**: MySQL/MariaDB running on localhost:3306
- **Client Location**: Generated client is in `generated/prisma/client` (custom output path)
- **Schema**: Located at `prisma/schema.prisma`
- **Client Instance**: Singleton pattern in `prisma/client.ts` with connection pooling (limit: 5)
- **Models**:
  - `Issue`: Core issue tracking (title, description, status, timestamps)
  - `User`, `Session`, `Account`, `Verification`: BetterAuth authentication tables

### Authentication

- **Provider**: BetterAuth v1.4.10
- **Strategy**: Email/password authentication (social providers commented out)
- **Configuration**: `app/lib/auth.ts` (server-side), `app/lib/auth-client.ts` (client-side)
- **API Route**: All auth requests handled by `app/api/auth/[...all]/route.ts`
- **Session**: Cookie-based with 1-minute cache enabled
- **Database Adapter**: Prisma adapter with MySQL provider

### API Routes (App Router)

- `app/api/issues/route.ts`: GET (list all), POST (create)
- `app/api/issues/[id]/route.ts`: PATCH (update), DELETE (delete)
- `app/api/auth/[...all]/route.ts`: BetterAuth handlers

### Validation

- **Library**: Zod v4.2.1
- **Schema**: Shared schema at `app/validationSchema.ts`
- **Usage**: Both client-side (react-hook-form with zodResolver) and server-side (API routes)

### UI Components

- **Component Library**: Radix UI Themes v3.2.1
- **Styling**: Tailwind CSS v4
- **Icons**: Radix Icons
- **Markdown Editor**: `@uiw/react-md-editor` with rehype-sanitize for XSS protection
- **Forms**: react-hook-form with Zod resolver

### File Structure Patterns

```
app/
├── issues/
│   ├── [id]/                    # Dynamic route for individual issues
│   │   ├── page.tsx             # Issue detail page
│   │   ├── IssueDetails.tsx     # Display component
│   │   ├── EditIssueButton.tsx  # Navigation to edit
│   │   ├── edit/
│   │   │   └── page.tsx         # Edit issue page
│   │   └── delete/
│   │       └── DeleteIssueButton.tsx  # Delete with confirmation
│   ├── _components/             # Shared issue components (underscore = not a route)
│   │   ├── IssueForm.tsx        # Main form (client component)
│   │   ├── IssueFormClient.tsx  # Client wrapper
│   │   └── IssueFormSkeleton.tsx
│   ├── new/
│   │   └── page.tsx             # Create new issue
│   ├── page.tsx                 # Issues list
│   └── IssueActions.tsx
├── auth/
│   └── signup/
│       ├── page.tsx             # Auth page with tabs
│       └── _components/         # SignInTab, SignUpTab
├── components/                  # Global reusable components
├── lib/                         # Utilities and configs
└── api/                         # API routes
```

### Path Aliases

- `@/*` maps to root directory (configured in tsconfig.json)
- Example: `@/prisma/client`, `@/app/validationSchema`, `@/generated/prisma/client`

## Key Implementation Details

### Client vs Server Components

- **Client Components**: Forms, interactive UI (marked with `'use client'`)
- **Server Components**: Default for pages, data fetching
- Issue forms use Controller from react-hook-form to manage the markdown editor state

### Issue Status Enum

The `Status` enum (OPEN, IN_PROGRESS, CLOSED) is defined in Prisma schema but currently commented out in the validation schema. When working with status:
- Database supports it (prisma/schema.prisma:25-29)
- Validation currently doesn't enforce it (app/validationSchema.ts:6)

### Environment Variables

Required in `.env`:
- `DATABASE_PASSWORD`: MySQL root password
- `DATABASE_URL`: Full MySQL connection string
- `BETTER_AUTH_URL`: Base URL for auth (http://localhost:3000 in dev)
- `BETTER_AUTH_SECRET`: Secret for auth (production)
- Optional: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (for OAuth)

### Prisma Client Generation

After modifying `prisma/schema.prisma`, always run:
```bash
npx prisma generate
```

The client is generated to `generated/prisma/client` (not the default `node_modules/.prisma/client`).

### Router Usage

- Use `useRouter` from `next/navigation` (not `next/router`)
- After mutations, call `router.refresh()` to revalidate server components
- Use `router.push()` for navigation

## Common Patterns

### Creating a New Issue Feature

1. Add field to Prisma schema if needed
2. Run `npx prisma migrate dev --name <description>`
3. Update `app/validationSchema.ts` Zod schema
4. Modify `IssueForm.tsx` to include new field
5. Update API routes to handle new field
6. Run `npx prisma generate` to update client types

### Adding Authentication Guards

Use BetterAuth's server-side `auth` instance from `app/lib/auth.ts`. Check session in server components or API routes before allowing operations.
