import { NextResponse } from 'next/server';
import { getScorecardSummary } from '@/services/scorecard-summary-service';

export async function GET() {
  try {
    const data = await getScorecardSummary({
      isSuperAdmin: true,
      allowedBranches: [],
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load scorecard summary.',
      },
      { status: 500 }
    );
  }
}
