import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { LiveDemo } from "@/components/sections/live-demo";
import { FeatureBoxes } from "@/components/sections/feature-boxes";
import { BentoGrid } from "@/components/sections/bento-grid";
import { HearClaire } from "@/components/sections/hear-claire";

const logos = ["Clio", "Filevine", "MyCase", "Lawmatics", "PracticePanther", "Salesforce", "HubSpot"];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Logo ticker ── */}
      <section className="border-y border-[#e4e4e7] bg-[#fefefc] px-6 py-10">
        <div className="mx-auto max-w-[1728px]">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {logos.map((name) => (
              <span key={name} className="text-[13px] font-normal text-[#0a0a0a]/25 transition-colors hover:text-[#0a0a0a]/50">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HearClaire />

      {/* ── How it works — GEO: question heading + citable answer block ── */}
      <section className="bg-[#fefefc] px-6 py-[120px]">
        <div className="mx-auto max-w-[1728px]">
          <h2
            className="max-w-3xl font-serif text-[clamp(2.5rem,5vw,64px)] font-normal text-[#0a0a0a]"
            style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
          >
            How does ClaireAI turn<br />
            missed calls into signed retainers?
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.3] text-[#0a0a0a]/40">
            ClaireAI is an AI legal receptionist that answers every law firm call in 0.8 seconds — on the first ring, 24 hours a day, 365 days a year. It qualifies the lead by confirming police reports, fault, and medical treatment status. Then it books a consultation, checks the statute of limitations, and sends a retainer agreement via DocuSign or PandaDoc — all before the attorney wakes up. In a 2026 study of 1,000 law firms, 41% of personal injury practices reported missing after-hours calls entirely, representing an estimated $44 billion in industry-wide lost revenue.
          </p>

          <div className="mt-[80px]">
            <FeatureBoxes />
          </div>
        </div>
      </section>

      <BentoGrid />

      {/* ── Final CTA — Legora style ── */}
      <section className="bg-[#f5f4f1] px-6 py-[120px]">
        <div className="mx-auto max-w-[1728px]">
          <div className="flex flex-col gap-[80px] lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2
                className="font-serif text-[clamp(2.8rem,5.5vw,64px)] font-normal text-[#0a0a0a]"
                style={{ letterSpacing: "-0.02em", lineHeight: "0.95" }}
              >
                The future of legal intake<br />
                is already here.
              </h2>
              <p className="mt-6 max-w-md text-[13px] leading-[1.3] text-[#0a0a0a]/40">
                Discover how Claire can put time back in your hands for what matters most.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-4 py-2.5 text-[16px] font-normal text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
