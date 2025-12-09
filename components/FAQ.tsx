import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Message {
  id: string;
  type: 'system' | 'user';
  text: string;
  timestamp: string;
}

const QUESTIONS = [
  { 
    q: "What is the typical turnaround?", 
    a: "For the Landing Page+ package, we typically ship in 10-14 days. The MVP Kit takes about 3-4 weeks depending on scope complexity." 
  },
  { 
    q: "Do you provide the copy?", 
    a: "Yes. We hate Lorem Ipsum. We include professional, conversion-focused copywriting in all our packages to ensure your narrative sells." 
  },
  { 
    q: "What tech stack do you use?", 
    a: "We build on modern, scalable foundations: React, Next.js, TailwindCSS, and WebGL for high-performance interactions." 
  },
  { 
    q: "Do you offer post-launch support?", 
    a: "Absolutely. Every project includes 30 days of free support. We also offer ongoing partnership retainers for continuous iteration." 
  },
  { 
    q: "How do payments work?", 
    a: "We work on a milestone basis: 50% to kickstart the project, 25% upon design approval, and the final 25% before handoff/deployment." 
  }
];

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const INITIAL_MSG: Message = { 
  id: 'init', 
  type: 'system', 
  text: 'Connection established. Select a query from the database or type a custom inquiry below.', 
  timestamp: getCurrentTime() 
};

