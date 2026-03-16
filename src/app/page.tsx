import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { LiveDemo } from "@/components/sections/live-demo";
import { FeatureBoxes } from "@/components/sections/feature-boxes";
import { BentoGrid } from "@/components/sections/bento-grid";
import { HearClaire } from "@/components/sections/hear-claire";

const logos = ["Clio", "Filevine", "MyCase", "Lawmatics", "PracticePanther", "Salesforce", "HubSpot"];

const steps = [
  { num: "01", title: "Claire answers", desc: "First ring. Every time. English or Spanish, 24/7/365." },
  { num: "02", title: "Claire qualifies", desc: "Police report filed? Not at fault? Medical treatment? Claire confirms every qualifying detail." },
  { num: "03", title: "Claire sends retainers", desc: "Statute of limitations checked. Consultation booked. Retainer emailed. Case signed before morning." },
];

const areas = [
  { name: "Personal Injury", stat: "$1.2M", label: "monthly case value captured", href: "/solutions/personal-injury" },
  { name: "Criminal Defense", stat: "24/7", label: "urgent felony case routing", href: "/solutions/criminal-defense" },
  { name: "Family Law", stat: "42%", label: "of leads speak Spanish", href: "/solutions/family-law" },
  { name: "Immigration Law", stat: "10+", label: "languages supported", href: "/solutions/immigration-law" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Logo ticker ── */}
      <section className="border-y border-[#e4e4e7] bg-[#fefefc] py-[4vh]">
        <div className="mx-auto max-w-[90vw] px-[5vw]">
          <div className="flex flex-wrap items-center justify-center gap-x-[3.5vw] gap-y-[1vh]">
            {logos.map((name) => (
              <span key={name} className="text-[13px] font-medium text-[#0a0a0a]/25 transition-colors hover:text-[#0a0a0a]/50">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HearClaire />

      {/* ── How it works ── */}
      <section className="bg-[#fefefc] py-[10vh]">
        <div className="mx-auto max-w-[90vw] px-[5vw]">
          <h2
            className="max-w-3xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal text-[#0a0a0a]"
            style={{ letterSpacing: "-0.04em", lineHeight: "1.05" }}
          >
            From missed call<br />
            to signed retainer.
          </h2>

          <div className="mt-[6vh]">
            <FeatureBoxes />
          </div>
        </div>
      </section>

      <BentoGrid />

      {/* ── Testimonial ── */}
      <section className="bg-[#f7f3ed] py-[10vh]">
        <div className="mx-auto max-w-[90vw] px-[5vw] text-center">
          <p
            className="font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal leading-snug text-[#0a0a0a]"
            style={{ letterSpacing: "-0.03em" }}
          >
            &ldquo;ClaireAI captured 312 consultations we would have missed.
            $1.2 million in new case value in a single month. The ROI isn&rsquo;t even close.&rdquo;
          </p>
          <div className="mt-[2.5vh]">
            <p className="text-[14px] font-medium text-[#0a0a0a]">Managing Partner</p>
            <p className="text-[13px] text-[#0a0a0a]/40">15-attorney PI firm, Miami</p>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="border-t border-[#e4e4e7] bg-[#fefefc] py-[10vh]">
        <div className="mx-auto max-w-[90vw] px-[5vw] text-center">
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal text-[#0a0a0a]"
            style={{ letterSpacing: "-0.04em", lineHeight: "1.05" }}
          >
            Starts at $650/mo.
          </h2>
          <p className="mt-[1.5vh] text-[16px] text-[#0a0a0a]/50">
            No hidden fees. No per-minute billing. Cancel anytime.
          </p>
          <Link
            href="/pricing"
            className="mt-[2vh] inline-block rounded-full bg-[#c4913c] px-[2vw] py-[1vh] text-[13px] font-medium text-white transition-colors hover:bg-[#b07e2f]"
          >
            View plans
          </Link>
        </div>
      </section>

      {/* ── Compliance ── */}
      <section className="border-t border-[#e4e4e7] bg-[#fefefc] py-[4vh]">
        <div className="flex flex-wrap items-center justify-center gap-x-[3.5vw] gap-y-[0.8vh] px-[5vw]">
          {["SOC 2 Type II", "HIPAA Compliant", "256-bit Encryption", "99.9% Uptime"].map((b) => (
            <span key={b} className="text-[12px] font-medium text-[#0a0a0a]/20">{b}</span>
          ))}
        </div>
      </section>

      {/* ── Final CTA — dark section ── */}
      <section className="bg-[#0a0a0a] py-[10vh]">
        <div className="mx-auto max-w-[90vw] px-[5vw] text-center">
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal text-white"
            style={{ letterSpacing: "-0.04em", lineHeight: "1.05" }}
          >
            Stop losing leads<br />to voicemail.
          </h2>
          <p className="mt-[1.5vh] text-[16px] text-white/50">
            Every missed call is a missed case.
          </p>
          <div className="mt-[2.5vh] flex flex-wrap items-center justify-center gap-[1vw]">
            <Link href="/contact" className="rounded-full bg-white px-[2vw] py-[1vh] text-[13px] font-medium text-[#0a0a0a] transition hover:bg-white/90">
              Book a demo
            </Link>
            <Link href="/case-studies" className="rounded-full border border-white/20 px-[2vw] py-[1vh] text-[13px] font-medium text-white transition hover:bg-white/10">
              Read case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
