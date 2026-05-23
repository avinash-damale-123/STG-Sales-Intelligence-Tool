import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Dashboard summary API placeholder.',
    data: {
      ervPortfolio: 0,
      ncaPipeline: 0,
      meetings: 0,
      alerts: 0,
    },
  });
}
