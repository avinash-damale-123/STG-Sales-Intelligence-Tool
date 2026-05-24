import { NextResponse } from 'next/server';
import { getApiAccessScope } from '@/services/api-access-scope';
import { listUsers } from '@/services/user-service';

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

    const users = await listUsers();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load users.',
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: 'User creation is disabled until admin provisioning flow is finalized.',
    },
    { status: 501 }
  );
}
