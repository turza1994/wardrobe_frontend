import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * TODO: Implement full auth middleware.
 *
 * Strategy for production:
 * - Verify JWT from cookie (not localStorage — localStorage is not readable in middleware)
 * - In real app, move accessToken to httpOnly cookie on login
 * - For now, this is a placeholder that allows all requests through
 *
 * Protected routes: /dashboard/*
 * Public routes: everything else
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO: Read auth token from httpOnly cookie
  // const token = request.cookies.get('accessToken')?.value;

  // Dashboard protection placeholder
  if (pathname.startsWith('/dashboard')) {
    // TODO: If no token, redirect to login
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
