import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getApiAccessScope } from '@/services/api-access-scope';
import { buildBranchWhereClause } from '@/services/access-scope';

export async function GET() {
  try {
    const access = await getApiAccessScope();

    if (!access.isAuthenticated || !access.scope) {
      return NextResponse.json(
        { success: false, message: 'Authentication required.' },
        { status: 401 }
      );
    }

    const records = await prisma.alert.findMany({
      where: buildBranchWhereClause(access.scope),
      take: 100,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, data: records });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to load alert records.' },
      { status: 500 }
    );
  }
}
