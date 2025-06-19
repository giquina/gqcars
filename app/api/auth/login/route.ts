import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/auth/validation'
import { PasswordService } from '@/lib/auth/password'
import { JWTService } from '@/lib/auth/jwt'
import { TwoFactorService } from '@/lib/auth/two-factor'
import { authConfig } from '@/lib/auth/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = loginSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { identifier, password, rememberMe, twoFactorCode } = validationResult.data

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if account is locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      const remainingTime = Math.ceil((user.lockedUntil.getTime() - new Date().getTime()) / 60000)
      return NextResponse.json(
        { error: `Account locked. Try again in ${remainingTime} minutes.` },
        { status: 423 }
      )
    }

    // Verify password
    const isPasswordValid = await PasswordService.verify(password, user.password)
    if (!isPasswordValid) {
      // Increment failed attempts
      const newAttempts = user.loginAttempts + 1
      const updateData: any = { loginAttempts: newAttempts }
      
      if (newAttempts >= authConfig.rateLimit.maxAttempts) {
        updateData.lockedUntil = new Date(Date.now() + authConfig.rateLimit.lockoutDuration)
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData
      })

      // Log failed login
      await prisma.loginHistory.create({
        data: {
          userId: user.id,
          success: false,
          ipAddress: request.ip,
          userAgent: request.headers.get('user-agent'),
          reason: 'Invalid password'
        }
      })

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check account status
    if (user.status === 'PENDING_VERIFICATION') {
      return NextResponse.json(
        { error: 'Account not verified. Please check your email.' },
        { status: 403 }
      )
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { error: 'Account suspended. Contact support.' },
        { status: 403 }
      )
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled) {
      if (!twoFactorCode) {
        return NextResponse.json(
          { requiresTwoFactor: true, message: 'Two-factor authentication required' },
          { status: 200 }
        )
      }

      const isTwoFactorValid = TwoFactorService.verifyToken(user.twoFactorSecret!, twoFactorCode)
      if (!isTwoFactorValid) {
        // Log failed 2FA
        await prisma.loginHistory.create({
          data: {
            userId: user.id,
            success: false,
            ipAddress: request.ip,
            userAgent: request.headers.get('user-agent'),
            reason: 'Invalid 2FA code'
          }
        })

        return NextResponse.json(
          { error: 'Invalid two-factor authentication code' },
          { status: 401 }
        )
      }
    }

    // Create session
    const sessionExpiry = new Date()
    if (rememberMe) {
      sessionExpiry.setDate(sessionExpiry.getDate() + 30) // 30 days
    } else {
      sessionExpiry.setTime(sessionExpiry.getTime() + authConfig.session.inactivityTimeout) // 30 minutes
    }

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expires: sessionExpiry,
        sessionToken: PasswordService.generateSecureToken(),
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        deviceInfo: `${request.headers.get('user-agent')?.split(' ')[0]} on ${request.ip}`
      }
    })

    // Generate JWT tokens
    const jwtService = JWTService.getInstance()
    const tokens = jwtService.generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
      sessionId: session.id
    })

    // Reset login attempts and update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date()
      }
    })

    // Log successful login
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        success: true,
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent')
      }
    })

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        resource: 'User',
        details: { sessionId: session.id, ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled
      },
      session: {
        id: session.id,
        expiresAt: tokens.expiresAt
      }
    })

    // Set HTTP-only cookies for tokens
    response.cookies.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 minutes
    })

    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60 // 30 days if remember me, else 7 days
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}