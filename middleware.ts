// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  if (url.pathname.startsWith('/dashboard')) {
    // This is a placeholder for your actual authentication check.
    const isAuthenticated = true; // In a real app, you would check for a session token here.
    
    if (!isAuthenticated) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}