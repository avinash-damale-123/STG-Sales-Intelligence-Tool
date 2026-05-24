import { NextResponse } from 'next/server';
import { getApiAccessScope } from '@/services/api-access-scope';
import { syncAccounts, syncAllCrmData, syncBranches, syncMeetings } from '@/services/crm-sync-service';

export async function POST(request: Request) {
  try {
    const access = await getApiAccessScope();

    if (!access.isAuthenticated || !access.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required.',
        },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const syncType = body.syncType || 'all';
    const triggeredBy = access.user.userId;

    let data;

    if (syncType === 'branches') {
      data = await syncBranches(triggeredBy);
    } else if (syncType === 'accounts') {
      data = await syncAccounts(triggeredBy);
    } else if (syncType === 'meetings') {
      data = await syncMeetings(triggeredBy);
    } else {
      data = await syncAllCrmData(triggeredBy);
    }

    return NextResponse.json({
      success: true,
      message: 'CRM sync completed.',
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'CRM sync failed.',
      },
      { status: 500 }
    );
  }
}
