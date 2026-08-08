import Reveal from "./ui/Reveal";
import credentials from "../data/credentials.json";

const { languages } = credentials;

export default function Languages() {
  return (
    <section
      id="languages"
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
          <p className="section-header">{"// 09. Languages"}</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Spoken
          </h2>
        </Reveal>

        <div className="cred-grid">
          {languages.map((lang, i) => (
            <Reveal as="div" delay={i + 1}
              key={lang.name}
              className="panel glow-border-hover"
              style={{ padding: "1.35rem 1.5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  marginBottom: "0.85rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {lang.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                    textAlign: "right",
                  }}
                >
                  {lang.level}
                </span>
              </div>

              {/* Proficiency bars */}
              <div style={{ display: "flex", gap: "0.35rem" }} aria-hidden="true">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    style={{
                      flex: 1,
                      height: "4px",
                      borderRadius: "2px",
                      background:
                        step <= lang.bars ? "var(--cyan)" : "rgba(0,217,255,0.12)",
                      boxShadow:
                        step <= lang.bars ? "0 0 8px rgba(0,217,255,0.35)" : "none",
                    }}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
