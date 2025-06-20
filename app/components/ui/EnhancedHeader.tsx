'use client'

import { useState, useEffect } from 'react'
import { Phone, Menu, X, User, LogIn, UserPlus, Shield, Mail, Lock } from 'lucide-react'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'

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
    // Handle authentication logic here
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
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-amber-500/10" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              Continue with Google
            </button>
            
            <button
              onClick={() => handleSocialAuth('facebook')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <FaFacebook className="w-5 h-5" />
              Continue with Facebook
            </button>
            
            <button
              onClick={() => handleSocialAuth('apple')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium border border-gray-700"
            >
              <FaApple className="w-5 h-5" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-amber-500 outline-none text-white"
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-amber-500 outline-none text-white"
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-amber-500 outline-none text-white"
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-amber-500 outline-none text-white"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'signin' && (
              <div className="text-right">
                <button type="button" className="text-amber-400 hover:text-amber-300 text-sm">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <span className="text-gray-400">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => onSwitchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-amber-400 hover:text-amber-300 font-medium"
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

export default function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    setIsMenuOpen(false)
  }

  const closeAuthModal = () => {
    setAuthModal({ open: false, mode: 'signin' })
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-400">GQ CARS LTD</h1>
                <p className="text-xs text-gray-400">Professional • SIA Licensed • Smart Technology</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-amber-400 transition-colors">Services</a>
              <a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone */}
              <a
                href="tel:07407655203"
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">07407 655 203</span>
              </a>

              {/* Auth Buttons */}
              <button
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-amber-500 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
                <div className="space-y-3 pl-4">
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Book Taxi
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Private Hire
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Airport Transfer
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Corporate Transport
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Security Services
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Family Office Services
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Family Security
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-amber-400">
                    <Shield className="w-4 h-4" />
                    Wedding Transport
                  </a>
                </div>
              </nav>

              {/* Company Links */}
              <nav className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
                <div className="space-y-3 pl-4">
                  <a href="#" className="block text-gray-300 hover:text-amber-400">About Us</a>
                  <a href="#" className="block text-gray-300 hover:text-amber-400">Our Team</a>
                  <a href="#" className="block text-gray-300 hover:text-amber-400">Careers</a>
                  <a href="#" className="block text-gray-300 hover:text-amber-400">Contact</a>
                </div>
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-4 pt-4 border-t border-gray-800">
                {/* Book Now - Fixed to use consistent amber color */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Book Now 🚗
                </button>

                {/* Call Button */}
                <a
                  href="tel:07407655203"
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-amber-500 text-amber-400 rounded-lg font-semibold hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call: 07407 655 203
                </a>

                {/* Auth Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

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