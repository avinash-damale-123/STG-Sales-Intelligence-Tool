import { NextResponse } from 'next/server';
import { getDashboardSummary } from '@/services/dashboard-service';

export async function GET() {
  try {
    const summary = await getDashboardSummary({
      isSuperAdmin: true,
      allowedBranches: [],
    });

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
