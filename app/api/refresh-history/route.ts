import { NextResponse } from 'next/server';
import { getApiAccessScope } from '@/services/api-access-scope';
import { listRefreshHistory } from '@/services/refresh-history-service';

export async function GET() {
  try {
    const access = await getApiAccessScope();

    if (!access.isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required.',
        },
        { status: 401 }
      );
    }

    const history = await listRefreshHistory();

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load refresh history.',
      },
      { status: 500 }
    );
  }
}
