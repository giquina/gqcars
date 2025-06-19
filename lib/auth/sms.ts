import twilio from 'twilio'
import { authConfig } from './config'

export class SMSService {
  private client: twilio.Twilio
  
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    
    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials not configured')
    }
    
    this.client = twilio(accountSid, authToken)
  }

  async sendVerificationCode(phone: string, code: string): Promise<boolean> {
    try {
      const message = `Your GQ Cars verification code is: ${code}. This code expires in 10 minutes. Do not share this code with anyone.`
      
      await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER || '+441234567890',
        to: this.formatPhoneNumber(phone)
      })
      
      return true
    } catch (error) {
      console.error('SMS sending error:', error)
      return false
    }
  }

  async sendTwoFactorCode(phone: string, code: string): Promise<boolean> {
    try {
      const message = `GQ Cars Security Alert: Your 2FA code is: ${code}. Valid for 10 minutes. If you didn't request this, contact us immediately.`
      
      await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER || '+441234567890',
        to: this.formatPhoneNumber(phone)
      })
      
      return true
    } catch (error) {
      console.error('SMS 2FA sending error:', error)
      return false
    }
  }

  async sendPasswordResetCode(phone: string, code: string): Promise<boolean> {
    try {
      const message = `GQ Cars: Your password reset code is: ${code}. Valid for 10 minutes. If you didn't request this, ignore this message.`
      
      await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER || '+441234567890',
        to: this.formatPhoneNumber(phone)
      })
      
      return true
    } catch (error) {
      console.error('SMS password reset sending error:', error)
      return false
    }
  }

  async sendLoginAlert(phone: string, location: string, deviceInfo: string): Promise<boolean> {
    try {
      const message = `GQ Cars Security Alert: New login detected from ${location} on ${deviceInfo}. If this wasn't you, secure your account immediately.`
      
      await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER || '+441234567890',
        to: this.formatPhoneNumber(phone)
      })
      
      return true
    } catch (error) {
      console.error('SMS login alert sending error:', error)
      return false
    }
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')
    
    // If starts with 44, it's already in international format
    if (cleaned.startsWith('44')) {
      return `+${cleaned}`
    }
    
    // If starts with 0, replace with +44
    if (cleaned.startsWith('0')) {
      return `+44${cleaned.substring(1)}`
    }
    
    // If it's just the number without country code, add +44
    if (cleaned.length === 10) {
      return `+44${cleaned}`
    }
    
    return `+${cleaned}`
  }

  validatePhoneNumber(phone: string): boolean {
    const ukPhoneRegex = /^(\+44|0)[1-9]\d{8,9}$/
    return ukPhoneRegex.test(phone)
  }
}