'use client'

export default function SIALogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Logo elements */}
        <defs>
          <linearGradient id="siaBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003366" />
            <stop offset="100%" stopColor="#0066CC" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#siaBlue)"
          stroke="#FFF"
          strokeWidth="2"
        />
        
        {/* Inner shield shape */}
        <path
          d="M25 30 C25 20, 35 15, 50 15 C65 15, 75 20, 75 30 L75 60 C75 75, 50 85, 50 85 C50 85, 25 75, 25 60 Z"
          fill="#FFF"
          opacity="0.2"
          stroke="#FFF"
          strokeWidth="2"
        />
        
        {/* SIA Letters */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className="fill-white font-bold text-xl"
          style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}
        >
          SIA
        </text>
      </svg>
    </div>
  )
}