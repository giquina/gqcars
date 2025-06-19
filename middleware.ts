import { NextRequest, NextResponse } from 'next/server'
import { JWTService } from '@/lib/auth/jwt'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/bookings',
  '/api/auth/me',
  '/api/auth/setup-2fa',
  '/api/auth/sessions',
  '/api/bookings'
]

// Define public routes that shouldn't redirect if authenticated
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email'
]

// Define admin-only routes
const adminRoutes = [
  '/admin',
  '/api/admin'
]

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>()

function rateLimitCheck(ip: string, limit: number = 100, window: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const key = ip
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, lastReset: now })
    return true
  }
  
  const data = rateLimitStore.get(key)!
  
  // Reset window if expired
  if (now - data.lastReset > window) {
    data.count = 1
    data.lastReset = now
    return true
  }
  
  // Check if limit exceeded
  if (data.count >= limit) {
    return false
  }
  
  data.count++
  return true
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // More strict rate limiting for auth endpoints
    if (pathname.startsWith('/api/auth/')) {
      if (!rateLimitCheck(ip, 20, 15 * 60 * 1000)) { // 20 requests per 15 minutes
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
    } else {
      if (!rateLimitCheck(ip, 100, 15 * 60 * 1000)) { // 100 requests per 15 minutes
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
    }
  }
  
  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  
  // Get authentication token
  const accessToken = request.cookies.get('accessToken')?.value
  
  let user = null
  if (accessToken) {
    try {
      const jwtService = JWTService.getInstance()
      const payload = jwtService.verifyToken(accessToken)
      if (payload && payload.type === 'access') {
        user = payload
      }
    } catch (error) {
      // Token is invalid, will be handled below
    }
  }
  
  // Handle admin routes
  if (isAdminRoute) {
    if (!user) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  // Handle protected routes
  if (isProtectedRoute) {
    if (!user) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Redirect authenticated users away from public auth pages
  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Add security headers
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';"
  )
  
  // Add user info to response headers for client-side use
  if (user) {
    response.headers.set('X-User-ID', user.userId)
    response.headers.set('X-User-Role', user.role)
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}