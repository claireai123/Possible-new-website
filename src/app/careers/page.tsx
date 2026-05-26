import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

const DESCRIPTION =
  "Join ClaireAI — we're hiring across engineering, product, and customer success to build the AI receptionist for U.S. law firms.";

export const metadata: Metadata = {
  title: "Careers — Build the AI receptionist for law firms",
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/careers` },
  openGraph: {
    title: "Careers at ClaireAI",
    description: DESCRIPTION,
    url: `${BASE_URL}/careers`,
    type: "website",
  },
};

const ROLES = [
  { team: "Engineering", title: "Senior Backend Engineer — Voice Infrastructure", location: "Miami / Remote-US" },
  { team: "Engineering", title: "Founding ML Engineer — Conversational Quality", location: "Miami / Remote-US" },
  { team: "Product", title: "Product Manager — Practice Areas", location: "Miami / Remote-US" },
  { team: "Customer Success", title: "Implementation Manager — Personal Injury", location: "Miami / Remote-US" },
];

export default function CareersPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/careers#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${BASE_URL}/careers` },
    ],
  };

  return (
    <main className="bg-[#fbfbf9] text-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="px-6 pt-[88px] pb-12">
        <div className="mx-auto max-w-[1728px]">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#0a0a0a]/40">Careers</p>
          <h1
            className="mt-8 text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 144px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "0.95",
            }}
          >
            <span style={{ display: "block" }}>Build the future</span>
            <span style={{ display: "block", textIndent: "clamp(0px, 14vw, 200px)" }}>of legal intake.</span>
          </h1>
        </div>
      </section>

      {/* Mission paragraph */}
      <section className="px-6 py-[120px] border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1728px]">
          <div className="max-w-[68ch] space-y-8">
            <p className="text-[#0a0a0a]" style={{ fontSize: "clamp(20px, 2vw, 24px)", lineHeight: "1.45", letterSpacing: "-0.005em", fontWeight: 400 }}>
              ClaireAI is a small team building one specific thing: the receptionist that answers the first call to a U.S. law firm. We&apos;re hiring people who would rather ship one calibrated product than maintain ten generic ones.
            </p>
            <p className="text-[#0a0a0a]/85" style={{ fontSize: "17px", lineHeight: "1.6", fontWeight: 400 }}>
              We&apos;re headquartered in Miami, with remote roles open across the United States. Every role works directly with attorneys: real intake calls, real conflict-screening edge cases, real Rule 1.18 conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-[#f1f0eb] px-6 py-[120px]">
        <div className="mx-auto max-w-[1728px]">
          <h2 className="text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 4vw, 56px)", lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: 500 }}>
            Open roles
          </h2>
          <div className="mt-16 divide-y divide-[#0a0a0a]/[0.1]">
            {ROLES.map((r) => (
              <div key={r.title} className="flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between md:gap-12">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/45">{r.team}</p>
                  <p className="mt-2 text-[#0a0a0a]" style={{ fontSize: "clamp(20px, 2vw, 26px)", letterSpacing: "-0.02em", fontWeight: 500 }}>
                    {r.title}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-[14px] text-[#0a0a0a]/55">{r.location}</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-normal text-white hover:bg-[#0a0a0a]/85">
                    Apply
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General application */}
      <section className="px-6 py-[120px]" style={{ backgroundColor: "#00301e" }}>
        <div className="mx-auto max-w-[1728px]">
          <h2 className="text-white max-w-[24ch]" style={{ fontSize: "clamp(2rem, 4vw, 56px)", lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: 500 }}>
            Don&apos;t see your role? We still want to talk.
          </h2>
          <p className="mt-6 max-w-[55ch] text-[17px] leading-[1.55] text-white/75">
            If you&apos;re excited about building for the practice of law and your skill set isn&apos;t in the list above, send us a note. Best emails are short and specific.
          </p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-normal text-[#00301e] hover:bg-[#edfedc]">
              Get in touch
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
