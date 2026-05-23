import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Alerts summary API placeholder.',
    data: {
      criticalAlerts: 0,
      highAlerts: 0,
      mediumAlerts: 0,
      infoAlerts: 0,
    },
  });
}
