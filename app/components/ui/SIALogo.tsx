'use client'

export default function SIALogo({ className = "w-20 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center bg-white rounded p-2`}>
      <svg viewBox="0 0 120 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* SIA Background */}
        <rect width="120" height="60" fill="#1E3A8A" rx="4"/>
        
        {/* Shield Shape */}
        <path d="M20 15 C20 10, 25 8, 35 8 C45 8, 50 10, 50 15 L50 35 C50 45, 35 52, 35 52 C35 52, 20 45, 20 35 Z" 
              fill="white" stroke="#1E3A8A" strokeWidth="1"/>
        
        {/* SIA Text in Shield */}
        <text x="35" y="32" textAnchor="middle" fill="#1E3A8A" 
              style={{fontSize: '10px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          SIA
        </text>
        
        {/* Main Text */}
        <text x="60" y="20" fill="white" style={{fontSize: '8px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          SECURITY INDUSTRY
        </text>
        <text x="60" y="32" fill="white" style={{fontSize: '8px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          AUTHORITY
        </text>
        <text x="60" y="44" fill="#FFD320" style={{fontSize: '7px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          LICENSED
        </text>
        <text x="60" y="54" fill="#FFD320" style={{fontSize: '7px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          CLOSE PROTECTION
        </text>
      </svg>
    </div>
  )
}
