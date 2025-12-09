import React, { useState, useEffect } from 'react';
import { CrtOverlay } from './components/CrtOverlay';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Comparison } from './components/Comparison';
import { Work } from './components/Work';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ParallaxBackground } from './components/ParallaxBackground';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Set CSS variable for navbar height
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      const statusBar = document.querySelector('[data-status-bar]');
      const totalHeight = (statusBar?.clientHeight || 0) + (navbar?.clientHeight || 0);
      document.documentElement.style.setProperty('--navbar-height', `${totalHeight}px`);
    };
    
    // Update on load
    updateNavbarHeight();
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight);
    
    // Handle hash-based navigation (smooth scroll to section)
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }
      }
    };
    
    // Handle hash on mount and when hash changes
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer3 = setInterval(() => setTime(new Date()), 1000);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('hashchange', handleHashNavigation);
        window.removeEventListener('resize', updateNavbarHeight);
        clearInterval(timer3);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <>
      <ParallaxBackground />
      
      {/* --- NEW NAVBAR SYSTEM --- */}
      <div className="fixed top-0 left-0 w-full z-40 flex flex-col font-['Space_Mono']" data-navbar-container>
          
          {/* 1. Status Line (The "Top Bar") */}
          <div className="w-full h-6 bg-[#0a0a0c] border-b border-[#333] flex items-center justify-between px-3 md:px-6 select-none relative z-20" data-status-bar>
             <div className="flex gap-4 text-[8px] tracking-wider">
                <span className="text-[#555] hidden md:inline">SYSTEM_STATUS: <span className="text-[#00ff9d]">OPTIMAL</span></span>
                <span className="text-[#555]">MEM: 64TB</span>
                <span className="text-[#555] hidden md:inline">UPTIME: 99.9%</span>
             </div>
             <div className="text-[#ffb000] text-[8px] tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#ffb000] rounded-full animate-pulse"></span>
                {formatTime(time)} // UTC
             </div>
          </div>

          {/* 2. Main Navigation Bar */}
          <nav className={`
            w-full relative z-10 flex items-center justify-between px-4 md:px-8 transition-all duration-300 border-b border-[#333]
            ${isScrolled ? 'py-2 bg-[#050505]/95 backdrop-blur-md' : 'py-3 bg-[#050505]/80 backdrop-blur-sm'}
          `}>
             {/* Background Grid Pattern for Nav */}
             <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_100%] pointer-events-none opacity-20"></div>

             {/* Logo Section */}
             <div 
                className="flex items-center gap-2 group cursor-pointer relative z-10" 
                onClick={() => window.location.href = window.location.pathname}
             >
                {/* Logo Icon */}
                <div className="w-6 h-6 border border-[#ffb000] flex items-center justify-center bg-[#ffb000]/10 group-hover:bg-[#ffb000] transition-all duration-300">
                    <span className="font-['VT323'] text-sm text-[#ffb000] group-hover:text-black font-bold">&lt;/&gt;</span>
                </div>
                {/* Logo Text */}
                <div className="flex flex-col">
                    <span className="font-['VT323'] text-lg md:text-2xl text-[#e0e0e0] leading-none tracking-wide group-hover:text-[#ffb000] transition-colors">
                        HOVERSTATE
                    </span>
                    <span className="font-['Space_Mono'] text-[7px] text-[#555] tracking-[0.2em] group-hover:text-[#888] transition-colors leading-none">
                        DIGITAL_EXPERIENCE
                    </span>
                </div>
             </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center bg-[#0a0a0c] border border-[#333] px-1 py-0.5 rounded-sm relative z-10">
                 {[
                    { name: 'SERVICES', id: 'services' },
                    { name: 'PRICING', id: 'pricing' },
                    { name: 'WORKS', id: 'work' },
                    { name: 'FAQ', id: 'faq' },
                  ].map((item) => (
                    <a 
                      key={item.name} 
                      href={`#${item.id}`}
                      className="relative px-4 py-1 text-[10px] font-bold text-[#888] hover:text-[#e0e0e0] transition-colors group block"
                    >
                      <span className="relative z-10 flex items-center gap-1">
                          <span className="text-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0 duration-300">&gt;</span>
                          {item.name}
                      </span>
                      {/* Scanline hover effect underneath */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ffb000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </a>
                  ))}
            </div>
            
            {/* CTA Button */}
            <div className="relative z-10">
                <a 
                    href="#pricing"
                    className="group relative px-4 py-2 bg-transparent overflow-hidden inline-block"
                >
                    {/* Button Shape with Skew */}
                    <div className="absolute inset-0 transform -skew-x-12 border border-[#333] bg-[#111] group-hover:border-[#ffb000] group-hover:bg-[#ffb000] transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-2">
                        <span className="font-['Space_Mono'] font-bold text-[10px] tracking-widest text-[#ffb000] group-hover:text-black transition-colors uppercase">
                            Start_Project
                        </span>
                        <div className="w-1 h-1 bg-[#ffb000] group-hover:bg-black animate-pulse"></div>
                    </div>
                </a>
            </div>
          </nav>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full flex flex-col pt-[var(--navbar-height,100px)]">
        
        {/* HERO SECTION */}
        <header className="relative w-full min-h-[calc(100vh-var(--navbar-height,100px))] flex flex-col justify-center scroll-margin-top-[var(--navbar-height,100px)]" id="hero">
          <div className="px-[clamp(20px,5%,100px)] py-8 md:py-12 max-w-7xl mx-auto">
            <Hero />
          </div>
        </header>

        {/* PAGE SECTIONS */}
        <main className="w-full flex flex-col gap-0">
          <Services />
          <Comparison />
          <Pricing />
          <FAQ />
          <Work />
        </main>

        <Footer />
      </div>

      {/* The CRT Screen Overlay */}
      <CrtOverlay />
    </>
  );
}