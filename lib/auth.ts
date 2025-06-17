import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"
import { logSecurityEvent } from "@/lib/security"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        twoFactorCode: { label: "2FA Code", type: "text" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          await logSecurityEvent({
            action: "FAILED_LOGIN_ATTEMPT",
            details: `Failed login attempt for email: ${credentials.email}`,
            ipAddress: req.headers?.["x-forwarded-for"] as string || req.ip,
            userAgent: req.headers?.["user-agent"] as string
          })
          return null
        }

        // Check if account is locked
        if (user.lockoutUntil && user.lockoutUntil > new Date()) {
          await logSecurityEvent({
            action: "LOCKED_ACCOUNT_LOGIN_ATTEMPT",
            details: `Login attempt on locked account: ${user.email}`,
            ipAddress: req.headers?.["x-forwarded-for"] as string || req.ip,
            userAgent: req.headers?.["user-agent"] as string,
            userId: user.id
          })
          return null
        }

        // Check if account is active
        if (!user.isActive) {
          await logSecurityEvent({
            action: "INACTIVE_ACCOUNT_LOGIN_ATTEMPT",
            details: `Login attempt on inactive account: ${user.email}`,
            ipAddress: req.headers?.["x-forwarded-for"] as string || req.ip,
            userAgent: req.headers?.["user-agent"] as string,
            userId: user.id
          })
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          // Increment login attempts
          const newAttempts = user.loginAttempts + 1
          const shouldLock = newAttempts >= 5
          
          await prisma.user.update({
            where: { id: user.id },
            data: {
              loginAttempts: newAttempts,
              lockoutUntil: shouldLock ? new Date(Date.now() + 30 * 60 * 1000) : undefined // 30 minutes
            }
          })

          await logSecurityEvent({
            action: "FAILED_PASSWORD_ATTEMPT",
            details: `Failed password attempt for user: ${user.email} (${newAttempts}/5)`,
            ipAddress: req.headers?.["x-forwarded-for"] as string || req.ip,
            userAgent: req.headers?.["user-agent"] as string,
            userId: user.id
          })
          return null
        }

        // Check 2FA if enabled
        if (user.twoFactorEnabled) {
          if (!credentials.twoFactorCode) {
            return null
          }

          const speakeasy = require('speakeasy')
          const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: credentials.twoFactorCode,
            window: 2
          })

          if (!verified) {
            await logSecurityEvent({
              action: "FAILED_2FA_ATTEMPT",
              details: `Failed 2FA verification for user: ${user.email}`,
              ipAddress: req.headers?.["x-forwarded-for"] as string || req.ip,
              userAgent: req.headers?.["user-agent"] as string,
              userId: user.id
            })
            return null
          }
        }

        // Reset login attempts on successful login
        await prisma.user.update({
          where: { id: user.id },
          data: {
            loginAttempts: 0,
            lockoutUntil: null,
            lastLogin: new Date()
          }
        })

        await logSecurityEvent({
          action: "SUCCESSFUL_LOGIN",
          details: `User logged in successfully: ${user.email}`,
          ipAddress: req.headers?.["x-forwarded-for"] as string || req.ip,
          userAgent: req.headers?.["user-agent"] as string,
          userId: user.id
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
          twoFactorEnabled: user.twoFactorEnabled
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.twoFactorEnabled = user.twoFactorEnabled
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.twoFactorEnabled = token.twoFactorEnabled as boolean
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Additional security checks can be added here
      return true
    }
  },
  events: {
    async signOut({ session, token }) {
      if (token?.sub) {
        await logSecurityEvent({
          action: "USER_LOGOUT",
          details: `User logged out`,
          userId: token.sub
        })
      }
    }
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      twoFactorEnabled: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    twoFactorEnabled: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    twoFactorEnabled: boolean
  }
}