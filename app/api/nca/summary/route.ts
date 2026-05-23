import { NextResponse } from 'next/server';
import { getNcaSummary } from '@/services/nca-service';
import { getTemporarySuperAdminScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const data = await getNcaSummary(getTemporarySuperAdminScope());

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
