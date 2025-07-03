"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Building, Shield, Clock, Star, Users, Car, Phone, Calendar, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function CorporateServicePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🏢 CORPORATE TRANSPORTATION"
              subtitle="Professional corporate transportation solutions for businesses. Reliable, secure, and efficient service for executives, clients, and teams."
              icon={Building}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🏢 Book Corporate Service
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
          <h2 className="text-3xl font-bold text-center mb-12">Corporate Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Briefcase className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Executive Transport</h3>
              <p className="text-gray-300">Premium vehicles and professional drivers for C-suite executives and key personnel.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Team Transportation</h3>
              <p className="text-gray-300">Group transportation for meetings, events, and corporate functions.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Client Services</h3>
              <p className="text-gray-300">Impress clients with professional transportation for meetings and events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Corporate Transportation</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500">
                      <option>Executive Transport</option>
                      <option>Client Pickup</option>
                      <option>Team Transportation</option>
                      <option>Airport Transfer</option>
                      <option>Event Transportation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                    <input type="text" placeholder="Your company" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Office or location" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Meeting venue or destination" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Corporate Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Corporate Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"GQ Cars has been our trusted partner for executive transportation. Their reliability and professionalism are outstanding."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <div>
                  <p className="font-semibold">Robert Johnson</p>
                  <p className="text-sm text-gray-400">Operations Director</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Perfect for our client meetings. The service always impresses our international clients and partners."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <p className="font-semibold">Lisa Chen</p>
                  <p className="text-sm text-gray-400">Client Relations Manager</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used them for our annual conference. Transported 50+ executives flawlessly. Highly recommended."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Mark Williams</p>
                  <p className="text-sm text-gray-400">Event Coordinator</p>
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
            title="🏢 CORPORATE SUCCESS STORIES"
            subtitle="Real examples of how we've delivered exceptional corporate transportation solutions"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Case Study 1 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Global Tech Conference</h3>
                  <p className="text-gray-400">Fortune 500 Technology Company</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Coordinate transportation for 80+ international executives attending a 3-day technology summit across multiple London venues.
                </p>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Deployed a fleet of 12 luxury vehicles with dedicated drivers, real-time tracking, and 24/7 dispatch coordination.
                </p>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 100% on-time arrival rate across 240+ transfers</li>
                  <li>• Zero security incidents or protocol breaches</li>
                  <li>• 98% client satisfaction rating</li>
                  <li>• Renewed contract for annual events</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 2 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-500 p-3 rounded-full mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Board Meeting Transport</h3>
                  <p className="text-gray-400">International Banking Group</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide discrete, secure transportation for board members during sensitive merger negotiations.
                </p>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  SIA-licensed close protection drivers, encrypted communication, route variation, and armoured vehicles.
                </p>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Complete confidentiality maintained</li>
                  <li>• Enhanced security protocols implemented</li>
                  <li>• Successful completion of all transfers</li>
                  <li>• Ongoing security transport contract</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 3 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Client Hospitality Program</h3>
                  <p className="text-gray-400">Luxury Real Estate Firm</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Impress high-net-worth international clients with premium transportation during property viewings.
                </p>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Luxury fleet with multilingual drivers, champagne service, and personalised itineraries.
                </p>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 85% client conversion rate increase</li>
                  <li>• Enhanced brand perception</li>
                  <li>• Exclusive transport partnership</li>
                  <li>• Referral program established</li>
                </ul>
              </div>
            </BoldCard>

            {/* Case Study 4 */}
            <BoldCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Emergency Executive Transport</h3>
                  <p className="text-gray-400">Healthcare Corporation</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-orange-400 mb-3">Challenge</h4>
                <p className="text-gray-300 mb-4">
                  Provide immediate, secure transport for senior executives during a crisis management situation.
                </p>
                <h4 className="text-lg font-semibold text-orange-400 mb-3">Solution</h4>
                <p className="text-gray-300 mb-4">
                  Emergency response protocol with 15-minute deployment time and secure communication channels.
                </p>
                <h4 className="text-lg font-semibold text-orange-400 mb-3">Results</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• 12-minute average response time</li>
                  <li>• Crisis management support enabled</li>
                  <li>• Long-term emergency services contract</li>
                  <li>• Protocol now company standard</li>
                </ul>
              </div>
            </BoldCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Elevate Your Business Transportation</h2>
          <p className="text-white/90 mb-8 text-lg">Professional corporate solutions for your business needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Corporate Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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