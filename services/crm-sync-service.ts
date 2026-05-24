import { prisma } from '@/lib/prisma';
import { fetchAccounts, fetchBranches, fetchMeetings } from './crm-api';
import { createRefreshHistory } from './refresh-history-service';

function asArray(payload: unknown): any[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const objectPayload = payload as Record<string, unknown>;
    const possibleKeys = ['data', 'result', 'results', 'records', 'items'];

    for (const key of possibleKeys) {
      if (Array.isArray(objectPayload[key])) {
        return objectPayload[key] as any[];
      }
    }
  }

  return [];
}

function valueOf(record: Record<string, any>, keys: string[], fallback = '') {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
      return String(record[key]);
    }
  }

  return fallback;
}

function dateValue(record: Record<string, any>, keys: string[]) {
  const rawValue = valueOf(record, keys);

  if (!rawValue) {
    return null;
  }

  const date = new Date(rawValue);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function syncBranches(triggeredBy = 'Manual') {
  try {
    const payload = await fetchBranches();
    const records = asArray(payload);

    for (const record of records) {
      const branchCode = valueOf(record, ['branchCode', 'branch_code', 'code', 'id']);

      if (!branchCode) {
        continue;
      }

      await prisma.branch.upsert({
        where: { branchCode },
        update: {
          branchName: valueOf(record, ['branchName', 'branch_name', 'name'], branchCode),
          regionName: valueOf(record, ['regionName', 'region_name', 'region']),
          countryName: valueOf(record, ['countryName', 'country_name', 'country']),
          status: valueOf(record, ['status'], 'Active'),
        },
        create: {
          branchCode,
          branchName: valueOf(record, ['branchName', 'branch_name', 'name'], branchCode),
          regionName: valueOf(record, ['regionName', 'region_name', 'region']),
          countryName: valueOf(record, ['countryName', 'country_name', 'country']),
          status: valueOf(record, ['status'], 'Active'),
        },
      });
    }

    await createRefreshHistory({
      endpointName: 'branch_list_BI',
      refreshStatus: 'Success',
      recordsProcessed: records.length,
      triggeredBy,
    });

    return { recordsProcessed: records.length };
  } catch (error) {
    await createRefreshHistory({
      endpointName: 'branch_list_BI',
      refreshStatus: 'Failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      triggeredBy,
    });

    throw error;
  }
}

export async function syncAccounts(triggeredBy = 'Manual') {
  try {
    const payload = await fetchAccounts(1, 5000);
    const records = asArray(payload);

    for (const record of records) {
      const crmAccountId = valueOf(record, ['crmAccountId', 'crm_account_id', 'account_id', 'id']);
      const branchCode = valueOf(record, ['branchCode', 'branch_code', 'branch']);

      if (!crmAccountId || !branchCode) {
        continue;
      }

      await prisma.account.upsert({
        where: { crmAccountId },
        update: {
          accountName: valueOf(record, ['accountName', 'account_name', 'client_name', 'name'], crmAccountId),
          accountType: valueOf(record, ['accountType', 'account_type', 'type'], 'Unknown'),
          branchCode,
          ownerUserId: valueOf(record, ['ownerUserId', 'owner_user_id', 'owner']),
          stageName: valueOf(record, ['stageName', 'stage_name', 'stage']),
          status: valueOf(record, ['status']),
          priorityLevel: valueOf(record, ['priorityLevel', 'priority_level', 'priority']),
          noContactDays: Number(valueOf(record, ['noContactDays', 'no_contact_days'], '0')) || null,
          lastContactDate: dateValue(record, ['lastContactDate', 'last_contact_date']),
        },
        create: {
          crmAccountId,
          accountName: valueOf(record, ['accountName', 'account_name', 'client_name', 'name'], crmAccountId),
          accountType: valueOf(record, ['accountType', 'account_type', 'type'], 'Unknown'),
          branchCode,
          ownerUserId: valueOf(record, ['ownerUserId', 'owner_user_id', 'owner']),
          stageName: valueOf(record, ['stageName', 'stage_name', 'stage']),
          status: valueOf(record, ['status']),
          priorityLevel: valueOf(record, ['priorityLevel', 'priority_level', 'priority']),
          noContactDays: Number(valueOf(record, ['noContactDays', 'no_contact_days'], '0')) || null,
          lastContactDate: dateValue(record, ['lastContactDate', 'last_contact_date']),
        },
      });
    }

    await createRefreshHistory({
      endpointName: 'account_view',
      refreshStatus: 'Success',
      recordsProcessed: records.length,
      triggeredBy,
    });

    return { recordsProcessed: records.length };
  } catch (error) {
    await createRefreshHistory({
      endpointName: 'account_view',
      refreshStatus: 'Failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      triggeredBy,
    });

    throw error;
  }
}

export async function syncMeetings(triggeredBy = 'Manual') {
  try {
    const payload = await fetchMeetings(1, 5000);
    const records = asArray(payload);

    for (const record of records) {
      const crmMeetingId = valueOf(record, ['crmMeetingId', 'crm_meeting_id', 'meeting_id', 'id']);
      const branchCode = valueOf(record, ['branchCode', 'branch_code', 'branch']);

      if (!crmMeetingId || !branchCode) {
        continue;
      }

      await prisma.meeting.upsert({
        where: { crmMeetingId },
        update: {
          branchCode,
          ownerUserId: valueOf(record, ['ownerUserId', 'owner_user_id', 'owner']),
          meetingType: valueOf(record, ['meetingType', 'meeting_type', 'type']),
          meetingStatus: valueOf(record, ['meetingStatus', 'meeting_status', 'status']),
          meetingDate: dateValue(record, ['meetingDate', 'meeting_date', 'date']),
        },
        create: {
          crmMeetingId,
          branchCode,
          ownerUserId: valueOf(record, ['ownerUserId', 'owner_user_id', 'owner']),
          meetingType: valueOf(record, ['meetingType', 'meeting_type', 'type']),
          meetingStatus: valueOf(record, ['meetingStatus', 'meeting_status', 'status']),
          meetingDate: dateValue(record, ['meetingDate', 'meeting_date', 'date']),
        },
      });
    }

    await createRefreshHistory({
      endpointName: 'meeting_visit_BI',
      refreshStatus: 'Success',
      recordsProcessed: records.length,
      triggeredBy,
    });

    return { recordsProcessed: records.length };
  } catch (error) {
    await createRefreshHistory({
      endpointName: 'meeting_visit_BI',
      refreshStatus: 'Failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      triggeredBy,
    });

    throw error;
  }
}

export async function syncAllCrmData(triggeredBy = 'Manual') {
  const branches = await syncBranches(triggeredBy);
  const accounts = await syncAccounts(triggeredBy);
  const meetings = await syncMeetings(triggeredBy);

  return {
    branches,
    accounts,
    meetings,
  };
}
