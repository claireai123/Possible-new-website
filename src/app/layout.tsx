import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ClaireAI 365 — AI Legal Receptionist, Every Call in 0.8s",
    template: "%s | ClaireAI",
  },
  description:
    "AI legal receptionist: every call answered in 0.8s, qualifies leads, books consults, sends retainers — English/Spanish, 24/7. From $450/mo.",
  metadataBase: new URL("https://theclaireai.com"),
  icons: {
    icon: [
      { url: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_pad,w_32,h_32,b_white,q_auto,f_png/v1772837716/Claire_AI_White-removebg-preview.png", sizes: "32x32", type: "image/png" },
      { url: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_pad,w_192,h_192,b_white,q_auto,f_png/v1772837716/Claire_AI_White-removebg-preview.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_pad,w_180,h_180,b_white,q_auto,f_png/v1772837716/Claire_AI_White-removebg-preview.png", sizes: "180x180", type: "image/png" },
  },
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
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
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
    title: "ClaireAI 365 — AI Legal Receptionist, Every Call in 0.8s",
    description:
      "AI legal receptionist: every call answered in 0.8s, qualifies leads, books consults, sends retainers — English/Spanish, 24/7. From $450/mo.",
    images: [
      {
        url: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1772837716/Claire_AI_White-removebg-preview.png",
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
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1772837716/Claire_AI_White-removebg-preview.png",
    ],
  },
  alternates: {
    canonical: "https://theclaireai.com",
  },
  other: {
    "ai:title": "ClaireAI — AI Legal Receptionist",
    "ai:description":
      "ClaireAI answers every law firm call in 0.8 seconds, qualifies leads, books consultations, and sends retainers autonomously. Bilingual. 24/7. Plans from $450/month.",
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
      alternateName: ["Claire AI", "Claire"],
      legalName: "ClaireAI, Inc.",
      url: "https://theclaireai.com",
      logo: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1772837716/Claire_AI_White-removebg-preview.png",
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Miami",
          addressRegion: "FL",
          addressCountry: "US",
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: { "@type": "Country", name: "United States" },
      naics: "541512",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "+1-561-250-5789",
          availableLanguage: ["English", "Spanish"],
          url: "https://theclaireai.com/contact",
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+1-561-250-5789",
          availableLanguage: ["English", "Spanish"],
          url: "https://theclaireai.com/contact",
        },
      ],
      founders: [
        { "@type": "Person", name: "Tiago Stram", jobTitle: "Co-founder & CEO" },
        { "@type": "Person", name: "Cal Stein", jobTitle: "Co-founder & CTO" },
      ],
      sameAs: [
        "https://www.linkedin.com/company/theclaireai",
        "https://www.crunchbase.com/organization/claireai",
        "https://www.g2.com/products/claireai",
        "https://www.capterra.com/p/claireai",
      ],
      knowsAbout: [
        "AI Receptionist",
        "Legal Intake Automation",
        "Law Firm Answering Service",
        "Personal Injury Intake",
        "Criminal Defense Intake",
        "Family Law Intake",
        "Clio Integration",
        "MyCase Integration",
        "Filevine Integration",
        "Lawmatics Integration",
        "DocuSign Retainer Automation",
        "Bilingual Legal Intake",
        "24/7 Legal Answering",
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
      "@type": "WebApplication",
      "@id": "https://theclaireai.com/#webapp",
      name: "ClaireAI",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI Receptionist for Law Firms",
      operatingSystem: "Web, iOS, Android",
      url: "https://theclaireai.com",
      provider: { "@id": "https://theclaireai.com/#organization" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "450",
        highPrice: "1800",
        priceCurrency: "USD",
        offerCount: 3,
        url: "https://theclaireai.com/pricing",
      },
      featureList: [
        "24/7 call answering in 0.8 seconds",
        "Bilingual intake (English and Spanish)",
        "Autonomous lead qualification",
        "Consultation booking",
        "Retainer automation via DocuSign and PandaDoc",
        "CRM integration with Clio, Filevine, MyCase, Lawmatics, PracticePanther",
        "Conflict checking",
        "Call recording with transcripts",
        "Lead IQ grading A through D",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-[100dvh]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100] rounded bg-[#0a0a0a] px-4 py-2 text-white"
        >
          Skip to content
        </a>
        <Header />
        <div style={{ paddingTop: 48 }}>
          <main id="main">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
