# AI Citation Mechanics — How AI Engines Select & Cite Web Sources (Mid-2026)

**Date:** 2026-06-22
**Scope:** How Google AI Overviews/AI Mode, ChatGPT, Claude, Perplexity, and Bing/Copilot select and CITE (not merely crawl) web sources as of mid-2026, plus resolution of six high-stakes questions (A–F) for ClaireAI ("AI legal intake / AI legal receptionist," product "ClaireAI 365," theclaireai.com).
**Method:** Direct primary-source fetches (Google Search Central, OpenAI developer docs, Anthropic/Claude help center, Perplexity docs, Cloudflare press/blog, Bing Webmaster blog) + 2026 studies (Ahrefs, Search Engine Land, SEJ, Search Engine Roundtable, searchVIU, Princeton GEO). Every substantive claim carries an inline source URL. Recency noted per source.
**Honesty note:** WebFetch returns AI-summarized page content, not raw HTML. Where a primary source contradicts a secondary blog, the primary source is treated as authoritative and the contradiction is flagged. One such contradiction (Google-Extended vs AI Overviews) is documented in §1 and Question D.

---

## CROSS-ENGINE CRAWLER / USER-AGENT MAP (the load-bearing table)

For each engine there are up to three distinct bot roles. Conflating them is the single most expensive GEO mistake.

| Engine | TRAINING crawler (blocking = no training; citation usually unaffected) | SEARCH-INDEX crawler (blocking = removed from that engine's cited answers) | LIVE USER-FETCH agent (fires on a user's question; may ignore robots.txt) |
|---|---|---|---|
| **Google** | `Google-Extended` (token only; controls Gemini training/grounding) | `Googlebot` (same crawler that powers Search; AI Overviews/AI Mode are "rooted in core Search") | (served from index; no separate live-fetch UA publicly documented) |
| **OpenAI/ChatGPT** | `GPTBot` | `OAI-SearchBot` | `ChatGPT-User` |
| **Anthropic/Claude** | `ClaudeBot` | `Claude-SearchBot` (NEW — three-bot framework) | `Claude-User` |
| **Perplexity** | (none declared for training; Perplexity denies training) | `PerplexityBot` (obeys robots.txt) | `Perplexity-User` (ignores robots.txt) |
| **Microsoft/Bing/Copilot** | (Bing index) | `bingbot` | (served from Bing index; Copilot = Bing index + GPT) |

Sources for this table are cited inline in each engine section below.

---

## 1. GOOGLE — AI Overviews (AIO) + AI Mode (Gemini)

### Crawlers / user-agents
- AI Overviews and AI Mode are served by **Googlebot — the same crawler that powers organic Search**, not a separate AI crawler. Google: "The best practices for SEO continue to be relevant because our generative AI features on Google Search are rooted in our core Search ranking and quality systems." [Google Search Central, AI optimization guide, fetched 2026-06-22] https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- **Prerequisite for AI citation:** "To be eligible to be shown in generative AI features on Google Search, a page must be indexed and eligible to be shown in Google Search with a snippet, fulfilling the Search technical requirements." [Google Search Central, AI optimization guide] https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — i.e., you must be in the index and not `nosnippet`/blocked.
- **`Google-Extended`** is a robots.txt token that controls whether content is used for **Gemini model training and grounding**. Multiple secondary sources summarize Google's position that Google-Extended "has no effect on Google Search, including AI Overviews and AI Mode," which are served by Googlebot. [aicrawlercheck.com, 2026; DemandSphere, 2026] https://aicrawlercheck.com/blog/google-extended-vs-googlebot · https://www.demandsphere.com/blog/google-ai-optimization-guide-ai-search-is-still-search/
  - **CONTRADICTION (flagged honestly):** one secondary source claimed "blocking Google-Extended DOES remove you from AI Overviews and Gemini." [aicrawlercheck.com] This conflicts with Google's own framing that AIO/AI Mode run on Googlebot/Search systems, and Search Central's AI guide does not state Google-Extended blocks AIO. **Resolution: trust the primary source.** Do NOT block Googlebot. The safe, conservative posture for ClaireAI: leave Googlebot fully allowed (mandatory for AIO citation); blocking Google-Extended only forfeits Gemini *training* and is low-risk to citation — but given the ambiguity, ClaireAI should leave Google-Extended allowed too (we want maximum citability, and ClaireAI gains nothing from blocking training).

### Cite-source selection & query fan-out
- AI Mode/AIO use **query fan-out**: a single query is decomposed into multiple simultaneous sub-queries ("fan-out queries"), each running its own SERP, and the answer is synthesized across all of them. [Search Engine Land, 2026] https://searchengineland.com/ai-overview-fan-out-rankings-boost-citation-odds-study-466426 · [Search Engine Land AIO guide] https://searchengineland.com/guide/how-to-optimize-for-ai-overviews
- **Ranking for fan-out sub-queries matters more than ranking for the head term:** "Pages ranking for fan-out queries are 161% more likely to be cited than pages ranking only for the main query." [Search Engine Land, 2026] https://searchengineland.com/ai-overview-fan-out-rankings-boost-citation-odds-study-466426
- Citation is **passage-level**: AIO extracts the specific passage that answers a sub-query, not the whole page.

