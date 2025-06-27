'use client'

import { SecurityAssessment } from '@/app/components/ui/SecurityAssessment'
import { useRouter } from 'next/navigation'
import { Shield, Car, PartyPopper, Briefcase, Users } from 'lucide-react'

// This is our data source for the quiz
const assessmentQuestions = [
  {
    id: 1,
    text: 'What is the primary purpose of your trip?',
    options: [
      { id: 'personal', text: 'Personal Protection', subtext: 'High-security transport for an individual', icon: Shield },
      { id: 'corporate', text: 'Executive Transport', subtext: 'Professional travel for business needs', icon: Briefcase },
      { id: 'event', text: 'Event Security', subtext: 'Transport for weddings, parties, or special occasions', icon: PartyPopper },
      { id: 'airport', text: 'Airport Transfers', subtext: 'Secure and reliable airport transportation', icon: Car }
    ]
  },
  {
    id: 2,
    text: 'How many passengers will need transport?',
    options: [
      { id: 'single', text: '1 Passenger', subtext: 'Individual transport with personal security', icon: Shield },
      { id: 'couple', text: '2-3 Passengers', subtext: 'Small group requiring secure transport', icon: Car },
      { id: 'group', text: '4-6 Passengers', subtext: 'Medium group with security coordination', icon: Users },
      { id: 'large', text: '7+ Passengers', subtext: 'Large group requiring multiple vehicles', icon: Briefcase }
    ]
  },
  {
    id: 3,
    text: 'What level of security do you require?',
    options: [
      { id: 'standard', text: 'Standard Security', subtext: 'Professional SIA licensed driver with basic protection', icon: Car },
      { id: 'enhanced', text: 'Enhanced Security', subtext: 'Close protection officer with advanced training', icon: Shield },
      { id: 'executive', text: 'Executive Protection', subtext: 'Premium security with threat assessment', icon: Briefcase },
      { id: 'vip', text: 'VIP Protection', subtext: 'Maximum security with full coordination', icon: PartyPopper }
    ]
  },
  {
    id: 4,
    text: 'What is your typical journey distance?',
    options: [
      { id: 'local', text: 'Local (Under 10 miles)', subtext: 'Short distance within the city', icon: Car },
      { id: 'regional', text: 'Regional (10-50 miles)', subtext: 'Medium distance between cities', icon: Shield },
      { id: 'longdistance', text: 'Long Distance (50+ miles)', subtext: 'Extended journey requiring planning', icon: Briefcase },
      { id: 'airport', text: 'Airport Transfers', subtext: 'Specialized airport transport services', icon: PartyPopper }
    ]
  },
  {
    id: 5,
    text: 'How often do you need security transport?',
    options: [
      { id: 'occasional', text: 'Occasional Use', subtext: 'Special events or one-off requirements', icon: Car },
      { id: 'regular', text: 'Regular Use', subtext: 'Weekly or monthly transport needs', icon: Shield },
      { id: 'frequent', text: 'Frequent Use', subtext: 'Daily or multiple times per week', icon: Briefcase },
      { id: 'ondemand', text: 'On-Demand', subtext: 'Emergency or last-minute security transport', icon: PartyPopper }
    ]
  }
];

export default function AssessmentPage() {
  const router = useRouter()

  const handleAssessmentComplete = (answers: Record<number, string>) => {
    // Convert answers object to a URL query string
    const query = new URLSearchParams(answers as any).toString()
    // Navigate to the results page with the answers
    router.push(`/assessment/results?${query}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center py-20 px-4">
      <SecurityAssessment questions={assessmentQuestions} onComplete={handleAssessmentComplete} />
    </main>
  )
}