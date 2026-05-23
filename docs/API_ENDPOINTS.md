# CRM API Endpoint Mapping

## Purpose

This document records the CRM API endpoints required for STG-Sales Intelligence.

Sensitive values such as API keys must never be committed to this repository.

## Environment Variables

Use these variables from `.env` or GitHub Actions Secrets:

```env
CRM_API_BASE_URL=https://crm.satgurutravel.com/crm_v12/api
CRM_API_KEY=<stored securely>
```

## Authentication Header

All CRM API requests must include:

```http
x-api-key: ${CRM_API_KEY}
```

## Request Method

Current BI endpoints use POST requests.

Some paginated endpoints require form-data fields:

```text
from=1
to=10
```

## Primary Live CRM Base URL

```text
https://crm.satgurutravel.com/crm_v12/api
```

## Initial Endpoints

| Module | Endpoint | Method | Purpose | Pagination |
|---|---|---:|---|---|
| Branch Master | `/branch_list_BI` | POST | Branch list and branch mapping | No/To verify |
| Accounts | `/account_view` | POST | Account, ERV/NCA/B2B source data | Yes |
| Meetings | `/meeting_visit_BI` | POST | Meeting activity source data | Yes |
| Last Login | `/last_login` | POST | User login/activity reference | To verify |

## Demo / Secondary CRM Base URL Found

Some endpoints in the Postman collection point to:

```text
https://ycrm-demo.yirondemos.com/satguru_crm/api
```

These must be treated as secondary/demo until confirmed.

## Secondary Endpoints To Validate

| Module | Endpoint | Base | Method | Purpose |
|---|---|---|---:|---|
| Product List | `/product_list_BI` | Demo/Yiron | POST | Product/service reference |
| Contact List | `/contact_list_BI` | Demo/Yiron | POST | Contact master data |
| Role List | `/role_list_BI` | Demo/Yiron | POST | Role master data |

## Required API Client Behavior

1. Keep all API calls server-side.
2. Never expose CRM_API_KEY to browser code.
3. Store raw API response snapshots only if required for debugging.
4. Normalize CRM data into application tables.
5. Record sync status in refresh history.
6. Apply branch-access restriction after data is stored and before serving dashboard queries.

## API Sync Logging

Each sync run must capture:

- Endpoint name.
- Start time.
- End time.
- Status: success/failed.
- Records processed.
- Error message if failed.
- Trigger source: scheduled/manual.

## Validation Checks

For each endpoint, validate:

- Response structure.
- Branch code field.
- Account ID field.
- Account type field.
- User/owner field.
- Department field.
- Active/inactive status field.
- Meeting status field.
- Date fields.

## Open Questions

1. Confirm whether `/branch_list_BI` returns branch code, branch name, region, country, and status.
2. Confirm source endpoint for User Module.
3. Confirm source endpoint for Department data.
4. Confirm source endpoint for Revenue/Sales Ledger data.
5. Confirm final stage mapping for NCA pipeline.
