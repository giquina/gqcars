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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        phone: true,
        emailVerified: true,
        phoneVerified: true,
        firstName: true,
        lastName: true,
        name: true,
        avatar: true,
        role: true,
        status: true,
        twoFactorEnabled: true,
        lastLogin: true,
        companyName: true,
        companyVat: true,
        address: true,
        city: true,
        postcode: true,
        country: true,
        siaLicenseNumber: true,
        siaExpiryDate: true,
        acceptedTerms: true,
        acceptedPrivacy: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user account is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account not active' },
        { status: 403 }
      )
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}