export const FAQ: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // For "Window Shade" effect
  const [history, setHistory] = useState<Message[]>([INITIAL_MSG]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Only scroll if the chat area is visible
    if (!isCollapsed || isMaximized) {
        scrollToBottom();
    }
  }, [history, isTyping, isMaximized, isCollapsed]);

  // Note: No body scroll locking - let page scroll naturally even when maximized

  const handleMinimize = () => {
    if (isMaximized) {
      // If maximized, restore to inline
      setIsMaximized(false);
    } else {
      // If inline, toggle collapse (Window Shade)
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleMaximizeToggle = () => {
    if (isCollapsed) setIsCollapsed(false); // Auto-expand if collapsed
    setIsMaximized(!isMaximized);
  };

  const handleReset = () => {
    setHistory([{ ...INITIAL_MSG, timestamp: getCurrentTime() }]);
    setInputValue("");
    setIsTyping(false);
  };

  const handleClose = () => {
      // Logic: 
      // 1. If Maximized -> Go Inline
      // 2. If Inline -> Reset Chat (and maybe collapse?)
      if (isMaximized) {
          setIsMaximized(false);
      } else {
          handleReset();
      }
  };

  const handleAsk = (index: number) => {
    if (isTyping) return;
    const item = QUESTIONS[index];
    
    // User Message
    setHistory(prev => [...prev, { 
      id: generateId(), 
      type: 'user', 
      text: item.q,
      timestamp: getCurrentTime()
    }]);
    
    setIsTyping(true);

    // System Response Delay
    setTimeout(() => {
      setIsTyping(false);
      setHistory(prev => [...prev, {
        id: generateId(),
        type: 'system',
        text: item.a,
        timestamp: getCurrentTime()
      }]);
    }, 1200);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue("");
    
    // 1. User Message
    setHistory(prev => [...prev, { 
        id: generateId(), 
        type: 'user', 
        text: userText, 
        timestamp: getCurrentTime() 
    }]);

    setIsTyping(true);

    // 2. System Process & Mailto
    setTimeout(() => {
        setIsTyping(false);
        const sysMsg: Message = {
            id: generateId(),
            type: 'system',
            text: `Initiating secure transmission to ishmam@hoverstate.design...`,
            timestamp: getCurrentTime()
        };
        setHistory(prev => [...prev, sysMsg]);

        setTimeout(() => {
             window.location.href = `mailto:ishmam@hoverstate.design?subject=Project Inquiry via HoverState&body=${encodeURIComponent(userText)}`;
             setShowToast(true);
             setTimeout(() => setShowToast(false), 3000);
        }, 1500);
    }, 1000);
  };

  const renderWindow = (maximized: boolean) => (
    <div 
        className={`
            bg-[#1a1a1d] border-2 border-[#555] flex flex-col overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${maximized 
                ? 'fixed inset-0 z-[100] w-full h-full border-0 rounded-none' 
                : `absolute inset-0 w-full ${isCollapsed ? 'h-[36px]' : 'h-full'}` 
            }
        `}
        role={maximized ? "dialog" : undefined}
        aria-modal={maximized ? "true" : undefined}
    >
        {/* Title Bar */}
        <div 
            className="flex-shrink-0 h-9 bg-[#333] flex items-center justify-between px-2 z-20 border-b border-[#555] select-none cursor-default"
            onDoubleClick={handleMaximizeToggle}
        >
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ffb000] border border-[#d49200]"></div>
                <span className="font-['VT323'] text-[#e0e0e0] text-lg tracking-wide">FAQ_CLIENT_v1.0.exe</span>
            </div>
            <div className="flex gap-1">
                {/* Minimize Button */}
                <button 
                    onClick={handleMinimize}
                    className="w-5 h-5 bg-[#555] border border-[#777] text-[10px] flex items-center justify-center text-white hover:bg-[#666] active:border-[#444] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]"
                    title={maximized ? "Restore Down" : (isCollapsed ? "Expand" : "Collapse")}
                >
                    <span className="mb-1">_</span>
                </button>
                {/* Maximize/Restore Button */}
                <button 
                    onClick={handleMaximizeToggle}
                    className="w-5 h-5 bg-[#555] border border-[#777] text-[10px] flex items-center justify-center text-white hover:bg-[#666] active:border-[#444] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]"
                    title={maximized ? "Restore" : "Maximize"}
                >
                    {maximized ? '⧉' : '□'}
                </button>
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="w-5 h-5 bg-[#cc3333] border border-[#ff5555] text-[10px] flex items-center justify-center text-white hover:bg-[#ff0000] active:border-[#990000] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]"
                    title="Close / Reset"
                >
                    ×
                </button>
            </div>
        </div>

        {/* Window Body - Hidden when collapsed (unless maximized, which overrides collapse) */}
        <div className={`flex-1 flex flex-col md:flex-row min-h-0 ${!maximized && isCollapsed ? 'hidden' : 'flex'}`}>
            
            {/* Sidebar: Query Database */}
            <div className={`
                flex flex-col
                w-full h-[160px] border-b border-[#333]
                md:w-1/3 md:h-auto md:border-b-0 md:border-r 
                bg-[#111] pt-4 md:pt-10 
                ${maximized ? 'md:w-1/4' : ''}
            `}>
                <div className="px-4 pb-2 border-b border-[#333] mb-2">
                    <h3 className="font-['Space_Mono'] text-[#555] text-xs uppercase tracking-widest">
                        // QUICK_QUERIES
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {QUESTIONS.map((item, i) => (
                        <button 
                            key={i}
                            onClick={() => handleAsk(i)}
                            disabled={isTyping}
                            className="w-full text-left p-2 md:p-3 font-['Space_Mono'] text-xs text-[#888] hover:bg-[#222] hover:text-[#ffb000] border border-transparent hover:border-[#333] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative"
                        >
                            <span className="opacity-0 group-hover:opacity-100 absolute left-1 text-[#ffb000]">&gt;</span>
                            <span className="pl-4">{item.q}</span>
                        </button>
                    ))}
                </div>
                {/* Status bar */}
                <div className="h-12 md:h-14 px-4 bg-[#0d0d0f] border-t border-[#333] font-['VT323'] text-[#00ff9d] text-lg md:text-xl flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></span>
                        SUPPORT_ONLINE
                    </div>
                    {/* Settings Icon */}
                    <button className="text-[#555] hover:text-[#ffb000] transition-colors p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Chat Area: Live Terminal */}
            <div className="flex-1 bg-[#050505] relative flex flex-col min-w-0 h-full">
                {/* Menu Bar */}
                <div className="hidden md:flex absolute top-0 left-0 w-full h-6 bg-[#222] border-b border-[#333] items-center px-4 gap-4 overflow-hidden z-10">
                    {['File', 'Edit', 'View', 'Help'].map(m => (
                        <span key={m} className="font-['Space_Mono'] text-[10px] text-[#888] cursor-pointer hover:text-white hover:underline">{m}</span>
                    ))}
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 pt-4 md:pt-10 scroll-smooth" id="chat-container">
                    {history.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex flex-col max-w-[90%] md:max-w-[85%] ${msg.type === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className={`font-['Space_Mono'] text-[10px] font-bold uppercase ${msg.type === 'user' ? 'text-[#ffb000]' : 'text-[#00ff9d]'}`}>
                                    {msg.type === 'user' ? 'YOU' : 'SYSTEM'}
                                </span>
                                <span className="font-['Space_Mono'] text-[10px] text-[#444]">{msg.timestamp}</span>
                            </div>
                            <div className={`
                                px-4 py-3 border text-xs md:text-sm font-['Space_Mono'] leading-relaxed break-words
                                ${msg.type === 'user' 
                                    ? 'bg-[#ffb000]/10 border-[#ffb000]/30 text-[#e0e0e0] rounded-tl-lg rounded-bl-lg rounded-br-lg' 
                                    : 'bg-[#1a1a1a] border-[#333] text-[#ccc] rounded-tr-lg rounded-bl-lg rounded-br-lg'}
                            `}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex flex-col mr-auto items-start max-w-[85%] animate-pulse">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-['Space_Mono'] text-[10px] font-bold text-[#00ff9d] uppercase">SYSTEM</span>
                            </div>
                            <div className="px-4 py-3 bg-[#1a1a1a] border border-[#333] text-[#00ff9d] font-['VT323'] text-xl rounded-tr-lg rounded-bl-lg rounded-br-lg">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Toast Notification */}
                {showToast && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-max pointer-events-none">
                        <div className="bg-[#050505] border border-[#00ff9d] px-8 py-5 flex flex-col items-center gap-1 animate-pulse">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00ff9d] rounded-full"></span>
                                <span className="text-[#00ff9d] font-['VT323'] text-3xl uppercase tracking-widest">
                                    MESSAGE SENT
                                </span>
                            </div>
                            <span className="text-[#555] font-['Space_Mono'] text-[10px] uppercase tracking-wider">
                                Check your mail client
                            </span>
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSend} className="w-full flex-shrink-0 h-12 md:h-14 border-t border-[#333] bg-black flex z-20 mt-auto m-0 p-0">
                    <div className="flex-1 h-full flex items-center px-4 gap-3 bg-black/50 focus-within:bg-black transition-colors relative group">
                        <span className="font-['Space_Mono'] text-[#444] text-xs md:text-sm group-focus-within:text-[#ffb000] transition-colors">&gt;</span>
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type inquiry..."
                            className="flex-1 bg-transparent border-none outline-none font-['Space_Mono'] text-[#e0e0e0] text-xs md:text-sm placeholder-[#444] h-full w-full"
                        />
                    </div>
                    
                    {/* Reset Button */}
                    <button 
                        type="button" 
                        onClick={handleReset}
                        className="h-full px-4 md:px-6 bg-[#1a1a1a] text-[#666] font-['Space_Mono'] text-[10px] md:text-xs border-l border-[#333] uppercase hover:bg-[#222] hover:text-[#ff3333] transition-colors whitespace-nowrap"
                    >
                        Cancel
                    </button>

                    {/* Send Button */}
                    <button 
                        type="submit"
                        className="h-full px-6 md:px-8 bg-[#222] text-[#e0e0e0] font-['Space_Mono'] text-[10px] md:text-xs font-bold border-l border-[#333] uppercase hover:bg-[#ffb000] hover:text-black transition-all tracking-wider"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    </div>
  );

  return (
      <section id="faq" className="w-full py-24 border-t border-[#333] relative overflow-hidden bg-gradient-to-b from-[#0a0a0c] via-[#0d0d0f] to-[#08080a]">
        <div className="px-[clamp(20px,5%,100px)] max-w-7xl mx-auto text-center mb-12">
            <h2 className="font-['VT323'] text-5xl text-[#ffb000] uppercase tracking-wider mb-2">
            &lt;LIVE_SUPPORT /&gt;
            </h2>
            <p className="font-['Space_Mono'] text-[#888] text-sm max-w-lg mx-auto leading-relaxed">
                Initialize the chat protocol to connect directly with our operators.
            </p>
        </div>

        {/* --- Window Container --- */}
        {/* Placeholder div to prevent layout shift when maximized */}
        <div className="px-[clamp(12px,2%,32px)] max-w-4xl mx-auto h-[600px] relative">
            {renderWindow(false)}
            {isMaximized && createPortal(renderWindow(true), document.body)}
        </div>
      </section>
  );
};