# GA4 Implementation Plan — ClaireAI Marketing Site

Date: 2026-05-26
Owner: Tiago
Target site: `https://theclaireai.com` (Next.js 16.1.6, App Router, React 19, Vercel)
Status: Spec only — do NOT install until user explicitly approves.

---

## 0. TL;DR

- Architecture: **Google Tag Manager (GTM) server-side container loaded via `next/script` (`strategy="afterInteractive"`), with GA4 + Consent Mode v2 configured inside GTM. Vercel Web Analytics enabled as a privacy-friendly side-channel (no banner needed) for a sanity-check pageview + Core Web Vitals stream.**
- Why: B2B SaaS funnel ending in a single conversion (`/contact`), with near-term need for LinkedIn Insight Tag, HubSpot tracking, Google Ads remarketing, and Cal.com cross-domain tracking. Maintaining one container is the only sane option once you have 3+ pixels.
- Conversion priority: `contact_form_submit` is THE event. Everything else is signal.
- EU traffic exists (per SEO docs); Consent Mode v2 is mandatory or GA4 records nothing for EU users.

---

## 1. Architecture decision (justification)

### Chosen: **GTM container + GA4 tag inside GTM + Vercel Web Analytics**

| Option | Verdict | Why |
|---|---|---|
| (a) Raw `gtag.js` via `<Script>` | Rejected | Forces every future pixel (LinkedIn, HubSpot, Google Ads, Reddit, Meta) to ship code through the marketing-site repo + redeploy. Marketing-team cannot self-serve. |
| (b) **GTM container + GA4 inside** | **Chosen** | One `<Script>` tag → marketing operator (or you) adds every future pixel inside GTM UI. Consent Mode v2 wires once. Native built-in triggers for scroll/outbound/video. Cross-domain Cal.com is a checkbox. |
| (c) Vercel/Cloudflare analytics only | Rejected as sole solution | Pageview-only, no events, no Key Events, no audiences. Useless for B2B intent tracking. **But** keep Vercel Web Analytics enabled in parallel — it's free on Vercel, requires no banner, gives you a non-sampled cookieless pageview baseline. |

GTM has one cost: ~50 KB extra JS on first load. Acceptable for a marketing site that already loads Google Fonts and Framer Motion. The win is operational, not technical.

---

## 2. Tracking plan (events spec)

Event names follow GA4 snake_case convention. Parameters use GA4 reserved names where applicable.

### 2.1 Automatic / built-in (no code)

| Event | Trigger | Params | Key Event? | Volume |
|---|---|---|---|---|
| `page_view` | GA4 default (browser History API change) | `page_location`, `page_title`, `page_referrer` | No | Very high |
| `session_start` | GA4 default | — | No | High |
| `first_visit` | GA4 default | — | **YES** (top-of-funnel) | Medium |
| `user_engagement` | GA4 default (10s+ on page) | `engagement_time_msec` | No | High |
| `scroll` | GA4 Enhanced Measurement (90% only) | `percent_scrolled` | No | Medium |
| `click` (outbound) | GA4 Enhanced Measurement | `link_url`, `link_domain`, `outbound: true` | No | Medium |
| `view_search_results` | GA4 Enhanced Measurement (matches `?q=` on /help) | `search_term` | No | Low |
| `file_download` | GA4 Enhanced Measurement (.pdf/.zip/etc.) | `file_name`, `file_extension`, `link_url` | No | Low |
| `video_start` / `video_progress` / `video_complete` | GA4 Enhanced Measurement (auto-detects YouTube `<iframe>` with `enablejsapi=1`) | `video_title`, `video_url`, `video_duration`, `video_percent` | `video_complete` = **YES** | Low |

### 2.2 Custom events (GTM-configured)

