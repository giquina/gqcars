'use client'

import { useSearchParams } from 'next/navigation'
import SecurityAssessmentResults from '@/app/components/ui/SecurityAssessmentResults'
import { Crown, Users, Car, Shield } from 'lucide-react'

// Comprehensive logic to determine the best recommendation based on all 5 questions
function getRecommendation(answers: URLSearchParams) {
  const purpose = answers.get('1')
  const passengers = answers.get('2')
  const security = answers.get('3')
  const distance = answers.get('4')
  const frequency = answers.get('5')

  // Scoring system for each service
  let scores = {
    standard: 0,
    executive: 0,
    xl: 0
  }

  // Question 1: Purpose scoring
  if (purpose === 'personal') {
    scores.executive += 3
    scores.standard += 1
  } else if (purpose === 'corporate') {
    scores.executive += 4
    scores.standard += 2
  } else if (purpose === 'event') {
    scores.xl += 4
    scores.executive += 2
  } else if (purpose === 'airport') {
    scores.executive += 2
    scores.standard += 3
    scores.xl += 1
  }

  // Question 2: Passenger count scoring
  if (passengers === 'single') {
    scores.executive += 2
    scores.standard += 3
  } else if (passengers === 'couple') {
    scores.executive += 3
    scores.standard += 2
  } else if (passengers === 'group') {
    scores.xl += 4
    scores.executive += 1
  } else if (passengers === 'large') {
    scores.xl += 5
  }

  // Question 3: Security level scoring
  if (security === 'standard') {
    scores.standard += 4
    scores.executive += 1
  } else if (security === 'enhanced') {
    scores.executive += 3
    scores.standard += 2
  } else if (security === 'executive') {
    scores.executive += 4
    scores.xl += 1
  } else if (security === 'vip') {
    scores.executive += 5
  }

  // Question 4: Distance scoring
  if (distance === 'local') {
    scores.standard += 3
    scores.executive += 2
  } else if (distance === 'regional') {
    scores.executive += 3
    scores.standard += 2
    scores.xl += 1
  } else if (distance === 'longdistance') {
    scores.executive += 4
    scores.xl += 2
  } else if (distance === 'airport') {
    scores.executive += 3
    scores.standard += 2
  }

  // Question 5: Frequency scoring
  if (frequency === 'occasional') {
    scores.standard += 2
    scores.executive += 1
  } else if (frequency === 'regular') {
    scores.executive += 3
    scores.standard += 2
  } else if (frequency === 'frequent') {
    scores.executive += 4
    scores.xl += 1
  } else if (frequency === 'ondemand') {
    scores.standard += 3
    scores.executive += 2
  }

  // Determine the highest scoring service
  const topService = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0] as keyof typeof scores

  // Return recommendation based on the winning service
  switch (topService) {
    case 'executive':
      return { 
        service: 'GQ Executive', 
        description: 'Our premium security transport service with luxury vehicles, elite SIA licensed CPO drivers, and comprehensive protection protocols. Perfect for high-security requirements and executive travel.',
        icon: Crown 
      }
    case 'xl':
      return { 
        service: 'GQ XL', 
        description: 'Spacious group transport with SIA licensed security drivers, accommodating 5-8 passengers with enhanced coordination and security protocols for larger parties and events.',
        icon: Users 
      }
    case 'standard':
    default:
      return { 
        service: 'GQ Standard', 
        description: 'Professional security taxi service with SIA licensed drivers, providing reliable and secure transport with excellent value for money and comprehensive protection.',
        icon: Car 
      }
  }
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const recommendation = getRecommendation(searchParams)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center py-20 px-4">
      <SecurityAssessmentResults recommendation={recommendation} />
    </main>
  )
}