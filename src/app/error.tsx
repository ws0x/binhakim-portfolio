"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary.
 *
 * Next requires this to be a Client Component. It renders without depending on
 * anything that could itself be broken — no data imports, no shared layout
 * pieces — because it has to survive whatever took the page down.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        background: "var(--bg-base)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "40rem" }}>
        <div className="panel" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <p
            className="panel-label"
            style={{ marginBottom: "1.5rem", color: "var(--warning)" }}
          >
            $ process exited (1)
          </p>

          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.85rem",
            }}
          >
            Something broke on my end
          </h1>

          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            This is a fault in the page, not in anything you did. Retrying often
            clears it.
          </p>

          {error.digest && (
            <p
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                marginBottom: "1.75rem",
                letterSpacing: "0.06em",
              }}
            >
              ref: {error.digest}
            </p>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(0,217,255,0.1)",
            }}
          >
            <button onClick={reset} className="live-btn" style={{ cursor: "pointer" }}>
              Try again
            </button>
            <Link href="/" className="tech-tag" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
