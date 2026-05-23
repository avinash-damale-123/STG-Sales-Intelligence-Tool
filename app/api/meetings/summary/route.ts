import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Meetings summary API placeholder.',
    data: {
      totalMeetings: 0,
      heldMeetings: 0,
      marketingMeetings: 0,
      financeMeetings: 0,
    },
  });
}
