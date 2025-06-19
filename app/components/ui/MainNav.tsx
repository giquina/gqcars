import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function MainNav() {
  const { theme, setTheme } = useTheme()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent">
              GQ Security
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services/close-protection" className="text-gray-300 hover:text-amber-500 transition-colors">
              Close Protection
            </Link>
            <Link href="/services/private-hire" className="text-gray-300 hover:text-blue-500 transition-colors">
              Private Hire
            </Link>
            <Link href="/services/corporate" className="text-gray-300 hover:text-amber-500 transition-colors">
              Corporate
            </Link>
            <Link href="/book" className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
              Book Now
            </Link>
            {/* Theme Toggle Button */}
            <button
              aria-label="Toggle dark mode"
              className="ml-4 p-2 rounded hover:bg-slate-800 transition-colors"
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark'
                setTheme(next)
                if (typeof window !== 'undefined') localStorage.setItem('theme', next)
              }}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}