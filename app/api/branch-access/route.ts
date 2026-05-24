import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAccess } from '@/services/api-access-scope';

export async function POST(request: Request) {
  try {
    const admin = await requireAdminAccess();

    if (!admin.isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin access required.',
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const userId = String(body.userId || '').trim();
    const branchCodes = Array.isArray(body.branchCodes) ? body.branchCodes.map(String) : [];

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'User ID is required.',
        },
        { status: 400 }
      );
    }

    await prisma.userBranchAccess.deleteMany({
      where: { userId },
    });

    for (const branchCode of branchCodes) {
      await prisma.userBranchAccess.create({
        data: {
          userId,
          branchCode,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Branch access updated successfully.',
      data: {
        userId,
        branchCodes,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to update branch access.',
      },
      { status: 500 }
    );
  }
}
