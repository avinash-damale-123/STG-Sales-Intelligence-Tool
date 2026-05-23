# Approved Implementation Plan

## Approval Status

The approved direction is to build STG-Sales Intelligence using the recommended architecture and uploaded Sales Intelligence requirements.

No separate approval is required for routine architecture, documentation, scaffolding, backend service, API route, or UI shell changes.

Approval is only required when a real external value or business-specific decision is needed.

## Approved Stack

- Frontend: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Backend: Next.js API routes and service layer
- Database: PostgreSQL
- ORM: Prisma
- CRM Source: Satguru CRM API
- Security: backend branch-level restriction
- Hosting Target: Vercel or approved company server later

## Approved Build Principles

1. Build for Sales Intelligence only.
2. Do not mix Retail CRM scope into this repository.
3. Use the uploaded Sales Intelligence documents as the functional source.
4. Use strict branch-level data access as the first security principle.
5. Enforce branch access in backend queries before aggregation.
6. Do not rely on frontend filters for security.
7. Do not commit credentials, API keys, passwords, or database URLs.
8. Keep CRM API keys server-side only.
9. Use placeholders where real credentials or external values are unavailable.
10. Build in phases but keep the architecture enterprise-ready.

## Approved Module Scope

- Authentication
- User Management
- Branch Access Control
- CRM Data Sync
- Home Dashboard
- ERV Clients
- NCA Pipeline
- Revenue
- Alerts
- Meetings
- Scorecard
- Admin Panel
- Audit Logs
- Refresh History
- Future AI/Chatbot with branch-scoped data

## No Further Approval Needed For

- Creating repo folders
- Creating documentation
- Updating README
- Adding placeholder APIs
- Adding service layers
- Adding UI shell pages
- Adding database schema models
- Adding branch security helpers
- Adding CRM sync scaffolding
- Adding test checklists
- Adding deployment guides

## Approval Required Only For

- Real DATABASE_URL
- Real CRM_API_KEY
- Real CRM response field mapping if unknown
- Existing tool login credentials
- Deployment platform choice if multiple options are available
- Company-specific naming or branding changes not already documented

## Implementation Order

1. Finalize repo documentation.
2. Finalize PostgreSQL/Prisma setup.
3. Implement authentication backend.
4. Implement branch access enforcement.
5. Implement user and branch management.
6. Implement CRM sync routes.
7. Implement dashboard summary APIs.
8. Implement ERV/NCA/Meeting/Alert/Scorecard APIs.
9. Implement frontend pages.
10. Add admin panel.
11. Add testing checklist.
12. Add deployment guide.

## Current Priority

Move from scaffolding to real backend implementation while preserving security and avoiding committed secrets.
