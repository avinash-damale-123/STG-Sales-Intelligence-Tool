import { NextResponse } from 'next/server';
import { getAlertSummary } from '@/services/alert-summary-service';

export async function GET() {
  try {
    const data = await getAlertSummary({
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
        message: 'Unable to load alerts summary.',
      },
      { status: 500 }
    );
  }
}
