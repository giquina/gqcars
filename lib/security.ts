import { prisma } from '@/lib/prisma'

interface SecurityLogData {
  action: string
  details?: string
  ipAddress?: string
  userAgent?: string
  userId?: string
}

export async function logSecurityEvent(data: SecurityLogData) {
  try {
    await prisma.securityLog.create({
      data: {
        action: data.action,
        details: data.details,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        userId: data.userId,
      }
    })
  } catch (error) {
    console.error('Failed to log security event:', error)
  }
}

export async function getSecurityLogs(userId?: string, limit: number = 50) {
  try {
    return await prisma.securityLog.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            email: true,
            name: true,
          }
        }
      }
    })
  } catch (error) {
    console.error('Failed to fetch security logs:', error)
    return []
  }
}

export async function checkRateLimit(identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
  const windowStart = new Date(Date.now() - windowMs)
  
  const attempts = await prisma.securityLog.count({
    where: {
      ipAddress: identifier,
      action: {
        in: ['FAILED_LOGIN_ATTEMPT', 'FAILED_PASSWORD_ATTEMPT', 'FAILED_2FA_ATTEMPT']
      },
      createdAt: {
        gte: windowStart
      }
    }
  })
  
  return attempts < maxAttempts
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>\"']/g, '').trim()
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

export function generateSecureToken(): string {
  const crypto = require('crypto')
  return crypto.randomBytes(32).toString('hex')
}