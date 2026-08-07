"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Trophy } from "lucide-react";
import credentials from "../data/credentials.json";

const { honours } = credentials;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="achievements"
      ref={ref}
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ marginBottom: "3rem" }}
      >
        <p className="section-header">// 08. Achievements</p>
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
      </motion.div>

      <div className="honour-grid">
        {honours.map((h, i) => (
          <motion.div
            key={h.title + h.year}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
