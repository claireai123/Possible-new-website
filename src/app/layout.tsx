import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ClaireAI — AI Legal Receptionist | Every Call Answered in 0.8s",
    template: "%s | ClaireAI",
  },
  description:
    "ClaireAI is an AI-powered legal receptionist that answers every call in 0.8 seconds, qualifies leads, books consultations, and sends retainers — in English or Spanish, 24/7/365. Plans start at $650/month.",
  metadataBase: new URL("https://theclaireai.com"),
  keywords: [
    "AI legal receptionist",
    "law firm virtual receptionist",
    "legal intake automation",
    "AI answering service for lawyers",
    "24/7 legal receptionist",
    "bilingual legal intake",
    "ClaireAI",
    "legal CRM integration",
    "retainer automation",
    "personal injury intake",
  ],
  authors: [{ name: "ClaireAI, Inc." }],
  creator: "ClaireAI, Inc.",
  publisher: "ClaireAI, Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theclaireai.com",
    siteName: "ClaireAI",
    title: "ClaireAI — AI Legal Receptionist | Every Call Answered in 0.8s",
    description:
      "AI-powered legal receptionist that answers every call in 0.8 seconds, qualifies leads, books consultations, and sends retainers — in English or Spanish, 24/7/365.",
    images: [
      {
        url: "https://res.cloudinary.com/dwzsqumf6/image/upload/v1772837716/Claire_AI_White-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "ClaireAI — AI Legal Receptionist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaireAI — AI Legal Receptionist",
    description:
      "Every call answered in 0.8 seconds. Qualifies leads, books consultations, sends retainers. English & Spanish, 24/7.",
    images: [
      "https://res.cloudinary.com/dwzsqumf6/image/upload/v1772837716/Claire_AI_White-removebg-preview.png",
    ],
  },
  alternates: {
    canonical: "https://theclaireai.com",
  },
  other: {
    "ai:title": "ClaireAI — AI Legal Receptionist",
    "ai:description":
      "ClaireAI answers every law firm call in 0.8 seconds, qualifies leads, books consultations, and sends retainers autonomously. Bilingual. 24/7. Plans from $650/month.",
    "ai:category": "Legal Technology",
    "ai:positioning": "AI-powered virtual receptionist for law firms",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theclaireai.com/#organization",
      name: "ClaireAI",
      legalName: "ClaireAI, Inc.",
      url: "https://theclaireai.com",
      logo: "https://res.cloudinary.com/dwzsqumf6/image/upload/v1772837716/Claire_AI_White-removebg-preview.png",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["English", "Spanish"],
        url: "https://theclaireai.com/contact",
      },
      sameAs: [
        "https://www.linkedin.com/company/theclaireai",
      ],
      knowsAbout: [
        "Legal Technology",
        "Artificial Intelligence",
        "Client Intake Automation",
        "CRM Integration",
        "Virtual Receptionist",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://theclaireai.com/#website",
      url: "https://theclaireai.com",
      name: "ClaireAI",
      publisher: { "@id": "https://theclaireai.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": "https://theclaireai.com/#webpage",
      url: "https://theclaireai.com",
      name: "ClaireAI — AI Legal Receptionist",
      isPartOf: { "@id": "https://theclaireai.com/#website" },
      about: { "@id": "https://theclaireai.com/#organization" },
      description:
        "ClaireAI is an AI-powered legal receptionist that answers every call in 0.8 seconds, qualifies leads, books consultations, and sends retainers.",
    },
    {
      "@type": "SoftwareApplication",
      name: "ClaireAI",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Legal Software",
      operatingSystem: "Cloud-based",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "650",
        highPrice: "2999",
        priceCurrency: "USD",
        offerCount: 3,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "50",
        bestRating: "5",
      },
      featureList: [
        "24/7 call answering in 0.8 seconds",
        "Bilingual intake (English & Spanish)",
        "Autonomous lead qualification",
        "Consultation booking",
        "Retainer automation via DocuSign/PandaDoc",
        "CRM integration (Clio, Filevine, MyCase, Lawmatics, PracticePanther)",
        "Conflict checking",
        "Call recording with transcripts",
      ],
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Managing Partner" },
          reviewBody:
            "ClaireAI captured 312 consultations we would have missed. $1.2 million in new case value in a single month.",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <Header />
        {/* Banner — not fixed, scrolls away naturally like Legora */}
        <div style={{ paddingTop: 48 }}>
          <a
            href="/legal-intake-report"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "16px 24px",
              backgroundColor: "#1b4332",
              color: "white",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span>2026 Legal Intake Report</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Read more →</span>
          </a>
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