| Event | Trigger | Parameters | Key Event? | Volume |
|---|---|---|---|---|
| `scroll_milestone` | Scroll depth = 25/50/75% (90% already covered by enhanced measurement) | `percent_scrolled` (25/50/75), `page_path` | No | Medium |
| `click_book_demo` | Click on any element with `data-cta="book-demo"` OR link with `href="/contact"` and text-matches `/book|demo|consult/i` | `cta_location` (header / hero / pricing-starter / pricing-pro / pricing-enterprise / footer / blog-cta / solution-cta), `page_path` | **YES** (micro-conversion) | Medium |
| `contact_form_view` | DOM ready on `/contact` page | `page_path` | No | Medium |
| `contact_form_field_blur` | Blur event on any `/contact` form input/select | `field_name` (firstName/lastName/email/firmName/firmSize/practiceArea), `field_filled` (true/false) | No | Medium |
| `contact_form_submit_attempt` | `submit` event fires on the contact form | `firm_size`, `practice_area` | No | Low |
| `contact_form_submit` | Formspree POST returns 2xx (push to dataLayer from contact `page.tsx` after `await fetch(...)`) | `firm_size`, `practice_area`, `value: 1`, `currency: 'USD'` | **YES (primary conversion)** | Low |
| `cal_modal_open` | Cal.com `__cal:modal:open` postMessage OR immediately after Cal `modal()` call | `firm_size`, `practice_area` | **YES** | Low |
| `cal_booking_complete` | Cal.com postMessage event `__cal:booking_successful` (listen via `window.addEventListener('message')`) | `firm_size`, `practice_area`, `event_type` | **YES (true demo booked)** | Very low |
| `pricing_tier_view` | IntersectionObserver — pricing card visible for >2s | `tier_name` (starter / pro / enterprise), `position` | No | Medium |
| `pricing_tier_hover` | `mouseenter` on a pricing card (debounced 500ms) | `tier_name` | No | Medium |
| `video_play_manual` | YouTube IFrame API `onStateChange === PLAYING` for the product-menu video | `video_id`, `video_title`, `location` (header-menu/blog-hero) | No | Low |
| `outbound_click` | Already covered by GA4 enhanced measurement, but augment for Cal.com explicitly | `link_url`, `link_domain`, `cta_location` | No | Low |
| `help_search_query` | `submit` or `change` (debounced 600ms) on `/help` `?q=` input | `search_term`, `result_count` | No | Low |
| `help_article_view` | `page_view` where `page_path` matches `^/help/[^/]+$` | `article_slug`, `article_category` | No | Low |
| `blog_article_view` | `page_view` where `page_path` matches `^/blog/[^/]+$` | `article_slug`, `read_time_estimate` | No | Low |
| `blog_read_complete` | Scroll 75% on a `/blog/[slug]` page | `article_slug` | **YES** (engaged blog reader) | Low |
| `integration_card_click` | Click an integration on `/integrations` | `integration_name` (clio/filevine/mycase/...) | No | Low |
| `nav_dropdown_open` | Header mega-menu hover (debounced 300ms) | `menu_name` (product/solutions/resources) | No | High |
| `404_view` | `page_view` on `/not-found` | `referrer`, `attempted_path` | No | Very low |

### 2.3 Key Events (GA4 conversions — set in GA4 UI)

Mark these as Key Events. They're the only events that flow into Google Ads as conversions and feed Predictive Audiences:

1. `contact_form_submit` — **primary** (revenue proxy; assign $value = 1500 USD per submission for modeling)
2. `cal_booking_complete` — **primary** (true demo booked = highest intent)
3. `click_book_demo` — micro-conversion (top-of-funnel intent)
4. `cal_modal_open` — micro-conversion (form completed, modal opened)
5. `blog_read_complete` — content-engagement signal for retargeting

Secondary: `video_complete`, `first_visit`.

---

## 3. Consent / privacy

### 3.1 Consent Mode v2 (mandatory)

As of March 2024, EU/UK/EEA traffic without Consent Mode v2 signals is **discarded by GA4 entirely** (no behavioral modeling, no Ads remarketing). Configure default-denied, granted on consent.

```js
// Inject BEFORE GTM script (must be first thing on page)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',  // necessary
  security_storage: 'granted',       // necessary
  wait_for_update: 500,              // ms to wait for banner decision
});
// Region-specific stricter defaults (EU/UK/EEA)
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],
});
```

