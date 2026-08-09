import Reveal from "./ui/Reveal";
import { experience as experienceData } from "../lib/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      <Reveal as="div" delay={0}
        style={{ marginBottom: "3.5rem" }}
      >
        <p className="section-header">{"// 04. Experience"}</p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Where I&apos;ve Built Things
        </h2>
      </Reveal>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "2rem" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: "6px",
            bottom: "6px",
            width: "1px",
            background:
              "linear-gradient(to bottom, var(--cyan), rgba(0,217,255,0.1))",
          }}
        />

        {experienceData.map((exp, i) => (
          <Reveal as="div" delay={i + 1}
            key={i}
            style={{
              position: "relative",
              marginBottom: i < experienceData.length - 1 ? "3rem" : 0,
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "-2rem",
                top: "1.5rem",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "var(--bg-base)",
                border: "2px solid var(--cyan)",
                boxShadow: "0 0 10px rgba(0,217,255,0.4)",
              }}
            />

            {/* Card */}
            <div
              className="panel glow-border-hover"
              style={{ padding: "1.75rem 2rem" }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.8rem",
                      color: "var(--cyan)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="exp-meta">
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.7rem",
                      color: "var(--text-dim)",
                      display: "block",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {exp.period}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.68rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "1.1rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(0,217,255,0.07)",
                }}
              >
                {exp.description}
              </p>

              {/* Bullet points */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--cyan)",
                        marginTop: "0.35rem",
                        flexShrink: 0,
                        fontSize: "0.5rem",
                      }}
                    >
                      ▶
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {exp.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
