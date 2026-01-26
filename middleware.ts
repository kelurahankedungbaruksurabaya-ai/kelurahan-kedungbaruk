import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah user mengakses halaman admin (kecuali login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Cek token dari cookies
    const token = request.cookies.get('admin_token');

    // Kalau ga ada token, redirect ke login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Kalau sudah login tapi akses /admin/login, redirect ke dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token');
    if (token) {
      const dashboardUrl = new URL('/admin', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Konfigurasi path mana aja yang di-protect
export const config = {
  matcher: [
    '/admin/:path*',  // Semua halaman yang mulai dengan /admin
  ],
};