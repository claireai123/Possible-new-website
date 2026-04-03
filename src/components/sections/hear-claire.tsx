"use client";

import { useState, useRef, useEffect } from "react";

export function HearClaire() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress >= 1) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error("Audio block:", err));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      const p = Math.min(current / total, 1);
      setProgress(p);
      
      if (p >= 1) {
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-[120px] font-sans bg-[#fefefc]">
      <audio 
        ref={audioRef} 
        src="/EditedMUSIC.mp3" 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={() => setIsPlaying(false)} 
        preload="auto"
      />
      <div className="relative mx-auto max-w-[1680px]">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left: Minimal Copy block mimicking Legora */}
          <div className="max-w-xl">
            <h2 className="text-[#0a0a0a] font-serif text-[3.5rem] md:text-[5rem] leading-[1.05] tracking-[-0.04em] mb-4">
              Never miss a lead.
            </h2>
            
            <p className="text-[16px] md:text-[18px] text-[#0a0a0a]/50 max-w-[400px] mb-8">
              Capture the right clients 24/7 and entirely automate routine client update calls. Help your lawyers spend significantly less time managing calls.
            </p>

            <button className="bg-[#0a0a0a] text-white px-10 py-5 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-black/80 transition-colors">
              Book a Demo
            </button>
          </div>

          {/* Right: Mock Dashboard + Floating Player */}
          <div className="relative w-full flex justify-end">
            
            {/* The Dashboard Mockup Wrapper */}
            <div className="w-full max-w-[850px] bg-white rounded-none border border-[#e4e4e7] shadow-sm relative overflow-hidden">
              
              {/* Fake Platform Header */}
              <div className="p-8 pb-0">
                <div className="flex items-center justify-between border-b border-[#0a0a0a] pb-6 mb-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-[#0a0a0a]/40 uppercase mb-2 font-sans">by claire.ai</p>
                    <h3 className="text-3xl font-serif text-[#0a0a0a] uppercase tracking-tight">Voice AI</h3>
                  </div>
                  <div className="hidden md:flex gap-6 text-[12px] font-bold text-[#0a0a0a]/40 uppercase tracking-widest font-sans">
                    <span>Voice AI</span>
                    <span className="text-[#0a0a0a] border-b-2 border-[#0a0a0a] pb-1">Call Logs</span>
                    <span>Agents</span>
                    <span>Numbers</span>
                    <span>Analytics</span>
                  </div>
                </div>
              </div>

              {/* Fake Table */}
              <div className="w-full px-8 pb-8 font-sans">
                <div className="grid grid-cols-4 text-[11px] font-bold text-[#0a0a0a] uppercase tracking-widest bg-[#f4f4f5] rounded-none px-4 py-3 border border-[#e4e4e7] border-b-0">
                  <div>From</div>
                  <div>Status</div>
                  <div>Duration</div>
                  <div>Agent</div>
                </div>
                
                {[
                  { from: "(555) 019-3847", dur: "2:40", agent: "Harrington" },
                  { from: "(555) 442-1065", dur: "2:12", agent: "Siv" },
                  { from: "(555) 734-2210", dur: "0:39", agent: "North" },
                  { from: "(555) 308-7902", dur: "1:50", agent: "Ashford, Ke" },
                  { from: "(555) 669-5571", dur: "1:11", agent: "Grantham" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-4 items-center text-[13px] text-[#0a0a0a]/80 border border-[#e4e4e7] border-t-0 px-4 py-4 hover:bg-[#fafafa]">
                    <div className="font-mono text-[#0a0a0a]/60 text-xs">{row.from}</div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-[#0a0a0a] uppercase tracking-widest border border-[#e4e4e7] px-2 py-0.5 bg-white">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 bg-[#0a0a0a] flex items-center justify-center text-white"><svg width="8" height="8" viewBox="0 0 12 12" className="ml-[2px]"><path d="M3 1l8 5-8 5V1z" fill="white" /></svg></div>
                       <span className="font-mono text-xs">{row.dur}</span>
                    </div>
                    <div className="truncate text-[#0a0a0a]/60 uppercase text-[11px] tracking-wider">{row.agent}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Mobile Audio UI */}
            <div className="absolute right-[0] bottom-[-40px] md:right-[-40px] md:bottom-[20px] w-[300px] bg-[#0a0a0a] rounded-none p-8 border border-white/20 z-20 shadow-2xl flex flex-col items-center">
              
              <div className="text-center mb-8">
                <h4 className="text-white font-serif text-2xl mb-2">Exotic Law</h4>
                <p className="text-white/40 text-[10px] tracking-widest uppercase font-bold mt-1">Voice AI Assistant</p>
              </div>

              <button 
                onClick={play}
                className="w-full py-4 border border-white/20 hover:border-white hover:bg-white text-white hover:text-black transition-all font-bold tracking-[0.2em] text-[11px] uppercase flex items-center justify-center gap-3"
              >
                {isPlaying ? (
                  <>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    PAUSE
                  </>
                ) : (
                  <>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    PLAY
                  </>
                )}
              </button>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
