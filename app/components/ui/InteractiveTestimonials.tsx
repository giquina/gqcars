"use client"

import React, { useState, useEffect } from 'react'
import { Star, Heart, MessageCircle, Share2, User, Verified, ThumbsUp } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar: string
  likes: number
  comments: number
  verified: boolean
  service: string
  date: string
  liked: boolean
}

export default function InteractiveTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const mockTestimonials: Testimonial[] = [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Business Executive',
        content: 'Absolutely incredible service! The SIA licensed driver was professional, the vehicle was immaculate, and the real-time tracking made me feel secure throughout the journey. Will definitely book again!',
        rating: 5,
        avatar: '👩‍💼',
        likes: 24,
        comments: 3,
        verified: true,
        service: 'Executive Service',
        date: '2 hours ago',
        liked: false
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'Wedding Planner',
        content: 'GQ Cars made our wedding day perfect! The chauffeur arrived early, was impeccably dressed, and made sure the bride and groom felt like royalty. The attention to detail was outstanding.',
        rating: 5,
        avatar: '👨‍💼',
        likes: 18,
        comments: 7,
        verified: true,
        service: 'Wedding Service',
        date: '1 day ago',
        liked: false
      },
      {
        id: 3,
        name: 'Emma Wilson',
        role: 'Corporate Client',
        content: 'The close protection service exceeded all expectations. Professional, discreet, and made me feel completely safe during a high-profile business meeting. Highly recommend!',
        rating: 5,
        avatar: '👩‍🎓',
        likes: 31,
        comments: 5,
        verified: true,
        service: 'Close Protection',
        date: '3 days ago',
        liked: false
      },
      {
        id: 4,
        name: 'David Smith',
        role: 'Frequent Traveler',
        content: 'The airport transfer was seamless! Flight tracking, meet & greet service, and the driver even helped with my luggage. This is how premium service should be done.',
        rating: 5,
        avatar: '👨‍✈️',
        likes: 15,
        comments: 2,
        verified: false,
        service: 'Airport Transfer',
        date: '5 days ago',
        liked: false
      }
    ]
    setTestimonials(mockTestimonials)
  }, [])

  const handleLike = (id: number) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id 
        ? { 
            ...testimonial, 
            liked: !testimonial.liked,
            likes: testimonial.liked ? testimonial.likes - 1 : testimonial.likes + 1
          }
        : testimonial
    ))
  }

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <MessageCircle className="w-8 h-8 text-blue-500" />
          <span>Client Stories</span>
        </h3>
        <p className="text-gray-300">Real experiences from our valued clients</p>
      </div>

      {/* Featured Testimonial */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
              {currentTestimonial.avatar}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="text-white font-bold">{currentTestimonial.name}</h4>
              {currentTestimonial.verified && (
                <Verified className="w-4 h-4 text-blue-400" />
              )}
              <span className="text-gray-400 text-sm">• {currentTestimonial.role}</span>
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < currentTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-blue-400 text-sm font-semibold">{currentTestimonial.service}</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-4">
              {expandedId === currentTestimonial.id 
                ? currentTestimonial.content 
                : `${currentTestimonial.content.substring(0, 120)}...`
              }
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(currentTestimonial.id)}
                  className={`flex items-center space-x-2 transition-all ${
                    currentTestimonial.liked 
                      ? 'text-red-400' 
                      : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${currentTestimonial.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{currentTestimonial.likes}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-gray-400">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{currentTestimonial.comments}</span>
                </div>
                
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-xs">{currentTestimonial.date}</span>
                <button
                  onClick={() => handleExpand(currentTestimonial.id)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                >
                  {expandedId === currentTestimonial.id ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevTestimonial}
          className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors"
        >
          ←
        </button>
        
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextTestimonial}
          className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors"
        >
          →
        </button>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.filter(t => t.id !== currentTestimonial.id).slice(0, 3).map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all cursor-pointer transform hover:scale-105"
            onClick={() => setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id))}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {testimonial.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h5 className="text-white font-semibold text-sm">{testimonial.name}</h5>
                  {testimonial.verified && <Verified className="w-3 h-3 text-blue-400" />}
                </div>
                <p className="text-gray-400 text-xs">{testimonial.role}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {testimonial.content.substring(0, 80)}...
            </p>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-blue-400 text-xs font-semibold">{testimonial.service}</span>
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400 text-xs">{testimonial.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}