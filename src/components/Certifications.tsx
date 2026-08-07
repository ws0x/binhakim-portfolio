"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import credentials from "../data/credentials.json";

const { certifications } = credentials;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="certifications"
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
          <p className="section-header">// 07. Certifications</p>
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
        </motion.div>

        <div className="cred-grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
