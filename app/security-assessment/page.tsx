import SecurityAssessment from '@/app/components/ui/SecurityAssessment'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Assessment - Get Your Personalized Protection Plan | GQ Security',
  description: 'Take our free security assessment to receive a tailored protection recommendation from SIA-licensed experts. Professional security transport and close protection services.',
  keywords: ['security assessment', 'personal protection', 'close protection', 'security transport', 'SIA licensed', 'security consultation'],
}

export default function SecurityAssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <SecurityAssessment />
    </div>
  )
}