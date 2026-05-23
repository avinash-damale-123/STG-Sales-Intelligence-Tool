import { NextResponse } from 'next/server';
import { getAlertSummary } from '@/services/alert-summary-service';
import { getTemporarySuperAdminScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const data = await getAlertSummary(getTemporarySuperAdminScope());

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
