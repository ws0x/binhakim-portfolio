"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Globe,
  Network,
  Users,
  Zap,
  CreditCard,
  Smartphone,
  Languages,
  ArrowUpRight,
  Home,
  Share2,
  BarChart2,
  Settings,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const FEATURES = [
  { Icon: Users, label: "People Dashboard", detail: "Track & organise your network" },
  { Icon: Network, label: "Relationship Graph", detail: "D3 force-directed visualisation" },
  { Icon: Zap, label: "AI Semantic Search", detail: "Gemini-powered smart queries" },
  { Icon: CreditCard, label: "Stripe Billing", detail: "Free + Pro subscription tiers" },
  { Icon: Smartphone, label: "PWA · Offline", detail: "Installable on iOS & Android" },
  { Icon: Languages, label: "RTL i18n", detail: "Full English + Arabic support" },
];

const TECH = [
  "Next.js 16",
  "TypeScript",
  "Supabase",
  "Gemini AI",
  "Stripe",
  "TanStack Query",
  "Tailwind v4",
  "PWA",
];

function OrbitAppMockup() {
  const people = [
    { name: "Sarah Chen", role: "VP Eng · Google", str: 88, color: "#7c3aed" },
    { name: "Marcus Reid", role: "Founder · YC W24", str: 64, color: "#0891b2" },
    { name: "Layla Al-Amin", role: "CTO · Careem", str: 93, color: "#059669" },
  ];

  const sidebarItems = [
    { Icon: Home, active: false },
    { Icon: Users, active: true },
    { Icon: Share2, active: false },
    { Icon: BarChart2, active: false },
    { Icon: Settings, active: false },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
        background: "#0c0818",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-jet), monospace",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#150e2b",
          borderBottom: "1px solid rgba(124,58,237,0.2)",
          padding: "0.5rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: c,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#1c1038",
            border: "1px solid rgba(124,58,237,0.22)",
            borderRadius: "4px",
            padding: "3px 8px",
            fontSize: "0.58rem",
            color: "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#28c840",
              flexShrink: 0,
            }}
          />
          byorbit.io
        </div>
      </div>

      {/* App layout */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "44px",
            background: "#110a22",
            borderRight: "1px solid rgba(124,58,237,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.6rem 0",
            gap: "0.35rem",
            flexShrink: 0,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "6px",
              background: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
              boxShadow: "0 0 10px rgba(124,58,237,0.55)",
              flexShrink: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="2" fill="white" />
              <circle cx="7" cy="7" r="4.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
              <circle cx="7" cy="7" r="6.5" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
            </svg>
          </div>
          {sidebarItems.map(({ Icon, active }, i) => (
            <div
              key={i}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: active ? "rgba(124,58,237,0.22)" : "transparent",
                color: active ? "#a78bfa" : "rgba(255,255,255,0.22)",
                flexShrink: 0,
              }}
            >
              <Icon size={12} />
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "0.65rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Page header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.55rem",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.88)",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: "0.04em",
              }}
            >
              People
            </span>
            <div
              style={{
                background: "#7c3aed",
                color: "white",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                boxShadow: "0 0 8px rgba(124,58,237,0.45)",
              }}
            >
              + Add
            </div>
          </div>

          {/* Person cards */}
          {people.map((p) => (
            <div
              key={p.name}
              style={{
                background: "#180938",
                border: "1px solid rgba(124,58,237,0.12)",
                borderRadius: "5px",
                padding: "0.42rem 0.5rem",
                marginBottom: "0.35rem",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: p.color,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.5rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {p.name.charAt(0)}
              </div>
              <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
                <div
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.52rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.role}
                </div>
              </div>
              <div style={{ width: "30px", flexShrink: 0 }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: "2px",
                    height: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${p.str}%`,
                      background: p.color,
                      height: "100%",
                    }}
                  />
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.22)",
                    fontSize: "0.44rem",
                    textAlign: "right",
                    marginTop: "1px",
                  }}
                >
                  {p.str}%
                </div>
              </div>
            </div>
          ))}

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "0.35rem",
              marginTop: "auto",
              paddingTop: "0.4rem",
              flexShrink: 0,
            }}
          >
            {[
              { v: "247", l: "People" },
              { v: "18", l: "Active" },
              { v: "4", l: "Clusters" },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  flex: 1,
                  background: "#180938",
                  border: "1px solid rgba(124,58,237,0.12)",
                  borderRadius: "4px",
                  padding: "0.25rem 0.3rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#a78bfa",
                    fontWeight: 700,
                    fontSize: "0.62rem",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.22)",
                    fontSize: "0.44rem",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="live-projects"
      className="section-pad"
      style={{
        background:
          "radial-gradient(ellipse at 25% 60%, rgba(124,58,237,0.05) 0%, transparent 55%), radial-gradient(ellipse at 75% 0%, rgba(0,217,255,0.06) 0%, transparent 50%), var(--bg-elevated)",
        borderTop: "1px solid rgba(0,217,255,0.07)",
        borderBottom: "1px solid rgba(0,217,255,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.022) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
        <div ref={ref}>
          {/* Section header */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ marginBottom: "3rem" }}
          >
            <p className="section-header">// 05. Live</p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "0.6rem",
              }}
            >
              Shipped &amp; Deployed
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                maxWidth: "44rem",
                lineHeight: 1.7,
              }}
            >
              Not prototypes. Not toy demos. Live, full-stack products running on real
              infrastructure — with auth, billing, persistence, and production deployments.
            </p>
          </motion.div>

          {/* Spotlight card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div
              className="live-card-grid"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${hovered ? "rgba(0,217,255,0.38)" : "rgba(0,217,255,0.16)"}`,
                borderRadius: "14px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                boxShadow: hovered
                  ? "0 0 0 1px rgba(0,217,255,0.12), 0 0 60px rgba(0,217,255,0.09), 0 12px 60px rgba(0,0,0,0.5)"
                  : "0 0 0 1px rgba(0,217,255,0.04), 0 6px 40px rgba(0,0,0,0.45)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Corner radial accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "280px",
                  height: "280px",
                  background:
                    "radial-gradient(circle at top right, rgba(0,217,255,0.07), transparent 65%)",
                  borderRadius: "0 14px 0 0",
                  pointerEvents: "none",
                }}
              />

              {/* ── Left: Info panel ── */}
              <div style={{ position: "relative" }}>
                {/* Status + category row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.4rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.28)",
                      borderRadius: "100px",
                      padding: "4px 12px 4px 8px",
                    }}
                  >
                    <span className="online-dot" style={{ width: "7px", height: "7px" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-jet), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        color: "var(--success)",
                        textTransform: "uppercase",
                      }}
                    >
                      Live Now
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                    }}
                  >
                    Full-Stack SaaS
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1,
                    marginBottom: "0.45rem",
                  }}
                >
                  Orbit
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.75rem",
                    color: "var(--cyan)",
                    letterSpacing: "0.08em",
                    marginBottom: "1.1rem",
                    opacity: 0.82,
                  }}
                >
                  Personal Relationship OS
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    marginBottom: "1.75rem",
                    maxWidth: "44rem",
                  }}
                >
                  A full-stack professional networking tool that turns your contact list
                  into a queryable, visual, and trackable system. Features a
                  force-directed relationship graph, Gemini-powered AI search, Stripe
                  subscription billing, push-notification reminders, a bilingual (EN/AR)
                  interface, and Supabase RLS multi-tenancy — all deployed on Vercel.
                </p>

                {/* Feature chips */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.6rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {FEATURES.map(({ Icon, label, detail }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        padding: "0.65rem 0.75rem",
                        background: "rgba(0,217,255,0.03)",
                        border: "1px solid rgba(0,217,255,0.09)",
                        borderRadius: "7px",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.background = "rgba(0,217,255,0.07)";
                        el.style.borderColor = "rgba(0,217,255,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.background = "rgba(0,217,255,0.03)";
                        el.style.borderColor = "rgba(0,217,255,0.09)";
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "6px",
                          background: "rgba(0,217,255,0.07)",
                          border: "1px solid rgba(0,217,255,0.16)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--cyan)",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={13} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            lineHeight: 1.2,
                            marginBottom: "0.15rem",
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.67rem",
                            color: "var(--text-dim)",
                            lineHeight: 1.3,
                          }}
                        >
                          {detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {TECH.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a
                    href="https://byorbit.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.73rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--bg-base)",
                      background: "var(--cyan)",
                      padding: "0.65rem 1.4rem",
                      borderRadius: "6px",
                      textDecoration: "none",
                      boxShadow: "0 0 22px rgba(0,217,255,0.38)",
                      transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "#33e1ff";
                      el.style.boxShadow = "0 0 36px rgba(0,217,255,0.58)";
                      el.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "var(--cyan)";
                      el.style.boxShadow = "0 0 22px rgba(0,217,255,0.38)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <Globe size={14} />
                    Visit App
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x/orbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.73rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      background: "transparent",
                      border: "1px solid rgba(0,217,255,0.25)",
                      padding: "0.65rem 1.2rem",
                      borderRadius: "6px",
                      textDecoration: "none",
                      transition:
                        "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "var(--cyan)";
                      el.style.borderColor = "rgba(0,217,255,0.55)";
                      el.style.background = "rgba(0,217,255,0.06)";
                      el.style.boxShadow = "0 0 14px rgba(0,217,255,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "var(--text-secondary)";
                      el.style.borderColor = "rgba(0,217,255,0.25)";
                      el.style.background = "transparent";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                </div>
              </div>

              {/* ── Right: App mockup ── */}
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid rgba(124,58,237,0.22)",
                  boxShadow:
                    "0 0 40px rgba(124,58,237,0.12), 0 8px 32px rgba(0,0,0,0.55)",
                  aspectRatio: "16/10",
                  position: "relative",
                }}
              >
                <OrbitAppMockup />
                {/* Bottom fade overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "48px",
                    background:
                      "linear-gradient(to top, rgba(12,18,32,0.65), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
