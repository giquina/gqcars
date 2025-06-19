import { NextRequest, NextResponse } from 'next/server'
import { JWTService } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 401 }
      )
    }

    const jwtService = JWTService.getInstance()
    const newTokens = await jwtService.refreshTokens(refreshToken)

    if (!newTokens) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({
      message: 'Tokens refreshed successfully',
      expiresAt: newTokens.expiresAt
    })

    // Set new tokens in cookies
    response.cookies.set('accessToken', newTokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 minutes
    })

    response.cookies.set('refreshToken', newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response

  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}