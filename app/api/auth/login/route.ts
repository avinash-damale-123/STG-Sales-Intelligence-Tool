import { NextResponse } from 'next/server';

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

    return NextResponse.json({
      success: true,
      message: 'Login API placeholder created.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected server error.',
      },
      { status: 500 }
    );
  }
}
