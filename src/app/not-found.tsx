import Link from "next/link";
import type { Metadata } from "next";
import { navRoutes } from "@/lib/site";

export const metadata: Metadata = {
  title: "404 — Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className="grid-bg"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "40rem" }}>
        <div className="panel" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <p className="panel-label" style={{ marginBottom: "1.5rem" }}>
            $ cd {"<unknown>"}
          </p>

          <p
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "clamp(2.6rem, 9vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              color: "var(--cyan)",
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
            }}
            className="glow-text"
          >
            404
          </p>

          <p
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.8rem",
              color: "var(--warning)",
              marginBottom: "1.25rem",
              letterSpacing: "0.04em",
            }}
          >
            no such file or directory
          </p>

          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            That path doesn&apos;t exist. It may have moved, or it may never have
            been here. Everything below is real.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(0,217,255,0.1)",
            }}
          >
            <Link href="/" className="tech-tag" style={{ textDecoration: "none" }}>
              Home
            </Link>
            {navRoutes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="tech-tag"
                style={{ textDecoration: "none" }}
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
