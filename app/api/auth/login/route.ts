import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { createAuditLog } from '@/services/audit-service';
import { findUserForLogin, validateUserPassword } from '@/services/user-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    if (!userId || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'User ID and password are required.',
        },
        { status: 400 }
      );
    }

    const user = await findUserForLogin(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid login credentials.',
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await validateUserPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      await createAuditLog({
        userId: user.id,
        actionType: 'LOGIN_FAILED',
        actionDescription: 'Invalid password attempt.',
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Invalid login credentials.',
        },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user.id,
      userId: user.userId,
      role: user.role?.roleName || 'User',
      allowedBranches: user.role?.isSuperAdmin
        ? []
        : user.branchAccess.map((access: { branchCode: string }) => access.branchCode),
    });

    await createAuditLog({
      userId: user.id,
      actionType: 'LOGIN_SUCCESS',
      actionDescription: 'User logged in successfully.',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      data: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role?.roleName || 'User',
        isSuperAdmin: Boolean(user.role?.isSuperAdmin),
        allowedBranches: user.role?.isSuperAdmin
          ? []
          : user.branchAccess.map((access) => access.branchCode),
      },
    });

    response.cookies.set('stg_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected server error.',
      },
      { status: 500 }
    );
  }
}
