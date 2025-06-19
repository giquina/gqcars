import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JWTService } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    let userId: string | null = null
    let sessionId: string | null = null

    // Try to get user info from token if available
    if (accessToken) {
      const jwtService = JWTService.getInstance()
      const payload = jwtService.verifyToken(accessToken)
      if (payload) {
        userId = payload.userId
        sessionId = payload.sessionId
      }
    }

    // If we have a session ID, invalidate it
    if (sessionId) {
      await prisma.session.update({
        where: { id: sessionId },
        data: { isActive: false }
      })
    }

    // Log logout if we have user ID
    if (userId) {
      await prisma.auditLog.create({
        data: {
          userId,
          action: 'USER_LOGOUT',
          resource: 'User',
          details: { sessionId, ipAddress: request.ip },
          ipAddress: request.ip,
          userAgent: request.headers.get('user-agent'),
          success: true
        }
      })
    }

    // Create response and clear cookies
    const response = NextResponse.json({
      message: 'Logged out successfully'
    })

    // Clear authentication cookies
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    })

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    
    // Still return success and clear cookies even if there's an error
    const response = NextResponse.json({
      message: 'Logged out successfully'
    })

    response.cookies.set('accessToken', '', { maxAge: 0 })
    response.cookies.set('refreshToken', '', { maxAge: 0 })

    return response
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Logout from all devices
    const accessToken = request.cookies.get('accessToken')?.value
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const jwtService = JWTService.getInstance()
    const payload = jwtService.verifyToken(accessToken)
    if (!payload || payload.type !== 'access') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Invalidate all user sessions
    await jwtService.invalidateAllUserSessions(payload.userId)

    // Log logout from all devices
    await prisma.auditLog.create({
      data: {
        userId: payload.userId,
        action: 'USER_LOGOUT_ALL_DEVICES',
        resource: 'User',
        details: { ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    // Create response and clear cookies
    const response = NextResponse.json({
      message: 'Logged out from all devices successfully'
    })

    // Clear authentication cookies
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    })

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    })

    return response

  } catch (error) {
    console.error('Logout all devices error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}