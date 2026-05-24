import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getApiAccessScope } from '@/services/api-access-scope';

export async function GET() {
  try {
    const access = await getApiAccessScope();

    if (!access.isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required.',
        },
        { status: 401 }
      );
    }

    const logs = await prisma.auditLog.findMany({
      take: 100,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        actionType: true,
        actionDescription: true,
        createdAt: true,
        user: {
          select: {
            userId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: logs,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load audit activity.',
      },
      { status: 500 }
    );
  }
}
