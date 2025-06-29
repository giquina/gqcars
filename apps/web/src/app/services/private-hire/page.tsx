"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Car, Phone, Calendar, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function PrivateHirePage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🚗 PRIVATE HIRE"
              subtitle="Professional private hire services for all your transportation needs. Reliable, comfortable, and secure travel with SIA licensed drivers."
              icon={Car}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🚗 Book Private Hire
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
          <h2 className="text-3xl font-bold text-center mb-12">Private Hire Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <CheckCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Reliable Service</h3>
              <p className="text-gray-300">Punctual, professional, and dependable transportation for any occasion.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">SIA Licensed</h3>
              <p className="text-gray-300">All drivers are SIA licensed and security trained for your safety.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <MapPin className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">London Wide</h3>
              <p className="text-gray-300">Comprehensive coverage across London and surrounding areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Private Hire</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Journey Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500">
                      <option>Point to Point</option>
                      <option>Hourly Hire</option>
                      <option>Return Journey</option>
                      <option>Multi-Stop</option>
                      <option>Airport Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500">
                      <option>Executive Saloon</option>
                      <option>Luxury Vehicle</option>
                      <option>People Carrier</option>
                      <option>SUV</option>
                      <option>Minibus</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Address or landmark" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Address or destination" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Passengers</label>
                    <input type="number" min="1" max="8" placeholder="1-8" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Luggage</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-slate-500">
                      <option>None</option>
                      <option>1-2 pieces</option>
                      <option>3-4 pieces</option>
                      <option>5+ pieces</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-slate-500 hover:bg-slate-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Get Private Hire Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Private Hire Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-slate-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Excellent private hire service. Driver was professional, vehicle was clean, and the journey was comfortable."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <p className="font-semibold">James Wilson</p>
                  <p className="text-sm text-gray-400">Business Traveler</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-slate-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Used their private hire for a family outing. Perfect service, on time, and very accommodating."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold">Anna Thompson</p>
                  <p className="text-sm text-gray-400">Family Client</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-slate-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Reliable private hire service for my regular business trips. Always punctual and professional."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">D</span>
                </div>
                <div>
                  <p className="font-semibold">David Brown</p>
                  <p className="text-sm text-gray-400">Regular Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-500 to-gray-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Professional Private Hire</h2>
          <p className="text-white/90 mb-8 text-lg">Reliable transportation for all your needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-slate-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Private Hire
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
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