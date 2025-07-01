'use client'

import { ReactNode } from 'react'
import { SupabaseProvider } from './SupabaseProvider'
import ErrorBoundary from './ErrorBoundary'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <SupabaseProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          {children}
        </div>
      </SupabaseProvider>
    </ErrorBoundary>
  )
}