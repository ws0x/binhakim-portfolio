import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const SITE_URL = "https://binhakim.dev";
const FULL_NAME = "Yusuf Naeem Abd El-Hakim";
const TITLE = "Yusuf Naeem | Backend-leaning Full-Stack Software Engineer";
const DESCRIPTION = "Yusuf Naeem Abd El-Hakim builds production systems end to end: APIs, relational data models, security boundaries, and useful product surfaces.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Yusuf Naeem" },
  description: DESCRIPTION,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  keywords: ["Yusuf Naeem", "Backend Engineer", "Full-Stack Engineer", "API Design", "PostgreSQL", "Application Security", "Next.js", "TypeScript"],
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
    { "@type": "Person", "@id": `${SITE_URL}/#person`, name: FULL_NAME, url: SITE_URL, jobTitle: "Backend-leaning Full-Stack Software Engineer", description: DESCRIPTION, email: "yusufnaeemhakim@gmail.com", address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" }, sameAs: ["https://github.com/ws0x", "https://linkedin.com/in/binhakim", "https://medium.com/@binhakim"] },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: TITLE, description: DESCRIPTION, author: { "@id": `${SITE_URL}/#person` }, inLanguage: "en-US" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body><a className="skip-link" href="#main-content">Skip to content</a><Navigation />{children}<SpeedInsights /></body>
    </html>
  );
}
