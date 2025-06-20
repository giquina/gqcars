'use client'

import { useState, useEffect } from 'react'
import { Phone, Menu, X, User, LogIn, UserPlus, Shield, Mail, Lock } from 'lucide-react'
import MobileMenu from './MobileMenu'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  onSwitchMode: (mode: 'signin' | 'signup') => void
}

function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Auth submit:', { mode, formData })
    onClose()
  }

  const handleSocialAuth = (provider: string) => {
    console.log('Social auth:', provider)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-amber-500/10" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-gq-blue to-gq-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Join GQ Security'}
            </h2>
            <p className="text-gray-400">
              {mode === 'signin' 
                ? 'Sign in to access your account and bookings' 
                : 'Create your account to book premium security services'
              }
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <button
              onClick={() => handleSocialAuth('facebook')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none text-white"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none text-white"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none text-white"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'signin' && (
              <div className="text-right">
                <button type="button" className="text-gq-gold hover:text-gq-gold/80 text-sm">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gq-blue to-gq-gold text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-400">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => onSwitchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-gq-gold hover:text-gq-gold/80 font-medium"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          {mode === 'signup' && (
            <p className="text-xs text-gray-500 text-center mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'signin' | 'signup' }>({
    open: false,
    mode: 'signin'
  })
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModal({ open: true, mode })
    setIsMobileMenuOpen(false)
  }

  const closeAuthModal = () => {
    setAuthModal({ open: false, mode: 'signin' })
  }

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gq-black/90 backdrop-blur-lg border-b border-gq-accent/10' : 'bg-gq-black/90 backdrop-blur-lg'
      }`}>
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gq-blue to-gq-gold rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <a href="/" className="text-xl font-bold text-gq-gold">GQ CARS LTD</a>
              <p className="text-xs text-gray-400">Professional • SIA Licensed • Smart Technology</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-wider">
            <a href="/services/close-protection" className="hover:text-gq-gold transition-colors">Close Protection</a>
            <a href="/services/private-hire" className="hover:text-gq-gold transition-colors">Private Hire</a>
            <a href="/services/corporate" className="hover:text-gq-gold transition-colors">Corporate</a>
            <a href="/services/weddings" className="hover:text-gq-gold transition-colors">Weddings</a>
            <a href="/services/vip" className="hover:text-gq-gold transition-colors">VIP Services</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:07407655203"
              className="flex items-center gap-2 text-gq-gold hover:text-gq-gold/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">07407 655 203</span>
            </a>

            {/* Auth Buttons */}
            <button
              onClick={() => openAuthModal('signin')}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gq-gold transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>

            <button
              onClick={() => openAuthModal('signup')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gq-blue to-gq-gold text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:text-gq-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={openAuthModal}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.open}
        onClose={closeAuthModal}
        mode={authModal.mode}
        onSwitchMode={(mode) => setAuthModal({ open: true, mode })}
      />
    </>
  )
}