import React, { useState, useEffect, useRef } from 'react';

// --- Icons ---
const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 19V11C22 9.89543 21.1046 9 20 9H11.5L9.91421 7.41421C9.53915 7.03915 9.03043 6.82843 8.5 6.82843H4C2.89543 6.82843 2 7.72386 2 8.82843V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19Z" fill="#D93D3D" stroke="#ff8888" strokeWidth="1"/>
    <rect x="2" y="8" width="20" height="4" fill="#ff5555" fillOpacity="0.3"/>
  </svg>
);

const GearIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center bg-[#222] rounded-full border border-[#444]">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
      <path d="M19.4 15C20.2831 14.2818 20.9167 13.3051 21.2 12.2C21.2 11.1 20.8 10 20.1 9.1L21.2 6.9C21.4 6.5 21.4 6 21.1 5.7C20.8 5.4 20.3 5.3 20 5.5L17.8 6.6C16.9 5.9 15.9 5.5 14.8 5.3C13.7 5.1 12.5 5.2 11.4 5.6L10.3 3.4C10.1 3 9.6 2.8 9.2 3C8.8 3.2 8.6 3.7 8.8 4.1L9.9 6.3C9.2 7.2 8.8 8.2 8.6 9.3C8.4 10.4 8.6 11.5 9.1 12.5L7.9 14.8C7.7 15.2 7.8 15.7 8.1 16C8.4 16.3 8.9 16.4 9.2 16.2L11.4 15.1C12.3 15.8 13.3 16.2 14.4 16.4C15.5 16.6 16.7 16.5 17.8 16.1L18.9 18.3C19.1 18.7 19.6 18.9 20 18.7C20.4 18.5 20.6 18 20.4 17.6L19.4 15Z"/>
    </svg>
  </div>
);

const CompassIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center bg-[#222] rounded-full border border-[#444]">
     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D93D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" stroke="#555"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#D93D3D" stroke="none" fillOpacity="0.8"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" stroke="#D93D3D" strokeWidth="1"/>
    </svg>
  </div>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="3" className="mt-1 flex-shrink-0">
        <path d="M20 6L9 17L4 12" />
    </svg>
);

const CheckIconBlue = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" className="mt-1 flex-shrink-0">
        <path d="M20 6L9 17L4 12" />
    </svg>
);

// --- Animation Components ---

