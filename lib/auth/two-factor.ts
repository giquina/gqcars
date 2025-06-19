import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { authConfig } from './config'
import { PasswordService } from './password'

export interface TwoFactorSetup {
  secret: string
  qrCodeUrl: string
  backupCodes: string[]
}

export class TwoFactorService {
  static generateSecret(userEmail: string): Promise<TwoFactorSetup> {
    return new Promise(async (resolve, reject) => {
      try {
        // Generate secret
        const secret = speakeasy.generateSecret({
          name: `${authConfig.twoFactor.issuer} (${userEmail})`,
          issuer: authConfig.twoFactor.issuer,
          length: 32
        })

        // Generate QR code
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || '')

        // Generate backup codes
        const backupCodes = this.generateBackupCodes()

        resolve({
          secret: secret.base32 || '',
          qrCodeUrl,
          backupCodes
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  static verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: authConfig.twoFactor.window
    })
  }

  static generateBackupCodes(): string[] {
    const codes: string[] = []
    for (let i = 0; i < authConfig.twoFactor.backupCodeCount; i++) {
      codes.push(PasswordService.generateVerificationCode(authConfig.twoFactor.backupCodeLength))
    }
    return codes
  }

  static async hashBackupCodes(codes: string[]): Promise<string[]> {
    const hashedCodes: string[] = []
    for (const code of codes) {
      hashedCodes.push(await PasswordService.hash(code))
    }
    return hashedCodes
  }

  static async verifyBackupCode(code: string, hashedCodes: string[]): Promise<boolean> {
    for (const hashedCode of hashedCodes) {
      if (await PasswordService.verify(code, hashedCode)) {
        return true
      }
    }
    return false
  }

  static getCurrentToken(secret: string): string {
    return speakeasy.totp({
      secret,
      encoding: 'base32'
    })
  }

  static getTimeRemaining(): number {
    const epoch = Math.round(new Date().getTime() / 1000.0)
    const countDown = 30 - (epoch % 30)
    return countDown
  }
}