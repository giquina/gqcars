import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GQ Cars LTD - SIA Licensed Security Taxi Service | Professional Drivers | London & Watford',
  description: 'Premium security taxi service with SIA Licensed Close Protection Officers. Smart booking technology, professional drivers covering London, Watford, and all major airports. Book now: 07407 655 203',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}