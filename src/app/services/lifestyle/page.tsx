"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Car, Phone, Calendar, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function LifestyleServicePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="✨ LIFESTYLE TRANSPORTATION"
              subtitle="Elevate your lifestyle with our premium transportation services. From shopping trips to luxury events, experience the finest in personal transportation."
              icon={Sparkles}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  ✨ Book Lifestyle Service
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
          <h2 className="text-3xl font-bold text-center mb-12">Lifestyle Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Shopping & Leisure</h3>
              <p className="text-gray-300">Luxury transportation for shopping trips, spa visits, and leisure activities.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Luxury Events</h3>
              <p className="text-gray-300">Premium transport for exclusive events, parties, and social gatherings.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Car className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personal Chauffeur</h3>
              <p className="text-gray-300">Dedicated chauffeur service for your daily lifestyle needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Lifestyle Transportation</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500">
                      <option>Shopping & Leisure</option>
                      <option>Luxury Events</option>
                      <option>Personal Chauffeur</option>
                      <option>Spa & Wellness</option>
                      <option>Fine Dining</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500">
                      <option>Mercedes S-Class</option>
                      <option>Range Rover</option>
                      <option>Bentley</option>
                      <option>Rolls Royce</option>
                      <option>Luxury SUV</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Home, hotel, or location" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Shopping center, venue, or destination" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests</label>
                  <textarea placeholder="Any special requirements, preferences, or additional services" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-rose-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Lifestyle Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lifestyle Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-rose-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Perfect for my shopping trips to Harrods and Bond Street. The service is impeccable and the vehicles are stunning."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-sm text-gray-400">Lifestyle Client</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-rose-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used their service for my birthday party. The Rolls Royce was absolutely perfect and made the evening special."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-400">Event Client</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-rose-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"My personal chauffeur service is outstanding. Always punctual, professional, and the vehicles are immaculate."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-semibold">Emma Rodriguez</p>
                  <p className="text-sm text-gray-400">Regular Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Elevate Your Lifestyle</h2>
          <p className="text-white/90 mb-8 text-lg">Premium transportation for the discerning lifestyle</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-rose-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Lifestyle Service
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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