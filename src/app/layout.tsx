import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
const TITLE = "Yusuf Naeem | Full-Stack & Backend Software Engineer";
const DESCRIPTION =
  "Yusuf Naeem Abd El-Hakim — Full-Stack & Backend Software Engineer who ships live SaaS products. Specialising in Next.js, TypeScript, Supabase, AI integration, Java/Spring Boot, and systems infrastructure.";

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
    "Full-Stack Engineer",
    "Backend Engineer",
    "Software Engineer",
    "Next.js Developer",
    "TypeScript Engineer",
    "Supabase Developer",
    "React Developer",
    "Node.js",
    "Java Spring Boot",
    "PostgreSQL",
    "SaaS Developer",
    "AI Engineer",
    "Orbit app",
    "Systems Infrastructure",
    "API Development",
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
  },

  /* ── Open Graph ─────────────────────────────────────────── */
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "binhakim.dev",
    title: TITLE,
    description:
      "Full-Stack & Backend Software Engineer — ships live SaaS products, AI applications, and scalable APIs. See Orbit and other live deployments at binhakim.dev.",
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
      "Full-Stack & Backend Software Engineer who ships live SaaS products. See Orbit (byorbit.io) and other live deployments.",
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
      jobTitle: "Full-Stack & Backend Software Engineer",
      description: DESCRIPTION,
      email: "yusufnaeemhakim@gmail.com",
      knowsAbout: [
        "Full-Stack Development",
        "Backend Engineering",
        "Systems Architecture",
        "Next.js",
        "TypeScript",
        "Supabase",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "AI Integration",
        "DevOps",
        "SaaS Products",
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
      </head>
      <body className="antialiased">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
