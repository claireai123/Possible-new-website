"use client";

export function Hero() {
  return (
    <section className="bg-[#fefefc] px-6 pt-[120px] pb-6">
      <div className="mx-auto max-w-[1728px]">
        {/* Headline */}
        <h1
          className="font-serif text-[clamp(4rem,10vw,148px)] font-normal text-[#0a0a0a]"
          style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
        >
          Your firm never sleeps.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-[1.3] text-[#0a0a0a]/50">
          ClaireAI is an AI-powered legal receptionist that answers every law firm call in 0.8 seconds.
          It qualifies leads, books consultations, and sends retainer agreements — in English or Spanish, 24/7/365.
          Plans start at $650/month with no per-minute billing.
        </p>

        {/* Video placeholder */}
        <div className="mt-[80px] overflow-hidden rounded-lg bg-[#e8e5de]">
          <div className="relative flex aspect-[16/8] items-center justify-center">
            {/* Play button */}
            <button className="group relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#0a0a0a] transition-transform hover:scale-105">
              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            {/* Subtitle under play */}
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
