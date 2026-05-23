import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'NCA summary API placeholder.',
    data: {
      totalPipeline: 0,
      hotLeads: 0,
      convertedAccounts: 0,
      proposalStageAccounts: 0,
    },
  });
}
