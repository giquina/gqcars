"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Car, Phone, Calendar, Home, Lock } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function FamilyOfficePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🏠 FAMILY OFFICE SERVICES"
              subtitle="Exclusive transportation services for family offices and ultra-high-net-worth individuals. Maximum privacy, discretion, and luxury for your family's transportation needs."
              icon={Home}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🏠 Book Family Service
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
          <h2 className="text-3xl font-bold text-center mb-12">Family Office Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Maximum Privacy</h3>
              <p className="text-gray-300">Complete discretion and confidentiality for family transportation needs.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Users className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Family Transport</h3>
              <p className="text-gray-300">Luxury vehicles for family members, children, and household staff.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Security Focus</h3>
              <p className="text-gray-300">SIA licensed drivers with advanced security training for family protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Family Office Transportation</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500">
                      <option>Family Transport</option>
                      <option>Children's Transport</option>
                      <option>Staff Transport</option>
                      <option>Private Events</option>
                      <option>Luxury Travel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Preference</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500">
                      <option>Mercedes S-Class</option>
                      <option>Range Rover</option>
                      <option>Bentley</option>
                      <option>Rolls Royce</option>
                      <option>Custom Request</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Residence or location" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="School, office, or venue" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Special Requirements</label>
                  <textarea placeholder="Any special needs, security requirements, or preferences" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Family Office Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BoldSectionHeader 
            title="📋 FAMILY OFFICE CASE STUDIES"
            subtitle="Real-world examples of our exclusive family office services"
            centered
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mr-4 border border-emerald-400/30">
                    <span className="text-emerald-400 font-black text-lg">🏠</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Ultra-HNWI Family Privacy Protection
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: International Business Family | Location: Mayfair & Surrey</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Ultra-high-net-worth family required discrete transportation for children's school runs, family shopping trips, and private events while maintaining complete privacy from media attention.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Implemented dedicated family protection team with armored luxury vehicles, counter-surveillance protocols, and 24/7 availability for family members across multiple residences.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Zero security incidents over 2 years, complete privacy maintained, and family able to enjoy normal activities without disruption or media exposure.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mr-4 border border-emerald-400/30">
                    <span className="text-emerald-400 font-black text-lg">🎓</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Children's Educational Transport
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: Private Banking Family | Location: London & Berkshire</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Family office required secure daily transport for three children to different independent schools, with flexible scheduling for extracurricular activities and special requirements.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Deployed child-specialized security drivers with enhanced DBS checks, luxury MPVs with privacy features, and real-time parent tracking app for peace of mind.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">100% punctuality record, children developed trust with dedicated drivers, and parents gained confidence knowing their children were always secure.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mr-4 border border-emerald-400/30">
                    <span className="text-emerald-400 font-black text-lg">🏛️</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Multi-Generational Family Events
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: Aristocratic Family | Location: Country Estate & London</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Coordinated transport for 50+ family members across four generations for major family celebration, including elderly relatives and young children with special needs.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Orchestrated fleet of luxury vehicles with medical-trained drivers, wheelchair accessible options, and precise timing coordination for seamless event logistics.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Flawless execution with all family members transported safely and punctually. Event proceeded without any transport-related delays or issues.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mr-4 border border-emerald-400/30">
                    <span className="text-emerald-400 font-black text-lg">🌍</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    International Family Arrival
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: Middle Eastern Royal Family | Location: Private Terminal & Residences</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Royal family visiting London required maximum security transport from private jet terminal to multiple residences, with cultural sensitivity and protocol requirements.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Deployed armored convoy with diplomatic protocol training, cultural liaison support, and coordinated with Royal Protection Services for seamless VIP treatment.</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Impeccable service delivery meeting royal standards, full cultural protocol compliance, and family expressed complete satisfaction with discretion and professionalism.</p>
                </div>
              </div>
            </BoldCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Family Office Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Exceptional service for our family. The drivers are professional, discreet, and our children feel safe with them."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">F</span>
                </div>
                <div>
                  <p className="font-semibold">Family Office</p>
                  <p className="text-sm text-gray-400">London</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used their services for our private events. Impeccable attention to detail and complete discretion."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold">Private Client</p>
                  <p className="text-sm text-gray-400">Confidential</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Reliable partner for all our family's transportation needs. The luxury vehicles and service are outstanding."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">U</span>
                </div>
                <div>
                  <p className="font-semibold">Ultra-HNWI</p>
                  <p className="text-sm text-gray-400">Private Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Exclusive Family Services</h2>
          <p className="text-white/90 mb-8 text-lg">Luxury transportation with maximum privacy and discretion</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-emerald-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Family Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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