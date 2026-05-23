import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Users API placeholder.',
    data: [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: 'Create user placeholder.',
      payload: body,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body.',
      },
      { status: 400 }
    );
  }
}
