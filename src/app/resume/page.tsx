import { Download } from "lucide-react";
import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { experience, credentials, skills } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, webPageNode, graph } from "@/lib/schema";
import { routeFor, FULL_NAME, EMAIL, SOCIAL } from "@/lib/site";

const ROUTE = "/resume";
const route = routeFor(ROUTE)!;

export const metadata: Metadata = pageMetadata(ROUTE);

const jsonLd = graph(
  ...baseGraph(),
  webPageNode({
    path: ROUTE,
    name: route.title,
    description: route.description,
    trail: [{ name: "Resume", path: ROUTE }],
  })
);

/** Section heading shared by every block on the page. */
function Rule({ label }: { label: string }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-jet), monospace",
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--cyan)",
        paddingBottom: "0.6rem",
        marginBottom: "1.5rem",
        borderBottom: "1px solid rgba(0,217,255,0.14)",
      }}
    >
      {label}
    </h2>
  );
}

export default function ResumePage() {
  const { education, certifications, honours, languages } = credentials;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <main className="section-pad" style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <PageHeader
          eyebrow="~/resume"
          title="Resume"
          lede={
            <>
              The same document as the PDF, in a form you can read on a phone,
              link to a single line of, and find in a search. {FULL_NAME} —
              software engineer, systems design and applied security.
            </>
          }
          crumbs={[{ label: "resume" }]}
        />

        {/* Contact + download */}
        <Reveal as="div" delay={1} style={{ marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <a
              href="/resume.pdf"
              download="Yusuf_Naeem_Resume.pdf"
              className="github-btn"
              style={{ textDecoration: "none" }}
            >
              <Download size={13} /> Download PDF
            </a>
            <a href={`mailto:${EMAIL}`} className="tech-tag" style={{ textDecoration: "none" }}>
              {EMAIL}
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-tag"
              style={{ textDecoration: "none" }}
            >
              github.com/ws0x
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-tag"
              style={{ textDecoration: "none" }}
            >
              linkedin.com/in/binhakim
            </a>
          </div>
        </Reveal>

        {/* Experience */}
        <Reveal as="section" delay={2} style={{ marginBottom: "3.5rem" }}>
          <Rule label="Experience" />
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {job.title}
                    <span style={{ color: "var(--cyan)", fontWeight: 500 }}>
                      {" · "}
                      {job.company}
                    </span>
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.68rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {job.period}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.66rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.06em",
                    marginBottom: "0.85rem",
                  }}
                >
                  {job.location}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 0.9rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "0.4rem", fontSize: "0.45rem" }}
                      >
                        ▶
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {job.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal as="section" delay={3} style={{ marginBottom: "3.5rem" }}>
          <Rule label="Technical Skills" />
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {skills.categories.map((cat) => (
              <div key={cat.label} className="resume-skill-row">
                <dt
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.66rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--cyan)",
                    opacity: 0.75,
                  }}
                >
                  {cat.label}
                </dt>
                <dd style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {cat.skills.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Education */}
        <Reveal as="section" delay={4} style={{ marginBottom: "3.5rem" }}>
          <Rule label="Education" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "0.5rem",
              marginBottom: "0.35rem",
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {education.degree}
              <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>
                {" · "}
                {education.major}
              </span>
            </h3>
            <span
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                letterSpacing: "0.05em",
              }}
            >
              {education.period}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.78rem",
              color: "var(--cyan)",
              marginBottom: "0.75rem",
            }}
          >
            {education.school} · GPA {education.gpa}
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
            {education.volunteering}
          </p>
        </Reveal>

        {/* Certifications + honours */}
        <Reveal as="section" delay={5} style={{ marginBottom: "3.5rem" }}>
          <Rule label="Certifications & Honours" />
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {certifications.map((c) => (
              <li key={c.name} style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{c.name}</span>
                {" — "}
                {c.issuer}
                {c.year ? <span style={{ color: "var(--text-dim)" }}>{` · ${c.year}`}</span> : null}
              </li>
            ))}
            {honours.map((h) => (
              <li key={h.title} style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{h.title}</span>
                {" — "}
                {h.detail}
                <span style={{ color: "var(--text-dim)" }}>{` · ${h.year}`}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Languages */}
        <Reveal as="section" delay={6}>
          <Rule label="Languages" />
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ")}
          </p>
        </Reveal>
      </main>
    </>
  );
}
