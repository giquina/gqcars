import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { isValidEmail, isStrongPassword, sanitizeInput, generateSecureToken } from '@/lib/security'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email.toLowerCase())

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters with uppercase, lowercase, number and special character' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Generate verification token
    const verificationToken = generateSecureToken()

    // Create user
    const user = await prisma.user.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: false, // Account inactive until email verified
      }
    })

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: sanitizedEmail,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    })

    // Send verification email
    try {
      await sendVerificationEmail(sanitizedEmail, verificationToken, sanitizedName)
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Continue even if email fails - user can request new verification
    }

    // Log user creation
    await prisma.securityLog.create({
      data: {
        action: 'USER_REGISTRATION',
        details: `New user registered: ${sanitizedEmail}`,
        userId: user.id
      }
    })

    return NextResponse.json(
      { 
        message: 'Account created successfully. Please check your email to verify your account.',
        userId: user.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Sign-up error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}