import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Check user role for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (req.nextauth.token?.role !== 'ADMIN' && req.nextauth.token?.role !== 'SUPER_ADMIN') {
        return NextResponse.rewrite(new URL('/auth/unauthorized', req.url))
      }
    }

    // Check user role for staff routes
    if (req.nextUrl.pathname.startsWith('/staff')) {
      if (req.nextauth.token?.role !== 'STAFF' && 
          req.nextauth.token?.role !== 'ADMIN' && 
          req.nextauth.token?.role !== 'SUPER_ADMIN') {
        return NextResponse.rewrite(new URL('/auth/unauthorized', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/auth/signin',
          '/auth/signup',
          '/auth/verify',
          '/auth/forgot-password',
          '/auth/reset-password',
          '/auth/error',
          '/services',
          '/about',
          '/contact',
          '/privacy',
          '/terms'
        ]

        // Check if the current path is public
        const isPublicRoute = publicRoutes.some(route => 
          req.nextUrl.pathname === route || 
          req.nextUrl.pathname.startsWith('/services/')
        )

        // Allow access to public routes
        if (isPublicRoute) {
          return true
        }

        // For protected routes, require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}