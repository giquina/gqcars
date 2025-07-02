import { Providers } from '@/components/providers'
import SEOSchema from '@/components/SEOSchema'
import { StaticModeNotice } from '@/lib/static-mode'
import '@/styles/globals.css'

export const metadata = {
  title: 'GQ Cars LTD - AI-Powered Security Taxi Service | SIA Licensed Drivers',
  description: 'Revolutionary AI-powered security taxi service with SIA Licensed Close Protection Officers. Professional drivers, 24/7 availability, advanced booking technology.',
  keywords: 'security taxi, SIA licensed drivers, close protection, London taxi, AI-powered transport, professional drivers',
  author: 'GQ Cars LTD',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEOSchema />
      </head>
      <body className="font-sans">
        <Providers>
          <StaticModeNotice />
          {children}
        </Providers>
      </body>
    </html>
  )
}