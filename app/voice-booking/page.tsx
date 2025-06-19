'use client'

import React from 'react'
import VoiceBookingInterface from '../components/voice/VoiceBookingInterface'
import { Mic, Volume2, Shield, Accessibility, Languages, Zap } from 'lucide-react'

export default function VoiceBookingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gq-blue to-gq-gold p-4 rounded-xl mb-6">
              <Mic className="w-8 h-8 text-white" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">Voice AI Booking</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of taxi booking with our advanced voice AI system. 
              Book your GQ Cars security taxi service using only your voice - perfect for hands-free booking and accessibility.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Volume2 className="w-8 h-8 text-gq-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Natural Speech</h3>
              <p className="text-gray-400 text-sm">
                Speak naturally - our AI understands conversational language and complex requests.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-400 text-sm">
                Your voice data is encrypted and processed securely with enterprise-grade protection.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Languages className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Multilingual</h3>
              <p className="text-gray-400 text-sm">
                Available in 11 languages including English, French, German, Spanish, and Arabic.
              </p>
            </div>
          </div>

          {/* Voice Commands Examples */}
          <div className="bg-gray-900 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-bold mb-6">Try These Voice Commands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gq-gold mb-2">Booking Commands</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>"Book a security taxi from Heathrow to Canary Wharf"</li>
                  <li>"I need close protection for a meeting tomorrow"</li>
                  <li>"Schedule VIP transport for 3 PM today"</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-blue-400 mb-2">Information Commands</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>"What services do you offer?"</li>
                  <li>"How much for 4 hours of security?"</li>
                  <li>"What's your coverage area?"</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">Navigation Commands</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>"Go to services page"</li>
                  <li>"Show me contact information"</li>
                  <li>"Read page headings"</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-red-400 mb-2">Emergency Commands</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>"Emergency help needed"</li>
                  <li>"I'm in danger"</li>
                  <li>"Call emergency services"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Booking Interface */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <VoiceBookingInterface />
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Accessibility className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Designed for Everyone</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our voice AI system is built with accessibility in mind, providing equal access to our services for all users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Accessibility className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Visual Impairment</h3>
              <p className="text-gray-400 text-sm">Screen reader compatible with audio navigation and descriptions</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Motor Disability</h3>
              <p className="text-gray-400 text-sm">Hands-free operation with voice-only interaction</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Hearing Impairment</h3>
              <p className="text-gray-400 text-sm">Visual feedback and text transcription of all interactions</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Cognitive Support</h3>
              <p className="text-gray-400 text-sm">Clear prompts and guided step-by-step booking process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Voice Technology</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powered by cutting-edge speech recognition and natural language processing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gq-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mic className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Web Speech API Integration</h3>
                  <p className="text-gray-400">
                    Real-time speech recognition with high accuracy and low latency processing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Natural Language Understanding</h3>
                  <p className="text-gray-400">
                    Advanced NLP algorithms that understand context, intent, and complex requests
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Privacy & Security</h3>
                  <p className="text-gray-400">
                    End-to-end encryption with GDPR compliance and secure data handling
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Voice Features</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Real-time speech-to-text conversion</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Natural text-to-speech responses</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Background noise filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Confidence scoring and error correction</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Multi-turn conversation handling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Emergency protocol activation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Voice preference learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gq-gold rounded-full"></div>
                  <span>Cross-device synchronization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}