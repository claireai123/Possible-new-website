import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { FeatureBoxes } from "@/components/sections/feature-boxes";
import { HearClaire } from "@/components/sections/hear-claire";
import { SocialProof } from "@/components/sections/social-proof";
import { PracticeAreas } from "@/components/sections/practice-areas";
import { TechStack } from "@/components/sections/tech-stack";

const logos = ["Clio", "Filevine", "MyCase", "Lawmatics", "PracticePanther", "Salesforce", "HubSpot"];

export default function Home() {
  return (
    <>
      {/* Banner — not fixed, scrolls away naturally like Legora */}
      <div style={{ paddingTop: 48 }}>
        <a
          href="/legal-intake-report"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "16px 24px",
            backgroundColor: "#1b4332",
            color: "white",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <span>2026 Legal Intake Report</span>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>Read more →</span>
        </a>
      </div>
      
      <Hero />

      {/* ── Logo ticker ── */}
      <section className="border-y border-[#e4e4e7] bg-[#fefefc] px-6 py-[80px]">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
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
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-col items-end text-right">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[1200px]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 72px)",
                letterSpacing: "-0.03em",
                fontFeatureSettings: '"liga" 0',
                lineHeight: "1.05",
              }}
            >
              How does ClaireAI turn<br />
              missed calls into signed retainers?
            </h2>
            <p className="mt-6 max-w-[480px] text-[16px] text-[#0a0a0a]/50">
              ClaireAI streamlines everything from intake to retainer signing — helping lawyers spend less time managing calls, and more time delivering value.
            </p>
          </div>

          <div className="mt-[80px]">
            <FeatureBoxes />
          </div>
        </div>
      </section>

      <PracticeAreas />

      <SocialProof />
      
      <TechStack />

    </>
  );
}
