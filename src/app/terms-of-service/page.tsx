import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for ClaireAI's AI-powered legal intake platform and the theclaireai.com marketing website.",
  alternates: { canonical: `${BASE_URL}/terms-of-service` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "February 26, 2026";

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
          <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-[#0a0a0a]/55">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-6 pb-[120px] border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[800px] pt-12 space-y-6 text-[16px] leading-[1.65] text-[#0a0a0a]/85">
          <p>Welcome to ClaireAI. These Terms of Service (&quot;Terms&quot;) govern your access to and use of ClaireAI&apos;s AI-powered legal intake services (the &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms.</p>
          <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-[15px] leading-[1.6] text-amber-900">
            <strong>Important:</strong> These Terms contain an arbitration clause and class action waiver that affect your legal rights. Please read Section 15 carefully.
          </p>

          <H2>1. Agreement to Terms</H2>
          <p>By creating an account, accessing our platform, or using any part of the Service, you agree to:</p>
          <UL items={[
            "Be bound by these Terms",
            "Comply with our Privacy Policy",
            "Follow all applicable laws and regulations",
            "Accept responsibility for your use of the Service",
          ]} />
          <p>If you do not agree to these Terms, you may not access or use the Service.</p>

          <H2>2. Eligibility and Account Registration</H2>
          <H3>2.1 Eligibility</H3>
          <p>To use ClaireAI, you must:</p>
          <UL items={[
            "Be at least 18 years old",
            "Represent a legitimate law firm or legal practice",
            "Be authorized to bind your organization to these Terms",
            "Have the legal capacity to enter into a binding agreement",
            "Not be located in a country subject to U.S. government embargo",
          ]} />
          <H3>2.2 Account Registration</H3>
          <p>When you create an account, you agree to:</p>
          <UL items={[
            "Provide accurate, current, and complete information",
            "Maintain and update your information as needed",
            "Keep your password secure and confidential",
            "Notify us immediately of any unauthorized access",
            "Accept responsibility for all activities under your account",
          ]} />
          <H3>2.3 Organization Accounts</H3>
          <p>If you&apos;re registering on behalf of a law firm or organization:</p>
          <UL items={[
            "You represent that you have authority to bind that entity",
            "The organization accepts these Terms",
            "Both you and the organization are responsible for compliance",
          ]} />

          <H2>3. Service Description</H2>
          <H3>3.1 What We Provide</H3>
          <p>ClaireAI provides AI-powered services including:</p>
          <UL items={[
            "24/7 legal intake call handling",
            "Automated case screening and qualification",
            "Conflict checking against your client database",
            "Appointment scheduling and calendar integration",
            "Bilingual (English/Spanish) conversation handling",
            "CRM and practice management software integration",
            "Call recording, transcription, and analytics",
          ]} />
          <H3>3.2 Service Modifications</H3>
          <p>We reserve the right to:</p>
          <UL items={[
            "Modify, suspend, or discontinue any part of the Service",
            "Add or remove features at any time",
            "Update our AI models and algorithms",
            "Change pricing and plan structures with 30 days' notice",
          ]} />
          <H3>3.3 Beta Features</H3>
          <p>We may offer beta or experimental features. These are provided &quot;as-is&quot; without warranties and may be discontinued at any time.</p>

          <H2>4. Acceptable Use</H2>
          <H3>4.1 Permitted Uses</H3>
          <p>You may use ClaireAI solely for:</p>
          <UL items={[
            "Legitimate legal intake and case screening",
            "Client communication and scheduling",
            "Law firm business operations",
            "Purposes consistent with professional legal practice",
          ]} />
          <H3>4.2 Prohibited Uses</H3>
          <p>You may NOT:</p>
          <UL items={[
            "Use the Service for any unlawful purpose",
            "Violate any applicable laws or regulations",
            "Infringe on intellectual property rights",
            "Transmit viruses, malware, or harmful code",
            "Attempt to gain unauthorized access to our systems",
            "Reverse engineer, decompile, or disassemble the Service",
            "Use the Service to harass, abuse, or harm others",
            "Scrape, spider, or harvest data without permission",
            "Impersonate ClaireAI or another user",
            "Interfere with or disrupt the Service",
            "Use the Service for non-legal business purposes",
            "Resell or redistribute the Service without authorization",
          ]} />
          <p><strong>Violation Consequences:</strong> We may suspend or terminate your account immediately for violations of these Terms, without refund.</p>

          <H2>5. Professional Responsibility</H2>
          <H3>5.1 Your Obligations as a Law Firm</H3>
          <p>You acknowledge and agree that:</p>
          <UL items={[
            "You remain solely responsible for all legal and ethical obligations under applicable rules of professional conduct",
            "ClaireAI is a tool that assists with intake; it does not provide legal advice",
            "You must review all intake information and make independent professional judgments",
            "You are responsible for establishing attorney-client relationships",
            "You must comply with all jurisdiction-specific advertising and solicitation rules",
            "You are responsible for supervising all client communications",
          ]} />
          <H3>5.2 Conflict Checking</H3>
          <p>While ClaireAI provides automated conflict checking:</p>
          <UL items={[
            "You remain responsible for final conflict determinations",
            "You must maintain accurate client data in your systems",
            "You should conduct additional due diligence as required by your ethics rules",
            "ClaireAI's conflict checks are a tool, not a guarantee",
          ]} />
          <H3>5.3 Client Confidentiality</H3>
          <p>You are responsible for:</p>
          <UL items={[
            "Ensuring that use of ClaireAI complies with your confidentiality obligations",
            "Obtaining any necessary client consent for recording calls",
            "Implementing appropriate security measures",
            "Training your staff on confidentiality protocols",
          ]} />

          <H2>6. Fees and Payment</H2>
          <H3>6.1 Subscription Plans</H3>
          <p>ClaireAI offers various subscription plans with different features and call volumes. Current pricing is available at <Link href="/pricing" className="underline">theclaireai.com/pricing</Link>.</p>
          <H3>6.2 Billing</H3>
          <UL items={[
            "Billing Cycle: Subscriptions are billed monthly or annually in advance",
            "Payment Method: You must provide valid payment information",
            "Automatic Renewal: Subscriptions automatically renew unless cancelled",
            "Failed Payments: Service may be suspended if payment fails",
            "Currency: All fees are in U.S. dollars",
          ]} />
          <H3>6.3 Overage Charges</H3>
          <p>If you exceed your plan&apos;s included call volume, additional per-call charges will apply as specified in your plan.</p>
          <H3>6.4 Price Changes</H3>
          <p>We may change our prices with 30 days&apos; advance notice. Changes will take effect at your next renewal period.</p>
          <H3>6.5 Refunds</H3>
          <p>Subscription fees are generally non-refundable. We may offer prorated refunds at our sole discretion in cases of:</p>
          <UL items={[
            "Service unavailability exceeding our SLA",
            "Cancellation due to material breach by ClaireAI",
            "Other circumstances at our discretion",
          ]} />
          <H3>6.6 Taxes</H3>
          <p>Fees do not include applicable taxes, which you are responsible for paying.</p>

          <H2>7. Data Ownership and License</H2>
          <H3>7.1 Your Data</H3>
          <p>You retain all ownership rights to:</p>
          <UL items={[
            "Your client and case information",
            "Call recordings and transcripts",
            "Content you provide to the Service",
          ]} />
          <H3>7.2 License to ClaireAI</H3>
          <p>You grant ClaireAI a limited license to:</p>
          <UL items={[
            "Use your data to provide the Service",
            "Create aggregated, anonymized analytics",
            "Improve our AI models and services",
            "Comply with legal obligations",
          ]} />
          <H3>7.3 ClaireAI&apos;s Property</H3>
          <p>ClaireAI owns all rights to:</p>
          <UL items={[
            "The Service platform and software",
            "Our AI models and algorithms",
            "Our trademarks and branding",
            "Aggregated, de-identified data and analytics",
          ]} />

          <H2>8. Third-Party Integrations</H2>
          <p>ClaireAI integrates with third-party services (CRMs, calendars, etc.). You agree that:</p>
          <UL items={[
            "You're responsible for compliance with third-party terms",
            "We're not liable for third-party service failures",
            "Integration availability may change without notice",
            "You grant necessary permissions for integrations to function",
          ]} />

          <H2>9. Service Level Agreement (SLA)</H2>
          <H3>9.1 Uptime Commitment</H3>
          <p>We commit to 99.9% uptime for Professional and Enterprise plans, calculated monthly.</p>
          <H3>9.2 Exclusions</H3>
          <p>The SLA does not apply to downtime caused by:</p>
          <UL items={[
            "Scheduled maintenance (with 48 hours' notice)",
            "Your misuse or errors",
            "Third-party service failures",
            "Force majeure events",
            "Your network or hardware issues",
          ]} />
          <H3>9.3 Remedies</H3>
          <p>If we fail to meet the SLA, you may be eligible for service credits as outlined in your plan.</p>

          <H2>10. Warranties and Disclaimers</H2>
          <H3>10.1 Our Warranties</H3>
          <p>We warrant that:</p>
          <UL items={[
            "The Service will function substantially as described",
            "We will provide the Service with reasonable care and skill",
            "We have the right to provide the Service",
          ]} />
          <H3>10.2 Disclaimer of Warranties</H3>
          <p>EXCEPT AS EXPRESSLY PROVIDED, THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
          <UL items={[
            "Warranties of merchantability or fitness for a particular purpose",
            "Non-infringement",
            "Error-free or uninterrupted operation",
            "Accuracy or reliability of results",
            "Freedom from viruses or harmful components",
          ]} />
          <p><strong>AI LIMITATIONS:</strong> Our AI technology may make errors, misunderstand conversations, or produce inaccurate results. You must review all AI-generated outputs before relying on them.</p>

          <H2>11. Limitation of Liability</H2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, in no event will ClaireAI be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total cumulative liability under these Terms shall not exceed the fees paid by you in the twelve (12) months preceding the claim.</p>

          <H2>12. Indemnification</H2>
          <p>You agree to indemnify, defend, and hold harmless ClaireAI, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any content or data you submit or transmit through the Service.</p>

          <H2>13. Termination</H2>
          <p>Either party may terminate this agreement at any time, subject to the notice and refund provisions of Section 6. Upon termination, your right to use the Service immediately ceases. Sections that by their nature should survive termination (e.g., data ownership, indemnification, limitation of liability, dispute resolution) shall survive.</p>

          <H2>14. Confidentiality</H2>
          <p>Each party shall protect the other party&apos;s Confidential Information using the same degree of care it uses to protect its own confidential information (and in no event less than reasonable care). Confidential Information does not include information that is publicly known, independently developed, or rightfully received from a third party without restriction.</p>

          <H2>15. Dispute Resolution</H2>
          <H3>15.1 Informal Resolution</H3>
          <p>Before initiating formal proceedings, the parties agree to attempt to resolve any dispute through good-faith negotiation for at least 30 days.</p>
          <H3>15.2 Binding Arbitration</H3>
          <p>Any dispute that cannot be resolved informally will be resolved by binding arbitration, not in court.</p>
          <H3>15.3 Arbitration Rules</H3>
          <UL items={[
            "Administrator: American Arbitration Association (AAA)",
            "Rules: AAA Commercial Arbitration Rules",
            "Location: San Francisco, California or mutually agreed location",
            "Costs: Each party pays its own attorneys' fees unless awarded by arbitrator",
          ]} />
          <H3>15.4 Class Action Waiver</H3>
          <p>YOU AND CLAIREAI AGREE THAT DISPUTES WILL BE RESOLVED ONLY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS ACTION, CONSOLIDATED ACTION, OR REPRESENTATIVE ACTION.</p>
          <H3>15.5 Opt-Out</H3>
          <p>You may opt out of arbitration by sending written notice to <a href="mailto:info@theclaireai.com" className="underline">info@theclaireai.com</a> within 30 days of first accepting these Terms.</p>

          <H2>16. General Provisions</H2>
          <H3>16.1 Governing Law</H3>
          <p>These Terms are governed by California law, without regard to conflict of law principles.</p>
          <H3>16.2 Entire Agreement</H3>
          <p>These Terms, along with our Privacy Policy, constitute the entire agreement between you and ClaireAI.</p>
          <H3>16.3 Amendments</H3>
          <p>We may modify these Terms at any time. We&apos;ll notify you of material changes via email or platform notification. Continued use after changes constitutes acceptance.</p>
          <H3>16.4 Severability</H3>
          <p>If any provision is found unenforceable, the remaining provisions remain in effect.</p>
          <H3>16.5 Waiver</H3>
          <p>Failure to enforce any right doesn&apos;t constitute a waiver of that right.</p>
          <H3>16.6 Assignment</H3>
          <p>You may not assign these Terms without our consent. We may assign our rights and obligations at any time.</p>
          <H3>16.7 Force Majeure</H3>
          <p>Neither party is liable for delays or failures caused by circumstances beyond reasonable control (natural disasters, war, pandemics, internet failures, etc.).</p>
          <H3>16.8 Notices</H3>
          <p>Legal notices must be sent to:</p>
          <address className="not-italic rounded-md border border-[#0a0a0a]/10 bg-[#fafafa] p-4">
            ClaireAI, Inc.<br />
            600 SW 3rd Ave<br />
            Miami, FL 33130<br />
            Email: <a href="mailto:info@theclaireai.com" className="underline">info@theclaireai.com</a>
          </address>
          <H3>16.9 No Agency</H3>
          <p>Nothing in these Terms creates a partnership, joint venture, or employment relationship.</p>
          <H3>16.10 Export Compliance</H3>
          <p>You agree to comply with all export and import laws when using the Service.</p>

          <H2>17. SMS / Text Message Terms</H2>
          <H3>17.1 SMS Notifications</H3>
          <p>By subscribing to ClaireAI&apos;s services, you may opt in to receive SMS text message notifications related to your account, including alerts when AI-powered intake calls are completed for your firm.</p>
          <H3>17.2 Message Frequency</H3>
          <p>Message frequency varies based on your firm&apos;s call volume. You may receive multiple messages per day depending on intake activity.</p>
          <H3>17.3 Message and Data Rates</H3>
          <p>Standard message and data rates may apply. ClaireAI does not charge separately for SMS notifications, but your mobile carrier may charge for messages received.</p>
          <H3>17.4 Opt-Out</H3>
          <p>You may opt out of SMS notifications at any time by replying STOP to any message. After opting out, you will receive a confirmation message and no further SMS notifications will be sent.</p>
          <H3>17.5 Opt-In</H3>
          <p>You may re-subscribe to SMS notifications at any time by replying START or by contacting us at <a href="mailto:info@theclaireai.com" className="underline">info@theclaireai.com</a>.</p>
          <H3>17.6 Help</H3>
          <p>For help with SMS notifications, reply HELP to any message or contact us at <a href="mailto:info@theclaireai.com" className="underline">info@theclaireai.com</a> or <a href="tel:+19549970065" className="underline">+1 (954) 997-0065</a>.</p>
          <H3>17.7 Supported Carriers</H3>
          <p>SMS notifications are supported on most major U.S. carriers. ClaireAI is not responsible for delayed or undelivered messages caused by carrier issues.</p>
          <H3>17.8 Privacy</H3>
          <p>Phone numbers collected for SMS notifications are not shared with third parties for marketing purposes. See our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> for details.</p>

          <H2>18. Contact Information</H2>
          <p>For questions about these Terms, contact us:</p>
          <address className="not-italic rounded-md border border-[#0a0a0a]/10 bg-[#fafafa] p-4">
            ClaireAI, Inc.<br />
            600 SW 3rd Ave<br />
            Miami, FL 33130<br />
            Email: <a href="mailto:info@theclaireai.com" className="underline">info@theclaireai.com</a><br />
            Phone: <a href="tel:+19549970065" className="underline">+1 (954) 997-0065</a>
          </address>
        </div>
      </section>
    </main>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 pt-2 text-[22px] font-medium tracking-[-0.015em] text-[#0a0a0a]">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 text-[17px] font-medium tracking-[-0.01em] text-[#0a0a0a]">{children}</h3>;
}
function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 ml-5 space-y-2 list-disc marker:text-[#0a0a0a]/40">
      {items.map((it, i) => <li key={i} className="pl-1">{it}</li>)}
    </ul>
  );
}
