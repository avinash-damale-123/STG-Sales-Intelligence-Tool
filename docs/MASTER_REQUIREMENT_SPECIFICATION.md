# STG-Sales Intelligence - Master Requirement Specification

## 1. Product Purpose

STG-Sales Intelligence is a sales performance and client intelligence platform for Satguru Travel Group.

The platform will provide secure, branch-level visibility into ERV client portfolios, NCA pipeline performance, sales meetings, revenue performance, alerts, scorecards, and user productivity.

The core question the platform must answer is:

> Which client, lead, branch, salesperson, or activity needs attention, why, and what action should be taken next?

## 2. Core Objectives

1. Monitor ERV existing revenue client health and engagement.
2. Track NCA new client acquisition pipeline from lead stage to conversion.
3. Track meeting activity and marketing productivity.
4. Generate automated alerts and action recommendations.
5. Evaluate user performance through scorecards.
6. Enforce strict branch-level data access across every module.
7. Provide admin control for users, roles, branch access, sessions, and audit logs.
8. Prepare for AI/chatbot-based insights using only branch-scoped data.

## 3. Non-Negotiable Access Rule

A logged-in user must see data only for the exact branches assigned to that user.

This rule must apply before manual filters are applied.

Branch access must be enforced in backend/service/query logic before aggregation and response generation.

Frontend filters are refinement controls only and must not be treated as the security layer.

If a restricted user has no branch assigned, the system must show no business data and display a controlled access message.

## 4. Core Modules

### 4.1 Authentication

- Login using User ID or email.
- Forgot password using secure reset link or OTP.
- Remember Me option with secure session handling.
- First-time password reset for admin-created users.
- Password expiry after 90 days.
- Password policy with minimum length, uppercase, lowercase, number, and special character.

### 4.2 User Management

Super Admin/Admin users must be able to:

- Create users.
- Edit users.
- Assign roles.
- Assign one or more branches.
- Reset passwords.
- Disable or enable users.
- View user list.
- Track user activity.

User fields:

- First name.
- Last name.
- Email.
- User ID.
- Role.
- Primary branch.
- Additional branch access.
- Department.
- Status.

Branch assignment must use branch code from CRM Branch Master.

### 4.3 Home Dashboard

The Home dashboard must show:

- ERV Portfolio.
- NCA Pipeline.
- High Priority accounts/leads.
- Hot Leads.
- NCA Demand Funnel.
- Top Revenue Clients.
- Branch Performance Comparison.
- Last Data Refresh timestamp.

### 4.4 ERV Clients

The ERV Clients tab must show:

- Total ERV accounts.
- Active accounts.
- Lost accounts.
- High Priority accounts.
- No Contact 60+ days.
- ERV alerts.
- ERV status distribution by branch.
- Monthly ERV trend.
- Top Priority ERV accounts.

### 4.5 NCA Pipeline

The NCA Pipeline tab must show:

- Total NCA accounts.
- New, Cold, Warm, Hot, Proposal, Negotiation, Converted, Closed/Dead stages.
- Pipeline potential.
- Hot lead details.
- Pipeline by branch.
- CRM-aligned stage mapping.

### 4.6 Revenue

The Revenue tab must show:

- Total ERV revenue.
- Active vs total account split.
- Lost account count and churn percentage.
- NCA pipeline potential.
- Top revenue clients.
- Revenue by branch.

If revenue data is unavailable, show a controlled placeholder.

### 4.7 Alerts

The Alerts tab must include:

- Global alerts.
- ERV alerts.
- NCA alerts.
- Meeting alerts.
- Severity levels: Critical, High, Medium, Info.
- Expandable alert detail tables.

Alerts must be generated only from the user's accessible branch data.

### 4.8 Meetings

The Meetings tab must show:

- Total meetings.
- Marketing meetings.
- Account meetings.
- Finance meetings.
- Other meetings.
- Meeting Held vs Meeting Not Held.
- Meetings by owner.
- Meetings by branch.
- Monthly trends.
- Marketing target achievement.

Productivity calculations must count only Held Marketing Meetings unless a separate Total Activity view is selected.

### 4.9 Scorecard

The Scorecard tab must classify users and calculate performance scores.

Role classifications:

- Sales Manager / CSM.
- Account Manager / AM.
- Mixed.

Scorecard dimensions may include meeting volume, marketing frequency, NCA pipeline, ERV prospecting, responsiveness, account cadence, portfolio health, client engagement, alert load, and target achievement.

### 4.10 Admin Panel

Admin panel must include:

- Registration queue.
- User management.
- Activity log.
- Active sessions.
- Refresh history.
- Manual refresh for Super Admin.

## 5. Global Filters

Filters must be available globally:

1. Region.
2. Branch.
3. Owner/User.
4. Department.
5. Account Type.
6. Date range.
7. Active/Inactive toggle where applicable.

Default behavior on login:

- Apply assigned branch access automatically.
- Include active users only.
- Select Marketing department by default.

## 6. Data Filtering Hierarchy

All data must be filtered in this order:

1. Branch Access - strict and mandatory.
2. User.
3. Department.
4. Active/Inactive status.
5. Account Type.
6. Date range.

## 7. Account Types

The platform must segregate accounts by account_type from CRM:

- NCA: new client acquisition prospects/leads.
- B2B: travel agents/agencies.
- ERV: existing corporate clients.

## 8. Data Accuracy Requirements

The platform must validate:

- CRM stage mapping.
- ERV/NCA/B2B account type mapping.
- Branch code mapping.
- Unique account ID deduplication.
- Active/inactive users.
- Active/inactive branches.
- Active/inactive regions.
- Last synced timestamp.
- CRM API source label.

## 9. ETL / CRM Data Refresh

The platform must refresh data from CRM API on schedule.

Recommended schedule:

- 12:00 AM IST.
- 06:00 AM IST.
- 12:00 PM IST.
- 06:00 PM IST.

Super Admin must have manual refresh option.

Refresh history must capture:

- Date.
- Time.
- Status.
- Records processed.
- Completion percentage.
- Error message if failed.

## 10. Audit Log

Audit log must capture:

- Login.
- Logout.
- Failed login.
- User creation.
- User update.
- Branch assignment changes.
- Role changes.
- Password reset.
- Manual refresh.
- Force logout.

Audit log access is Super Admin only.

## 11. AI / Chatbot Requirement

The chatbot must answer only using the logged-in user's branch-scoped data.

The chatbot must never expose global totals, unassigned branch names, unassigned user data, or cross-branch comparisons outside the granted scope.

## 12. MVP Scope

MVP 1 will include:

- Authentication.
- User management.
- Branch access assignment.
- CRM data model placeholders.
- Home dashboard.
- ERV summary.
- NCA summary.
- Meetings summary.
- Alerts summary.
- Global filters.
- Audit logs.
