import React, { useEffect, useState, useRef } from 'react';

export const Hero: React.FC = () => {
  // Terminal State
  const [history, setHistory] = useState<Array<{type: 'system' | 'user', content: string}>>([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial boot sequence
  useEffect(() => {
    const initialLines = [
      "HOVERSTATE OS v2.4.0",
      "INITIALIZING...",
      "CONNECTING TO HOST...",
      "CONNECTION ESTABLISHED.",
      "TYPE A COMMAND OR SAY HELLO."
    ];

    let delay = 0;
    initialLines.forEach((line, i) => {
        delay += 600;
        setTimeout(() => {
            setHistory(prev => [...prev, { type: 'system', content: line }]);
        }, delay);
    });
  }, []);

  // Keep terminal scrolled to bottom internally (not the page)
  useEffect(() => {
    // Only scroll within the terminal container, not the whole page
    const terminalContainer = document.querySelector('.terminal-output');
    if (terminalContainer) {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  const focusInput = () => {
      inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        const cmd = inputVal.trim();
        if (!cmd) return;

        // Add User Input
        setHistory(prev => [...prev, { type: 'user', content: cmd }]);
        setInputVal('');

        // Generate Random Funny Response
        setTimeout(() => {
            const responses = [
                "I'M SORRY DAVE, I CAN'T DO THAT.",
                "HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?",
                "ERROR 418: I AM A TEAPOT.",
                "NICE TRY, BUT NO.",
                "COMPUTING... COMPUTING... 42.",
                "PLEASE DON'T FEED THE BUGS.",
                "SYSTEM OVERLOAD. NEED COFFEE.",
                "I SAW YOU CLICK THAT.",
                "DELETING SYSTEM32... JUST KIDDING.",
                "PASSWORD INCORRECT. TRY 'ADMIN'.",
                "WOULD YOU LIKE TO PLAY A GAME?",
                "LOADING WITTY REMARK... FAILED.",
                "PC LOAD LETTER?",
                "INSERT COIN TO CONTINUE.",
                "KEYBOARD NOT DETECTED. PRESS F1 TO RESUME.",
                "BUFFER OVERFLOW IN SECTOR 7G."
            ];
            
            let reply = responses[Math.floor(Math.random() * responses.length)];
            const lowerCmd = cmd.toLowerCase();
            
            // Specific Easter Eggs
            if (lowerCmd.includes('hello') || lowerCmd.includes('hi')) {
                reply = "GREETINGS, HUMAN.";
            } else if (lowerCmd.includes('help')) {
                reply = "THERE IS NO HELP. ONLY CODE.";
            } else if (lowerCmd.includes('clear')) {
                setHistory([]);
                return;
            } else if (lowerCmd.includes('sudo')) {
                reply = "NICE TRY. YOU HAVE NO POWER HERE.";
            } else if (lowerCmd.includes('whoami')) {
                reply = "A VISITOR IN MY WORLD.";
            } else if (lowerCmd.includes('ls')) {
                reply = "FILE_NOT_FOUND";
            }

            setHistory(prev => [...prev, { type: 'system', content: reply }]);
        }, 300 + Math.random() * 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row items-stretch lg:items-center justify-center lg:justify-center gap-8 lg:gap-16 xl:gap-20">
        {/* Left Column - Text Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center flex-shrink-0">
            <div className="relative">
            
            {/* System Status Line */}
            <div className="flex items-center gap-3 mb-6 text-[#00ff9d] font-['Space_Mono'] text-xs tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></span>
                SYSTEM STATUS: 2 SPOTS AVAILABLE
            </div>
            
            {/* Main Headline */}
            <h1 className="font-['VT323'] text-5xl md:text-7xl leading-[0.9] text-[#e0e0e0] mb-8 font-normal">
                The Web is No <br />
                Place To Be <br />
                <span className="relative inline-block whitespace-nowrap mt-3">
                    <span className="relative z-0">Static</span>
                    <div className="absolute top-[50%] left-[-5%] w-[110%] h-2 bg-[#ff3333] -rotate-2 opacity-90 z-10"></div>
                    <span className="absolute -bottom-6 right-[-10px] md:right-[-25px] font-['Permanent_Marker'] text-[#ff3333] text-2xl md:text-3xl -rotate-[12deg] z-20">
                        STILL
                    </span>
                </span>
            </h1>
            
            <p className="font-['Space_Mono'] text-[#888] text-sm md:text-base leading-relaxed border-l-2 border-[#ffb000] pl-4 mb-10 max-w-sm mt-8">
                Welcome to <strong className="text-[#e0e0e0]">HoverState</strong>. We architect reactive, immersive digital environments that refuse to be ignored.
            </p>

            {/* Bottom CTA Area */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => window.open("https://google.com", "_blank", "noopener,noreferrer")} // RESERVE YOUR SPOT LINK 
                    className="relative bg-[#ffb000] text-black border-2 border-[#ffb000] px-6 py-3 font-['Space_Mono'] font-bold text-sm uppercase tracking-widest hover:translate-x-1 hover:translate-y-1 transition-transform group overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                    >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
                    <span className="relative z-10">RESERVE YOUR SPOT</span>
                </button>


                <span className="hidden sm:block font-['VT323'] text-[#e0e0e0]/40 text-xs tracking-widest">v2.0.45</span>
            </div>
            
            </div>
        </div>

        {/* Right Column - Terminal */}
        <div className="w-full lg:w-[40%] flex items-center justify-center flex-shrink-0">
            
            {/* Simple Box Container - Flat, No Glow */}
            <div 
                className="w-full max-w-sm h-[320px] bg-black border border-[#00ff9d] p-4 flex flex-col cursor-text transition-colors terminal-output"
                onClick={focusInput}
            >
                 {/* Output Area - Using text-sm for better readability */}
                 <div className="flex-1 overflow-y-auto font-['Space_Mono'] text-sm leading-relaxed pr-2 scrollbar-thin scrollbar-thumb-[#00ff9d]/30 scrollbar-track-transparent">
                    {history.map((line, index) => (
                        <div key={index} className="mb-1 break-words">
                            <span className={`mr-2 select-none ${line.type === 'user' ? 'text-[#00ff9d] font-bold' : 'text-[#00ff9d] opacity-70'}`}>
                                {line.type === 'user' ? '>' : '#'}
                            </span>
                            <span className="text-[#00ff9d]">
                                {line.content}
                            </span>
                        </div>
                    ))}
                    {/* Input Line merged into the flow for a cleaner look */}
                    <div className="flex items-center mt-1 relative">
                        <span className="text-[#00ff9d] mr-2 text-sm font-bold select-none">{'>'}</span>
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none font-['Space_Mono'] text-sm text-[#00ff9d] placeholder-[#004d2f] uppercase caret-[#00ff9d]"
                            placeholder=""
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
};