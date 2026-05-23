# Initial Database Schema Design

## Purpose

This document defines the initial database entities required for STG-Sales Intelligence.

The database will use PostgreSQL with Prisma ORM.

## Core Principles

1. Branch-level access restriction is mandatory.
2. CRM data must be normalized.
3. User access must be role-based.
4. Auditability is required.
5. Future AI/chatbot queries must respect branch scope.

---

# 1. USERS

## users

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| user_id | VARCHAR | Unique CRM/app user ID |
| email | VARCHAR | Unique email |
| first_name | VARCHAR | |
| last_name | VARCHAR | |
| role_id | UUID | FK -> roles |
| department | VARCHAR | Marketing/Finance/etc |
| status | VARCHAR | Active/Inactive |
| primary_branch_code | VARCHAR | Optional |
| password_hash | TEXT | Secure hash |
| last_login_at | TIMESTAMP | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

## user_branch_access

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| user_id | UUID | FK -> users |
| branch_code | VARCHAR | FK -> branches |
| created_at | TIMESTAMP | |

---

# 2. ROLES

## roles

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| role_name | VARCHAR | Super Admin/Admin/User |
| is_super_admin | BOOLEAN | |
| created_at | TIMESTAMP | |

---

# 3. BRANCH STRUCTURE

## branches

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| branch_code | VARCHAR | Unique CRM branch code |
| branch_name | VARCHAR | |
| region_name | VARCHAR | |
| country_name | VARCHAR | |
| status | VARCHAR | Active/Inactive |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

---

# 4. ACCOUNT DATA

## accounts

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| crm_account_id | VARCHAR | Unique CRM account ID |
| account_name | VARCHAR | |
| account_type | VARCHAR | ERV/NCA/B2B |
| branch_code | VARCHAR | FK -> branches |
| owner_user_id | VARCHAR | CRM owner reference |
| stage_name | VARCHAR | NCA stage if applicable |
| status | VARCHAR | Active/Lost/etc |
| priority_level | VARCHAR | High/Medium/Low |
| no_contact_days | INTEGER | |
| last_contact_date | DATE | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

---

# 5. MEETINGS

## meetings

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| crm_meeting_id | VARCHAR | Unique CRM meeting ID |
| branch_code | VARCHAR | FK -> branches |
| owner_user_id | VARCHAR | |
| meeting_type | VARCHAR | Marketing/Finance/etc |
| meeting_status | VARCHAR | Held/Not Held |
| meeting_date | TIMESTAMP | |
| account_id | VARCHAR | Optional CRM account ref |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

---

# 6. ALERTS

## alerts

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| alert_type | VARCHAR | ERV/NCA/Meeting/etc |
| severity | VARCHAR | Critical/High/Medium/Info |
| branch_code | VARCHAR | |
| account_id | VARCHAR | Optional |
| owner_user_id | VARCHAR | Optional |
| title | VARCHAR | |
| description | TEXT | |
| is_resolved | BOOLEAN | |
| created_at | TIMESTAMP | |

---

# 7. SCORECARDS

## scorecards

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| user_id | UUID | FK -> users |
| branch_code | VARCHAR | |
| score_type | VARCHAR | AM/CSM/Mixed |
| total_score | DECIMAL | |
| meeting_score | DECIMAL | |
| pipeline_score | DECIMAL | |
| erv_score | DECIMAL | |
| productivity_score | DECIMAL | |
| generated_at | TIMESTAMP | |

---

# 8. AUDIT & SYSTEM

## audit_logs

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| user_id | UUID | |
| action_type | VARCHAR | Login/Create User/etc |
| action_description | TEXT | |
| ip_address | VARCHAR | |
| created_at | TIMESTAMP | |

## refresh_history

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| endpoint_name | VARCHAR | |
| refresh_status | VARCHAR | Success/Failed |
| records_processed | INTEGER | |
| error_message | TEXT | Nullable |
| started_at | TIMESTAMP | |
| completed_at | TIMESTAMP | |
| triggered_by | VARCHAR | Scheduled/Manual |

## active_sessions

| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| user_id | UUID | |
| login_time | TIMESTAMP | |
| last_activity_at | TIMESTAMP | |
| ip_address | VARCHAR | |
| user_agent | TEXT | |
| is_active | BOOLEAN | |

---

# 9. FUTURE TABLES

Future modules may include:

- revenue_ledger
- chatbot_logs
- ai_insight_cache
- exports_history
- notification_queue
- task_followups
- crm_sync_snapshots

---

# 10. SECURITY NOTES

1. Never trust frontend branch filters.
2. All dashboard queries must use user_branch_access.
3. Exports must follow branch restriction.
4. Chatbot queries must follow branch restriction.
5. Super Admin bypass rules must be explicit and controlled.
