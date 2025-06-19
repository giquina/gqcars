import jwt from 'jsonwebtoken'
import { authConfig } from './config'
import { prisma } from '../prisma'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  sessionId: string
  type: 'access' | 'refresh'
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

export class JWTService {
  private static instance: JWTService
  
  static getInstance(): JWTService {
    if (!JWTService.instance) {
      JWTService.instance = new JWTService()
    }
    return JWTService.instance
  }

  generateTokenPair(payload: Omit<JWTPayload, 'type'>): TokenPair {
    const accessTokenPayload: JWTPayload = {
      ...payload,
      type: 'access'
    }

    const refreshTokenPayload: JWTPayload = {
      ...payload,
      type: 'refresh'
    }

    const accessToken = jwt.sign(
      accessTokenPayload,
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn }
    )

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.refreshExpiresIn }
    )

    const expiresAt = new Date()
    expiresAt.setTime(expiresAt.getTime() + (15 * 60 * 1000)) // 15 minutes

    return {
      accessToken,
      refreshToken,
      expiresAt
    }
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, authConfig.jwt.secret) as JWTPayload
    } catch (error) {
      return null
    }
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair | null> {
    try {
      const payload = this.verifyToken(refreshToken)
      
      if (!payload || payload.type !== 'refresh') {
        return null
      }

      // Check if session is still active
      const session = await prisma.session.findUnique({
        where: { id: payload.sessionId },
        include: { user: true }
      })

      if (!session || !session.isActive) {
        return null
      }

      // Generate new token pair
      const newTokenPair = this.generateTokenPair({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        sessionId: payload.sessionId
      })

      // Update session expiry
      await prisma.session.update({
        where: { id: payload.sessionId },
        data: { expires: newTokenPair.expiresAt }
      })

      return newTokenPair
    } catch (error) {
      console.error('Token refresh error:', error)
      return null
    }
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: { id: sessionId },
      data: { isActive: false }
    })
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { userId },
      data: { isActive: false }
    })
  }
}