After user clicks "Accept" in banner:

```js
gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
});
```

### 3.2 Cookie banner library

**Chosen: Cookiebot (Usercentrics) free tier** for up to 50 subpages. Reasons:
- Native Google Consent Mode v2 integration (zero glue code)
- Auto-scans the site weekly, populates the cookie declaration page
- IAB TCF v2.2 compliant (needed if you ever take EU Ads money)
- ~12 KB
- React-friendly script tag

Backup if Cookiebot pricing becomes objectionable past free tier: **Klaro!** (open-source, MIT, self-hosted, no SaaS dependency). Avoid `react-cookie-consent` — it's a UI shell with no Consent Mode wiring, you'd write the gtag glue yourself, which is exactly what you're trying not to do.

### 3.3 CCPA / CPRA "Do Not Sell or Share"

Required for any user in CA, CO, CT, UT, VA (and growing list — by end of 2026 there will be 15+ state laws). Cookiebot ships a CPRA "Do Not Sell" link automatically. Also:

1. Add `Sec-GPC` (Global Privacy Control) header detection — if browser sends `Sec-GPC: 1`, treat as opt-out automatically. Cookiebot does this.
2. Footer: persistent "Your Privacy Choices" link (CA AG requires this exact phrase, not "Do Not Sell").
3. Privacy policy page (already linked from contact form — `/privacy-policy` — confirm it exists or create it).

### 3.4 Vercel Web Analytics — no banner needed

Cookieless, no personal data, no IP storage. Run in parallel as pageview ground-truth. Add via:

```bash
pnpm add @vercel/analytics
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
// inside <body>:
<Analytics />
```

---

## 4. Custom dimensions / user properties

Configure in GA4 → Admin → Custom definitions.

### Event-scoped dimensions

| Dimension name | Event parameter | Source / how set | Use case |
|---|---|---|---|
| `firm_size` | `firm_size` | Captured from contact form Firm Size select | Segment conversions by firm size for ICP analysis |
| `practice_area_interest` | `practice_area` | Captured from contact form Practice Area select | Validate which practice areas convert best |
| `cta_location` | `cta_location` | Set via `data-cta-location` attribute on every Book Demo link | A/B which placements drive conversions |
| `tier_name` | `tier_name` | Set on pricing card events | Pricing-page heat |
| `article_slug` | `article_slug` | Pulled from `page_path` regex | Content performance |
| `article_category` | `article_category` | From frontmatter / posts.ts | Topic clustering |
| `integration_name` | `integration_name` | From integration card data attr | Which CRM integrations get clicked |
| `traffic_source_cohort` | `traffic_source_cohort` | GTM lookup table mapping `utm_source` to bucket (paid-search / paid-social / organic / direct / referral / email) | Cross-source ROI |
| `landing_page_type` | `landing_page_type` | GTM lookup on first `page_path` of session (home / solution / blog / pricing / help) | Funnel-by-entry-point |

### User-scoped properties

| Property name | Source | Use case |
|---|---|---|
| `lifetime_demo_requests` | Increment on `contact_form_submit`; store in cookie | Retargeting suppression |
| `consent_status` | `'granted' \| 'denied' \| 'partial'` from Cookiebot | Audit / compliance |
| `geo_country_first_session` | GA4 auto | Geo cohorts |

### NOT recommended

- `email_hash` — don't write hashed PII into GA4; use it in HubSpot/CRM instead, where it belongs. GA4 forbids PII even hashed.

---

## 5. Cross-domain / subdomain

### Current state (verified 2026-05-26)

- No `app.theclaireai.com` subdomain in the marketing site nav/footer.
- `api.theclaireai.com` exists but is a backend API endpoint (per memory), not user-facing. No tracking needed.
- Contact form opens a **Cal.com modal** (`app.cal.com`) — this IS a cross-domain boundary.

### Cross-domain config (set in GTM → GA4 Config tag → Configure your domains)

```
theclaireai.com
www.theclaireai.com
app.cal.com
```

