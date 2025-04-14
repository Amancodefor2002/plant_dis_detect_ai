import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only protect specific routes
export function middleware(request: NextRequest) {
  // Always allow the home page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Only run middleware on specific paths (NOT including home page)
export const config = {
  matcher: [
    '/plant-detection/:path*',
    '/admin/:path*',
    '/dashboard/:path*'
  ]
}; 