import React from 'react';

interface CampusLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CampusLogo({ className = '', size = 'md' }: CampusLogoProps) {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions[size]} ${className}`}>
      {/* Outer university frame */}
      <div className="absolute inset-0 rounded-full border-4 border-amber-400 bg-[#084C35] flex items-center justify-center shadow-lg">
        {/* Inner concentric ring */}
        <div className="w-[88%] h-[88%] rounded-full border border-dashed border-amber-300 flex items-center justify-center relative">
          
          {/* Medical Cross Backdrop */}
          <div className="absolute w-2/3 h-1/6 bg-emerald-450/25 rounded-sm bg-emerald-500/25"></div>
          <div className="absolute w-1/6 h-2/3 bg-emerald-450/25 rounded-sm bg-emerald-500/25"></div>

          {/* Core Nightingale Lamp Symbol */}
          <svg
            className="w-1/2 h-1/2 text-amber-200 z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lamp base and spout */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 14c0-2 2.5-4 5.5-4h5c2.5 0 4.5 1.5 5 3.5.5 2 0 4.5-2.5 4.5H5.5C3.5 18 3 16.5 3 14z"
            />
            {/* Flame */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              fill="currentColor"
              className="text-amber-400 animate-pulse"
              d="M17 6.5c0 0-2-1.5-2-3 0 1.5-1 2.5-1 2.5s-1.5-.5-1.5 1.5c0 1.5 1.5 2.5 2.5 2.5s2-1 2-3.5z"
            />
            {/* Stand/Base */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 18v2h10v-2"
            />
          </svg>

          {/* Tiny Stars decoration */}
          <div className="absolute top-1 left-1.5 w-1 h-1 bg-amber-400 rounded-full"></div>
          <div className="absolute top-1 right-1.5 w-1 h-1 bg-amber-400 rounded-full"></div>
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-amber-400 rounded-full"></div>
          <div className="absolute bottom-1 right-2 w-1 h-1 bg-amber-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
