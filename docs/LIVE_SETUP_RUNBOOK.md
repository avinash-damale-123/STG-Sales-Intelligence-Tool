# Live Setup Runbook

This runbook explains the recommended first live setup sequence for STG-Sales Intelligence.

## Phase 1: Prepare Environment

Create the required environment variables in your deployment platform or local `.env` file.

Required application variables:

- DATABASE_URL
- CRM_API_BASE_URL
- CRM_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

Required first-admin setup variables:

- INITIAL_ADMIN_USER_ID
- INITIAL_ADMIN_EMAIL
- INITIAL_ADMIN_PASSWORD
- INITIAL_ADMIN_FIRST_NAME
- INITIAL_ADMIN_LAST_NAME

Security rules:

- Do not commit `.env` files.
- Do not commit real passwords.
- Use a strong NEXTAUTH_SECRET.
- Use a 12+ character initial admin password.

## Phase 2: Install Dependencies

Run:

```bash
npm install
```

## Phase 3: Generate Prisma Client

Run:

```bash
npx prisma generate
```

## Phase 4: Apply Database Migration

For development/local setup:

```bash
npx prisma migrate dev
```

For production setup, use the production migration command suitable for your deployment platform:

```bash
npx prisma migrate deploy
```

## Phase 5: Create First Super Admin

After migration is complete and the setup environment variables are available, run:

```bash
node scripts/create-super-admin.js
```

Expected result:

- Super Admin role exists.
- First active Super Admin user exists.
- Password is stored as a bcrypt hash.
- No password is printed to logs.

## Phase 6: Start Application

For local development:

```bash
npm run dev
```

For production:

```bash
npm run build
npm run start
```

## Phase 7: Verify Login

Open the login page and sign in using either:

- INITIAL_ADMIN_USER_ID
- INITIAL_ADMIN_EMAIL

After login, verify:

- `stg_session` cookie is created.
- Dashboard loads without 401.
- Summary APIs return authenticated responses.
- Admin user can access protected pages.

## Phase 8: Verify Branch Security

Create or prepare non-admin users with branch assignments.

Test scenarios:

1. User with one branch sees only that branch.
2. User with multiple branches sees only those branches.
3. User with no branch sees no business data.
4. Super Admin can access all branch-scoped data intentionally.
5. Dashboard, ERV, NCA, Meetings, Alerts, and Scorecard APIs follow the same branch rule.

## Phase 9: Verify CRM Sync Readiness

Before enabling live sync:

1. Confirm CRM_API_BASE_URL is correct.
2. Confirm CRM_API_KEY is valid.
3. Confirm API responses match expected data structures.
4. Confirm sync errors are stored in refresh history.
5. Confirm branchCode is available for all synced business records.

## Phase 10: Production Readiness Checks

Before production use:

- HTTPS enabled
- secure cookies enabled
- DATABASE_URL protected
- CRM credentials stored only in secrets
- backups configured
- audit logging verified
- access testing completed
- error monitoring configured

## Current Technical Status

The backend summary APIs are now session-secured and branch-scoped. The next major work areas are:

1. Validate Prisma schema against a real PostgreSQL database.
2. Complete user and branch management screens.
3. Complete CRM sync implementation against the live CRM API.
4. Wire frontend dashboard cards to authenticated APIs.
