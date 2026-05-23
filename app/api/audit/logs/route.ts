import { NextResponse } from 'next/server';
import { listAuditLogs } from '@/services/audit-service';

export async function GET() {
  try {
    const logs = await listAuditLogs();

    return NextResponse.json({
      success: true,
      data: logs,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load audit logs.',
      },
      { status: 500 }
    );
  }
}
