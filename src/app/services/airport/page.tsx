"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Plane, Shield, Clock, Star, MapPin, Users, Car, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function AirportTransfersPage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="✈️ AIRPORT TRANSFERS"
              subtitle="Professional, reliable airport transportation with SIA licensed security drivers. From Heathrow to Gatwick, we ensure your journey is safe, comfortable, and on time."
              icon={Plane}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  ✈️ Book Airport Transfer
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🛡️ WHY CHOOSE OUR AIRPORT TRANSFERS?"
              subtitle="Professional security transport with unmatched reliability"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BoldCard animated glowing className="text-center h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto">
                  <Shield className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  🛡️ SIA Licensed Security
                </h3>
                <p className="text-gray-300">All our drivers are SIA licensed and security trained for your protection.</p>
              </BoldCard>
              <BoldCard animated glowing className="text-center h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto">
                  <Clock className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ⏰ 24/7 Availability
                </h3>
                <p className="text-gray-300">Round-the-clock service for all flight times, including early morning and late night.</p>
              </BoldCard>
              <BoldCard animated glowing className="text-center h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto">
                  <MapPin className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  📍 Flight Monitoring
                </h3>
                <p className="text-gray-300">We track your flight and adjust pickup times automatically for delays.</p>
              </BoldCard>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <BoldSectionHeader 
                title="✈️ BOOK YOUR AIRPORT TRANSFER"
                subtitle="Professional airport transportation at your fingertips"
                centered
              />
              <BoldCard glowing className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500">
                      <option>Heathrow Airport</option>
                      <option>Gatwick Airport</option>
                      <option>Stansted Airport</option>
                      <option>Luton Airport</option>
                      <option>London City Airport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Your address or hotel" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Number of Passengers</label>
                  <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+ (Contact us)</option>
                  </select>
                </div>
                <BoldButton type="submit" size="lg" className="w-full">
                  ⚡ Get Quote & Book
                </BoldButton>
              </form>
              </BoldCard>
          </div>
        </div>
      </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="⭐ WHAT OUR CLIENTS SAY"
              subtitle="Real testimonials from satisfied customers"
              centered
            />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"Exceptional service! My driver was waiting at Heathrow even though my flight was delayed. Professional, clean vehicle, and excellent communication throughout."</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-400/30">
                    <span className="text-yellow-400 font-black text-lg">S</span>
                  </div>
                  <div>
                    <p className="font-black text-white">Sarah Mitchell</p>
                    <p className="text-sm text-gray-400">Business Executive</p>
                  </div>
                </div>
              </BoldCard>
              <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"Used them for a family trip to Gatwick. Driver was punctual, vehicle was spotless, and the kids felt safe. Highly recommend for family travel."</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-400/30">
                    <span className="text-yellow-400 font-black text-lg">M</span>
                  </div>
                  <div>
                    <p className="font-black text-white">Michael Chen</p>
                    <p className="text-sm text-gray-400">Family Traveler</p>
                  </div>
                </div>
              </BoldCard>
              <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"As a frequent business traveler, I need reliability. GQ Cars never disappoints. SIA licensed drivers give me peace of mind."</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-400/30">
                    <span className="text-yellow-400 font-black text-lg">D</span>
                  </div>
                  <div>
                    <p className="font-black text-white">David Thompson</p>
                    <p className="text-sm text-gray-400">Business Consultant</p>
                  </div>
                </div>
              </BoldCard>
          </div>
        </div>
      </section>

        {/* Case Studies Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="📊 CASE STUDIES"
              subtitle="Real success stories from our professional airport transfer service"
              centered
            />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BoldCard glowing className="p-8">
                <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">🏢 Corporate Client Success</h3>
              <p className="text-gray-300 mb-4">
                A major tech company needed reliable airport transfers for their executive team traveling between London and international offices.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-400"><strong>Challenge:</strong> Coordinating multiple executives with varying flight schedules</p>
                <p className="text-sm text-gray-400"><strong>Solution:</strong> Dedicated account manager and 24/7 support</p>
                <p className="text-sm text-gray-400"><strong>Result:</strong> 100% on-time performance over 6 months</p>
              </div>
              </BoldCard>
              <BoldCard glowing className="p-8">
                <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">👨‍👩‍👧‍👦 VIP Family Transport</h3>
              <p className="text-gray-300 mb-4">
                High-profile family required discreet, secure transportation for international travel with young children.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-400"><strong>Challenge:</strong> Privacy concerns and child safety requirements</p>
                <p className="text-sm text-gray-400"><strong>Solution:</strong> SIA licensed drivers and child seats provided</p>
                <p className="text-sm text-gray-400"><strong>Result:</strong> Ongoing contract for all family travel needs</p>
              </div>
              </BoldCard>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldCard glowing className="text-center p-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ✈️ READY TO BOOK YOUR AIRPORT TRANSFER?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">Experience the difference with SIA licensed security drivers</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <BoldButton size="lg" className="text-lg">
                    🚗 Book Now
                  </BoldButton>
                </Link>
                <a href="tel:07407655203">
                  <BoldButton variant="outline" size="lg" className="text-lg">
                    📞 Call: 07407 655 203
                  </BoldButton>
                </a>
              </div>
            </BoldCard>
          </div>
        </section>

        <Footer />
      </div>
    </BoldAnimatedBackground>
  );
} 