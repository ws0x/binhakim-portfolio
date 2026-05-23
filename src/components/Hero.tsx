"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const ROLES = [
  "Backend Engineer",
  "Systems Architect",
  "Database Optimizer",
  "Infrastructure Nerd",
  "DevOps Enthusiast",
];

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(
        () => setDisplayed(target.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        45
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span>
      <span style={{ color: "var(--cyan)" }}>{displayed}</span>
      <span
        className="cursor-blink"
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          background: "var(--cyan)",
          verticalAlign: "text-bottom",
          marginLeft: "2px",
        }}
      />
    </span>
  );
}

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const interval = setInterval(() => {
      setLines((l) => {
        if (l >= 4) { clearInterval(interval); return l; }
        return l + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [booted]);

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 1.5rem",
      }}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Radial gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,217,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "72rem",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div className="hero-split">

        {/* ── Text content ─────────────────────────────────── */}
        <div className="hero-content">

        {/* Boot status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            opacity: booted ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <span className="online-dot" />
          <span
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--success)",
              textTransform: "uppercase",
            }}
          >
            System Online
          </span>
          <span
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.65rem",
              color: "var(--text-dim)",
              letterSpacing: "0.1em",
            }}
          >
            · binhakim.dev · v26
          </span>
        </div>

        {/* Terminal boot lines */}
        <div
          style={{
            marginBottom: "2rem",
            minHeight: "4.5rem",
          }}
        >
          {[
            { prefix: ">", text: "whoami", delay: 0 },
            { prefix: "//", text: "Backend Engineer · Systems Infrastructure", delay: 1 },
            { prefix: ">", text: "ls skills/ | head -5", delay: 2 },
            { prefix: "//", text: "Go  Node.js  PostgreSQL  Redis  Nginx  RabbitMQ", delay: 3 },
          ].map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.75rem",
                lineHeight: "1.8",
                color: i % 2 === 0 ? "var(--cyan)" : "var(--text-secondary)",
                opacity: lines > i ? 1 : 0,
                transform: lines > i ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--text-dim)", marginRight: "0.5rem" }}>
                {line.prefix}
              </span>
              {line.text}
            </div>
          ))}
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "1rem",
            opacity: lines >= 2 ? 1 : 0,
            transform: lines >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          Yusuf Naeem
          <br />
          <span className="glow-text" style={{ color: "var(--cyan)" }}>
            Abd El-Hakim
          </span>
        </h1>

        {/* Typing role */}
        <p
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontFamily: "var(--font-jet), monospace",
            fontWeight: 400,
            color: "var(--text-secondary)",
            marginBottom: "1.75rem",
            height: "2rem",
            opacity: lines >= 3 ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          <TypingText />
        </p>

        {/* Tagline */}
        <p
          style={{
            maxWidth: "44rem",
            fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            marginBottom: "3rem",
            opacity: lines >= 4 ? 1 : 0,
            transform: lines >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
          }}
        >
          Passionate about deep-diving into system internals, designing scalable
          APIs, and building tools that make applications faster and more
          efficient. Strong foundation in CS with hands-on infrastructure
          experience.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            opacity: lines >= 4 ? 1 : 0,
            transform: lines >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
          }}
        >
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              background: "var(--cyan)",
              color: "var(--bg-base)",
              borderRadius: "6px",
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 20px rgba(0,217,255,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,217,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,217,255,0.3)";
            }}
          >
            View Projects
          </a>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.75rem",
              background: "transparent",
              color: "var(--cyan)",
              border: "1px solid var(--cyan-border)",
              borderRadius: "6px",
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,217,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "var(--cyan-border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get in Touch
          </a>

          <a
            href="https://github.com/ws0x"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid rgba(0,217,255,0.12)",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.3)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.12)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://linkedin.com/in/binhakim"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid rgba(0,217,255,0.12)",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.3)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.12)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <LinkedinIcon size={16} />
          </a>
        </div>{/* end CTAs row */}
        </div>{/* end hero-content */}

        {/* ── Portrait photo ───────────────────────────────── */}
        <div
          className="hero-photo-wrap"
          style={{
            opacity: lines >= 2 ? 1 : 0,
            transform: lines >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile.jpg" alt="Yusuf Naeem Abd El-Hakim" />
        </div>

        </div>{/* end hero-split */}
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--text-dim)",
          textDecoration: "none",
          opacity: lines >= 4 ? 1 : 0,
          transition: "opacity 0.5s ease 0.6s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jet), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <ArrowDown size={14} style={{ animation: "fadeUp 1.5s ease-in-out infinite alternate" }} />
      </a>
    </section>
  );
}
