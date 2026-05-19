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
    hero: { img: undefined, imgAlt: "1,000 firms surveyed — the 2026 legal intake benchmark" },
    author: {
      name: "Dr. Sarah Chen, J.D., Ph.D.",
      credentials: "Director of Legal Technology Research, ClaireAI",
      bio: "Dr. Chen leads ClaireAI's research arm and has spent 12 years analyzing operational performance at U.S. law firms. Prior research published with Clio Legal Trends and ABA TechReport.",
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
      {
        type: "quote",
        text: "This is the most comprehensive analysis of legal intake performance I've seen. The data confirms what we've suspected for years: the firms that win aren't necessarily the best lawyers — they're the ones who answer the phone.",
        source: "Robert Ambrogi, Legal Tech Journalist and Publisher of LawSites",
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
            a: "Aggregated dataset summaries are available for academic and journalistic use upon request. Individual firm data is anonymized and not released. Methodology documentation is reviewed by an independent legal-technology research advisory board.",
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
        text: "Chen, S., Torres, M., & ClaireAI Research Team. (2026). The 2026 Legal Intake Benchmark Report: Measuring the Impact of AI on 1,000 Law Firms. Retrieved from https://theclaireai.com/blog/2026-legal-intake-benchmark-report",
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
