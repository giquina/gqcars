'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Car, PartyPopper, Briefcase, ChevronRight, ArrowRight } from 'lucide-react'

// Define the structure for a question
interface Question {
  id: number
  text: string
  options: {
    id: string
    text: string
    subtext: string
    icon: React.ElementType
  }[]
}

// Question data is now defined directly inside the client component
const homePageQuestion: Question = {
    id: 1,
    text: 'What is the primary purpose of your trip?',
    options: [
      { id: 'personal', text: 'Personal Protection', subtext: 'High-security transport for an individual', icon: Shield },
      { id: 'corporate', text: 'Executive Transport', subtext: 'Professional travel for business needs', icon: Briefcase },
      { id: 'event', text: 'Event Security', subtext: 'Transport for weddings or special occasions', icon: PartyPopper },
      { id: 'airport', text: 'Airport Transfers', subtext: 'Secure and reliable airport transportation', icon: Car }
    ]
};

export default function HomePageAssessment() {
  const router = useRouter()
  const question = homePageQuestion; // Use the local question data

  const handleAnswer = (questionId: number, optionId: string) => {
    const query = new URLSearchParams({ [questionId]: optionId }).toString()
    router.push(`/assessment?${query}`)
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6 sm:p-8 rounded-2xl border border-yellow-500/30 w-full max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-yellow-500/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-blue-500/50 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-2 max-w-md mx-auto mb-4">
                    <Shield className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-lg font-semibold text-white tracking-wide">SIA-Compliant Security Assessment</h2>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Begin Your Security Profile</h1>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    To provide a security service that is precisely tailored to your needs, we begin with a confidential assessment. This aligns with SIA "Know Your Client" best practices.
                </p>
            </div>

            {/* Question Section */}
            <div>
                <h3 className="text-2xl font-semibold text-center text-white mb-6">{question.text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {question.options.map(option => {
                    const Icon = option.icon
                    return (
                    <button
                        key={option.id}
                        onClick={() => handleAnswer(question.id, option.id)}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-left hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-900/50 p-3 rounded-full">
                                <Icon className="w-8 h-8 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">{option.text}</p>
                                <p className="text-sm text-gray-400">{option.subtext}</p>
                            </div>
                        </div>
                        <div className="text-right text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                           <ChevronRight className="inline w-5 h-5"/>
                        </div>
                    </button>
                    )
                })}
                </div>
            </div>

             {/* Footer Link */}
            <div className="text-center mt-8">
                <Link href="/assessment">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Prefer to take the full assessment? <ArrowRight className="inline w-4 h-4 ml-1" />
                </span>
                </Link>
            </div>
        </div>
    </div>
  )
} 