import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'

export const metadata: Metadata = {
  title: 'GQ Security Services - Professional Close Protection & Private Hire',
  description: 'SIA licensed security professionals providing discreet protection and premium transport services in the UK.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
