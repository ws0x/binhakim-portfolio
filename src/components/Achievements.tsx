import Reveal from "./ui/Reveal";
import { Trophy } from "lucide-react";
import credentials from "../data/credentials.json";

const { honours } = credentials;

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      <Reveal as="div" delay={0}
        style={{ marginBottom: "3rem" }}
      >
        <p className="section-header">{"// 08. Achievements"}</p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Honours
        </h2>
      </Reveal>

      <div className="honour-grid">
        {honours.map((h, i) => (
          <Reveal as="div" delay={i + 1}
            key={h.title + h.year}
            className="panel glow-border-hover"
            style={{
              padding: "1.4rem 1.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div className="cred-icon-wrap" style={{ width: "38px", height: "38px" }}>
              <Trophy size={18} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  marginBottom: "0.25rem",
                }}
              >
                {h.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jet), monospace",
                  fontSize: "0.7rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.05em",
                }}
              >
                {h.detail}
                <span style={{ opacity: 0.4, margin: "0 0.4rem" }}>·</span>
                <span style={{ color: "var(--cyan)", opacity: 0.85 }}>{h.year}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