Effect: GA4 propagates `_gl` linker param to Cal.com URLs so a single user_id spans both domains. Critical for attributing Cal bookings to the original GA session.

### Referral exclusions (GA4 → Admin → Data streams → Configure tag settings → List unwanted referrals)

Add:
- `cal.com`
- `app.cal.com`
- `formspree.io`
- `checkout.stripe.com` (if Stripe is added later)
- `youtube.com` (the embedded video shouldn't count as a referrer)

Otherwise a user returning from Cal.com after booking gets attributed to "cal.com / referral" instead of their original source.

### If you ever add `app.theclaireai.com`

Add it to the cross-domain list above and use the same GA4 Measurement ID across both properties (single property, two streams is OK but single stream is cleaner for cross-domain).

---

## 6. Deployment runbook (step-by-step)

### Phase 0 — Prep (15 min)

1. Create a GA4 Property: GA4 → Admin → Create Property → "ClaireAI Marketing" → US time zone, USD currency.
2. Create a Web Data Stream: Admin → Data Streams → Add → Web → `https://theclaireai.com` → Stream name "ClaireAI Web". Note the **Measurement ID** (`G-XXXXXXXXXX`).
3. In the data stream, **enable all Enhanced Measurement events**: page views, scrolls, outbound clicks, site search (set query param to `q`), video engagement, file downloads, form interactions.
4. Create a GTM container: tagmanager.google.com → Create account "ClaireAI" → Container "theclaireai.com" → Web. Note the **Container ID** (`GTM-XXXXXXX`).
5. Create a Cookiebot account: cookiebot.com → free tier → register `theclaireai.com` → note **Cookiebot CBID**.

### Phase 1 — Code install (one PR, marketing-site repo)

Files to add/modify:

- **NEW** `src/components/analytics/consent-init.tsx` — inline pre-GTM consent defaults
- **NEW** `src/components/analytics/gtm.tsx` — GTM script loader
- **NEW** `src/components/analytics/cookiebot.tsx` — Cookiebot loader
- **NEW** `src/lib/analytics/track.ts` — typed dataLayer push helper
- **MODIFY** `src/app/layout.tsx` — wire the three components above + Vercel Analytics
- **MODIFY** `src/app/contact/page.tsx` — push `contact_form_submit` after Formspree success + `cal_modal_open` after Cal opens; add field-blur tracking
- **MODIFY** `src/components/layout/header.tsx` — add `data-cta-location="header"` to Book Demo button
- **MODIFY** every page with a Book Demo CTA — add `data-cta-location="<location>"`

#### `src/components/analytics/consent-init.tsx`

```tsx
import Script from 'next/script';

export function ConsentInit() {
  return (
    <Script id="consent-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500,
        });
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],
        });
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'url_passthrough', true);
      `}
    </Script>
  );
}
```

#### `src/components/analytics/cookiebot.tsx`

```tsx
import Script from 'next/script';

const CBID = process.env.NEXT_PUBLIC_COOKIEBOT_CBID;

export function Cookiebot() {
  if (!CBID) return null;
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={CBID}
      data-blockingmode="auto"
      strategy="beforeInteractive"
    />
  );
}
```

#### `src/components/analytics/gtm.tsx`

```tsx
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GTM() {
  if (!GTM_ID) return null;
  return (
    <>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
```

#### `src/lib/analytics/track.ts`

```ts
type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params } satisfies DataLayerEvent);
}

// Typed helpers for the events we care about
export const analytics = {
  bookDemoClick: (location: string) =>
    track('click_book_demo', { cta_location: location }),

  contactFormFieldBlur: (field: string, filled: boolean) =>
    track('contact_form_field_blur', { field_name: field, field_filled: filled }),

  contactFormSubmit: (firmSize: string, practiceArea: string) =>
    track('contact_form_submit', {
      firm_size: firmSize,
      practice_area: practiceArea,
      value: 1500,
      currency: 'USD',
    }),

  calModalOpen: (firmSize: string, practiceArea: string) =>
    track('cal_modal_open', { firm_size: firmSize, practice_area: practiceArea }),

  pricingTierView: (tier: string) =>
    track('pricing_tier_view', { tier_name: tier }),

  helpSearch: (term: string, resultCount: number) =>
    track('help_search_query', { search_term: term, result_count: resultCount }),
};
```

#### `src/app/layout.tsx` — body changes only

```tsx
import { ConsentInit } from '@/components/analytics/consent-init';
import { Cookiebot } from '@/components/analytics/cookiebot';
import { GTM } from '@/components/analytics/gtm';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

