import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JWTService } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
  try {
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

    const sessions = await prisma.session.findMany({
      where: {
        userId: payload.userId,
        isActive: true,
        expires: {
          gt: new Date()
        }
      },
      select: {
        id: true,
        deviceInfo: true,
        ipAddress: true,
        expires: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Mark current session
    const sessionsWithCurrent = sessions.map(session => ({
      ...session,
      isCurrent: session.id === payload.sessionId
    }))

    return NextResponse.json({ sessions: sessionsWithCurrent })

  } catch (error) {
    console.error('Get sessions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
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

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Check if session belongs to user
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: payload.userId
      }
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Prevent users from terminating their current session via this endpoint
    if (sessionId === payload.sessionId) {
      return NextResponse.json(
        { error: 'Cannot terminate current session. Use logout instead.' },
        { status: 400 }
      )
    }

    // Invalidate session
    await prisma.session.update({
      where: { id: sessionId },
      data: { isActive: false }
    })

    // Log session termination
    await prisma.auditLog.create({
      data: {
        userId: payload.userId,
        action: 'SESSION_TERMINATED',
        resource: 'Session',
        details: { terminatedSessionId: sessionId, ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'Session terminated successfully'
    })

  } catch (error) {
    console.error('Terminate session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}