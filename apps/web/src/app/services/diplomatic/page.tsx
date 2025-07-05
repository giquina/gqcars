"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Car, Phone, Calendar, Award, Globe } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function DiplomaticServicePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🌍 DIPLOMATIC TRANSPORTATION"
              subtitle="Specialized transportation services for diplomatic missions, embassies, and international delegations. Highest standards of security, discretion, and protocol compliance."
              icon={Globe}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🌍 Book Diplomatic Service
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
          <h2 className="text-3xl font-bold text-center mb-12">Diplomatic Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Award className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Embassy Services</h3>
              <p className="text-gray-300">Transportation for embassy staff, diplomats, and official delegations.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Protocol Compliance</h3>
              <p className="text-gray-300">Adherence to diplomatic protocols and international standards.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Car className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Official Events</h3>
              <p className="text-gray-300">Transportation for official ceremonies, meetings, and state functions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Diplomatic Transportation</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                    <input type="text" placeholder="Embassy, consulate, or organization" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500">
                      <option>Diplomatic Transport</option>
                      <option>Official Event Transport</option>
                      <option>Delegation Transport</option>
                      <option>Protocol Transport</option>
                      <option>State Visit Transport</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Embassy, hotel, or venue" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Meeting venue or destination" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Special Requirements</label>
                      <textarea placeholder="Any special protocols, security requirements, or diplomatic considerations" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Diplomatic Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Diplomatic Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-indigo-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Exceptional service for our diplomatic missions. Professional, discreet, and fully compliant with all protocols."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-semibold">European Embassy</p>
                  <p className="text-sm text-gray-400">London Mission</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-indigo-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used their services for official state visits. Impeccable attention to diplomatic protocols and security."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">I</span>
                </div>
                <div>
                  <p className="font-semibold">International Delegation</p>
                  <p className="text-sm text-gray-400">Official Visit</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-indigo-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Reliable partner for all our diplomatic transportation needs. Highest standards of service and security."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <p className="font-semibold">Consulate General</p>
                  <p className="text-sm text-gray-400">Diplomatic Mission</p>
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
            title="🌍 DIPLOMATIC SUCCESS STORIES"
            subtitle="Real examples of our diplomatic transportation services supporting international relations"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Case Study 1 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-500 p-3 rounded-full mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">G7 Summit Transportation</h3>
                  <p className="text-gray-400">International Summit - Multiple Delegations</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Coordinate transportation for 40+ diplomatic delegations during a major international summit with complex security protocols.
                </p>
                <h4 className="text-lg font-semibold text-indigo-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Multi-nation coordination with security services, 24/7 dispatch center, and specialized diplomatic protocols training.
                </p>
                <h4 className="text-lg font-semibold text-indigo-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 500+ diplomatic transfers completed flawlessly</li>
                  <li>• Zero security incidents or delays</li>
                  <li>• International protocol compliance 100%</li>
                  <li>• Diplomatic services contract renewed</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 2 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">State Visit Protocol</h3>
                  <p className="text-gray-400">Head of State - Official UK Visit</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide secure, protocol-compliant transportation for visiting Head of State during 5-day official visit.
                </p>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Armoured vehicle fleet, advance security sweeps, royal protocol specialists, and real-time coordination with security services.
                </p>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Royal protocol standards exceeded</li>
                  <li>• 100% successful official engagements</li>
                  <li>• Media coverage managed professionally</li>
                  <li>• Diplomatic relations strengthened</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 3 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-500 p-3 rounded-full mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">UN Security Council Transport</h3>
                  <p className="text-gray-400">Security Council Meeting - Emergency Session</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide immediate secure transport for UN Security Council members during emergency session with elevated threat level.
                </p>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Emergency response deployment, multi-layered security protocols, and coordination with international protection services.
                </p>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 30-minute emergency response deployment</li>
                  <li>• All diplomats transported safely</li>
                  <li>• Critical negotiations enabled</li>
                  <li>• UN partnership established</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 4 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Embassy Evacuation Support</h3>
                  <p className="text-gray-400">Embassy Crisis - Staff Evacuation</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide emergency evacuation transport for embassy staff and families during security crisis.
                </p>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Crisis response team activation, secure convoy organization, and coordination with government security agencies.
                </p>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 100+ personnel evacuated safely</li>
                  <li>• Zero casualties or incidents</li>
                  <li>• Government commendation received</li>
                  <li>• Crisis response protocols updated</li>
                </ul>
              </div>
            </BoldCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Diplomatic Excellence</h2>
          <p className="text-white/90 mb-8 text-lg">Professional transportation for diplomatic missions and official events</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Diplomatic Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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