import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resetPasswordSchema } from '@/lib/auth/validation'
import { PasswordService } from '@/lib/auth/password'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { token, password } = validationResult.data

    // Find reset token
    const resetToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'PASSWORD_RESET',
        used: false,
        expires: {
          gt: new Date()
        }
      }
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: resetToken.identifier },
          { phone: resetToken.identifier }
        ]
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await PasswordService.hash(password)

    // Update user password and clear lockout
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        loginAttempts: 0,
        lockedUntil: null
      }
    })

    // Mark token as used
    await prisma.verificationToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    })

    // Invalidate all existing sessions
    await prisma.session.updateMany({
      where: { userId: user.id },
      data: { isActive: false }
    })

    // Log password reset
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_RESET',
        resource: 'User',
        details: { identifier: resetToken.identifier, ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'Password reset successfully. Please log in with your new password.'
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}