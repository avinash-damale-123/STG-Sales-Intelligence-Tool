import { NextResponse } from 'next/server';
import { getMeetingSummary } from '@/services/meeting-service';
import { getTemporarySuperAdminScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const data = await getMeetingSummary(getTemporarySuperAdminScope());

    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load meetings summary.',
      },
      { status: 500 }
    );
  }
}
