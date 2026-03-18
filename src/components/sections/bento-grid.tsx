"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MockCRM } from "./mock-crm";

const blurFade = {
  hidden: { y: 8, opacity: 0, filter: "blur(6px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={blurFade}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const capabilities = [
  { name: "Intake", desc: "Autonomous client capture.", color: "bg-[#c9c3b6]/40" },
  { name: "Qualify", desc: "Every detail confirmed.", color: "bg-[#c4c6d1]/40" },
  { name: "Book", desc: "Consultations, hands-free.", color: "bg-[#bec8bc]/40" },
  { name: "Retainer", desc: "Sent before morning.", color: "bg-[#d4cec2]/40" },
];

export function BentoGrid() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Section 1: Platform + capabilities
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-[#e4e4e7] bg-[#f5f4f1] px-6 pt-6 pb-[120px]">
        <div className="mx-auto w-full max-w-[1728px]">
          <FadeIn>
            <div className="grid items-center gap-[80px] lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-3">
                {capabilities.map((cap, i) => (
                  <FadeIn key={cap.name} delay={0.05 * i}>
                    <div className={`flex items-center justify-between rounded-lg ${cap.color} px-8 py-6`}>
                      <span
                        className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#0a0a0a]/80"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {cap.name}
                      </span>
                      <span className="text-[13px] text-[#0a0a0a]/35">{cap.desc}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <div className="flex flex-col justify-center gap-[80px]">
                <div>
                  <p className="text-[11px] font-normal uppercase tracking-[0.01em] text-[#0a0a0a]/25">
                    The Platform
                  </p>
                  <h2
                    className="mt-6 font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-normal text-[#0a0a0a]"
                    style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
                  >
                    One receptionist.<br />
                    <span className="font-normal">Every capability.</span>
                  </h2>
                  <p className="mt-6 max-w-lg text-[13px] leading-[1.3] text-[#0a0a0a]/40">
                    ClaireAI works where your firm works. From first ring to signed retainer,
                    fully autonomous.
                  </p>
                  <Link
                    href="/product"
                    className="mt-6 inline-flex items-center gap-2 text-[16px] font-normal text-[#0a0a0a] hover:text-[#c4913c]"
                  >
                    Explore platform
                    <span className="text-[15px]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Section 2: Integrations — Interactive CRM
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 pt-6 pb-[120px]">
        <div className="mx-auto w-full max-w-[1728px]">
          <FadeIn>
            <div className="grid items-center gap-[80px] lg:grid-cols-[1fr_1.8fr]">
              <div className="order-2 flex flex-col justify-center lg:order-1">
                <p className="text-[11px] font-normal uppercase tracking-[0.01em] text-[#0a0a0a]/25">
                  Integrations
                </p>
                <h2
                  className="mt-6 font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-normal text-[#0a0a0a]"
                  style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
                >
                  Your CRM.<br />
                  <span className="font-normal">Already connected.</span>
                </h2>
                <p className="mt-6 max-w-lg text-[13px] leading-[1.3] text-[#0a0a0a]/40">
                  New contacts, matters, and calendar entries created automatically.
                  No copy-paste. No data entry.
                </p>
                <Link
                  href="/integrations"
                  className="mt-6 inline-flex items-center gap-2 text-[16px] font-normal text-[#0a0a0a] hover:text-[#c4913c]"
                >
                  View integrations
                  <span className="text-[15px]">→</span>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-lg bg-[#e8e6e1] p-6">
                  <MockCRM />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Section 3: Retainer Automation
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-[#e4e4e7] bg-[#f5f4f1] px-6 pt-6 pb-[120px]">
        <div className="mx-auto w-full max-w-[1728px]">
          <FadeIn>
            <div className="grid items-center gap-[80px] lg:grid-cols-[1.8fr_1fr]">
              {/* Left: photo placeholder */}
              <div>
                <div
                  className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[#0a0a0a]/10 bg-white/50"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a]/5">
                      <svg className="h-5 w-5 text-[#0a0a0a]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <p className="text-[13px] font-normal text-[#0a0a0a]/25">Retainer preview</p>
                    <p className="mt-1 text-[11px] text-[#0a0a0a]/15">Photo coming soon</p>
                  </div>
                </div>
              </div>

              {/* Right: copy */}
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-normal uppercase tracking-[0.01em] text-[#0a0a0a]/25">
                  Retainer Automation
                </p>
                <h2
                  className="mt-6 font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-normal text-[#0a0a0a]"
                  style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
                >
                  Signed before<br />
                  <span className="font-normal">morning.</span>
                </h2>
                <p className="mt-6 max-w-lg text-[13px] leading-[1.3] text-[#0a0a0a]/40">
                  Claire checks the statute of limitations, sends the retainer via DocuSign or PandaDoc,
                  and follows up — all while your attorneys sleep. Cases signed before the first coffee.
                </p>
                <Link
                  href="/product/retainer-automation"
                  className="mt-6 inline-flex items-center gap-2 text-[16px] font-normal text-[#0a0a0a] hover:text-[#c4913c]"
                >
                  See how it works
                  <span className="text-[15px]">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Section 4: Practice Areas — Legora-style
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-[120px]">
        <div className="mx-auto w-full max-w-[1728px]">
          <FadeIn>
            {/* Top: subtitle left + headline right */}
            <div className="grid items-end gap-[80px] lg:grid-cols-[1fr_2fr]">
              <p className="max-w-xs text-[13px] leading-[1.3] text-[#0a0a0a]/40">
                The AI receptionist built for how law firms actually work. Claire adapts to your
                practice area, your intake flow, your language.
              </p>
              <h2
                className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-normal text-[#0a0a0a]"
                style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
              >
                Claire meets your firm<br />
                where you are.
              </h2>
            </div>

            {/* Divider */}
            <div className="mt-10 border-t border-[#0a0a0a]/10" />

            {/* 4-column practice area grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  area: "Personal Injury",
                  desc: "Capture every lead at first ring — qualify police reports, treatment status, and fault in seconds.",
                  gradient: "from-[#d4c5a0] to-[#b8a88a]",
                },
                {
                  area: "Criminal Defense",
                  desc: "Route urgent felony and DUI calls 24/7 with instant attorney escalation, day or night.",
                  gradient: "from-[#8a7e6b] to-[#6b6254]",
                },
                {
                  area: "Family Law",
                  desc: "Sensitive intake in English or Spanish — custody, divorce, and protective orders handled with care.",
                  gradient: "from-[#a69882] to-[#8a7d6a]",
                },
                {
                  area: "Immigration",
                  desc: "10+ languages supported. Visa deadlines tracked. Consultations booked across every time zone.",
                  gradient: "from-[#c4b8a0] to-[#a89c84]",
                },
              ].map((item, i) => (
                <FadeIn key={item.area} delay={0.08 * i}>
                  <div className="group cursor-pointer">
                    {/* Tall image placeholder */}
                    <div
                      className={`aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-[0.98]`}
                    >
                      <div className="flex h-full items-end p-6">
                        <span className="text-[13px] font-normal text-white/40">
                          {item.area}
                        </span>
                      </div>
                    </div>
                    {/* Label + description */}
                    <h3 className="mt-4 text-[15px] font-normal text-[#0a0a0a]" style={{ lineHeight: "19.5px" }}>
                      {item.area}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.3] text-[#0a0a0a]/40">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </>
  );
}
