# MVP Build Plan

## Goal

Build a secure and scalable MVP version of STG-Sales Intelligence.

The MVP must solve the current branch-level access issues while providing reliable ERV, NCA, Meetings, Alerts, and Scorecard visibility.

---

# Phase 1 - Foundation

## Objective

Prepare architecture, security model, and development foundation.

## Tasks

- Finalize requirement documents.
- Finalize branch access rules.
- Define database schema.
- Define CRM API mapping.
- Configure environment variables.
- Initialize Next.js application.
- Configure TypeScript.
- Configure Tailwind CSS.
- Configure Prisma ORM.
- Configure PostgreSQL.
- Configure GitHub Secrets.

## Deliverables

- Running app shell.
- Secure environment configuration.
- Database connection.
- Initial project structure.

---

# Phase 2 - Authentication & User Management

## Objective

Build secure authentication and user management.

## Tasks

- Login page.
- Forgot password.
- Session handling.
- Role-based authorization.
- User management UI.
- Create/edit user.
- Enable/disable user.
- Password reset.
- Branch assignment.
- Audit logging.

## Deliverables

- Working login system.
- Admin user management.
- Branch access mapping.

---

# Phase 3 - CRM Data Sync

## Objective

Sync CRM data into normalized database tables.

## Tasks

- Branch sync.
- Account sync.
- Meeting sync.
- User sync.
- Stage mapping validation.
- Active/inactive validation.
- Refresh history logging.
- Manual refresh trigger.

## Deliverables

- CRM data available in local database.
- Sync monitoring.

---

# Phase 4 - Branch Access Enforcement

## Objective

Ensure all modules are branch-secured.

## Tasks

- Apply query-level branch restriction.
- Apply export restriction.
- Apply chart restriction.
- Apply chatbot restriction.
- Add automated validation tests.

## Deliverables

- No branch leakage.
- Secure dashboard queries.

---

# Phase 5 - Dashboard Modules

## Objective

Build first operational dashboards.

## Modules

### Home Dashboard

- ERV Portfolio
- NCA Pipeline
- Hot Leads
- High Priority
- Top Clients
- Branch Comparison

### ERV Clients

- Active/Lost accounts
- No Contact alerts
- Priority accounts
- Monthly trend

### NCA Pipeline

- Funnel stages
- Pipeline value
- Hot opportunities
- Conversion trend

### Meetings

- Held vs Not Held
- Meetings by owner
- Meetings by branch
- Marketing productivity

### Alerts

- ERV alerts
- NCA alerts
- Meeting alerts
- Severity classification

## Deliverables

- Functional dashboards.
- Working global filters.

---

# Phase 6 - Scorecard

## Objective

Build user productivity and scorecard engine.

## Tasks

- AM/CSM/Mixed classification.
- Meeting scoring.
- Pipeline scoring.
- ERV scoring.
- Productivity calculations.
- Ranking logic.

## Deliverables

- Working scorecard module.

---

# Phase 7 - Revenue Analytics

## Objective

Add revenue analytics and trend analysis.

## Tasks

- Revenue ledger integration.
- Revenue trend charts.
- Churn analysis.
- Top client analysis.
- Branch contribution analysis.

## Deliverables

- Revenue dashboard.

---

# Phase 8 - AI & Chatbot

## Objective

Provide branch-scoped AI insights.

## Tasks

- AI summary generation.
- Branch-scoped chatbot.
- Alert explanation.
- Suggested next actions.
- Natural-language queries.

## Deliverables

- Secure AI assistant.

---

# Initial Folder Structure

```text
frontend/
backend/
database/
docs/
```

---

# Recommended Stack

```text
Frontend: Next.js + TypeScript + Tailwind
Backend: Next.js API routes / service layer
Database: PostgreSQL
ORM: Prisma
Charts: Recharts
Hosting: Vercel
```

---

# Success Criteria

1. No branch-level data leakage.
2. Accurate ERV/NCA counts.
3. Secure role-based access.
4. CRM-aligned reporting.
5. Stable refresh process.
6. Consistent filters across modules.
7. Scalable architecture for future AI integration.
