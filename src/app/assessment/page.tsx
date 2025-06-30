'use client'

import { SecurityAssessment } from '@/components/ui/SecurityAssessment'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <SecurityAssessment />
        </div>
      </main>

      <Footer />
    </div>
  )
}