# PostgreSQL Setup Guide

## Final Database Choice

STG-Sales Intelligence will use PostgreSQL as the primary application database.

Recommended stack:

- Next.js
- TypeScript
- PostgreSQL
- Prisma

## Recommended Database Hosting

Preferred options:

1. Supabase PostgreSQL
2. Neon PostgreSQL
3. Railway PostgreSQL
4. Local PostgreSQL for development

Supabase is recommended for the first implementation because it provides a managed PostgreSQL database, a dashboard, backups, and easy table inspection.

## Required Environment Variables

The application requires these environment variables:

- DATABASE_URL
- CRM_API_BASE_URL
- CRM_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

Do not commit real values into the repository.

Store real values in:

- local .env file for development
- GitHub Actions Secrets for CI/CD
- deployment platform secret manager for production

## Prisma Provider

The Prisma schema must use PostgreSQL provider.

The current expected provider value is:

```text
postgresql
```

## Local Setup Steps

1. Install dependencies.
2. Create a local .env file from .env.example.
3. Add the real database connection string to DATABASE_URL.
4. Generate Prisma client.
5. Run Prisma migration.
6. Start the development server.

## GitHub Secrets To Add

Add these under repository settings:

Settings -> Secrets and variables -> Actions

Required secrets:

- DATABASE_URL
- CRM_API_BASE_URL
- CRM_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

Optional reference secrets:

- REFERENCE_TOOL_URL
- REFERENCE_TOOL_USER_ID
- REFERENCE_TOOL_PASSWORD

## Security Notes

- Never expose DATABASE_URL in frontend code.
- Never commit .env.
- Keep .env.example placeholder-only.
- Keep CRM_API_KEY server-side only.
- All dashboard queries must enforce branch access from the backend.
