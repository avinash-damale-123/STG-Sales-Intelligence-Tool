import { NextResponse } from 'next/server';
import { getNcaSummary } from '@/services/nca-service';

export async function GET() {
  try {
    const data = await getNcaSummary({
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
        message: 'Unable to load NCA summary.',
      },
      { status: 500 }
    );
  }
}
