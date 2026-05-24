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

    const branches = await prisma.branch.findMany({
      select: {
        id: true,
        branchCode: true,
        branchName: true,
        regionName: true,
        countryName: true,
        status: true,
        updatedAt: true,
      },
      orderBy: {
        branchName: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: branches,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load branches.',
      },
      { status: 500 }
    );
  }
}
