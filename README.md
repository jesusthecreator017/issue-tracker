# Issue Tracker

A full-featured issue tracking application built with Next.js 16 and the App Router. Create, manage, and track issues with user assignment, status tracking, and analytics.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

## Screenshots

### Dashboard
View issue statistics at a glance with summary cards and an interactive bar chart showing issue distribution by status.

![Dashboard](/public/dashboard.png)

### Issues List
Browse all issues with server-side pagination, sorting, and filtering by status.

![Issues List](/public/issues-list.png)

### Issue Detail
View and manage individual issues with status updates, user assignment, and edit/delete actions.

![Issue Detail](/public/issue-detail.png)

## Features

- **Issue Management** - Create, read, update, and delete issues
- **Status Tracking** - Track issues through Open, In Progress, and Closed states
- **User Assignment** - Assign issues to registered users
- **Dashboard Analytics** - Visual summary with charts powered by Recharts
- **Authentication** - OAuth login with Google and GitHub via BetterAuth
- **Server-side Pagination** - Efficient data loading with URL-based pagination
- **Filtering & Sorting** - Filter by status and sort by any column
- **Markdown Support** - Rich text descriptions with markdown editor
- **Real-time Notifications** - Toast notifications for user feedback

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Components | Radix UI Themes |
| Database | MariaDB with Prisma ORM |
| Authentication | BetterAuth |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query |
| Security | Arcjet |

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MariaDB or MySQL database
- OAuth credentials (Google and/or GitHub)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/issue-tracker.git
   cd issue-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your values:
   - `DATABASE_PASSWORD` - Your MariaDB password
   - `BETTER_AUTH_SECRET` - A secure random string for auth
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - From GitHub Developer Settings

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
issue-tracker/
├── app/
│   ├── api/              # API routes (issues, users, auth)
│   ├── components/       # Shared UI components
│   ├── issues/           # Issue pages and components
│   │   ├── _components/  # Issue-specific components
│   │   ├── [id]/         # Individual issue page
│   │   ├── list/         # Issues list page
│   │   └── new/          # New issue page
│   ├── lib/              # Auth configuration
│   └── page.tsx          # Dashboard home page
├── generated/            # Prisma generated client
├── prisma/
│   ├── client.ts         # Prisma client singleton
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio |

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.
