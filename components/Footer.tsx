import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-[#ffb000]/20 bg-gradient-to-t from-[#08080a] to-transparent">
      <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-[#555] font-['Space_Mono'] text-xs">
            © 2024 HOVERSTATE SYSTEMS. ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex gap-8">
            {['TWITTER', 'GITHUB', 'LINKEDIN'].map((link) => (
              <a key={link} href="#" onClick={(e) => e.preventDefault()} className="font-['Space_Mono'] text-xs text-[#888] hover:text-[#ffb000] transition-colors relative group" aria-label={`${link} link`}>
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ffb000] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
        </div>

        <div className="font-['VT323'] text-[#00ff9d] text-lg animate-pulse">
            SYSTEM_ONLINE
        </div>
      </div>
    </footer>
  );
};