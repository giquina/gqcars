import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from './providers'
import Analytics from '../components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GQ Cars LTD - SIA Licensed Security Taxi Service | Professional Drivers | London & Watford',
  description: 'Premium security taxi service with SIA Licensed Close Protection Officers. Smart booking technology, professional drivers covering London, Watford, and all major airports. Book now: 07407 655 203',
  keywords: ['security taxi', 'SIA licensed drivers', 'close protection', 'executive transport', 'London taxi', 'Watford taxi', 'airport transfers', 'security transport'],
  authors: [{ name: 'GQ Cars LTD' }],
  creator: 'GQ Cars LTD',
  publisher: 'GQ Cars LTD',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}