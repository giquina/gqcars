'use client'

import React, { useState, useEffect } from 'react'
import { useVoice } from './VoiceProvider'
import { Calendar, Clock, MapPin, User, Phone, Mail, Mic, Volume2 } from 'lucide-react'

interface VoiceBookingStep {
  id: string
  title: string
  prompt: string
  validation: (input: string) => boolean
  processInput: (input: string) => any
  confirmationText: (value: any) => string
}

interface BookingData {
  service: string
  fromLocation: string
  toLocation: string
  date: string
  time: string
  duration: string
  passengers: number
  name: string
  phone: string
  email: string
  requirements: string
}

const initialBookingData: BookingData = {
  service: '',
  fromLocation: '',
  toLocation: '',
  date: '',
  time: '',
  duration: '',
  passengers: 1,
  name: '',
  phone: '',
  email: '',
  requirements: ''
}

export default function VoiceBookingInterface() {
  const { speak, lastCommand, isListening, startListening, stopListening } = useVoice()
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData)
  const [isActive, setIsActive] = useState(false)
  const [isProcessingInput, setIsProcessingInput] = useState(false)
  const [confirmStep, setConfirmStep] = useState(false)

  const bookingSteps: VoiceBookingStep[] = [
    {
      id: 'service',
      title: 'Service Selection',
      prompt: 'What type of service would you like? You can choose from security taxi, close protection, corporate transport, VIP service, or wedding security.',
      validation: (input) => {
        const services = ['security', 'taxi', 'close protection', 'corporate', 'vip', 'wedding', 'private hire']
        return services.some(service => input.toLowerCase().includes(service))
      },
      processInput: (input) => {
        const cmd = input.toLowerCase()
        if (cmd.includes('vip')) return 'vip'
        if (cmd.includes('close protection')) return 'close-protection'
        if (cmd.includes('corporate')) return 'corporate'
        if (cmd.includes('wedding')) return 'wedding'
        if (cmd.includes('private hire')) return 'private-hire'
        return 'security-taxi'
      },
      confirmationText: (value) => `I've selected ${value.replace('-', ' ')} service for you.`
    },
    {
      id: 'fromLocation',
      title: 'Pickup Location',
      prompt: 'Where would you like to be picked up? Please provide the full address or landmark.',
      validation: (input) => input.trim().length > 3,
      processInput: (input) => input.trim(),
      confirmationText: (value) => `Pickup location set to ${value}.`
    },
    {
      id: 'toLocation',
      title: 'Destination',
      prompt: 'What is your destination? Please provide the full address or landmark.',
      validation: (input) => input.trim().length > 3,
      processInput: (input) => input.trim(),
      confirmationText: (value) => `Destination set to ${value}.`
    },
    {
      id: 'date',
      title: 'Date',
      prompt: 'What date do you need the service? You can say today, tomorrow, or specify a date like "December 15th".',
      validation: (input) => {
        const dateKeywords = ['today', 'tomorrow', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        return dateKeywords.some(keyword => input.toLowerCase().includes(keyword)) || 
               /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/.test(input) ||
               /\d{1,2}(st|nd|rd|th)/.test(input.toLowerCase())
      },
      processInput: (input) => {
        const cmd = input.toLowerCase()
        const today = new Date()
        
        if (cmd.includes('today')) {
          return today.toISOString().split('T')[0]
        }
        if (cmd.includes('tomorrow')) {
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          return tomorrow.toISOString().split('T')[0]
        }
        
        // Try to parse specific dates
        const dateMatch = input.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/)
        if (dateMatch) {
          const [, day, month, year] = dateMatch
          return `${year.length === 2 ? '20' + year : year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
        
        return input.trim()
      },
      confirmationText: (value) => `Date set to ${new Date(value).toLocaleDateString()}.`
    },
    {
      id: 'time',
      title: 'Time',
      prompt: 'What time do you need the service? Please specify in hours and minutes, like "2:30 PM" or "14:30".',
      validation: (input) => /\d{1,2}[:\.]?\d{0,2}\s*(am|pm|AM|PM)?/.test(input),
      processInput: (input) => {
        const timeMatch = input.match(/(\d{1,2})[:\.]?(\d{0,2})\s*(am|pm|AM|PM)?/i)
        if (timeMatch) {
          const [, hours, minutes = '00', period] = timeMatch
          let hour24 = parseInt(hours)
          
          if (period && period.toLowerCase() === 'pm' && hour24 !== 12) {
            hour24 += 12
          } else if (period && period.toLowerCase() === 'am' && hour24 === 12) {
            hour24 = 0
          }
          
          return `${hour24.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`
        }
        return input.trim()
      },
      confirmationText: (value) => `Time set to ${value}.`
    },
    {
      id: 'duration',
      title: 'Duration',
      prompt: 'How long do you need the service? You can say "4 hours", "8 hours", or specify a custom duration.',
      validation: (input) => /\d+\s*(hours?|hrs?)/.test(input.toLowerCase()) || ['custom', 'all day', 'full day'].some(term => input.toLowerCase().includes(term)),
      processInput: (input) => {
        const hourMatch = input.match(/(\d+)\s*hours?/i)
        if (hourMatch) return hourMatch[1]
        if (input.toLowerCase().includes('all day') || input.toLowerCase().includes('full day')) return '12'
        if (input.toLowerCase().includes('custom')) return 'custom'
        return input.trim()
      },
      confirmationText: (value) => `Duration set to ${value} hours.`
    },
    {
      id: 'name',
      title: 'Name',
      prompt: 'Please provide your full name for the booking.',
      validation: (input) => input.trim().length > 2,
      processInput: (input) => input.trim(),
      confirmationText: (value) => `Name recorded as ${value}.`
    },
    {
      id: 'phone',
      title: 'Phone Number',
      prompt: 'Please provide your phone number including the area code.',
      validation: (input) => /[\d\s\-\+\(\)]{8,}/.test(input),
      processInput: (input) => input.replace(/[^\d\+]/g, ''),
      confirmationText: (value) => `Phone number recorded.`
    }
  ]

  // Process voice commands
  useEffect(() => {
    if (isActive && lastCommand && lastCommand.length > 0 && !isProcessingInput) {
      handleVoiceInput(lastCommand)
    }
  }, [lastCommand, isActive, isProcessingInput])

  const startVoiceBooking = () => {
    setIsActive(true)
    setCurrentStep(0)
    setBookingData(initialBookingData)
    speak("Welcome to GQ Cars voice booking. I'll guide you through creating your booking step by step. Let's get started!")
    setTimeout(() => {
      speak(bookingSteps[0].prompt)
      startListening()
    }, 2000)
  }

  const handleVoiceInput = async (input: string) => {
    if (confirmStep) {
      handleConfirmation(input)
      return
    }

    const step = bookingSteps[currentStep]
    setIsProcessingInput(true)

    if (step.validation(input)) {
      const processedValue = step.processInput(input)
      
      setBookingData(prev => ({
        ...prev,
        [step.id]: processedValue
      }))

      speak(step.confirmationText(processedValue))
      
      setTimeout(() => {
        if (currentStep < bookingSteps.length - 1) {
          setCurrentStep(currentStep + 1)
          speak(bookingSteps[currentStep + 1].prompt)
        } else {
          // Completed all steps
          speak("Great! I have all the information needed. Let me read back your booking details for confirmation.")
          setTimeout(() => readBookingSummary(), 2000)
        }
        setIsProcessingInput(false)
      }, 2000)
    } else {
      speak("I didn't understand that. " + step.prompt)
      setIsProcessingInput(false)
    }
  }

  const readBookingSummary = () => {
    const summary = `Here's your booking summary: 
    Service: ${bookingData.service.replace('-', ' ')}
    From: ${bookingData.fromLocation}
    To: ${bookingData.toLocation}
    Date: ${new Date(bookingData.date).toLocaleDateString()}
    Time: ${bookingData.time}
    Duration: ${bookingData.duration} hours
    Name: ${bookingData.name}
    
    Say "confirm" to submit this booking, or "change" to modify any details.`
    
    speak(summary)
    setConfirmStep(true)
  }

  const handleConfirmation = (input: string) => {
    const cmd = input.toLowerCase()
    
    if (cmd.includes('confirm') || cmd.includes('yes') || cmd.includes('correct')) {
      submitBooking()
    } else if (cmd.includes('change') || cmd.includes('modify') || cmd.includes('no')) {
      speak("Which field would you like to change? Say the field name like 'location', 'time', or 'date'.")
      // Could implement field-specific editing here
    } else {
      speak("Please say 'confirm' to submit the booking or 'change' to modify details.")
    }
  }

  const submitBooking = async () => {
    speak("Submitting your booking now. You will receive a confirmation shortly.")
    
    try {
      // In a real implementation, this would send to your booking API
      console.log('Voice booking submitted:', bookingData)
      
      speak("Your booking has been submitted successfully! You will receive a confirmation call within 5 minutes. Thank you for choosing GQ Cars.")
      
      // Reset the interface
      setIsActive(false)
      setCurrentStep(0)
      setConfirmStep(false)
      setBookingData(initialBookingData)
      
    } catch (error) {
      speak("There was an error submitting your booking. Please try again or call us directly at 07407 655 203.")
    }
  }

  const cancelBooking = () => {
    speak("Booking cancelled. How else can I help you today?")
    setIsActive(false)
    setCurrentStep(0)
    setConfirmStep(false)
    setBookingData(initialBookingData)
    stopListening()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!isActive ? (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-gq-blue to-gq-gold p-8 rounded-xl">
            <Mic className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Voice Booking</h2>
            <p className="text-white/90 mb-6">
              Book your GQ Cars service using only your voice. Our AI assistant will guide you through the entire process.
            </p>
            <button
              onClick={startVoiceBooking}
              className="bg-white text-gq-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Start Voice Booking
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-800 p-4 rounded-lg">
              <Volume2 className="w-6 h-6 text-gq-gold mb-2" />
              <h3 className="font-bold mb-2">Hands-Free</h3>
              <p className="text-gray-400">Complete your entire booking without touching the screen</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-gq-gold mb-2" />
              <h3 className="font-bold mb-2">Quick & Easy</h3>
              <p className="text-gray-400">Average booking time: 2-3 minutes</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <User className="w-6 h-6 text-gq-gold mb-2" />
              <h3 className="font-bold mb-2">Accessible</h3>
              <p className="text-gray-400">Perfect for users with mobility or visual impairments</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-gq-blue to-gq-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / bookingSteps.length) * 100}%` }}
            />
          </div>

          {/* Current Step */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {confirmStep ? 'Confirm Booking' : bookingSteps[currentStep]?.title}
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-400">
                  {isListening ? 'Listening...' : 'Speak to continue'}
                </span>
              </div>
            </div>

            {!confirmStep && (
              <p className="text-gray-300 mb-4">
                {bookingSteps[currentStep]?.prompt}
              </p>
            )}

            {/* Booking Summary */}
            {confirmStep && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Service:</strong> {bookingData.service.replace('-', ' ')}</div>
                  <div><strong>Date:</strong> {bookingData.date}</div>
                  <div><strong>From:</strong> {bookingData.fromLocation}</div>
                  <div><strong>Time:</strong> {bookingData.time}</div>
                  <div><strong>To:</strong> {bookingData.toLocation}</div>
                  <div><strong>Duration:</strong> {bookingData.duration} hours</div>
                  <div><strong>Name:</strong> {bookingData.name}</div>
                  <div><strong>Phone:</strong> {bookingData.phone}</div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={cancelBooking}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:border-gray-500"
              >
                Cancel
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`px-4 py-2 rounded flex items-center gap-2 ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gq-gold hover:bg-yellow-600 text-black'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {isListening ? 'Stop Listening' : 'Start Listening'}
                </button>
              </div>
            </div>
          </div>

          {/* Completed Steps */}
          <div className="space-y-2">
            {bookingSteps.slice(0, currentStep).map((step, index) => (
              <div key={step.id} className="bg-gray-700/50 p-3 rounded flex justify-between items-center">
                <span className="text-sm font-medium">{step.title}</span>
                <span className="text-sm text-gray-300">
                  {bookingData[step.id as keyof BookingData]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}