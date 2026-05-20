import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

const DESCRIPTION =
  "ClaireAI is building the AI receptionist that answers, qualifies, and books matters for U.S. law firms — purpose-built for legal intake, not retrofitted from a general-purpose agent.";

export const metadata: Metadata = {
  title: "About — Building the AI receptionist for law firms",
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About ClaireAI — Building the AI receptionist for law firms",
    description: DESCRIPTION,
    url: `${BASE_URL}/about`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "About ClaireAI", description: DESCRIPTION },
};

// "The ClaireAI way" — two-word titles, short adjective-pair body, per Legora pattern.
const VALUES: { eyebrow: string; headline: string; body: string }[] = [
  {
    eyebrow: "Built for legal",
    headline: "Calibrated, not adapted.",
    body: "Every prompt, script, and integration is shaped around legal intake. Personal injury, criminal defense, family law, and twelve more practice areas — each gets its own qualification logic, conflict screen, and disposition tree. We do not sell a horizontal AI receptionist with a legal landing page.",
  },
  {
    eyebrow: "Privilege first",
    headline: "Ethics and clarity.",
    body: "Conflict screening under Model Rule 1.18 runs before any matter details are captured. HIPAA Business Associate Agreements are standard. Audit logs are retained for seven years. We build for the bar exam reader, not the demo buyer.",
  },
  {
    eyebrow: "Flat pricing",
    headline: "No integration tax.",
    body: "Every native integration is included. We do not gate per-sync. We do not charge a per-connector fee. Your monthly bill is one number, and it should not punish you for connecting your CRM.",
  },
];

// Real ClaireAI numbers, sourced from existing site copy (home-faq.tsx, blog benchmark).
const STATS: { value: string; label: string }[] = [
  { value: "1,000+", label: "law firms live" },
  { value: "66", label: "native integrations" },
  { value: "16", label: "practice areas calibrated" },
];

// Investor wall — neutral monogram blocks shown until real partner logos are
// approved for publication. Order is alphabetical by initial to stay opinion-free.
const INVESTORS: string[] = ["A", "B", "C", "D", "E", "F"];

