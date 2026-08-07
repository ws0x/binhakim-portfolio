"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import credentials from "../data/credentials.json";

const { languages } = credentials;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function Languages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="languages"
      ref={ref}
      className="section-pad"
      style={{
        background: "var(--bg-elevated)",
        borderTop: "1px solid rgba(0,217,255,0.07)",
        borderBottom: "1px solid rgba(0,217,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ marginBottom: "3rem" }}
        >
          <p className="section-header">// 09. Languages</p>
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
        </motion.div>

        <div className="cred-grid">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
