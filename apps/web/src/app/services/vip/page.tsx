"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Crown, Shield, Clock, Star, Users, Car, Phone, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function VIPServicePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="👑 VIP TRANSPORTATION"
              subtitle="Exclusive VIP transportation service with the highest standards of luxury, security, and discretion. Experience unparalleled service with our premium fleet."
              icon={Crown}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  👑 Book VIP Service
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
          <h2 className="text-3xl font-bold text-center mb-12">VIP Service Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Fleet</h3>
              <p className="text-gray-300">Luxury vehicles including Mercedes S-Class, Range Rover, and Bentley models.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Maximum Security</h3>
              <p className="text-gray-300">SIA licensed drivers with advanced security training and background checks.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-300">Round-the-clock service with instant response times and priority booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book VIP Transportation</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500">
                      <option>Mercedes S-Class</option>
                      <option>Range Rover Autobiography</option>
                      <option>Bentley Continental</option>
                      <option>Rolls Royce Phantom</option>
                      <option>Custom Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500">
                      <option>Airport Transfer</option>
                      <option>Event Transportation</option>
                      <option>Business Travel</option>
                      <option>Wedding Service</option>
                      <option>Celebrity Transport</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Address or location" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Destination address" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get VIP Quote
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
            title="📋 VIP TRANSPORTATION CASE STUDIES"
            subtitle="Exclusive service excellence for distinguished clientele"
            centered
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-4 border border-purple-400/30">
                    <span className="text-purple-400 font-black text-lg">🎬</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Hollywood A-List Actor London Visit
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: International Film Star | Location: Private Jet Terminal & Luxury Hotels</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">A-list Hollywood actor required discrete VIP transport for London film premiere with maximum security, privacy protection from paparazzi, and luxury travel experience.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Deployed Rolls Royce Phantom with bullet-resistant features, counter-surveillance team, and coordinated with venue security for seamless red carpet arrival.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Flawless premiere arrival with zero security incidents, complete privacy maintained throughout visit, and client's public image perfectly protected.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-4 border border-purple-400/30">
                    <span className="text-purple-400 font-black text-lg">👑</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Royal Family State Visit Support
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: European Royal House | Location: Diplomatic Venues & State Functions</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">European royal family required VIP transport support during state visit to London with full diplomatic protocol, ceremonial requirements, and highest security standards.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Provided armored Bentley fleet with diplomatic trained drivers, royal protocol expertise, and coordination with Metropolitan Police Special Escort Group.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Perfect diplomatic protocol compliance, enhanced bilateral relations through flawless execution, and commendation from both royal houses.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-4 border border-purple-400/30">
                    <span className="text-purple-400 font-black text-lg">💰</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Tech Billionaire Private Events
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: Technology Mogul | Location: Exclusive Venues & Private Estates</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Tech billionaire hosting exclusive private events across London required VIP transport for high-profile guests with varying security requirements and privacy needs.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Coordinated luxury fleet including Rolls Royce, Bentley, and Range Rover options with tiered security levels based on guest profiles and risk assessments.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Successfully transported 150+ VIP guests across 3 events with zero security breaches and universal client satisfaction with service quality.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-4 border border-purple-400/30">
                    <span className="text-purple-400 font-black text-lg">🏆</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Sports Champion Victory Celebration
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: World Champion Athlete | Location: Victory Parade & Celebration Venues</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">World champion athlete required VIP transport for victory celebration tour across London with media coordination, fan safety management, and ceremonial requirements.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Provided open-top Rolls Royce for parade segments, secure Bentley for private transfers, and coordinated with event security for crowd control and safety.</p>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Triumphant celebration executed flawlessly with perfect media coverage, athlete safety maintained throughout, and memorable victory tour experience delivered.</p>
                </div>
              </div>
            </BoldCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">VIP Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-purple-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Impeccable service from start to finish. The Mercedes S-Class was immaculate, and the driver was the epitome of professionalism."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold">Alexander Wright</p>
                  <p className="text-sm text-gray-400">CEO, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-purple-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used their VIP service for my wedding. The Rolls Royce was stunning and the service was absolutely flawless. Made our special day perfect."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-semibold">Emma Rodriguez</p>
                  <p className="text-sm text-gray-400">Bride</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-purple-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"As a celebrity, discretion is paramount. GQ Cars understands this completely. Their VIP service is unmatched in London."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <p className="font-semibold">James Mitchell</p>
                  <p className="text-sm text-gray-400">Film Actor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Experience VIP Transportation</h2>
          <p className="text-white/90 mb-8 text-lg">Book your exclusive VIP service today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book VIP Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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