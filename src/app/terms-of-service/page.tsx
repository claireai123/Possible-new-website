import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for the ClaireAI marketing website at theclaireai.com.",
  alternates: { canonical: `${BASE_URL}/terms-of-service` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 26, 2026";

export default function TermsOfServicePage() {
  return (
    <main className="bg-white text-[#0a0a0a]">
      <section className="px-6 pt-[88px] pb-12">
        <div className="mx-auto max-w-[800px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <span>Terms of Service</span>
          </nav>
          <h1 className="mt-12 text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: "1.05" }}>
            Terms of Service
          </h1>
          <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-[#0a0a0a]/55">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-6 pb-[120px] border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[800px] pt-12 space-y-8 text-[16px] leading-[1.6] text-[#0a0a0a]/85">
          <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-[14px] leading-[1.55] text-amber-900">
            <strong>Draft — pending final legal review.</strong> These terms describe ClaireAI&apos;s current expectations for use of the theclaireai.com marketing website in good faith. The final counsel-reviewed Terms of Service will replace this draft and supersede it upon publication. Use of the ClaireAI 365 platform is governed by a separate Master Services Agreement executed with customer firms, not by these website terms.
          </p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">1. Acceptance</h2>
          <p>By accessing theclaireai.com you agree to be bound by these Terms. If you do not agree, please do not use the website.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">2. What this site is</h2>
          <p>theclaireai.com is the marketing website for ClaireAI, Inc. It provides information about the ClaireAI 365 platform, pricing, integrations, and editorial content (blog and help center). It is not a portal for using the ClaireAI 365 platform; customers access the platform via a separate authenticated application.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">3. Permitted use</h2>
          <p>You may browse the site, read the content, download materials we explicitly mark as downloadable, and submit our contact form to inquire about the platform. You may not (a) scrape the site at a rate that materially burdens our hosting, (b) attempt to reverse-engineer the ClaireAI 365 platform via the marketing site, (c) misrepresent your identity in contact-form submissions, or (d) use the site or its content in any unlawful manner.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">4. AI / LLM crawlers</h2>
          <p>We explicitly permit named AI search and training crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, AppleBot-Extended, and others enumerated in our robots.txt) to crawl this site for the purpose of search-result citation. We retain the right to update our robots.txt allowlist at any time. Crawlers that ignore robots.txt are subject to clause 3(a).</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">5. Intellectual property</h2>
          <p>All content on this site — text, graphics, logos, images, and code — is copyright ClaireAI, Inc. or its licensors. The ClaireAI mark and ClaireAI 365 product name are trademarks of ClaireAI, Inc. You may quote our content with attribution for editorial purposes (reviews, comparisons, articles).</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">6. Marketing content is not legal advice</h2>
          <p>Articles, guides, and blog posts on theclaireai.com discuss legal-intake operations and the practice of law in a general informational capacity. Nothing on this site is legal advice. You should consult licensed counsel for advice on any specific matter, including conflicts of interest, attorney-client privilege, fee splitting, Model Rule 1.18 compliance, and HIPAA / GLBA obligations.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">7. Disclaimers</h2>
          <p>The site is provided &quot;as is&quot; without warranties of any kind. We do not warrant that the site will be uninterrupted or error-free. We disclaim all warranties to the maximum extent permitted by law.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">8. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, ClaireAI is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the marketing website.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">9. Governing law</h2>
          <p>These Terms are governed by the laws of the State of Florida, USA, without regard to its conflict-of-law provisions.</p>

          <h2 className="pt-4 text-[20px] font-medium tracking-[-0.015em] text-[#0a0a0a]">10. Contact</h2>
          <p>Questions about these Terms: <a href="mailto:legal@theclaireai.com" className="underline">legal@theclaireai.com</a></p>
        </div>
      </section>
    </main>
  );
}
