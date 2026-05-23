import { NextResponse } from 'next/server';
import { getScorecardSummary } from '@/services/scorecard-summary-service';
import { getTemporarySuperAdminScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const data = await getScorecardSummary(getTemporarySuperAdminScope());

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