### Classic ranking vs AIO citation — the decoupling (UPDATED, stronger than May-2026 posture)
- Ahrefs (863K keyword SERPs, 4M AIO URLs, **published 2026-03-02**): only **37.9%** of AIO-cited pages also rank top-10 — **down from ~76% in July 2025**. The rest: **31.2%** from positions 11–100, **31.0%** from beyond position 100. [Ahrefs, 2026-03-02] https://ahrefs.com/blog/ai-overview-citations-top-10/
- The decline is attributed to broader fan-out reliance, possibly amplified by **Gemini 3 (Jan 2026)**: AIO is "relying less on the direct search results and more on the sources showing up in fan-out query SERPs." [Ahrefs, 2026-03-02] https://ahrefs.com/blog/ai-overview-citations-top-10/
- Even lower overlaps in other datasets: BrightEdge ~17% top-10 overlap; Moz 40K-keyword study found only **12% of AI Mode citations** matched top-10 organic URLs. [almcorp.com synthesis, 2026] https://almcorp.com/blog/google-ai-mode-cites-itself-organic-links-seo-2026/ · [SEJ, 2026] https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/
- **Google cites itself:** Google AI Mode cites Google.com properties in ~17% of answers (SE Ranking Feb 2026: 17.42% of AI Mode citations are Google.com). [almcorp.com, 2026] https://almcorp.com/blog/google-ai-mode-cites-itself-organic-links-seo-2026/
- **Implication:** ranking top-10 is *sufficient-ish but no longer necessary*. You must be indexed and snippet-eligible; beyond that, breadth of coverage across the fan-out (many sub-topic pages each ranking somewhere in top-100) beats one page ranking #1.

### Freshness
- AIO/AI search show a **strong recency bias** (see Question E / freshness section): AI-cited URLs average 25.7% fresher than top-10 organic. [Ahrefs, 17M citations] https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/

### Structured data for AIO (primary-source verdict)
- Google, verbatim: "**Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add.** However, it's a good idea to continue using it as part of your overall SEO strategy, as it helps with being eligible for rich results on Google Search." [Google Search Central, AI optimization guide, fetched 2026-06-22] https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- See Question A for the full schema verdict.

---

## 2. OPENAI — ChatGPT (Search mode + in-app browsing)

### The three user-agents and their roles (from OpenAI's own docs)
[OpenAI developer docs, "Overview of OpenAI Crawlers," fetched 2026-06-22] https://developers.openai.com/api/docs/bots

