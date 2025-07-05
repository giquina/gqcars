"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Car, Phone, Calendar, Eye, Lock } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function CloseProtectionPage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🛡️ CLOSE PROTECTION"
              subtitle="Professional close protection services with SIA licensed security personnel. Maximum security and discretion for high-profile individuals and events."
              icon={Shield}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🛡️ Book Protection Service
                </BoldButton>
              </Link>
              <a href="tel:07407655203">
                <BoldButton variant="outline" size="lg" className="text-lg">
                  📞 Call Now: 07407 655 203
                </BoldButton>
              </a>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Close Protection Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Eye className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personal Protection</h3>
              <p className="text-gray-300">24/7 personal security for high-profile individuals and executives.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Event Security</h3>
              <p className="text-gray-300">Comprehensive security for corporate events, VIP functions, and private parties.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Car className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Transport</h3>
              <p className="text-gray-300">Armored vehicles with trained security drivers for maximum protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Close Protection</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-500">
                      <option>Personal Protection</option>
                      <option>Event Security</option>
                      <option>Secure Transport</option>
                      <option>Executive Protection</option>
                      <option>Celebrity Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-500">
                      <option>Single Event</option>
                      <option>Daily Protection</option>
                      <option>Weekly Protection</option>
                      <option>Monthly Protection</option>
                      <option>Long-term Contract</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location/Event Details</label>
                  <textarea placeholder="Describe your security requirements and locations" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Security Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-red-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Exceptional close protection service. The team was professional, discreet, and highly trained. Felt completely secure throughout."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <p className="font-semibold">CEO, Fortune 500</p>
                  <p className="text-sm text-gray-400">Confidential Client</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-red-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used their services for a high-profile event. The security team was impeccable and handled everything professionally."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-semibold">Event Director</p>
                  <p className="text-sm text-gray-400">Major Corporation</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-red-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"As a public figure, I need reliable security. GQ Cars provides the highest level of protection with complete discretion."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold">Public Figure</p>
                  <p className="text-sm text-gray-400">Confidential</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <BoldSectionHeader 
            title="🛡️ CLOSE PROTECTION SUCCESS STORIES"
            subtitle="Real-world examples of our professional security services protecting high-profile clients"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Case Study 1 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-red-500 p-3 rounded-full mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Celebrity Protection Detail</h3>
                  <p className="text-gray-400">A-List Celebrity - Award Show Circuit</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide discrete close protection for international celebrity during high-profile events with intense media attention and large crowds.
                </p>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Deployed 4-person SIA licensed team with advance reconnaissance, crowd control expertise, and coordinated media management.
                </p>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Zero security incidents across 8 events</li>
                  <li>• Seamless media interactions managed</li>
                  <li>• Client privacy completely maintained</li>
                  <li>• Ongoing exclusive protection contract</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 2 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Executive Threat Assessment</h3>
                  <p className="text-gray-400">Tech Industry CEO - Hostile Takeover</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-orange-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide 24/7 executive protection during sensitive business negotiations with elevated threat level.
                </p>
                <h4 className="text-lg font-semibold text-orange-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Comprehensive security assessment, armoured vehicle deployment, residential security, and threat monitoring.
                </p>
                <h4 className="text-lg font-semibold text-orange-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 6-month protection program executed</li>
                  <li>• Multiple threat attempts neutralized</li>
                  <li>• Client family security ensured</li>
                  <li>• Successful business deal completion</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 3 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-500 p-3 rounded-full mr-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">High-Profile Wedding Security</h3>
                  <p className="text-gray-400">Royal Family Member - Private Ceremony</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Secure private wedding ceremony with 200+ guests including international dignitaries and celebrities.
                </p>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Multi-layered security perimeter, guest screening, drone surveillance, and coordinated law enforcement liaison.
                </p>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Flawless 3-day event security</li>
                  <li>• Zero privacy breaches or incidents</li>
                  <li>• Royal protection standards exceeded</li>
                  <li>• Prestigious security award received</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 4 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Diplomatic Security Detail</h3>
                  <p className="text-gray-400">Foreign Minister - Official UK Visit</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide supplementary close protection for foreign dignitary during official state visit with complex itinerary.
                </p>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Coordinated with diplomatic security services, advance team deployment, and secure transport convoy.
                </p>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 7-day diplomatic protection program</li>
                  <li>• Seamless multi-agency coordination</li>
                  <li>• International security standards met</li>
                  <li>• Diplomatic services contract expanded</li>
                </ul>
              </div>
            </BoldCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Secure Your Protection</h2>
          <p className="text-white/90 mb-8 text-lg">Professional close protection services with SIA licensed personnel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Protection Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Call: 07407 655 203
              </button>
            </a>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </BoldAnimatedBackground>
  );
} 