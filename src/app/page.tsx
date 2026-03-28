import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { FeatureBoxes } from "@/components/sections/feature-boxes";
import { HearClaire } from "@/components/sections/hear-claire";
import { SocialProof } from "@/components/sections/social-proof";
import { PracticeAreas } from "@/components/sections/practice-areas";

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

      {/* ── How it works ── */}
      <section className="bg-[#fefefc] px-6 py-[120px]">
        <div className="mx-auto max-w-[1728px]">
          <h2
            className="max-w-4xl font-serif text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              letterSpacing: "-0.02em",
              fontFeatureSettings: '"liga" 0',
              lineHeight: "0.95",
            }}
          >
            How does ClaireAI turn<br />
            missed calls into signed retainers?
          </h2>
          <p className="mt-6 max-w-3xl text-[18px] leading-[1.5] text-[#0a0a0a]/50">
            ClaireAI streamlines everything from intake to retainer signing — helping lawyers spend less time managing calls, and more time delivering value.
          </p>

          <div className="mt-[80px]">
            <FeatureBoxes />
          </div>
        </div>
      </section>

      <PracticeAreas />

      <SocialProof />

      {/* ── Final CTA ── */}
      <section className="bg-[#f5f4f1] px-6 py-[120px]">
        <div className="mx-auto max-w-[1728px]">
          <h2
            className="font-serif text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.8rem,5.5vw,64px)",
              letterSpacing: "-0.02em",
              lineHeight: "0.95",
              fontFeatureSettings: '"liga" 0',
            }}
          >
            The future of legal intake<br />
            is already here.
          </h2>
          <div className="mt-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md text-[16px] leading-[1.55] text-[#0a0a0a]/40">
              Discover how Claire can put time back in your hands for what matters most.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-6 py-3.5 text-[15px] font-normal text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
