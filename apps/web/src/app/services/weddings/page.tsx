"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Heart, Shield, Clock, Star, Users, Car, Phone, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function WeddingsServicePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="💖 WEDDING TRANSPORTATION"
              subtitle="Make your special day perfect with our elegant wedding transportation service. Luxury vehicles, professional drivers, and attention to every detail."
              icon={Heart}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  💖 Book Wedding Service
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
          <h2 className="text-3xl font-bold text-center mb-12">Wedding Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Bride & Groom</h3>
              <p className="text-gray-300">Luxury transportation for the happy couple on their special day.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Wedding Party</h3>
              <p className="text-gray-300">Transportation for bridesmaids, groomsmen, and family members.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Guest Transport</h3>
              <p className="text-gray-300">Reliable service for wedding guests between venues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Wedding Transportation</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Wedding Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500">
                      <option>Bride & Groom Transport</option>
                      <option>Wedding Party Transport</option>
                      <option>Guest Transportation</option>
                      <option>Full Wedding Package</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ceremony Venue</label>
                    <input type="text" placeholder="Church, registry office, etc." className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reception Venue</label>
                    <input type="text" placeholder="Hotel, venue, etc." className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ceremony Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Guests</label>
                    <input type="number" placeholder="How many guests need transport" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Wedding Quote
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
            title="📋 WEDDING TRANSPORTATION CASE STUDIES"
            subtitle="Making dream weddings perfect with elegant transportation"
            centered
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center mr-4 border border-pink-400/30">
                    <span className="text-pink-400 font-black text-lg">👑</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                    Royal-Style Country Estate Wedding
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: Aristocratic Family | Location: Private Estate & Historic Church</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Traditional aristocratic wedding requiring transport for 200+ guests between historic church and private estate with strict timing coordination and formal protocols.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Coordinated luxury fleet including Rolls Royce for bride/groom, vintage Bentleys for family, and elegant coaches for guests with ceremonial timing precision.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Flawless execution with perfect timing throughout ceremony, all guests transported elegantly, and couple's dream royal-style wedding exceeded expectations.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center mr-4 border border-pink-400/30">
                    <span className="text-pink-400 font-black text-lg">🏛️</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                    London Landmark Wedding Tour
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: International Couple | Location: Westminster & Iconic London Sites</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">International couple wanted wedding photos at multiple London landmarks with tight scheduling between ceremony and reception while managing London traffic and tourist crowds.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Provided Rolls Royce Phantom with London expert chauffeur, optimized route planning, and coordination with landmark authorities for exclusive photo access.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Completed photo tour at 6 iconic locations on schedule, captured stunning wedding memories, and arrived at reception perfectly on time for grand entrance.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center mr-4 border border-pink-400/30">
                    <span className="text-pink-400 font-black text-lg">🌟</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                    Celebrity Secret Wedding
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: Entertainment Industry Star | Location: Private Venue & Exclusive Locations</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">High-profile celebrity required completely private wedding transport with maximum security from paparazzi, discrete venue access, and luxury service for A-list guests.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Deployed armored Bentley with counter-surveillance team, alternative route planning, and coordinated with venue security for completely private celebrations.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Maintained complete secrecy throughout wedding day, zero media leaks or paparazzi incidents, and celebrity couple enjoyed perfect private celebration.</p>
                </div>
              </div>
            </BoldCard>

            <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center mr-4 border border-pink-400/30">
                    <span className="text-pink-400 font-black text-lg">🌍</span>
                  </div>
                  <h3 className="text-xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                    Multicultural Wedding Celebration
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Client: British-Indian Couple | Location: Multiple Venues & Cultural Sites</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">🎯 Challenge</h4>
                  <p className="text-gray-300">Complex 3-day multicultural wedding requiring transport for traditional ceremonies across multiple venues with cultural sensitivity and diverse guest transportation needs.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">💡 Solution</h4>
                  <p className="text-gray-300">Provided diverse luxury fleet accommodating cultural requirements, decorated vehicles for traditional ceremonies, and multilingual driver support for international guests.</p>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-2">📊 Results</h4>
                  <p className="text-gray-300">Successfully honored both cultures with appropriate transport, seamless 3-day celebration execution, and universal guest satisfaction across diverse backgrounds.</p>
                </div>
              </div>
            </BoldCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Wedding Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-pink-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"The Rolls Royce was absolutely stunning! Our driver was so professional and made our wedding day even more special."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <p className="font-semibold">Sophie & James</p>
                  <p className="text-sm text-gray-400">Newlyweds</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-pink-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Perfect service for our entire wedding party. All our guests arrived on time and the vehicles were immaculate."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-semibold">Emma & David</p>
                  <p className="text-sm text-gray-400">Bride & Groom</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-pink-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"As a wedding planner, I trust GQ Cars for all my clients. Their attention to detail is exceptional."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold">Amanda Foster</p>
                  <p className="text-sm text-gray-400">Wedding Planner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Make Your Wedding Day Perfect</h2>
          <p className="text-white/90 mb-8 text-lg">Elegant transportation for your special day</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-pink-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Wedding Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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