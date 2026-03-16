"use client";

import { useState, useRef, useEffect } from "react";

const transcript = [
  { speaker: "Claire", text: "Good evening, thank you for calling Martinez & Associates. This is Claire, how can I help you?" },
  { speaker: "Caller", text: "Hi, I was in a car accident yesterday and I need to speak with a lawyer." },
  { speaker: "Claire", text: "I'm sorry to hear that. I can help you right away. Were you the driver, passenger, or pedestrian?" },
  { speaker: "Caller", text: "I was the driver. Someone rear-ended me at a red light." },
  { speaker: "Claire", text: "Was a police report filed at the scene?" },
  { speaker: "Caller", text: "Yes, the officer gave me a report number." },
  { speaker: "Claire", text: "Good. Were you injured? Have you received any medical treatment?" },
  { speaker: "Caller", text: "I went to the ER last night for my neck and back." },
  { speaker: "Claire", text: "I understand. Based on what you've described, you may have a strong case. I'd like to schedule a free consultation with one of our attorneys. I have availability tomorrow at 10 AM — does that work?" },
  { speaker: "Caller", text: "That works, yes." },
  { speaker: "Claire", text: "Perfect. I'll also send you a retainer agreement by email and text so you can review it before the meeting. Can I confirm your name and email address?" },
];

export function HearClaire() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleLines, setVisibleLines] = useState(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying && visibleLines < transcript.length) {
      intervalRef.current = setInterval(() => {
        setVisibleLines((v) => {
          if (v >= transcript.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsPlaying(false);
            return v;
          }
          return v + 1;
        });
      }, 2800);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, visibleLines]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const handlePlay = () => {
    if (visibleLines >= transcript.length) {
      setVisibleLines(3);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="bg-[#fefefc] px-[5vw] py-[10vh]">
      <div className="mx-auto max-w-[90vw]">
        <div className="overflow-hidden rounded-[24px] bg-[#0a0a0a]">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">

            {/* Left — Player */}
            <div className="flex flex-col justify-between p-[3vw]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
                  Live Demo
                </p>
                <h2
                  className="mt-5 font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-normal text-white"
                  style={{ letterSpacing: "-0.035em", lineHeight: "1.1" }}
                >
                  Hear Claire handle<br />a PI intake call.
                </h2>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/35">
                  Real conversation. Every qualifying question asked. Consultation booked and retainer sent — in under two minutes.
                </p>
              </div>

              <div className="mt-[3vh] flex items-center gap-[1.2vw]">
                {/* Play button */}
                <button
                  onClick={handlePlay}
                  className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#c4913c] transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                      <rect x="3" y="2" width="4" height="12" rx="1" />
                      <rect x="9" y="2" width="4" height="12" rx="1" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white" className="ml-0.5">
                      <path d="M4 2L14 8L4 14V2Z" />
                    </svg>
                  )}
                </button>

                {/* Waveform */}
                <div className="flex items-center gap-[3px]">
                  {[18,24,14,28,20,32,16,26,22,30,12,28,18,24,20,32,14,26,22,28,16,30,20,24,18,32,14,28,22,26,18,24].map((h, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full bg-white/20"
                      style={{
                        height: `${h}px`,
                        opacity: isPlaying ? 0.5 : 0.15,
                        animation: isPlaying
                          ? `waveform ${0.4 + (i % 5) * 0.12}s ease-in-out infinite alternate`
                          : "none",
                        animationDelay: `${i * 0.03}s`,
                      }}
                    />
                  ))}
                </div>

                <span className="ml-auto text-[13px] tabular-nums text-white/25">
                  1:47
                </span>
              </div>
            </div>

            {/* Right — Transcript */}
            <div className="border-t border-white/5 bg-white/[0.03] lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between border-b border-white/5 px-[2vw] py-[1vh]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/20">
                  Live Transcript
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute h-full w-full rounded-full bg-[#c4913c] ${isPlaying ? "animate-ping" : ""} opacity-50`} />
                    <span className="relative h-2 w-2 rounded-full bg-[#c4913c]" />
                  </span>
                  <span className="text-[10px] text-white/20">{isPlaying ? "Playing" : "Ready"}</span>
                </div>
              </div>

              <div
                ref={transcriptRef}
                className="h-[380px] space-y-[1.2vh] overflow-y-auto px-[2vw] py-[2vh]"
                style={{ scrollBehavior: "smooth" }}
              >
                {transcript.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    className="transition-opacity duration-500"
                    style={{ opacity: i >= visibleLines - 1 && isPlaying ? 0.9 : 1 }}
                  >
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${
                      line.speaker === "Claire" ? "text-[#c4913c]/60" : "text-white/25"
                    }`}>
                      {line.speaker}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">
                      {line.text}
                    </p>
                  </div>
                ))}

                {isPlaying && visibleLines < transcript.length && (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c4913c]/60" />
                    <span className="text-[11px] italic text-white/15">Claire is speaking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
