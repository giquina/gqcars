import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendVerificationEmail(
  email: string,
  token: string,
  name: string
) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your GQ Security Account</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 40px 0; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .content { background: #1e293b; padding: 40px; border-radius: 12px; border: 1px solid #334155; }
        .button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        .security-notice { background: #1e3a8a; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🔐</div>
          <h1 style="margin: 0; font-size: 28px;">GQ Security Services</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Security Solutions</p>
        </div>
        
        <div class="content">
          <h2 style="color: #ffffff; margin-top: 0;">Welcome${name ? `, ${name}` : ''}!</h2>
          <p style="color: #cbd5e1; line-height: 1.6;">
            Thank you for creating your GQ Security Services account. To ensure the security of your account, 
            please verify your email address by clicking the button below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <div class="security-notice">
            <h3 style="color: #ffffff; margin-top: 0; font-size: 16px;">🛡️ Security Notice</h3>
            <p style="color: #cbd5e1; margin-bottom: 0; font-size: 14px;">
              This verification link will expire in 24 hours. If you didn't create this account, 
              please ignore this email or contact our security team immediately.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="word-break: break-all; color: #3b82f6;">${verificationUrl}</span>
          </p>
        </div>
        
        <div class="footer">
          <p>GQ Security Services - Professional Close Protection & Private Hire</p>
          <p>This email was sent to ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
    Welcome to GQ Security Services!
    
    Thank you for creating your account${name ? `, ${name}` : ''}. 
    
    To verify your email address, please visit:
    ${verificationUrl}
    
    This link will expire in 24 hours.
    
    If you didn't create this account, please ignore this email.
    
    --
    GQ Security Services
    Professional Close Protection & Private Hire
  `

  try {
    await transporter.sendMail({
      from: `"GQ Security Services" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Verify Your GQ Security Account',
      text: textContent,
      html: htmlContent,
    })
  } catch (error) {
    console.error('Email sending failed:', error)
    throw new Error('Failed to send verification email')
  }
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  name: string
) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your GQ Security Password</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 40px 0; background: linear-gradient(135deg, #dc2626, #ea580c); border-radius: 12px; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .content { background: #1e293b; padding: 40px; border-radius: 12px; border: 1px solid #334155; }
        .button { display: inline-block; background: linear-gradient(135deg, #dc2626, #ea580c); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        .security-notice { background: #7c2d12; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🔐</div>
          <h1 style="margin: 0; font-size: 28px;">Password Reset Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">GQ Security Services</p>
        </div>
        
        <div class="content">
          <h2 style="color: #ffffff; margin-top: 0;">Reset Your Password${name ? `, ${name}` : ''}</h2>
          <p style="color: #cbd5e1; line-height: 1.6;">
            We received a request to reset the password for your GQ Security Services account. 
            If you made this request, click the button below to reset your password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          
          <div class="security-notice">
            <h3 style="color: #ffffff; margin-top: 0; font-size: 16px;">🔒 Security Notice</h3>
            <p style="color: #cbd5e1; margin-bottom: 0; font-size: 14px;">
              This password reset link will expire in 1 hour. If you didn't request this reset, 
              please secure your account immediately and contact our security team.
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="word-break: break-all; color: #dc2626;">${resetUrl}</span>
          </p>
        </div>
        
        <div class="footer">
          <p>GQ Security Services - Professional Close Protection & Private Hire</p>
          <p>This email was sent to ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
    Password Reset Request - GQ Security Services
    
    Hello${name ? ` ${name}` : ''},
    
    We received a request to reset your password. To reset your password, please visit:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this reset, please secure your account immediately.
    
    --
    GQ Security Services
    Professional Close Protection & Private Hire
  `

  try {
    await transporter.sendMail({
      from: `"GQ Security Services" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Reset Your GQ Security Password',
      text: textContent,
      html: htmlContent,
    })
  } catch (error) {
    console.error('Password reset email failed:', error)
    throw new Error('Failed to send password reset email')
  }
}

export async function sendSecurityAlert(
  email: string,
  alertType: string,
  details: string,
  name?: string
) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Security Alert - GQ Security</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 40px 0; background: linear-gradient(135deg, #dc2626, #b91c1c); border-radius: 12px; margin-bottom: 30px; }
        .content { background: #1e293b; padding: 40px; border-radius: 12px; border: 1px solid #334155; }
        .alert { background: #7f1d1d; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">⚠️ Security Alert</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">GQ Security Services</p>
        </div>
        
        <div class="content">
          <h2 style="color: #ffffff; margin-top: 0;">Security Alert${name ? ` - ${name}` : ''}</h2>
          
          <div class="alert">
            <h3 style="color: #ffffff; margin-top: 0; font-size: 16px;">🚨 ${alertType}</h3>
            <p style="color: #fecaca; margin-bottom: 0; font-size: 14px;">${details}</p>
          </div>
          
          <p style="color: #cbd5e1; line-height: 1.6;">
            If this was you, no action is needed. If you don't recognize this activity, 
            please secure your account immediately by changing your password and enabling 
            two-factor authentication.
          </p>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            Time: ${new Date().toLocaleString()}<br>
            Account: ${email}
          </p>
        </div>
        
        <div class="footer">
          <p>GQ Security Services - Professional Close Protection & Private Hire</p>
          <p>This is an automated security notification</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: `"GQ Security Alert" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Security Alert - ${alertType}`,
      html: htmlContent,
    })
  } catch (error) {
    console.error('Security alert email failed:', error)
    // Don't throw here - security alerts are best effort
  }
}