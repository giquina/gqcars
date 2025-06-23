"use client"

import { useState } from 'react'
import { CheckCircle, Calendar, ShieldCheck, BadgeCheck } from 'lucide-react'

const MODAL_FEATURES = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-gold-400 mx-auto mb-2" />, // SIA
    title: 'SIA Licensed',
    subtitle: 'Security Industry Authority certified for your protection.',
    features: [
      'Professional Close Protection',
      'Conflict Management Trained',
      'Enhanced Background Checks',
      'First Aid & Emergency Response',
      'Continuous Professional Development',
    ],
    color: 'from-[#181C2B]/95 to-[#23243A]/90 border-gold-400',
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-elite-purple mx-auto mb-2" />, // TFL
    title: 'TFL Licensed',
    subtitle: 'Transport for London regulated for professional hire.',
    features: [
      'Enhanced DBS Criminal Record Checks',
      'Medical & Topographical Assessments',
      'Regular Vehicle Inspections',
      'Full Private Hire Operator License',
      'Comprehensive Insurance Coverage',
    ],
    color: 'from-[#23243A]/95 to-[#2D2350]/90 border-elite-purple',
  },
  {
    icon: <Calendar className="w-10 h-10 text-gold-300 mx-auto mb-2" />, // Pre-Booking
    title: 'Pre-Booking Advantages',
    subtitle: 'Reliability and peace of mind for every journey.',
    features: [
      'Guaranteed On-Time Pickup',
      'Fixed Pricing - No Surprises',
      'Advance Driver Details',
      'Flight & Delay Monitoring',
      '24/7 Priority Support',
    ],
    color: 'from-[#23243A]/95 to-[#181C2B]/90 border-gold-300',
  },
]

export default function AIBadge() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      {/* Badge */}
      <div
        className={`fixed top-20 right-6 z-50 cursor-pointer transition-all duration-200 group ${open ? 'scale-95' : 'hover:scale-105'}`}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`flex items-center px-6 py-2 rounded-full shadow-2xl border-2 border-gold-400 bg-gradient-to-r from-[#181C2B] via-[#2D2350] to-[#FFD700] text-gold-100 font-bold text-base tracking-wide gap-2 transition-all duration-300 ${hovered ? 'ring-4 ring-gold-300/30' : ''}`}>
          <BadgeCheck className="w-5 h-5 text-gold-300 drop-shadow" />
          <span className="drop-shadow text-shadow-gold">Licensed & Certified</span>
        </div>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
          {/* Modal Card */}
          <div className="relative bg-gradient-to-br from-[#181C2B]/95 to-[#23243A]/90 border border-gold-400 rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4 animate-modal-pop">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gold-300 hover:text-gold-100 bg-[#23243A]/80 rounded-full p-2 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {/* Title */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <BadgeCheck className="w-7 h-7 text-gold-300" />
                <span className="text-2xl font-extrabold text-gold-300 drop-shadow text-shadow-gold">Certified, Licensed & Reliable</span>
              </div>
              <div className="text-gold-100 text-base font-semibold text-shadow-gold">Your safety and security, fully certified.</div>
            </div>
            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MODAL_FEATURES.map((col, idx) => (
                <div
                  key={col.title}
                  className={`rounded-2xl border-2 p-6 bg-gradient-to-br ${col.color} shadow-lg flex flex-col items-center min-h-[320px] animate-fade-in`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  {col.icon}
                  <div className="text-lg font-bold text-gold-100 mb-1 text-center text-shadow-gold">{col.title}</div>
                  <div className="text-sm text-gold-100 mb-4 text-center text-shadow-gold">{col.subtitle}</div>
                  <ul className="text-base text-left text-gold-100 space-y-2 w-full max-w-xs mx-auto font-semibold text-shadow-gold">
                    {col.features.map(f => (
                      <li key={f} className="flex items-start gap-2"><CheckCircle className="w-5 h-5 mt-0.5 text-gold-300" /> <span>{f}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Animations and custom colors */}
      <style jsx global>{`
        .text-gold-100 { color: #FFF8DC; }
        .text-gold-200 { color: #FFE4B5; }
        .text-gold-300 { color: #FFD700; }
        .text-gold-400 { color: #FFC300; }
        .border-gold-300 { border-color: #FFD700; }
        .border-gold-400 { border-color: #FFC300; }
        .ring-gold-300\/30 { box-shadow: 0 0 0 4px #FFD70044; }
        .bg-gold-100 { background-color: #FFF8DC; }
        .bg-gold-200 { background-color: #FFE4B5; }
        .bg-gold-300 { background-color: #FFD700; }
        .bg-gold-400 { background-color: #FFC300; }
        .text-elite-purple { color: #A084E8; }
        .border-elite-purple { border-color: #A084E8; }
        .text-shadow-gold { text-shadow: 0 1px 4px #000, 0 0px 2px #FFD70099; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes modal-pop {
          0% { opacity: 0; transform: scale(0.95) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-pop {
          animation: modal-pop 0.35s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </>
  )
}
