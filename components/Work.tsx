import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// --- Types & Data ---
interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  img: string;
  description: string;
  details: string;
  year: string;
  status: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'NEON_PROTOCOL',
    category: 'FINTECH',
    tags: ['WebGL', 'React', 'Real-time Data', 'Dashboard'],
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    description: "High-frequency trading interface for the post-currency era.",
    details: "We engineered a sub-millisecond latency dashboard visualizing complex crypto-derivative flows. Using WebGL for heatmaps and holographic depth charts, Neon Protocol redefines institutional trading interfaces.",
    year: '2023',
    status: 'DEPLOYED',
    link: '#neon-protocol'
  },
  {
    id: '02',
    title: 'CYBER_GARDENS',
    category: 'E_COMMERCE',
    tags: ['Three.js', 'Shopify Headless', 'Generative Art'],
    img: 'https://images.unsplash.com/photo-1614850523060-8da1d56e37fe?q=80&w=2670&auto=format&fit=crop',
    description: "Generative flora marketplace for virtual real estate.",
    details: "A fully immersive e-commerce platform where users purchase unique, algorithmically generated plant assets. Includes 3D inspection tools allowing zoom levels down to the cellular structure.",
    year: '2024',
    status: 'LIVE',
    link: '#cyber-gardens'
  },
  {
    id: '03',
    title: 'VOID_RUNNER',
    category: 'GAME_WEBGL',
    tags: ['WebGPU', 'Audio Reactive', 'Gamification'],
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
    description: "Browser-based infinite runner with console-quality graphics.",
    details: "Utilizing WebGPU, we pushed browser performance limits. Void Runner features reactive audio landscapes and procedural level generation. Winner of the Awwwards Site of the Month.",
    year: '2022',
    status: 'ARCHIVED',
    link: '#void-runner'
  },
  {
    id: '04',
    title: 'OFFWORLD_DATA',
    category: 'SAAS',
    tags: ['Big Data', 'D3.js', 'Enterprise UI'],
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    description: "Satellite telemetry aggregation for terraformed colonies.",
    details: "A mission-critical dashboard aggregating exobytes of atmospheric data. We implemented a 'focus-first' UI that dynamically highlights anomalies while suppressing nominal data streams.",
    year: '2024',
    status: 'BETA',
    link: '#offworld'
  },
  {
    id: '05',
    title: 'HYPER_ARCHIVE',
    category: 'DATABASE',
    tags: ['VR/AR', 'Knowledge Graph', 'Search'],
    img: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?q=80&w=2569&auto=format&fit=crop',
    description: "Neural storage visualizer for government archives.",
    details: "Replacing legacy filing systems with a 3D-node based retrieval system. Allows agents to traverse connections between classified documents using VR headsets or desktop browsers.",
    year: '2023',
    status: 'CLASSIFIED',
    link: '#hyper-archive'
  },
  {
    id: '06',
    title: 'ZERO_GRAVITY_UI',
    category: 'SPATIAL',
    tags: ['Spatial Computing', 'UX Research', 'Prototyping'],
    img: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop',
    description: "Operating system design for orbital stations.",
    details: "Designed specifically for microgravity environments where up and down are relative. The radial interface ensures controls are accessible from any orientation.",
    year: '2025',
    status: 'CONCEPT',
    link: '#zero-g'
  },
  {
    id: '07',
    title: 'NEURAL_VIZ',
    category: 'AI_R&D',
    tags: ['Python Bridge', 'Canvas API', 'Machine Learning'],
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
    description: "Real-time visualization of LLM thought processes.",
    details: "A debugging tool for AI researchers that maps token probabilities in 3D space, helping engineers understand hallucination patterns in large language models.",
    year: '2024',
    status: 'LIVE',
    link: '#neural-viz'
  },
  {
    id: '08',
    title: 'QUANTUM_DASH',
    category: 'ANALYTICS',
    tags: ['IoT', 'Scientific Visualization', 'React'],
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop',
    description: "Qubit stability monitoring for quantum rigs.",
    details: "Interfacing directly with dilution refrigerators, this dashboard monitors sub-zero temperatures and qubit coherence times with nanosecond precision.",
    year: '2023',
    status: 'DEPLOYED',
    link: '#quantum-dash'
  },
  {
    id: '09',
    title: 'SYNTH_WAVE',
    category: 'AUDIO',
    tags: ['WebAudio API', 'WASM', 'Product Design'],
    img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2670&auto=format&fit=crop',
    description: "Generative audio workstation in the browser.",
    details: "A DAW that runs entirely in WebAssembly. Users can generate synth patches using text prompts and arrange them in a collaborative timeline.",
    year: '2022',
    status: 'SUNSET',
    link: '#synth-wave'
  },
  {
    id: '10',
    title: 'MECH_ASSEMBLY',
    category: 'ROBOTICS',
    tags: ['WebRTC', 'Low Latency', 'Hardware Interface'],
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop',
    description: "Remote teleoperation suite for heavy machinery.",
    details: "Ultra-low latency video feed and control inputs for mining bots. Features haptic feedback integration and augmented reality overlays for safety zones.",
    year: '2024',
    status: 'BETA',
    link: '#mech-assembly'
  }
];

