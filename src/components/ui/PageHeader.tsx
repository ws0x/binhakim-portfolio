import Reveal from "./Reveal";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/**
 * The masthead every standalone route opens with.
 *
 * The homepage sections use a numbered `// 0N. Label` eyebrow, which only
 * makes sense as a running count down a single page. Routes use the same
 * visual treatment with a `~/path`-style eyebrow instead, so the terminal
 * language carries across without pretending to be a section index.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <header style={{ marginBottom: "3.5rem" }}>
      {crumbs?.length ? <Breadcrumbs crumbs={crumbs} /> : null}

      <Reveal as="div" delay={0}>
        <p className="section-header">{eyebrow}</p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: lede ? "1.1rem" : 0,
          }}
        >
          {title}
        </h1>
        {lede && (
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "46rem",
            }}
          >
            {lede}
          </p>
        )}
      </Reveal>
    </header>
  );
}
