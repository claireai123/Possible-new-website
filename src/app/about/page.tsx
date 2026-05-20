import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

const DESCRIPTION =
  "ClaireAI was founded in 2024 in Miami to build the first AI receptionist purpose-built for U.S. law firms — not a general-purpose agent retrofitted for legal intake.";

export const metadata: Metadata = {
  title: "About — Built by legal-tech and voice-AI engineers",
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About ClaireAI",
    description: DESCRIPTION,
    url: `${BASE_URL}/about`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "About ClaireAI", description: DESCRIPTION },
};

const TIMELINE: { date: string; title: string; body: string }[] = [
  {
    date: "2024",
    title: "Founded in Miami",
    body: "ClaireAI starts as a single-firm pilot in personal injury, answering after-hours calls for a Florida PI practice. Within 90 days, 38% of after-hours intake converts to signed retainers.",
  },
  {
    date: "2025",
    title: "Practice-area calibration",
    body: "We add criminal defense and family law scripts, then immigration, employment, and estate planning. Conflict screening under Model Rule 1.18 ships in May. By year-end, 200 firms are live.",
  },
  {
    date: "2026 — early",
    title: "Integration platform",
    body: "Native two-way sync ships for Clio, Filevine, MyCase, and PracticePanther — then 62 more systems via the integration platform. No per-sync fees, no Zapier middleman.",
  },
  {
    date: "2026 — today",
    title: "1,000-firm benchmark",
    body: "We publish the 2026 Legal Intake Benchmark covering 1,000 firms and 5,000 inbound calls — the largest dataset on U.S. legal phone intake outside the AmLaw 100.",
  },
];

const VALUES: { title: string; body: string }[] = [
  {
    title: "Built for legal, not retrofitted",
    body: "Every prompt, script, and integration is calibrated for U.S. law firms. We do not sell a horizontal AI receptionist with a legal landing page bolted on.",
  },
  {
    title: "Privilege and ethics are first-class",
    body: "Rule 1.18 conflict screening runs before any matter details are captured. HIPAA BAAs are standard. Audit logs are retained for seven years.",
  },
  {
    title: "Flat pricing, no add-on tax",
    body: "Every integration is included. We do not gate per-sync or charge a per-integration fee. Your bill should not punish you for connecting your CRM.",
  },
  {
    title: "Ship dates beat road-maps",
    body: "Customer-requested features land in days, not quarters. The dashboard, scripts, and routing rules update without a release cycle.",
  },
];

const FOUNDERS: { name: string; role: string; bio: string }[] = [
  {
    name: "Tiago Strammiello",
    role: "Founder & CEO",
    bio: "Tiago leads product and engineering at ClaireAI. Before ClaireAI he built voice and conversational systems used by U.S. small businesses and legal practices.",
  },
  {
    name: "Caleo Tsiapalis",
    role: "Co-Founder & Head of Customer Success",
    bio: "Caleo runs ClaireAI's customer onboarding and writes the runbooks every new firm follows. He has worked alongside more than 200 small and mid-size firms on intake.",
  },
];

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "ClaireAI",
    legalName: "ClaireAI, Inc.",
    url: BASE_URL,
    foundingDate: "2024",
    foundingLocation: { "@type": "Place", name: "Miami, Florida" },
    description:
      "ClaireAI is an AI receptionist purpose-built for U.S. law firms — answering, qualifying, screening for conflicts, and booking matters around the clock.",
    sameAs: [
      "https://www.linkedin.com/company/claireai",
      "https://x.com/claireai",
    ],
    founder: FOUNDERS.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
      description: f.bio,
    })),
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about#aboutpage`,
    url: `${BASE_URL}/about`,
    name: "About ClaireAI",
    description: DESCRIPTION,
    inLanguage: "en-US",
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/about#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
    ],
  };

  return (
    <main className="bg-white text-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─────────── Hero ─────────── */}
      <section className="px-6 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <span className="text-[#0a0a0a]/75">About</span>
          </nav>

          <h1
            className="mt-6 font-serif max-w-[18ch]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 72px)", lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: 500 }}
          >
            We answer the phone for law firms.
          </h1>
          <p className="mt-8 max-w-[62ch] text-[19px] leading-[1.55] text-[#0a0a0a]/75">
            ClaireAI is an AI receptionist purpose-built for U.S. law firms. Every script, every integration, every routing rule was designed for legal intake — not retrofitted from a general-purpose agent. We were founded in Miami in 2024 by a team of voice-AI and legal-tech engineers.
          </p>
        </div>
      </section>

      {/* ─────────── Mission / lead paragraph ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16 grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55">Mission</p>
          <div className="max-w-[68ch]">
            <p className="text-[20px] leading-[1.55] text-[#0a0a0a]/85" style={{ letterSpacing: "-0.005em" }}>
              U.S. law firms miss 35% of their inbound calls. Every missed call is a missed retainer — and at $1,500–$8,000 in average case value, the cost runs into hundreds of thousands of dollars per firm per year. We exist to close that gap with a receptionist that never sleeps, never panics, and knows the difference between a slip-and-fall and a wrongful-death case.
            </p>
            <p className="mt-6 text-[17px] leading-[1.65] text-[#0a0a0a]/70">
              We are not a horizontal AI agent. We are a focused voice product built for one market — the practicing attorney — and we have the calibration, conflict screening, CRM integrations, and HIPAA posture to prove it.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── Timeline ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-10">Timeline</p>
          <ol className="space-y-12">
            {TIMELINE.map((t, i) => (
              <li key={i} className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-mono text-[12px] tracking-wider text-[#0a0a0a]/55">{t.date}</p>
                </div>
                <div className="max-w-[68ch]">
                  <h3
                    className="text-[#0a0a0a]"
                    style={{ fontSize: "22px", lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: 500 }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.65] text-[#0a0a0a]/75">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────── Values ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-10">What we believe</p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="max-w-[44ch]">
                <h3
                  className="text-[#0a0a0a]"
                  style={{ fontSize: "20px", lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: 500 }}
                >
                  {v.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-[#0a0a0a]/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Founders ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-10">Founders</p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="max-w-[44ch]">
                <h3
                  className="text-[#0a0a0a]"
                  style={{ fontSize: "22px", lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: 500 }}
                >
                  {f.name}
                </h3>
                <p className="mt-2 text-[13px] text-[#0a0a0a]/55">{f.role}</p>
                <p className="mt-4 text-[15.5px] leading-[1.65] text-[#0a0a0a]/75">{f.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Stats strip ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-10">By the numbers</p>
          <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {[
              { k: "Firms live", v: "1,000+" },
              { k: "Native integrations", v: "66" },
              { k: "Practice areas calibrated", v: "16" },
              { k: "Average answer speed", v: "0.8s" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/50">{s.k}</dt>
                <dd
                  className="mt-3 font-serif text-[#0a0a0a]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 44px)", lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: 500 }}
                >
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─────────── Final CTA ─────────── */}
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
        <div className="mx-auto max-w-[1680px]">
          <h2
            className="font-serif text-[#0a0a0a] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            See ClaireAI handle a live intake call.
          </h2>
          <p className="mt-6 max-w-[55ch] text-[18px] leading-[1.55] text-[#0a0a0a]/75">
            Book a 20-minute demo. We&apos;ll calibrate the agent to your intake script live, on the call.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded bg-[#0a0a0a] px-5 py-3 text-[14px] font-normal text-white hover:bg-[#0a0a0a]/85"
            >
              Book a demo
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded border border-[#0a0a0a]/20 bg-white/10 px-5 py-3 text-[14px] font-normal text-[#0a0a0a] hover:bg-white/20"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
