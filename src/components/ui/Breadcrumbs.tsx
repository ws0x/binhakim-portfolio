import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Path-style breadcrumb trail.
 *
 * Rendered as a filesystem path (`~ / work / orbit`) to match the terminal
 * language of the rest of the site. The last crumb is the current page and is
 * marked `aria-current` rather than linked.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ label: "~", href: "/" }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.4rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontFamily: "var(--font-jet), monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          color: "var(--text-dim)",
        }}
      >
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              {i > 0 && <span aria-hidden="true" style={{ opacity: 0.5 }}>/</span>}
              {isLast || !crumb.href ? (
                <span aria-current={isLast ? "page" : undefined} style={{ color: "var(--cyan)" }}>
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="crumb-link">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
