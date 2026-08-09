/**
 * Canonical facts about the site.
 *
 * Anything that appears in more than one place — the URL, the name, social
 * handles, the nav — lives here so routes cannot drift apart. Route metadata
 * is built from `ROUTES` rather than retyped per page.
 */

export const SITE_URL = "https://binhakim.dev";
export const SITE_NAME = "binhakim.dev";
export const FULL_NAME = "Yusuf Naeem Abd El-Hakim";
export const SHORT_NAME = "Yusuf Naeem";
export const EMAIL = "yusufnaeemhakim@gmail.com";
export const LOCATION = { city: "Cairo", country: "EG" } as const;
export const LOCALE = "en" as const;
export const TEXT_DIRECTION = "ltr" as const;
export const AVAILABILITY = "Open to selected engineering roles and product collaborations";

export const SOCIAL = {
  github: "https://github.com/ws0x",
  linkedin: "https://linkedin.com/in/binhakim",
  medium: "https://medium.com/@binhakim",
} as const;

export const DEFAULT_DESCRIPTION =
  "Yusuf Naeem Abd El-Hakim, Software Engineer specialising in systems design and applied security. REST APIs, relational data models, and access-control layers — plus two self-directed SaaS products taken solo from idea to public launch.";

/**
 * Every route the site owns.
 *
 * `nav` controls appearance in the header; `sitemap` controls inclusion in
 * sitemap.xml. Keeping both here means adding a route cannot silently miss
 * either one — the previous sitemap listed `#anchor` fragments, which Google
 * canonicalises back to `/` and which therefore contributed nothing.
 */
export interface RouteDef {
  href: string;
  label: string;
  /** Used as the <title>; the site name is appended by the metadata template. */
  title: string;
  description: string;
  nav: boolean;
  sitemap: boolean;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}

export interface HomeSectionDef {
  id: string;
  label: string;
}

export const HOME_SECTIONS: HomeSectionDef[] = [
  { id: "live-projects", label: "Featured work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export interface AudiencePath {
  id: "hiring" | "collaboration" | "products";
  label: string;
  description: string;
  href: string;
}

export const AUDIENCE_PATHS: AudiencePath[] = [
  { id: "hiring", label: "Hiring me", description: "Review experience, credentials and the resume.", href: "/resume" },
  { id: "collaboration", label: "Working with me", description: "See the systems and workflows I build for real teams.", href: "#contact" },
  { id: "products", label: "Reviewing my products", description: "Explore Commit, Orbit and the decisions behind them.", href: "/work" },
];

export const ROUTES: RouteDef[] = [
  {
    href: "/",
    label: "Home",
    title: `${SHORT_NAME} | Software Engineer`,
    description: DEFAULT_DESCRIPTION,
    nav: false,
    sitemap: true,
    priority: 1.0,
    changeFrequency: "weekly",
  },
  {
    href: "/work",
    label: "Work",
    title: "Work",
    description:
      "Case studies for production products, internal platforms and engineering tools built by Yusuf Naeem.",
    nav: true,
    sitemap: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    href: "/about",
    label: "About",
    title: "About",
    description:
      "How a computer science degree, a year of tutoring classmates, freelance clients and an offensive-security internship turned into shipping production systems — in the order it actually happened.",
    nav: true,
    sitemap: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    href: "/writing",
    label: "Writing",
    title: "Writing",
    description:
      "Published notes on backend engineering, database design and application security.",
    nav: true,
    sitemap: true,
    priority: 0.6,
    changeFrequency: "weekly",
  },
  {
    href: "/stack",
    label: "Stack",
    title: "Stack",
    description:
      "The tools I actually reach for, why each one earns its place, and what I have used properly but would not start with today.",
    nav: true,
    sitemap: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    href: "/resume",
    label: "Resume",
    title: "Resume",
    description: `Experience, education and credentials for ${FULL_NAME} — software engineer, systems design and applied security.`,
    nav: true,
    sitemap: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  // Routes are added here as they are built, not when they are planned — the
  // nav, the sitemap and the 404 all read from this table, so an entry for an
  // unbuilt route would advertise a dead link in three places at once.
];

export const navRoutes = ROUTES.filter((r) => r.nav);
export const sitemapRoutes = ROUTES.filter((r) => r.sitemap);

export function routeFor(href: string): RouteDef | undefined {
  return ROUTES.find((r) => r.href === href);
}

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function homeSectionHref(id: string, pathname = "/"): string {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}