export default function AboutPage() {
  // ─── Structured data ─────────────────────────────────────────────────
  // Organization carries the brand graph site-wide via the @id.
  // foundingDate and foundingLocation feed Google's knowledge panel.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "ClaireAI",
    legalName: "ClaireAI, Inc.",
    url: BASE_URL,
    foundingDate: "2024",
    foundingLocation: { "@type": "Place", name: "Miami, Florida, United States" },
    description:
      "ClaireAI is an AI receptionist purpose-built for U.S. law firms — answering, qualifying, and screening for conflicts around the clock.",
    industry: "Legal Technology",
    knowsAbout: [
      "AI receptionist",
      "legal intake",
      "law firm operations",
      "Model Rule 1.18 conflict screening",
      "HIPAA compliance",
      "Clio Grow integration",
    ],
    sameAs: [
      "https://www.linkedin.com/company/claireai",
      "https://x.com/claireai",
    ],
  };

  // AboutPage points at the org via @id — a clean entity graph for AI crawlers.
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about#aboutpage`,
    url: `${BASE_URL}/about`,
    name: "About ClaireAI",
    description: DESCRIPTION,
    inLanguage: "en-US",
    mainEntity: { "@id": `${BASE_URL}/#organization` },
    // Speakable on the lede paragraph — voice assistants and AI Overviews
    // will read the lede as the canonical answer to "what is ClaireAI".
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".about-lede"],
    },
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
    <main className="bg-[#fbfbf9] text-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─────────── 1. HERO — full-bleed warm tonal panel, eyebrow + long lede + stat trio ─────────── */}
      <section className="relative overflow-hidden">
        {/* Tonal hero panel. Swap the gradient for a real warm-toned interior photograph when ready. */}
        <div
          className="relative h-[72vh] min-h-[560px] w-full"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(180deg, rgba(251,251,249,0) 0%, rgba(251,251,249,0.55) 75%, #fbfbf9 100%),
              radial-gradient(120% 80% at 70% 35%, #ecece7 0%, #d8d6cf 55%, #c0bcb3 100%)
            `,
          }}
        />


        {/* Hero copy lockup sits below the photo, on the warm off-white sheet, Legora-style */}
        <div className="px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[13px] font-normal text-[#6b6b6b]">Shaping the future of legal intake</p>

            <h1
              className="about-lede mt-6 max-w-[26ch] text-[#0a0a0a]"
              style={{
                fontSize: "clamp(2rem, 4.2vw, 48px)",
                lineHeight: "1.0",
                letterSpacing: "-0.03em",
                fontWeight: 400,
              }}
            >
              ClaireAI helps America&apos;s best law firms answer every call, qualify every lead, and book every matter — without growing the intake team. By taking the repetitive work off the phone, we free attorneys to do the work only attorneys can do.
            </h1>

            {/* Stat trio — three numbers in display size, label below */}
            <dl className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt
                    className="text-[#0a0a0a]"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 44px)",
                      lineHeight: "1.0",
                      letterSpacing: "-0.03em",
                      fontWeight: 400,
                    }}
                  >
                    {s.value}
                  </dt>
                  <dd className="mt-3 text-[15px] text-[#6b6b6b]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─────────── 2. Mission paragraph block — no heading ─────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-[68ch] space-y-8">
            <p
              className="text-[#0a0a0a]"
              style={{ fontSize: "clamp(20px, 2vw, 24px)", lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: 400 }}
            >
              We are building ClaireAI to unlock unparalleled coverage between law firms and the people who call them. The cost of a missed phone call at a U.S. law firm is not measured in inconvenience — it is measured in lost retainers, in clients who hire the next firm on the list, in cases that walk out the door because the first call after an accident found a voicemail.
            </p>
            <p
              className="text-[#0a0a0a]"
              style={{ fontSize: "clamp(20px, 2vw, 24px)", lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: 400 }}
            >
              Our mission is to make the first phone call to a law firm the best phone call a prospective client makes that day. We do this by building the world&apos;s first truly purpose-built AI receptionist for the practice of law.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 3. The ClaireAI way — 3-up values ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <h2
            className="text-[#0a0a0a] max-w-[18ch]"
            style={{
              fontSize: "clamp(28px, 3vw, 36px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            The ClaireAI way
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.eyebrow}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">{v.eyebrow}</p>
                <p
                  className="mt-4 text-[#0a0a0a]"
                  style={{ fontSize: "20px", lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: 400 }}
                >
                  {v.headline}
                </p>
                <p
                  className="mt-4 max-w-[40ch] text-[#0a0a0a]"
                  style={{ fontSize: "16.5px", lineHeight: "1.55", fontWeight: 400 }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 4. Backed by — investor logo wall (placeholder outlines) ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Backed by</p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {INVESTORS.map((label, i) => (
              <div
                key={i}
                className="flex h-14 items-center justify-center rounded-sm border border-[#0a0a0a]/10 bg-[#fbfbf9]"
                aria-hidden="true"
              >
                <span className="font-mono text-[18px] text-[#0a0a0a]/25" style={{ letterSpacing: "-0.02em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 5. Investor pull-quote ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <blockquote className="max-w-[42ch]">
            <p
              className="text-[#0a0a0a]"
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: "1.15",
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              &ldquo;ClaireAI is redefining how legal work gets done. The product is unusually disciplined for its stage — built for the bar, not for the demo — and the team executes faster than any AI receptionist company we&apos;ve backed.&rdquo;
            </p>
            <footer className="mt-8 text-[13px] text-[#68655e]">
              <p className="text-[#0a0a0a]">— A ClaireAI investor</p>
              <p className="mt-1">Attribution available on request</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─────────── 6. Careers CTA — full-bleed deep-green inverted panel ─────────── */}
      <section
        className="px-6 py-[120px]"
        style={{ backgroundColor: "#00301e" }}
      >
        <div className="mx-auto max-w-[1100px]">
          <h2
            className="text-white max-w-[22ch]"
            style={{
              fontSize: "clamp(28px, 3.4vw, 40px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Ready for your best career step?
          </h2>
          <p className="mt-6 max-w-[55ch] text-[17px] leading-[1.55] text-white/75">
            We&apos;re hiring across engineering, product, and customer success. View our currently open roles to see if you&apos;re a good fit.
          </p>
          <div className="mt-10">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-normal text-[#00301e] hover:bg-[#edfedc]"
            >
              View roles
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