// inside <head> (BEFORE existing scripts):
<ConsentInit />
<Cookiebot />

// inside <body>, top:
<GTM />

// inside <body>, bottom (before </body>):
<VercelAnalytics />
```

Order matters: `ConsentInit` must execute before Cookiebot, and both before GTM. `strategy="beforeInteractive"` handles this in Next 16 App Router by emitting them in document `<head>` pre-hydration.

#### `src/app/contact/page.tsx` — patch existing `handleSubmit`

```tsx
import { analytics } from '@/lib/analytics/track';

// inside handleSubmit, AFTER `await fetch(FORMSPREE_URL, ...)`:
analytics.contactFormSubmit(form.firmSize, form.practiceArea);

// where Cal modal is opened (after Cal.ns[CAL_NS]("modal", ...)):
analytics.calModalOpen(form.firmSize, form.practiceArea);

// add onBlur to every input/select:
onBlur={() => analytics.contactFormFieldBlur('firstName', !!form.firstName)}
```

Cal booking completion listener (add to `useEffect`):

```tsx
useEffect(() => {
  const onMessage = (e: MessageEvent) => {
    if (e.origin !== 'https://app.cal.com') return;
    if (e.data?.type === 'booking_successful' || e.data?.action === 'bookingSuccessful') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cal_booking_complete',
        firm_size: form.firmSize,
        practice_area: form.practiceArea,
        event_type: e.data?.payload?.eventType?.slug ?? 'unknown',
      });
    }
  };
  window.addEventListener('message', onMessage);
  return () => window.removeEventListener('message', onMessage);
}, [form.firmSize, form.practiceArea]);
```

#### Environment variables

Add to Vercel project (Production + Preview + Development):

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_COOKIEBOT_CBID=00000000-0000-0000-0000-000000000000
```

Also add to `.env.local.example` (do NOT add real values to git).

### Phase 2 — GTM configuration (browser, no code)

In tagmanager.google.com → ClaireAI container:

1. **Variables → New → Constant**: `GA4 Measurement ID` = `G-XXXXXXXXXX`.
2. **Variables → New → Built-in**: enable Click Element, Click Classes, Click ID, Click Text, Click URL, Form Element, Form ID, Form Classes, Page Path, Page URL, Page Hostname, Referrer, Scroll Depth Threshold.
3. **Variables → New → DataLayer variable** for each custom param: `cta_location`, `firm_size`, `practice_area`, `tier_name`, `search_term`, `result_count`, `article_slug`, `field_name`, `field_filled`, `video_id`, `video_title`, `integration_name`.
4. **Tags → New → Google Tag (GA4 Config)**:
   - Tag ID: `{{GA4 Measurement ID}}`
   - Trigger: All Pages
   - Configure your domains: `theclaireai.com,www.theclaireai.com,app.cal.com`
   - Consent settings: built-in consent checks ON, require `analytics_storage = granted`
5. **Tags → New → GA4 Event** for each custom event:
   - `click_book_demo`, `contact_form_submit`, `contact_form_field_blur`, `cal_modal_open`, `cal_booking_complete`, `pricing_tier_view`, `pricing_tier_hover`, `video_play_manual`, `help_search_query`, `blog_read_complete`, `integration_card_click`, `nav_dropdown_open`, `scroll_milestone`.
   - Each tag: Event Name = same name, Event Parameters = pull from DataLayer variables.
   - Trigger: Custom Event with matching name.
