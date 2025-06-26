'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const SmartCTAManager = dynamic(() => import('./ui/SmartCTAManager'), {
  ssr: false,
  loading: () => <div className="h-16" />
})

const FloatingActionButton = dynamic(() => import('./ui/FloatingActionButton'), {
  ssr: true,
  loading: () => <div className="h-16" />
})

const Footer = dynamic(() => import('./ui/Footer'), {
  ssr: true
})
import { Toaster } from 'react-hot-toast'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <>
      <Toaster position="top-center" />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      {pathname === '/' && <SmartCTAManager />}
      <FloatingActionButton />
      <Footer />
    </>
  )
}