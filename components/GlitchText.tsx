import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Red Channel Shift */}
      <span 
        className="absolute top-0 left-[-2px] -z-10 text-red-500/40 select-none mix-blend-screen animate-pulse" 
        aria-hidden="true"
      >
        {text}
      </span>
      
      {/* Blue Channel Shift */}
      <span 
        className="absolute top-0 left-[2px] -z-10 text-blue-500/40 select-none mix-blend-screen" 
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Main Text */}
      <span className="relative z-0">
        {text}
      </span>
    </span>
  );
};