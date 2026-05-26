import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ClaireAI privacy policy — how we collect, use, and protect data from the marketing site and the ClaireAI 365 AI intake platform.",
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "December 16, 2025";

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
          <h1
            className="mt-12 text-[#0a0a0a]"
            style={{ fontSize: "clamp(2rem, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: "1.05" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-[#0a0a0a]/55">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-6 pb-[120px] border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[800px] pt-12 space-y-6 text-[16px] leading-[1.65] text-[#0a0a0a]/85">
          <p>
            ClaireAI, Inc. (&quot;ClaireAI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of the law firms we serve (&quot;Clients&quot;) and the individuals who communicate with those firms (&quot;Callers&quot;).
          </p>
          <p>
            This Privacy Policy describes how we collect, use, and safeguard information when you use our AI-powered intake platform. By using our Service, you agree to the collection and use of information in accordance with this policy.
          </p>
          <p className="rounded-md border border-[#0a0a0a]/10 bg-[#fafafa] p-4 text-[15px] leading-[1.6]">
            <strong>Core Principle:</strong> We distinguish between data we collect as a &quot;Controller&quot; (e.g., your law firm&apos;s billing info) and data we process as a &quot;Service Provider&quot; (e.g., your potential client&apos;s case details). We process Caller Data solely on your behalf.
          </p>

          <H2>1. Information We Collect</H2>

          <H3>1.1 Information from Law Firms (Controller Data)</H3>
          <p>When you register for ClaireAI, we collect information necessary to establish your account:</p>
          <UL items={[
            "Business Identifiers: Firm name, authorized representative name, business address, email, and phone number.",
            "Financial Data: Payment card details or bank account information (processed securely via Stripe).",
            "Configuration Data: CRM API keys, calendar credentials, and conflict check databases.",
          ]} />

          <H3>1.2 Information from Callers (Processor Data)</H3>
          <p>On behalf of our Clients, we collect information from Callers during intake interactions:</p>
          <UL items={[
            "Personal Identifiers: Name, phone number, and email address.",
            "Legal Inquiry Data: Descriptions of legal issues, incident dates, and case-specific details.",
            "Communications: Audio recordings and AI-generated transcripts of intake calls.",
          ]} />

          <H3>1.3 Automatically Collected Data</H3>
          <p>We collect technical data to ensure Service stability and security:</p>
          <UL items={[
            "Log Data (IP address, browser type, timestamps).",
            "Telephony Metadata (Call duration, originating number, carrier information).",
          ]} />

          <H3>1.4 Website Analytics and Visitor Identification</H3>
          <p>We use analytics and visitor identification services to understand how visitors interact with our website and to improve our services. These tools may collect:</p>
          <UL items={[
            "Analytics Data: Page views, click patterns, time on site, referral sources, and device information via Google Analytics.",
            "Session Recordings: Anonymous recordings of user interactions (mouse movements, clicks, scrolling) via Microsoft Clarity to improve user experience.",
            "Business Visitor Identification: For B2B visitors, we may use services like RB2B to identify the company or organization associated with a website visit based on publicly available business information. This helps us understand which businesses are interested in our services.",
          ]} />
          <p>You may opt out of analytics tracking by adjusting your cookie preferences or using browser extensions that block tracking scripts.</p>

          <H2>2. How We Use Your Information</H2>

          <H3>2.1 Use of Law Firm Data</H3>
          <p>We use your business information to:</p>
          <UL items={[
            "Provide, maintain, and bill for the Service.",
            "Authenticate your access to the platform.",
            "Notify you of service updates, security alerts, and administrative messages.",
          ]} />

          <H3>2.2 Use of Caller Data (AI &amp; Service Delivery)</H3>
          <p>We process Caller Data strictly to perform the intake function on your behalf. Specific uses include:</p>
          <UL items={[
            <><strong>Real-time Intake:</strong> Transcribing audio and extracting relevant case details using AI models.</>,
            <><strong>Integration:</strong> Syncing intake summaries to your connected CRM or Case Management Software.</>,
            <><strong>Conflict Checking:</strong> Comparing Caller details against your provided conflict database.</>,
          ]} />
          <p className="rounded-md border border-[#0a0a0a]/10 bg-[#fafafa] p-4 text-[15px] leading-[1.6]">
            <strong>AI Training Policy:</strong> ClaireAI does NOT use your confidential Client Data or Caller Data to train our foundational Large Language Models (LLMs) for general public use. We may use anonymized and aggregated data to refine our internal intake logic and improve system accuracy, but strictly in a manner that cannot be reverse-engineered to identify you or your clients.
          </p>

          <H2>3. Biometric Information Disclaimer</H2>
          <p>
            While ClaireAI records audio of intake calls, we do not collect, capture, store, or otherwise process &quot;Biometric Identifiers&quot; or &quot;Biometric Information&quot; (such as voiceprints used for identification purposes) as defined by applicable laws, including the Illinois Biometric Information Privacy Act (BIPA) or the Texas Capture or Use of Biometric Identifier Act (CUBI).
          </p>

          <H2>4. SMS / Mobile Communications Privacy</H2>

          <H3>4.1 SMS Consent Collection</H3>
          <p>Before SMS messages can be sent, consent must be obtained from the recipient. ClaireAI collects SMS consent through the following methods:</p>
          <UL items={[
            "Online Consent: When users submit a contact form or intake request on our platform or our Clients' websites, they may opt-in to receive SMS communications by checking a consent checkbox or accepting terms that clearly indicate they are subscribing to SMS messages.",
            "Verbal Consent: During phone intake calls, callers may provide verbal consent to receive SMS follow-up communications, which is recorded and documented.",
            "Written Consent: Physical or electronic signature on forms that explicitly authorize SMS communications.",
          ]} />
          <p>By providing your mobile phone number and consent, you agree to receive automated SMS text messages from ClaireAI related to the legal services you have inquired about. Consent is not a condition of purchasing any goods or services.</p>

          <H3>4.2 Types of SMS Messages</H3>
          <p>ClaireAI may send you the following types of SMS messages:</p>
          <UL items={[
            "Intake Follow-ups: Messages related to your legal inquiry or case intake process.",
            "Appointment Confirmations: Reminders and confirmations for scheduled consultations.",
            "Document Requests: Links to DocuSign or other electronic signature platforms for required legal documents, retainer agreements, and intake forms.",
            "Case Status Updates: Important updates regarding your case or inquiry status.",
            "Customer Support: Responses to your questions or requests for assistance.",
          ]} />

          <H3>4.3 Message Frequency</H3>
          <p>Message frequency varies based on your interactions, case requirements, and communication preferences. Typically, you may receive 1-10 messages per month depending on the status of your inquiry or case.</p>

          <H3>4.4 Mobile Information Privacy</H3>
          <p>ClaireAI respects your privacy when it comes to mobile information. Your mobile number, location data, and any SMS communications will not be shared, sold, rented, or disclosed to third parties for promotional or marketing purposes. We only use this information to support service operations, such as coordinating intake processes, sending DocuSign document links, appointment confirmations, follow-up communications, and providing customer support.</p>

          <H3>4.5 Opting Out &amp; Getting Help</H3>
          <p>Message and data rates may apply. Message frequency varies. Carriers are not liable for delayed or undelivered messages.</p>
          <p><strong>To Opt-Out:</strong> You may opt out of SMS communications at any time by replying STOP to any message received. You will receive a one-time confirmation message, and no further SMS messages will be sent unless you re-subscribe.</p>
          <p><strong>To Get Help:</strong> Reply HELP to any message for assistance, or contact us directly at <a href="mailto:info@theclaireai.com" className="underline">info@theclaireai.com</a> or call <a href="tel:+19549970065" className="underline">+1 (954) 997-0065</a>.</p>
          <p>You may also contact us directly to request removal from SMS communications or to update your preferences.</p>

          <H2>5. Data Sharing and Disclosure</H2>

          <H3>5.1 Third-Party Sub-Processors</H3>
          <p>We engage trusted third-party vendors to support our infrastructure. These vendors are contractually bound to confidentiality and data security standards at least as stringent as those set forth herein:</p>
          <UL items={[
            "Cloud Infrastructure: AWS / Google Cloud (Data hosting and computation).",
            "Telephony: Twilio (Voice connectivity).",
            "Payment Processing: Stripe (Billing).",
          ]} />

          <H3>5.2 Legal Requirements</H3>
          <p>We may disclose information if required by law, subpoena, or court order. We will attempt to notify you of such requests unless prohibited by law, to give you an opportunity to seek a protective order.</p>

          <H2>6. Data Security</H2>
          <p>We employ enterprise-grade security measures designed to protect data from unauthorized access, exfiltration, or destruction:</p>
          <UL items={[
            "Encryption: Data is encrypted in transit (TLS 1.2+) and at rest (AES-256).",
            "Access Control: Strict Role-Based Access Control (RBAC) and Multi-Factor Authentication (MFA) for internal staff.",
            "Audits: Regular security assessments and penetration testing.",
          ]} />

          <H2>7. Data Retention</H2>
          <p>We retain Caller Data only for as long as instructed by the Law Firm or as necessary to provide the Service. You may configure retention policies (e.g., auto-deletion after 90 days) within your account settings. Upon contract termination, we provide a grace period for data export, followed by permanent deletion.</p>

          <H2>8. Your Rights (CCPA, GDPR, and State Laws)</H2>

          <H3>8.1 Rights of Law Firms (Controllers)</H3>
          <p>As a user of our platform, you have the right to access, rectify, download, or delete your business data at any time via the ClaireAI dashboard.</p>

          <H3>8.2 Rights of Callers (Data Subjects)</H3>
          <p>If you are a Caller who has interacted with ClaireAI, please note that we process your data on behalf of a specific Law Firm. To exercise your rights (access, deletion, correction) under CCPA, GDPR, or other privacy laws, please contact the Law Firm you called directly. We will assist the Law Firm in fulfilling these requests as a Data Processor.</p>

          <H2>9. Attorney-Client Privilege</H2>
          <p>ClaireAI provides the technical infrastructure for intake. However, the formation of an attorney-client relationship and the attachment of privilege are legal determinations governed by the laws of your jurisdiction. We implement security measures designed to protect the confidentiality of these communications, but we do not offer legal advice regarding privilege.</p>

          <H2>10. International Data Transfers</H2>
          <p>ClaireAI is based in the United States. If you use our Service from the EEA, UK, or Switzerland, you acknowledge that data will be transferred to the US. We rely on the Data Privacy Framework (DPF) or Standard Contractual Clauses (SCCs) to ensure adequate protection for such transfers.</p>

          <H2>11. Changes to this Policy</H2>
          <p>We may update this policy to reflect changes in law or our technical infrastructure. Material changes will be communicated via email to the address associated with your account prior to taking effect.</p>

          <H2>12. Contact Us</H2>
          <p>If you have questions about this Privacy Policy or our security practices, please contact our Privacy Team:</p>
          <address className="not-italic rounded-md border border-[#0a0a0a]/10 bg-[#fafafa] p-4">
            ClaireAI, Inc.<br />
            Attn: Privacy Officer<br />
            4410 NW 5th Ave<br />
            Boca Raton, FL 33431<br />
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
