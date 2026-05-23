# Branch Access Security Rules

## Core Rule

A user must see data only for the exact branches assigned to that user.

This restriction must apply automatically on login without requiring manual filters.

## Backend Enforcement

Branch access restriction must be enforced at:

- API layer
- Service layer
- Query layer
- Export layer
- Chatbot response layer

Frontend filters are not the security layer.

## Required Query Rule

For restricted users:

WHERE branch_code IN (allowed_branches)

This condition must be applied before aggregation and response generation.

## Applies To

- Home dashboard
- ERV clients
- NCA pipeline
- Revenue
- Alerts
- Meetings
- Scorecard
- Tables
- Charts
- Exports
- Chatbot

## Restricted User Behavior

If a restricted user has:

- One branch → show one branch only
- Multiple branches → show combined data only for those branches
- No branches → show controlled empty state

## Super Admin Behavior

Super Admin may access unrestricted/global data depending on final policy.

## Validation Requirements

- No branch leakage
- No region inheritance
- No cross-branch totals
- No chatbot leakage
- No export leakage

## Acceptance Criteria

1. A user assigned Kigali only sees Kigali only.
2. A user assigned Kampala + Entebbe sees only those branches.
3. Manual filters refine the already restricted dataset.
4. Global totals never appear for restricted users.
5. Charts, tables, alerts, and chatbot responses follow the same branch rule.
