import React from 'react';

interface ServiceCardProps {
  number: string;
  code: string;
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ number, code, title }) => (
  <div className="group relative bg-[#0d0d0f] border border-[#333] hover:border-[#ffb000] p-6 h-full min-h-[180px] transition-all duration-300 flex flex-col justify-between overflow-hidden">
    {/* Hover Scanline Background */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-[linear-gradient(transparent_50%,#ffb000_50%)] bg-[length:100%_4px]"></div>
    
    {/* Decorative Corners */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    {/* Header: Number and Code */}
    <div className="relative z-10 flex justify-between items-start mb-4">
        <span className="font-['Space_Mono'] text-[#444] text-xs group-hover:text-[#ffb000] transition-colors duration-300">
            /{number}
        </span>
        <span className="font-['Space_Mono'] text-[#222] text-xs tracking-widest group-hover:text-[#00ff9d] transition-colors duration-300 bg-[#111] px-1 rounded">
            [{code}]
        </span>
    </div>

    {/* Main Title */}
    <div className="relative z-10 mt-auto">
        <h3 className="font-['VT323'] text-4xl text-[#e0e0e0] group-hover:text-[#ffb000] uppercase leading-[0.9] transition-colors duration-300">
            {title}
        </h3>
        {/* Animated Progress Bar on Hover */}
        <div className="w-full h-[2px] bg-[#222] mt-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-[#ffb000] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
        </div>
    </div>
  </div>
);

export const Services: React.FC = () => {
    const services = [
        { title: "Brand identity", code: "ID_SYS" },
        { title: "Website design & dev", code: "WEB_OPS" },
        { title: "MVPs & product design", code: "PROD_ARCH" },
        { title: "Custom code", code: "ROOT_ACCESS" },
        { title: "3D Design & Motion", code: "RENDER_ENG" },
        { title: "Pitch Decks", code: "CAPITAL_MOD" }
    ];

    return (
        <section id="services" className="w-full py-24 border-t border-[#333] relative overflow-hidden bg-gradient-to-b from-[#0a0a0c] via-[#0d0d0f] to-[#08080a]">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,176,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,176,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#ffb000] animate-pulse rounded-full"></span>
                            <span className="font-['Space_Mono'] text-[#ffb000] text-xs tracking-widest uppercase">
                                System Capabilities
                            </span>
                        </div>
                        <h2 className="font-['VT323'] text-6xl md:text-8xl text-[#e0e0e0] uppercase leading-[0.85] mb-8">
                            YOUR 0<span className="text-[#ffb000] mx-1">&rarr;</span>1 <br/> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0e0e0] to-[#888]">GROWTH PARTNERS</span>
                        </h2>
                        <p className="font-['Space_Mono'] text-[#888] text-sm md:text-base leading-relaxed border-l-2 border-[#333] pl-6 max-w-xl">
                            From branding, through product and web, motion, MVP builds, AI engineering, software development, and marketing collateral. <strong className="text-[#e0e0e0]">We do it all.</strong>
                        </p>
                    </div>
                    
                    {/* Decorative ASCII/Terminal element */}
                    <div className="hidden lg:block text-right">
                        <div className="font-['Space_Mono'] text-[#333] text-[10px] leading-tight">
                            :: INITIALIZING MODULES ::<br/>
                            :: LOADING ASSETS [100%] ::<br/>
                            :: RENDER COMPLETE ::
                        </div>
                        <div className="mt-2 font-['VT323'] text-[#ffb000] text-5xl opacity-20">
                            SVC_GRID_v2
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((s, i) => (
                        <ServiceCard 
                            key={i} 
                            number={`0${i+1}`} 
                            code={s.code} 
                            title={s.title} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};