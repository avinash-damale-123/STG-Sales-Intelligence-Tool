import { NextResponse } from 'next/server';
import { listRefreshHistory } from '@/services/refresh-history-service';

export async function GET() {
  try {
    const history = await listRefreshHistory();

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load refresh history.',
      },
      { status: 500 }
    );
  }
}
