import { NextResponse } from 'next/server';
import { getErvSummary } from '@/services/erv-service';
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

    const data = await getErvSummary(access.scope);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load ERV summary.',
      },
      { status: 500 }
    );
  }
}