6. **Triggers** for events not driven by dataLayer push:
   - `scroll_milestone` → Scroll Depth → 25, 50, 75 → All Pages
   - `pricing_tier_view` → Element Visibility → CSS selector `[data-pricing-tier]` → fire once per element, min on-screen 2000ms
   - `nav_dropdown_open` → Click — Just Links → matches CSS `[data-nav-menu]`
7. **Consent overview** (Admin → Container Settings → Consent overview): tick "Enable consent overview", set every tag's required consent to `analytics_storage` (and `ad_storage` for any future Ads tags).
8. **Submit & Publish** version "v1.0 — initial GA4 + Consent Mode v2".

### Phase 3 — GA4 configuration (browser)

1. **Admin → Custom definitions → Custom dimensions**: create one per dimension in §4 above. Scope = Event for event-scoped, User for user-scoped.
2. **Admin → Events → Mark as Key Event**: tick the 5 events listed in §2.3.
3. **Admin → Data Streams → Web stream → Configure tag settings**:
   - **List unwanted referrals**: add `cal.com`, `app.cal.com`, `formspree.io`, `youtube.com`.
   - **Define internal traffic**: add Tiago's and Cal's IPs → traffic_type=internal → exclude from reports via filter.
   - **Session timeout**: 30 min (default OK).
4. **Admin → Property settings → Reporting identity**: Blended (default — uses User-ID > Device-ID > Modeling > Google signals).
5. **Admin → Google signals data collection**: ON (gives demographics & cross-device, requires Consent Mode v2 which we have).
6. **Admin → Data retention**: change from default 2 months to **14 months** (max for free tier).

### Phase 4 — Integrations

1. **Google Search Console**: Admin → Search Console links → Link `theclaireai.com` property. Confirm GSC verification token already in DNS or `next-sitemap`.
2. **Google Ads**: Admin → Google Ads links → link when account exists (defer). Once linked, all GA4 Key Events auto-import as Ads conversions.
3. **BigQuery export** (free tier): Admin → BigQuery links → link to a free-tier GCP project. Gives raw event-level data, ~1M events/day free. ⚠️ Memory says GCP $300 trial expires in 2-7mo; create BigQuery in a project that won't lose billing.
4. **Looker Studio dashboard**: lookerstudio.google.com → blank report → GA4 connector → ClaireAI property → import template "Acquisition + Conversion Funnel". Save URL, share with Cal.
5. **Scheduled email exports**: GA4 → Reports → Library → Custom report "Weekly Sales Brief" → Share → Schedule email → Mondays 8am ET → recipients `tiagostram74@gmail.com`.
6. **LinkedIn Ads Insight Tag** (future): GTM → New tag → Custom HTML → paste Insight Tag → trigger All Pages → require `ad_storage = granted` consent.
7. **HubSpot tracking** (future): GTM → New tag → HubSpot → paste hub ID → trigger All Pages → require `ad_storage = granted`.

### Phase 5 — Audiences (Admin → Audiences → New)

| Audience | Definition | Use |
|---|---|---|
| `Demo Form Viewers — No Submit` | Visited `/contact` AND did NOT trigger `contact_form_submit` in 7 days | Retargeting ad |
| `Pricing Page Bouncers` | Visited `/pricing` AND session_duration < 30s | Lower-funnel ad |
| `Blog Engaged Readers` | Triggered `blog_read_complete` ≥ 2 times in 30 days | Lead-magnet ad |
| `PI Practice Cohort` | `practice_area = Personal Injury` ever | Vertical campaign |
| `Mid-Market Firms` | `firm_size IN (6-20 Attorneys, 21-50 Attorneys)` | ICP campaign |
| `High-Intent Returners` | ≥2 sessions AND viewed `/pricing` AND viewed `/contact` | Sales handoff alert (via BigQuery → Slack) |

---

## 7. Validation checklist

Run all of these before declaring "ga4 live":

### 7.1 Pre-deploy (local `pnpm dev` with env vars set)

