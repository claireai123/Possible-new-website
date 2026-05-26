import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

const DESCRIPTION =
  "ClaireAI ships with intake scripts pre-calibrated for personal injury, criminal defense, and family law — plus Rule 1.18 conflict screening and native CRM integration for each.";

export const metadata: Metadata = {
  title: "Solutions — AI receptionist calibrated by practice area",
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/solutions` },
  openGraph: {
    title: "ClaireAI Solutions — Calibrated by practice area",
    description: DESCRIPTION,
    url: `${BASE_URL}/solutions`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "ClaireAI Solutions", description: DESCRIPTION },
};

type SolutionCard = {
  slug: string;
  area: string;
  lead: string;
  bullets: string[];
};

const SOLUTIONS: SolutionCard[] = [
  {
    slug: "personal-injury",
    area: "Personal Injury",
    lead:
      "Qualify a PI lead in under two minutes. Mechanism of injury, every insurance layer (PIP, BI, UIM/UM, MedPay), police report, prior counsel, conflict screen — captured before the caller hangs up.",
    bullets: [
      "Statute-of-limitations triage by jurisdiction",
      "Bilingual intake, accident-hour pickup",
      "Native Filevine, CASEpeer, Litify, Clio sync",
    ],
  },
  {
    slug: "criminal-defense",
    area: "Criminal Defense",
    lead:
      "24/7 urgent-case capture. Arraignment and bail-hearing deadlines tracked by jurisdiction. Collect calls from detention accepted. Charge and bond captured before any case fact is taken.",
    bullets: [
      "Detention-facility collect-call intake",
      "Rule 1.18 conflict screen across co-defendants",
      "On-call partner paged before the call window closes",
    ],
  },
  {
    slug: "family-law",
    area: "Family Law",
    lead:
      "Sensitive intake calibrated for divorce, custody, and emergency relief. First-phrase DV detection. PFA, TPO, and emergency-custody filings flagged in the brief. Conflict screen covers prior counsel and paramours.",
    bullets: [
      "Empathetic tone calibrated for distressed callers",
      "DV and emergency-signal escalation",
      "Bilingual, after-hours pickup at parity with business hours",
    ],
  },
];

export default function SolutionsIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/solutions#collection`,
    url: `${BASE_URL}/solutions`,
    name: "ClaireAI Solutions",
    description: DESCRIPTION,
    inLanguage: "en-US",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SOLUTIONS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/solutions/${s.slug}`,
        name: s.area,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/solutions#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${BASE_URL}/solutions` },
    ],
  };

  return (
    <main className="bg-white text-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─────────── Hero ─────────── */}
      <section className="px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <span className="text-[#0a0a0a]/75">Solutions</span>
          </nav>
          <h1
            className="mt-6 max-w-[26ch] text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2rem, 4.2vw, 48px)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            One receptionist. Calibrated for every practice area you run.
          </h1>
          <p className="mt-8 max-w-[60ch] text-[18px] leading-[1.55] text-[#0a0a0a]/70">
            ClaireAI ships with intake scripts pre-calibrated for the three practice areas that drive 80% of U.S. legal intake volume. Each script enforces Rule 1.18 conflict screening before a single matter detail is captured, and writes the qualified call back to your CRM in 2–4 seconds.
          </p>
        </div>
      </section>

      {/* ─────────── Solutions list ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16 space-y-20">
          {SOLUTIONS.map((s) => (
            <article key={s.slug} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">{s.area}</p>
                <h2
                  className="mt-4 max-w-[14ch] text-[#0a0a0a]"
                  style={{
                    fontSize: "clamp(26px, 2.6vw, 32px)",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    fontWeight: 400,
                  }}
                >
                  Built for {s.area.toLowerCase()}.
                </h2>
              </div>
              <div className="max-w-[58ch]">
                <p
                  className="text-[#0a0a0a]"
                  style={{ fontSize: "18px", lineHeight: "1.55", fontWeight: 400 }}
                >
                  {s.lead}
                </p>
                <ul className="mt-6 list-disc pl-5 space-y-2 text-[15.5px] leading-[1.55] text-[#0a0a0a]/75 marker:text-[#0a0a0a]/35">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="inline-flex items-center gap-2 text-[14px] text-[#0a0a0a] underline underline-offset-4 decoration-[#0a0a0a]/30 hover:decoration-[#0a0a0a]"
                  >
                    See the {s.area.toLowerCase()} build
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section
        className="px-6 py-20 md:py-[120px]"
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
        <div className="mx-auto max-w-[1680px]">
          <h2
            className="text-[#0a0a0a] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Don&apos;t see your practice area?
          </h2>
          <p className="mt-6 max-w-[55ch] text-[18px] leading-[1.55] text-[#0a0a0a]/75">
            We calibrate to immigration, employment, estate planning, and 12 other practice areas on request. Tell us your intake script — we&apos;ll match it.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded bg-[#0a0a0a] px-5 py-3 text-[14px] font-normal text-white hover:bg-[#0a0a0a]/85"
            >
              Book a calibration call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
