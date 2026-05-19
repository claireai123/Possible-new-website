"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#ffffff] px-6 pt-[40px] pb-6">
      <div className="mx-auto max-w-[1728px]">
        {/* Headline — Legora-style: two lines, second indented */}
        <h1
          className="font-serif text-[#0a0a0a]"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 180px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "0.92",
            fontFeatureSettings: '"liga" 0',
          }}
        >
          <span style={{ display: "block" }}>Your firm,</span>
          <span style={{ display: "block", textIndent: "18vw" }}>never sleeps.</span>
        </h1>

        {/* Platform visual — matches the original placeholder's 16:8 short-wide frame; image is anchored to the TOP so the dashboard stays fully visible and only the bottom of the photo gets trimmed. */}
        <div className="mt-[80px] relative overflow-hidden rounded-lg bg-[#e8e5de] aspect-[16/8]">
          <img
            src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778767032/ChatGPT_Image_May_14_2026_at_09_54_21_AM.jpg"
            alt="ClaireAI in action — a live AI legal intake call answered in 0.8 seconds, with practice-area qualification and CRM sync on screen."
            className="absolute inset-0 w-full h-full object-cover block"
            style={{ objectPosition: "center top" }}
          />
          <div className="absolute top-6 left-6 z-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/40">Platform</p>
            <p className="mt-1 text-[15px] text-[#0a0a0a]/70">The AI Legal Receptionist</p>
          </div>
        </div>
      </div>
    </section>
  );
}