- [ ] `view-source:` on home page shows `<script id="consent-default">` BEFORE `<script src="...gtm.js">`.
- [ ] Browser DevTools → Network → filter `collect` — no requests fire before banner accepted.
- [ ] DevTools → Application → Cookies — no `_ga` / `_gid` set before banner accepted.
- [ ] Click "Accept all" in Cookiebot banner → `_ga` cookie appears, network shows `gtag/js?id=G-...` + `g/collect?v=2&...&en=page_view`.
- [ ] DevTools → Console: `window.dataLayer` exists, contains `gtm.js`, `gtm.dom`, `gtm.load` events.

### 7.2 GA4 DebugView (Admin → DebugView)

- [ ] Install Tag Assistant Companion Chrome extension; enable debug mode for `theclaireai.com`.
- [ ] Walk the funnel: home → product → pricing → contact → fill form → submit.
- [ ] In DebugView, verify in order: `page_view` ×5, `click_book_demo`, `contact_form_view`, `contact_form_field_blur` ×6, `contact_form_submit_attempt`, `contact_form_submit`, `cal_modal_open`.
- [ ] Verify event parameters populate: `firm_size`, `practice_area`, `cta_location` all non-empty.
- [ ] Complete a Cal booking with a test calendar → `cal_booking_complete` appears.

### 7.3 GA4 Real-Time report

- [ ] Open in second tab during walkthrough — see "1 active user" with your country.
- [ ] Conversions card shows `contact_form_submit` after form submission.

### 7.4 GTM Preview mode

- [ ] tagmanager.google.com → Preview → enter `https://theclaireai.com` → walk funnel.
- [ ] For each step, GTM debugger shows which tags fired and which were blocked by consent.
- [ ] All Tags Fired panel: GA4 Config = fired ONLY after consent granted, never before.

### 7.5 Production smoke test (post-deploy)

- [ ] Open `theclaireai.com` in incognito from a non-internal IP → accept cookies → submit form.
- [ ] Wait 5 min → GA4 → Reports → Realtime — confirm event recorded.
- [ ] GA4 → Reports → Engagement → Events — confirm `contact_form_submit` count > 0 within 24h.
- [ ] Vercel dashboard → Analytics — confirm pageviews recorded (sanity check against GA4).
- [ ] Check `https://theclaireai.com/?gtm_debug=x` returns the GTM debug iframe → GTM Preview works in prod.

### 7.6 Consent / privacy QA

- [ ] VPN to Germany → load site → banner shown in German (Cookiebot auto-translates) → no GA4 cookies until accept.
- [ ] Decline banner → reload → DevTools shows zero `_ga` cookies, zero `collect` calls.
- [ ] Set Chrome `Sec-GPC: 1` via extension → load site → no Ads cookies, analytics treated as cookieless.
- [ ] Click "Your Privacy Choices" link in footer → Cookiebot consent center opens.
- [ ] Verify Privacy Policy page lists GA4, Cookiebot, Vercel Analytics, Cal.com, Formspree as data processors.

### 7.7 Ongoing health (weekly)

- [ ] GA4 Realtime > 0 users during business hours.
- [ ] No spike in `(not set)` for any custom dimension (means dataLayer push is broken).
- [ ] Vercel Analytics pageview count within ±15% of GA4 pageview count (any larger gap = consent decline rate ≥ that gap, investigate banner UX).
- [ ] DebugView shows no `oversize_payload` or `param_value_too_long` warnings.

---

## 8. Known gotchas / non-obvious notes

