import { NextResponse } from 'next/server';
import { getDashboardSummary } from '@/services/dashboard-service';
import { getTemporarySuperAdminScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const summary = await getDashboardSummary(getTemporarySuperAdminScope());

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
