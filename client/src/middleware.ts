import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protect /chat route
    if (request.nextUrl.pathname.startsWith('/chat')) {
      if (!session) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/auth/login';
        return NextResponse.redirect(redirectUrl);
      }
    }

    return res;
  } catch (e) {
    // If there's an error (like in static export), redirect to login
    if (request.nextUrl.pathname.startsWith('/chat')) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/chat/:path*']
}; 