1. **`strategy="beforeInteractive"` only works in the root `layout.tsx` head** in App Router. Putting it elsewhere silently downgrades to `afterInteractive` in Next 16. The components above are designed for that.
2. **`Script` with inline content** must use a stable `id` prop — without it Next 16 dedupes/remounts incorrectly across navigation.
3. **GTM and Cookiebot both want to be first** — Cookiebot must load before GTM so consent state exists when GTM evaluates triggers. The `ConsentInit` shim sets defaults synchronously so even if Cookiebot loads slowly, GTM never fires denied tags.
4. **Cal.com `postMessage` API is undocumented** — the booking-success event name has changed twice in 2025. Listen for both `__cal:booking_successful` AND `bookingSuccessful` to be safe. Cross-domain linker (`_gl` param) is the production-grade fallback.
5. **Formspree response is sometimes `opaque`** if CORS misconfigured — wrap `track()` in a try/catch so a dataLayer failure can't break form submission. The Cal modal must always open even if tracking is broken.
6. **YouTube videos in `<iframe>`** must include `?enablejsapi=1` in the src for GA4 Enhanced Measurement video events to fire. Check header.tsx — current YouTube link goes to `youtube.com/watch?v=...` which is a regular link, not an embed. If the product menu opens the YouTube link in a new tab (outbound), `video_*` events won't fire — track as `outbound_click` instead. If you later embed the video on-site, append `?enablejsapi=1`.
7. **App Router `usePathname()` change does NOT trigger a fresh `page_view`** because GA4 Enhanced Measurement listens to `history.pushState`. Next 15+ uses `history.replaceState` for some transitions. Verify in DebugView; if `page_view` is missing on client-side navigation, add a `usePathname()` effect that pushes a manual `page_view` event with `page_path`.
8. **Custom dimension cardinality limit**: each event-scoped custom dimension caps at 500 unique values per day before being grouped as `(other)`. `article_slug` could blow this on a big blog (currently ~10 posts, safe). Monitor.
9. **Cookiebot free tier = max 50 subpages.** Site currently has ~25 routes with `[slug]` dynamic children. If `/blog/[slug]` + `/help/[slug]` + `/integrations/[slug]` push total scanned URLs over 50, upgrade to Cookiebot Premium (~$15/mo) or switch to Klaro!.
10. **Vercel Web Analytics is on the Pro plan only for unlimited events.** Free tier caps at 2,500 events/month. For a marketing site that's plenty; if it bursts (e.g. a launch), GA4 absorbs the rest.

---

## 9. Future tags to add to GTM (no code changes required)

When the need arises, GTM swallows these with zero PRs:

- LinkedIn Insight Tag
- HubSpot tracking script
- Google Ads Conversion tag (auto-imports GA4 Key Events once Ads linked)
- Reddit Pixel
- Meta Pixel (low priority for B2B legal)
- Microsoft Clarity (heatmaps + session recordings — free, GDPR-OK, complements GA4 quant with qual)
- Hotjar (paid alternative to Clarity)
- Common Room / RB2B (B2B IP-to-company resolution)

Each follows the same pattern: GTM → new tag → paste vendor snippet → trigger All Pages → set Consent requirement → publish.

---

## 10. Rollback plan

If GA4 install breaks something:

1. Vercel → environment variables → delete `NEXT_PUBLIC_GTM_ID` → redeploy. GTM stops loading, no other code path affected.
2. If breakage is broader: `git revert` the install commit, push.
3. Keep `@vercel/analytics` regardless — it's risk-free and gives baseline pageviews.

---

## Appendix A — Files touched

```
NEW  src/components/analytics/consent-init.tsx
NEW  src/components/analytics/cookiebot.tsx
NEW  src/components/analytics/gtm.tsx
NEW  src/lib/analytics/track.ts
MOD  src/app/layout.tsx              (+ ~10 lines)
MOD  src/app/contact/page.tsx        (+ ~30 lines)
MOD  src/components/layout/header.tsx (+ data attrs only)
MOD  every page with a /contact link  (+ data-cta-location attrs only)
MOD  src/app/pricing/page.tsx        (+ data-pricing-tier attrs on cards)
MOD  src/components/help/help-search.tsx (+ analytics.helpSearch call)
MOD  .env.local.example              (+ 2 vars)
MOD  package.json                    (+ @vercel/analytics dep)
```

## Appendix B — Vercel env var matrix

| Var | Production | Preview | Development |
|---|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | real | real | empty (no tracking in dev) |
| `NEXT_PUBLIC_COOKIEBOT_CBID` | real | real | empty |

Empty values cause `GTM` / `Cookiebot` components to return `null` — clean local dev with no analytics noise.
