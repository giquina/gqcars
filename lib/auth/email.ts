import nodemailer from 'nodemailer'
import { authConfig } from './config'

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export class EmailService {
  private transporter: nodemailer.Transporter
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    })
  }

  async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@gqcars.co.uk',
        to,
        subject: template.subject,
        html: template.html,
        text: template.text
      })
      return true
    } catch (error) {
      console.error('Email sending error:', error)
      return false
    }
  }

  createEmailVerificationTemplate(name: string, verificationUrl: string): EmailTemplate {
    return {
      subject: 'Verify Your Email - GQ Cars LTD',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GQ Cars LTD</h1>
              <p>Premium Security & Transport Services</p>
            </div>
            <div class="content">
              <h2>Welcome, ${name}!</h2>
              <p>Thank you for registering with GQ Cars LTD. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
              <p><a href="${verificationUrl}">${verificationUrl}</a></p>
              <p>This verification link will expire in 24 hours for security reasons.</p>
              <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>GQ Cars LTD - Professional Security & Transport Solutions</p>
              <p>This email was sent from an unmonitored address. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to GQ Cars LTD, ${name}!
        
        To complete your registration, please verify your email address by visiting:
        ${verificationUrl}
        
        This link will expire in 24 hours.
        
        If you didn't create an account with us, please ignore this email.
        
        GQ Cars LTD - Professional Security & Transport Solutions
      `
    }
  }

  createPasswordResetTemplate(name: string, resetUrl: string): EmailTemplate {
    return {
      subject: 'Password Reset Request - GQ Cars LTD',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GQ Cars LTD</h1>
              <p>Premium Security & Transport Services</p>
            </div>
            <div class="content">
              <h2>Password Reset Request</h2>
              <p>Hello ${name},</p>
              <p>We received a request to reset your password. If you made this request, click the button below to reset your password:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>
              <div class="warning">
                <strong>Security Notice:</strong>
                <ul>
                  <li>This link will expire in 1 hour for security reasons</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Your password will remain unchanged unless you click the link above</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <p>GQ Cars LTD - Professional Security & Transport Solutions</p>
              <p>This email was sent from an unmonitored address. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request - GQ Cars LTD
        
        Hello ${name},
        
        We received a request to reset your password. If you made this request, visit:
        ${resetUrl}
        
        This link will expire in 1 hour.
        
        If you didn't request this reset, please ignore this email.
        
        GQ Cars LTD - Professional Security & Transport Solutions
      `
    }
  }

  createTwoFactorTemplate(name: string, code: string): EmailTemplate {
    return {
      subject: 'Two-Factor Authentication Code - GQ Cars LTD',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Two-Factor Authentication</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background-color: #f9f9f9; text-align: center; }
            .code { font-size: 32px; font-weight: bold; background-color: #007bff; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; letter-spacing: 5px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GQ Cars LTD</h1>
              <p>Premium Security & Transport Services</p>
            </div>
            <div class="content">
              <h2>Two-Factor Authentication</h2>
              <p>Hello ${name},</p>
              <p>Your two-factor authentication code is:</p>
              <div class="code">${code}</div>
              <p>This code will expire in 10 minutes.</p>
              <p>If you didn't request this code, please contact our security team immediately.</p>
            </div>
            <div class="footer">
              <p>GQ Cars LTD - Professional Security & Transport Solutions</p>
              <p>This email was sent from an unmonitored address. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Two-Factor Authentication - GQ Cars LTD
        
        Hello ${name},
        
        Your two-factor authentication code is: ${code}
        
        This code will expire in 10 minutes.
        
        If you didn't request this code, please contact our security team.
        
        GQ Cars LTD - Professional Security & Transport Solutions
      `
    }
  }
}