// --- Window Component ---

const WorkWindow = ({ project }: { project: Project }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Lock scroll when maximized and handle Escape key
  useEffect(() => {
    if (isMaximized) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsMaximized(false);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => { 
          window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isMaximized]);

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    // If we maximize, we must expand (un-minimize)
    if (!isMaximized) setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) {
        setIsMaximized(false);
    } else {
        setIsMinimized(!isMinimized);
    }
  };

  // Base Content Render Function (Shared between Grid and Portal)
  const renderContent = (maximized: boolean) => (
      <div 
        className={`flex flex-col bg-[#0d0d0f] border-2 border-[#333] overflow-hidden 
        ${maximized 
            ? 'fixed inset-0 z-[100] w-screen h-screen border-0 rounded-none bg-[#0a0a0c]' 
            : `w-full ${isMinimized ? 'h-[40px]' : 'h-[300px]'} hover:border-[#555] relative z-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}`}
        role={maximized ? "dialog" : undefined}
        aria-modal={maximized ? "true" : undefined}
      >
        {/* --- Title Bar --- */}
        <div 
            className="h-[38px] bg-[#1a1a1d] border-b border-[#333] flex items-center justify-between px-3 select-none flex-shrink-0 group cursor-default"
            onDoubleClick={toggleMaximize}
        >
            <div className="flex items-center gap-2 overflow-hidden">
                 <div className={`w-3 h-3 border border-[#555] ${maximized ? 'bg-[#ffb000]' : 'bg-[#333]'} group-hover:bg-[#ffb000] transition-colors`}></div>
                 <span className="font-['VT323'] text-[#e0e0e0] text-lg tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
                    {project.id}_{project.title}.exe
                 </span>
            </div>
            
            <div className="flex items-center gap-1 ml-2">
                {/* Minimize / Restore Down */}
                <button 
                    onClick={toggleMinimize}
                    className="w-5 h-5 bg-[#333] border border-[#555] text-white flex items-center justify-center hover:bg-[#444] active:bg-[#222] transition-colors"
                    aria-label="Minimize"
                >
                    <div className="w-2 h-[1px] bg-white mt-2"></div>
                </button>
                {/* Maximize */}
                <button 
                    onClick={toggleMaximize}
                    className="w-5 h-5 bg-[#333] border border-[#555] text-white flex items-center justify-center hover:bg-[#444] active:bg-[#222] transition-colors"
                    aria-label="Maximize"
                >
                    {maximized ? (
                        <div className="w-2 h-2 border border-white"></div> 
                    ) : (
                        <div className="w-2.5 h-2.5 border-t-2 border-white"></div>
                    )}
                </button>
                {/* Close (Resets state) */}
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsMaximized(false); setIsMinimized(true); }}
                    className="w-5 h-5 bg-[#333] border border-[#555] text-white flex items-center justify-center hover:bg-[#cc3333] hover:border-[#ff5555] transition-colors group/close"
                    aria-label="Close"
                >
                    <span className="text-[10px] leading-none mb-[1px]">×</span>
                </button>
            </div>
        </div>

        {/* --- Content Area --- */}
        <div className={`flex-1 flex flex-col md:flex-row min-h-0 bg-[#050505] relative ${isMinimized && !maximized ? 'hidden' : 'flex'} overflow-y-auto md:overflow-hidden`}>
            
            {/* Image Section */}
            <div className={`relative group/img ${maximized ? 'w-full md:w-[60%] h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-[#333]' : 'w-full h-full'}`}>
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[#ffb000] mix-blend-overlay opacity-0 group-hover/img:opacity-10 transition-opacity duration-500 pointer-events-none z-10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none z-10 opacity-20"></div>

                {/* The Screenshot */}
                <img 
                    src={project.img} 
                    alt={`${project.title} - ${project.category} project screenshot featuring ${project.tags.join(', ')}`} 
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-all duration-700 ${maximized ? 'opacity-100' : 'opacity-80 group-hover/img:opacity-100 grayscale hover:grayscale-0'}`}
                />

                {maximized && (
                    <div className="absolute bottom-6 left-6 z-20">
                         <div className="bg-black/80 backdrop-blur-sm border border-[#00ff9d]/30 px-3 py-1 text-[#00ff9d] font-['Space_Mono'] text-xs shadow-lg">
                            SOURCE: LIVE_CAPTURE_FRAME_01
                         </div>
                    </div>
                )}
            </div>

            {/* Content Section - Hidden in grid view, visible in overlay */}
            <div className={`relative flex flex-col bg-[#111] ${maximized ? 'w-full md:w-[40%] h-auto md:h-full' : 'hidden'}`}>
                
                <div className={`flex-1 flex flex-col p-6 md:p-10 ${maximized ? 'justify-center' : ''}`}>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="font-['Space_Mono'] text-[#ffb000] text-[10px] tracking-widest border border-[#ffb000] px-2 py-1 bg-black">
                            {project.category}
                        </span>
                        {maximized && project.tags.map(tag => (
                            <span key={tag} className="font-['Space_Mono'] text-[#555] text-[10px] tracking-widest border border-[#333] px-2 py-1 bg-[#0a0a0c]">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className={`font-['VT323'] text-[#e0e0e0] uppercase leading-none mb-4 ${maximized ? 'text-5xl md:text-7xl' : 'text-4xl'}`}>
                        {project.title}
                    </h2>

                    {/* Description */}
                    <p className={`font-['Space_Mono'] text-[#888] leading-relaxed mb-8 ${maximized ? 'text-sm md:text-base max-w-md' : 'text-xs md:text-sm'}`}>
                        {project.description}
                    </p>

                    {/* Maximized Only Content */}
                    {maximized && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                             <div>
                                <h4 className="font-['Space_Mono'] text-[#e0e0e0] text-xs uppercase mb-2 border-b border-[#333] pb-2 inline-block">Execute:</h4>
                                <br />
                                <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-[#ffb000] text-black px-8 py-4 font-['Space_Mono'] font-bold text-sm tracking-widest uppercase hover:translate-x-1 hover:translate-y-1 transition-transform border-2 border-[#ffb000] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group/btn"
                                >
                                    Visit Live Site
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </a>
                             </div>

                             <div className="bg-[#0a0a0c] border border-[#333] p-6 space-y-4">
                                <h4 className="font-['VT323'] text-2xl text-[#00ff9d]">PROJECT_DETAILS</h4>
                                <p className="font-['Space_Mono'] text-[#666] text-xs leading-relaxed">
                                    {project.details}
                                </p>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#333]/50">
                                    <div>
                                        <div className="text-[#444] text-[10px] font-['Space_Mono'] uppercase">Year</div>
                                        <div className="text-[#e0e0e0] text-sm font-['Space_Mono']">{project.year}</div>
                                    </div>
                                    <div>
                                        <div className="text-[#444] text-[10px] font-['Space_Mono'] uppercase">Status</div>
                                        <div className="text-[#00ff9d] text-sm font-['Space_Mono'] animate-pulse">{project.status}</div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
  );

  return (
    <>
        {/* Always render the grid item */}
        {renderContent(false)}
        
        {/* If maximized, render the portal overlay as well */}
        {isMaximized && createPortal(renderContent(true), document.body)}
    </>
  );
};

// --- Main Section ---

export const Work: React.FC = () => {
  return (
    <section id="work" className="w-full py-24 border-t border-[#333] relative overflow-hidden bg-gradient-to-b from-[#0d0d0f] via-[#0a0a0c] to-[#08080a]">
        <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
            <h2 className="font-['VT323'] text-5xl md:text-6xl text-[#ffb000] uppercase tracking-wider mb-2">
                &lt;PROJECT_DIRECTORY /&gt;
            </h2>
            <p className="font-['Space_Mono'] text-[#888] text-sm uppercase tracking-widest max-w-xl mx-auto">
                Accessing secured archives. click 'maximize' to inspect full source.
            </p>
        </div>

        {/* 2x5 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
                <WorkWindow key={project.id} project={project} />
            ))}
        </div>
        
        {/* Footer Note */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] bg-[#111] rounded-full">
                <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse"></span>
                <span className="font-['Space_Mono'] text-[#555] text-[10px] uppercase tracking-widest">
                    ALL SYSTEMS NOMINAL. END OF LINE.
                </span>
            </div>
        </div>
      </div>
    </section>
  );
};