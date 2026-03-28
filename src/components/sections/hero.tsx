"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#fefefc] px-6 pt-[40px] pb-6">
      <div className="mx-auto max-w-[1728px]">
        {/* Headline — Legora-style: two lines, second indented */}
        <h1
          className="font-serif text-[#0a0a0a]"
          style={{
            fontSize: "clamp(5rem, 21vw, 280px)",
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: "0.85",
            transform: "scaleY(0.9)",
            transformOrigin: "top left",
          }}
        >
          <span style={{ display: "block" }}>Your <span style={{ letterSpacing: "0.01em" }}>f</span>irm,</span>
          <span style={{ display: "block", textIndent: "22vw" }}>never sleeps.</span>
        </h1>

        {/* Video placeholder */}
        <div className="mt-[80px] overflow-hidden rounded-lg bg-[#e8e5de]">
          <div className="relative flex aspect-[16/8] items-center justify-center">
            <div className="absolute top-6 left-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/30">Platform</p>
              <p className="mt-1 text-[15px] text-[#0a0a0a]/50">The AI Legal Receptionist</p>
            </div>
            {/* Play button */}
            <button className="group relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#0a0a0a] transition-transform hover:scale-105">
              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="absolute bottom-6 left-6">
              <p className="text-[13px] font-normal text-[#0a0a0a]/40">Watch Claire handle a live intake call</p>
            </div>
            <div className="absolute bottom-6 right-6">
              <p className="text-[13px] text-[#0a0a0a]/30">1:28</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
