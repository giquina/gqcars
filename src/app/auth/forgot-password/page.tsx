'use client'

import { useState } from 'react'
import { Mail, Shield, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '@/components/providers/SupabaseProvider'
import { ButtonLoader } from '@/components/ui/Loader'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { resetPassword, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      const { data, error } = await resetPassword(email)
      
      if (error) {
        setError(error.message || 'Failed to send reset email')
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Back to Login */}
          <div className="text-center">
            <Link 
              href="/auth/login" 
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>

          {/* Success Message */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-yellow-500 mb-2">GQ CARS LTD</h2>
            <p className="text-gray-300">SIA Licensed Transport Platform</p>
            <div className="mt-8 bg-green-500/10 border border-green-500/20 p-6 rounded-2xl">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Check Your Email</h3>
              <p className="text-gray-300 mb-4">
                We've sent a password reset link to:
              </p>
              <p className="text-yellow-500 font-medium break-all">{email}</p>
              <p className="text-gray-400 text-sm mt-4">
                Click the link in the email to reset your password. The link will expire in 1 hour.
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center text-sm text-gray-500">
            <p>Didn't receive the email? Check your spam folder or</p>
            <button
              onClick={() => setSuccess(false)}
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Login */}
        <div className="text-center">
          <Link 
            href="/auth/login" 
            className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-yellow-500 mb-2">GQ CARS LTD</h2>
          <p className="text-gray-300">SIA Licensed Transport Platform</p>
          <p className="text-lg text-white mt-4 mb-2">Reset Password</p>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        {/* Reset Form */}
        <form className="space-y-6 bg-gray-900/50 p-8 rounded-2xl border border-gray-800" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Shield className="h-5 w-5 text-black group-hover:text-gray-800" />
              </span>
              {loading ? (
                <div className="flex items-center">
                  <ButtonLoader size="sm" />
                  <span className="ml-2">Sending reset link...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-yellow-500 hover:text-yellow-400 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Secure SIA Licensed Platform</p>
          <p>Your security is our priority</p>
        </div>
      </div>
    </div>
  )
} 