import { NextResponse } from 'next/server';
import { getAlertSummary } from '@/services/alert-summary-service';
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

    const data = await getAlertSummary(access.scope);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load alerts summary.',
      },
      { status: 500 }
    );
  }
}
