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
