import {
  SITE_URL,
  SITE_NAME,
  FULL_NAME,
  SHORT_NAME,
  EMAIL,
  LOCATION,
  SOCIAL,
  DEFAULT_DESCRIPTION,
  absoluteUrl,
} from "./site";
import { credentials } from "./content";

/**
 * JSON-LD builders.
 *
 * These used to be a single ~120-line literal inside layout.tsx, which was
 * workable for one page and is not for a dozen. The Person and WebSite nodes
 * are stable across the site and get `@id`s so every other node can reference
 * them instead of repeating the data.
 */

type Node = Record<string, unknown>;

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Derived from credentials.json so the resume and the markup cannot disagree. */
function credentialNodes(): Node[] {
  const { education, certifications } = credentials;
  return [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: `${education.degree} — ${education.major}`,
      recognizedBy: { "@type": "CollegeOrUniversity", name: education.school },
    },
    ...certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
  ];
}

export function personNode(): Node {
  const { education, honours, languages } = credentials;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: FULL_NAME,
    alternateName: ["binhakim", SHORT_NAME],
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/profile.jpg`,
      width: 800,
      height: 800,
    },
    jobTitle: "Software Engineer",
    description: DEFAULT_DESCRIPTION,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city,
      addressCountry: LOCATION.country,
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
    knowsLanguage: languages.map((l) => ({ "@type": "Language", name: l.name })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: LOCATION.city,
        addressCountry: LOCATION.country,
      },
    },
    hasCredential: credentialNodes(),
    award: honours.map((h) => `${h.title}, ${h.detail} ${h.year}`),
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.medium],
  };
}

export function webSiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: `${SHORT_NAME} | Software Engineer Portfolio`,
    description: DEFAULT_DESCRIPTION,
    author: { "@id": PERSON_ID },
    inLanguage: "en-US",
  };
}

/**
 * A page node plus its breadcrumb trail.
 *
 * `trail` is ordered from the site root outwards, excluding Home, which is
 * always prepended.
 */
export function webPageNode({
  path,
  name,
  description,
  trail = [],
}: {
  path: string;
  name: string;
  description: string;
  trail?: { name: string; path: string }[];
}): Node {
  const crumbs = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}/#webpage`,
    url: absoluteUrl(path),
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    description,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
      })),
    },
  };
}

/** Marks Orbit and Commit as real software rather than portfolio entries. */
export function softwareApplicationNode({
  name,
  description,
  url,
  category = "BusinessApplication",
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
}): Node {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Web",
    author: { "@id": PERSON_ID },
  };
}

/** Wraps nodes in the @graph envelope ready for a <script type="application/ld+json">. */
export function graph(...nodes: Node[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}

/** The nodes every page carries. */
export function baseGraph(): Node[] {
  return [personNode(), webSiteNode()];
}

export { SITE_NAME };
