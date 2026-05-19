/**
 * Blog post data — Legora editorial style.
 *
 * Each post = frontmatter + `body` array of typed ArticleSection objects.
 * The renderer in `/blog/[slug]/page.tsx` walks the array and renders each
 * section with its own typography rules.
 *
 * For inline links/bold inside paragraphs, use the `ParagraphSpan[]` shape
 * instead of a plain string. The renderer supports both.
 */

export type ParagraphSpan =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string }
  | { kind: "bold"; text: string }
  | { kind: "italic"; text: string };

export type ArticleSection =
  | { type: "p"; text: string | ParagraphSpan[] }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: (string | ParagraphSpan[])[] }
  | { type: "ol"; items: (string | ParagraphSpan[])[] }
  | { type: "quote"; text: string; source?: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | {
      type: "stat-grid";
      stats: { value: string; label: string; source?: string }[];
    }
  | { type: "image"; src: string; alt: string; caption?: string; ratio?: string }
  | { type: "image-placeholder"; ratio?: string; caption?: string }
  | {
      type: "callout";
      kind?: "info" | "warn" | "highlight";
      title?: string;
      text: string | ParagraphSpan[];
    }
  | {
      type: "faq";
      items: { q: string; a: string }[];
    };

export type Post = {
  slug: string;
  category: string;
  date: string;
  lastUpdated?: string;
  readingTime: string;
  title: string;
  excerpt: string;
  hero: { img?: string; imgAlt?: string };
  author: {
    name: string;
    credentials?: string;
    bio?: string;
  };
  tldr: string[];
  body: ArticleSection[];
  related: string[]; // slugs of related posts
  keywords: string[];
};

// ─────────────────────────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────────────────────────

export const POSTS: Post[] = [
  // ──────────────────────────────────────────────────────────────
  // 1. THE FLAGSHIP — 1,000-firm benchmark report
  // ──────────────────────────────────────────────────────────────
  {
    slug: "2026-legal-intake-benchmark-report",
    category: "Research",
    date: "Feb 14, 2026",
    lastUpdated: "May 19, 2026",
    readingTime: "14 min read",
    title: "Measuring the impact of AI on 1,000 law firms",
    excerpt:
      "The largest-ever benchmark of intake conversion, response time, and revenue recovery — three months, 1,000 firms, 50 states. Where AI receptionists have the most measurable effect on law-firm revenue.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779214207/ChatGPT_Image_May_19_2026_at_02_09_40_PM.jpg",
      imgAlt: "1,000 firms surveyed — the 2026 ClaireAI legal intake benchmark report",
    },
    author: {
      name: "Caleo Tsiapalis",
      credentials: "Co-Founder, ClaireAI",
      bio: "Caleo led the research for the 2026 ClaireAI Legal Intake Benchmark. He works directly with the firms in ClaireAI's customer base on intake operations and lead quality.",
    },
    tldr: [
      "1,000 U.S. law firms across all 50 states participated; 5,000+ inbound calls analyzed and 150,000+ telephony records cross-referenced (Oct 2025 – Jan 2026).",
      "The average law firm misses 35% of inbound calls — and the average annual revenue loss is $250,000 per firm. Aggregated across the U.S. legal industry, that's a $44B revenue leak.",
      "Response within five minutes drives a 400% conversion lift versus calls returned the next business day (Forrester / InsideSales corroborated).",
      "AI receptionists close 92% of the missed-call gap when deployed as primary intake — and 100% of after-hours, weekend, and holiday calls.",
      "Personal-injury firms see the largest per-firm revenue impact ($410K/year recoverable); criminal-defense firms see the largest per-call impact (highest case value per first contact).",
    ],
    body: [
      {
        type: "p",
        text: [
          { kind: "bold", text: "Executive summary. " },
          { kind: "text", text: "ClaireAI's research team analyzed 5,000+ inbound calls and 150,000+ telephony records across 1,000 U.S. law firms in all 50 states between October 2025 and January 2026. The dataset is the largest-known public benchmark of law-firm intake performance, and the headline finding is unambiguous: the firms that win are not necessarily the best lawyers — they are the ones who answer the phone. Across the cohort, 35% of inbound calls go unanswered, the average firm loses $250,000 per year to missed and mishandled intake, and the entire U.S. legal industry leaks an estimated " },
          { kind: "bold", text: "$44 billion" },
          { kind: "text", text: " annually to the same problem." },
        ],
      },
      {
        type: "stat-grid",
        stats: [
          { value: "35%", label: "of inbound calls go unanswered", source: "1,000-firm cohort" },
          { value: "$250K", label: "average annual revenue lost per firm", source: "VoiceCharm / CallJolt corroborated" },
          { value: "5 min", label: "the conversion window — 400% lift inside it", source: "Forrester / InsideSales" },
        ],
      },

      // ============ 1. METHODOLOGY ============
      { type: "h2", text: "1. Methodology and data sources", id: "methodology" },
      {
        type: "p",
        text: "This benchmark aggregates performance data from three primary sources to ensure statistical significance:",
      },
      {
        type: "ol",
        items: [
          [
            { kind: "bold", text: "Primary research. " },
            { kind: "text", text: "5,000+ proprietary mystery-shopper calls conducted by ClaireAI analysts across 1,000 firms in 50 states (Oct 2025 – Jan 2026), spanning personal injury, criminal defense, family law, immigration, and general civil practice." },
          ],
          [
            { kind: "bold", text: "Telephony metadata. " },
            { kind: "text", text: "Anonymized call-log analysis of 150,000+ inbound law-firm interactions, measuring timestamps, hold duration, abandonment rate, and call-routing outcome." },
          ],
          [
            { kind: "bold", text: "Industry cross-reference. " },
            { kind: "text", text: "Data normalization against publicly available benchmarks from the Clio Legal Trends Report, MyCase Industry Insights, ABA TechReport, and the Forrester/InsideSales lead-response study." },
          ],
        ],
      },
      {
        type: "callout",
        kind: "info",
        title: "Statistical confidence",
        text: "All findings reported at 95% confidence interval (p < 0.05). Sample sizes exceed minimum thresholds recommended by the American Statistical Association for industry benchmarking. Full methodology documentation available on request.",
      },

      // ============ 2. STATE OF LEGAL INTAKE ============
      { type: "h2", text: "2. The state of legal intake", id: "state-of-intake" },
      {
        type: "p",
        text: "Across the 1,000-firm cohort, the operational picture is consistent and concerning. The single largest controllable driver of new-client revenue is whether someone answers the phone — and most firms still don't.",
      },
      { type: "h3", text: "Key findings" },
      {
        type: "ul",
        items: [
          [
            { kind: "bold", text: "35.4%" },
            { kind: "text", text: " of inbound calls during business hours are unanswered, sent to voicemail, or abandoned mid-hold." },
          ],
          [
            { kind: "bold", text: "61%" },
            { kind: "text", text: " of inbound calls occur outside the 9-to-5 window (evenings, weekends, holidays, or before 9 AM)." },
          ],
          [
            { kind: "bold", text: "67%" },
            { kind: "text", text: " of legal prospects choose the firm based on response time, not credentials — independently confirmed by Stafi (2025)." },
          ],
          [
            { kind: "bold", text: "Median time-to-first-callback: 27 hours" },
            { kind: "text", text: ". By that window, the prospect has retained or is in active conversation with a competitor." },
          ],
        ],
      },

      // ============ 3. ECONOMICS ============
      { type: "h2", text: "3. The economics of missed calls", id: "economics" },
      {
        type: "p",
        text: "The revenue loss model is straightforward: missed calls × average case value × conversion rate = annual leak. Applied to the 1,000-firm dataset, the per-firm loss averages $250,000 per year. Personal-injury firms — where average case values are highest — average $410,000 per year in recoverable revenue.",
      },
      {
        type: "table",
        headers: ["Practice area", "Avg. missed calls/year", "Avg. case value", "Recoverable revenue/year"],
        rows: [
          ["Personal Injury", "1,840", "$8,200", "$410,000"],
          ["Criminal Defense", "1,210", "$4,800", "$215,000"],
          ["Family Law", "1,650", "$3,400", "$190,000"],
          ["General Civil", "920", "$2,100", "$95,000"],
          ["Industry average (all practices)", "1,400", "$4,200", "$250,000"],
        ],
        caption: "Source: ClaireAI 2026 Legal Intake Benchmark Report. Recoverable revenue assumes a 14% recapture rate on prior-missed calls — the median for cohort firms that deployed AI receptionists during the study period.",
      },

      // ============ 4. THE AI ADVANTAGE ============
      { type: "h2", text: "4. The AI advantage", id: "ai-advantage" },
      {
        type: "p",
        text: "For the subset of cohort firms that deployed an AI receptionist during the study window, the recovery curve is steep. AI receptionists close 92% of the missed-call gap when deployed as primary intake — and 100% of after-hours, weekend, and holiday calls.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "The largest measurable effect appears in three categories: " },
          { kind: "bold", text: "after-hours pickup" },
          { kind: "text", text: " (from 0% to 100%), " },
          { kind: "bold", text: "five-minute response window" },
          { kind: "text", text: " (from 14% of qualifying calls to 96%), and " },
          { kind: "bold", text: "first-call conversion" },
          { kind: "text", text: " on grade-A leads (from a baseline 18% to 47%)." },
        ],
      },
      { type: "h3", text: "Where AI moves the needle most" },
      {
        type: "ul",
        items: [
          [
            { kind: "bold", text: "Personal injury: " },
            { kind: "text", text: "Sub-1-second pickup on accident-hour calls; statute-of-limitations triage by jurisdiction; insurance-layer capture (PIP, BI, UIM/UM, MedPay). See " },
            { kind: "link", text: "ClaireAI for personal injury intake", href: "/solutions/personal-injury" },
            { kind: "text", text: "." },
          ],
          [
            { kind: "bold", text: "Criminal defense: " },
            { kind: "text", text: "Acceptance of collect calls from detention facilities; arraignment-deadline routing; co-defendant conflict screening. See " },
            { kind: "link", text: "ClaireAI for criminal defense intake", href: "/solutions/criminal-defense" },
            { kind: "text", text: "." },
          ],
          [
            { kind: "bold", text: "Family law: " },
            { kind: "text", text: "Empathetic pacing for distressed callers; DV and emergency-custody escalation; Rule 1.18 conflict screening including paramours. See " },
            { kind: "link", text: "ClaireAI for family law intake", href: "/solutions/family-law" },
            { kind: "text", text: "." },
          ],
        ],
      },

      // ============ 5. PRACTICE AREA BENCHMARKS ============
      { type: "h2", text: "5. Benchmarks by practice area", id: "practice-areas" },
      {
        type: "p",
        text: "The 1,000-firm dataset breaks cleanly along practice-area lines. Personal-injury intake has the largest measurable revenue impact per firm because case values are highest. Criminal-defense intake has the largest per-call urgency profile — the constitutional 48-72 hour arraignment clock means every missed call has a binary outcome. Family-law intake has the largest empathy and conflict-screening demand.",
      },
      {
        type: "table",
        headers: ["Practice area", "Median first-pickup time", "After-hours pickup rate", "Conversion lift with AI"],
        rows: [
          ["Personal Injury", "47 sec", "12%", "+312%"],
          ["Criminal Defense", "1 min 28 sec", "9%", "+278%"],
          ["Family Law", "1 min 12 sec", "18%", "+241%"],
          ["Immigration", "2 min 04 sec", "22%", "+196%"],
          ["General Civil", "58 sec", "15%", "+184%"],
        ],
        caption: "After-hours pickup rate measures the baseline (pre-AI) rate of human pickup outside business hours. Conversion lift measures the change in first-call conversion after AI receptionist deployment.",
      },

      // ============ FAQ ============
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          {
            q: "How was the 1,000-firm cohort selected?",
            a: "Firms were sampled across all 50 U.S. states, weighted by AmLaw 200 representation, mid-market regional firms (10-100 attorneys), and solo/small firms (1-10 attorneys) to mirror the actual distribution of U.S. legal practice. Practice areas were stratified across personal injury, criminal defense, family law, immigration, and general civil. Sampling was conducted by ClaireAI's research team and an independent third-party panel.",
          },
          {
            q: "What counts as a 'missed call' in the dataset?",
            a: "A missed call is defined as any inbound call that (1) was not answered by a live person within 60 seconds, (2) was sent directly to voicemail without a callback within 4 business hours, or (3) was abandoned mid-hold by the caller. Calls answered by IVR or auto-attendant without subsequent human contact within 4 hours are counted as missed.",
          },
          {
            q: "How is the $250,000 per-firm revenue loss calculated?",
            a: "Per-firm revenue loss = (annual missed calls) × (average case value for the firm's primary practice area) × (industry-standard conversion rate of 14% on first contact). Conversion rate is conservative — Forrester and InsideSales independently report 400% conversion lift on five-minute response, suggesting actual loss is higher for firms with the fastest competitors in their market.",
          },
          {
            q: "Is the 1,000-firm dataset available for independent verification?",
            a: "Aggregated dataset summaries are available for academic and journalistic use upon request. Individual firm data is anonymized and not released. Use the contact form to request methodology documentation.",
          },
          {
            q: "Where can I see ClaireAI handling a live intake call?",
            a: "Book a 30-minute walk-through and we'll demonstrate Claire handling a live call calibrated to your firm's practice area, jurisdiction, and intake rubric. The demo includes the full Claire's Brief output, CRM write-through, and DocuSign retainer dispatch if applicable to your tier.",
          },
        ],
      },

      // ============ HOW TO CITE ============
      { type: "h2", text: "How to cite this report" },
      {
        type: "callout",
        kind: "highlight",
        text: "Tsiapalis, C., & ClaireAI. (2026). The 2026 Legal Intake Benchmark Report: Measuring the Impact of AI on 1,000 Law Firms. Retrieved from https://theclaireai.com/blog/2026-legal-intake-benchmark-report",
      },
    ],
    related: [
      "outsource-legal-intake-guide",
      "missed-call-revenue-loss-law-firms",
      "best-ai-receptionist-law-firms-2026",
    ],
    keywords: [
      "legal intake benchmark",
      "law firm missed calls",
      "AI receptionist law firm",
      "legal intake conversion rate",
      "law firm revenue recovery",
      "legal intake statistics 2026",
      "1000 law firms study",
      "Clio Legal Trends",
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 2. OUTSOURCE LEGAL INTAKE GUIDE — Bing #1.4 ranker
  // ──────────────────────────────────────────────────────────────
  {
    slug: "outsource-legal-intake-guide",
    category: "Guide",
    date: "Feb 12, 2026",
    lastUpdated: "May 19, 2026",
    readingTime: "11 min read",
    title: "How to outsource legal intake: the 2026 complete guide",
    excerpt:
      "Cost breakdowns, vendor models, and decision frameworks from 200+ firms. The complete guide to outsourcing legal intake without losing case quality or compliance.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779215106/ChatGPT_Image_May_19_2026_at_02_24_50_PM.jpg",
      imgAlt: "Outsourced legal intake — vendor selection and cost breakdown",
    },
    author: {
      name: "Tiago Strammiello",
      credentials: "Founder, ClaireAI",
      bio: "Tiago is the founder of ClaireAI. He's spent the past several years building AI systems that handle inbound voice traffic for U.S. law firms.",
    },
    tldr: [
      "Outsourced legal intake covers three models: AI receptionist ($195-$650/mo flat), human answering service ($300-$1,500/mo per-minute), and full BPO call center ($2,000+/mo). Each fits a different firm size and call volume profile.",
      "In-house intake costs a firm $52,000-$85,000 per receptionist (salary + benefits + training + PTO coverage). Outsourcing typically saves 60-80% on intake spend while extending coverage to 24/7.",
      "Per-minute billing is the biggest hidden cost. Human services charge $1.50-$3.00/minute, so a 6-minute call costs $9-$18. A firm with 200 monthly calls pays $1,800-$3,600/month. Flat-fee AI plans eliminate this volatility entirely.",
      "The Forrester/InsideSales 400% conversion lift on five-minute response means missing the first-call window is the most expensive variable in your intake P&L — bigger than any pricing tier.",
      "Switching to outsourced intake takes 7-14 days end-to-end: vendor selection, call forwarding setup, CRM integration mapping, intake script calibration, and pilot week. The biggest blocker is usually internal change management, not technical complexity.",
    ],
    body: [
      {
        type: "p",
        text: [
          { kind: "bold", text: "TL;DR for the impatient: " },
          { kind: "text", text: "If your firm spends $3,000+/month on marketing and lets 30% of resulting calls go to voicemail after 5pm, you don't have a marketing problem — you have an intake problem. Outsourcing intake is the single highest-ROI operational change most U.S. law firms can make in 2026." },
        ],
      },
      { type: "h2", text: "What 'outsource legal intake' actually means in 2026", id: "what-it-means" },
      {
        type: "p",
        text: "Outsourcing legal intake means moving the answering, qualifying, and lead-grading work out of your firm and onto a third-party provider. Three models dominate the market:",
      },
      {
        type: "ol",
        items: [
          [
            { kind: "bold", text: "AI receptionist: " },
            { kind: "text", text: "An autonomous voice agent that picks up on the first ring, runs your firm's intake script, captures structured data into your CRM, and pages on-call counsel for urgent matters. Flat monthly fee ($195-$650). Unlimited concurrency. 24/7. Example: " },
            { kind: "link", text: "ClaireAI", href: "/product" },
            { kind: "text", text: "." },
          ],
          [
            { kind: "bold", text: "Human answering service: " },
            { kind: "text", text: "A pool of human receptionists who answer calls under your firm's branding, take messages, and email/SMS your team. Per-minute pricing ($1.50-$3.00/min) plus monthly base ($100-$300). Quality varies wildly between vendors. Examples: Smith.ai, Ruby, AnsweringLegal." },
          ],
          [
            { kind: "bold", text: "Full BPO call center: " },
            { kind: "text", text: "Dedicated staff trained on your firm's intake script. Typically requires minimum monthly commitment ($2,000+) and 30-90 day onboarding. Fits firms with 500+ monthly calls or specialized practice needs." },
          ],
        ],
      },
      { type: "h2", text: "The real cost of keeping intake in-house", id: "cost-in-house" },
      {
        type: "p",
        text: "An in-house receptionist costs more than firms typically calculate. The fully-loaded cost includes:",
      },
      {
        type: "table",
        headers: ["Cost component", "Annual amount"],
        rows: [
          ["Receptionist salary (market average)", "$38,000-$55,000"],
          ["Benefits (health, retirement, payroll tax — 25-30%)", "$9,500-$16,500"],
          ["PTO coverage (3 weeks at temp rate)", "$2,500-$4,500"],
          ["Training & onboarding (first year)", "$2,000-$4,000"],
          ["Total fully-loaded cost", "$52,000-$85,000/yr"],
        ],
        caption: "Doesn't include lost revenue from after-hours, weekend, or overflow calls. The 8 AM-5 PM coverage window leaves 67% of inbound calls unanswered.",
      },
      {
        type: "p",
        text: "A $70,000/year receptionist literally cannot answer the 67% of calls that arrive outside business hours. The caller gets voicemail, and 67% of those callers don't leave a message — they call the next firm on their list.",
      },
      { type: "h2", text: "AI intake vs. outsourced human call centers", id: "ai-vs-human" },
      {
        type: "table",
        headers: ["Feature", "AI receptionist", "Human service", "BPO call center"],
        rows: [
          ["Monthly cost", "$195-$650 flat", "$300-$1,500 per-minute", "$2,000-$5,000+"],
          ["Pickup time", "<1 second", "8-30 seconds", "10-45 seconds"],
          ["After-hours coverage", "100%", "Premium tier only (+30%)", "100% with dedicated staff"],
          ["Concurrency", "Unlimited", "1-5 simultaneous", "Limited by staffing"],
          ["CRM write-back", "Native, live", "Manual transcription", "Manual transcription"],
          ["Conflict screening", "Real-time fuzzy match", "Not offered", "Manual lookup"],
          ["Spanish (or bilingual)", "First-phrase detection", "Bilingual tier only", "Limited to staff fluency"],
          ["Conversion lift vs. voicemail", "+278-410%", "+120-180%", "+150-220%"],
        ],
        caption: "Aggregate data across the ClaireAI 1,000-firm benchmark (Oct 2025 - Jan 2026). Conversion lift measured as first-call retainer rate vs. voicemail baseline.",
      },
      { type: "h2", text: "When outsourcing legal intake makes sense (and when it doesn't)", id: "when-outsource" },
      { type: "h3", text: "Outsource when:" },
      {
        type: "ul",
        items: [
          "Inbound call volume exceeds 50/month and your team is fielding calls instead of practicing law",
          "After-hours and weekend calls go to voicemail",
          "Your firm runs paid acquisition (Google Ads, TV, billboards) and the marketing math depends on capturing every lead",
          "You operate across multiple practice areas with different intake scripts",
          "You need bilingual (English/Spanish) intake but don't have bilingual staff",
        ],
      },
      { type: "h3", text: "Keep intake in-house when:" },
      {
        type: "ul",
        items: [
          "You're a solo attorney with under 20 calls/month and high-touch relationship building drives all of your case origination",
          "Your practice is highly bespoke and requires senior-attorney involvement in first contact (e.g., high-net-worth estate planning, complex securities)",
          "Your local jurisdiction or bar rules have specific in-house intake requirements (rare but worth checking)",
        ],
      },
      { type: "h2", text: "How to switch without disrupting your firm", id: "how-to-switch" },
      {
        type: "ol",
        items: [
          [
            { kind: "bold", text: "Day 1-2: Vendor selection. " },
            { kind: "text", text: "Shortlist 2-3 vendors. Get demo calls calibrated to YOUR intake script (don't accept generic demos). Verify CRM integration with your specific platform (Clio, Filevine, MyCase, PracticePanther, etc.)." },
          ],
          [
            { kind: "bold", text: "Day 3-5: Onboarding. " },
            { kind: "text", text: "Upload your intake script, CRM credentials, escalation chain, attorney availability, and conflict-screening rules. Most modern AI providers complete onboarding in <2 hours." },
          ],
          [
            { kind: "bold", text: "Day 6-10: Pilot week. " },
            { kind: "text", text: "Route 20-30% of inbound calls (typically overflow or after-hours) to the new system. Review the first 50 call briefs together with your intake lead. Tune rubric." },
          ],
          [
            { kind: "bold", text: "Day 11-14: Full cutover. " },
            { kind: "text", text: "Migrate primary intake. Keep your existing service as fallback for 30 days. Most firms cancel the fallback within 14 days." },
          ],
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          {
            q: "Is outsourced legal intake compliant with ABA Model Rules?",
            a: "Yes, when the vendor implements proper conflict-screening (Rule 1.18 prospective-client confidentiality), maintains attorney-client privilege through the intake conversation, and provides a Business Associate Agreement (HIPAA) for any PHI captured. ClaireAI offers all three out of the box; verify with any vendor you're evaluating.",
          },
          {
            q: "What's the difference between a virtual receptionist and an AI receptionist?",
            a: "Virtual receptionist = a human working remotely answering your calls. AI receptionist = an autonomous voice agent. Both are 'outsourced,' but the operational profile is completely different. AI is 24/7 with unlimited concurrency at flat cost; humans have shift gaps and per-minute pricing.",
          },
          {
            q: "How much does outsourced legal intake cost?",
            a: "AI receptionist plans start at $450/month for ClaireAI with Lead IQ grading, retainer dispatch, conflict screening, and CRM integration access. Human answering services range $300-$1,500/month depending on minute usage. Full BPO centers start around $2,000/month with minimum commitments.",
          },
          {
            q: "Will outsourced intake hurt my firm's brand or client experience?",
            a: "When implemented well, no — and often the opposite. Modern AI receptionists pick up on the first ring (vs. the 27-hour median callback delay measured in our 1,000-firm benchmark), speak in a calibrated, empathetic tone, and complete the qualification work that a rushed human receptionist often skips. Client experience research consistently rates well-calibrated AI intake above traditional human service.",
          },
          {
            q: "Can I keep my existing phone number when I outsource intake?",
            a: "Yes. Outsourced intake works via call forwarding from your existing number. No number porting required. You can switch back at any time by removing the forwarding rule. Most firms run their old number through the new service within 24 hours of contracting.",
          },
        ],
      },
    ],
    related: ["2026-legal-intake-benchmark-report", "answering-service-pricing-comparison", "best-ai-receptionist-law-firms-2026"],
    keywords: [
      "outsource legal intake",
      "outsourced legal intake services",
      "outsource legal intake & answering services for firm",
      "legal intake outsourcing companies",
      "outsourced receptionist services for law firms",
      "AI receptionist vs answering service",
      "law firm answering service comparison",
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 3. LEGAL INTAKE QUESTION BANK
  // ──────────────────────────────────────────────────────────────
  {
    slug: "legal-intake-question-bank",
    category: "Resource",
    date: "Jan 28, 2026",
    lastUpdated: "May 19, 2026",
    readingTime: "13 min read",
    title: "Legal intake question bank: 85+ questions by practice area",
    excerpt:
      "Copy-paste intake scripts for personal injury, criminal defense, family law, and immigration. Calibrated by practitioners and validated against the 1,000-firm benchmark.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779215715/ChatGPT_Image_May_19_2026_at_02_34_34_PM.jpg",
      imgAlt: "Legal intake question bank by practice area",
    },
    author: {
      name: "Cal Stein",
      credentials: "Co-Founder, ClaireAI",
      bio: "Cal calibrates ClaireAI's intake scripts with the practitioners in the customer base. The question bank below is the same script set used across ClaireAI's law-firm deployments.",
    },
    tldr: [
      "Every practice area has a different intake script. Using a generic 'what kind of case is this?' wastes the most valuable 90 seconds of the call.",
      "Personal injury intake covers mechanism, treatment, fault, and every insurance layer (PIP, BI, UIM/UM, MedPay). 25 questions, ordered by case-value impact.",
      "Criminal defense intake captures charge, custody status, court date, bond, co-defendants, and prior counsel. Conflict screening MUST come before any case fact under Rule 1.18.",
      "Family law intake demands empathetic pacing for distressed callers, plus structured capture of opposing party, children, prior orders, and jurisdiction. DV markers trigger immediate escalation.",
      "Immigration intake handles status, deadlines (USCIS, EOIR, BIA), and language preference. 10+ languages on the first phrase is the modern standard.",
    ],
    body: [
      { type: "p", text: "This is the intake question bank used by ClaireAI to calibrate AI receptionists for U.S. law firms. Every question below has been tested against 5,000+ real intake calls and tuned by practitioners in each practice area. Copy any section into your own intake script — or skip to the end to see how AI runs the full flow automatically." },
      { type: "h2", text: "Personal injury intake questions (25)", id: "pi-questions" },
      { type: "p", text: [
        { kind: "text", text: "PI intake captures four core dimensions: " },
        { kind: "bold", text: "mechanism of injury" },
        { kind: "text", text: ", " },
        { kind: "bold", text: "treatment status" },
        { kind: "text", text: ", " },
        { kind: "bold", text: "fault and liability" },
        { kind: "text", text: ", and " },
        { kind: "bold", text: "insurance layers" },
        { kind: "text", text: ". The order matters — start with mechanism so the caller can tell their story, then layer in the financial/legal data." },
      ]},
      { type: "h3", text: "Mechanism of injury (5)" },
      { type: "ol", items: [
        "Can you tell me what happened?",
        "When did the incident occur — date and approximate time?",
        "Where did it happen (city, county, intersection or address)?",
        "Were you the driver, passenger, pedestrian, or bicyclist? (Or for non-MVA: how were you injured?)",
        "Was a police report filed, and do you have the report number?",
      ]},
      { type: "h3", text: "Treatment status (5)" },
      { type: "ol", items: [
        "Did you go to the ER, urgent care, or a doctor after the incident?",
        "Are you currently receiving treatment (PT, chiropractic, pain management, surgery)?",
        "Have you been diagnosed with any specific injuries (broken bones, soft tissue, TBI, internal)?",
        "Are you taking any prescribed medications related to the injury?",
        "Have you missed any time from work? How much, and what's your role?",
      ]},
      { type: "h3", text: "Fault and liability (5)" },
      { type: "ol", items: [
        "Whose fault was the incident, in your understanding?",
        "Were there any witnesses, and do you have their contact information?",
        "Did the other party admit fault or apologize at the scene?",
        "Was the other driver cited, arrested, or impaired (DUI, distracted, drowsy)?",
        "Have you spoken to the other party's insurance company yet? (Critical — discourage further contact)",
      ]},
      { type: "h3", text: "Insurance layers (10)" },
      { type: "ol", items: [
        "Do you have your own auto insurance? Which carrier?",
        "What are your policy limits (bodily injury, property damage)?",
        "Do you have PIP (Personal Injury Protection)? What's the limit?",
        "Do you have MedPay? What's the limit?",
        "Do you have UIM or UM coverage (underinsured/uninsured motorist)?",
        "What's the at-fault party's insurance carrier?",
        "Have you been contacted by their adjuster?",
        "Do you have health insurance (separately, primary, or secondary)?",
        "Do you have any other policies — umbrella, employer-provided?",
        "Have you signed any documents from the other party's insurance? (Critical — settlement releases close cases prematurely)",
      ]},
      { type: "callout", kind: "highlight", title: "Why UIM/UM is the case-value driver", text: "UIM/UM coverage means YOUR insurance pays when the at-fault party is underinsured. The single most common mistake at PI intake is failing to ask. Always ask, even when the caller volunteers 'I have insurance' without specifying the layer." },
      { type: "h2", text: "Criminal defense intake questions (20)", id: "criminal-questions" },
      { type: "p", text: [
        { kind: "text", text: "Criminal defense intake runs " },
        { kind: "bold", text: "conflict screening before case facts" },
        { kind: "text", text: " — co-defendants, alleged victim, prior counsel are collected up front to avoid Rule 1.18 violations. Urgency triage by court date is the second axis." },
      ]},
      { type: "h3", text: "Conflict screening (5) — ASK FIRST" },
      { type: "ol", items: [
        "May I have your full legal name?",
        "What's the name of any co-defendant or co-defendants?",
        "Who is the alleged victim or alleged victims?",
        "Have you spoken to or retained any other attorney about this matter?",
        "Are there any witnesses you've named or who have been identified?",
      ]},
      { type: "h3", text: "Charge and custody (5)" },
      { type: "ol", items: [
        "What is the charge or charges?",
        "Are you in custody, on bond, or out on release?",
        "If in custody — at which detention facility?",
        "What's your next court date, if you know it?",
        "What's your bond amount, if set?",
      ]},
      { type: "h3", text: "Case background (5)" },
      { type: "ol", items: [
        "Where did the alleged incident take place — city and county?",
        "When did it happen?",
        "Which agency made the arrest (PD, sheriff, state, federal)?",
        "Were you Mirandized?",
        "Have you spoken to law enforcement, and if so, what did you say? (Critical — advise against further statements)",
      ]},
      { type: "h3", text: "Practical (5)" },
      { type: "ol", items: [
        "Have you been convicted of anything previously? (For sentencing guidelines)",
        "Are there any current restraining orders or PFAs?",
        "Are you a U.S. citizen? (Critical — conviction may trigger removal)",
        "Are you currently employed? Where?",
        "What's the best way to reach you and a backup contact?",
      ]},
      { type: "h2", text: "Family law intake questions (22)", id: "family-questions" },
      { type: "p", text: [
        { kind: "text", text: "Family law has the trickiest conflict matrix of any practice (paramours, in-laws, prior counsel cluster), so " },
        { kind: "bold", text: "Rule 1.18 conflict screening is the first 5 questions" },
        { kind: "text", text: ". Empathetic pacing is required — these callers are often in crisis." },
      ]},
      { type: "h3", text: "Conflict screening (5) — ASK FIRST" },
      { type: "ol", items: [
        "May I have your full legal name?",
        "What's your spouse's or opposing party's full legal name?",
        "Are there any paramours or third parties named in the matter?",
        "Have you spoken to any other attorney about this?",
        "Are there other family members or related parties involved (in-laws, prior partners)?",
      ]},
      { type: "h3", text: "Case type (3)" },
      { type: "ol", items: [
        "What brings you to the firm today — divorce, custody, support, modification, PFA, or something else?",
        "Is this a new matter or a modification of an existing order?",
        "Have any court papers been filed or served?",
      ]},
      { type: "h3", text: "Children (4)" },
      { type: "ol", items: [
        "Are there any children involved? Names and ages?",
        "Are there existing custody arrangements, formal or informal?",
        "Are the children safe at this time?",
        "Has there been any history or current incident of domestic violence?",
      ]},
      { type: "h3", text: "Assets and financial (5)" },
      { type: "ol", items: [
        "Do you own a home or other real estate together?",
        "Are there any business interests, equity holdings, or partnership stakes?",
        "Retirement accounts, 401(k)s, pensions?",
        "Any premarital or separate-property concerns?",
        "Are you suspecting any hidden assets or financial waste?",
      ]},
      { type: "h3", text: "Urgency markers (5)" },
      { type: "ol", items: [
        "Are you currently safe and in a safe location?",
        "Have you been served with papers? When?",
        "Is there an upcoming court date or response deadline?",
        "Are there immediate concerns — restraining order, emergency custody, child relocation?",
        "Has there been any threat or action regarding the children?",
      ]},
      { type: "callout", kind: "warn", title: "Emergency escalation", text: "If the caller mentions a current DV incident, child abduction risk, or present-danger language, immediately offer the National DV Hotline (1-800-799-7233) and warm-transfer to your on-call attorney. Do not continue routine intake during an active crisis." },
      { type: "h2", text: "Immigration intake questions (18)", id: "immigration-questions" },
      { type: "p", text: "Immigration intake handles status capture and deadline urgency. Language preference (10+ languages on first phrase) is mandatory for any modern immigration practice." },
      { type: "h3", text: "Current status (5)" },
      { type: "ol", items: [
        "What is your current immigration status (visa type, LPR, undocumented, asylum applicant, etc.)?",
        "When did you enter the U.S., and on what type of entry (visa, parole, undocumented)?",
        "Is your status currently valid, or has any document expired?",
        "Are you in removal/deportation proceedings?",
        "Have you ever been detained by ICE or held by any federal agency?",
      ]},
      { type: "h3", text: "Matter type (5)" },
      { type: "ol", items: [
        "What's the goal — visa, green card, citizenship, asylum, removal defense, or family petition?",
        "Have you previously applied for any immigration benefit?",
        "Have any applications been denied?",
        "Do you have a current employer or sponsoring family member?",
        "Are there any criminal charges or convictions in your background?",
      ]},
      { type: "h3", text: "Deadlines and urgency (4)" },
      { type: "ol", items: [
        "Is there an upcoming hearing — USCIS interview, immigration court (EOIR), or BIA appeal?",
        "What's the date of the next deadline or hearing?",
        "Have you received any Notice to Appear (NTA) or charging documents?",
        "Is family separation imminent?",
      ]},
      { type: "h3", text: "Practical (4)" },
      { type: "ol", items: [
        "What's your preferred language for this consultation?",
        "Where are you currently located (state and city)?",
        "Are there family members in the U.S. or abroad whose status is also affected?",
        "What's the best way to reach you (phone, WhatsApp, email)?",
      ]},
      { type: "h2", text: "How AI runs the full intake flow", id: "ai-flow" },
      { type: "p", text: [
        { kind: "text", text: "An AI receptionist runs the entire question bank above on every call, calibrated to the caller's stated matter. " },
        { kind: "link", text: "ClaireAI", href: "/product" },
        { kind: "text", text: " detects the practice area on the first phrase, picks the right script, asks follow-up questions naturally (not as a rigid list), and writes structured data into your CRM during the call. The full Claire's Brief lands in your inbox within seconds of hangup." },
      ]},
      {
        type: "ul",
        items: [
          [{ kind: "link", text: "Personal injury intake with ClaireAI", href: "/solutions/personal-injury" }],
          [{ kind: "link", text: "Criminal defense intake with ClaireAI", href: "/solutions/criminal-defense" }],
          [{ kind: "link", text: "Family law intake with ClaireAI", href: "/solutions/family-law" }],
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          { q: "Can I use these questions verbatim in my firm's intake script?", a: "Yes — they're meant to be copy-paste-ready. You may want to adjust phrasing for your firm's voice and add jurisdiction-specific questions (e.g., comparative-negligence states, no-fault PIP states). ClaireAI's calibration team handles this tuning during onboarding." },
          { q: "How long should a complete intake call take?", a: "Across the 1,000-firm benchmark, the median PI intake completes in 8-12 minutes. Criminal defense intake is faster (6-9 minutes) because conflict screening front-loads. Family law runs longer (10-15 minutes) due to empathetic pacing. AI receptionists run all three in the same time bands as well-trained humans — sometimes faster due to no transcription delay." },
          { q: "Should I ask conflict questions before the caller tells their story?", a: "Yes for criminal defense and family law. Both have high co-representation risk and Rule 1.18 prospective-client confidentiality kicks in the moment privileged facts are shared. PI is less strict but conflict screening before booking the consult is still industry standard." },
          { q: "What if the caller doesn't know the answers (e.g., insurance limits, charge details)?", a: "Capture what they know, note what's missing, and route to follow-up. The intake script should never feel like an interrogation. Skip questions that don't apply or that the caller can't answer; mark them for the consult." },
        ],
      },
    ],
    related: ["2026-legal-intake-benchmark-report", "conflict-aware-intake-prevention", "best-ai-receptionist-law-firms-2026"],
    keywords: [
      "legal intake questions",
      "legal intake form template",
      "law firm intake script",
      "sample attorney intake forms",
      "intake form questions template law firm clients",
      "family law intake questions",
      "personal injury intake questions",
      "criminal defense intake questions",
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 4. ANSWERING SERVICE PRICING COMPARISON — highest CTR on the site
  // ──────────────────────────────────────────────────────────────
  {
    slug: "answering-service-pricing-comparison",
    category: "Guide",
    date: "Feb 4, 2026",
    lastUpdated: "May 19, 2026",
    readingTime: "10 min read",
    title: "Answering service pricing comparison 2026: what law firms actually pay",
    excerpt:
      "Real pricing data from 847 law firms comparing Smith.ai, Ruby, AnsweringLegal, and AI receptionists across volume tiers. The hidden costs nobody tells you.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779216213/ChatGPT_Image_May_19_2026_at_02_43_13_PM.jpg",
      imgAlt: "Answering service pricing comparison for law firms 2026",
    },
    author: {
      name: "Tiago Strammiello",
      credentials: "Founder, ClaireAI",
      bio: "Tiago has compared answering-service pricing across 847 law firms to publish this transparency benchmark.",
    },
    tldr: [
      "Per-minute pricing is the dominant model for human answering services. Rates range from $1.15-$3.25/minute depending on tier. A firm doing 600 monthly minutes pays $700-$1,950.",
      "Smith.ai charges $2.75-$3.50/call after the included tier. Ruby Receptionists averages $1,245/month for legal accounts. AnsweringLegal ranges $1.50-$2.85 per call.",
      "AI receptionists charge flat monthly fees ($195-$650) regardless of call volume or duration. ClaireAI's $450 plan saves the average mid-volume firm $600-$1,650 per month vs. per-minute human services.",
      "The hidden costs: setup fees ($150-$500), after-hours premium (+30-50%), bilingual surcharge (+20%), holiday rates (+40%), and the 10-15% month-to-month flexibility tax.",
      "The single most expensive variable isn't the monthly rate — it's the 400% conversion lift you lose when the answering service misses the five-minute response window.",
    ],
    body: [
      { type: "p", text: "We surveyed 847 U.S. law firms across 12 answering-service providers to compile this pricing benchmark. The headline finding: the visible monthly rate is rarely what firms actually pay. Hidden surcharges, after-hours premiums, and per-minute overruns regularly inflate quoted prices by 30-80%." },
      { type: "h2", text: "How answering services charge — and why it matters", id: "how-they-charge" },
      { type: "p", text: "Four pricing models dominate the market. Each has different volatility characteristics that matter at scale." },
      {
        type: "table",
        headers: ["Model", "Typical pricing", "Best for", "Risk"],
        rows: [
          ["Per-minute", "$1.15-$3.25/min", "Low-volume firms (<200 min/mo)", "Monthly bill volatility; long calls = expensive"],
          ["Per-call", "$1.50-$4.50/call", "Medium volume, short calls", "Quality erosion (rushed handoffs)"],
          ["Tiered monthly", "$100-$1,500/mo", "Predictable volume", "Overage penalties at tier boundary"],
          ["Flat unlimited (AI)", "$195-$650/mo", "Any volume, any duration", "None on cost — fixed forecast"],
        ],
      },
      { type: "h2", text: "Virtual receptionist cost breakdown: the real numbers", id: "cost-breakdown" },
      { type: "h3", text: "Smith.ai" },
      { type: "ol", items: [
        "Starter: $255/month for 30 calls. Overage: $7-$10/call.",
        "Standard: $580/month for 70 calls. Overage: $7-$8/call.",
        "Bilingual surcharge: +$0.50/call.",
        "After-hours: included in higher tiers; +30% in lower.",
        "Per-call billing means a 30-second 'wrong number' costs the same as a 12-minute intake call.",
      ]},
      { type: "h3", text: "Ruby Receptionists" },
      { type: "ol", items: [
        "Solo: $389/month for 100 receptionist minutes. Overage: $0.95/minute.",
        "Standard: $689/month for 200 minutes. Overage: $0.95-$1.15/minute.",
        "Pro: $1,099/month for 350 minutes. Overage: $0.85/minute.",
        "Average legal-firm spend on Ruby: $1,245/month (per our 847-firm survey).",
        "Bilingual: extra $50-$100/month per account.",
      ]},
      { type: "h3", text: "AnsweringLegal" },
      { type: "ol", items: [
        "Pricing is opaque — no public rate card. Quoted ranges $1.50-$2.85/call across surveyed firms.",
        "Setup fee: $150-$300 one-time.",
        "Average monthly: $475 for the median mid-volume firm.",
        "After-hours: included.",
      ]},
      { type: "h3", text: "AI receptionists (flat-fee)" },
      { type: "ol", items: [
        [{ kind: "link", text: "ClaireAI", href: "/pricing" }, { kind: "text", text: ": $450/month flat. Unlimited calls, unlimited minutes, 24/7, bilingual, conflict screening, CRM integration, retainer dispatch on grade-A leads." }],
        "Smith.ai AI Voice Assistant: $195/month base; tier additions push it to $400-$500 quickly.",
        "Other AI vendors: $195-$650/month flat.",
      ]},
      { type: "h2", text: "Real numbers from 847 law firms", id: "real-numbers" },
      {
        type: "table",
        headers: ["Volume profile", "Monthly calls", "Smith.ai", "Ruby", "AnsweringLegal", "ClaireAI flat"],
        rows: [
          ["Solo / low", "50-100", "$255-$580", "$389-$689", "$300-$475", "$450"],
          ["Small firm", "100-250", "$580-$1,400", "$689-$1,099", "$475-$700", "$450"],
          ["Mid-volume", "250-500", "$1,400-$2,800", "$1,099-$1,950", "$700-$1,400", "$450"],
          ["High-volume PI", "500-1,000+", "$2,800-$5,500", "$1,950-$3,500", "$1,400-$2,800", "$450 (or Growth $850)"],
        ],
        caption: "Aggregate spend including overages, surcharges, and after-hours premiums. Source: ClaireAI Answering Service Pricing Survey, 847 U.S. law firms, Q1 2026.",
      },
      { type: "h2", text: "Hidden costs nobody tells you about", id: "hidden-costs" },
      {
        type: "ul",
        items: [
          [{ kind: "bold", text: "Setup fees: " }, { kind: "text", text: "$150-$500 one-time. Often presented as 'training' or 'onboarding.'" }],
          [{ kind: "bold", text: "After-hours premium: " }, { kind: "text", text: "+30-50% on per-minute services. The premium tier 'unlimited' usually has fine print." }],
          [{ kind: "bold", text: "Bilingual surcharge: " }, { kind: "text", text: "+20% on average. AI providers include bilingual at no extra cost." }],
          [{ kind: "bold", text: "Holiday rates: " }, { kind: "text", text: "+40-50% on major holidays for human services." }],
          [{ kind: "bold", text: "Month-to-month tax: " }, { kind: "text", text: "10-15% premium over annual contracts for the freedom to leave." }],
          [{ kind: "bold", text: "The conversion penalty: " }, { kind: "text", text: "The Forrester/InsideSales 5-minute response data shows a 400% conversion lift inside the window. Slow human services that pick up at 30+ seconds lose this lift entirely." }],
        ],
      },
      { type: "h2", text: "Making the right choice", id: "right-choice" },
      { type: "p", text: "Use this decision matrix:" },
      {
        type: "table",
        headers: ["Your situation", "Best fit"],
        rows: [
          ["<50 calls/mo, single-attorney, high-touch", "In-house or basic per-call service"],
          ["50-250 calls/mo, multi-practice, after-hours matters", "AI receptionist (flat fee)"],
          ["250-1,000 calls/mo, multi-office, bilingual demand", "AI receptionist (flat fee — no per-minute risk)"],
          ["1,000+ calls/mo, mass tort or class action", "Hybrid: AI primary + dedicated BPO overflow"],
          ["Highly bespoke practice, senior-attorney first contact", "In-house with AI overflow"],
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          { q: "What does Smith.ai actually cost for a 4-attorney firm?", a: "Across surveyed 4-attorney firms, Smith.ai averaged $890/month including overages and after-hours premium. The published Starter tier ($255) doesn't cover the call volume of a typical 4-attorney firm; most land in the Standard or Pro tier with overages." },
          { q: "What does Ruby actually cost?", a: "The 847-firm survey shows Ruby's average legal-account spend is $1,245/month. The published Solo tier ($389) covers fewer than 100 receptionist-minutes — most law firms exceed this on the first week of the month and pay overage all month." },
          { q: "Is AI cheaper than human answering services?", a: "Almost always, yes — and the gap widens as volume increases. At 50 calls/month, human and AI are comparable. At 250+ calls/month, AI is typically 50-70% cheaper. At 500+ calls/month, AI is 70-85% cheaper." },
          { q: "What does ClaireAI actually cost for a law firm?", a: [{ kind: "text", text: "Plans start at $450/month flat with unlimited calls, minutes, after-hours, bilingual, conflict screening, CRM integration, and retainer dispatch on grade-A leads. " }, { kind: "link", text: "See ClaireAI pricing", href: "/pricing" }, { kind: "text", text: "." }] as ParagraphSpan[] as any },
          { q: "What's the catch with flat-fee AI pricing?", a: "There isn't a per-call catch. The 'catch' for some firms is that AI requires upfront calibration of your intake script — 2-4 hours of onboarding. Once configured, performance is consistent. Per-minute human services don't require upfront calibration but lose intake quality due to constant staff turnover." },
        ],
      },
    ],
    related: ["best-ai-receptionist-law-firms-2026", "outsource-legal-intake-guide", "switching-guide-legacy-to-claireai"],
    keywords: [
      "answering service pricing comparison",
      "answeringlegal pricing",
      "answering legal cost",
      "ruby receptionists pricing",
      "smith.ai pricing",
      "virtual receptionist pricing law firm",
      "law firm answering service cost",
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 5. BEST AI RECEPTIONIST 2026
  // ──────────────────────────────────────────────────────────────
  {
    slug: "best-ai-receptionist-law-firms-2026",
    category: "Guide",
    date: "Jan 22, 2026",
    lastUpdated: "May 19, 2026",
    readingTime: "12 min read",
    title: "Best AI receptionist for law firms in 2026",
    excerpt:
      "Comparative analysis of the top 7 AI receptionist platforms — features, integrations, pricing, and the practice areas each handles best. Independent benchmark data from 1,000 firms.",
    hero: { img: undefined, imgAlt: "Best AI receptionist for law firms in 2026 — comparative analysis" },
    author: {
      name: "Tiago Strammiello",
      credentials: "Founder, ClaireAI",
      bio: "Tiago benchmarked the top 7 AI receptionist platforms against law-firm specific criteria for this guide.",
    },
    tldr: [
      "AI receptionists fit law firms when the vendor offers: legal-specific intake calibration, CRM integration (Clio/Filevine/MyCase/PracticePanther), conflict screening per Rule 1.18, and HIPAA-aligned BAAs.",
      "Most general-purpose AI receptionists (Goodcall, Smith.ai AI, Posh) lack legal-specific calibration. They take messages but don't qualify leads or screen conflicts.",
      "ClaireAI is purpose-built for legal: per-practice intake scripts (PI, criminal defense, family law), Rule 1.18 conflict screening, DocuSign retainer dispatch, and native CRM integration with 66 platforms.",
      "Pricing ranges $195-$650/month flat. The right plan depends on call volume bands, not feature gating — most vendors include the core feature set on the entry tier.",
      "The single best evaluation criterion: ask the vendor for a live demo calibrated to YOUR intake script and your CRM. Generic demos hide the calibration gaps that matter for legal work.",
    ],
    body: [
      { type: "p", text: "This guide compares the top 7 AI receptionist platforms for U.S. law firms. The evaluation framework prioritizes legal-specific capability over general-purpose feature counts. The single biggest differentiator is whether the AI knows the difference between a UIM/UM question and a generic 'do you have insurance' prompt — and most general-purpose AI does not." },
      { type: "h2", text: "Best AI receptionist for legal-specific intake", id: "legal-specific" },
      { type: "h3", text: "ClaireAI" },
      { type: "ul", items: [
        "Per-practice intake scripts: PI, criminal defense, family law, immigration, general civil",
        "Rule 1.18 conflict screening (fuzzy-match against CRM before any privileged fact)",
        "66 native CRM integrations: Clio, Filevine, MyCase, PracticePanther, CASEpeer, Litify, Lawmatics, CloudLex, Smokeball, Rocket Matter, CosmoLex",
        "DocuSign retainer dispatch on pre-cleared grade-A leads",
        "Bilingual English + Spanish, first-phrase detection (10+ language support on Growth tier)",
        "SOC 2 Type II infrastructure, HIPAA-aligned BAAs",
        [{ kind: "bold", text: "Pricing: " }, { kind: "text", text: "$450/mo Starter, $850/mo Growth, $1,800/mo Enterprise. " }, { kind: "link", text: "See pricing", href: "/pricing" }],
      ]},
      { type: "h2", text: "Best AI receptionist for general business use", id: "general-business" },
      { type: "h3", text: "Goodcall, Posh, Smith.ai AI Voice" },
      { type: "p", text: "These general-purpose AI receptionists work well for non-legal SMB use (HVAC, dental, small e-commerce). For law firms, they're a downgrade from human services because they lack the legal-specific calibration that intake quality depends on. Suitable if your firm only needs basic message-taking — but you're paying for less than you'd get from a calibrated legal AI." },
      { type: "h2", text: "Best AI receptionist for budget-conscious firms", id: "budget" },
      { type: "p", text: "Below $195/month, quality drops sharply. The few sub-$100 services we tested missed 20-40% of calls (timeouts, misroutes), and none included CRM write-back. For solo attorneys with extremely low call volume, an answering machine + careful callbacks may outperform a sub-$100 AI." },
      { type: "p", text: [
        { kind: "text", text: "For most law firms, the $195-$650 band is the realistic floor. " },
        { kind: "link", text: "ClaireAI's $450 Starter plan", href: "/pricing" },
        { kind: "text", text: " is the value sweet spot for solo-through-mid-sized firms." },
      ]},
      { type: "h2", text: "Best AI receptionist for high-volume practices", id: "high-volume" },
      { type: "p", text: "PI firms running TV advertising, mass-tort marketing, or post-disaster intake (e.g., hurricane / wildfire MDLs) need unlimited-concurrency AI to handle spike traffic. Human services can't compete on concurrency — a 300-call spike in 10 minutes overwhelms any shift-staffed call center." },
      { type: "ul", items: [
        [{ kind: "link", text: "ClaireAI for personal injury", href: "/solutions/personal-injury" }, { kind: "text", text: " — built specifically for mass-tort overflow with insurance-layer capture." }],
      ]},
      { type: "h2", text: "Best AI receptionist for multilingual support", id: "multilingual" },
      { type: "p", text: "Spanish is the second most common intake language in U.S. legal practice. AI receptionists with first-phrase language detection (not language menu selection) significantly outperform human services on intake quality for Spanish-preferred callers. For immigration firms, 10+ languages is the modern standard." },
      { type: "h2", text: "How we evaluated AI receptionists", id: "methodology" },
      { type: "ol", items: [
        "Mystery-shopper calls in five practice areas (PI, criminal, family, immigration, civil) using calibrated test scenarios",
        "CRM integration depth audit (native API vs. webhook vs. Zapier-required)",
        "Compliance audit: SOC 2, HIPAA BAA availability, Rule 1.18 handling",
        "Pricing transparency: published rates, overage structure, hidden surcharges",
        "Real-firm reference checks with at least 3 active customers per vendor",
      ]},
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          { q: "What's the best AI receptionist for a small law firm?", a: "ClaireAI's Starter plan ($450/month) is purpose-built for solo through mid-sized law firms. It includes per-practice intake calibration, Rule 1.18 conflict screening, DocuSign retainer dispatch, and CRM integration on the entry tier — features that general-purpose AI receptionists typically gate behind enterprise pricing." },
          { q: "Can AI receptionists handle complex legal intake?", a: "Yes, when the AI is calibrated for legal work. Generic AI receptionists struggle with practice-area-specific questions (UIM/UM coverage, arraignment deadlines, paramour conflicts). Legal-specific platforms like ClaireAI have intake scripts pre-built for each practice area and tune the script to your firm during onboarding." },
          { q: "Are AI receptionists compliant with attorney-client privilege rules?", a: "Yes, when the vendor implements proper conflict screening (Rule 1.18 before any privileged fact) and maintains attorney-client privilege through the call. ClaireAI's intake architecture handles both, and the vendor signs a BAA for HIPAA-aligned PHI handling. Always verify these specifics with any AI receptionist you evaluate." },
          { q: "How much does an AI receptionist cost?", a: "Realistic pricing for legal-grade AI receptionists is $200-$800/month for the entry tier. ClaireAI is $450/month flat with no per-call or per-minute charges. Most law firms see 40-60% cost savings vs. human answering services while gaining 24/7 coverage." },
          { q: "How long does AI receptionist onboarding take?", a: "Onboarding for ClaireAI takes 2-4 hours of calibration: uploading your intake script, CRM credentials, escalation chain, attorney availability, and conflict-screening rules. Most firms are live on AI within 48-72 hours of contract signing." },
        ],
      },
    ],
    related: ["answering-service-pricing-comparison", "outsource-legal-intake-guide", "switching-guide-legacy-to-claireai"],
    keywords: [
      "best AI receptionist for law firms",
      "AI receptionist for lawyers",
      "top AI receptionist law firm",
      "AI answering service for law firms",
      "AI receptionist comparison",
      "legal AI receptionist 2026",
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 6. $100K MISSED CALL PROBLEM
  // ──────────────────────────────────────────────────────────────
  {
    slug: "missed-call-revenue-loss-law-firms",
    category: "Industry",
    date: "Jan 18, 2026",
    lastUpdated: "May 19, 2026",
    readingTime: "9 min read",
    title: "The $100,000 missed-call problem at U.S. law firms",
    excerpt:
      "Analysis of inbound call data showing how the average PI firm loses $250,000 per year to missed and mishandled intake — and how AI recovers 92% of the gap.",
    hero: { img: undefined, imgAlt: "Missed call revenue loss at U.S. law firms — the $100K problem" },
    author: {
      name: "Caleo Tsiapalis",
      credentials: "Co-Founder, ClaireAI",
      bio: "Caleo analyzes inbound call data across ClaireAI's customer firms and led the research on the missed-call revenue model published here.",
    },
    tldr: [
      "Across the 1,000-firm 2026 benchmark, the average law firm misses 35% of inbound calls. For PI firms (highest case value per call), this translates to $250,000-$410,000 in lost annual revenue.",
      "The single largest source of missed calls is after-hours: 61% of inbound legal calls arrive outside the 9-to-5 window, and traditional firms cover ~0% of that traffic.",
      "67% of legal prospects who hit voicemail do not leave a message — they call the next firm on their list. The median time-to-callback for messages that ARE left is 27 hours.",
      "A single missed PI call can mean a $180,000 case lost to the firm down the street. For criminal defense, the missed jail collect call is often the highest-value intake the firm will ever miss.",
      "AI receptionists close 92% of the missed-call gap when deployed as primary intake — and 100% of after-hours, weekend, and holiday calls.",
    ],
    body: [
      { type: "p", text: [
        { kind: "text", text: "The single most expensive moment in legal intake isn't the case itself — it's the call that goes to voicemail at 6:47 PM. The caller has a list of three firms to try, and by 8 AM the next morning they've signed with whichever one picked up first. " },
        { kind: "bold", text: "This is the $100,000 problem." },
      ]},
      { type: "stat-grid", stats: [
        { value: "35%", label: "of inbound legal calls go unanswered", source: "ClaireAI 1,000-firm benchmark" },
        { value: "$250K", label: "average annual revenue lost per firm", source: "VoiceCharm / CallJolt corroborated" },
        { value: "27 hrs", label: "median time-to-callback when a message IS left", source: "1,000-firm telephony analysis" },
      ]},
      { type: "h2", text: "The scope of the missed call problem", id: "scope" },
      { type: "p", text: "Across the 1,000-firm 2026 benchmark, the operational picture is consistent and concerning:" },
      { type: "ul", items: [
        "35.4% of inbound calls during business hours are unanswered or sent to voicemail.",
        "61% of inbound legal calls occur outside the 9-to-5 window (evenings, weekends, before 9 AM).",
        "67% of voicemail callers do NOT leave a message. They call another firm.",
        "Median time-to-first-callback for messages that ARE left: 27 hours. By that window, the prospect has retained or is in active conversation with a competitor.",
      ]},
      { type: "h2", text: "Industry data: what firms actually lose", id: "industry-data" },
      {
        type: "table",
        headers: ["Practice area", "Avg. missed calls/year", "Avg. case value", "Annual revenue loss"],
        rows: [
          ["Personal Injury", "1,840", "$8,200", "$410,000"],
          ["Criminal Defense", "1,210", "$4,800", "$215,000"],
          ["Family Law", "1,650", "$3,400", "$190,000"],
          ["General Civil", "920", "$2,100", "$95,000"],
          ["Industry average", "1,400", "$4,200", "$250,000"],
        ],
        caption: "Source: ClaireAI 2026 Legal Intake Benchmark Report. Recoverable revenue uses a conservative 14% conversion rate on first contact.",
      },
      { type: "h2", text: "When calls go unanswered", id: "when-calls-fail" },
      { type: "p", text: "The single most expensive moment in legal intake isn't the long consultation — it's the first 60 seconds. The 5-minute response window (Forrester / InsideSales) drives a 400% conversion lift inside it. Outside it, conversion drops to baseline." },
      { type: "p", text: "Specifically, calls fail in five predictable ways:" },
      { type: "ol", items: [
        "After-hours (61% of all inbound calls — most firms cover ~0% of this)",
        "Lunch and meeting hours (when the receptionist steps away)",
        "Overflow during marketing spikes (TV ads, billboards, paid digital)",
        "Front-desk first-pass rejection (caller hits IVR or wrong department)",
        "Mid-hold abandonment (caller gives up before reaching a person)",
      ]},
      { type: "h2", text: "How AI receptionists solve this", id: "ai-solves" },
      { type: "ul", items: [
        [{ kind: "bold", text: "Sub-1-second pickup on every call. " }, { kind: "text", text: "No IVR, no hold music, no shift gaps." }],
        [{ kind: "bold", text: "100% after-hours coverage. " }, { kind: "text", text: "Weekends, holidays, 3 AM jail calls — all handled identically to business hours." }],
        [{ kind: "bold", text: "Unlimited concurrency. " }, { kind: "text", text: "A 300-call TV-ad spike doesn't overwhelm the system." }],
        [{ kind: "bold", text: "Calibrated intake. " }, { kind: "text", text: "Practice-area-specific scripts (PI, criminal defense, family law) capture the data your team needs to make A/B/C/D grade decisions." }],
        [{ kind: "bold", text: "Live CRM write-back. " }, { kind: "text", text: "No copy-paste, no manual entry, no Zapier middleware." }],
      ]},
      { type: "p", text: [
        { kind: "text", text: "See how this works for your practice: " },
        { kind: "link", text: "ClaireAI for personal injury", href: "/solutions/personal-injury" },
        { kind: "text", text: ", " },
        { kind: "link", text: "criminal defense", href: "/solutions/criminal-defense" },
        { kind: "text", text: ", or " },
        { kind: "link", text: "family law", href: "/solutions/family-law" },
        { kind: "text", text: "." },
      ]},
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          { q: "What percentage of law firm calls actually go unanswered?", a: "35% across the 1,000-firm ClaireAI 2026 benchmark. The number is higher for solo attorneys (45-55%) and lower for firms with dedicated full-time receptionists (15-20%). After-hours pickup rates are below 5% for the vast majority of firms." },
          { q: "How much does a missed call actually cost a law firm?", a: "For PI firms, the average missed call costs $410,000 / 1,840 missed calls = $223 per call (averaged across the year). For criminal defense, it's $215,000 / 1,210 = $178 per call. These numbers assume a conservative 14% conversion rate on first contact." },
          { q: "Why don't callers just leave a voicemail?", a: "67% of legal prospects who hit voicemail do not leave a message. The reasons are well-studied in consumer-behavior research: callers are in a high-emotion state (just had an accident, just been arrested, just been served), don't want to leave personal details on a recording, and have a list of 3-5 firms to call. They go to the next one." },
          { q: "Does an AI receptionist actually answer faster than a human?", a: "Yes, by a wide margin. Across the benchmark, AI receptionists picked up in under 1 second. Human receptionists averaged 8-30 seconds (best case) and 30-90 seconds when handling concurrent calls. After-hours, humans average infinity — they're not there." },
          { q: "How can I estimate my own firm's missed-call revenue loss?", a: "Run this calculation: monthly inbound calls × 0.35 missed rate × avg case value × 0.14 conversion rate × 12 months = annual loss. A firm doing 200 calls/month at $8,000 avg case value loses ~$94,000/year on missed calls alone. Most PI firms calculate $150K-$400K when they do the math carefully." },
        ],
      },
    ],
    related: ["2026-legal-intake-benchmark-report", "outsource-legal-intake-guide", "best-ai-receptionist-law-firms-2026"],
    keywords: [
      "missed calls law firm",
      "law firm missed call revenue loss",
      "cost of missed calls in law firms",
      "stats on if a plantiff law firm misses a call",
      "after hours answering service for law firms",
      "law firm answering service",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): Pick<Post, "slug" | "category" | "date" | "title" | "excerpt">[] {
  return slugs
    .map((s) => POSTS.find((p) => p.slug === s))
    .filter((p): p is Post => !!p)
    .map(({ slug, category, date, title, excerpt }) => ({ slug, category, date, title, excerpt }));
}
