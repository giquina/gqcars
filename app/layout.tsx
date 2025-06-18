import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainNav from './components/ui/MainNav'
import Footer from './components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GQ Security Services - Professional Close Protection & Private Hire',
  description: 'Elite security services including SIA licensed close protection officers and luxury private hire drivers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white min-h-screen`}>
        <MainNav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}