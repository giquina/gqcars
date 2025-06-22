'use client'

import { useState } from 'react'
import { X, Shield, Car, Clock, Award, MapPin, Building2, Sparkles, Phone, Mail, MessageCircle, CheckCircle, Star, Crown, Users, Calendar, Plane, Navigation, Settings } from 'lucide-react'

interface SmartPlatformModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SmartPlatformModal({ isOpen, onClose }: SmartPlatformModalProps) {
  const [activeTab, setActiveTab] = useState('sia')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-2xl border border-yellow-500/30 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-blue-500/20 p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">🚀 SMART PLATFORM</h2>
                <p className="text-gray-300 text-sm">Fully Licensed Professional Security Transport Operators</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            <button
              onClick={() => setActiveTab('sia')}
              className={`p-4 text-sm font-bold transition-all ${
                activeTab === 'sia'
                  ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Shield className="w-5 h-5 mx-auto mb-1" />
              SIA Licensed
            </button>
            <button
              onClick={() => setActiveTab('tfl')}
              className={`p-4 text-sm font-bold transition-all ${
                activeTab === 'tfl'
                  ? 'bg-green-500/20 text-green-400 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Car className="w-5 h-5 mx-auto mb-1" />
              TFL Licensed
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`p-4 text-sm font-bold transition-all ${
                activeTab === 'booking'
                  ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Calendar className="w-5 h-5 mx-auto mb-1" />
              Pre-Booking
            </button>
            <button
              onClick={() => setActiveTab('platform')}
              className={`p-4 text-sm font-bold transition-all ${
                activeTab === 'platform'
                  ? 'bg-yellow-500/20 text-yellow-400 border-b-2 border-yellow-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Settings className="w-5 h-5 mx-auto mb-1" />
              Smart Features
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          
          {/* SIA Licensed Tab */}
          {activeTab === 'sia' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">🛡️ SIA Licensed Close Protection</h3>
                <p className="text-gray-300">Security Industry Authority certified professional security drivers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>What is SIA Licensing?</span>
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Security Industry Authority regulated</li>
                    <li>• Enhanced background checks & vetting</li>
                    <li>• Professional close protection training</li>
                    <li>• Conflict management & de-escalation</li>
                    <li>• First aid & emergency response trained</li>
                    <li>• Continuous professional development</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span>Our SIA Credentials</span>
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• 100% SIA licensed driver fleet</li>
                    <li>• Close Protection (CP) qualified</li>
                    <li>• Door Supervision (DS) certified</li>
                    <li>• CCTV & Security Guarding licensed</li>
                    <li>• Advanced driving qualifications</li>
                    <li>• Regular compliance audits</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30">
                <h4 className="text-lg font-bold text-white mb-4 text-center">🚨 Why Choose SIA Licensed Security Drivers?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-bold text-green-400 mb-1">Enhanced Security</h5>
                    <p className="text-xs text-gray-300">Professional threat assessment and protection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-bold text-blue-400 mb-1">Trusted Professionals</h5>
                    <p className="text-xs text-gray-300">Vetted, licensed, and continuously trained</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-bold text-purple-400 mb-1">Premium Service</h5>
                    <p className="text-xs text-gray-300">Executive-level protection and discretion</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TFL Licensed Tab */}
          {activeTab === 'tfl' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">🚗 TFL Licensed Private Hire</h3>
                <p className="text-gray-300">Transport for London regulated private hire operators</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-500/20 p-6 rounded-xl border border-green-500/30">
                  <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>TFL Licensing Standards</span>
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Transport for London regulated</li>
                    <li>• Enhanced DBS criminal record checks</li>
                    <li>• Medical fitness assessments</li>
                    <li>• Topographical knowledge testing</li>
                    <li>• English language proficiency</li>
                    <li>• Regular vehicle inspections (MOT+)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-yellow-500" />
                    <span>Our TFL Compliance</span>
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Full TFL operator license</li>
                    <li>• All drivers TFL private hire licensed</li>
                    <li>• Vehicles licensed for private hire</li>
                    <li>• Comprehensive insurance coverage</li>
                    <li>• 24/7 booking and dispatch system</li>
                    <li>• Customer complaint handling procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                <h4 className="text-lg font-bold text-white mb-4 text-center">✅ Pre-Booking Advantages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center bg-black/30 p-4 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h5 className="font-bold text-blue-400 mb-1">Guaranteed Pickup</h5>
                    <p className="text-xs text-gray-300">Pre-booked rides are prioritized</p>
                  </div>
                  <div className="text-center bg-black/30 p-4 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h5 className="font-bold text-yellow-400 mb-1">Fixed Pricing</h5>
                    <p className="text-xs text-gray-300">No surge pricing or surprises</p>
                  </div>
                  <div className="text-center bg-black/30 p-4 rounded-lg">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h5 className="font-bold text-green-400 mb-1">Driver Details</h5>
                    <p className="text-xs text-gray-300">Know your driver in advance</p>
                  </div>
                  <div className="text-center bg-black/30 p-4 rounded-lg">
                    <Plane className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h5 className="font-bold text-purple-400 mb-1">Airport Transfers</h5>
                    <p className="text-xs text-gray-300">Flight tracking & meet & greet</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pre-Booking Tab */}
          {activeTab === 'booking' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">📅 Advanced Pre-Booking System</h3>
                <p className="text-gray-300">Professional booking platform with smart scheduling</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-purple-500/20 p-6 rounded-xl border border-purple-500/30">
                    <h4 className="text-lg font-bold text-purple-400 mb-4">🎯 Booking Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Instant bookings (1-20 min)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Advance bookings (up to 6 months)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Recurring trips (daily/weekly/monthly)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Multi-stop journeys</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-4">💳 Payment Methods</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/30 p-3 rounded-lg text-center">
                        <span className="text-sm text-gray-300">💳 Cards</span>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg text-center">
                        <span className="text-sm text-gray-300">📱 Digital</span>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg text-center">
                        <span className="text-sm text-gray-300">🏢 Corporate</span>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg text-center">
                        <span className="text-sm text-gray-300">💷 Account</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">📞 Book Now</h4>
                  <div className="space-y-4">
                    <a 
                      href="tel:07407655203"
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-5 h-5" />
                      <span>📞 Call: 07407 655 203</span>
                    </a>
                    
                    <a 
                      href="https://wa.me/447407655203"
                      target="_blank"
                      className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>💬 WhatsApp Booking</span>
                    </a>
                    
                    <a 
                      href="mailto:bookings@gqcars.co.uk"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>📧 Email Booking</span>
                    </a>
                  </div>
                  
                  <div className="mt-4 p-4 bg-black/30 rounded-lg">
                    <h5 className="font-bold text-yellow-400 mb-2">🔥 Current Offer</h5>
                    <p className="text-sm text-gray-300">50% OFF your first ride</p>
                    <p className="text-xs text-gray-400">New customers only • Code: FIRST50</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Smart Platform Features Tab */}
          {activeTab === 'platform' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">🚀 Smart Technology Platform</h3>
                <p className="text-gray-300">Intelligent features powered by advanced technology</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-500/20 p-6 rounded-xl border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-yellow-400 mb-4">🤖 AI-Powered Features</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Smart route optimization</li>
                    <li>• Intelligent pricing algorithms</li>
                    <li>• Predictive availability</li>
                    <li>• Automated driver matching</li>
                    <li>• Voice recognition booking</li>
                    <li>• Real-time traffic analysis</li>
                  </ul>
                </div>
                
                <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">📱 Smart Booking</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Location-based autocomplete</li>
                    <li>• Favorite destinations memory</li>
                    <li>• Calendar integration</li>
                    <li>• Flight tracking & delays</li>
                    <li>• Weather-adjusted timing</li>
                    <li>• Multi-language support</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/20 p-6 rounded-xl border border-green-500/30">
                  <h4 className="text-lg font-bold text-green-400 mb-4">🛡️ Security Features</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Real-time GPS tracking</li>
                    <li>• Emergency panic button</li>
                    <li>• Driver background verification</li>
                    <li>• Journey recording</li>
                    <li>• Safe word protocols</li>
                    <li>• 24/7 monitoring center</li>
                  </ul>
                </div>
                
                <div className="bg-purple-500/20 p-6 rounded-xl border border-purple-500/30">
                  <h4 className="text-lg font-bold text-purple-400 mb-4">⭐ Premium Experience</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Personalized service profiles</li>
                    <li>• VIP customer recognition</li>
                    <li>• Luxury vehicle selection</li>
                    <li>• Concierge-style support</li>
                    <li>• Priority booking queue</li>
                    <li>• Exclusive member benefits</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-black p-6 rounded-xl border border-gray-600">
                <h4 className="text-lg font-bold text-white mb-4 text-center">🏆 Platform Statistics</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-1">99.8%</div>
                    <div className="text-gray-300 text-sm">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-1">&lt;2s</div>
                    <div className="text-gray-300 text-sm">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-1">4.9★</div>
                    <div className="text-gray-300 text-sm">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-1">24/7</div>
                    <div className="text-gray-300 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:07407655203"
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>📞 Book Now: 07407 655 203</span>
            </a>
            <a 
              href="https://wa.me/447407655203"
              target="_blank"
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>💬 WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}