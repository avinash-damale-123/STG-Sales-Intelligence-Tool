# Super Admin Setup

This guide explains how to create the first Super Admin user after the PostgreSQL database and Prisma migration are ready.

## Prerequisites

1. DATABASE_URL is configured.
2. Prisma client is generated.
3. Prisma migration has been applied.
4. The application dependencies are installed.

## Required Environment Variables

Set the following environment variables before running the setup script:

- INITIAL_ADMIN_USER_ID
- INITIAL_ADMIN_EMAIL
- INITIAL_ADMIN_PASSWORD
- INITIAL_ADMIN_FIRST_NAME
- INITIAL_ADMIN_LAST_NAME

The password must be at least 12 characters long.

## Run Setup Script

Use this command after setting the environment variables:

```bash
node scripts/create-super-admin.js
```

## What the Script Does

The setup script:

1. Creates or updates the Super Admin role.
2. Ensures the role has isSuperAdmin enabled.
3. Checks whether the user already exists.
4. Hashes the password using bcrypt.
5. Creates the first active Super Admin user.

## Security Notes

- Do not commit real passwords to GitHub.
- Use environment variables only.
- Run the script only during initial setup or controlled admin provisioning.
- If the Super Admin user already exists, the script does not overwrite the password.

## After Setup

After the Super Admin user is created:

1. Start the application.
2. Open the login page.
3. Sign in using the created User ID or email.
4. Verify access to the dashboard and admin pages.
