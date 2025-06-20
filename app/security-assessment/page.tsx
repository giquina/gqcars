'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, User, Building2, Clock, MapPin, Phone, Mail, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import GQCarsLogo from '../components/ui/GQCarsLogo'

export default function SecurityAssessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    
    // Security Assessment Questions
    securityLevel: '',
    threatAssessment: '',
    publicProfile: '',
    securityRequirements: '',
    additionalConcerns: '',
    
    // Service Requirements
    serviceType: '',
    frequencyOfUse: '',
    specialInstructions: ''
  })

  const securityQuestions = [
    {
      id: 'securityLevel',
      question: 'What is your current security risk level?',
      type: 'radio',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk - General public, no known threats', description: 'Standard security protocols' },
        { value: 'medium', label: 'Medium Risk - Business executive, minor public profile', description: 'Enhanced security measures' },
        { value: 'high', label: 'High Risk - High-profile individual, known threats', description: 'Maximum security protocols' },
        { value: 'extreme', label: 'Extreme Risk - Government official, celebrity, significant threats', description: 'Specialized protection required' }
      ]
    },
    {
      id: 'threatAssessment',
      question: 'Are you currently aware of any specific security threats?',
      type: 'radio',
      required: true,
      options: [
        { value: 'none', label: 'No known threats', description: 'Standard security measures' },
        { value: 'general', label: 'General concerns (privacy, paparazzi)', description: 'Discretion and privacy focus' },
        { value: 'specific', label: 'Specific threats or concerns', description: 'Enhanced security assessment required' },
        { value: 'active', label: 'Active security situation', description: 'Immediate security consultation needed' }
      ]
    },
    {
      id: 'publicProfile',
      question: 'What is your public visibility level?',
      type: 'radio',
      required: true,
      options: [
        { value: 'private', label: 'Private individual', description: 'Standard discretion' },
        { value: 'business', label: 'Business professional', description: 'Professional discretion' },
        { value: 'public', label: 'Public figure (media, politics, entertainment)', description: 'High discretion and privacy' },
        { value: 'celebrity', label: 'High-profile celebrity/VIP', description: 'Maximum privacy and security' }
      ]
    },
    {
      id: 'securityRequirements',
      question: 'What specific security services do you require?',
      type: 'checkbox',
      required: true,
      options: [
        { value: 'close_protection', label: 'Close Protection Officer (CPO)', description: 'Personal bodyguard service' },
        { value: 'secure_transport', label: 'Secure Transport Only', description: 'SIA licensed driver, secure vehicle' },
        { value: 'route_security', label: 'Route Planning & Security', description: 'Pre-planned secure routes' },
        { value: 'threat_assessment', label: 'Ongoing Threat Assessment', description: 'Continuous security evaluation' },
        { value: 'emergency_response', label: 'Emergency Response Protocol', description: '24/7 emergency contact and response' },
        { value: 'family_security', label: 'Family/Group Security', description: 'Protection for multiple individuals' }
      ]
    },
    {
      id: 'additionalConcerns',
      question: 'Please describe any additional security concerns or special requirements:',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., Medical conditions, accessibility needs, specific routes to avoid, privacy requirements, etc.'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => {
      const currentValues = prev[field] ? prev[field].split(',') : []
      if (checked) {
        return {
          ...prev,
          [field]: [...currentValues, value].join(',')
        }
      } else {
        return {
          ...prev,
          [field]: currentValues.filter(v => v !== value).join(',')
        }
      }
    })
  }

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.phone
      case 2:
        return formData.securityLevel && formData.threatAssessment
      case 3:
        return formData.publicProfile && formData.securityRequirements
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    try {
      // Here you would send the data to your backend
      console.log('Security Assessment Data:', formData)
      
      // Simulate API call
      // await fetch('/api/security-assessment', { 
      //   method: 'POST', 
      //   body: JSON.stringify(formData) 
      // })
      
      // Redirect to professional confirmation page
      window.location.href = '/security-assessment-confirmation'
    } catch (error) {
      console.error('Error submitting assessment:', error)
      alert('There was an error submitting your assessment. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <GQCarsLogo className="w-10 h-10" />
              <span className="text-xl font-bold text-yellow-500">GQ CARS LTD</span>
            </Link>
            <div className="text-sm text-gray-300">
              Step {currentStep} of 3
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-white">Security Assessment</h1>
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            For your safety and ours, all clients must complete a brief security assessment before booking our services. 
            This helps us provide the most appropriate level of protection for your needs.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Security Assessment Progress</span>
            <span className="text-sm text-yellow-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                <p className="text-gray-300">Please provide your contact details for our security records</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Security Risk Assessment */}
        {currentStep === 2 && (
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Security Risk Assessment</h2>
                <p className="text-gray-300">Help us understand your security requirements</p>
              </div>
            </div>

            <div className="space-y-8">
              {securityQuestions.slice(0, 2).map((question) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{question.question}</h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <label key={option.value} className="flex items-start space-x-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={formData[question.id] === option.value}
                          onChange={(e) => handleInputChange(question.id, e.target.value)}
                          className="mt-1 text-yellow-500 focus:ring-yellow-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Service Requirements */}
        {currentStep === 3 && (
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Service Requirements</h2>
                <p className="text-gray-300">Specify your security service needs</p>
              </div>
            </div>

            <div className="space-y-8">
              {securityQuestions.slice(2).map((question) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{question.question}</h3>
                  
                  {question.type === 'radio' && (
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label key={option.value} className="flex items-start space-x-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={formData[question.id] === option.value}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            className="mt-1 text-yellow-500 focus:ring-yellow-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">{option.label}</div>
                            <div className="text-sm text-gray-400">{option.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === 'checkbox' && (
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label key={option.value} className="flex items-start space-x-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={formData[question.id]?.includes(option.value)}
                            onChange={(e) => handleCheckboxChange(question.id, option.value, e.target.checked)}
                            className="mt-1 text-yellow-500 focus:ring-yellow-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">{option.label}</div>
                            <div className="text-sm text-gray-400">{option.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === 'textarea' && (
                    <textarea
                      value={formData[question.id]}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      rows={4}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!isStepValid(currentStep)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isStepValid(currentStep)
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                isStepValid(currentStep)
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete Assessment</span>
            </button>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-300">
              <strong>Security Notice:</strong> All information provided is strictly confidential and used solely for security assessment and service optimization. Your data is protected under UK data protection laws and our professional security protocols.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
