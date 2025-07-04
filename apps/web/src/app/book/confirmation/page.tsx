"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { CheckCircle, Phone, Mail, Calendar, MapPin, Users, Car, Clock } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: '',
    service: '',
    date: '',
    time: '',
    pickup: '',
    destination: '',
    passengers: '',
    vehicleType: '',
    totalAmount: ''
  });

  useEffect(() => {
    // Extract booking details from URL params or localStorage
    const bookingId = searchParams?.get('bookingId') || `GQ${Date.now()}`;
    const service = searchParams?.get('service') || 'Premium Transportation';
    const date = searchParams?.get('date') || new Date().toISOString().split('T')[0];
    const time = searchParams?.get('time') || '09:00';
    const pickup = searchParams?.get('pickup') || 'London';
    const destination = searchParams?.get('destination') || 'Airport';
    const passengers = searchParams?.get('passengers') || '2';
    const vehicleType = searchParams?.get('vehicleType') || 'Executive Sedan';
    const totalAmount = searchParams?.get('totalAmount') || '£150';

    setBookingDetails({
      bookingId,
      service,
      date,
      time,
      pickup,
      destination,
      passengers,
      vehicleType,
      totalAmount
    });
  }, [searchParams]);

  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-green-500 p-4 rounded-full animate-pulse">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <BoldSectionHeader 
                title="🎉 BOOKING CONFIRMED!"
                subtitle="Your GQ Cars reservation has been successfully confirmed. We'll be in touch shortly to finalize all details."
                centered
              />
            </div>
          </div>
        </section>

        {/* Booking Details Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Your Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Booking Info */}
                <BoldCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-blue-400" />
                    Booking Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Booking ID:</span>
                      <span className="text-white font-semibold">{bookingDetails.bookingId}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Service:</span>
                      <span className="text-white font-semibold">{bookingDetails.service}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Date:</span>
                      <span className="text-white font-semibold">{bookingDetails.date}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Time:</span>
                      <span className="text-white font-semibold">{bookingDetails.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-300">Total Amount:</span>
                      <span className="text-green-400 font-bold text-xl">{bookingDetails.totalAmount}</span>
                    </div>
                  </div>
                </BoldCard>

                {/* Journey Details */}
                <BoldCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-purple-400" />
                    Journey Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Pickup Location:</span>
                      <span className="text-white font-semibold">{bookingDetails.pickup}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Destination:</span>
                      <span className="text-white font-semibold">{bookingDetails.destination}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-300">Passengers:</span>
                      <span className="text-white font-semibold">{bookingDetails.passengers}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-300">Vehicle Type:</span>
                      <span className="text-white font-semibold">{bookingDetails.vehicleType}</span>
                    </div>
                  </div>
                </BoldCard>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">What Happens Next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <BoldCard className="p-6 text-center">
                  <div className="bg-blue-500 p-4 rounded-full w-fit mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">1. Confirmation Call</h3>
                  <p className="text-gray-300">
                    Our team will call you within 30 minutes to confirm your booking details and answer any questions.
                  </p>
                </BoldCard>

                <BoldCard className="p-6 text-center">
                  <div className="bg-purple-500 p-4 rounded-full w-fit mx-auto mb-4">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">2. Vehicle Assignment</h3>
                  <p className="text-gray-300">
                    We'll assign your dedicated vehicle and driver, then send you their details and contact information.
                  </p>
                </BoldCard>

                <BoldCard className="p-6 text-center">
                  <div className="bg-green-500 p-4 rounded-full w-fit mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">3. Day of Service</h3>
                  <p className="text-gray-300">
                    Your driver will arrive 15 minutes early and provide premium service throughout your journey.
                  </p>
                </BoldCard>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Need to Make Changes?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                If you need to modify your booking or have any questions, please contact us immediately.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:07407655203">
                  <BoldButton size="lg" className="text-lg w-full sm:w-auto">
                    📞 Call: 07407 655 203
                  </BoldButton>
                </a>
                <a href="mailto:bookings@gqcars.co.uk">
                  <BoldButton variant="outline" size="lg" className="text-lg w-full sm:w-auto">
                    📧 Email: bookings@gqcars.co.uk
                  </BoldButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Email Confirmation */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Mail className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Check Your Email</h2>
              <p className="text-white/90 mb-8 text-lg">
                A detailed confirmation email with your booking reference and driver information will be sent to your email address within the next few minutes.
              </p>
              <Link href="/">
                <BoldButton variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white hover:text-blue-600">
                  ← Return to Homepage
                </BoldButton>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </BoldAnimatedBackground>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your booking confirmation...</p>
        </div>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  );
}