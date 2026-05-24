# Deployment Checklist

Use this checklist before running the Sales Intelligence Tool in a live environment.

## 1. Required Environment Variables

Configure these in your hosting platform or local environment:

- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- JWT_SECRET
- CRM_API_BASE_URL
- CRM_API_KEY
- INITIAL_ADMIN_USER_ID
- INITIAL_ADMIN_EMAIL
- INITIAL_ADMIN_PASSWORD
- INITIAL_ADMIN_FIRST_NAME
- INITIAL_ADMIN_LAST_NAME

Do not commit real values into the repository.

## 2. Database Setup

After DATABASE_URL is configured, run:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

For local development, you may use:

```bash
npx prisma migrate dev
```

## 3. First Super Admin

After migration is complete, create the first Super Admin user:

```bash
node scripts/create-super-admin.js
```

## 4. Health Check

Start the application and call:

```text
/api/health
```

Expected healthy response:

- app is ok
- database is ok
- auth secret is configured
- CRM base URL is configured when CRM sync is needed
- CRM API key is configured when CRM sync is needed

## 5. Login Verification

Verify:

- Login page loads
- Super Admin can log in
- Dashboard opens after login
- stg_session cookie is created
- Dashboard summary API does not return 401

## 6. CRM Sync Verification

From Admin panel:

1. Run branch sync first.
2. Check Branch Master table.
3. Run account sync.
4. Run meeting sync.
5. Check refresh history.
6. Confirm records processed count.
7. Confirm dashboard summary cards update.

## 7. Branch Security Test

Create or prepare a normal user with branch access.

Verify:

- User sees only assigned branch data.
- User with no branches sees no business data.
- Super Admin sees all branch data.
- API responses follow the same branch rule as UI.

## 8. Dashboard Verification

Verify these modules after login and CRM sync:

- Home Dashboard
- ERV Portfolio
- NCA Pipeline
- Meeting Activity
- Alerts
- Scorecard
- Admin Panel

## 9. Production Checks

Before production rollout:

- HTTPS enabled
- secure cookies enabled
- database backups configured
- CRM credentials stored in secrets only
- migration tested
- login tested
- branch security tested
- CRM sync tested
- error monitoring configured
- logging configured
