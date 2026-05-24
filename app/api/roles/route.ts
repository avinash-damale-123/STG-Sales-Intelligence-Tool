import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAccess } from '@/services/api-access-scope';

export async function GET() {
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

    const roles = await prisma.role.findMany({
      select: {
        id: true,
        roleName: true,
        isSuperAdmin: true,
        createdAt: true,
      },
      orderBy: {
        roleName: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: roles,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load roles.',
      },
      { status: 500 }
    );
  }
}

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
    const roleName = String(body.roleName || '').trim();
    const isSuperAdmin = Boolean(body.isSuperAdmin);

    if (!roleName) {
      return NextResponse.json(
        {
          success: false,
          message: 'Role name is required.',
        },
        { status: 400 }
      );
    }

    const role = await prisma.role.upsert({
      where: { roleName },
      update: { isSuperAdmin },
      create: { roleName, isSuperAdmin },
    });

    return NextResponse.json({
      success: true,
      message: 'Role saved successfully.',
      data: role,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unable to save role.',
      },
      { status: 500 }
    );
  }
}
