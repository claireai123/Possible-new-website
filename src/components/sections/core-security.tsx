import React from "react";

const pillars = [
  {
    title: "Built on enterprise-grade cloud",
    desc: "Runs on Tier-1 cloud infrastructure independently certified to SOC 2 Type II, ISO 27001, and HIPAA standards — with continuous monitoring, access controls, and third-party penetration testing inherited from the stack.",
  },
  {
    title: "Encrypted end-to-end",
    desc: "All traffic moves over TLS 1.3. Recordings, transcripts, and case notes are encrypted at rest with AES-256 before they ever touch disk.",
  },
  {
    title: "Isolated per-firm tenant",
    desc: "Every firm runs in its own encrypted tenant. No cross-firm data sharing, no shared model fine-tuning, and no transcript reuse across accounts.",
  },
  {
    title: "We don't train on your data",
    desc: "Your calls, transcripts, and case notes are never used to train or fine-tune any model — ours, OpenAI's, or anyone else's. Full export and delete on demand.",
  },
];

export function CoreSecurity() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="w-full max-w-[1680px] mx-auto">
      <div className="mb-16 border-b border-[#0a0a0a]/15 pb-6">
        <h2
          className="font-serif text-[#0a0a0a]"
          style={{
            fontSize: "clamp(2.25rem, 4vw, 56px)",
            lineHeight: "1",
            letterSpacing: "-0.01em",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144',
            fontFeatureSettings: '"liga" 0',
          }}
        >
          Core Security
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full border-t border-l border-[#e4e4e7]">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-white p-10 md:p-14 flex flex-col justify-start border-r border-b border-[#e4e4e7] hover:bg-[#fafafa] transition-colors h-full min-h-[500px]"
          >
            <h3
              className="text-[#0a0a0a] mb-8 leading-[1.25]"
              style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              <span className="opacity-40 text-[10px] block mb-3 uppercase tracking-[0.14em] font-medium">
                {String(i + 1).padStart(2, "0")} //
              </span>
              {p.title}
            </h3>
            <p className="text-[#0a0a0a]/60 text-base md:text-lg leading-relaxed font-sans">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
