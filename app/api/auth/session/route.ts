import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('stg_session')?.value;

  if (!token) {
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
