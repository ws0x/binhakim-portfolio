import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import {
  SITE_URL,
  SITE_NAME,
  FULL_NAME,
  SHORT_NAME,
  DEFAULT_DESCRIPTION,
} from "@/lib/site";
import { baseGraph, webPageNode, graph } from "@/lib/schema";

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

const TITLE = `${SHORT_NAME} | Software Engineer`;
const DESCRIPTION = DEFAULT_DESCRIPTION;

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
    siteName: SITE_NAME,
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

/* ── JSON-LD ────────────────────────────────────────────────
   Built from lib/schema.ts so each route can extend the graph rather than
   restating it. */
const jsonLd = graph(
  ...baseGraph(),
  webPageNode({ path: "/", name: TITLE, description: DESCRIPTION })
);

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
          dangerouslySetInnerHTML={{ __html: jsonLd }}
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
