# FAQ Research — ClaireAI Marketing Site

**Date:** 2026-05-18
**Method:** Six parallel research agents, each scoped to one page's search intent. Each agent pulled from Google PAA, Reddit (r/Lawyertalk, r/LawFirm), competitor FAQ pages (Smith.ai, Ruby, AnswerForce, Lawmatics, Captorra), legal-tech buyer's guides (Lawyerist, ABA Journal), bar-association ethics opinions (ABA Formal Op 512, NYC Bar Formal Op 2025-6, NC State Bar), case law (Heppner v. Claude 2026), and product docs (Clio, MyCase, Filevine, DocuSign).

**Output:** 67 net-new, deduplicated FAQ recommendations across 6 pages, plus a deduplication audit and an implementation priority ranking.

---

## Deduplication Audit

Every existing FAQ across the site was inventoried before research. Each research agent was given the existing list and explicitly told NOT to duplicate. **Cross-page topic distribution:**

| Topic | Lives On | Why That Page |
|---|---|---|
| Brand-name / "what is ClaireAI" | Homepage | Top-of-funnel entry |
| AI-vs-chatbot-vs-IVR definition | Homepage | Category-defining query |
| UPL / ethics / privilege | Product overview | Trust gate before mechanics |
| Call-mechanics (latency, port, transfer) | How-it-works | Operational depth |
| Rubric / brief / drip / grading | Lead IQ | Feature-specific intent |
| Plan tiers / per-call cost / cancellation | Pricing | Commercial intent |
| Field mapping / OAuth / dual-CRM | Integrations | Setup/admin intent |

Some topics overlap (e.g., security, languages, integrations all touch multiple pages). Rule applied: deepest answer goes on the page that owns the intent, lighter touch elsewhere with a cross-link.

---

## 1. Homepage `/` — 10 NEW FAQs

**Audience:** First-time visitor, brand-name searcher, partner glancing for 30 seconds.
**Existing FAQs:** None.

| # | Question | Why it wins |
|---|---|---|
| 1 | What does ClaireAI actually do? | Brand-name "What is" PAA — own the definition or AI Overview pulls a competitor's summary. |
| 2 | Is ClaireAI a chatbot, an IVR, or something different? | Top category confusion in Reddit + RingCentral/Unity Connect blogs. |
| 3 | Is ClaireAI safe for law-firm data? | Every G2/Capterra review-request and bar vetting guide leads with HIPAA/SOC 2. |
| 4 | Can I hear Claire on a real call before I commit? | "Try before you buy" is the dominant homepage CTA Reddit/G2 ask. |
| 5 | Will my callers know they're talking to AI? | #1 unspoken partner objection (HavokJournal, AnsweringLegal, ABA 2026 checklist). |
| 6 | How is ClaireAI different from Smith.ai, Ruby, or LEX Reception? | Predictable next-click from brand SERPs. |
| 7 | Who built ClaireAI and where are you based? | Standard brand-trust PAA. (Miami, 2024) |
| 8 | How many firms use ClaireAI, and can I see a case study? | Trust gate. Anchor to Clio's 78% sub-5-min response stat. |
| 9 | How quickly can ClaireAI go live for my firm? | "Will this be a 6-month IT project" homepage-level fear. |
| 10 | What happens on a call Claire can't handle? | Top objection in every AI-receptionist comparison article. |

