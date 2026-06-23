"use client";

import Script from "next/script";

// GA4 Measurement ID. Public by design — it ships in the client bundle on every
// analytics-enabled site. Uses the repo's existing NEXT_PUBLIC_GA4_ID convention
// with a hardcoded fallback so the static CI build (no .env.local) still emits it.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-3REV95RMY4";

// EEA + UK + Switzerland: Consent Mode v2 denies analytics/ads storage here by
// default until a consent banner grants it (GDPR/ePrivacy). Everywhere else,
// analytics_storage is granted so data flows immediately.
const EEA_UK_CH = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

export function GA4() {
  if (!GA4_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      {/* Single ordered bootstrap: consent defaults MUST be queued before config. */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','region':${JSON.stringify(EEA_UK_CH)}});
            gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'granted'});
            gtag('js', new Date());
            gtag('config','${GA4_ID}');
          `,
        }}
      />
    </>
  );
}
