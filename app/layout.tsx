import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from './providers/NextAuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary'
import SmartCTAManager from './components/ui/SmartCTAManager'
import FloatingActionButton from './components/ui/FloatingActionButton'
import Footer from './components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'GQ Cars LTD - SIA Licensed Security Taxi Service | Professional Drivers | London & Watford',
  description: 'Premium security taxi service with SIA Licensed Close Protection Officers. Smart booking technology, professional drivers covering London, Watford, and all major airports. Book now: 07407 655 203',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'GQ Cars LTD - Professional Security Taxi Service',
    description: 'Premium security taxi service with SIA Licensed Close Protection Officers',
    images: ['/og-image.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-black focus:text-white">
          Skip to main content
        </a>
        <NextAuthProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
              <SmartCTAManager />
              <FloatingActionButton />
              <Footer />
              <Toaster position="bottom-right" />
            </ErrorBoundary>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}