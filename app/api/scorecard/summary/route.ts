import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Scorecard summary API placeholder.',
    data: {
      totalUsers: 0,
      topPerformers: 0,
      averageScore: 0,
      pendingReviews: 0,
    },
  });
}
