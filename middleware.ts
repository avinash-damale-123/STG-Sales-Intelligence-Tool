import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

const protectedRoutes = ['/dashboard', '/admin', '/erv', '/nca', '/meetings', '/alerts', '/scorecard', '/revenue'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('stg_session')?.value;

  if (!token || !verifyToken(token)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/erv/:path*', '/nca/:path*', '/meetings/:path*', '/alerts/:path*', '/scorecard/:path*', '/revenue/:path*'],
};