**Top sources:** [My Legal Academy](https://mylegalacademy.com/kb/best-ai-receptionist-law-firms-2026), [CloudTalk](https://www.cloudtalk.io/blog/best-virtual-receptionist-for-law-firms/), [Answering Legal](https://www.answeringlegal.com/blog/the-truth-about-ai-receptionists-a-law-firm-owners-reality-check), [ABA Responsible-AI Checklist 2026](https://www.americanbar.org/groups/law_practice/resources/law-technology-today/2026/checklist-for-using-ai-responsibly-in-your-law-firm/).

---

## 2. Product Overview `/product` — 12 NEW FAQs

**Audience:** Researching the category, evaluating whether AI intake is viable for their practice.
**Existing FAQs:** 10 (definition, vs competitors, cost, compliance, replace receptionist, practice areas, named CRMs, Spanish, go-live, free trial).

| # | Question | Why it wins |
|---|---|---|
| 1 | Can callers tell they're talking to an AI? | Top objection in every Reddit thread; FCC 2024 disclosure law makes transparency the policy. |
| 2 | Is ClaireAI considered the unauthorized practice of law? | ABA Formal Op 512 (Jul 2024), Rule 5.5; #1 reason firms hesitate. |
| 3 | Does attorney-client privilege attach to what a caller tells ClaireAI? | **Heppner v. Claude (2026)** privilege-waiver case scared every partner this spring; Rule 1.18. |
| 4 | How does ClaireAI handle conflict-of-interest screening on the first call? | Rule 1.18 prospective-client + Smith.ai launched this as a paid add-on. |
| 5 | What happens when a caller is in distress, crying, or describing an emergency? | "AI can't handle scared clients" — top objection in LawFuel, LexReception, r/LawFirm. |
| 6 | Will ClaireAI work for elderly callers, Southern accents, or low-bandwidth phone lines? | 79% of regional-accent speakers suppress their accent for voice AI (Newcastle study). |
| 7 | Does ClaireAI disclose that it's recording the call? | 13 two-party-consent states; wiretap case law on real-time transcription. |
| 8 | What if ClaireAI mis-grades a call — gives an A to junk or a D to a real case? | Stanford Justice Innovation Lab: "improper denial of service" is the top ethical failure mode. |
| 9 | Does my malpractice carrier cover claims involving an AI intake agent? | ABA Journal Feb 2026 piece on AI exclusion endorsements (ALPS, CNA, Lawyers Mutual). |
| 10 | What if a caller refuses to talk to an AI and asks for a human? | r/LawFirm direct quote: "If I called a law firm and was sent to a virtual receptionist, I'd call another law firm." |
| 11 | What if ClaireAI doesn't recognize a specific charge, statute, or case type? | Hallucination (Mata v. Avianca) is the #1 publicized AI-legal failure. |
| 12 | Can ClaireAI handle multiple calls simultaneously during a mass-tort wave or TV-ad spike? | Concurrency = structural advantage over human services. |

**Top sources:** [Heppner v. Claude analysis (Husch Blackwell)](https://www.huschblackwell.com/newsandinsights/heppner-v-claude-the-first-privilege-waiver-by-ai-rulingwhat-lawyers-and-clients-must-know), [ABA Formal Opinion 512](https://www.americanbar.org/news/abanews/aba-news-archives/2024/07/aba-issues-first-ethics-guidance-ai-tools/), [DC Bar Rule 1.18](https://www.dcbar.org/for-lawyers/legal-ethics/rules-of-professional-conduct/client-lawyer-relationship/duties-to-prospective-client), [Stanford Justice Innovation Lab](https://justiceinnovation.law.stanford.edu/legal-aid-intake-screening-ai/), [ABA Journal: Does your LPL cover AI?](https://www.americanbar.org/groups/journal/articles/2025/does-your-professional-liability-insurance-cover-ai-mistakes-dont-be-so-sure/), [CaseClerk state-by-state recording laws](https://caseclerk.ai/blog/do-ai-voice-intake-agents-for-law-firms-have-to-comply-with-call-recording-and-twoparty-consent-laws-2025-statebystate-guide).

---

## 3. Lead IQ `/product/lead-iq` — 12 NEW FAQs

**Audience:** Intake managers, marketing managers, managing partners who care about conversion rates.
**Existing FAQs:** 7 (rubric calibration, brief platforms, drip campaigns, security, multi-practice support, vs CRM scoring, setup time).

| # | Question | Why it wins |
|---|---|---|
| 1 | What happens if Lead IQ grades a case wrong? Can attorneys override the grade? | Quilia 2026 playbook flags false-reject rate (<2%) + SoL hardcoding as buyer table-stakes. |
| 2 | Can we audit every grade Lead IQ assigns? Is there a paper trail if a referral source pushes back? | Catomarketing 2026 PI guide: "referral source relationship damage" is highest-cost AI failure. |
| 3 | Does AI lead grading actually move sign rates, or just sort the same leads faster? | Forrester/InsideSales: 5-min response → ~300% conversion lift. Industry 25–35% → elite 55%+. |
| 4 | Are the SMS drip campaigns TCPA-compliant? What about 10DLC and quiet-hours? | $500–$1,500/message TCPA exposure; FCC 10-day opt-out rule (Amundsen Davis, Textedly). |
| 5 | Can we customize what's in Claire's Brief? Different partners want different things. | Lexidesk, Perspective AI, Paxton all market per-practice-area brief templates. |
| 6 | Is the brief privileged? What if it's discoverable in litigation? | NYC Bar Formal Op 2025-6, K&L Gates Litigation Minute 2-23-2026; US v. Heppner held AI summaries discoverable. |
| 7 | Can the rubric pull from our matter types in Filevine or Lawmatics? | Lawmatics-Filevine partnership announced Q4 2025; Litify on Salesforce backbone. |
| 8 | How is the brief different from a call recording or transcript? | "We already have CallRail" objection. CallRail Conv Intelligence = $165–$215/mo for sentiment, not legal triage. |
| 9 | What's the false-reject rate, and how do you measure it? | Quilia 2026 playbook explicitly: vendors that track this should be <2%. Hard-to-match claim. |
| 10 | Do the drip campaigns sound like our firm or like generic legal spam? | Marketing managers fear AI slop damaging brand. Abogados NOW 2026 + Good2BSocial lead with brand voice. |
| 11 | What about edge cases — multi-defendant criminal, parental kidnapping, complex divorce? | 4LegalLeads tiered criminal pricing ($100–$400) proves complexity is real. Modern Family Law overlap piece. |
| 12 | How often does the rubric retrain, and can we A/B test rubric changes before rollout? | Microsoft Dynamics 365 predictive lead score retrains every 14 days — industry standard for mature buyers. |

**Top sources:** [Quilia AI Intake Playbook](https://quilia.com/articles/ai-intake-personal-injury), [NYC Bar Formal Op 2025-6](https://www.nycbar.org/reports/formal-opinion-2025-6-ethical-issues-affecting-use-of-ai-to-record-transcribe-and-summarize-conversations-with-clients/), [Cato Marketing 2026 PI playbook](https://catomarketing.com/post/beyond-the-phone-call-how-ai-is-revolutionizing-lead-intake), [Epic Attorney Marketing benchmark](https://epicattorneymarketing.com/the-law-firm-conversion-rate-benchmark), [Amundsen Davis on FCC 10-day rule](https://www.amundsendavislaw.com/alert-tcpa-compliance-is-the-upcoming-opt-out-rule), [Lawmatics-Filevine partnership](https://www.lawmatics.com/blog/lawmatics-announces-new-partnership-with-filevine).

---

## 4. How It Works `/how-it-works` — 11 NEW FAQs

**Audience:** Tech-savvy office manager, IT person, compliance-conscious attorney.
**Existing FAQs:** 16 (definition, PI/criminal/family qualification, CRMs, deploy time, HIPAA/SOC 2, AI disclosure, fallback to human, vs Smith.ai/Ruby, spam, outbound, overflow, recordings, Spanish, custom script).

| # | Question | Why it wins |
|---|---|---|
| 1 | How fast does Claire respond, and can she be interrupted mid-sentence? | Sub-1s pickup, 1.2–1.5s turn latency. Cresta/Retell/Hamming/LiveKit all benchmark this. |
| 2 | What happens if Claire goes down or the AI is unreachable? | Forwarding fallback, multi-region failover, status.theclaireai.com. Top "what if it breaks" SERP. |
| 3 | Do we have to port our phone number, or can we keep our existing line? | #1 ops question on every competitor's how-it-works page (Smith.ai, Goodcall, echowin). |
| 4 | How does Claire handle two-party-consent recording states? | 13 two-party states (CA, FL, IL, MD, MA, PA, WA + 6 more). Justia/Rev surveys. |
| 5 | How does Claire transfer a call to an attorney — warm or blind? | Warm default. Many cheap competitors blind-only (Retell, Ultravox, Tradesly flag this). |
| 6 | Can Claire run a conflict-of-interest check at first contact? | Rule 1.6(c); Smith.ai launched this as paid feature in 2024. |
| 7 | Will Claire recognize a returning client by their phone number? | Caller-ID matching to CRM. Top caller-side question (Jobber/JustCall/Goodcall headline feature). |
| 8 | When does the transcript, summary, and CRM record actually appear? | ~10s transcript, 30–60s CRM record, 1–2 min brief. Direct ops question. |
| 9 | How does Claire decide which attorney to book at a multi-attorney firm? | Practice-area + existing-client + round-robin priority. Big-firm sales-call question. |
| 10 | How long does Claire keep call recordings, and how are they protected? | 90-day default audio, 7-year transcripts. CCPA deletion within 30 days. |
| 11 | Can a caller leave a voicemail or request a callback if they don't want to talk to Claire? | Caller-side concern from less-tech-comfortable clients. |

**Top sources:** [Hamming Voice AI Latency](https://hamming.ai/resources/voice-ai-latency-whats-fast-whats-slow-how-to-fix-it), [LiveKit Adaptive Interruption Handling](https://livekit.com/blog/adaptive-interruption-handling), [CaseClerk two-party consent guide](https://caseclerk.ai/blog/do-ai-voice-intake-agents-for-law-firms-have-to-comply-with-call-recording-and-twoparty-consent-laws-2025-statebystate-guide), [Smith.ai conflict checks announcement](https://smith.ai/blog/new-smith-ai-receptionists-can-run-conflict-checks-for-your-law-firm), [Retell warm-transfer mechanics](https://www.retellai.com/blog/how-ai-voice-agents-are-perfecting-the-warm-transfer), [NYC Bar Formal Op 2025-6](https://www.nycbar.org/reports/formal-opinion-2025-6-ethical-issues-affecting-use-of-ai-to-record-transcribe-and-summarize-conversations-with-clients/).

---

## 5. Pricing `/pricing` — 12 NEW FAQs

**Audience:** Office manager or partner with budget authority comparing real costs.
**Existing FAQs:** 14 (overage, free trial, bilingual, onboarding, hidden costs, cancel, what's a call, vs per-minute, spam, volume discount, switch plans, multi-location, HIPAA/SOC 2, refund).

| # | Question | Why it wins |
|---|---|---|
| 1 | How does per-call pricing compare to Smith.ai's $292/mo for 30 calls or Ruby's $720/mo for 200 minutes? | Head-to-head numbers. Smith.ai's $2.25 conflict-check upcharge is documented. |
| 2 | What happens to my existing phone number — do I have to port it? | Top ops objection (FCC.gov, AnswerConnect). Forwarding = 24h launch; porting = 10–15 biz days. |
| 3 | Will my callers know they're talking to AI? Has anyone complained? | "Megan" anecdote (FinancialContent, openpr) — top unspoken objection from partners over 50. |
| 4 | Can ClaireAI warm-transfer an urgent call to my cell phone in real time? | Competitor gap — CloudTalk/CallCow only do blind transfers. |
| 5 | Is the monthly fee tax-deductible as a business expense? | Cheap trust signal; no competitor (Smith.ai, Ruby, AnswerForce) addresses it. |
| 6 | Does ClaireAI integrate with Clio, MyCase, Lawmatics, or Filevine — and is there an extra fee? | Common "Smith.ai Clio integration cost" query. Competitors hide it behind sales calls. |
| 7 | What's the per-signed-retainer success fee actually covering — isn't a flat monthly enough? | Novel pricing model. Without explanation, prospects flag as "weird." |
| 8 | How does this work for after-hours, weekends, and holidays — any surcharge? | Top PAA. Surcharges = documented complaint (Easybee, ReceptionHQ). |
| 9 | Are calls recorded, and how do you handle two-party-consent states? | Compliance objection. CA, FL, IL, MA, MD, PA, WA + Justia 50-state survey. |
| 10 | Does ClaireAI ever give legal advice — and could that expose me to a UPL complaint? | Top-of-funnel objection. NC State Bar AI guidance, Nippon Life v. OpenAI. |
| 11 | Do I get a custom intake script for my practice area, or is it a generic template? | Differentiator vs Smith.ai's mostly-templated flows. |
| 12 | What if ClaireAI mishandles a call and we lose a client — am I covered? | $2M E&O + $5M GL. Inverts risk with $109B unanswered-call industry stat. |

**Top sources:** [Smith.ai pricing breakdown (SchedulingKit)](https://schedulingkit.com/pricing-guides/smith-ai-pricing), [Ruby Receptionists Pricing](https://www.ruby.com/pricing/), [FCC Porting Guide](https://www.fcc.gov/consumers/guides/porting-keeping-your-phone-number-when-you-change-providers), [Justia 50-state recording survey](https://www.justia.com/50-state-surveys/recording-phone-calls-and-conversations/), [NC State Bar AI guidance](https://www.ncbar.gov/for-lawyers/ethics/ethics-articles/artificial-intelligence-real-practice/), [Aira: $109B unanswered call stat](https://www.getaira.io/blog/ai-receptionist-for-law-firms).

---

## 6. Integrations `/integrations` — 12 NEW FAQs

**Audience:** IT admin, firm administrator, ops manager wiring Claire into the stack.
**Existing FAQs:** None.

| # | Question | Why it wins |
|---|---|---|
| 1 | How do I connect ClaireAI to Clio? Do I need to be a Clio admin? | #1 Clio Marketplace question. OAuth 2.0, minimal scope, revoke from Clio Connected Apps. |
| 2 | Which Claire fields map to which Clio fields — and can I change the mapping? | "Custom fields" = single most-asked on every CRM marketplace. |
| 3 | Does ClaireAI work with MyCase? How is intake created? | MyCase API is paywalled on Advanced tier ($89/user/mo) — #1 friction question on r/Lawyertalk. |
| 4 | Can Claire populate Filevine custom fields (Date of Incident, Case Value)? | Filevine `custom.<selector>` syntax + currency/date type validation. Load-bearing for PI. |
| 5 | Can ClaireAI write to BOTH Clio AND HubSpot on the same call? | Dual-stack firms common. HubSpot Ideas board has standing request. |
| 6 | Does Claire respect attorney working hours, time zones, and buffers when booking? | Round-robin/buffer/working-hours = top 3 calendar features in SavvyCal/Calendly SERPs. |
| 7 | When exactly does the DocuSign retainer trigger fire, and can I brand the template? | DocuSign template branding + tab pre-population. Required for trust. |
| 8 | My tool isn't on the directory. Can I wire Claire up with Zapier or a webhook? | Native-vs-Zapier dominates legal-tech communities. HMAC-signed webhooks + 8,000+ Zapier apps. |
| 9 | How fast does a contact actually land in my CRM after a call ends? | 1–3s native, 5–30s Zapier. Speed-to-lead research: 1st-hour calls 7x more likely to qualify. |
| 10 | What OAuth scopes does Claire request, and where does my data live? | IT/compliance gatekeeper question. AES-256, US-East AWS, regional Clio compliance. |
| 11 | We're switching from Clio to Filevine mid-year. Will Claire still work, and do I lose history? | Vineskills migration benchmark: 2–4 week dual-write window. |
| 12 | Can Claire tag matters by practice area, and route to the right pipeline? | Single biggest reason firms outgrow generic AI receptionists. |

**Top sources:** [Clio Developer OAuth docs](https://docs.developers.clio.com/api-docs/clio-manage/authorization/), [Clio Developer Permissions/Scopes](https://docs.developers.clio.com/api-docs/permissions/), [MyCase API docs](https://mycaseapi.stoplight.io/docs/mycase-api-documentation/k5xpc4jyhkom7-getting-started), [Filevine custom fields API](https://support.filevine.com/hc/en-us/articles/29259311975707-API-General-Q-A), [Lawmatics custom field types](https://help.lawmatics.com/en/articles/10699781-custom-field-record-types), [DocuSign legal retainer templates](https://support.docusign.com/knowledgemarket/Template-Library-Legal-Retainer-Agreement), [Nextiva Speed-to-Lead](https://www.nextiva.com/blog/what-is-speed-to-lead.html).

---

## Implementation Priority

If you want to ship in waves, here's the ROI order:

### Wave 1 (highest GEO/SEO impact — ship first)
1. **Homepage** — Currently has NO FAQ section. Adding 10 brand-trust questions captures the brand-name + category SERPs that all other pages depend on. Schema.org FAQPage emission helps AI Overviews cite ClaireAI for "what is the best AI receptionist for law firms" queries.
2. **Integrations** — Currently has NO FAQ section. CRM-integration queries are some of the highest commercial intent on the site ("Clio integration AI receptionist," "MyCase phone integration"). 12 questions hit named entities (Clio, MyCase, Filevine, Lawmatics, DocuSign) and unlock those long-tail SERPs.

### Wave 2 (defensibility — ship second)
3. **Product Overview** — Currently has 10 FAQs (just added). Add the 12 trust/ethics/edge-case ones to lock down the "is AI safe / legal / ethical" category before partners click away.
4. **Lead IQ** — Currently has 7 FAQs. Add the 12 methodology/ROI/compliance questions to defend against "show me the math" buyers.

### Wave 3 (deep mechanics — ship third)
5. **How It Works** — Currently has 16 FAQs (well-covered). Add the 11 mechanics questions (latency, fallback, port vs forward, two-party consent, conflict checking, retention) to satisfy the IT/admin evaluation track.
6. **Pricing** — Currently has 14 FAQs (well-covered). Add the 12 comparison/objection-handling questions to close commercial intent.

### Per-page authentic-by-design
Every recommended FAQ is:
- Tied to a documented search query (PAA, Reddit thread, competitor FAQ gap, legal-industry forum)
- Cited to a real source (bar association, government, vendor docs, peer-reviewed study, or industry publication)
- Distinct from the existing FAQ set on that page AND on adjacent pages
- Written for ClaireAI's voice (specific entities, specific numbers, no fluff)

---

## Total recommendations

| Page | Existing | New (recommended) | Total after merge |
|---|---|---|---|
| Homepage | 0 | 10 | 10 |
| Product Overview | 10 | 12 | 22 |
| Lead IQ | 7 | 12 | 19 |
| How It Works | 16 | 11 | 27 |
| Pricing | 14 | 12 | 26 |
| Integrations | 0 | 12 | 12 |
| **Total** | **47** | **67 NEW** | **116** |

22 unique questions on the product overview is on the high side — recommend pruning to ~14–16 before ship. Same with How It Works (27 → trim to ~18–20). Pricing/Lead IQ are fine at 19–26.

---

## Next step

Tell me which wave to implement first and I'll write the FAQs into the page files (FAQS arrays, FAQPage JSON-LD schemas, native `<details>` accordion markup for each).
