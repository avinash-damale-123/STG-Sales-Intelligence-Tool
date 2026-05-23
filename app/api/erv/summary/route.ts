import { NextResponse } from 'next/server';
import { getErvSummary } from '@/services/erv-service';

export async function GET() {
  try {
    const data = await getErvSummary({
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
        message: 'Unable to load ERV summary.',
      },
      { status: 500 }
    );
  }
}
