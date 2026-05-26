import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ClaireAI privacy policy — how we collect, use, and protect data from the marketing site and the ClaireAI 365 platform.",
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 26, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-[#0a0a0a]">
      <section className="px-6 pt-[88px] pb-12">
        <div className="mx-auto max-w-[800px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="mt-12 text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: "1.05" }}>
            Privacy Policy
          </h1>
          <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-[#0a0a0a]/55">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-6 pb-[120px] border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[800px] pt-12 space-y-8 text-[16px] leading-[1.6] text-[#0a0a0a]/85">
          <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-[14px] leading-[1.55] text-amber-900">
            <strong>Draft — pending final legal review.</strong> This document describes ClaireAI&apos;s current data practices in good faith and is intended to provide transparency to visitors and prospective customers. The final, counsel-reviewed Privacy Policy will replace this draft and supersede it for all purposes upon publication. For any data request, email <a href="mailto:privacy@theclaireai.com" className="underline">privacy@theclaireai.com</a>.
          </p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">1. Who we are</h2>
          <p>ClaireAI, Inc. (&quot;ClaireAI&quot;, &quot;we&quot;, &quot;us&quot;) is a Delaware corporation headquartered in Miami, Florida, USA. We operate this marketing website at theclaireai.com and the ClaireAI 365 platform that provides AI receptionist services to U.S. law firms.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">2. Information we collect on this website</h2>
          <p>When you browse theclaireai.com we collect standard request metadata via our hosting provider (Cloudflare): IP address, user agent, referrer, and pages viewed. If you submit our contact form we collect the name, firm, email, phone number, and message you provide. We use Cloudflare Web Analytics, which does not set tracking cookies and does not collect personally identifying information.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">3. Information processed by the ClaireAI 365 platform</h2>
          <p>The ClaireAI 365 platform processes inbound calls, transcripts, lead qualification data, and CRM payloads on behalf of law firms that subscribe. This processing is governed by a separate Data Processing Agreement and, where required, a HIPAA Business Associate Agreement executed between ClaireAI and the firm. Marketing-site visitors are not subject to that processing.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">4. How we use your information</h2>
          <p>We use contact-form submissions to respond to your inquiry, schedule a demo, and where you have given consent send you ClaireAI product updates. We use website analytics to understand traffic patterns and improve the site. We do not sell personal information. We do not use marketing-site analytics for cross-context behavioral advertising.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">5. AI training</h2>
          <p>We do not use your contact-form submissions or website-browsing data to train any AI model, ours or any subprocessor&apos;s. Customer call recordings and transcripts processed by ClaireAI 365 are likewise excluded from any model-training pipeline, contractually binding via our Data Processing Agreement.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">6. Your rights</h2>
          <p>Depending on your jurisdiction you may have the right to access, correct, port, or delete personal information we hold about you, and to withdraw consent. California residents have specific rights under the CCPA / CPRA including the right to know, delete, and opt out of sale (we do not sell). EU/UK residents have specific rights under the GDPR / UK GDPR. To exercise any of these rights, email <a href="mailto:privacy@theclaireai.com" className="underline">privacy@theclaireai.com</a>; we will respond within 30 days.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">7. Cookies</h2>
          <p>This marketing site does not set behavioral-tracking cookies by default. If we add Google Analytics 4 or a similar analytics service in the future, we will deploy it under a Consent Mode v2 configuration with a banner that defaults to denied for EU/UK visitors.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">8. Security</h2>
          <p>The ClaireAI 365 platform infrastructure is independently audited to SOC 2 Type II criteria with continuous monitoring. Encryption is AES-256 at rest and TLS 1.3 in transit. Marketing-site infrastructure runs on Cloudflare with HSTS, TLS 1.2 minimum, and Cloudflare&apos;s standard DDoS protection.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">9. Contact</h2>
          <p>Privacy inquiries: <a href="mailto:privacy@theclaireai.com" className="underline">privacy@theclaireai.com</a><br />General: <Link href="/contact" className="underline">/contact</Link></p>
        </div>
      </section>
    </main>
  );
}
