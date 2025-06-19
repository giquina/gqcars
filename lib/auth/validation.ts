import { z } from 'zod'

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Email validation
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')

// Phone validation (UK format)
export const phoneSchema = z
  .string()
  .regex(/^(\+44|0)[1-9]\d{8,9}$/, 'Please enter a valid UK phone number')
  .optional()

// Registration schema
export const registerSchema = z.object({
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  companyName: z.string().optional(),
  companyVat: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Login schema
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or phone is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
  twoFactorCode: z.string().optional(),
})

// Forgot password schema
export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, 'Email or phone is required'),
})

// Reset password schema
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Two-factor authentication setup schema
export const setupTwoFactorSchema = z.object({
  secret: z.string().min(1, 'Secret is required'),
  token: z.string().length(6, 'Token must be 6 digits'),
})

// Two-factor authentication verify schema
export const verifyTwoFactorSchema = z.object({
  token: z.string().length(6, 'Token must be 6 digits'),
})

// Email verification schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
})

// Phone verification schema
export const phoneVerificationSchema = z.object({
  phone: phoneSchema.required(),
  code: z.string().length(6, 'Verification code must be 6 digits'),
})

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Update profile schema
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  phone: phoneSchema,
  companyName: z.string().optional(),
  companyVat: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  dateOfBirth: z.string().optional(),
  siaLicenseNumber: z.string().optional(),
  siaExpiryDate: z.string().optional(),
})

// Types
export type RegisterData = z.infer<typeof registerSchema>
export type LoginData = z.infer<typeof loginSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
export type SetupTwoFactorData = z.infer<typeof setupTwoFactorSchema>
export type VerifyTwoFactorData = z.infer<typeof verifyTwoFactorSchema>
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>
export type ChangePasswordData = z.infer<typeof changePasswordSchema>
export type UpdateProfileData = z.infer<typeof updateProfileSchema>