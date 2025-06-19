import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setupTwoFactorSchema } from '@/lib/auth/validation'
import { TwoFactorService } from '@/lib/auth/two-factor'
import { JWTService } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // If no body provided, generate new secret
    if (!body.secret && !body.token) {
      const twoFactorSetup = await TwoFactorService.generateSecret(user.email)
      
      return NextResponse.json({
        secret: twoFactorSetup.secret,
        qrCodeUrl: twoFactorSetup.qrCodeUrl,
        backupCodes: twoFactorSetup.backupCodes
      })
    }

    // Validate setup completion
    const validationResult = setupTwoFactorSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { secret, token } = validationResult.data

    // Verify the token with the secret
    const isTokenValid = TwoFactorService.verifyToken(secret, token)
    if (!isTokenValid) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Generate backup codes
    const backupCodes = TwoFactorService.generateBackupCodes()
    const hashedBackupCodes = await TwoFactorService.hashBackupCodes(backupCodes)

    // Enable 2FA for user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: secret,
        recoveryCode: JSON.stringify(hashedBackupCodes)
      }
    })

    // Log 2FA setup
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'TWO_FACTOR_ENABLED',
        resource: 'User',
        details: { ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'Two-factor authentication enabled successfully',
      backupCodes,
      enabled: true
    })

  } catch (error) {
    console.error('2FA setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify user is authenticated
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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Disable 2FA
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        recoveryCode: null
      }
    })

    // Log 2FA disable
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'TWO_FACTOR_DISABLED',
        resource: 'User',
        details: { ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'Two-factor authentication disabled successfully',
      enabled: false
    })

  } catch (error) {
    console.error('2FA disable error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}