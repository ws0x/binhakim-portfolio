import Reveal from "./ui/Reveal";
import { BadgeCheck } from "lucide-react";
import credentials from "../data/credentials.json";

const { certifications } = credentials;

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-pad"
      style={{
        background: "var(--bg-elevated)",
        borderTop: "1px solid rgba(0,217,255,0.07)",
        borderBottom: "1px solid rgba(0,217,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <Reveal as="div" delay={0}
          style={{ marginBottom: "3rem" }}
        >
          <p className="section-header">{"// 07. Certifications"}</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Training &amp; Credentials
          </h2>
        </Reveal>

        <div className="cred-grid">
          {certifications.map((cert, i) => (
            <Reveal as="div" delay={i + 1}
              key={cert.name}
              className="panel glow-border-hover"
              style={{
                padding: "1.25rem 1.35rem",
                display: "flex",
                gap: "0.85rem",
                alignItems: "flex-start",
              }}
            >
              <div className="cred-icon-wrap">
                <BadgeCheck size={16} />
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.35,
                    marginBottom: "0.3rem",
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.68rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.05em",
                    lineHeight: 1.5,
                  }}
                >
                  <span>{cert.issuer}</span>
                  {cert.year && (
                    <span style={{ color: "var(--cyan)", opacity: 0.8 }}>{cert.year}</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
