# Implementation Next Steps

## Recommended Direction

Continue with:

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS

This is the recommended stack for the first working version of STG-Sales Intelligence.

## Why PostgreSQL

PostgreSQL is recommended because it is easy to deploy, works well with Prisma, supports secure backend filtering, and is suitable for future analytics and AI features.

## Immediate Priorities

1. Set up PostgreSQL database.
2. Add DATABASE_URL to GitHub Secrets and deployment secrets.
3. Run Prisma migration.
4. Create initial Super Admin securely.
5. Implement real login.
6. Implement user and branch management.
7. Implement CRM branch sync.
8. Implement CRM account sync.
9. Implement CRM meeting sync.
10. Build dashboard APIs.

## Do Not Hardcode Credentials

Do not commit passwords, API keys, database URLs, or reference tool credentials.

Initial admin creation should happen through a secure one-time setup flow or a local-only script using environment variables.

## Required GitHub Secrets

- DATABASE_URL
- CRM_API_BASE_URL
- CRM_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

Optional reference secrets:

- REFERENCE_TOOL_URL
- REFERENCE_TOOL_USER_ID
- REFERENCE_TOOL_PASSWORD

## Next Development Module

The next module to implement is real authentication:

- Login using User ID or Email
- Password verification using bcrypt
- JWT session cookie creation
- Branch access loading into session
- Role loading into session
- Protected routes

## Branch Security Rule

Every dashboard API must start by resolving the logged-in user's allowed branch set.

Restricted users must never receive global data.
