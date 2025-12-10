import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// --- MVP Price Context ---
const MVPPriceContext = createContext<{ screenCount: number; setScreenCount: (count: number) => void }>({
  screenCount: 20,
  setScreenCount: () => {},
});
const useMVPPrice = () => useContext(MVPPriceContext);

// --- Icons ---
const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 19V11C22 9.89543 21.1046 9 20 9H11.5L9.91421 7.41421C9.53915 7.03915 9.03043 6.82843 8.5 6.82843H4C2.89543 6.82843 2 7.72386 2 8.82843V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19Z" fill="#D93D3D" stroke="#ff8888" strokeWidth="1"/>
    <rect x="2" y="8" width="20" height="4" fill="#ff5555" fillOpacity="0.3"/>
  </svg>
);

const TeamIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center bg-[#222] rounded-full border border-[#444]">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="7.5" r="2.5" />
      <circle cx="15.5" cy="7.5" r="2.5" />
      <path d="M2 20c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5" />
      <path d="M13 20c0-1.6 1-3 2.5-3.7" />
    </svg>
  </div>
);

const RocketIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center bg-[#222] rounded-full border border-[#444]">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffb000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2s3.5 3.5 3.5 6.5S15 12 15 12s-2.5 0-3 1-3 3-3 3-1.5-1.5-1.5-3S9 6.5 12 2z" />
      <path d="M7 17s-1 3-4 4c0 0 1-3 4-4z" />
      <path d="M17 7l4 4" />
      <circle cx="11.5" cy="9.5" r="0.8" fill="#ffb000" stroke="none" />
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

// --- Pricing Slider Component ---
const PricingSlider: React.FC = () => {
  const { screenCount, setScreenCount } = useMVPPrice();

  return (
    <div className="mt-6 p-4 bg-[#111] border border-[#333] rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="font-['Space_Mono'] text-[#888] text-xs uppercase tracking-wider">
          Screens: <span className="text-[#ffb000] font-bold">{screenCount}</span>
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="10"
        max="100"
        step="5"
        value={screenCount}
        onChange={(e) => setScreenCount(parseInt(e.target.value))}
        className="w-full h-1.5 bg-[#222] rounded-full appearance-none cursor-pointer accent-[#ffb000]"
        style={{
          background: `linear-gradient(to right, #ffb000 0%, #ffb000 ${((screenCount - 10) / 90) * 100}%, #222 ${((screenCount - 10) / 90) * 100}%, #222 100%)`
        }}
      />

      <div className="flex items-center justify-between mt-2 text-[9px] font-['Space_Mono'] text-[#555]">
        <span>10</span>
        <span>40</span>
        <span>70</span>
        <span>100+</span>
      </div>
    </div>
  );
};

// --- MVP Price Display Component ---
const MVPPriceDisplay: React.FC = () => {
  const { screenCount } = useMVPPrice();
  const [hasTriggeredThreshold, setHasTriggeredThreshold] = useState(false);

  // Calculate price based on screen count
  const calculatePrice = (screens: number): string => {
    if (screens >= 60) return "threshold";
    const basePrice = 2000;
    const additionalScreens = Math.max(0, screens - 10);
    const total = basePrice + (additionalScreens * 150);
    return total.toLocaleString();
  };

  const price = calculatePrice(screenCount);

  // Trigger glitch effect when threshold is crossed
  useEffect(() => {
    if (screenCount >= 60 && !hasTriggeredThreshold) {
      setHasTriggeredThreshold(true);
    } else if (screenCount < 60 && hasTriggeredThreshold) {
      setHasTriggeredThreshold(false);
    }
  }, [screenCount, hasTriggeredThreshold]);

  return (
    <div className={`flex items-baseline gap-2 mb-6 h-16 transition-all duration-300 ${hasTriggeredThreshold ? 'animate-pulse' : ''}`}>
      {price === "threshold" ? (
        <div className="w-full flex items-baseline gap-2">
          <style>{`
            @keyframes glitch {
              0% { text-shadow: -2px 0 #ff3d3d, 2px 0 #00ff9d; transform: translate(0); }
              20% { transform: translate(-2px, 2px); }
              40% { transform: translate(-2px, -2px); }
              60% { transform: translate(2px, 2px); }
              80% { transform: translate(2px, -2px); }
              100% { transform: translate(0); }
            }
            .glitch-price {
              animation: glitch 0.4s infinite;
              font-family: 'VT323', monospace;
              font-size: 3rem;
              font-weight: bold;
              color: #ffb000;
            }
          `}</style>
          <span className="glitch-price">$$$$$</span>
          <span className="font-['Space_Mono'] text-sm text-[#555]">[design+dev]</span>
        </div>
      ) : (
        <>
          <span className="text-[#ffb000] text-lg font-bold">$</span>
          <span className="font-['VT323'] text-6xl text-[#e0e0e0]">
            <MatrixPrice value={price} />
          </span>
          <span className="font-['Space_Mono'] text-sm text-[#555]">[design+dev]</span>
        </>
      )}
    </div>
  );
};

// --- Matrix Price animation ---
const MatrixPrice = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const intervalRef = useRef<number | null>(null);
  const chars = "0123456789$#%&?";

  useEffect(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayValue(
        value
          .split("")
          .map((char, index) => {
            if (char === ',') return ',';
            if (index < iteration) return value[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= value.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayValue(value);
      }
      iteration += 1 / 2;
    }, 40);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [value]);

  return <span className="tabular-nums">{displayValue}</span>;
};

// --- Toggle (generic) ---
const ToggleSwitch = ({ label, price, checked, onChange }: { label: string, price: string, checked: boolean, onChange: () => void }) => (
  <div
    onClick={onChange}
    className={`mt-8 p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all duration-300 select-none group 
      ${checked ? 'bg-[#111] border-[#ffb000]' : 'bg-transparent border-[#333] hover:border-[#555]'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 border border-transparent ${checked ? 'bg-[#ffb000]' : 'bg-[#333] group-hover:bg-[#444]'}`}>
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-black rounded-full transition-transform duration-300 ease-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
      <span className={`font-['Space_Mono'] text-sm transition-colors duration-300 ${checked ? 'text-[#e0e0e0]' : 'text-[#888]'}`}>
        {label} <span className={`font-bold transition-colors duration-300 ${checked ? 'text-[#ffb000]' : 'text-[#e0e0e0]'}`}>{price}</span>
      </span>
    </div>
  </div>
);

// --- PricingCard (generic) ---
// Added props for CTA link behavior (ctaLink = default, ctaLinkAddon = when addon active)
interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  priceSuffix?: string;
  icon: React.ReactNode;
  features: string[];
  isFeatured?: boolean;
  tag?: string;
  addonLabel?: string;
  addonPrice?: string;
  ctaLink?: string; // default cal link
  ctaLinkAddon?: string; // alternate link when addon active
  ctaText?: string; // button text override
}

const PricingCard: React.FC<PricingCardProps> = ({
  title, description, price, priceSuffix = "", icon, features, isFeatured = false, tag, addonLabel, addonPrice,
  ctaLink = '#', ctaLinkAddon, ctaText = 'BOOK A 15-MIN CALL'
}) => {
  const [addonActive, setAddonActive] = useState(false);

  const basePriceInt = parseInt(price.replace(/,/g, ''), 10);
  const addonPriceInt = addonPrice ? parseInt(addonPrice.replace(/[^0-9]/g, ''), 10) : 0;
  const total = addonActive ? basePriceInt + addonPriceInt : basePriceInt;
  const formattedTotal = total.toLocaleString();

  const finalCtaLink = addonActive && ctaLinkAddon ? ctaLinkAddon : ctaLink;

  return (
    <div className="relative bg-[#050505] border border-[#333] p-8 md:p-10 flex flex-col hover:border-[#ffb000]/50 transition-colors duration-300 group h-full">
      {tag && (
        <div className="absolute top-6 right-6 bg-[#222] text-[#888] text-[10px] font-['Space_Mono'] px-3 py-1 uppercase tracking-widest border border-[#333] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb000]"></span>
          {tag}
        </div>
      )}

      {/* top content wrapper */}
      <div className="mb-8">
        <div className="mb-4">{icon}</div>

        <h3 className="font-['VT323'] text-4xl text-[#e0e0e0] mb-4 tracking-wide">{title}</h3>
        <p className="font-['Space_Mono'] text-[#888] text-sm leading-relaxed mb-6 max-w-lg">{description}</p>

        <div className="flex items-baseline gap-2 mb-6 h-16">
          <span className="text-[#ffb000] text-lg font-bold">$</span>
          <span className="font-['VT323'] text-6xl text-[#e0e0e0]"><MatrixPrice value={formattedTotal} /></span>
          <span className="font-['Space_Mono'] text-sm text-[#555]">{priceSuffix}</span>
        </div>

        {/* CTA button wrapped by anchor linking to cal.com (new tab) */}
        <a href={finalCtaLink} target="_blank" rel="noopener noreferrer" className="block">
          <button className="w-full py-4 border border-[#ffb000] text-[#ffb000] font-['Space_Mono'] font-bold text-sm tracking-widest hover:bg-[#ffb000] hover:text-black transition-all mb-4 uppercase shadow-[4px_4px_0px_0px_rgba(255,176,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            {ctaText}
          </button>
        </a>

        <div className="text-center mb-0">
          <a
            href="mailto:ishmam@hoverstate.design"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Space_Mono'] text-[10px] text-[#555] hover:text-[#e0e0e0] uppercase tracking-wider transition-colors"
          >
            Better email? Let's chat &rarr;
          </a>
        </div>
      </div>

      {/* features */}
      <div className={`grid gap-4 mb-6 ${isFeatured ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            {isFeatured ? <CheckIconBlue /> : <CheckIcon />}
            <span className="font-['Space_Mono'] text-sm text-[#ccc] leading-tight">{f}</span>
          </div>
        ))}
      </div>

      {/* addon - single working toggle (removed duplicate and removed On/Off tag) */}
      {addonLabel && addonPrice && (
        <div className="mt-auto">
          <div
            onClick={() => setAddonActive(!addonActive)}
            className={`p-3 rounded-lg border cursor-pointer select-none ${addonActive ? 'bg-[#111] border-[#ffb000]' : 'bg-transparent border-[#333] hover:border-[#555]'}`}
            role="button"
            aria-pressed={addonActive}
            aria-label={addonLabel}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-4 rounded-full relative ${addonActive ? 'bg-[#ffb000]' : 'bg-[#333]'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full transition-transform ${addonActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <div className="font-['Space_Mono'] text-sm">
                  {addonLabel} <span className="font-bold">{addonPrice}</span>
                </div>
              </div>
              {/* Removed On/Off text as requested */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- LandingCard: swaps whole card content between two modes (toggle top-right always says "Full website") ---
const LandingCard: React.FC = () => {
  const [isFullWebsite, setIsFullWebsite] = useState(false);

  // Content for both modes — using FolderIcon for both (Option A)
  const landing = {
    title: "Landing Page+",
    description: "Launch a landing page that sells your vision on day one.",
    price: "1,200",
    priceSuffix: "[starting]",
    icon: <FolderIcon />,
    features: [
      "Conversion-focused landing page (strategy + UX)",
      "Clear messaging + refined copywriting",
      "Fully responsive for all breakpoints",
      "Delivered in 7–14 days, 30 Days post-support",
      "Figma file + Framer-ready handoff / build",
    ],
    ctaLink: 'https://cal.com/hoverstate/landing-page',
    ctaText: 'BOOK A 15-MIN CALL'
  };

  const fullWebsite = {
    title: "Full Website (10+ pages)",
    description: "End-to-end website design for growing startups with multi-page content needs.",
    price: "2,600",
    priceSuffix: "[starting]",
    icon: <FolderIcon />, // Option A: same FolderIcon
    features: [
      "10+ custom pages (UX + UI)",
      "Sitemap + navigation structure",
      "SEO-ready layout system",
      "Responsive for all breakpoints",
      "CMS-ready design system",
      "Delivery in 2–3 weeks",
    ],
    ctaLink: 'https://cal.com/hoverstate/full-website',
    ctaText: 'BOOK A 15-MIN CALL'
  };

  const active = isFullWebsite ? fullWebsite : landing;
  const basePriceInt = parseInt(active.price.replace(/,/g, ''), 10);
  const formattedTotal = basePriceInt.toLocaleString();

  return (
    <div className="relative bg-[#050505] border border-[#333] p-8 md:p-10 flex flex-col hover:border-[#ffb000]/50 transition-colors duration-300 group h-full">
      {/* Top-right compact toggle (absolute) - label ALWAYS "Full website" */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsFullWebsite(!isFullWebsite)}
          aria-pressed={isFullWebsite}
          aria-label="Toggle full website"
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-['Space_Mono'] border transition-colors duration-200 ${isFullWebsite ? 'bg-[#111] border-[#ffb000] text-[#e0e0e0]' : 'bg-transparent border-[#333] text-[#888] hover:border-[#555]'}`}
        >
          {/* small visual toggle */}
          <span className={`w-6 h-3 rounded-full relative inline-block ${isFullWebsite ? 'bg-[#ffb000]' : 'bg-[#333]'}`}>
            <span className={`absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full transition-transform ${isFullWebsite ? 'translate-x-3' : 'translate-x-0'}`}></span>
          </span>
          {/* ALWAYS show "Full website" */}
          <span className="select-none">Full website</span>
        </button>
      </div>

      {/* TOP WRAPPER */}
      <div className="mb-8">
        <div className="mb-4">{active.icon}</div>

        <h3 className="font-['VT323'] text-4xl text-[#e0e0e0] mb-2 tracking-wide">{active.title}</h3>
        <p className="font-['Space_Mono'] text-[#888] text-sm leading-relaxed mb-4 max-w-lg">{active.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-6 h-16">
          <span className="text-[#ffb000] text-lg font-bold">$</span>
          <span className="font-['VT323'] text-6xl text-[#e0e0e0]">{formattedTotal}</span>
          <span className="font-['Space_Mono'] text-sm text-[#555]">{active.priceSuffix}</span>
        </div>

        {/* CTA specific to mode */}
        <a href={active.ctaLink} target="_blank" rel="noopener noreferrer" className="block">
          <button className="w-full py-4 border border-[#ffb000] text-[#ffb000] font-['Space_Mono'] font-bold text-sm tracking-widest hover:bg-[#ffb000] hover:text-black transition-all mb-4 uppercase shadow-[4px_4px_0px_0px_rgba(255,176,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            {active.ctaText}
          </button>
        </a>

        <div className="text-center mb-0">
          <a
            href="mailto:ishmam@hoverstate.design"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Space_Mono'] text-[10px] text-[#555] hover:text-[#e0e0e0] uppercase tracking-wider transition-colors"
          >
            Better email? Let's chat &rarr;
          </a>
        </div>
      </div>
      {/* END TOP WRAPPER */}

      {/* FEATURES (swapped based on mode) */}
      <div className="grid gap-4 mb-6">
        {active.features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckIcon />
            <span className="font-['Space_Mono'] text-sm text-[#ccc] leading-tight">{f}</span>
          </div>
        ))}
      </div>

      {/* No addon; footer area reserved */}
    </div>
  );
};

