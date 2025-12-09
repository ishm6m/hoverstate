import React, { useEffect, useState } from 'react';

export const ParallaxBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#0d0d0f]">
      {/* Layer 1: The Base Grid (Slow movement) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
            backgroundImage: 'linear-gradient(#ffb000 1px, transparent 1px), linear-gradient(90deg, #ffb000 1px, transparent 1px)', 
            backgroundSize: '60px 60px',
            transform: `translateY(${scrollY * 0.1}px)`
        }}
      />

      {/* Layer 2: Top Left HUD Ring (Rotates and moves opposite to scroll) */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] border border-[#333] rounded-full opacity-20"
        style={{ transform: `translateY(${-scrollY * 0.15}px) rotate(${scrollY * 0.02}deg)` }}
      >
        <div className="absolute inset-4 border border-dashed border-[#ffb000]/20 rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#333]/50"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#333]/50"></div>
      </div>

      {/* Layer 3: Bottom Right Decorative Ring (Moves faster) */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] border border-[#333] rounded-full opacity-20"
        style={{ transform: `translateY(${-scrollY * 0.25}px) rotate(${-scrollY * 0.01}deg)` }}
      >
         <div className="absolute inset-8 border border-dotted border-[#00ff9d]/20 rounded-full"></div>
      </div>
      
      {/* Layer 4: Floating Data Points (Fastest movement) */}
      <div
        className="absolute top-[20%] right-[15%] text-[#ffb000]/10 font-mono text-xs tracking-widest"
        style={{ transform: `translateY(${-scrollY * 0.4}px)` }}
      >
        {":: TARGET_COORDINATES ::"}
        <br />
        {"X: 45.221"}
        <br />
        {"Y: 88.192"}
      </div>

      <div
        className="absolute bottom-[40%] left-[8%] text-[#00ff9d]/10 font-mono text-xs tracking-widest"
        style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
      >
        {">> SYSTEM_DIAGNOSTICS"}
        <br />
        {">> OPTIMAL"}
      </div>

      {/* Random Crosshairs fixed relative to certain depths */}
      <div className="absolute top-[40%] left-[50%] w-4 h-4 border-t border-l border-[#e0e0e0]/10" style={{ transform: `translateY(${-scrollY * 0.1}px)` }}></div>
      <div className="absolute top-[60%] right-[30%] w-4 h-4 border-b border-r border-[#e0e0e0]/10" style={{ transform: `translateY(${-scrollY * 0.2}px)` }}></div>
    </div>
  );
};