| Bot | Exact UA token | Purpose (OpenAI's words) |
|---|---|---|
| **GPTBot** | `GPTBot/1.3` (`+https://openai.com/gptbot`) | AI model **training** |
| **OAI-SearchBot** | `OAI-SearchBot/1.3` (`+https://openai.com/searchbot`) | **Search indexing** for ChatGPT search |
| **ChatGPT-User** | `ChatGPT-User/1.0` (`+https://openai.com/bot`) | **User-triggered in-app fetching** |
| **OAI-AdsBot** | `OAI-AdsBot/1.0` | Ad-safety validation |

### What gets cited & the opt-out independence (CONFIRMED from OpenAI docs)
- **OAI-SearchBot is the citation gatekeeper.** OpenAI: "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers, though can still appear as navigational links." [OpenAI docs] https://developers.openai.com/api/docs/bots — **so OAI-SearchBot MUST be allowed to be cited in ChatGPT Search.**
- **ChatGPT-User & robots.txt:** "ChatGPT-User is not used for crawling the web in an automatic fashion. Because these actions are initiated by a user, robots.txt rules may not apply." [OpenAI docs] https://developers.openai.com/api/docs/bots — i.e., blocking ChatGPT-User in robots.txt may not stop live in-app fetches.
- **Training is independent of search/citation.** "Each setting is independent" — disallowing GPTBot stops training but **does not** prevent OAI-SearchBot from indexing you for search visibility. [OpenAI docs, via amicited.com summary] https://www.amicited.com/blog/gptbot-vs-oai-searchbot/ · confirmed by OpenAI docs https://developers.openai.com/api/docs/bots
- **DEFINITIVE for Question D (ChatGPT):** Blocking **GPTBot** (training) while allowing **OAI-SearchBot** + **ChatGPT-User** **preserves citability.** You can opt out of training and stay fully citable in ChatGPT Search. [OpenAI docs] https://developers.openai.com/api/docs/bots

### Source selection / Bing dependency
- ChatGPT Search retrieves from OpenAI's own OAI-SearchBot index, but the broader generative-search ecosystem still leans on **Bing's index** through the OpenAI–Microsoft partnership; "Bing rank is a structural input to which pages ChatGPT can retrieve." [Parse, 2026] https://parse.gl/blog/bing-rankings-chatgpt-visibility — so Bing SEO (Bing Webmaster Tools, IndexNow) is an indirect ChatGPT lever (see §5).

### Freshness & content signals
- **ChatGPT has the most aggressive recency bias of any engine: 76.4% of its most-cited pages were updated within the last 30 days.** [Ahrefs freshness study] https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/ · synthesis https://authoritytech.io/blog/content-freshness-seo-ai-2026
- ChatGPT heavily cites third-party review/community ecosystems (G2, Reddit, listicles) — see Question C/F.
- Structured data: not used at live fetch (searchVIU test, Question A).

---

## 3. ANTHROPIC — Claude (web search + in-app browsing)

### The three bots (NEW 2026 three-bot framework — UPDATE vs prior posture)
Anthropic clarified its crawler docs in 2026 to a **three-bot framework**, adding a dedicated search crawler. [Search Engine Land, 2026] https://searchengineland.com/anthropic-claude-bots-470171 · [SEJ, 2026] https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/ · [Search Engine Roundtable, 2026] https://www.seroundtable.com/anthropic-updates-its-crawler-docs-40978.html · [Claude Help Center] https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

| Bot | Role |
|---|---|
| **ClaudeBot** | Collects public web content for **training** Anthropic's models. Block it → excluded from future training datasets. |
| **Claude-SearchBot** | Crawls to **improve Claude's search results**. Block it → "Anthropic won't index your content for search optimization, which may reduce visibility and accuracy in Claude-powered search answers." |
| **Claude-User** | **Live user-initiated fetch** — retrieves a page when a Claude user asks a question requiring it. Block it → "Anthropic can't fetch your pages in response to user queries." |

- All three respect robots.txt and can be controlled independently. [Claude Help Center] https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler · [PPC Land, 2026] https://ppc.land/anthropic-clarifies-what-its-three-web-crawlers-do-and-how-to-block-them/
- Legacy UAs `Claude-Web` and `anthropic-ai` are deprecated; you may still see `claude-web` in old logs. [SEJ, 2026] https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/

### What must stay unblocked to be cited in Claude
- To be **cited in Claude's web-search answers**, allow **Claude-SearchBot** (index) and **Claude-User** (live fetch on user query). Blocking **ClaudeBot** only forfeits training. [Claude Help Center] https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler — same opt-out-of-training-but-stay-citable pattern as OpenAI.

### Content signals & structured data
- Claude extracts **only visible HTML** at live retrieval; JSON-LD is ignored at fetch time (searchVIU 5-engine test included Claude — see Question A). https://www.searchviu.com/en/schema-markup-and-ai-in-2025-what-chatgpt-claude-perplexity-gemini-really-see/
- Claude's web search quality is improving via its own Claude-SearchBot index plus live Claude-User fetches; optimize the same way as the other engines (be indexed/allowed, answer-first passages, freshness).

---

## 4. PERPLEXITY

### Two user-agents (from Perplexity's docs)
[Perplexity docs, "Perplexity Crawlers," fetched 2026-06-22] https://docs.perplexity.ai/docs/resources/perplexity-crawlers

| Bot | Role | robots.txt |
|---|---|---|
| **PerplexityBot** | "Designed to **surface and link websites in search results** on Perplexity." Not for training. | **Obeys robots.txt.** "To ensure your site appears in search results, we recommend allowing PerplexityBot." |
| **Perplexity-User** | "Supports user actions… When users ask Perplexity a question, it might visit a web page." Live, on-demand. | **"This fetcher generally ignores robots.txt rules."** |

- **Citation gatekeeper = PerplexityBot.** It "is the crawler that must be allowed for Perplexity to cite your site in answers." [Perplexity docs] https://docs.perplexity.ai/docs/resources/perplexity-crawlers

### The Cloudflare stealth-crawling controversy (2025–2026 status)
- **2025-08-04:** Cloudflare published "Perplexity is using stealthy, undeclared crawlers to evade website no-crawl directives" — alleging rotating IPs/ASNs, spoofed Chrome-on-macOS UAs, and bypassing robots.txt even after PerplexityBot + Perplexity-User were WAF-blocked. [Cloudflare blog, 2025-08-04] https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/
- Cloudflare **de-listed Perplexity as a verified bot** and added managed-rule heuristics to block the stealth traffic. [Silicon Republic, 2025] https://www.siliconrepublic.com/start-ups/cloudflare-de-lists-perplexity-alleges-stealth-scraping
- Perplexity's counter: "an agent isn't a bot," characterized the traffic as real-time "AI browsing" on behalf of users (not crawling), and blamed BrowserBase for volume. [Perplexity Hub] https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web · [Search Engine World] https://www.searchengineworld.com/perplexity-responds-to-cloudflare
- **2025-10-22:** Reddit sued Perplexity + 3 scrapers for circumventing technical controls. [PPC Land, 2025] https://ppc.land/perplexity-denies-training-ai-models-as-cloudflare-documents-stealth-crawlers/
- **Practical takeaway for ClaireAI:** allow **PerplexityBot** to be citable; **Perplexity-User ignores robots.txt anyway**, so the only reliable block is at the WAF — and ClaireAI does NOT want to block Perplexity (we want citations). Net: leave both allowed.

### Source selection & content signals
- Perplexity blends its own PerplexityBot index with live Perplexity-User fetches; it is citation-dense (multiple inline sources per answer) and freshness-biased. [SeerInteractive, 2025] https://www.seerinteractive.com/insights/perplexity-stealth-ai-crawling-and-the-impacts-on-geo-and-log-file-analysis
- Heavily cites G2/Reddit/community for software-comparison queries (Question F).

---

## 5. MICROSOFT — Bing / Copilot

### Crawler & architecture
- **Copilot = Bing index + GPT.** "Copilot retrieves candidates from Bing's index, then GPT writes a cited answer." So Copilot citation is "mostly classic Bing SEO" via **bingbot**. [Winston Digital playbook, 2026] https://www.winstondigitalmarketing.com/playbooks/bing-copilot-optimization/ · [Parse, 2026] https://parse.gl/blog/bing-rankings-chatgpt-visibility
- **Bing's index has outsized leverage:** it "feeds ChatGPT, Copilot, DuckDuckGo, Ecosia, and other generative engines." [Parse, 2026] https://parse.gl/blog/bing-rankings-chatgpt-visibility — Bing SEO is a multi-engine lever.

### Two gates to Copilot citation
"Citation is two gates: (1) be indexed and ranking in Bing for the query (pure Bing SEO — submit via Bing Webmaster Tools, ping IndexNow, earn links); (2) be the clearest, most liftable answer once the model reads it." [Parse, 2026] https://parse.gl/blog/bing-rankings-chatgpt-visibility

### IndexNow & the new AI Performance report (2026)
- **IndexNow** notifies Bing (and partners) instantly on add/update/delete, "ensuring AI systems reference the most current version of a page." [Bing Webmaster help] https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- **2026-02:** Microsoft launched **AI Performance in Bing Webmaster Tools (public preview)** — shows how often your content is cited across Copilot, Bing AI summaries, and partner integrations, with per-URL citation data. [Bing Webmaster blog, 2026-02] https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview · [ALM Corp guide] https://almcorp.com/blog/bing-ai-performance-webmaster-tools-complete-guide/
- **Action for ClaireAI:** register in Bing Webmaster Tools, enable IndexNow, monitor the AI Performance report — this is the cheapest direct measurement of AI citations available, and it indirectly benefits ChatGPT (shared Bing dependency).

---

# RESOLUTION OF THE SIX HIGH-STAKES QUESTIONS (A–F)

## A. "Schema / structured data produces ZERO measurable AI-citation lift." — **CONFIRMED (mid-2026). Keep for entity/rich-results, expect ~0 AI-citation lift.**

**Verdict: TRUE.** No major engine uses JSON-LD to *select* or *ground* AI citations at retrieval time. Three independent lines of evidence:

1. **Ahrefs controlled test (published 2026-05-11):** 1,885 pages that added JSON-LD vs 3 matched control pages each, measured 30 days before/after across AIO, AI Mode, ChatGPT. Result: **Google AIO −4.6%, AI Mode +2.2%, ChatGPT +2.4% — all indistinguishable from zero.** Ahrefs: "Pages with schema are cited more often by AI, but this is a sign of overall site quality rather than schema's direct impact." [SEJ, 2026-05-11] https://www.searchenginejournal.com/schema-markup-didnt-move-ai-citations-in-ahrefs-test/574568/ · [Search Engine Roundtable] https://www.seroundtable.com/study-schema-citations-study-41311.html
   - Note: pages with schema were ~3× more likely to be AI-cited in a 6M-URL correlation — but the controlled experiment shows that's confounded by site quality, NOT causal. [SEJ] https://www.searchenginejournal.com/schema-markup-didnt-move-ai-citations-in-ahrefs-test/574568/
   - **Caveat (honest):** all tested pages already had 100+ AI citations, so the study can't prove schema doesn't help *undiscovered* pages get a first citation. [SEJ] https://www.searchenginejournal.com/schema-markup-didnt-move-ai-citations-in-ahrefs-test/574568/ A dissent argues the study "tested the wrong thing" (visibility ≠ disambiguation). [I Love SEO] https://www.iloveseo.net/the-ahrefs-schema-study-is-right-and-its-testing-the-wrong-thing/

2. **searchVIU 5-engine live-retrieval test (Dec 2025):** identical pages with/without schema; asked ChatGPT, Claude, Gemini, Perplexity, Google AI Mode to extract data. **At live/direct fetch, all five extracted only visible HTML; JSON-LD/Microdata/RDFa were ignored — even when the data existed nowhere else on the page.** Only Gemini rendered JS at direct fetch. [searchVIU, Dec 2025] https://www.searchviu.com/en/schema-markup-and-ai-in-2025-what-chatgpt-claude-perplexity-gemini-really-see/

3. **Google's own docs (primary):** "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add." [Google Search Central] https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

**Nuance / what schema IS still for:** rich results in classic Search, and entity disambiguation / Knowledge Graph (which *indirectly* helps an AI associate ClaireAI with the right entity). Google: keep using it "as part of your overall SEO strategy." Also note **FAQPage rich results were retired May 7, 2026** (consistent with prior posture; tooling sunset June 2026), so FAQPage schema now earns zero SERP treatment — but keep visible FAQ *content* (it's still passage-extracted). [authoritytech.io, 2026] https://authoritytech.io/curated/schema-markup-ai-citations-ahrefs-study-2026
**ClaireAI action:** keep `Organization` + `WebApplication`/`SoftwareApplication` + `BreadcrumbList` for entity + rich results; don't invest further effort in schema expecting AI-citation lift.

## B. "Skip llms.txt — no engine consumes it." — **CONFIRMED (mid-2026). Still nobody consumes it. Same for /.well-known agent-discovery in the citation path.**

**Verdict: TRUE.** Strong, recent, multi-source evidence:
- **Server-log studies:** Across 500M+ AI-bot visits over 90 days, only **408** requests targeted `/llms.txt`; of ~38,000 domains with a valid llms.txt, **97% got zero requests for it in May 2026.** GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended overwhelmingly skip it and crawl HTML directly. [codersera, May 2026] https://codersera.com/blog/llms-txt-complete-guide-2026/ · [rye.dev "Why Nobody Uses It"] https://rye.dev/blog/llms-txt-standard-elegant-solution-nobody-using/
- **Google primary statements:** Gary Illyes (July 2025) — Google doesn't support llms.txt and isn't planning to. John Mueller: "AFAIK none of the AI services have said they're using LLMs.TXT (and you can tell when you look at your server logs that they don't even check for it)"; he likened it to the discredited keywords meta tag. [Ahrefs] https://ahrefs.com/blog/what-is-llms-txt/ · [Semrush] https://www.semrush.com/blog/llms-txt/
- **Distinction:** the *spec exists* (llmstxt.org) and some dev-doc tools support it for paste-into-chat workflows, but **no production search/citation engine fetches it for grounding.** [Ahrefs] https://ahrefs.com/blog/what-is-llms-txt/
- **/.well-known agent-discovery (RFC 9727 api-catalog, agent-skills manifest, DNS-AID SVCB/HTTPS, RFC 8288 Link headers):** these are emerging agent-interop specs, not citation-selection inputs. No evidence any AI *search/citation* engine consumes them to decide what to cite as of mid-2026. They matter for *agentic task execution* (an agent calling your API/MCP), which is a different surface than getting cited in an answer.

**ClaireAI action:** llms.txt is harmless to keep but expect zero citation value. The agent-discovery files already shipped (per `seo-deep-dive/07-agent-discovery.md`) are forward-looking bets on agentic commerce, not citation levers — fine to keep, but don't count them toward AI-citation goals. Don't spend more time here.

## C. "Brand mentions ~3× backlinks for AIO; YouTube is the #1 AIO citation source." — **(1) CONFIRMED. (2) UPDATED: YouTube is now #1 most-cited domain *overall* and the strongest *correlated signal*, but in Google AIO specifically it's neck-and-neck with Reddit (YouTube ~19% AIO source share vs Reddit ~21%).**

**(1) Brand mentions vs backlinks — CONFIRMED.** Ahrefs studied **75,000 brands**: branded web mentions correlate **r=0.664** with AI visibility vs backlinks **r=0.218** — a ~3:1 gap. "A backlink tells an AI system where to navigate; a brand mention tells it what to trust." [Ahrefs, "AI Overview brand correlation"] https://ahrefs.com/blog/ai-overview-brand-correlation/ · https://ahrefs.com/blog/ai-brand-visibility-correlations/ · [Matt Diggity confirming 0.664 vs 0.218] https://x.com/mattdiggityseo/status/1940303316157936113

**(2) YouTube — UPDATED & strengthened.** The Dec-2025 Ahrefs follow-up (extended to ChatGPT + AI Mode) found **YouTube mentions correlate r≈0.737 with AI visibility — the single strongest signal of all.** [BusinessWire/Ahrefs, 2026-05-26] https://www.businesswire.com/news/home/20260526119691/en/ · [Ahrefs] https://ahrefs.com/blog/ai-brand-visibility-correlations/
   - **As a cited DOMAIN:** YouTube has **overtaken Reddit as the #1 most-cited domain across LLM answers** (~16% of AI answers vs Reddit ~10%). [Search Engine Land, 2026] https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138 · [Adweek, 2026] https://www.adweek.com/media/youtube-reddit-ai-search-engine-citations/ · [Contently, 2026-04] https://contently.com/2026/04/29/top-sources-llms-cite/
   - **Per-engine nuance (the update):** in **Google AI Overviews specifically**, YouTube ≈ **19%** source share while **Reddit ≈ 21%** — near parity, Reddit slightly ahead in AIO. [Similarweb] https://www.similarweb.com/blog/marketing/geo/most-cited-domains-llms/ · [almcorp, 30M-source study] https://almcorp.com/blog/top-domains-cited-by-ai-search/
   - **G2 = the dominant software-review citation source** across ChatGPT, Perplexity, and AIO — critical for B2B SaaS. [Similarweb] https://www.similarweb.com/blog/marketing/geo/most-cited-domains-llms/
   - Reality check: Wikipedia + Reddit + LinkedIn + YouTube combined rarely top ~5% on some measures; the long tail (~95%) is thousands of domains. [Search Engine Land] https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138

**ClaireAI action:** brand-mention earning > link-building; launch a YouTube channel (demos + legal-intake explainers); get into G2/Capterra and Reddit legal-tech threads (see F).

## D. Does Cloudflare blocking / pay-per-crawl AI crawlers HURT citability? — **YES if you block the SEARCH/USER agents; NO if you block only TRAINING crawlers. Over-broad "block all AI bots" rules are the real danger.**

- **Cloudflare's 2025 shift:** since **2025-07-01 ("Content Independence Day"), new domains are asked at signup whether to allow AI crawlers and AI scraping is blocked by default**; Cloudflare also launched **Pay Per Crawl** (private beta) — per-crawler **Allow / Charge / Block**, with crawlers stating purpose (train / inference / search-index). [Cloudflare press, 2025-07-01] https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/ · [Cloudflare blog] https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/ · [Nieman Lab] https://www.niemanlab.org/2025/07/cloudflare-will-block-ai-scraping-by-default-and-launches-new-pay-per-crawl-marketplace/
- **The danger:** a blanket "block AI bots" / managed AI rule does not distinguish training vs search vs live-fetch UAs by default. Blocking **OAI-SearchBot, Claude-SearchBot, PerplexityBot, or Googlebot** removes you from those engines' cited answers. Charging via pay-per-crawl effectively blocks any AI company that declines to pay → same citation loss.

**ALLOW / BLOCK matrix for ClaireAI (we want MAX citability):**

| Engine | TRAINING (optional to block; citation safe) | SEARCH-INDEX — **MUST ALLOW to be cited** | LIVE USER-FETCH — **ALLOW (and note robots.txt limits)** |
|---|---|---|---|
| Google | Google-Extended (block = forfeit Gemini training only; *leave allowed given AIO ambiguity*) | **Googlebot** | (index-served) |
| OpenAI | GPTBot (safe to block) | **OAI-SearchBot** | **ChatGPT-User** (ignores robots.txt) |
| Anthropic | ClaudeBot (safe to block) | **Claude-SearchBot** | **Claude-User** |
| Perplexity | (none) | **PerplexityBot** | **Perplexity-User** (ignores robots.txt) |
| Bing/Copilot | — | **bingbot** | (index-served) |

- **Opt-out-of-training-but-stay-citable is real and documented:** blocking GPTBot while allowing OAI-SearchBot+ChatGPT-User preserves ChatGPT citation [OpenAI docs https://developers.openai.com/api/docs/bots]; same pattern for Anthropic (block ClaudeBot, allow Claude-SearchBot+Claude-User) [Claude Help Center https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler]; Google-Extended controls training only [https://developers.google.com/search/docs/fundamentals/ai-optimization-guide].
- **ClaireAI recommendation:** theclaireai.com should **ALLOW all of: Googlebot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, bingbot.** We are a small SaaS that *wants* AI referrals — do NOT enable Cloudflare's default AI-block or pay-per-crawl on the marketing domain. Blocking the training crawlers (GPTBot/ClaudeBot/Google-Extended) is optional and low-value either way; since ClaireAI benefits from being in training corpora too, leave them allowed unless there's a content-licensing strategy. **Audit the Cloudflare bot settings to ensure no managed "AI bot" rule is silently blocking the search/user agents.**

## E. On-page structure that maximizes passage-level citability (B2B SaaS) — concrete checklist.

**Backed by the Princeton GEO paper (KDD 2024, 10K queries, 9 tactics, Bing-Chat-like system):** the tactics that lift citation 30–40% are **Statistics Addition, Quotation Addition, Cite Sources, Fluency Optimization, Authoritative Voice.** Statistics was the single most effective (+up to 40%); expert quotes +41%; authoritative citations +30%; these need no redesign, just restructuring. [Princeton GEO, KDD 2024] https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/ · [DerivateX plain-English] https://derivatex.agency/blog/princeton-geo-paper-plain-english/ · [Sunil Pratap Singh synthesis] https://sunilpratapsingh.com/guides/geo/what-research-says-about-generative-engine-optimization

**Prioritized on-page checklist:**
1. **Answer-first / inverted pyramid** — put the direct answer in the first sentence/paragraph; LLMs extract the most "liftable" passage. [Search Engine Land AIO guide] https://searchengineland.com/guide/how-to-optimize-for-ai-overviews
2. **Add statistics + cite their source** — the #1 GEO lever (+~40%). Original data/benchmarks even better. [Princeton GEO] https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/
3. **Add expert quotations / authoritative voice** (+~41% / +30%). [Princeton GEO via DerivateX] https://derivatex.agency/blog/princeton-geo-paper-plain-english/
4. **Q&A format with question-style H2/H3s**; self-contained answers under each. (FAQPage *content* still passage-extracted even though the rich result died.) [authoritytech.io] https://authoritytech.io/curated/schema-markup-ai-citations-ahrefs-study-2026
5. **Definitional sentences** ("ClaireAI 365 is an AI legal-intake receptionist that…") — standalone, quotable, entity-anchored.
6. **Comparison tables / "X vs Y"** and clean bulleted lists — chunkable, liftable structures.
7. **Freshness signals** — visible "Last updated" date + meaningful `dateModified`. Recency is decisive: AI-cited URLs avg **25.7% fresher** than top-10 organic; **ChatGPT: 76.4% of top-cited pages updated in last 30 days**; **50% of AI-cited content is <13 weeks old**; pages stale >3 months are 3× more likely to lose citations. [Ahrefs] https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/ · [rank-and-convert 13-week rule] https://rank-and-convert.ghost.io/the-13-week-rule-how-content-freshness-drives-ai-search-citations/ · [authoritytech.io] https://authoritytech.io/blog/content-freshness-seo-ai-2026 (only update `dateModified` on *substantive* change — Google detects timestamp-only edits.)
8. **Author E-E-A-T** — named author byline + credentials + `Person` schema + `sameAs` to LinkedIn; real "About"/author pages. Since the **Dec-2025 core update extended E-E-A-T from YMYL-only to all competitive queries**, this is now table stakes for SaaS comparison/how-to pages. [Google AI guide] https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
9. **Chunk-ability** — short paragraphs, semantic HTML, descriptive headings; each section must stand alone when extracted.
10. **Be indexed & snippet-eligible** — non-negotiable prerequisite for Google AIO. [Google] https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

**Legal-industry specifics:** legal queries are heavily YMYL/E-E-A-T-sensitive; AI citation in the legal layer is dominated by a "cartel" of directories — **Chambers, Legal 500, Super Lawyers, Best Lawyers, Martindale, Avvo, Justia** — and individual firms rarely appear as independent voices. [measuremarketing GEO playbook] https://measuremarketing.com/legal-marketing-in-2026-the-ai-search-playbook-lma-didnt-cover/ · [ABA Law Practice, Mar/Apr 2026] https://www.americanbar.org/groups/law_practice/resources/law-practice-magazine/2026/march-april-2026/ai-powered-search-visibility-for-law-firms/ · [Clio] https://www.clio.com/blog/geo-for-law-firms/ For ClaireAI (a *vendor to* firms, not a firm) the relevant citation layer is **legal-tech review/comparison ecosystems** (G2, Capterra, legal-tech reviewer blogs) and the "best AI legal receptionist / Smith.ai alternatives" listicle layer — see F. Watch bar-association advertising-ethics rules when producing legal-consumer content. >75% of legal queries now trigger AIO. [measuremarketing] https://measuremarketing.com/legal-marketing-in-2026-the-ai-search-playbook-lma-didnt-cover/

## F. Single highest-leverage moves for a small legal-tech SaaS to get cited by AI in 2026.

Ranked (leverage × feasibility for a small team):

1. **Get into third-party "best AI legal receptionist 2026" / "Smith.ai alternatives" listicles and review platforms (G2, Capterra).** These are the listicle + review-ecosystem layer AI quotes most for "best X / X alternatives" queries; **G2 is the top software-review citation source across ChatGPT, Perplexity, AIO.** Claim/optimize G2 + Capterra profiles, drive reviews, pitch trade-press roundups. [Similarweb] https://www.similarweb.com/blog/marketing/geo/most-cited-domains-llms/ · [Search Engine Land] https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138
2. **Earn brand mentions (unlinked OK) > backlinks** — 3:1 correlation advantage. Digital PR, podcast guesting, HARO-replacements (Featured.com, Qwoted, Help a B2B Writer), legal trade press (Above the Law, Lawyerist), founder commentary. [Ahrefs] https://ahrefs.com/blog/ai-overview-brand-correlation/
3. **Launch a YouTube channel** (product demos, "how AI legal intake works," objection-handling) — YouTube is the #1 most-cited domain and strongest correlated signal (r≈0.737). [BusinessWire/Ahrefs] https://www.businesswire.com/news/home/20260526119691/en/
4. **Reddit / community presence** (r/Lawyertalk, r/LawFirm, r/SmallLaw, r/legaltech) — Reddit is a top AIO/ChatGPT citation source; Google's Reddit deal amplifies it. Authentic participation, not spam. [Search Engine Land] https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138 · [Contently] https://contently.com/2026/04/29/top-sources-llms-cite/
5. **Own, high-quality comparison/alternatives pages** ("ClaireAI 365 vs Smith.ai," "vs Ruby," "best legal answering service") with stats, tables, named-author E-E-A-T, freshness — these get cited and capture the "discover on ChatGPT, hire on Google" flow. [measuremarketing] https://measuremarketing.com/legal-marketing-in-2026-the-ai-search-playbook-lma-didnt-cover/ · [Clio] https://www.clio.com/blog/geo-for-law-firms/
6. **Answer-first, stat-rich, freshly-updated content** built around fan-out sub-queries (Princeton GEO + freshness + fan-out 161% lift). [Princeton GEO] https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/ · [Search Engine Land fan-out] https://searchengineland.com/ai-overview-fan-out-rankings-boost-citation-odds-study-466426
7. **Keep all citation-critical bots allowed** (Question D matrix) — a misconfigured Cloudflare AI-block silently zeroes citations. [OpenAI docs] https://developers.openai.com/api/docs/bots
8. **Bing Webmaster Tools + IndexNow** — cheapest way to (a) feed the Bing index that powers Copilot AND ChatGPT, and (b) *measure* AI citations via the 2026 AI Performance report. [Bing Webmaster blog] https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
9. **Build the ClaireAI entity** — Wikipedia (if notability allows), Crunchbase, consistent NAP, Knowledge Panel, LinkedIn — so engines confidently associate the name "ClaireAI 365" with the product (helps disambiguation, the one real residual value of Organization schema). [ABA Law Practice] https://www.americanbar.org/groups/law_practice/resources/law-practice-magazine/2026/march-april-2026/ai-powered-search-visibility-for-law-firms/
10. **Don't waste cycles on schema-for-AI or llms.txt** (Questions A & B) — reallocate that time to #1–#4.

---

## SOURCES — FETCHED SUCCESSFULLY vs FAILED

### Fetched/queried successfully (used in this report)
**Primary / official:**
- Google Search Central — AI optimization guide (WebFetch, full quote) — https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central — AI features doc (via search) — https://developers.google.com/search/docs/appearance/ai-features
- OpenAI developer docs — Overview of OpenAI Crawlers (WebFetch, full quotes) — https://developers.openai.com/api/docs/bots
- Anthropic / Claude Help Center — does Anthropic crawl + how to block — https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity docs — Perplexity Crawlers (WebFetch, full quotes) — https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Perplexity Hub — Agents or Bots — https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web
- Cloudflare press — Content Independence Day (2025-07-01) — https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/
- Cloudflare blog — no AI crawl without compensation — https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/
- Cloudflare blog — Perplexity stealth crawlers (2025-08-04) — https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/
- Bing Webmaster blog — AI Performance public preview (2026-02) — https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- Bing Webmaster help — AI Performance — https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Princeton — GEO publication (KDD 2024) — https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/

**Studies / trade press (recency noted inline):**
- Ahrefs — AIO citations top-10 update (WebFetch, 2026-03-02) — https://ahrefs.com/blog/ai-overview-citations-top-10/
- Ahrefs — AI Overview brand correlation (75K) — https://ahrefs.com/blog/ai-overview-brand-correlation/
- Ahrefs — AI brand visibility correlations (Dec 2025 follow-up) — https://ahrefs.com/blog/ai-brand-visibility-correlations/
- Ahrefs — do AI assistants prefer fresh content (17M citations) — https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
- Ahrefs — what is llms.txt — https://ahrefs.com/blog/what-is-llms-txt/
- SEJ — schema didn't move AI citations (WebFetch, 2026-05-11) — https://www.searchenginejournal.com/schema-markup-didnt-move-ai-citations-in-ahrefs-test/574568/
- SEJ — AIO citations from top-ranking pages drop — https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/
- SEJ — Anthropic bots more granular — https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/
- Search Engine Roundtable — schema study — https://www.seroundtable.com/study-schema-citations-study-41311.html
- Search Engine Roundtable — Anthropic crawler docs — https://www.seroundtable.com/anthropic-updates-its-crawler-docs-40978.html
- Search Engine Land — Anthropic clarifies bots — https://searchengineland.com/anthropic-claude-bots-470171
- Search Engine Land — fan-out 161% lift — https://searchengineland.com/ai-overview-fan-out-rankings-boost-citation-odds-study-466426
- Search Engine Land — AIO optimization guide — https://searchengineland.com/guide/how-to-optimize-for-ai-overviews
- Search Engine Land — AI cites Reddit/YouTube/LinkedIn most — https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138
- searchVIU — schema vs AI live-retrieval test (Dec 2025) — https://www.searchviu.com/en/schema-markup-and-ai-in-2025-what-chatgpt-claude-perplexity-gemini-really-see/
- Similarweb — most-cited domains by LLMs — https://www.similarweb.com/blog/marketing/geo/most-cited-domains-llms/
- ALM Corp — top domains cited (30M sources) — https://almcorp.com/blog/top-domains-cited-by-ai-search/
- ALM Corp — Google AI Mode cites itself — https://almcorp.com/blog/google-ai-mode-cites-itself-organic-links-seo-2026/
- ALM Corp — Bing AI Performance guide — https://almcorp.com/blog/bing-ai-performance-webmaster-tools-complete-guide/
- Contently — top sources LLMs cite (2026-04) — https://contently.com/2026/04/29/top-sources-llms-cite/
- Adweek — YouTube overtakes Reddit — https://www.adweek.com/media/youtube-reddit-ai-search-engine-citations/
- BusinessWire/Ahrefs — YouTube #1 signal (2026-05-26) — https://www.businesswire.com/news/home/20260526119691/en/Across-75000-Brands-YouTube-Mentions-Are-the-Strongest-Signal-of-AI-Visibility-New-Ahrefs-Report-Reveals
- Parse — Bing rankings drive ChatGPT — https://parse.gl/blog/bing-rankings-chatgpt-visibility
- Winston Digital — Bing Copilot optimization — https://www.winstondigitalmarketing.com/playbooks/bing-copilot-optimization/
- amicited.com — GPTBot vs OAI-SearchBot — https://www.amicited.com/blog/gptbot-vs-oai-searchbot/
- aicrawlercheck.com — Google-Extended vs Googlebot — https://aicrawlercheck.com/blog/google-extended-vs-googlebot
- DemandSphere — Google AI optimization guide — https://www.demandsphere.com/blog/google-ai-optimization-guide-ai-search-is-still-search/
- PPC Land — Anthropic 3 crawlers — https://ppc.land/anthropic-clarifies-what-its-three-web-crawlers-do-and-how-to-block-them/
- PPC Land — Perplexity denies training — https://ppc.land/perplexity-denies-training-ai-models-as-cloudflare-documents-stealth-crawlers/
- Silicon Republic — Cloudflare de-lists Perplexity — https://www.siliconrepublic.com/start-ups/cloudflare-de-lists-perplexity-alleges-stealth-scraping
- Search Engine World — Perplexity responds — https://www.searchengineworld.com/perplexity-responds-to-cloudflare
- SeerInteractive — Perplexity stealth crawling / GEO — https://www.seerinteractive.com/insights/perplexity-stealth-ai-crawling-and-the-impacts-on-geo-and-log-file-analysis
- codersera — llms.txt May 2026 server-log data — https://codersera.com/blog/llms-txt-complete-guide-2026/
- rye.dev — llms.txt nobody uses it — https://rye.dev/blog/llms-txt-standard-elegant-solution-nobody-using/
- Semrush — what is llms.txt — https://www.semrush.com/blog/llms-txt/
- authoritytech.io — schema/FAQ/freshness — https://authoritytech.io/curated/schema-markup-ai-citations-ahrefs-study-2026 · https://authoritytech.io/blog/content-freshness-seo-ai-2026
- rank-and-convert — 13-week freshness rule — https://rank-and-convert.ghost.io/the-13-week-rule-how-content-freshness-drives-ai-search-citations/
- DerivateX — Princeton GEO plain English — https://derivatex.agency/blog/princeton-geo-paper-plain-english/
- Sunil Pratap Singh — GEO research synthesis — https://sunilpratapsingh.com/guides/geo/what-research-says-about-generative-engine-optimization
- I Love SEO — schema study tested wrong thing (dissent) — https://www.iloveseo.net/the-ahrefs-schema-study-is-right-and-its-testing-the-wrong-thing/
- measuremarketing — law-firm GEO playbook 2026 — https://measuremarketing.com/legal-marketing-in-2026-the-ai-search-playbook-lma-didnt-cover/
- ABA Law Practice — AI search visibility for law firms (Mar/Apr 2026) — https://www.americanbar.org/groups/law_practice/resources/law-practice-magazine/2026/march-april-2026/ai-powered-search-visibility-for-law-firms/
- Clio — GEO for law firms — https://www.clio.com/blog/geo-for-law-firms/
- Matt Diggity (X) — confirms 0.664 vs 0.218 — https://x.com/mattdiggityseo/status/1940303316157936113
- Nieman Lab — Cloudflare block + pay-per-crawl — https://www.niemanlab.org/2025/07/cloudflare-will-block-ai-scraping-by-default-and-launches-new-pay-per-crawl-marketplace/

### Fetched/queried with NO direct deep-fetch (cited via search-result snippet only — not independently verified by full-page fetch)
- BrightEdge ~17% AIO top-10 overlap figure (cited via ALM Corp synthesis, not BrightEdge primary) — flagged as secondary.
- Moz 40K-keyword 12% AI Mode overlap (cited via SEJ/ALM synthesis, not Moz primary) — flagged as secondary.
- SE Ranking 17.42% Google.com AI Mode citation (via ALM synthesis) — secondary.
- AirOps 83%/60% freshness figures (via search snippet) — secondary.

### FAILED / NOT ATTEMPTED / BLOCKED
- **Parallel sub-agent fleet (10 agents):** all 10 background research agents completed their tool work but came to rest on a transient server-side rate-limit ("Server is temporarily limiting requests — not your usage limit") at the final synthesis step, returning errors instead of findings. Their raw transcripts were NOT read into context (per instructions). **This report was therefore reconstructed by the orchestrator via direct WebSearch/WebFetch**, prioritizing primary sources — so coverage is solid, but it did not consume the sub-agents' captured research.
- No outright HTTP fetch *failures* were encountered in the direct-fetch path used for this report; the WebFetch calls to Google, OpenAI, Perplexity, Ahrefs, and SEJ all succeeded.
- Not separately fetched (relied on search aggregation): Moz primary blog (historically blocks our UA per prior audit), BrightEdge primary report, SE Ranking primary report, AirOps primary report.
