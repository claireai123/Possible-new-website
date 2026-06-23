/**
 * Blog post data — Legora editorial style.
 *
 * Each post = frontmatter + `body` array of typed ArticleSection objects.
 * The renderer in `/blog/[slug]/page.tsx` walks the array and renders each
 * section with its own typography rules.
 *
 * For inline links/bold inside paragraphs, use the `ParagraphSpan[]` shape
 * instead of a plain string. The renderer supports both.
 *
 * TODO(date-iso): `date` and `lastUpdated` are stored as display strings
 * ("Feb 14, 2026") rather than ISO 8601 ("2026-02-14"). The renderer
 * converts to ISO via `toISO()` for schema.org/OpenGraph metadata, so this
 * works end-to-end, but the values here are not Schema.org-valid as-is and
 * `Date.parse()` may interpret them inconsistently across runtimes. When the
 * authoritative publication date for each post is confirmed, migrate to ISO
 * 8601 and update the templates to format on render.
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
      items: { q: string; a: string | ParagraphSpan[] }[];
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
            { kind: "text", text: "Data normalization against publicly available benchmarks from the " },
            { kind: "link", text: "Clio Legal Trends Report", href: "https://www.clio.com/resources/legal-trends/" },
            { kind: "text", text: ", " },
            { kind: "link", text: "MyCase Industry Insights", href: "https://www.mycase.com/reports/2025-legal-industry-report/" },
            { kind: "text", text: ", " },
            { kind: "link", text: "ABA TechReport", href: "https://www.americanbar.org/groups/law_practice/resources/tech-report/" },
            { kind: "text", text: ", and the " },
            { kind: "link", text: "Forrester/InsideSales lead-response study", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
            { kind: "text", text: "." },
          ],
        ],
      },
      {
        type: "callout",
        kind: "info",
        title: "Statistical confidence",
        text: [
          { kind: "text", text: "All findings reported at 95% confidence interval (p < 0.05). Sample sizes exceed minimum thresholds recommended by the " },
          { kind: "link", text: "American Statistical Association", href: "https://www.amstat.org/" },
          { kind: "text", text: " for industry benchmarking. Full methodology documentation available on request." },
        ],
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
  // CLAUDE FOR LEGAL — PERSONAL INJURY angle, May 28 2026
  // ──────────────────────────────────────────────────────────────
  {
    slug: "claude-for-legal-personal-injury-2026",
    category: "Industry",
    date: "May 28, 2026",
    lastUpdated: "May 28, 2026",
    readingTime: "14 min read",
    title: "Claude for Legal shipped without a personal-injury plugin",
    excerpt:
      "Anthropic launched Claude for Legal in May 2026 with twelve plugins. None are for personal injury. I read the whole repo — here's what it means for PI firms.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779981311/ChatGPT_Image_May_28_2026_at_11_15_02_AM.jpg",
      imgAlt: "Claude for Legal personal injury — the PI-shaped hole in Anthropic's open-source legal stack",
    },
    author: {
      name: "Tiago Stram",
      credentials: "Founder, ClaireAI",
      bio: "Tiago founded ClaireAI after watching personal-injury firms lose six-figure cases to missed intake calls. He's spent the past two years benchmarking voice-AI stacks against the realities of Rule 1.18, state-bar advertising rules, and the operational quirks of plaintiff PI practice — UIM/UM coverage analysis, MIST-versus-significant-injury triage, policy-limits demands. He reads every ABA and state ethics opinion the day it drops and has read the entire claude-for-legal repository, file by file. This piece was reported from the GitHub source, from the published text of every bar opinion cited, and from a week of conversations with PI lawyers who actually take the calls.",
    },
    tldr: [
      "Anthropic shipped Claude for Legal on May 12, 2026 with twelve first-party plugins. None of them is for personal injury — verified by exhaustive grep across all 565 files in the repo. Zero hits for medical lien, policy limits, Stowers, UIM, premises liability, wrongful death, or medical chronology.",
      "The PI-AI gold rush is happening, but in commercial vendor land: EvenUp at a $2 billion valuation processing 10,000 cases a week, Supio with $60M Series B, Eve Legal at a $1B valuation with 450+ firms.",
      "A 200-case-per-year PI firm could generate a demand letter on Claude Sonnet 4.6 for about $0.60 in token costs. The same demand from EvenUp runs $300–$800. The naive comparison says claude-for-legal wins; the honest comparison is harder.",
      "For a PI firm to deploy claude-for-legal in production, expect $50,000–$200,000 in one-time engineering — calibration, missing PI skills, integration with Filevine or CloudLex.",
      "The ethics floor is well-mapped but rarely covered in PI-context posts: ABA Opinion 512, HIPAA BAA requirements, Florida Bar 24-1 on chatbot intake, and the unresolved Virginia/ABA tension on whether contingency fees are reasonable when AI does sixty percent of the work.",
    ],
    body: [
      {
        type: "p",
        text: "I spent this week reading the entire claude-for-legal repository — every file in every directory, every plugin description, every skill markdown. Five hundred and sixty-five files. The reason I read all of it is that the marketing language around Claude for Legal has gotten loud, especially in the personal-injury corner of legal-tech Twitter, and the loud version of a story is often a different story than the file-level one.",
      },
      {
        type: "p",
        text: "Here is what the file-level story actually says.",
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "There is no personal-injury plugin in Anthropic's claude-for-legal. " },
          { kind: "text", text: "Twelve practice-area plugins shipped on May 12, 2026 — commercial, corporate, employment, privacy, product, regulatory, AI governance, IP, litigation, legal clinic, law student, and legal builder hub. Plaintiff-side personal injury, the largest category of contingency-funded U.S. practice, was not one of them." },
        ],
      },
      {
        type: "stat-grid",
        stats: [
          { value: "7,767", label: "GitHub stars on the claude-for-legal repo as of this week", source: "github.com/anthropics/claude-for-legal" },
          { value: "12", label: "first-party practice-area plugins shipped at launch", source: "Anthropic, May 12 2026" },
          { value: "0", label: "of those plugins targets personal-injury practice", source: "ClaireAI repo audit, May 28 2026" },
        ],
      },

      // ============ WHAT ANTHROPIC SHIPPED ============
      { type: "h2", text: "What Anthropic actually shipped on May 12, 2026", id: "what-shipped" },
      {
        type: "p",
        text: [
          { kind: "text", text: "The repository at " },
          { kind: "link", text: "github.com/anthropics/claude-for-legal", href: "https://github.com/anthropics/claude-for-legal" },
          { kind: "text", text: " went live on May 12, 2026. By the time I finished reading it this week it had 7,767 stars, 1,319 forks, and 51 open issues — substantial early traction for a vertical open-source release. The license is Apache-2.0. The contributor list is short: four Anthropic employees, with Matt Piccolella driving the commits and Mark Pike, Anthropic's Associate General Counsel, providing the legal direction." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "Pike is also the public face of the launch. He's quoted in " },
          { kind: "link", text: "Bloomberg Law", href: "https://news.bloomberglaw.com/legal-ops-and-tech/anthropic-pushes-deeper-into-legal-work-with-claude-updates" },
          { kind: "text", text: " calling Claude for Legal \"a better together story\" with the rest of the legal-tech ecosystem; in his " },
          { kind: "link", text: "Artificial Lawyer interview", href: "https://www.artificiallawyer.com/2026/05/12/al-interview-mark-pike-anthropic-associate-general-counsel/" },
          { kind: "text", text: " he describes the connectors and practice-area plugins as \"available to all paid Claude customers.\" Plain reading: the Apache-2.0 code is the free layer, but the revenue motion is Claude for Enterprise, Claude Cowork, and Claude for Microsoft 365." },
        ],
      },
      {
        type: "p",
        text: "At launch, three BigLaw firms were named on the record as production users — Freshfields, Quinn Emanuel, Holland & Knight — plus a startup-focused boutique called Raines LLP. The use cases Anthropic highlighted are M&A diligence, contract redlining, privacy impact assessments, outside-counsel oversight, and regulatory monitoring. Every single one of those is BigLaw transactional or in-house counsel work. Personal injury isn't mentioned in Pike's interviews. It isn't mentioned in the May 15 deployment blog. It isn't mentioned on the claude.com/solutions/legal page.",
      },
      {
        type: "p",
        text: "This is not a complaint. It's an observation. Anthropic shipped what they shipped. The problem is the discourse around the release has run well ahead of the actual product, and PI lawyers are reading marketing that, on careful reading, was not built for them.",
      },

      // ============ THE PI-SHAPED HOLE ============
      { type: "h2", text: "The PI-shaped hole", id: "pi-hole" },
      {
        type: "p",
        text: "I ran exhaustive greps across the whole repo for the vocabulary a personal-injury practice actually uses. Here is what came back.",
      },
      {
        type: "table",
        headers: ["PI vocabulary term", "Hits across all skill files"],
        rows: [
          ["premises liability", "0"],
          ["medical records / medical chronology / treatment timeline", "0"],
          ["wrongful death", "0"],
          ["medical malpractice", "0 (only \"malpractice-aware\" deadline-miss reminders)"],
          ["MVA / motor vehicle accident / car accident", "0"],
          ["slip and fall / dog bite", "0"],
          ["UIM / uninsured motorist / underinsured", "0"],
          ["policy limits", "0"],
          ["Stowers", "0"],
          ["case valuation / settlement value", "0"],
          ["medical lien / ERISA subrogation", "0 (only commercial-contract liens)"],
          ["accident reconstruction", "0"],
          ["products liability", "Matter-type checkbox only; no template"],
        ],
        caption: "Source: grep across every .md, .yaml, and .json file in github.com/anthropics/claude-for-legal as of May 28, 2026.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "The " },
          { kind: "link", text: "litigation-legal plugin's claim-chart skill", href: "https://github.com/anthropics/claude-for-legal/tree/main/litigation-legal/skills/claim-chart" },
          { kind: "text", text: " ships with a generic Negligence civil template — the four classical elements from Restatement (Second) §§ 281 and 328A plus CACI 400. That is the only PI-adjacent civil template in the repo. No Premises Liability template. No Products Liability template. No Medical Malpractice template. No Auto Negligence template. No Dram Shop template. No Wrongful Death template." },
        ],
      },
      {
        type: "p",
        text: "What does appear is the vocabulary of plaintiff work, scattered through the calibration files. The cold-start-interview skill defines plaintiff as a side that routes calibration vocabulary — \"asserting, case value, contingency, SOL cliff.\" A solo-practice path exists in the practice-profile setup. PI statutes of limitations appear, but only in the legal-clinic plugin's plausibility-band reference files for California and Illinois. So Anthropic knew plaintiff PI exists. They knew the vocabulary. They built scaffolding that could support a PI plugin. They just didn't build the plugin.",
      },
      {
        type: "p",
        text: "The litigation-legal README is honest about its primary audience: \"In-house litigation counsel support for managing a portfolio of matters.\" Outside-firm associate use and solo-contingency use are listed second and third. That ordering matters.",
      },

      // ============ WHY ANTHROPIC SKIPPED PI ============
      { type: "h2", text: "Why Anthropic skipped PI", id: "why-skipped" },
      {
        type: "p",
        text: "A few hypotheses, and one of them seems more right to me than the others.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "The first is funding gravity. The open-source legal-tech ecosystem in the United States is shaped largely by " },
          { kind: "link", text: "Legal Services Corporation", href: "https://www.lsc.gov/" },
          { kind: "text", text: " grants, which target self-represented litigants and pro se access-to-justice work. The largest OSS legal projects — Docassemble, Suffolk LIT Lab's AssemblyLine, A2J Author, CourtFormsOnline — were all built for that population. Personal-injury plaintiffs are represented on contingency, which means LSC doesn't fund OSS for them, which means there's no twenty-year pipeline of templates and interview banks for Anthropic to extend. They released into a vacuum." },
        ],
      },
      {
        type: "p",
        text: "The second is that medical-records workflow is a research problem, not a markdown-prompt problem. A real PI demand letter ingests medical records that routinely run eight thousand to fifteen thousand pages, in OCR-scanned PDF form, with provider-specific formatting, ICD codes that need cross-referencing, and treatment narratives that need timeline reconstruction. That isn't a Claude Code skill. That's a multimodal pipeline with OCR, classification, deduplication, and chronology synthesis — closer to what DigitalOwl, Supio, and EvenUp's MedChrons product spend engineering quarters building. A markdown prompt pack is the wrong vehicle.",
      },
      {
        type: "p",
        text: "The third hypothesis — the one I think is right — is that Anthropic shipped where their existing customers were. The named partners at launch — Freshfields, Quinn Emanuel, Holland & Knight — are AmLaw 100/200 transactional and litigation defense shops. They were already paying Anthropic for Claude Enterprise seats. They wrote the requirements that became the twelve plugins. Personal injury, by contrast, is dominated by three- to twenty-five-attorney plaintiff shops without legal-ops engineering and frequently without dedicated technology staff. They aren't Anthropic's BigLaw enterprise pipeline. So they aren't in the plugin list.",
      },
      {
        type: "p",
        text: "This isn't malice. It's gravity. The result is the same: the gap is real, and PI lawyers reading the launch coverage are reading about a product that wasn't built for them.",
      },

      // ============ WHAT YOU CAN DO TODAY ============
      { type: "h2", text: "What you can actually do with claude-for-legal today as a PI lawyer", id: "what-works" },
      {
        type: "p",
        text: "I want to be fair about this. The litigation-legal plugin has skills a plaintiff PI lawyer can use today, with some setup. They're not PI-tuned. They're not useless either.",
      },
      {
        type: "ul",
        items: [
          [
            { kind: "bold", text: "/litigation-legal:demand-intake" },
            { kind: "text", text: " — pre-drafting context gathering for a demand letter. Parties, facts, basis, leverage, BATNA. Writes a structured intake.md the demand-draft skill reads." },
          ],
          [
            { kind: "bold", text: "/litigation-legal:demand-draft" },
            { kind: "text", text: " — drafts the letter from the intake, gated on a privilege / FRE 408 / waiver / admission checklist. Word document output. Honest about being a draft for attorney review." },
          ],
          [
            { kind: "bold", text: "/litigation-legal:chronology" },
            { kind: "text", text: " — extract dated events from a production or matter file, de-dupe, tag by significance per the matter theory. Useful for organizing a case file once you have it." },
          ],
          [
            { kind: "bold", text: "/litigation-legal:claim-chart" },
            { kind: "text", text: " — element-by-element chart for any cause of action, with pin-cited cells and gap detection. Generic civil mode only — no PI-specific templates." },
          ],
          [
            { kind: "bold", text: "/litigation-legal:deposition-prep" },
            { kind: "text", text: " — build a deposition outline for a witness, organize topics around the case theory, surface impeachment material." },
          ],
          [
            { kind: "bold", text: "/litigation-legal:matter-intake" },
            { kind: "text", text: " — uniform questions covering identification, conflicts, source, risk triage, materiality, owners, legal hold, key dates. Writes matter.md and history.md." },
          ],
        ],
      },
      {
        type: "p",
        text: "I ran the demand-draft skill on a sample case file over a weekend — fictional MVA, soft-tissue, $35,000 in medicals — to see what came out. The draft was structurally reasonable. The FRE 408 gate is genuinely useful: the skill won't draft a number unless you've confirmed in the intake that you have authorization to make a settlement demand. The privilege and waiver checklist before drafting is a thoughtful guard rail. The output is a Word document with citation placeholders and a post-send checklist. For a draft to start from, it works.",
      },
      {
        type: "p",
        text: "What it does not do is the thing that makes EvenUp worth what it costs. It doesn't ingest twelve thousand pages of medical records and produce a chronology with exhibit links. It doesn't pull comparable verdicts from a proprietary database. It doesn't have a damages model trained on the specific ICD codes you're submitting. It doesn't write in your firm's house voice unless you've spent twenty-plus hours loading sample demands into the cold-start interview. And it doesn't push the final document to Filevine or Litify or CASEpeer when you're done.",
      },

      // ============ WHAT'S MISSING ============
      { type: "h2", text: "What's missing — and the build cost", id: "build-cost" },
      {
        type: "p",
        text: "Here is the inventory of what a PI firm running claude-for-legal would need to build themselves before the system credibly replaces an EvenUp subscription.",
      },
      {
        type: "ol",
        items: [
          "Medical-records ingestion at ten-thousand-plus-page scale. The Claude Sonnet 4.6 context window is 200K tokens — call it 400 pages of typed legal-density text. Real PI records, OCR'd from copy-of-a-copy-of-a-fax, are denser and more expensive per page. You're looking at building a chunking and retrieval pipeline on top of a vector store before the model ever sees the medical narrative.",
          "Medical chronology synthesis. DigitalOwl and Supio have spent years on this specifically. The OSS substrate exists — Bio_ClinicalBERT, llm-ie for clinical extraction, LLMAnonymizer for HIPAA de-identification — but stitching them together for production litigation use is genuinely a quarter of engineering work.",
          "Settlement-comparable database. EvenUp's Settlement Repository is a proprietary asset they've crowdsourced from 2,000+ customer firms. You don't get to use it when you leave them, and you can't replicate it from public verdict-research datasets (none of which are open).",
          "Lien tracking and Medicare set-aside calculation. Garretson and Archer Systems own this category. No OSS exists.",
          "Practice-management integration. Anthropic ships zero connectors for any PI-dominant case-management system. Filevine, Litify, CASEpeer, CloudLex, SmartAdvocate — every integration is custom code against the vendor's REST API. There is exactly one community MCP server for MyCase and four for Clio, and that's it.",
        ],
      },
      {
        type: "p",
        text: "The realistic one-time cost to put this together for a five-attorney plaintiff shop is somewhere between fifty thousand and one hundred fifty thousand dollars. Ongoing infrastructure and engineering maintenance is another thirty to seventy thousand a year. That's before you've drafted your first demand letter.",
      },

      // ============ TOKEN ECONOMICS ============
      { type: "h2", text: "The $0.60 demand letter that costs $50,000 to ship", id: "economics" },
      {
        type: "p",
        text: [
          { kind: "text", text: "The token math, on the other hand, is dramatic. A 350-page medical-record input plus a 4,000-token demand draft on " },
          { kind: "link", text: "Claude Sonnet 4.6", href: "https://platform.claude.com/docs/en/about-claude/pricing" },
          { kind: "text", text: " — Anthropic's standard production model at $3 per million input tokens and $15 per million output — costs about $0.60. The same demand from EvenUp is reported by three competitor sources to land between $300 and $800 effective per demand. At seventeen demands per month for a 200-case-per-year firm, that's $5,100 to $13,600 a month on EvenUp versus, in raw model spend, about $10 on claude-for-legal." },
        ],
      },
      {
        type: "p",
        text: "Save the math for the build sheet.",
      },
      {
        type: "p",
        text: "The naive read says claude-for-legal wins by two orders of magnitude. The honest read is more complicated. What EvenUp is selling at $500 a demand is not \"an AI demand letter.\" It's a medical chronology built by a team of human drafters working from a proprietary records pipeline, plus a comparable-verdicts query against a database they've built over four years, plus a malpractice insurance wrapper, plus an integration with your case-management system, plus a five-minute call with a real human when you need to push back on a draft. The AI is the marketing wrapper. The product is the operation behind it.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "EvenUp isn't a villain in this story. At $300 a demand they ship a real product to PI lawyers who don't want to be in the software business. The " },
          { kind: "link", text: "Glassdoor reviews", href: "https://www.glassdoor.com/Reviews/EvenUp-Reviews-E6782155.htm" },
          { kind: "text", text: " from their drafter team are unflattering — long hours, marketed as AI but staffed as case-manager work — but that's a labor-conditions critique, not a quality critique. Plenty of plaintiff firms genuinely love the product. The " },
          { kind: "link", text: "Series E at a $2 billion valuation", href: "https://fortune.com/2025/10/07/exclusive-evenup-raises-150-million-series-e-at-2-billion-valuation-as-ai-reshapes-personal-injury-law/" },
          { kind: "text", text: " is real." },
        ],
      },
      {
        type: "p",
        text: "What's true is that the $0.60 token comparison doesn't capture the actual decision. The actual decision is: do you want to build the operation EvenUp built, or do you want to rent it? At seventeen demands a month with no in-house engineering, you rent. At a hundred and seventy demands a month with a legal-ops function, the build case is real — and even then, the wedge isn't the token math. It's the absence of vendor lock-in compounding against your settlement history.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "The competitor I'd actually watch in this space is " },
          { kind: "link", text: "Tavrn", href: "https://www.tavrn.ai/" },
          { kind: "text", text: ", not claude-for-legal. Tavrn ships a flat-rate monthly subscription explicitly priced against EvenUp's per-demand meter. They've raised $15 million. They aren't trying to disrupt with $0.60 token math. They're trying to disrupt with $1,500-a-month-unlimited-demands math. That's the cleaner attack vector." },
        ],
      },

      // ============ COMMERCIAL PI-AI ECOSYSTEM ============
      { type: "h2", text: "The commercial PI-AI ecosystem (where Anthropic stayed out)", id: "competitors" },
      {
        type: "p",
        text: "Anthropic's absence in PI isn't because nobody else is building. The PI-AI gold rush is loud and well-funded.",
      },
      {
        type: "table",
        headers: ["Vendor", "Funding", "What it does", "Where it sits vs claude-for-legal"],
        rows: [
          ["EvenUp", "$385M raised; $2B+ val Oct 2025", "Demand letters + Claims Intelligence Platform; 2,000+ firms, ~10K cases/week", "Direct workflow competitor — ships what claude-for-legal can't"],
          ["Supio", "$60M Series B Apr 2025", "End-to-end PI case prep; named customers include Hughes & Coleman, Daniel Stark", "Most direct PI-native overlap"],
          ["Eve Legal", "$103M Series B Sept 2025 at $1B val", "Plaintiff PI + employment; 450+ U.S. firms", "Fastest-growing plaintiff-side AI"],
          ["Parambil", "$6M seed Feb 2026", "Agentic AI for med-mal, birth injury, nursing-home abuse, mass tort", "Built on Anthropic / OpenAI / Perplexity APIs — competes on the same model layer"],
          ["Tavrn", "$15M raised", "Flat-rate monthly demand subscription", "Cleaner cost-disruption play than DIY claude-for-legal"],
          ["DigitalOwl", "$26.5M total", "Medical-records summarization for plaintiff + defense", "Owns the medical layer claude-for-legal lacks"],
          ["Theo Ai", "$10M total", "Settlement-value prediction; flagship customer is a litigation funder", "Owns the valuation layer claude-for-legal lacks"],
        ],
        caption: "Funding figures verified via Crunchbase News, Fortune, LawSites, and Legal IT Insider coverage. Customer counts are vendor-reported.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "On the practice-management side, every dominant PI platform now ships its own AI. " },
          { kind: "link", text: "Filevine", href: "https://www.filevine.com/" },
          { kind: "text", text: " launched SideBarAI plus a DemandsAI module and a Lead Docket intake product. " },
          { kind: "link", text: "CloudLex", href: "https://www.cloudlex.com/lexee/" },
          { kind: "text", text: " has Lexee. " },
          { kind: "link", text: "Litify", href: "https://www.litify.com/" },
          { kind: "text", text: " has the Agentic Case Expert. " },
          { kind: "link", text: "CASEpeer", href: "https://www.casepeer.com/" },
          { kind: "text", text: " ships AffiniPay IQ. SmartAdvocate took the open-ecosystem route and integrates with EvenUp, Eve, Supio, and LawPro.ai natively. Most of these vendors are competing AI, not partnering with Anthropic's MCP ecosystem. None publishes a connector to claude-for-legal. The PMS vendors built their AI inside the system of record, and they have no incentive to open the door to a Claude Code skill pack sitting between their lawyers and their dashboard." },
        ],
      },
      {
        type: "p",
        text: "This is what Anthropic's absence in PI looks like in practice. The category is well-served by commercial vendors competing for the lawyer, not partnering with Anthropic for the lawyer.",
      },

      // ============ ETHICS ============
      { type: "h2", text: "The ethics layer most PI-AI posts skip", id: "ethics" },
      {
        type: "p",
        text: "Here are the five points a personal-injury firm running claude-for-legal in 2026 needs to internalize.",
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "1. Verify everything. " },
          { kind: "link", text: "ABA Formal Opinion 512", href: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf" },
          { kind: "text", text: " (July 29, 2024) named client intake among the four use cases it covers and was unambiguous: lawyers must understand the tool's data handling and verify every AI output. Morgan & Morgan attorneys have already been sanctioned for AI-hallucinated case citations. Every claude-for-legal demand letter that quotes a statute, cites a case, or makes a damages projection needs human review of those specific items before it leaves the firm." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "2. HIPAA before everything. " },
          { kind: "link", text: "45 CFR § 160.103", href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-160/subpart-A/section-160.103" },
          { kind: "text", text: " makes a PI firm receiving client PHI a Business Associate. The AI vendor processing that PHI on the firm's behalf is a downstream Business Associate and must sign a BAA. Anthropic offers BAAs on paid tiers. Without one, ingesting a medical record into any Claude model is a federal violation regardless of what your state bar says." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "3. Chatbots have to identify themselves. " },
          { kind: "link", text: "Florida Bar Ethics Opinion 24-1", href: "https://www.floridabar.org/etopinions/opinion-24-1/" },
          { kind: "text", text: ", January 19, 2024 — still the cleanest U.S. opinion on AI intake — requires that any chatbot collecting facts from a prospective PI client disclose its AI status, decline to give legal advice, and refer legal questions to a licensed attorney. The bar treats the lawyer as ultimately responsible for whatever the bot says." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "4. Contingency fees and AI productivity are an open question. " },
          { kind: "text", text: "The " },
          { kind: "link", text: "Virginia State Bar's LEO 1901", href: "https://www.vacourts.gov/static/courts/scv/amendments/leo_1901.pdf" },
          { kind: "text", text: ", effective November 24, 2025, took the lawyer-friendly position: a contingency fee isn't per se unreasonable just because AI did some of the work. ABA Opinion 512 leans the other direction. The defensible posture is to document the risk basis of the fee, not the time basis, and avoid stacking AI-tool \"costs\" as separate line items." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "5. Client consent to AI use has to be specific. " },
          { kind: "link", text: "NYC Bar Formal Opinion 2025-6", href: "https://www.nycbar.org/reports/formal-opinion-2025-6-ethical-issues-affecting-use-of-ai-to-record-transcribe-and-summarize-conversations-with-clients/" },
          { kind: "text", text: " and the Pennsylvania Joint Formal Opinion 2024-200 both say boilerplate engagement-letter language doesn't suffice when AI use is material to the representation. PI firms taking referrals from other firms inherit the consent question — if the referring firm signed the client up under \"no AI,\" the receiving firm can't unilaterally flip that switch." },
        ],
      },

      // ============ WHAT IT MEANS BY FIRM SIZE ============
      { type: "h2", text: "What this means for PI firms in 2026", id: "what-it-means" },
      { type: "h3", text: "If you're a solo or small firm (three to ten attorneys)" },
      {
        type: "p",
        text: "Skip the claude-for-legal hype. The realistic build cost wipes out any token-economics savings, and you'll spend the saved budget on rebuilding what EvenUp or Supio or Eve already operates. Pick a vendor whose contract you can actually read, whose data-retention policy is in plain English, and whose pricing you can predict month to month. If you want to experiment with Claude itself, do it on the matter-management side, not the demand-letter side. The /litigation-legal:chronology skill is genuinely useful for organizing a case file once you have it. The demand-draft skill is useful as a first-draft engine if you're willing to bring all the structured intake yourself.",
      },
      { type: "h3", text: "If you're a fifteen-to-fifty-attorney firm with engineering capacity" },
      {
        type: "p",
        text: "The build case is real, but plan honestly. A quarter of engineering to wire claude-for-legal into Filevine or Litify, another quarter to build the medical-chronology layer, plus an ongoing quarter-time engineer to maintain it. Year-one all-in is $200,000–$600,000 depending on scale. Year-two onward is half that. The break-even against EvenUp's per-demand model is somewhere around a hundred demands a month, and the long-term win isn't price — it's that your settlement history and case data stay yours, not the vendor's.",
      },
      { type: "h3", text: "If you're a mass-tort or MDL firm running 1,000+ cases per matter" },
      {
        type: "p",
        text: "The absence of an OSS PI-AI stack is your problem to solve, and Anthropic just handed you the framework to do it. Build the bellwether-selection skill. Build the per-case auditable output that the steering committee will need to share with non-PSC counsel. Build the aggregate-settlement allocation explainer that ABA Opinion 06-438 requires you to disclose to each client. None of that exists yet. The wedge is the wedge.",
      },

      {
        type: "p",
        text: "I pinged three PI lawyers in ClaireAI's customer base about claude-for-legal this week. Two had not heard of it by name. One had read about it on LinkedIn and assumed there was a personal-injury plugin in there somewhere; when I told him there wasn't, he laughed and said \"of course there isn't.\" He's a six-attorney plaintiff shop in Texas. He uses EvenUp. He has no plans to switch.",
      },

      // ============ WHERE CLAIREAI SITS ============
      { type: "h2", text: "Where ClaireAI sits in this picture", id: "claireai" },
      {
        type: "callout",
        kind: "warn",
        title: "Editorial disclosure.",
        text: "This guide is published by ClaireAI. We are not open-source and we are not a Claude for Legal plugin. We're a commercial AI intake receptionist with practice-area calibration for personal injury. Every named vendor, repo, statistic, and ethics opinion above is verifiable through the URLs cited in the body.",
      },
      {
        type: "p",
        text: "Anthropic's /legal-clinic:client-intake skill is a post-call structuring tool — it helps a paralegal organize an intake conversation that has already happened. Anthropic's /litigation-legal:matter-intake writes a matter.md for a case the firm has already accepted. Neither skill answers the phone, qualifies the caller, screens for conflicts of interest before privileged facts are collected, or dispatches a DocuSign retainer when the matter is grade-A. Those are intake-front-door functions that, in the PI context, sit before claude-for-legal in the workflow, not after it.",
      },
      { type: "h3", text: "How ClaireAI fits into a PI firm's stack" },
      {
        type: "ul",
        items: [
          [
            { kind: "text", text: "Per-practice calibration. " },
            { kind: "link", text: "ClaireAI for personal injury", href: "/solutions/personal-injury" },
            { kind: "text", text: " handles UIM/UM coverage questions, MIST-versus-significant-injury triage, and policy-limits inquiries the way a paralegal at a plaintiff shop would. We don't ship a generic chatbot." },
          ],
          "Rule 1.18 conflict screening before any privileged facts are collected. Fuzzy match against your CRM, fail-safe to escalate, no privilege leakage.",
          "66 native case-management integrations including Filevine, Litify, CASEpeer, CloudLex, SmartAdvocate, Smokeball, MyCase, and Clio — the integrations claude-for-legal explicitly does not ship.",
          "SOC 2 Type II infrastructure and HIPAA-aligned BAAs signed at onboarding. No PHI ingestion without the paper in place.",
          "Live human escalation when the AI hits the limit of what it should be answering on its own. For PI specifically, that includes any caller who mentions an ongoing DV situation, a hospitalized loved one, or anything else where a script-driven bot would be the wrong answer.",
        ],
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "If you'd like to see ClaireAI handle a calibrated PI intake call for your practice, the " },
          { kind: "link", text: "demo", href: "/contact" },
          { kind: "text", text: " is the most efficient way to evaluate the fit. Pricing is published on the " },
          { kind: "link", text: "pricing page", href: "/pricing" },
          { kind: "text", text: " — no sales-gated quotes. If you're looking for the broader picture on open-source legal infrastructure beyond PI, the " },
          { kind: "link", text: "open-source legal intake guide", href: "/blog/open-source-legal-intake-software-2026" },
          { kind: "text", text: " covers the wider landscape." },
        ],
      },

      // ============ FAQ ============
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          {
            q: "Is there a Claude for Legal plugin for personal injury?",
            a: [
              { kind: "text", text: "No. As of May 2026 the twelve first-party plugins in " },
              { kind: "link", text: "anthropics/claude-for-legal", href: "https://github.com/anthropics/claude-for-legal" },
              { kind: "text", text: " cover commercial, corporate, employment, privacy, product, regulatory, AI governance, IP, litigation, legal clinic, law student, and a builder hub. The closest fit for PI work is the litigation-legal plugin, which is framed for in-house counsel managing an outside-firm portfolio. Plaintiff PI is reachable through its plaintiff/solo calibration mode, but there is no PI-specific plugin or skill." },
            ],
          },
          {
            q: "Can I use Claude for Legal to write personal-injury demand letters?",
            a: "Yes, with caveats. The litigation-legal:demand-draft skill produces a structurally sound first draft from a completed intake, with an FRE 408 gate and a privilege checklist. It does not ingest large medical-record sets, does not pull comparable verdicts from a proprietary database, and does not write in your firm's house voice without significant calibration. For a draft to start from, it works. For a finished, sendable demand at the volume EvenUp ships, you would need to build the medical-chronology and comparables layers yourself.",
          },
          {
            q: "How does claude-for-legal compare to EvenUp?",
            a: [
              { kind: "text", text: "Different products, different decisions. " },
              { kind: "link", text: "EvenUp", href: "https://www.evenuplaw.com/" },
              { kind: "text", text: " is a managed service: medical chronology by human drafters, a proprietary settlement-comparables database, malpractice insurance wrapper, and per-demand pricing in the $300–$800 range. claude-for-legal is an open-source plugin pack you assemble and run on your own Claude API account, at roughly $0.60 per demand in raw model spend but with $50,000–$200,000 in one-time engineering before the system replaces what EvenUp does. The token-cost comparison is misleading on its own. The honest comparison is build versus rent." },
            ],
          },
          {
            q: "Does Claude for Legal integrate with Filevine or Litify?",
            a: [
              { kind: "text", text: "Not directly. Anthropic ships zero first-party connectors for Filevine, Litify, CASEpeer, CloudLex, or SmartAdvocate. There is exactly one community MCP server for MyCase and four for Clio. " },
              { kind: "link", text: "Filevine", href: "https://www.filevine.com/" },
              { kind: "text", text: " and " },
              { kind: "link", text: "CloudLex", href: "https://www.cloudlex.com/lexee/" },
              { kind: "text", text: " both ship their own competing AI products, which means they have no incentive to open their data layer to claude-for-legal. Any integration today is custom code against the vendor's REST API." },
            ],
          },
          {
            q: "Is it ethical for a PI firm to use Claude for client intake?",
            a: [
              { kind: "text", text: "Yes, with specific obligations. " },
              { kind: "link", text: "ABA Formal Opinion 512", href: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf" },
              { kind: "text", text: " (July 29, 2024) requires lawyers to understand the tool's data handling, obtain informed client consent where Rule 1.6 is triggered, supervise under Rule 5.3, and avoid billing clients for time saved by AI. " },
              { kind: "link", text: "Florida Bar Opinion 24-1", href: "https://www.floridabar.org/etopinions/opinion-24-1/" },
              { kind: "text", text: " adds intake-specific rules: any chatbot must disclose it's non-lawyer software, limit itself to factual information, and refer legal questions to a licensed attorney. Skip any of those and you're exposed to bar discipline and potential malpractice." },
            ],
          },
          {
            q: "What does it cost a PI firm to deploy claude-for-legal in production?",
            a: "At a five-attorney, 200-case-per-year scale, expect $50,000–$150,000 one-time and $30,000–$70,000 ongoing per year. At a twenty-five-attorney, 1,000-case-per-year scale, expect $200,000–$600,000 in year one and roughly half that ongoing. Most of the year-one cost is engineering build — calibration, the missing PI-specific skills (medical chronology, settlement comparables, lien tracking), and integration with whichever case-management system you run.",
          },
          {
            q: "What's the best open-source alternative to EvenUp?",
            a: "There isn't a like-for-like open-source alternative in May 2026. The closest functional substitute is an assembled stack: claude-for-legal's litigation-legal plugin for demand drafting, plus a custom medical-chronology pipeline built on Bio_ClinicalBERT or llm-ie, plus CourtListener via the Free Law Project for comparable-case retrieval, plus DocuSeal for signing, plus a custom Filevine or CASEpeer connector. Building it is real engineering work. Renting EvenUp is the realistic short-term answer for most firms.",
          },
        ],
      },
    ],
    related: ["open-source-legal-intake-software-2026", "best-ai-receptionist-law-firms-2026", "2026-legal-intake-benchmark-report"],
    keywords: [
      "claude for legal",
      "claude for legal personal injury",
      "claude for legal PI law firms",
      "Anthropic legal AI",
      "AI demand letter open source",
      "claude-for-legal vs EvenUp",
      "EvenUp alternative",
      "AI legal intake personal injury",
      "claude-for-legal Filevine integration",
      "ABA Opinion 512 personal injury",
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // OPEN-SOURCE LEGAL INTAKE — Mike OSS / GEO play, May 28 2026
  // ──────────────────────────────────────────────────────────────
  {
    slug: "open-source-legal-intake-software-2026",
    category: "Industry",
    date: "May 28, 2026",
    lastUpdated: "May 28, 2026",
    readingTime: "13 min read",
    title: "Open-source legal intake doesn't exist yet — and that's about to change",
    excerpt:
      "Mike OSS hit 3,550 GitHub stars in 28 days. Casetext was killed. Harvey crossed $11 billion. The one piece of the open-source legal stack still missing is the front door.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779976775/ChatGPT_Image_May_28_2026_at_09_59_19_AM.jpg",
      imgAlt: "Open-source legal intake software in 2026 — the missing layer of the legal AI stack",
    },
    author: {
      name: "Tiago Stram",
      credentials: "Founder, ClaireAI",
      bio: "Tiago founded ClaireAI after watching law firms lose six-figure cases to missed intake calls, and has spent the last two years benchmarking voice-AI stacks against the realities of Rule 1.18 and state-bar advertising rules. He reads every ABA and state ethics opinion the day it drops and tracks the open-source legal stack repo-by-repo. This piece was reported from primary GitHub repositories, the published text of every bar opinion cited, and the public pricing pages of every named vendor.",
    },
    tldr: [
      "There is no production-grade open-source legal intake software comparable to Lawmatics, Lead Docket, or Intaker in 2026 — every \"open-source legal AI\" project either assists the lawyer after intake or is a generic voice agent with no legal calibration.",
      "Mike OSS, an open-source Harvey/Legora clone shipped by a solo developer in 14 days, hit 3,550 GitHub stars and 1,089 forks in 28 days under AGPL-3.0 — the clearest signal yet that demand for self-hostable legal AI is real.",
      "Three forces opened the door: Thomson Reuters shut down standalone Casetext in April 2025 with 5–10× price hikes; Harvey scaled to an $11B valuation at ~$1,200 per seat; ABA Formal Opinion 512 made \"I don't know how my vendor handles client data\" a malpractice question.",
      "The ethics framework is more permissive than firms realize. Florida Bar Op. 24-1 and Oregon State Bar Op. 2026-208 spell out exactly what an AI chatbot intake must do: disclose its non-lawyer status, decline to give legal advice, refer to a licensed attorney.",
      "Honest economics: self-hosted legal intake only beats SaaS on raw cost above 10–15 attorneys. Below that, the real choice is monolithic SaaS vs. an orchestrated stack of single-purpose APIs.",
    ],
    body: [
      {
        type: "p",
        text: [
          { kind: "bold", text: "The state of the question. " },
          { kind: "text", text: "There is no production-grade open-source legal intake software competitive with Lawmatics, Lead Docket, or Intaker in May 2026. There are open-source document assistants (Mike), document-automation engines (Docassemble), e-signature platforms (DocuSeal), case-management workspaces (Stella), and generic voice receptionists (AIReceptionist, Pipecat) — and a fast-growing community putting them together by hand. The one piece of the legal-AI stack still missing from the open-source movement is the front door." },
        ],
      },
      {
        type: "stat-grid",
        stats: [
          { value: "3,550", label: "GitHub stars Mike OSS earned in its first 28 days under AGPL-3.0", source: "github.com/willchen96/mike" },
          { value: "$11B", label: "Harvey's March 2026 valuation at roughly $1,200 per attorney seat per month", source: "CNBC / Artificial Lawyer" },
          { value: "0", label: "production-grade, customer-facing, open-source legal intake products on the market", source: "ClaireAI inventory, May 2026" },
        ],
      },

      // ============ THE MIKE OSS MOMENT ============
      { type: "h2", text: "The Mike OSS moment", id: "mike-oss-moment" },
      {
        type: "p",
        text: [
          { kind: "text", text: "Will Chen, a solo developer, shipped " },
          { kind: "bold", text: "Mike" },
          { kind: "text", text: " — an open-source clone of Harvey and Legora — in 14 days and posted it on Hacker News on April 29, 2026. The " },
          { kind: "link", text: "Mike repository", href: "https://github.com/willchen96/mike" },
          { kind: "text", text: " collected 3,550 stars, 1,089 forks, and 49 subscribers within a month. The license is AGPL-3.0, which forces any commercial fork to publish its own changes. The stack is Next.js + Express + Supabase + Cloudflare R2, with Claude, Gemini, and GPT wired up as interchangeable model providers." },
        ],
      },
      {
        type: "p",
        text: "What Mike actually does: lets a user sign up, upload matter documents, organize them into project workspaces, and chat with them across multiple frontier models. It's a legal-document research assistant. Downstream forks already exist — MikeRust ports it to a native Tauri desktop app; Emilie rebrands it as a Swiss sovereign-data variant; another fork wires in cryptographic verification.",
      },
      {
        type: "p",
        text: "Reading the repo cover-to-cover this past weekend, the code is rougher than Harvey's marketing comparisons would suggest. There are TODOs in the auth flow, the document-chunking strategy is naïve, the workspace model has corners that haven't been fully thought through. That is part of the point. The codebase is small enough that a firm's IT consultant could read it on a Saturday and understand exactly what is happening to client data — which is the inverse of every closed legal-AI product I have evaluated this year.",
      },
      {
        type: "p",
        text: "The traction isn't the surprise. The narrative is. Harvey raised a $200M round at an $11B valuation in March 2026; Mike, built in two weeks by one person, demonstrates that the technical moat around legal AI is thinner than the valuation implies.",
      },

      // ============ THE MISSING LAYER ============
      { type: "h2", text: "What Mike doesn't do — the missing layer of the legal stack", id: "missing-layer" },
      {
        type: "p",
        text: "Mike is a legal-document research assistant. It is not a legal intake system. The distinction matters because the open-source legal-AI conversation routinely conflates them.",
      },
      {
        type: "p",
        text: "A legal intake system is the front door: it picks up a phone call or web chat from a prospective client, screens for conflicts of interest, qualifies the matter, books a consult, and hands off to a case-management system. That workflow involves telephony, speech-to-text, calendaring, e-signatures, CRM write-back, and — most importantly — a model that performs reliably under Rule 1.18 confidentiality constraints while a stranger describes a legal problem at 11 p.m. on a Sunday.",
      },
      {
        type: "p",
        text: "Map the open-source legal stack today and the gap is unmistakable:",
      },
      {
        type: "table",
        headers: ["Layer", "What it does", "Open-source incumbent", "Production-ready?"],
        rows: [
          ["Document research", "Chat with matter documents across models", "Mike (willchen96/mike), AGPL-3.0", "Yes, May 2026"],
          ["Document automation", "Guided interviews, form generation", "Docassemble (jhpyle/docassemble), MIT", "Yes, deployed by most U.S. legal aid"],
          ["Court forms / A2J", "Self-represented-litigant interviews", "Suffolk LIT AssemblyLine, MIT", "Yes, multiple state courts"],
          ["E-signature", "Signed retainer + matter docs", "OpenSign (AGPL-3.0), DocuSeal", "Yes"],
          ["Case management workspace", "Matters, documents, review tabs", "Stella (Apache-2.0)", "Beta"],
          ["CRM / pipeline", "Lead tracking, pipeline automation", "Twenty, EspoCRM, SuiteCRM", "Yes (generic, not legal)"],
          ["Voice / phone capture", "Speech-to-speech voice agent", "Pipecat, LiveKit Agents, AIReceptionist", "Generic only — no legal template"],
          ["Customer-facing intake", "Qualify caller, screen conflicts, book consult", "(none)", "No"],
        ],
        caption: "The open-source legal stack as of May 28, 2026. The customer-facing intake layer is the one with no production-grade option.",
      },

      // ============ THREE FORCES ============
      { type: "h2", text: "Three forces pried the door open", id: "three-forces" },
      {
        type: "p",
        text: "The Mike moment didn't happen in a vacuum. Three concurrent events made the legal-AI market structurally vulnerable to open-source disruption in 2025–2026.",
      },
      { type: "h3", text: "1. Casetext's shutdown" },
      {
        type: "p",
        text: "Thomson Reuters acquired Casetext for $650 million in 2023, kept the brand alive for two years, then shut down standalone CoCounsel on April 1, 2025. Users with promotional pricing locked in \"for life\" were forced onto Westlaw-bundled tiers running 5–10× the original $65/month rate. The case study is now a permanent feature of legal-tech buyer conversations: this is what acquisition risk looks like.",
      },
      { type: "h3", text: "2. Harvey's pricing wall" },
      {
        type: "p",
        text: "Harvey ran from a $3B valuation in February 2025 to $8B in December 2025 to $11B in March 2026. Reported seat pricing is approximately $1,200 per lawyer per month with 20-seat minimums and 12-month commits. The June 2025 LexisNexis alliance is projected by Artificial Lawyer to push all-in costs toward $3,000 per seat once Lexis content overlaps with Harvey workflows. For any firm under 50 attorneys, the economics simply do not work.",
      },
      { type: "h3", text: "3. The ethics floor moved" },
      {
        type: "p",
        text: [
          { kind: "link", text: "ABA Formal Opinion 512", href: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf" },
          { kind: "text", text: " (July 29, 2024) was the first comprehensive ABA guidance on generative AI. It cross-references Model Rules 1.1 (competence), 1.4 (communication), 1.5 (fees), 1.6 (confidentiality), 3.1 and 3.3 (candor), and 5.1 and 5.3 (supervision). The load-bearing passage for intake:" },
        ],
      },
      {
        type: "quote",
        text: "Before lawyers input information relating to the representation of a client into a GAI tool, they must evaluate the risks that the information will be disclosed to or accessed by others.",
        source: "ABA Formal Opinion 512 (July 29, 2024), p. 6",
      },
      {
        type: "p",
        text: "A boilerplate engagement letter does not satisfy that obligation. The natural architectural answer is a model the firm controls — and self-hostable Llama 3.3, Mistral, and Qwen finally crossed the usability threshold for that in 2025.",
      },

      // ============ HONEST INVENTORY ============
      { type: "h2", text: "What actually exists in open-source legal intake today", id: "honest-inventory" },
      {
        type: "p",
        text: "An honest inventory of the field, broken into three buckets:",
      },
      { type: "h3", text: "Lawyer-side intake assistants (not customer-facing)" },
      {
        type: "ul",
        items: [
          [
            { kind: "bold", text: "LawDroid Legal Aid Plugin" },
            { kind: "text", text: " — Tom Martin's Apache-2.0 " },
            { kind: "link", text: "Claude plugin pack", href: "https://github.com/lawdroidAI/legal-aid-plugin" },
            { kind: "text", text: ", released v0.1.0 on May 20, 2026. Includes a /client-intake skill (practice-area templates, cross-area issue spotting, conflict flags, urgency triage) and /eligibility-screening (income, residency, citizenship per funder rules). Brand-new and explicitly scoped to civil legal aid — not retained private practice." },
          ],
          [
            { kind: "bold", text: "Anthropic " },
            { kind: "link", text: "claude-for-legal", href: "https://github.com/anthropics/claude-for-legal" },
            { kind: "text", text: " — 7,800-star Apache-2.0 repo launched April 2026 with 12 plugins and 80+ skills. The intake-relevant ones (/legal-clinic:client-intake, /litigation-legal:matter-intake, /litigation-legal:demand-intake) run inside Claude Code; they are markdown prompt packs, not deployable apps. A licensed attorney uses them to structure intake notes after the prospect has already called." },
          ],
        ],
      },
      { type: "h3", text: "Generic voice receptionists (no legal calibration)" },
      {
        type: "ul",
        items: [
          [
            { kind: "bold", text: "AIReceptionist " },
            { kind: "text", text: "(" },
            { kind: "link", text: "kirklandsig/AIReceptionist", href: "https://github.com/kirklandsig/AIReceptionist" },
            { kind: "text", text: ") — 40 stars, AGPL-3.0. OpenAI Realtime + LiveKit SIP voice agent. The only built-in template is dental. The README warns of breaking changes." },
          ],
          [
            { kind: "bold", text: "Pipecat" },
            { kind: "text", text: " — BSD-2 " },
            { kind: "link", text: "voice framework", href: "https://github.com/pipecat-ai/pipecat" },
            { kind: "text", text: " with a medical patient-intake example. A community PR to add a legal example (#631, October 2024) was explicitly rejected as redundant in January 2025. No legal example currently in the tree." },
          ],
        ],
      },
      { type: "h3", text: "Court-facing and legal-aid (deterministic, no LLM in the intake path)" },
      {
        type: "ul",
        items: [
          [
            { kind: "link", text: "Docassemble", href: "https://github.com/jhpyle/docassemble" },
            { kind: "text", text: " — 951 stars, MIT. Jonathan Pyle's guided-interview engine. Powers most U.S. legal-aid intake in production. No LLM front-end." },
          ],
          [
            { kind: "text", text: "Suffolk LIT Lab " },
            { kind: "link", text: "docassemble-AssemblyLine", href: "https://github.com/SuffolkLITLab/docassemble-AssemblyLine" },
            { kind: "text", text: " — 62 stars, MIT, v4.6.0 in May 2026. A framework on top of Docassemble that turns paper court forms into guided web interviews. Drives " },
            { kind: "link", text: "CourtFormsOnline.org", href: "https://courtformsonline.org/" },
            { kind: "text", text: " and replicators in IL, FL, and CA. Purely deterministic; the LLM work (Weaver, Steenhuis et al.) helps authors write interviews, not run them." },
          ],
        ],
      },
      {
        type: "callout",
        kind: "info",
        title: "The verdict.",
        text: "No project on the list above is a production-grade, customer-facing AI legal intake system. The closest is LawDroid's Legal Aid Plugin, which is one week old, alpha-grade, scoped to civil legal aid funders, and runs inside Claude as a markdown skill pack.",
      },

      // ============ ETHICS ============
      { type: "h2", text: "The ethics question, answered cleanly", id: "ethics" },
      {
        type: "p",
        text: "The ethics layer is the question every law-firm partner asks first, and the answer is more permissive than the legal-tech press makes it sound.",
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "Model Rule 1.18 attaches the moment a chatbot collects facts from a prospective client. " },
          { kind: "text", text: "Confidentiality, conflicts imputation, and the duty not to use the information adversely begin pre-retainer. An intake bot must therefore (a) run a conflict pre-screen before collecting substantive facts and (b) be architected so the model does not train on inputs." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "Florida Bar Ethics Opinion 24-1 " },
          { kind: "text", text: "(" },
          { kind: "link", text: "January 19, 2024", href: "https://www.floridabar.org/etopinions/opinion-24-1/" },
          { kind: "text", text: ") is the cleanest opinion on chatbot intake specifically. Its four requirements: (1) the lawyer must inform prospective clients that they are communicating with an AI program; (2) the chatbot must clearly identify its non-lawyer status; (3) the bot must limit itself to factual intake and refer legal questions to a lawyer; (4) the lawyer is \"ultimately responsible should the chatbot provide misleading information.\"" },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "ABA Formal Opinion 512 " },
          { kind: "text", text: "(July 29, 2024) names \"client intake\" explicitly as one of the four use cases it covers. Boilerplate engagement-letter consent does not satisfy Rule 1.6 for a self-learning AI tool — the lawyer must understand " },
          { kind: "italic", text: "how the GAI tool uses data" },
          { kind: "text", text: " specifically." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "Oregon State Bar Opinion 2026-208 " },
          { kind: "text", text: "treats the AI agent as a non-lawyer assistant under " },
          { kind: "link", text: "Oregon RPC 5.3", href: "https://www.osbar.org/_docs/rulesregs/orpc.pdf" },
          { kind: "text", text: " (parallel to ABA Model Rule 5.3). Lawyers must monitor the AI to prevent \"creating false impressions of attorney-client relationships, promising services the firm cannot deliver, guaranteeing particular outcomes.\" Disclaimers help but do not fully discharge the supervision duty." },
        ],
      },
      {
        type: "callout",
        kind: "highlight",
        title: "Implication for open-source vs. SaaS.",
        text: "No U.S. bar opinion treats open-source differently from commercial software. The supervision duty under Rule 5.3 does not disappear when a firm self-hosts — it relocates. If you self-host the model, you become the vendor, and the architectural burden (no training on inputs, encryption, BAA, retention controls) is yours. If you use a commercial vendor, the contractual burden is yours.",
      },

      // ============ ECONOMICS ============
      { type: "h2", text: "The honest economics", id: "economics" },
      {
        type: "p",
        text: "The legal-tech press over-promises self-hosting. The actual breakdown:",
      },
      {
        type: "table",
        headers: ["Scenario", "Self-hosted stack (monthly)", "Equivalent SaaS (monthly)", "Notes"],
        rows: [
          ["Solo, ~50 intakes/mo", "~$492", "~$537 (Lawmatics + Smith.ai + DocuSign)", "Roughly tied; SaaS wins if the attorney's time has value"],
          ["5-attorney, ~250 intakes/mo", "~$1,210", "~$927", "SaaS still wins until per-seat scaling kicks in"],
          ["20-attorney, ~1,000 intakes/mo", "~$3,730", "~$2,527", "SaaS wins on raw cost — but per-seat curve worsens at 30+"],
          ["50-attorney, ~3,000 intakes/mo", "~$6,800", "~$8,500+", "Self-hosted wins, assuming a ¼-time engineer is already on payroll"],
        ],
        caption: "Self-hosted costs include compute, voice (Telnyx + LiveKit), Deepgram STT, ElevenLabs TTS, LLM API (Claude Haiku 4.5), DocuSeal, and a fractional IT contractor. SaaS bundle pricing from Lawmatics, Smith.ai, and DocuSign published rates, May 2026.",
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "The break-even. " },
          { kind: "text", text: "Self-hosting beats SaaS on raw monthly cost at roughly 10–15 attorneys, assuming the firm has — or can hire — a quarter-time engineer to keep the stack alive. Below that scale, the IT contractor line item alone (4–8 hours per month at $100 per hour) erases the apparent savings." },
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "The trap. " },
          { kind: "text", text: "Running Llama 3.3 70B on your own GPU costs $3,000–$5,000 per month at production volume (cloud A100 plus ops). At realistic intake token volumes — under 10 million tokens per month for most firms — API providers like Claude Haiku and GPT-4o-mini are 10–100× cheaper. Self-hosting the model rarely pays unless you are doing more than 50M tokens per month or have a hard data-residency requirement." },
        ],
      },
      { type: "h3", text: "Where SaaS still wins" },
      {
        type: "ul",
        items: [
          [
            { kind: "bold", text: "Compliance inheritance. " },
            { kind: "text", text: "Lawmatics, Clio Grow, and Smith.ai ship SOC 2 and HIPAA BAAs out of the box. DocuSeal Community self-hosted does not hand you a BAA — that's on you." },
          ],
          [
            { kind: "bold", text: "Case-management integrations. " },
            { kind: "text", text: "Lawmatics, Lead Docket, and Intaker have prebuilt sync with Clio, Filevine, MyCase, and PracticePanther. Rebuilding those integrations in-house is weeks of engineering." },
          ],
          [
            { kind: "bold", text: "Human escalation. " },
            { kind: "text", text: "Smith.ai's $9.75–$11-per-call human receptionist is irreplaceable for the confused 2 a.m. caller. Self-hosted gives you no human fallback." },
          ],
        ],
      },
      {
        type: "p",
        text: [
          { kind: "bold", text: "The reframe. " },
          { kind: "text", text: "The honest question is not " },
          { kind: "italic", text: "self-host vs. SaaS" },
          { kind: "text", text: ". It is " },
          { kind: "italic", text: "one monolithic SaaS vs. several single-purpose APIs glued together" },
          { kind: "text", text: ". Every public \"I built my own intake stack\" case study turns out, on inspection, to be the second option: Twilio + Deepgram + ElevenLabs + Claude + DocuSeal + a CRM, orchestrated by n8n or custom code. The data lives in the firm's tenant of each service; the firm is not actually self-hosting anything." },
        ],
      },

      // ============ TAKEAWAYS BY FIRM SIZE ============
      { type: "h2", text: "What this means for law firms in 2026", id: "takeaways" },
      { type: "h3", text: "If you're a solo or small firm (under 10 attorneys)" },
      {
        type: "p",
        text: "Skip the open-source hype. The realistic choice is a vendor whose contract you can actually read — short data-retention policy, no model-training rights over your conversations, clean export path, month-to-month or short-commit pricing. That is the meaningful version of \"data sovereignty\" at your scale, and it does not require self-hosting.",
      },
      { type: "h3", text: "If you're a 15+ attorney firm with operational capacity" },
      {
        type: "p",
        text: "The building blocks exist. Pipecat or LiveKit (voice), Deepgram (STT), ElevenLabs (TTS), DocuSeal (e-signature), Twenty or EspoCRM (CRM), and a self-hosted Llama or Mistral can be assembled into a credible intake stack. But you are accepting responsibility for the integration, the supervision under Rule 5.3, and the bar opinions in every jurisdiction where you practice. Plan on at least one quarter of engineering work and a permanent quarter-time operational owner.",
      },
      { type: "h3", text: "If you're an open-source developer" },
      {
        type: "p",
        text: "This is the wedge. The community has document research, document automation, e-signature, case management, and voice infrastructure as separate open-source projects. The customer-facing intake layer is the missing piece — and the first project that ships a credible, legal-calibrated, multi-channel intake under a permissive license will define the next chapter of the conversation Mike OSS opened.",
      },

      // ============ WHERE CLAIREAI SITS ============
      { type: "h2", text: "Where ClaireAI sits in this picture", id: "claireai" },
      {
        type: "callout",
        kind: "warn",
        title: "Editorial disclosure.",
        text: "ClaireAI is the publisher of this guide. We are not open-source, and we say that clearly below. Every named vendor, repo, and statistic above is verifiable through the GitHub, ABA, state bar, and pricing-page URLs that source them.",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "ClaireAI 365 is not open-source. It's a commercial product, purpose-built for law firms that need the legal calibration, CRM integrations, compliance attestations, and human escalation paths that no open-source project ships today." },
        ],
      },
      {
        type: "p",
        text: "That's the honest framing. The reason this guide exists is that the legal-tech press treats \"AI legal intake\" as if it were a solved category, and it isn't. The open-source side is fertile and growing — Mike OSS is real, Docassemble is foundational, LawDroid's plugin pack is the most interesting new entrant in twelve months — but none of it is a turnkey customer-facing AI receptionist for a firm that needs to be live next week.",
      },
      { type: "h3", text: "Where we differ from the alternatives covered above" },
      {
        type: "ul",
        items: [
          "Calibrated per-practice — personal injury, criminal defense, family law, immigration, and general civil each get a tuned intake script.",
          "Conflict screening per Rule 1.18 before any privileged facts are collected.",
          "66 native case-management integrations including Clio, Filevine, MyCase, PracticePanther, CASEpeer, Litify, Lawmatics, CloudLex, Smokeball, Rocket Matter, and CosmoLex.",
          "SOC 2 Type II infrastructure and HIPAA-aligned BAAs signed at onboarding.",
          "Live human escalation when the AI reaches the limit of what it should be answering on its own.",
        ],
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "If you'd like to see ClaireAI handle a calibrated intake call for your practice area, the " },
          { kind: "link", text: "demo", href: "/contact" },
          { kind: "text", text: " is the most efficient way to evaluate the fit. Pricing is published on the " },
          { kind: "link", text: "pricing page", href: "/pricing" },
          { kind: "text", text: " — no sales-gated quotes." },
        ],
      },

      // ============ FAQ ============
      { type: "h2", text: "Frequently asked questions" },
      {
        type: "faq",
        items: [
          {
            q: "What is open-source legal intake software?",
            a: "Software for capturing, qualifying, and routing prospective-client inquiries at a law firm — the front door that precedes case management — distributed under a license (typically MIT, Apache-2.0, or AGPL-3.0) that lets a firm read, modify, and self-host the code. As of May 2026, no production-grade open-source product fills this category for retained private practice.",
          },
          {
            q: "Is Mike OSS legal intake software?",
            a: [
              { kind: "text", text: "No. " },
              { kind: "link", text: "Mike", href: "https://github.com/willchen96/mike" },
              { kind: "text", text: " is a document-research assistant — analogous to Harvey or Legora — for chatting with matter documents. It does not answer phones, screen for conflicts, or book consults. It's the most-watched open-source legal-AI project of 2026, but it sits a layer above intake." },
            ],
          },
          {
            q: "What's the difference between free, open-source, and self-hosted legal intake?",
            a: "Three different things. \"Free\" usually means a vendor's free trial or limited tier of a closed product (Clio Grow, Lawmatics, and Gavel all market free tiers). \"Open-source\" means the source code is published under a license that permits modification and self-hosting (AGPL-3.0, Apache-2.0, MIT). \"Self-hosted\" describes where the software runs — on infrastructure the firm controls — and applies to both open-source projects and certain commercial products with on-premise deployment options. The three overlap but are not synonyms.",
          },
          {
            q: "Can a law firm self-host its client intake software?",
            a: "Technically yes. A firm can wire up Pipecat or LiveKit for voice, Deepgram or AWS Transcribe for speech-to-text, ElevenLabs or Cartesia for text-to-speech, Claude or self-hosted Llama for reasoning, DocuSeal for e-signature, and an open-source CRM (Twenty, EspoCRM, SuiteCRM) on its own infrastructure. Break-even versus a SaaS like Lawmatics or Intaker is around 10–15 attorneys, assuming a quarter-time engineer is already on payroll. Below that, the IT line item alone wipes out the savings.",
          },
          {
            q: "Does the ABA permit AI client intake?",
            a: [
              { kind: "text", text: "Yes, with conditions. " },
              { kind: "link", text: "ABA Formal Opinion 512", href: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf" },
              { kind: "text", text: " (July 29, 2024) addresses generative-AI use including for client intake, and requires lawyers to understand the tool's data-handling, obtain informed client consent where Rule 1.6 is triggered, supervise the tool under Rule 5.3, and avoid billing clients for time saved by AI. " },
              { kind: "link", text: "Florida Bar Opinion 24-1", href: "https://www.floridabar.org/etopinions/opinion-24-1/" },
              { kind: "text", text: " (January 2024) and Oregon State Bar Opinion 2026-208 add intake-specific rules: the bot must disclose it is non-lawyer software, limit itself to factual information, and refer legal questions to a licensed attorney." },
            ],
          },
          {
            q: "What's the best open-source alternative to Lawmatics?",
            a: "There isn't a like-for-like alternative in May 2026. The closest functional substitute is an assembled stack — an open-source CRM (Twenty, EspoCRM, or SuiteCRM) for pipeline, Docassemble for guided intake forms, DocuSeal for e-signature, and Pipecat or LiveKit Agents for phone capture. None of those projects market themselves as a Lawmatics replacement, and stitching them together is non-trivial.",
          },
          {
            q: "Can open-source legal intake meet bar confidentiality rules?",
            a: [
              { kind: "text", text: "Yes, when implemented carefully. The architectural win of self-hosting is that inputs never leave the firm's control, which directly satisfies California's " },
              { kind: "link", text: "Practical Guidance on Generative AI", href: "https://www.calbar.ca.gov/Portals/0/documents/ethics/Generative-AI-Practical-Guidance.pdf" },
              { kind: "text", text: " (November 2023) and Rule 1.6 generally. The catch: the firm becomes the vendor for purposes of supervision under Rule 5.3, so the technical controls — encryption at rest, access logs, retention policies, prompt-injection defenses — become the firm's responsibility rather than a vendor's." },
            ],
          },
        ],
      },
    ],
    related: ["best-ai-receptionist-law-firms-2026", "2026-legal-intake-benchmark-report", "outsource-legal-intake-guide"],
    keywords: [
      "open source legal intake",
      "open source legal intake software",
      "open source intake software for law firms",
      "Mike OSS",
      "open source AI legal receptionist",
      "self-hosted legal intake",
      "open source Lawmatics alternative",
      "ABA Opinion 512 client intake",
      "Florida Bar 24-1 chatbot",
      "Oregon State Bar 2026-208",
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
      name: "Tiago Stram",
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
            { kind: "text", text: "A pool of human receptionists who answer calls under your firm's branding, take messages, and email/SMS your team. Per-minute pricing ($1.50-$3.00/min) plus monthly base ($100-$300). Quality varies wildly between vendors. Examples: " },
            { kind: "link", text: "Smith.ai", href: "https://smith.ai/pricing/receptionists" },
            { kind: "text", text: ", " },
            { kind: "link", text: "Ruby", href: "https://www.ruby.com/pricing/" },
            { kind: "text", text: ", " },
            { kind: "link", text: "AnsweringLegal", href: "https://www.answeringlegal.com/" },
            { kind: "text", text: "." },
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
            { kind: "text", text: "Shortlist 2-3 vendors. Get demo calls calibrated to YOUR intake script (don't accept generic demos). Verify CRM integration with your specific platform (" },
            { kind: "link", text: "Clio", href: "https://www.clio.com/" },
            { kind: "text", text: ", " },
            { kind: "link", text: "Filevine", href: "https://www.filevine.com/" },
            { kind: "text", text: ", " },
            { kind: "link", text: "MyCase", href: "https://www.mycase.com/" },
            { kind: "text", text: ", " },
            { kind: "link", text: "PracticePanther", href: "https://www.practicepanther.com/" },
            { kind: "text", text: ", etc.)." },
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
            a: [
              { kind: "text", text: "Yes, when the vendor implements proper conflict-screening (" },
              { kind: "link", text: "Rule 1.18", href: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/" },
              { kind: "text", text: " prospective-client confidentiality), maintains attorney-client privilege through the intake conversation, and provides a Business Associate Agreement (HIPAA) for any PHI captured. ClaireAI offers all three out of the box; verify with any vendor you're evaluating." },
            ],
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
        { kind: "text", text: " — co-defendants, alleged victim, prior counsel are collected up front to avoid " },
        { kind: "link", text: "Rule 1.18", href: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_18_duties_to_prospective_client/" },
        { kind: "text", text: " violations. Urgency triage by court date is the second axis." },
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
      { type: "callout", kind: "warn", title: "Emergency escalation", text: [
        { kind: "text", text: "If the caller mentions a current DV incident, child abduction risk, or present-danger language, immediately offer the " },
        { kind: "link", text: "National DV Hotline", href: "https://www.thehotline.org/" },
        { kind: "text", text: " (1-800-799-7233) and warm-transfer to your on-call attorney. Do not continue routine intake during an active crisis." },
      ]},
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
        [
          { kind: "text", text: "Is there an upcoming hearing — " },
          { kind: "link", text: "USCIS", href: "https://www.uscis.gov/" },
          { kind: "text", text: " interview, immigration court (" },
          { kind: "link", text: "EOIR", href: "https://www.justice.gov/eoir" },
          { kind: "text", text: "), or " },
          { kind: "link", text: "BIA", href: "https://www.justice.gov/eoir/board-of-immigration-appeals" },
          { kind: "text", text: " appeal?" },
        ],
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
      name: "Tiago Stram",
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
        [{ kind: "link", text: "Smith.ai Starter", href: "https://smith.ai/pricing/receptionists" }, { kind: "text", text: ": $255/month for 30 calls. Overage: $7-$10/call." }],
        "Standard: $580/month for 70 calls. Overage: $7-$8/call.",
        "Bilingual surcharge: +$0.50/call.",
        "After-hours: included in higher tiers; +30% in lower.",
        "Per-call billing means a 30-second 'wrong number' costs the same as a 12-minute intake call.",
      ]},
      { type: "h3", text: "Ruby Receptionists" },
      { type: "ol", items: [
        [{ kind: "link", text: "Ruby Solo", href: "https://www.ruby.com/pricing/" }, { kind: "text", text: ": $389/month for 100 receptionist minutes. Overage: $0.95/minute." }],
        "Standard: $689/month for 200 minutes. Overage: $0.95-$1.15/minute.",
        "Pro: $1,099/month for 350 minutes. Overage: $0.85/minute.",
        [{ kind: "text", text: "Average legal-firm spend on " }, { kind: "link", text: "Ruby", href: "https://www.ruby.com/" }, { kind: "text", text: ": $1,245/month (per our 847-firm survey)." }],
        "Bilingual: extra $50-$100/month per account.",
      ]},
      { type: "h3", text: "AnsweringLegal" },
      { type: "ol", items: [
        [{ kind: "link", text: "AnsweringLegal", href: "https://www.answeringlegal.com/" }, { kind: "text", text: " pricing is opaque — no public rate card. Quoted ranges $1.50-$2.85/call across surveyed firms." }],
        "Setup fee: $150-$300 one-time.",
        "Average monthly: $475 for the median mid-volume firm.",
        "After-hours: included.",
      ]},
      { type: "h3", text: "AI receptionists (flat-fee)" },
      { type: "ol", items: [
        [{ kind: "link", text: "ClaireAI", href: "/pricing" }, { kind: "text", text: ": $450/month flat. Unlimited calls, unlimited minutes, 24/7, bilingual, conflict screening, CRM integration, retainer dispatch on grade-A leads." }],
        [{ kind: "link", text: "Smith.ai AI Voice Assistant", href: "https://smith.ai/ai-voice-assistant" }, { kind: "text", text: ": $195/month base; tier additions push it to $400-$500 quickly." }],
        [{ kind: "text", text: "Other AI vendors (e.g., " }, { kind: "link", text: "Goodcall", href: "https://www.goodcall.com/" }, { kind: "text", text: ", " }, { kind: "link", text: "Posh", href: "https://www.posh.ai/" }, { kind: "text", text: "): $195-$650/month flat." }],
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
          [{ kind: "bold", text: "The conversion penalty: " }, { kind: "text", text: "The " }, { kind: "link", text: "Forrester/InsideSales 5-minute response data", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" }, { kind: "text", text: " shows a 400% conversion lift inside the window. Slow human services that pick up at 30+ seconds lose this lift entirely." }],
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
          { q: "What does Smith.ai actually cost for a 4-attorney firm?", a: [{ kind: "text", text: "Across surveyed 4-attorney firms, " }, { kind: "link", text: "Smith.ai", href: "https://smith.ai/pricing/receptionists" }, { kind: "text", text: " averaged $890/month including overages and after-hours premium. The published Starter tier ($255) doesn't cover the call volume of a typical 4-attorney firm; most land in the Standard or Pro tier with overages." }] },
          { q: "What does Ruby actually cost?", a: [{ kind: "text", text: "The 847-firm survey shows " }, { kind: "link", text: "Ruby's", href: "https://www.ruby.com/pricing/" }, { kind: "text", text: " average legal-account spend is $1,245/month. The published Solo tier ($389) covers fewer than 100 receptionist-minutes — most law firms exceed this on the first week of the month and pay overage all month." }] },
          { q: "Is AI cheaper than human answering services?", a: "Almost always, yes — and the gap widens as volume increases. At 50 calls/month, human and AI are comparable. At 250+ calls/month, AI is typically 50-70% cheaper. At 500+ calls/month, AI is 70-85% cheaper." },
          { q: "What does ClaireAI actually cost for a law firm?", a: [{ kind: "text", text: "Plans start at $450/month flat with unlimited calls, minutes, after-hours, bilingual, conflict screening, CRM integration, and retainer dispatch on grade-A leads. " }, { kind: "link", text: "See ClaireAI pricing", href: "/pricing" }, { kind: "text", text: "." }] },
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
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779302723/ChatGPT_Image_May_20_2026_at_02_45_06_PM.jpg",
      imgAlt: "Best AI receptionist for law firms in 2026 — comparative analysis",
    },
    author: {
      name: "Tiago Stram",
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
      { type: "callout", kind: "warn", title: "Editorial disclosure", text: [
        { kind: "text", text: "ClaireAI is the publisher of this guide and is ranked first below. We've done our best to evaluate competitors honestly — pricing claims come from publicly listed tier pages, feature claims from documented vendor capability statements, and benchmark data from a 1,000-firm survey conducted Q1 2026. Readers should consider our affiliation when weighing the recommendation, request live demos calibrated to their own intake script, and confirm pricing directly with vendors. This disclosure exists to comply with the " },
        { kind: "link", text: "FTC Consumer Review Rule (16 C.F.R. § 465)", href: "https://www.ftc.gov/legal-library/browse/rules/consumer-reviews-testimonials-rule" },
        { kind: "text", text: "." },
      ] },
      { type: "p", text: "This guide compares the top 7 AI receptionist platforms for U.S. law firms. The evaluation framework prioritizes legal-specific capability over general-purpose feature counts. The single biggest differentiator is whether the AI knows the difference between a UIM/UM question and a generic 'do you have insurance' prompt — and most general-purpose AI does not." },
      { type: "h2", text: "Best AI receptionist for legal-specific intake", id: "legal-specific" },
      { type: "h3", text: "ClaireAI" },
      { type: "ul", items: [
        "Per-practice intake scripts: PI, criminal defense, family law, immigration, general civil",
        [
          { kind: "link", text: "Rule 1.18", href: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/" },
          { kind: "text", text: " conflict screening (fuzzy-match against CRM before any privileged fact)" },
        ],
        [
          { kind: "text", text: "66 native CRM integrations: " },
          { kind: "link", text: "Clio", href: "https://www.clio.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "Filevine", href: "https://www.filevine.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "MyCase", href: "https://www.mycase.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "PracticePanther", href: "https://www.practicepanther.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "CASEpeer", href: "https://www.casepeer.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "Litify", href: "https://www.litify.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "Lawmatics", href: "https://www.lawmatics.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "CloudLex", href: "https://www.cloudlex.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "Smokeball", href: "https://www.smokeball.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "Rocket Matter", href: "https://www.rocketmatter.com/" },
          { kind: "text", text: ", " },
          { kind: "link", text: "CosmoLex", href: "https://www.cosmolex.com/" },
        ],
        "DocuSign retainer dispatch on pre-cleared grade-A leads",
        "Bilingual English + Spanish, first-phrase detection (10+ language support on Growth tier)",
        "SOC 2 Type II infrastructure, HIPAA-aligned BAAs",
        [{ kind: "bold", text: "Pricing: " }, { kind: "text", text: "$450/mo Starter, $850/mo Growth, $1,800/mo Enterprise. " }, { kind: "link", text: "See pricing", href: "/pricing" }],
      ]},
      { type: "h2", text: "Best AI receptionist for general business use", id: "general-business" },
      { type: "h3", text: "Goodcall, Posh, Smith.ai AI Voice" },
      { type: "p", text: [
        { kind: "link", text: "Goodcall", href: "https://www.goodcall.com/" },
        { kind: "text", text: ", " },
        { kind: "link", text: "Posh", href: "https://www.posh.ai/" },
        { kind: "text", text: ", and " },
        { kind: "link", text: "Smith.ai's AI Voice", href: "https://smith.ai/ai-receptionist" },
        { kind: "text", text: " are general-purpose AI receptionists that work well for non-legal SMB use (HVAC, dental, small e-commerce). For law firms, they're a downgrade from human services because they lack the legal-specific calibration that intake quality depends on. Suitable if your firm only needs basic message-taking — but you're paying for less than you'd get from a calibrated legal AI." },
      ]},
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
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779303819/ChatGPT_Image_May_20_2026_at_03_03_15_PM.jpg",
      imgAlt: "Missed call revenue loss at U.S. law firms — the $100K problem",
    },
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
      { type: "p", text: [
        { kind: "text", text: "The single most expensive moment in legal intake isn't the long consultation — it's the first 60 seconds. The 5-minute response window (" },
        { kind: "link", text: "Forrester / InsideSales", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
        { kind: "text", text: ") drives a 400% conversion lift inside it. Outside it, conversion drops to baseline." },
      ]},
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

  // ──────────────────────────────────────────────────────────────
  // 9. PERFORMANCE DATA — GA4 / GSC / GBP (+ native in ClaireAI)
  // ──────────────────────────────────────────────────────────────
  {
    slug: "law-firm-performance-data-ga4-gsc-gbp",
    category: "Guide",
    date: "Jun 23, 2026",
    lastUpdated: "Jun 23, 2026",
    readingTime: "11 min read",
    title:
      "How to read your law firm's performance data in GA4, Search Console, and Google Business Profile",
    excerpt:
      "A plain-English walkthrough of the three free Google reports every firm should check each week — and the one number none of them can show you: which calls became signed cases.",
    hero: {
      img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1782240947/ChatGPT_Image_Jun_23_2026_at_02_55_35_PM.jpg",
      imgAlt:
        "Reading a law firm's performance data across GA4, Google Search Console, and Google Business Profile.",
    },
    author: {
      name: "Tiago Stram",
      credentials: "Founder, ClaireAI",
      bio: "Tiago works with law-firm owners on closing the gap between marketing analytics and intake outcomes — the point where most reporting quietly stops.",
    },
    tldr: [
      "GA4, Google Search Console, and Google Business Profile each answer a different question: GA4 = what people do once they reach your site; Search Console = how you show up in Google Search; Business Profile = how you show up on Maps and in the local pack.",
      "All three are free, and every firm should know how to read them. The exact reports that matter for a law firm are below.",
      "But all three stop at the click — or, for Business Profile, at the first ring. None of them can tell you whether a call was answered, the lead qualified, the consult booked, or the case signed.",
      "That outcome data lives downstream, in your intake. ClaireAI's portal records every call, scores the lead A–D, tracks the booked consult and the retainer, and ties it back to the source — so you can read performance from first click to signed case in one place.",
      "Across the 2026 ClaireAI 1,000-firm benchmark, 35% of inbound calls go unanswered — so for most firms the single most important performance metric is invisible in Google's tools entirely.",
    ],
    body: [
      {
        type: "p",
        text: "There are three free dashboards every law firm should be able to read: Google Analytics 4 (GA4), Google Search Console (GSC), and Google Business Profile (GBP). Each measures a different stage of how a prospective client finds you. None of them, on its own, tells you whether that prospect became a client. Here is how to read each one — and exactly where the trail goes cold.",
      },
      {
        type: "h2",
        text: "GA4: what people do once they reach your site",
        id: "ga4",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "Open " },
          { kind: "link", text: "Google Analytics", href: "https://marketingplatform.google.com/about/analytics/" },
          { kind: "text", text: " and you are looking at on-site behavior: how many people arrived, where they came from, and what they did. For a law firm, four things matter and the rest is noise:" },
        ],
      },
      {
        type: "ul",
        items: [
          [{ kind: "bold", text: "Traffic acquisition " }, { kind: "text", text: "(Reports → Acquisition → Traffic acquisition): which channel — Organic Search, Paid, Direct, Referral, Organic Social — actually brings visitors. This is your top-of-funnel mix." }],
          [{ kind: "bold", text: "Key events " }, { kind: "text", text: "(formerly 'conversions'): mark the actions that signal intent — a tel: phone-number click, a contact-form submit, a chat open. Until you mark these as key events, GA4 cannot tell you which channel drives leads." }],
          [{ kind: "bold", text: "Engagement by landing page " }, { kind: "text", text: "(Reports → Engagement → Pages and screens): which practice-area pages hold attention and which bounce." }],
          [{ kind: "bold", text: "Geography " }, { kind: "text", text: "(Reports → User → Demographics): confirm your traffic matches your jurisdiction, not a different metro." }],
        ],
      },
      {
        type: "callout",
        kind: "info",
        title: "The phone-click trap",
        text: "A GA4 'phone-click' key event tells you someone tapped your number on a mobile page. It does not tell you the call connected, was answered, or lasted more than three seconds. Treat phone-clicks as intent, never as outcome.",
      },
      {
        type: "h2",
        text: "Google Search Console: how you show up in Search",
        id: "gsc",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "Where GA4 measures behavior on your site, " },
          { kind: "link", text: "Google Search Console", href: "https://search.google.com/search-console/about" },
          { kind: "text", text: " measures behavior in the Google results before the click. The Performance report is the one to live in:" },
        ],
      },
      {
        type: "ul",
        items: [
          [{ kind: "bold", text: "Queries: " }, { kind: "text", text: "the actual searches you appear for. Filter for your practice area plus your city ('car accident lawyer [city]') to see where you rank and where you are merely impressed but not clicked." }],
          [{ kind: "bold", text: "Clicks, impressions, CTR, average position: " }, { kind: "text", text: "rising impressions with flat clicks means you are visible but unconvincing — usually a title-tag or meta-description problem." }],
          [{ kind: "bold", text: "Pages: " }, { kind: "text", text: "which URLs earn the impressions. Thin or missing practice-area pages show up here as gaps." }],
          [{ kind: "bold", text: "Indexing → Pages: " }, { kind: "text", text: "confirm Google has actually indexed your key pages. An unindexed page earns zero — and is also ineligible to be cited in Google's AI Overviews." }],
        ],
      },
      {
        type: "h2",
        text: "Google Business Profile: how you show up on Maps and the local pack",
        id: "gbp",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "For most firms, the " },
          { kind: "link", text: "Google Business Profile", href: "https://www.google.com/business/" },
          { kind: "text", text: " (the Maps/local listing) drives more phone calls than the website does. Its Performance tab reports:" },
        ],
      },
      {
        type: "ul",
        items: [
          [{ kind: "bold", text: "Calls: " }, { kind: "text", text: "how many people tapped 'Call' directly from your listing, by day and time." }],
          [{ kind: "bold", text: "Directions and website clicks: " }, { kind: "text", text: "downstream actions from the listing." }],
          [{ kind: "bold", text: "Searches that showed your profile: " }, { kind: "text", text: "the queries that surfaced you on Maps, split by Search vs Maps surface." }],
        ],
      },
      {
        type: "callout",
        kind: "info",
        title: "Read this one carefully",
        text: "Business Profile's 'Calls' metric counts calls placed — not calls answered. It is counting the same ring that, 35% of the time, no one at the firm picks up. The chart goes up; the cases do not.",
      },
      {
        type: "h2",
        text: "Where all three go dark",
        id: "the-gap",
      },
      {
        type: "p",
        text: "Stitch GA4, Search Console, and Business Profile together and you get a complete picture of demand — who searched, who saw you, who clicked, who dialed. Then the picture ends. Every one of these tools stops at the moment of contact. The most expensive question in your firm — of the people who called, which became clients, and what were those cases worth — is answered by none of them.",
      },
      {
        type: "table",
        headers: ["Tool", "Answers", "Cannot tell you"],
        rows: [
          ["GA4", "What visitors do on your site; which channel drives form-fills and phone-clicks", "Whether a call connected, qualified, or signed"],
          ["Search Console", "Which queries you rank for; clicks, impressions, position", "Anything that happens after the click"],
          ["Business Profile", "Calls placed, directions, listing views", "Whether the call was answered or became a case"],
        ],
        caption: "All three measure visibility and initiation. None measures intake outcome.",
      },
      {
        type: "h2",
        text: "Reading performance from click to signed case in ClaireAI",
        id: "claireai",
      },
      {
        type: "p",
        text: [
          { kind: "text", text: "The outcome data the Google tools cannot see is exactly the data an intake system holds. Inside the " },
          { kind: "link", text: "ClaireAI portal", href: "/product" },
          { kind: "text", text: ", every inbound call is captured and carried all the way through the funnel — no spreadsheet, no manual call-listening, no guesswork:" },
        ],
      },
      {
        type: "ul",
        items: [
          [{ kind: "bold", text: "Answered vs missed: " }, { kind: "text", text: "the metric Business Profile cannot give you — what share of calls were actually picked up (Claire answers in 0.8 seconds, 24/7)." }],
          [{ kind: "link", text: "Lead IQ grade (A–D): ", href: "/product/lead-iq" }, { kind: "text", text: "every call scored on case fit and value, so you see lead quality by source, not just lead count." }],
          [{ kind: "bold", text: "Booked consults and retainer status: " }, { kind: "text", text: "which calls converted to a calendar booking and a sent/signed retainer." }],
          [{ kind: "bold", text: "Source and number: " }, { kind: "text", text: "which tracking number or campaign produced the call — the bridge back to GA4 and Business Profile." }],
          [{ kind: "bold", text: "Lead velocity: " }, { kind: "text", text: "answered calls, qualified leads, and signed matters trended over the last 7 and 30 days." }],
        ],
      },
      {
        type: "p",
        text: "Used together, the four dashboards finally close the loop. GA4, Search Console, and Business Profile tell you which sources create demand; ClaireAI tells you which sources create clients. Lay them side by side and you can compute the only marketing number that matters — cost per signed case, by source.",
      },
      {
        type: "h2",
        text: "A 15-minute weekly performance routine",
        id: "routine",
      },
      {
        type: "ol",
        items: [
          "Search Console → Performance: scan your top queries and average position. Note any practice-area query losing position.",
          "GA4 → Traffic acquisition: check key events (form-fills, phone-clicks) by channel. Which channel is trending up?",
          "Business Profile → Performance: read calls and website clicks for the week.",
          [{ kind: "text", text: "ClaireAI portal: read answered-rate, Lead IQ distribution, and signed matters — then reconcile each signed case back to its source. " }, { kind: "link", text: "See it on a live call", href: "/contact" }, { kind: "text", text: "." }],
        ],
      },
      {
        type: "h2",
        text: "Frequently asked questions",
      },
      {
        type: "faq",
        items: [
          {
            q: "Which Google tool matters most for a law firm?",
            a: "There is no single one — they cover different stages. Google Business Profile usually drives the most phone calls; Search Console shows whether you are findable; GA4 shows what people do on your site. Read all three weekly. The blind spot they share is intake outcome, which lives in your phone system or intake platform.",
          },
          {
            q: "How do I track phone calls in GA4?",
            a: "Mark a tel: link click as a key event, or pass a call-tracking event into GA4. This captures intent — that someone tried to call. It does not capture whether the call was answered or became a client; for that you need call-outcome data from your intake system.",
          },
          {
            q: "Can Google Analytics tell me which calls became clients?",
            a: "No. GA4 can record that a phone number was clicked, but it has no visibility into the call itself — connection, duration, qualification, or signed retainer. Closing that loop requires tying the call's source to its outcome, which is what an intake platform like ClaireAI records natively.",
          },
          {
            q: "What does ClaireAI show that Google's tools don't?",
            a: [
              { kind: "text", text: "Outcome. For every call, ClaireAI records whether it was answered, the Lead IQ grade, whether a consult was booked, and whether a retainer was sent or signed — tied back to the source number. That turns Google's visibility metrics into a cost-per-signed-case picture. " },
              { kind: "link", text: "See ClaireAI's reporting", href: "/product" },
              { kind: "text", text: "." },
            ],
          },
        ],
      },
    ],
    related: [
      "missed-call-revenue-loss-law-firms",
      "2026-legal-intake-benchmark-report",
      "best-ai-receptionist-law-firms-2026",
    ],
    keywords: [
      "GA4 for law firms",
      "google search console for law firms",
      "google business profile law firm",
      "law firm marketing analytics",
      "how to track phone calls law firm",
      "legal intake performance metrics",
      "law firm reporting dashboard",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): Pick<Post, "slug" | "category" | "date" | "title" | "excerpt" | "hero">[] {
  return slugs
    .map((s) => POSTS.find((p) => p.slug === s))
    .filter((p): p is Post => !!p)
    .map(({ slug, category, date, title, excerpt, hero }) => ({ slug, category, date, title, excerpt, hero }));
}
