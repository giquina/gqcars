import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/auth/validation'
import { PasswordService } from '@/lib/auth/password'
import { EmailService } from '@/lib/auth/email'
import { authConfig } from '@/lib/auth/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { email, phone, password, firstName, lastName, companyName, companyVat } = validationResult.data

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(phone ? [{ phone }] : [])
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email or phone number' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await PasswordService.hash(password)

    // Generate verification token
    const verificationToken = PasswordService.generateSecureToken()
    const verificationExpiry = new Date()
    verificationExpiry.setTime(verificationExpiry.getTime() + authConfig.email.verificationExpiry)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        firstName,
        lastName,
        companyName,
        companyVat,
        status: 'PENDING_VERIFICATION',
        acceptedTerms: new Date(),
        acceptedPrivacy: new Date(),
      }
    })

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: verificationExpiry,
        type: 'EMAIL_VERIFICATION'
      }
    })

    // Send verification email
    const emailService = new EmailService()
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`
    const emailTemplate = emailService.createEmailVerificationTemplate(
      `${firstName} ${lastName}`,
      verificationUrl
    )
    
    const emailSent = await emailService.sendEmail(email, emailTemplate)

    // Log registration attempt
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_REGISTRATION',
        resource: 'User',
        details: { email, phone, ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: true
      }
    })

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
      userId: user.id,
      emailSent
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    
    // Log failed registration
    await prisma.auditLog.create({
      data: {
        action: 'USER_REGISTRATION_FAILED',
        resource: 'User',
        details: { error: String(error), ipAddress: request.ip },
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        success: false
      }
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}