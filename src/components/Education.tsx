import Reveal from "./ui/Reveal";
import { GraduationCap, Users, HeartHandshake, FlaskConical } from "lucide-react";
import credentials from "../data/credentials.json";

const { education } = credentials;

export default function Education() {
  return (
    <section
      id="education"
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      <Reveal as="div" delay={0}
        style={{ marginBottom: "3rem" }}
      >
        <p className="section-header">{"// 06. Education"}</p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Where It Started
        </h2>
      </Reveal>

      <Reveal as="div" delay={1}
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
          <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
            <div className="cred-icon-wrap">
              <GraduationCap size={16} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.15rem",
                }}
              >
                {education.degree}
                <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>
                  {" · "}
                  {education.major}
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jet), monospace",
                  fontSize: "0.8rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.04em",
                }}
              >
                {education.school}
              </p>
            </div>
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
              {education.period}
            </span>
            <span
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                letterSpacing: "0.06em",
              }}
            >
              {education.location}
            </span>
          </div>
        </div>

        {/* GPA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            paddingTop: "1rem",
            marginTop: "0.75rem",
            borderTop: "1px solid rgba(0,217,255,0.07)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
            }}
          >
            GPA
          </span>
          <span
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--cyan)",
            }}
          >
            {education.gpa}
          </span>
        </div>

        {/* Activities */}
        <div style={{ marginTop: "1.25rem" }}>
          <div className="cred-row">
            <Users size={14} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "0.15rem" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {education.activities.map((a) => (
                <span key={a} className="tech-tag">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="cred-row">
            <HeartHandshake size={14} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "0.15rem" }} />
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {education.volunteering}
            </p>
          </div>

          <div className="cred-row">
            <FlaskConical size={14} style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "0.15rem" }} />
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {education.graduate}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
