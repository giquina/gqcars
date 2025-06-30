'use client'

export default function TFLLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Logo elements */}
        <defs>
          <linearGradient id="tflRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC241F" />
            <stop offset="100%" stopColor="#E32219" />
          </linearGradient>
        </defs>
        
        {/* Circle background */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#tflRed)"
          stroke="#FFF"
          strokeWidth="2"
        />
        
        {/* Bar */}
        <rect
          x="20"
          y="40"
          width="60"
          height="20"
          fill="#FFF"
        />
        
        {/* TFL Letters */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className="fill-red-600 font-bold text-xl"
          style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}
        >
          TFL
        </text>
      </svg>
    </div>
  )
}