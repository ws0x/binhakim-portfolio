import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const jetBrainsMono = JetBrains_Mono({ variable: "--font-jet", subsets: ["latin"], display: "swap" });

const SITE_URL = "https://www.binhakim.dev";
const FULL_NAME = "Yusuf Naeem Abd El-Hakim";
const TITLE = "Yusuf Naeem | Product Engineer · Software Systems & Business Impact";
const DESCRIPTION = "Yusuf Naeem Abd El-Hakim builds software systems and digital products end to end with deep ownership of engineering architecture, resilient data flows, and measurable business outcomes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Yusuf Naeem" },
  description: DESCRIPTION,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  keywords: ["Yusuf Naeem", "Product Engineer", "Full-Stack Engineer", "Software Systems", "API Design", "PostgreSQL", "Application Security", "Next.js", "TypeScript", "Business Operations"],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/icon.png", shortcut: "/favicon.ico", apple: "/icon.png" },
  openGraph: { type: "profile", locale: "en_US", url: SITE_URL, siteName: "binhakim.dev", title: TITLE, description: DESCRIPTION, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: TITLE }], firstName: "Yusuf", lastName: "Naeem", username: "binhakim" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/opengraph-image"], creator: "@binhakim" },
  category: "technology",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#070b13", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${SITE_URL}/#person`, name: FULL_NAME, url: SITE_URL, jobTitle: "Product Engineer · Software Systems & Business Impact", description: DESCRIPTION, email: "yusufnaeemhakim@gmail.com", address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" }, sameAs: ["https://github.com/ws0x", "https://linkedin.com/in/binhakim", "https://medium.com/@binhakim"] },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: TITLE, description: DESCRIPTION, author: { "@id": `${SITE_URL}/#person` }, inLanguage: "en-US" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body><a className="skip-link" href="#main-content">Skip to content</a><Navigation />{children}<SpeedInsights /></body>
    </html>
  );
}
