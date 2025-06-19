import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emailVerificationSchema } from '@/lib/auth/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = emailVerificationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { token } = validationResult.data

    // Find verification token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'EMAIL_VERIFICATION',
        used: false,
        expires: {
          gt: new Date()
        }
      }
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user status and mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: 'ACTIVE',
        emailVerified: new Date()
      }
    })

    // Mark token as used
    await prisma.verificationToken.update({
      where: { id: verificationToken.id },
      data: { used: true }
    })

    // Log verification
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'EMAIL_VERIFICATION',
        resource: 'User',
        details: { email: user.email, ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'Email verified successfully. You can now log in.',
      verified: true
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}