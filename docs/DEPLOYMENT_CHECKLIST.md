# Deployment Checklist

## Environment Variables

Required:

- DATABASE_URL
- CRM_API_BASE_URL
- CRM_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## Database

1. Create PostgreSQL database.
2. Add DATABASE_URL.
3. Run Prisma migration.
4. Verify tables.

## Authentication

1. Create initial Super Admin.
2. Verify login.
3. Verify session handling.
4. Verify protected routes.

## Branch Security

1. Create test users.
2. Assign branch access.
3. Verify branch-level filtering.
4. Verify restricted dashboards.

## CRM Sync

1. Verify CRM API connectivity.
2. Run branch sync.
3. Run account sync.
4. Run meeting sync.
5. Verify refresh history.

## Dashboard Verification

1. Verify ERV dashboard.
2. Verify NCA dashboard.
3. Verify alerts.
4. Verify meetings.
5. Verify scorecard.

## Production Readiness

1. Enable HTTPS.
2. Secure secrets.
3. Configure backups.
4. Configure monitoring.
5. Configure logging.
