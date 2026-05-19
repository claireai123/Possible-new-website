import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { FeatureBoxes } from "@/components/sections/feature-boxes";
import { SocialProof } from "@/components/sections/social-proof";
import { PracticeAreas } from "@/components/sections/practice-areas";
import { AudioDemo } from "@/components/sections/audio-demo";
import { CoreSecurity } from "@/components/sections/core-security";
import { HomeFaq } from "@/components/sections/home-faq";

const logos = [
  { name: "Clio", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854428/6408debf8f29905e63913c85_5b4669b0bc344ee8d46ce80a_clio-logomark-4-2.png" },
  { name: "MyCase", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854431/6408dec5a5cfb4a7395b71ee_62a7d11f5d414a83c151f860_mycase-1650999637-logo.png" },
  { name: "Lawmatics", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854433/6408dec417d27f45a610910f_5cb51e3743310512688df15c_lawmatics-sq.png" },
  { name: "PracticePanther", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854434/6408dec626e7bf014bc33cc5_5b46709c2605270d92f54f21_practice-panther-logomark-4.png" },
  { name: "Salesforce", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854426/64af0428643cdbaa096eab86_Salesforce.com_logo.svg.png" },
  { name: "HubSpot", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854439/6408dec3a5cfb436515b7177_5b466ff95de4cb8a3e25d9de_hubspot-logomark-4.png" },
  { name: "Slack", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854404/6477e8387c4665b59cd9fa35_6438745c487cb0d27bf44527_Slack_icon_2019-2.png" },
  { name: "Microsoft Teams", src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854403/6408dec595246d433dd21165_5f49949fd6e1ac54e531e2e7_microsoft-teams-sq.png" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Logo ticker ── */}
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <section className="overflow-hidden bg-[#ffffff] py-10">
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 40s linear infinite",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className="mx-14 h-12 w-auto shrink-0 opacity-50 grayscale transition-opacity hover:opacity-90"
            />
          ))}
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-white px-6 pt-16 pb-24">
        <div className="mx-auto max-w-[1728px]">
        <div className="ml-auto max-w-3xl text-left">
          <p
            className="font-serif text-[#0a0a0a]"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 28px)",
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
            }}
          >
            80% of callers who reach voicemail hang up without leaving a message.
            They do not try again later. They call the next firm on Google.
          </p>
        </div>
        </div>
      </section>

      {/* ── Audio demo ── */}
      <AudioDemo />

      {/* ── How it works ── */}
      <section className="bg-[#ffffff] px-6 pt-10 pb-[120px]">
        <div className="mx-auto max-w-[1728px]">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#0a0a0a]/40">Smarter intake, better outcomes</p>
          <h2
            className="mt-6 max-w-4xl font-serif text-[#0a0a0a]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 40px)",
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

      <CoreSecurity />

      <SocialProof />

      <HomeFaq />

      {/* ── Final CTA ── */}
      <section
        className="px-6 py-[120px]"
        style={{
          backgroundColor: "#8c9c82",
          backgroundImage: `
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"),
            radial-gradient(120% 90% at 20% 10%, #a9b8a0 0%, #8c9c82 45%, #7a8a72 100%)
          `,
          backgroundSize: "280px 280px, 100% 100%",
          backgroundRepeat: "repeat, no-repeat",
        }}
      >
        <div className="mx-auto max-w-[1728px]">
          <h2
            className="font-serif text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.75rem,6vw,84px)",
              letterSpacing: "-0.025em",
              lineHeight: "0.95",
              fontFeatureSettings: '"liga" 0',
            }}
          >
            The future of legal intake<br />
            is already here.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Discover how Claire can put time back in your hands for what matters most.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-9 py-5 text-[17px] font-normal text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
