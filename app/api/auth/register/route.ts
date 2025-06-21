import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate input data
    const validatedData = registerSchema.parse(data)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        phone: validatedData.phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        memberSince: true,
      }
    })

    // Log analytics event
    await prisma.analytics.create({
      data: {
        eventType: 'USER_REGISTERED',
        eventData: {
          userId: user.id,
          registrationMethod: 'email',
        },
        userId: user.id,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user,
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid registration data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}