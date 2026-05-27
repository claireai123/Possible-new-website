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
            fontSize: "clamp(2.5rem, 11vw, 180px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "0.92",
            fontFeatureSettings: '"liga" 0',
          }}
        >
          <span style={{ display: "block" }}>Your firm,</span>
          <span style={{ display: "block", textIndent: "clamp(0px, 18vw, 200px)" }}>never sleeps.</span>
        </h1>

        {/* Platform visual — label sits ABOVE the image (not overlaid) so it never collides with the tablet regardless of viewport. Container matches the image's natural 1706:922 ratio so the full tablet mockup renders without cropping. */}
        <div className="mt-[80px]">
          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/40">Platform</p>
            <p className="mt-1 text-[15px] text-[#0a0a0a]/70">ClaireAI 365</p>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-[#e8e5de] aspect-[1706/922]">
            <img
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779890062/ChatGPT_Image_May_27_2026_at_09_54_08_AM.jpg"
              alt="ClaireAI 365 dashboard — lead velocity over the last 7 days, critical pipeline of high-priority intake calls, active-now status, and a CRM-synced call log with lead scores."
              className="absolute inset-0 w-full h-full object-cover block"
              style={{ objectPosition: "center center" }}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
