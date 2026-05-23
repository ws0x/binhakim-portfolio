import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yusuf Naeem | Software Engineer",
  description:
    "Software Engineer specializing in backend architecture, database optimization, and systems infrastructure. Building robust APIs and scalable systems.",
  keywords: [
    "Backend Engineer",
    "Software Engineer",
    "Node.js",
    "Go",
    "PostgreSQL",
    "Database Optimization",
    "Java",
    "Spring",
    "Spring Boot",
    "Systems Infrastructure",
    "Yusuf Naeem",
    "binhakim",
  ],
  authors: [{ name: "Yusuf Naeem Abd El-Hakim" }],
  openGraph: {
    title: "Yusuf Naeem | Software Engineer",
    description:
      "Software Engineer specializing in backend architecture, database optimization, and systems infrastructure.",
    url: "https://binhakim.dev",
    siteName: "binhakim.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yusuf Naeem | Software Engineer",
    description:
      "Software Engineer specializing in backend architecture, database optimization, and systems infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
