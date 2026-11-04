import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/@') || pathname.startsWith('/%40')) {
    const rawSlug = pathname.startsWith('/@') ? pathname.slice(2) : pathname.slice(4);
    const slug = decodeURIComponent(rawSlug).trim();
    if (slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/linktree/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|logo.png).*)',
  ],
};
