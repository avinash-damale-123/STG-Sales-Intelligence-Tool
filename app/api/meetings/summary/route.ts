import { NextResponse } from 'next/server';
import { getMeetingSummary } from '@/services/meeting-service';

export async function GET() {
  try {
    const data = await getMeetingSummary({
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
        message: 'Unable to load meetings summary.',
      },
      { status: 500 }
    );
  }
}
