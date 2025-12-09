import React from 'react';

export const Comparison: React.FC = () => {
  const rows = [
    { label: "Cost", hoverstate: "$", ft: "$$$$ (High Overhead)", agency: "$$$" },
    { label: "Senior-Level Designer", hoverstate: "Guaranteed", ft: "Hopefully", agency: "Maybe" },
    { label: "Turnaround Time", hoverstate: "48 hours for most projects", ft: "Can take weeks", agency: "Weeks, depends on workload" },
    { label: "Start Time", hoverstate: "Today itself", ft: "Weeks to onboard", agency: "Days to sign contracts" },
    { label: "Unlimited Revisions", hoverstate: "Yes, until it's perfect", ft: "Limited", agency: "Limited per project" },
    { label: "Client Portal", hoverstate: "Yes, track progress easily", ft: "Internal systems vary", agency: "No consistent system" },
    { label: "Scalability", hoverstate: "Scale up or down with ease", ft: "Possible", agency: "Limited availability" },
    { label: "Flexibility", hoverstate: "Pause or adjust anytime", ft: "Locked into salaries", agency: "Inflexible project fees" }
  ];

  return (
    <section className="w-full py-24 border-t border-[#333] relative overflow-hidden bg-gradient-to-b from-[#08080a] via-[#0a0a0c] to-[#0d0d0f]">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-20">
                <h2 className="font-['VT323'] text-5xl md:text-6xl text-[#ffb000] uppercase tracking-wider mb-2">
                    &lt;SYSTEM_COMPARISON /&gt;
                </h2>
                <p className="font-['Space_Mono'] text-[#888] text-sm uppercase tracking-widest">
                    Benchmarking performance against legacy protocols
                </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto pb-8 pt-8"> 
                {/* Min width ensures table doesn't break on mobile */}
                <div className="min-w-[900px] grid grid-cols-[1.2fr_1.8fr_1.5fr_1.5fr]">
                    
                    {/* --- Headers --- */}
                    <div className="p-6 border-b border-[#333]"></div> {/* Empty corner */}
                    
                    {/* Hoverstate Header */}
                    <div className="relative p-8 border border-[#ffb000] border-b-0 bg-[#ffb000]/10 rounded-t-xl text-center flex flex-col items-center justify-center z-10">
                        <div className="absolute -top-4 bg-[#0a0a0c] px-3 text-[#ffb000] z-20">
                             {/* Star Icon */}
                             <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <h3 className="font-['VT323'] text-4xl text-[#ffb000] tracking-widest uppercase mt-2">HOVERSTATE</h3>
                    </div>

                    <div className="p-6 border-b border-[#333] text-center flex items-end justify-center pb-6">
                        <h3 className="font-['Space_Mono'] text-lg text-[#666] font-bold uppercase tracking-wide">Full-time<br/>Designer</h3>
                    </div>

                    <div className="p-6 border-b border-[#333] text-center flex items-end justify-center pb-6">
                        <h3 className="font-['Space_Mono'] text-lg text-[#666] font-bold uppercase tracking-wide">Other<br/>Agencies</h3>
                    </div>

                    {/* --- Rows --- */}
                    {rows.map((row, index) => (
                        <React.Fragment key={index}>
                            {/* Label */}
                            <div className="p-6 border-b border-[#333] flex items-center text-[#888] font-['Space_Mono'] text-xs md:text-sm uppercase tracking-wider">
                                {row.label}
                            </div>

                            {/* Hoverstate Data Cell */}
                            <div className={`
                                p-6 border-x border-[#ffb000] flex items-center justify-center text-center font-['Space_Mono'] text-[#ffb000] font-bold text-sm md:text-base bg-[#ffb000]/5 backdrop-blur-sm
                                ${index === rows.length - 1 ? 'border-b rounded-b-xl' : 'border-b border-[#ffb000]/20'}
                                hover:bg-[#ffb000]/10 transition-colors duration-300
                            `}>
                                {index === 0 ? <span className="font-['VT323'] text-4xl">{row.hoverstate}</span> : row.hoverstate}
                            </div>

                            {/* FT Data Cell */}
                            <div className="p-6 border-b border-[#333] flex items-center justify-center text-center font-['Space_Mono'] text-[#555] text-sm">
                                {row.ft}
                            </div>

                            {/* Agency Data Cell */}
                            <div className="p-6 border-b border-[#333] flex items-center justify-center text-center font-['Space_Mono'] text-[#555] text-sm">
                                {row.agency}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="md:hidden text-center mt-4 font-['Space_Mono'] text-[10px] text-[#444] animate-pulse">
                &lt;&lt; SWIPE TO COMPARE &gt;&gt;
            </div>
        </div>
    </section>
  );
};