// --- Pricing main component ---
export const Pricing: React.FC = () => {
  const [mvpScreenCount, setMVPScreenCount] = useState(20);

  return (
    <section id="pricing" className="w-full py-24 border-t border-[#333] relative overflow-hidden bg-gradient-to-b from-[#0d0d0f] via-[#08080a] to-[#0a0a0c]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.3)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-10"></div>

      <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
          <h2 className="font-['VT323'] text-5xl text-[#ffb000] uppercase tracking-wider">&lt;RESOURCE_ALLOCATION /&gt;</h2>
          <div className="font-['Space_Mono'] text-[#00ff9d] text-sm tracking-widest bg-[#00ff9d]/5 px-4 py-2 border border-[#00ff9d]/20 rounded" role="status">
            AVAILABLE_SLOTS: 2
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {/* Landing: swapped whole-card */}
          <LandingCard />

          {/* Brand Identity */}
          <PricingCard
            title="Brand Identity"
            description="Turn your startup into a brand people remember and trust."
            price="1200"
            priceSuffix="[starting]"
            icon={<CompassIcon />}
            features={[
              "Logo, color, type & visual direction",
              "Brand identity system + guidelines document (Figma)",
              "Asset pack for marketing + socials",
              "Scales easily into website or product",
              "10-day turnaround time"
            ]}
            addonLabel="Pitch Deck"
            addonPrice="+ $800"
            ctaLink="https://cal.com/hoverstate/brand-identity"
            ctaLinkAddon="https://cal.com/hoverstate/brand-explore"
            ctaText="BOOK A 15-MIN CALL"
          />

          {/* Partnership Retainer */}
          <PricingCard
            title="Partnership Retainer"
            description="Continuous product + brand design support without hiring in-house."
            price="3,500"
            priceSuffix="/month (26 hours/week)"
            icon={<TeamIcon />}
            tag="LIMITED AVAILABILITY"
            features={[
              "2 dedicated product designer embedded in your team",
              "Backed by a creative team for end-to-end management",
              "Unlimited design requests (1 active at a time)",
              "5/7 async communication via Slack + Loom",
              "Weekly sprints & iteration reviews",
            ]}
            ctaLink="https://cal.com/hoverstate/partnership-retainer"
            ctaText="BOOK A 15-MIN CALL"
          />

          {/* MVP Launch */}
          <MVPPriceContext.Provider value={{ screenCount: mvpScreenCount, setScreenCount: setMVPScreenCount }}>
            <div className="relative bg-[#050505] border border-[#333] p-8 md:p-10 flex flex-col hover:border-[#ffb000]/50 transition-colors duration-300 group h-full">
              {/* TOP WRAPPER (with Rocket icon restored) */}
              <div className="mb-8">
                <div className="mb-4"><RocketIcon /></div>

                <h3 className="font-['VT323'] text-4xl text-[#e0e0e0] mb-4 tracking-wide">MVP Launch - Mobile/Web App</h3>
                <p className="font-['Space_Mono'] text-[#888] text-sm leading-relaxed mb-6 max-w-lg">
                  Ship an MVP that attracts early users, revenue, and investor confidence.
                </p>

                <MVPPriceDisplay />

                {/* Unified MVP CTA linking to cal.com */}
                <a href="https://cal.com/hoverstate/mvp-launch" target="_blank" rel="noopener noreferrer" className="block">
                  <button className="w-full py-4 border border-[#ffb000] text-[#ffb000] font-['Space_Mono'] font-bold text-sm tracking-widest hover:bg-[#ffb000] hover:text-black transition-all mb-4 uppercase shadow-[4px_4px_0px_0px_rgba(255,176,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                    BOOK A 15-MIN CALL and get a quote
                  </button>
                </a>

                <div className="text-center mb-0">
                  <a
                    href="mailto:ishmam@hoverstate.design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Space_Mono'] text-[10px] text-[#555] hover:text-[#e0e0e0] uppercase tracking-wider transition-colors"
                  >
                    Better email? Let's chat &rarr;
                  </a>
                </div>
              </div>

              {/* features */}
              <div className="grid gap-4 grid-cols-1 mb-6">
                {[
                  "Dedicated Design Lead + senior dev team",
                  "Go-to-market strategy plan + predefined SOW",
                  "5/7 async communication via Slack + Loom",
                  "User testing support + iteration cycles",
                  "Milestone-based 50/25/25 secure payment structure",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="font-['Space_Mono'] text-sm text-[#ccc] leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* slider */}
              <PricingSlider />
            </div>
          </MVPPriceContext.Provider>
        </div>
      </div>
    </section>
  );
};
