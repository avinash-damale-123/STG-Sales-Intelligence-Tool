import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'ERV summary API placeholder.',
    data: {
      totalAccounts: 0,
      activeAccounts: 0,
      lostAccounts: 0,
      highPriorityAccounts: 0,
    },
  });
}
