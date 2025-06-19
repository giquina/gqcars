import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { forgotPasswordSchema } from '@/lib/auth/validation'
import { PasswordService } from '@/lib/auth/password'
import { EmailService } from '@/lib/auth/email'
import { SMSService } from '@/lib/auth/sms'
import { authConfig } from '@/lib/auth/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = forgotPasswordSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { identifier } = validationResult.data

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    })

    // Always return success to prevent user enumeration
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with that email or phone number, you will receive reset instructions.'
      })
    }

    // Generate reset token
    const resetToken = PasswordService.generateSecureToken()
    const resetExpiry = new Date()
    resetExpiry.setTime(resetExpiry.getTime() + authConfig.email.resetPasswordExpiry)

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: resetToken,
        expires: resetExpiry,
        type: 'PASSWORD_RESET'
      }
    })

    // Determine if identifier is email or phone
    const isEmail = identifier.includes('@')
    
    if (isEmail) {
      // Send email reset
      const emailService = new EmailService()
      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
      const emailTemplate = emailService.createPasswordResetTemplate(
        `${user.firstName} ${user.lastName}`,
        resetUrl
      )
      
      await emailService.sendEmail(user.email, emailTemplate)
    } else {
      // Send SMS reset code
      const resetCode = PasswordService.generateVerificationCode(6)
      
      // Store code in verification token (for SMS we store code instead of token)
      await prisma.verificationToken.create({
        data: {
          identifier: user.phone!,
          token: resetCode,
          expires: resetExpiry,
          type: 'PASSWORD_RESET'
        }
      })

      const smsService = new SMSService()
      await smsService.sendPasswordResetCode(user.phone!, resetCode)
    }

    // Log password reset request
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_RESET_REQUEST',
        resource: 'User',
        details: { identifier, method: isEmail ? 'email' : 'sms', ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'If an account exists with that email or phone number, you will receive reset instructions.',
      method: isEmail ? 'email' : 'sms'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}