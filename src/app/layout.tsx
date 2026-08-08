import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://binhakim.dev";
const FULL_NAME = "Yusuf Naeem Abd El-Hakim";
const TITLE = "Yusuf Naeem | Software Engineer";
const DESCRIPTION =
  "Yusuf Naeem Abd El-Hakim, Software Engineer specialising in systems design and applied security. REST APIs, relational data models, and access-control layers — plus two self-directed SaaS products taken solo from idea to public launch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: `%s | Yusuf Naeem`,
  },

  description: DESCRIPTION,

  keywords: [
    "Yusuf Naeem",
    "binhakim",
    "Abd El-Hakim",
    "Yusuf Naeem Abd El-Hakim",
    "Software Engineer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "Systems Design",
    "Applied Security",
    "Distributed Systems",
    "Next.js Developer",
    "TypeScript Engineer",
    "Supabase Developer",
    "React Developer",
    "Node.js",
    "PostgreSQL",
    "SaaS Developer",
    "Orbit app",
    "Commit app",
    "API Development",
    "Cairo software engineer",
    "Dubai software engineer",
    "portfolio",
  ],

  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  /* ── Icons ──────────────────────────────────────────────── */
  /* `/favicon.png` was declared here but has never existed in the repo, so
     every page load fetched a 404. The real assets are src/app/icon.png
     (served at /icon.png) and the /favicon.ico route handler. */
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
  },

  /* ── Open Graph ─────────────────────────────────────────── */
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "binhakim.dev",
    title: TITLE,
    description:
      "Software Engineer — systems design and applied security. Two SaaS products taken solo from idea to public launch.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: `${FULL_NAME} — Software Engineer`,
        type: "image/jpeg",
      },
    ],
    firstName: "Yusuf",
    lastName: "Naeem",
    username: "binhakim",
  },

  /* ── Twitter / X ────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Software Engineer — systems design, applied security, and SaaS shipped solo.",
    images: ["/profile.jpg"],
    creator: "@binhakim",
  },

  category: "technology",
};

/* ── JSON-LD structured data ──────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: FULL_NAME,
      alternateName: ["binhakim", "Yusuf Naeem"],
      url: SITE_URL,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/profile.jpg`,
        width: 800,
        height: 800,
      },
      jobTitle: "Software Engineer",
      description: DESCRIPTION,
      email: "yusufnaeemhakim@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      knowsAbout: [
        "Software Engineering",
        "Systems Design",
        "Backend Engineering",
        "REST API Design",
        "Relational Data Modelling",
        "Application Security",
        "OWASP Top 10",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Distributed Systems",
        "SaaS Products",
      ],
      knowsLanguage: [
        { "@type": "Language", name: "Arabic" },
        { "@type": "Language", name: "English" },
        { "@type": "Language", name: "German" },
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Ahram Canadian University",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "B.Sc. Computer Science — Software Engineering Major",
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: "Ahram Canadian University",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "CS50: Introduction to Computer Science",
          recognizedBy: { "@type": "Organization", name: "HarvardX" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "Web Development & .NET Development Summer Training",
          recognizedBy: {
            "@type": "Organization",
            name: "Information Technology Institute (ITI)",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "Offensive Security Engineering",
          recognizedBy: { "@type": "Organization", name: "WE INNOVATE" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "Forward Program",
          recognizedBy: { "@type": "Organization", name: "McKinsey.org" },
        },
      ],
      award: [
        "Honourable Mention, Egyptian Collegiate Programming Contest (ECPC) 2021",
      ],
      sameAs: [
        "https://github.com/ws0x",
        "https://linkedin.com/in/binhakim",
        "https://medium.com/@binhakim",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Yusuf Naeem | Software Engineer Portfolio",
      description: DESCRIPTION,
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      description: DESCRIPTION,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Scroll reveals start at opacity 0 and are switched on by JS. The
            markup is server-rendered either way (so crawlers always see it),
            but without this a JS-disabled visitor gets a blank page. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        {children}
        <GoogleAnalytics />
        {/* Both packages were already dependencies but had never been mounted.
            Speed Insights supplies field Core Web Vitals, which is what the
            performance budget is actually measured against. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
