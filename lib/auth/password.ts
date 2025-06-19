import bcrypt from 'bcryptjs'
import { authConfig } from './config'
import crypto from 'crypto'

export class PasswordService {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, authConfig.password.bcryptRounds)
  }

  static async verify(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static validateStrength(password: string): {
    isValid: boolean
    errors: string[]
    score: number
  } {
    const errors: string[] = []
    let score = 0

    // Length check
    if (password.length < authConfig.password.minLength) {
      errors.push(`Password must be at least ${authConfig.password.minLength} characters long`)
    } else {
      score += 1
    }

    // Uppercase check
    if (authConfig.password.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    } else {
      score += 1
    }

    // Lowercase check
    if (authConfig.password.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    } else {
      score += 1
    }

    // Number check
    if (authConfig.password.requireNumbers && !/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    } else {
      score += 1
    }

    // Special character check
    if (authConfig.password.requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character')
    } else {
      score += 1
    }

    // Additional scoring for complexity
    if (password.length >= 12) score += 1
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1
    if (password.length >= 16) score += 1

    return {
      isValid: errors.length === 0,
      errors,
      score: Math.min(score, 5) // Max score of 5
    }
  }

  static generateRandomPassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    
    // Ensure at least one character from each required category
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
    password += '0123456789'[Math.floor(Math.random() * 10)]
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)]

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)]
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('')
  }

  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  static generateVerificationCode(length: number = 6): string {
    const digits = '0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
      code += digits[Math.floor(Math.random() * digits.length)]
    }
    return code
  }
}