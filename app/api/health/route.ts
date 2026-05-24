import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks = {
    app: 'ok',
    database: 'unknown',
    crmBaseUrlConfigured: Boolean(process.env.CRM_API_BASE_URL),
    crmApiKeyConfigured: Boolean(process.env.CRM_API_KEY),
    jwtSecretConfigured: Boolean(process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = 'ok';
  } catch {
    checks.database = 'failed';
  }

  const isHealthy = checks.database === 'ok' && checks.jwtSecretConfigured;

  return NextResponse.json(
    {
      success: isHealthy,
      status: isHealthy ? 'healthy' : 'degraded',
      checks,
    },
    { status: isHealthy ? 200 : 503 }
  );
}
