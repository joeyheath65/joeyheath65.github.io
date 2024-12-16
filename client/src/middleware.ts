import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /chat route
  if (request.nextUrl.pathname.startsWith('/chat')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/chat/:path*']
}; 