'use client'

import SecurityAssessment from './ui/SecurityAssessment'

export default function SecurityAssessmentWrapper() {
  return (
    <SecurityAssessment
      questions={[]}
      onComplete={(answers) => console.log('Assessment completed:', answers)}
    />
  )
}