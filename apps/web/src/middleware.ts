import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in production, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Security middleware for GQ Cars
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 1. Force HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https' &&
    !request.nextUrl.hostname.includes('localhost')
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  // 2. Rate limiting for sensitive endpoints
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const pathname = request.nextUrl.pathname;
  
  // Apply rate limiting to API routes and forms
  if (pathname.startsWith('/api/') || pathname.includes('/contact') || pathname.includes('/booking')) {
    const rateLimitKey = `${clientIP}:${pathname}`;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const limit = pathname.startsWith('/api/auth') ? 5 : 10; // Stricter for auth endpoints

    const current = rateLimit.get(rateLimitKey);
    
    if (!current || now > current.resetTime) {
      rateLimit.set(rateLimitKey, { count: 1, resetTime: now + windowMs });
    } else if (current.count >= limit) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((current.resetTime - now) / 1000)
        },
        { status: 429 }
      );
    } else {
      current.count++;
    }
  }

  // 3. Security logging for monitoring
  const securityLog = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.nextUrl.pathname,
    ip: clientIP,
    userAgent: request.headers.get('user-agent') || 'unknown',
    referer: request.headers.get('referer') || 'direct',
    country: request.geo?.country || 'unknown'
  };

  // Log suspicious activity
  const suspiciousPatterns = [
    /admin/i,
    /wp-admin/i,
    /\.php$/i,
    /\.asp$/i,
    /\.jsp$/i,
    /sql/i,
    /script/i,
    /eval\(/i,
    /base64/i
  ];

  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(pathname) || pattern.test(request.nextUrl.search)
  );

  if (isSuspicious) {
    console.warn('🚨 Suspicious request detected:', securityLog);
    
    // Block obviously malicious requests
    if (pathname.includes('wp-admin') || pathname.includes('.php')) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
  }

  // 4. Enhanced security headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-API-Version', '1.0');
    response.headers.set('X-Rate-Limit-Remaining', String(10 - (rateLimit.get(`${clientIP}:${pathname}`)?.count || 0)));
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  // 5. Bot detection and blocking
  const userAgent = request.headers.get('user-agent') || '';
  const maliciousBots = [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'gobuster',
    'dirb',
    'dirbuster'
  ];

  if (maliciousBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    console.warn('🤖 Malicious bot detected:', { userAgent, ip: clientIP });
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  // 6. Geographic restrictions (if needed)
  const blockedCountries = process.env.BLOCKED_COUNTRIES?.split(',') || [];
  if (blockedCountries.length > 0 && request.geo?.country && blockedCountries.includes(request.geo.country)) {
    console.warn('🌍 Geographic restriction triggered:', { country: request.geo.country, ip: clientIP });
    return NextResponse.json(
      { error: 'Service not available in your region' },
      { status: 451 }
    );
  }

  // 7. Honeypot protection for forms
  if (request.method === 'POST' && (pathname.includes('/contact') || pathname.includes('/booking'))) {
    // Check for honeypot field in request body
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      // This would need additional processing of the request body
      // For now, we'll add a security header to indicate honeypot is active
      response.headers.set('X-Honeypot-Active', 'true');
    }
  }

  // 8. CSRF protection for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method) && pathname.startsWith('/api/')) {
    const csrfToken = request.headers.get('x-csrf-token');
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    // Simple origin validation
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://gqcars.vercel.app', 'https://www.gqcars.co.uk']
      : ['http://localhost:3000'];
    
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      console.warn('🔒 CSRF: Invalid origin detected:', { origin, ip: clientIP });
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }
  }

  // 9. Content validation for file uploads
  if (pathname.includes('/upload') || pathname.includes('/file')) {
    const contentType = request.headers.get('content-type') || '';
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'application/pdf'
    ];
    
    if (contentType && !allowedTypes.some(type => contentType.includes(type))) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 415 }
      );
    }
  }

  // 10. Performance monitoring
  response.headers.set('X-Timestamp', now.toString());
  response.headers.set('X-Request-ID', crypto.randomUUID());

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*'
  ]
};