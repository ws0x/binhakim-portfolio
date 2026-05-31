"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Live", href: "#live-projects" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(6, 11, 20, 0.88)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(0, 217, 255, 0.12)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div className="nav-avatar" role="img" aria-label="Yusuf Naeem" />
          <span
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--cyan)",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "var(--cyan)" }}>Bin</span>{" "}Hakim
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--cyan)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {l.label}
            </a>
          ))}

          <div style={{ display: "flex", gap: "0.75rem", marginLeft: "0.5rem", alignItems: "center" }}>
            {[
              {
                href: "https://github.com/ws0x",
                Icon: GithubIcon,
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/binhakim",
                Icon: LinkedinIcon,
                label: "LinkedIn",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  border: "1px solid rgba(0,217,255,0.2)",
                  borderRadius: "6px",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--cyan)";
                  e.currentTarget.style.borderColor = "rgba(0,217,255,0.5)";
                  e.currentTarget.style.background = "rgba(0,217,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "rgba(0,217,255,0.2)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={15} />
              </a>
            ))}

            <a
              href="/resume.pdf"
              download="Yusuf_Naeem_Resume.pdf"
              aria-label="Download Resume"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                height: "34px",
                padding: "0 0.75rem",
                border: "1px solid rgba(0,217,255,0.35)",
                borderRadius: "6px",
                background: "rgba(0,217,255,0.06)",
                color: "var(--cyan)",
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,217,255,0.14)";
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.6)";
                e.currentTarget.style.boxShadow = "0 0 14px rgba(0,217,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,217,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.35)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Download size={12} />
              Resume
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            padding: "4px",
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="flex md:hidden"
          style={{
            background: "rgba(6, 11, 20, 0.97)",
            borderBottom: "1px solid rgba(0,217,255,0.12)",
            backdropFilter: "blur(20px)",
            flexDirection: "column",
            padding: "1rem 1.5rem 1.5rem",
            gap: "1rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "0.5rem 0",
                borderBottom: "1px solid rgba(0,217,255,0.06)",
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem", alignItems: "center", flexWrap: "wrap" }}>
            <a href="https://github.com/ws0x" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}>
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com/in/binhakim" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}>
              <LinkedinIcon size={18} />
            </a>
            <a
              href="/resume.pdf"
              download="Yusuf_Naeem_Resume.pdf"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.35rem 0.75rem",
                border: "1px solid rgba(0,217,255,0.35)",
                borderRadius: "6px",
                background: "rgba(0,217,255,0.06)",
                color: "var(--cyan)",
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <Download size={12} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