const MatrixPrice = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const intervalRef = useRef<number | null>(null);
  
  // Characters to scramble with (numbers and symbols for that glitchy feel)
  const chars = "0123456789$#%&?";

  useEffect(() => {
    let iteration = 0;
    
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayValue(prev => 
        value
          .split("")
          .map((char, index) => {
            // Keep comma fixed for better readability during transition, or scramble it too?
            // Let's keep commas fixed if we want a cleaner look, or scramble everything.
            // Scrambling everything looks more "matrix".
            if (char === ',') return ','; // Keep structure
            
            if (index < iteration) {
              return value[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= value.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayValue(value); // Ensure final state is clean
      }
      
      iteration += 1 / 2; // Speed of decoding
    }, 40);
    
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [value]);

  return <span className="tabular-nums">{displayValue}</span>;
};

// --- Functional Components ---

const ToggleSwitch = ({ label, price, checked, onChange }: { label: string, price: string, checked: boolean, onChange: () => void }) => (
    <div 
        onClick={onChange}
        className={`mt-8 p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all duration-300 select-none group 
        ${checked 
            ? 'bg-[#111] border-[#ffb000]' 
            : 'bg-transparent border-[#333] hover:border-[#555]'}`}
    >
        <div className="flex items-center gap-4">
            {/* Switch UI */}
            <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 border border-transparent 
                ${checked ? 'bg-[#ffb000]' : 'bg-[#333] group-hover:bg-[#444]'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-black transition-transform duration-300 ease-out 
                    ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
            <span className={`font-['Space_Mono'] text-sm transition-colors duration-300 ${checked ? 'text-[#e0e0e0]' : 'text-[#888]'}`}>
                {label} <span className={`font-bold transition-colors duration-300 ${checked ? 'text-[#ffb000]' : 'text-[#e0e0e0]'}`}>{price}</span>
            </span>
        </div>
    </div>
);

interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    priceSuffix?: string;
    icon: React.ReactNode;
    features: string[];
    isFullWidth?: boolean;
    isFeatured?: boolean;
    tag?: string;
    addonLabel: string;
    addonPrice: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
    title, description, price, priceSuffix = "", icon, features, isFullWidth = false, isFeatured = false, tag, addonLabel, addonPrice 
}) => {
    const [addonActive, setAddonActive] = useState(false);

    // Calculate total price
    const basePriceInt = parseInt(price.replace(/,/g, ''), 10);
    const addonPriceInt = parseInt(addonPrice.replace(/[^0-9]/g, ''), 10);
    
    const total = addonActive ? basePriceInt + addonPriceInt : basePriceInt;
    const formattedTotal = total.toLocaleString();

    return (
        <div className={`relative bg-[#050505] border border-[#333] p-8 md:p-10 flex flex-col hover:border-[#ffb000]/50 transition-colors duration-300 group h-full`}>
            {/* Tag */}
            {tag && (
                <div className="absolute top-6 right-6 bg-[#222] text-[#888] text-[10px] font-['Space_Mono'] px-3 py-1 uppercase tracking-widest border border-[#333] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb000]"></span>
                    {tag}
                </div>
            )}

            <div className="mb-6">{icon}</div>

            <h3 className="font-['VT323'] text-4xl text-[#e0e0e0] mb-4 tracking-wide">{title}</h3>
            <p className="font-['Space_Mono'] text-[#888] text-sm leading-relaxed mb-8 max-w-lg">
                {description}
            </p>

            <div className="flex items-baseline gap-2 mb-8 h-16">
                <span className="text-[#ffb000] text-lg font-bold">$</span>
                <span className="font-['VT323'] text-6xl text-[#e0e0e0]">
                    <MatrixPrice value={formattedTotal} />
                </span>
                <span className="font-['Space_Mono'] text-sm text-[#555]">{priceSuffix}</span>
            </div>

            <button className="w-full py-4 border border-[#ffb000] text-[#ffb000] font-['Space_Mono'] font-bold text-sm tracking-widest hover:bg-[#ffb000] hover:text-black transition-all mb-4 uppercase shadow-[4px_4px_0px_0px_rgba(255,176,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                Book a 15-min call
            </button>
            
            <div className="text-center mb-10">
                    <a href="#" onClick={(e) => e.preventDefault()} className="font-['Space_Mono'] text-[10px] text-[#555] hover:text-[#e0e0e0] uppercase tracking-wider transition-colors" aria-label="Better email link">
                        Better email? Let's chat &rarr;
                    </a>
            </div>

            <div className={`grid gap-4 ${isFeatured ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                         {isFeatured ? <CheckIconBlue /> : <CheckIcon />}
                         <span className="font-['Space_Mono'] text-sm text-[#ccc] leading-tight">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <ToggleSwitch 
                    label={addonLabel} 
                    price={addonPrice}
                    checked={addonActive}
                    onChange={() => setAddonActive(!addonActive)}
                />
            </div>
        </div>
    );
};

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="w-full py-24 border-t border-[#333] relative overflow-hidden bg-gradient-to-b from-[#0d0d0f] via-[#08080a] to-[#0a0a0c]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.3)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-10"></div>

      <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <h2 className="font-['VT323'] text-5xl text-[#ffb000] uppercase tracking-wider">
              &lt;RESOURCE_ALLOCATION /&gt;
            </h2>
            <div className="font-['Space_Mono'] text-[#00ff9d] text-sm tracking-widest bg-[#00ff9d]/5 px-4 py-2 border border-[#00ff9d]/20 rounded" role="status">
                AVAILABLE_SLOTS: 2
            </div>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            
            {/* Card 1: Landing Page+ (Featured - Full Width) */}
            <div className="w-full">
                <PricingCard 
                    title="Landing Page+"
                    description="Ideal for designing or redesigning website to double your conversion rates."
                    price="6,990"
                    priceSuffix="[fixed]"
                    icon={<FolderIcon />}
                    isFullWidth={false}
                    isFeatured={true}
                    features={[
                        "Animations",
                        "10-14 Days turnaround time",
                        "Custom 3D models or 2D illustrations",
                        "High-converting sales funnel",
                        "1 Month of FREE Support",
                        "2 Design Concepts",
                        "Professional Copywriting",
                        "Framer development"
                    ]}
                    addonLabel="+ No-code Development:"
                    addonPrice="$2,000"
                />
            </div>

            {/* Cards 2 & 3: 2-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 2: Partnership */}
                <PricingCard 
                    title="Partnership"
                    description="Great if you need ongoing help, have many projects or have undefined scope of work."
                    price="5,990"
                    priceSuffix="+/month"
                    icon={<GearIcon />}
                    tag="LIMITED AVAILABILITY"
                    features={[
                        "Dedicated Design Lead",
                        "Team of senior creatives",
                        "End-to-end project management",
                        "Unlimited Design requests",
                        "5/7 Communication (Slack/Loom)",
                        "1 workstream at a time",
                        "Monthly sync calls"
                    ]}
                    addonLabel="Accelerator: x2 velocity:"
                    addonPrice="$5,000"
                />

                {/* Card 3: MVP Launch Kit */}
                <PricingCard 
                    title="MVP Launch Kit"
                    description="Full App MVP (40-60 screens) or Website (design+dev) with 10+ unique pages."
                    price="9,990"
                    priceSuffix="+ [fixed]"
                    icon={<CompassIcon />}
                    features={[
                        "Dedicated Design Lead",
                        "Team of senior creatives",
                        "Go-to-market strategy plan",
                        "Predefined scope of work (SOW)",
                        "5/7 Communication (Slack/Loom)",
                        "Framer or Webflow development",
                        "50/25/25 secure payment"
                    ]}
                    addonLabel="+ Rush Delivery:"
                    addonPrice="$3,000"
                />
            </div>

        </div>
      </div>
    </section>
  );
};