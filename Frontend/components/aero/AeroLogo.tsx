export function AeroLogo({ className = "w-full h-full", showBackground = true }: { className?: string; showBackground?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" className={className}>
      <defs>
        <linearGradient id="aeroVectorGradient" x1="120" y1="380" x2="392" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0052FF" />
          <stop offset="60%" stopColor="#00D1FF" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {showBackground && <rect width="512" height="512" rx="32" fill="#0A0A0A" />}
      <path d="M64 128H448M64 256H448M64 384H448M128 64V448M256 64V448M384 64V448" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="2" />
      <path d="M140 390 L230 150 L275 150 L185 390 Z" fill="url(#aeroVectorGradient)" opacity="0.85" />
      <path d="M245 390 L365 150 L410 150 L290 390 Z" fill="url(#aeroVectorGradient)" />
      <path d="M100 320 L270 230 L350 110" stroke="#00D1FF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="350" cy="110" r="14" fill="#10B981" filter="url(#glow)" />
      <circle cx="350" cy="110" r="8" fill="#ffffff" />
    </svg>
  );
}
