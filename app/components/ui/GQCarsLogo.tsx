'use client'

export default function GQCarsLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle with gradient */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#blueGradient)"
          stroke="url(#goldGradient)"
          strokeWidth="2"
        />
        
        {/* Inner shield shape */}
        <path
          d="M20 35 C20 25, 30 20, 50 20 C70 20, 80 25, 80 35 L80 55 C80 70, 50 85, 50 85 C50 85, 20 70, 20 55 Z"
          fill="rgba(255,215,0,0.2)"
          stroke="url(#goldGradient)"
          strokeWidth="1"
        />
        
        {/* Car silhouette */}
        <path
          d="M25 45 L30 40 L35 40 L40 35 L60 35 L65 40 L70 40 L75 45 L75 55 L70 55 L70 50 L65 50 L65 55 L35 55 L35 50 L30 50 L30 55 L25 55 Z"
          fill="url(#goldGradient)"
        />
        
        {/* Wheels */}
        <circle cx="35" cy="55" r="4" fill="#1E40AF" />
        <circle cx="65" cy="55" r="4" fill="#1E40AF" />
        
        {/* GQ Letters */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          className="fill-white font-bold text-lg"
          style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif' }}
        >
          GQ
        </text>
      </svg>
    </div>
  )
}
