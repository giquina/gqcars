'use client'

import { useState } from 'react'
import { Shield, Car, PartyPopper, Briefcase, ChevronLeft, ChevronRight, Sparkles, Users, CheckCircle } from 'lucide-react'

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

// Define the props for your component
interface SecurityAssessmentProps {
  questions: Question[]
  onComplete: (answers: Record<number, string>) => void
}

export default function SecurityAssessment({ questions, onComplete }: SecurityAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleAnswer = (questionId: number, optionId: string) => {
    setSelectedOption(optionId)
    
    // Add a small delay for visual feedback before proceeding
    setTimeout(() => {
      const newAnswers = { ...answers, [questionId]: optionId }
      setAnswers(newAnswers)
      setSelectedOption(null)
      
      // Automatically move to the next question
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        onComplete(newAnswers)
      }
    }, 300)
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const progressPercentage = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6 sm:p-8 lg:p-10 rounded-2xl border border-yellow-500/30 w-full max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 right-8 w-20 h-20 border border-yellow-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border border-blue-500 rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-500 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10">
        {/* Header and Progress Bar */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center space-x-3 bg-black/50 px-6 py-3 rounded-full mb-6">
            <Shield className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Security Assessment
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-gray-300 text-base sm:text-lg px-4">
            Answer 5 quick questions to get your <span className="text-yellow-500 font-semibold">personalized security transport recommendation</span>
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-400">Question {currentStep + 1} of {questions.length}</p>
            <p className="text-sm text-yellow-500 font-bold">{Math.round(progressPercentage)}% Complete</p>
          </div>
        </div>

        {/* Question Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white mb-8 leading-tight px-4">
            {questions[currentStep].text}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {questions[currentStep].options.map(option => {
              const Icon = option.icon
              const isSelected = selectedOption === option.id
              const isAnswered = answers[questions[currentStep].id] === option.id
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(questions[currentStep].id, option.id)}
                  disabled={selectedOption !== null}
                  className={`group p-6 lg:p-8 border-2 rounded-xl transition-all duration-300 text-left flex items-start gap-4 transform hover:scale-[1.02] hover:shadow-xl relative overflow-hidden ${
                    isSelected 
                      ? 'border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-500/25' 
                      : isAnswered
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-yellow-500/70 hover:bg-gray-700/50'
                  }`}
                >
                  {/* Animated background for selected state */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 animate-pulse"></div>
                  )}
                  
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mt-1 transition-all duration-300 ${
                    isSelected || isAnswered
                      ? 'bg-yellow-500 scale-110' 
                      : 'bg-gray-700 group-hover:bg-yellow-500/80'
                  }`}>
                    {isAnswered ? (
                      <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    ) : (
                      <Icon className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${
                        isSelected || isAnswered ? 'text-black' : 'text-yellow-500 group-hover:text-black'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <h3 className={`font-bold text-lg lg:text-xl mb-2 transition-colors duration-300 ${
                      isSelected || isAnswered ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                    }`}>
                      {option.text}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {option.subtext}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  {(isSelected || isAnswered) && (
                    <div className="absolute top-4 right-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isAnswered ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>

          {/* Progress indicators */}
          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-yellow-500 scale-110' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="w-24"></div> {/* Spacer for centering dots */}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/50 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold">🛡️ All recommendations include SIA licensed security drivers</span>
          </div>
        </div>
      </div>
    </div>
  )
}