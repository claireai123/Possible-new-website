"use client";

export function Hero() {
  return (
    <section className="bg-[#fefefc] px-[5vw] pt-[15vh] pb-[3vh]">
      <div className="mx-auto max-w-[90vw]">
        {/* Headline — left-aligned, no indent gimmick */}
        <h1
          className="max-w-4xl font-serif text-[clamp(3rem,8vw,7.5rem)] font-normal text-[#0a0a0a]"
          style={{ letterSpacing: "-0.035em", lineHeight: "0.95" }}
        >
          Your firm never sleeps.
        </h1>
        <p className="mt-[2vh] max-w-lg text-[17px] leading-relaxed text-[#0a0a0a]/50">
          AI legal receptionist that answers every call in 0.8 seconds,
          qualifies the lead, and books the consultation — in English or Spanish, 24/7.
        </p>

        {/* Video placeholder */}
        <div className="mt-[6vh] overflow-hidden rounded-[20px] bg-[#e8e5de]">
          <div className="relative flex aspect-[16/8] items-center justify-center">
            {/* Play button */}
            <button className="group relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#0a0a0a] transition-transform hover:scale-105">
              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            {/* Subtitle under play */}
            <div className="absolute bottom-8 left-8">
              <p className="text-[13px] font-medium text-[#0a0a0a]/40">Watch Claire handle a live intake call</p>
            </div>
            <div className="absolute bottom-8 right-8">
              <p className="text-[13px] text-[#0a0a0a]/30">1:28</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
