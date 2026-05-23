# Developer Handoff

## Project

STG-Sales Intelligence Tool

## Repository

avinash-damale-123/STG-Sales-Intelligence-Tool

## Approved Stack

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Satguru CRM API

## Core Security Requirement

All data must be restricted by the logged-in user's assigned branches before aggregation, charting, table display, export, or chatbot response.

Frontend filters must not be treated as security controls.

## Required Environment Variables

- DATABASE_URL
- CRM_API_BASE_URL
- CRM_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## Local Development Steps

1. Clone repository.
2. Install dependencies using npm install.
3. Create local .env file.
4. Add environment variables.
5. Generate Prisma client.
6. Run Prisma migration.
7. Start app using npm run dev.

## First Developer Tasks

1. Connect PostgreSQL database.
2. Run Prisma migration.
3. Create initial Super Admin user.
4. Complete login API implementation.
5. Build user CRUD APIs.
6. Build branch access assignment APIs.
7. Implement CRM branch sync.
8. Implement CRM account sync.
9. Implement CRM meeting sync.
10. Wire dashboard APIs to live database queries.

## Important Files

### App and UI

- app/dashboard/page.tsx
- app/login/page.tsx
- app/admin/page.tsx
- app/erv/page.tsx
- app/nca/page.tsx
- app/revenue/page.tsx
- app/alerts/page.tsx
- app/scorecard/page.tsx

### Components

- components/dashboard/KpiCard.tsx
- components/dashboard/SectionCard.tsx
- components/dashboard/StatusBadge.tsx
- components/dashboard/FilterBar.tsx
- components/dashboard/DataTable.tsx
- components/layout/Sidebar.tsx
- components/layout/Topbar.tsx

### Backend and Security

- lib/auth.ts
- lib/session.ts
- lib/prisma.ts
- lib/branch-access.ts
- middleware.ts

### Services

- services/access-scope.ts
- services/user-service.ts
- services/erv-service.ts
- services/nca-service.ts
- services/meeting-service.ts
- services/audit-service.ts
- services/refresh-history-service.ts
- services/crm-api.ts

### Database

- prisma/schema.prisma

## Critical Testing Scenarios

1. User with one branch sees only that branch.
2. User with multiple branches sees only those branches.
3. User with no branch sees no business data.
4. Super Admin access is controlled and intentional.
5. Dashboard, tables, charts, alerts, exports, and chatbot all follow the same access rule.
6. CRM sync errors are recorded in refresh history.
7. Login failures are recorded in audit logs.

## Notes

The project already has strong scaffolding. The next step is moving from scaffolding to live data implementation.
