'use client'

import { useState } from 'react'
import { Shield, ArrowRight, CheckCircle, Clock, Users, Car, Building, Plane, Star, FileText, Phone } from 'lucide-react'

interface AssessmentData {
  transportType: string
  riskLevel: string
  duration: string
  groupSize: string
  location: string
}

const initialData: AssessmentData = {
  transportType: '',
  riskLevel: '',
  duration: '',
  groupSize: '',
  location: ''
}

export default function SecurityAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(initialData)
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 'transportType',
      title: 'What type of security transport do you need?',
      subtitle: 'This helps us understand your primary security requirements and recommend the most suitable protection level.',
      options: [
        {
          id: 'personal-protection',
          title: 'Personal Protection',
          description: 'Individual security transport with close protection officer',
          icon: Shield,
          features: ['SIA Licensed Officer', 'Threat Assessment', 'Route Planning', 'Emergency Response']
        },
        {
          id: 'executive-transport',
          title: 'Executive Transport',
          description: 'Business/corporate travel with enhanced security',
          icon: Building,
          features: ['Executive Vehicle', 'Professional Chauffeur', 'Confidentiality', 'Meeting Coordination']
        },
        {
          id: 'event-security',
          title: 'Event Security',
          description: 'Security for weddings, parties, and special events',
          icon: Users,
          features: ['Event Coordination', 'Crowd Management', 'VIP Protection', 'Venue Security']
        },
        {
          id: 'airport-transfers',
          title: 'Airport Transfers',
          description: 'Secure airport transportation with meet & greet',
          icon: Plane,
          features: ['Flight Monitoring', 'Meet & Greet', 'Luggage Assistance', 'Traffic Management']
        }
      ]
    },
    {
      id: 'riskLevel',
      title: 'What is your threat risk level?',
      subtitle: 'Understanding your risk profile helps us deploy appropriate security measures and resources.',
      options: [
        {
          id: 'low',
          title: 'Low Risk',
          description: 'Standard security needs, no specific threats identified',
          icon: CheckCircle,
          features: ['Standard Protection', 'Discreet Service', 'Basic Threat Monitoring']
        },
        {
          id: 'medium',
          title: 'Medium Risk',
          description: 'Enhanced security due to profile or circumstances',
          icon: Shield,
          features: ['Enhanced Protection', 'Advanced Planning', 'Threat Intelligence', 'Backup Resources']
        },
        {
          id: 'high',
          title: 'High Risk',
          description: 'Maximum security for high-threat situations',
          icon: Star,
          features: ['Maximum Protection', 'Multi-Team Deployment', '24/7 Monitoring', 'Emergency Protocols']
        }
      ]
    },
    {
      id: 'duration',
      title: 'How long do you need our services?',
      subtitle: 'Duration affects planning, resource allocation, and pricing structure.',
      options: [
        {
          id: 'single-journey',
          title: 'Single Journey',
          description: 'One-time transport or event coverage',
          icon: Car,
          features: ['Point-to-Point', 'Event Duration', 'Return Journey']
        },
        {
          id: 'daily',
          title: 'Daily Service',
          description: 'Regular daily protection and transport',
          icon: Clock,
          features: ['Consistent Team', 'Route Optimization', 'Schedule Flexibility']
        },
        {
          id: 'extended',
          title: 'Extended Period',
          description: 'Weekly, monthly, or ongoing protection',
          icon: FileText,
          features: ['Dedicated Team', 'Comprehensive Planning', 'Regular Reviews', 'Cost Efficiency']
        }
      ]
    }
  ]

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAssessmentData(prev => ({
      ...prev,
      [questionId]: optionId
    }))

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const resetAssessment = () => {
    setCurrentStep(0)
    setAssessmentData(initialData)
    setShowResults(false)
  }

  const currentQuestion = questions[currentStep]

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Your Security Assessment Complete</h2>
            <p className="text-gray-300 text-lg">Based on your responses, we've created a personalized security recommendation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-bold text-amber-500 mb-4">Recommended Service</h3>
              <div className="space-y-2">
                <p className="text-white">Service Type: <span className="text-blue-400 capitalize">{assessmentData.transportType.replace('-', ' ')}</span></p>
                <p className="text-white">Risk Level: <span className="text-blue-400 capitalize">{assessmentData.riskLevel}</span></p>
                <p className="text-white">Duration: <span className="text-blue-400 capitalize">{assessmentData.duration.replace('-', ' ')}</span></p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-bold text-amber-500 mb-4">What Happens Next?</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Expert consultation within 2 hours
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Personalized security plan
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Transparent pricing quote
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447407655203"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 07407 655 203
              </a>
              <button
                onClick={resetAssessment}
                className="px-8 py-4 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all duration-300"
              >
                Take Assessment Again
              </button>
            </div>
            <p className="text-gray-400 text-sm">Our security experts are standing by 24/7 to assist you</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-amber-500 mr-4" />
          <div className="bg-amber-500 text-black px-4 py-2 rounded-full font-bold text-lg">
            Security Assessment
          </div>
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold ml-4 animate-pulse">
            ⚠️ FREE
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get Your Personalized Security Plan
        </h1>
        
        <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
          Answer 5 quick questions to receive a tailored security transport recommendation from our SIA-licensed experts
        </p>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Takes 2 Minutes</h3>
            <p className="text-gray-400 text-sm">Quick assessment to understand your security needs</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Expert Analysis</h3>
            <p className="text-gray-400 text-sm">Professional security recommendations from certified experts</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <FileText className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Instant Results</h3>
            <p className="text-gray-400 text-sm">Immediate personalized security plan and pricing</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-amber-500 font-semibold">Question {currentStep + 1} of {questions.length}</span>
          <span className="text-gray-400 text-sm">~{(questions.length - currentStep) * 30} seconds remaining</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">{currentQuestion.title}</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{currentQuestion.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
              className="group bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-amber-500 rounded-xl p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className="flex items-start mb-4">
                <option.icon className="w-8 h-8 text-amber-500 mr-4 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
              
              {option.features && (
                <div className="grid grid-cols-2 gap-2">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Why This Matters Section */}
        <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-600">
          <h4 className="font-bold text-amber-500 mb-2">💡 Why This Question Matters</h4>
          <p className="text-gray-300 text-sm">
            {currentStep === 0 && "Different security situations require different approaches. Your transport type determines the level of protection, vehicle specifications, and team composition needed."}
            {currentStep === 1 && "Risk assessment is crucial for deploying appropriate security measures. Higher risk situations require more resources, advanced planning, and specialized protocols."}
            {currentStep === 2 && "Service duration affects resource allocation, team scheduling, and cost efficiency. Longer engagements allow for better planning and often better value."}
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
        <div className="p-4">
          <div className="text-2xl font-bold text-amber-500">100%</div>
          <div className="text-gray-400 text-sm">SIA Licensed</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-blue-500">500+</div>
          <div className="text-gray-400 text-sm">Clients Protected</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-green-500">24/7</div>
          <div className="text-gray-400 text-sm">Emergency Response</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-amber-500">10+</div>
          <div className="text-gray-400 text-sm">Years Experience</div>
        </div>
      </div>
    </div>
  )
}