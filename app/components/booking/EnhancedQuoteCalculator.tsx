'use client'

import { useState, useEffect, useCallback } from 'react';
import { Calculator, Car, Shield, MapPin, Clock, Users, Plane, TrendingUp } from 'lucide-react';
import { pricingEngine } from '../../lib/pricing-engine';
import { BookingDetails } from '../../types/payment';

interface EnhancedQuoteCalculatorProps {
  onQuoteCalculated?: (quote: any) => void;
  onBookingReady?: (booking: BookingDetails) => void;
}

export default function EnhancedQuoteCalculator({ 
  onQuoteCalculated, 
  onBookingReady 
}: EnhancedQuoteCalculatorProps) {
  // Form state
  const [serviceType, setServiceType] = useState<'standard' | 'close-protection' | 'vip' | 'corporate'>('standard');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'executive' | 'luxury'>('sedan');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [distance, setDistance] = useState(10);
  const [duration, setDuration] = useState(20);
  const [requiresSIA, setRequiresSIA] = useState(true);
  const [isAirportTransfer, setIsAirportTransfer] = useState(false);
  const [airportCode, setAirportCode] = useState<'heathrow' | 'gatwick' | 'stansted' | 'luton' | 'cityAirport'>('heathrow');
  const [specialRequests, setSpecialRequests] = useState('');

  // Quote state
  const [quote, setQuote] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [surgeInfo, setSurgeInfo] = useState<{ active: boolean; multiplier: number; reason: string }>({
    active: false,
    multiplier: 1,
    reason: ''
  });

  // Calculate quote when form changes
  const calculateQuote = useCallback(async () => {
    if (!pickupLocation || !dropoffLocation || !pickupDate || !pickupTime) {
      setQuote(null);
      return;
    }

    setIsCalculating(true);

    try {
      // Create booking details for pricing calculation
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      
      const bookingDetails: BookingDetails = {
        id: `quote-${Date.now()}`,
        customerId: 'guest',
        pickupLocation,
        dropoffLocation,
        pickupTime: pickupDateTime,
        distance,
        duration,
        serviceType,
        vehicleType,
        requiresSIA,
        passengerCount,
        specialRequests,
        isAirportTransfer,
        airportCode: isAirportTransfer ? airportCode : undefined,
      };

      // Calculate price breakdown
      const priceBreakdown = pricingEngine.calculatePrice(bookingDetails);
      
      // Check for surge pricing
      const now = new Date();
      const hour = pickupDateTime.getHours();
      const dayOfWeek = pickupDateTime.getDay();
      
      let surgeReason = '';
      if (priceBreakdown.surgeMultiplier > 1) {
        if (dayOfWeek === 0 || dayOfWeek === 6 || (dayOfWeek === 5 && hour >= 18)) {
          surgeReason = 'Weekend premium';
        } else if (hour >= 22 || hour < 6) {
          surgeReason = 'Night time premium';
        } else if ((hour >= 6 && hour < 9) || (hour >= 17 && hour < 20)) {
          surgeReason = 'Peak hours premium';
        }
      }
      
      setSurgeInfo({
        active: priceBreakdown.surgeMultiplier > 1,
        multiplier: priceBreakdown.surgeMultiplier,
        reason: surgeReason
      });

      // Get price estimate range
      const estimate = pricingEngine.estimatePrice(
        distance,
        serviceType,
        requiresSIA,
        isAirportTransfer,
        isAirportTransfer ? airportCode : undefined
      );

      const finalQuote = {
        booking: bookingDetails,
        priceBreakdown,
        estimate,
        surgeInfo: {
          active: priceBreakdown.surgeMultiplier > 1,
          multiplier: priceBreakdown.surgeMultiplier,
          reason: surgeReason
        }
      };

      setQuote(finalQuote);
      onQuoteCalculated?.(finalQuote);

    } catch (error) {
      console.error('Error calculating quote:', error);
      setQuote(null);
    } finally {
      setIsCalculating(false);
    }
  }, [
    pickupLocation, dropoffLocation, pickupDate, pickupTime, distance, duration,
    serviceType, vehicleType, requiresSIA, passengerCount, isAirportTransfer, airportCode
  ]);

  useEffect(() => {
    const timer = setTimeout(calculateQuote, 500); // Debounce calculations
    return () => clearTimeout(timer);
  }, [calculateQuote]);

  const handleBookNow = () => {
    if (quote?.booking) {
      onBookingReady?.(quote.booking);
    }
  };

  return (
    <div className="bg-gq-black/90 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-gq-gold" />
        <h3 className="text-2xl font-bold">Professional Driver Quote</h3>
        <Shield className="w-5 h-5 text-green-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium mb-3">Service Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'standard', label: 'Standard', icon: Car },
                { value: 'close-protection', label: 'Close Protection', icon: Shield },
                { value: 'vip', label: 'VIP Service', icon: Users },
                { value: 'corporate', label: 'Corporate', icon: Users }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setServiceType(value as any)}
                  className={`p-3 border rounded-lg flex items-center gap-2 transition-all ${
                    serviceType === value
                      ? 'border-gq-gold bg-gq-gold/10 text-gq-gold'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium mb-3">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
            >
              <option value="sedan">Sedan (4 passengers)</option>
              <option value="suv">SUV (6 passengers)</option>
              <option value="executive">Executive (4 passengers)</option>
              <option value="luxury">Luxury (4 passengers)</option>
            </select>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Pickup Location
              </label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Enter pickup address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Drop-off Location
              </label>
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Enter destination address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
              />
            </div>
          </div>

          {/* Distance and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Distance (miles)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                min="1"
                max="500"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                min="1"
                max="1440"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Number of Passengers
            </label>
            <select
              value={passengerCount}
              onChange={(e) => setPassengerCount(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sia-driver"
                checked={requiresSIA}
                onChange={(e) => setRequiresSIA(e.target.checked)}
                className="w-4 h-4 text-gq-gold bg-gray-800 border-gray-600 rounded focus:ring-gq-gold"
              />
              <label htmlFor="sia-driver" className="ml-3 text-sm">
                <Shield className="w-4 h-4 inline mr-1 text-green-400" />
                SIA Licensed Driver (+25% premium)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="airport-transfer"
                checked={isAirportTransfer}
                onChange={(e) => setIsAirportTransfer(e.target.checked)}
                className="w-4 h-4 text-gq-gold bg-gray-800 border-gray-600 rounded focus:ring-gq-gold"
              />
              <label htmlFor="airport-transfer" className="ml-3 text-sm">
                <Plane className="w-4 h-4 inline mr-1 text-blue-400" />
                Airport Transfer
              </label>
            </div>

            {isAirportTransfer && (
              <div className="ml-7">
                <select
                  value={airportCode}
                  onChange={(e) => setAirportCode(e.target.value as any)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:border-gq-gold outline-none text-sm"
                >
                  <option value="heathrow">Heathrow (+£20)</option>
                  <option value="gatwick">Gatwick (+£15)</option>
                  <option value="stansted">Stansted (+£15)</option>
                  <option value="luton">Luton (+£10)</option>
                  <option value="cityAirport">City Airport (+£10)</option>
                </select>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium mb-2">Special Requests</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requirements or notes..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-gq-gold outline-none resize-none"
            />
          </div>
        </div>

        {/* Quote Section */}
        <div className="space-y-6">
          {isCalculating ? (
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
            </div>
          ) : quote ? (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-gq-gold">Quote Breakdown</h4>
              
              {/* Surge Pricing Alert */}
              {surgeInfo.active && (
                <div className="bg-orange-900/20 border border-orange-500 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-orange-400">
                      {surgeInfo.reason} ({surgeInfo.multiplier}x pricing)
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Base fare ({distance} miles @ £3.50/mile)</span>
                  <span>£{quote.priceBreakdown.baseFare.toFixed(2)}</span>
                </div>
                
                {quote.priceBreakdown.securityPremium > 0 && (
                  <div className="flex justify-between">
                    <span>SIA Security Premium (25%)</span>
                    <span>£{quote.priceBreakdown.securityPremium.toFixed(2)}</span>
                  </div>
                )}
                
                {quote.priceBreakdown.airportSurcharge > 0 && (
                  <div className="flex justify-between">
                    <span>Airport surcharge</span>
                    <span>£{quote.priceBreakdown.airportSurcharge.toFixed(2)}</span>
                  </div>
                )}
                
                {quote.priceBreakdown.surgePricing > 0 && (
                  <div className="flex justify-between">
                    <span>Surge pricing ({quote.priceBreakdown.surgeMultiplier}x)</span>
                    <span>£{quote.priceBreakdown.surgePricing.toFixed(2)}</span>
                  </div>
                )}
                
                {quote.priceBreakdown.waitingTime > 0 && (
                  <div className="flex justify-between">
                    <span>Waiting time ({duration} mins @ £0.50/min)</span>
                    <span>£{quote.priceBreakdown.waitingTime.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>£{quote.priceBreakdown.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (20%)</span>
                    <span>£{quote.priceBreakdown.vat.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-600 pt-3 font-bold text-lg">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-gq-gold">£{quote.priceBreakdown.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-600">
                <div className="text-xs text-gray-400 mb-4">
                  <p>• All drivers are SIA licensed professionals</p>
                  <p>• Price includes fuel, insurance, and driver</p>
                  <p>• VAT included as shown</p>
                  <p>• Minimum fare: £8.00</p>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="w-full py-3 px-6 bg-gq-gold hover:bg-yellow-500 text-black font-bold rounded-lg transition-all transform hover:scale-105"
                >
                  Book Now - £{quote.priceBreakdown.total.toFixed(2)}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <Calculator className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                Fill in the pickup location, destination, date and time to get your quote
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}