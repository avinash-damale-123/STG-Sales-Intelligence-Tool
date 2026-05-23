import { NextResponse } from 'next/server';
import { getDashboardSummary } from '@/services/dashboard-service';
import { getApiAccessScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const access = await getApiAccessScope();

    if (!access.isAuthenticated || !access.scope) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required.',
        },
        { status: 401 }
      );
    }

    const summary = await getDashboardSummary(access.scope);

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load dashboard summary.',
      },
      { status: 500 }
    );
  }
}
