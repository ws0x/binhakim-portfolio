import Reveal from "./ui/Reveal";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, MediumIcon, WhatsAppIcon } from "./BrandIcons";
import { EMAIL } from "@/lib/site";
import TrackedEmailLink from "./TrackedEmailLink";

const socials = [
  {
    label: "Email",
    sub: "yusufnaeemhakim@gmail.com",
    href: "mailto:yusufnaeemhakim@gmail.com",
    Icon: Mail,
  },
  {
    label: "WhatsApp",
    sub: "+20 102 090 0480",
    href: "https://wa.me/201020900480",
    Icon: WhatsAppIcon,
  },
  {
    label: "LinkedIn",
    sub: "linkedin.com/in/binhakim",
    href: "https://linkedin.com/in/binhakim",
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    sub: "github.com/ws0x",
    href: "https://github.com/ws0x",
    Icon: GithubIcon,
  },
  {
    label: "Medium",
    sub: "medium.com/@binhakim",
    href: "https://medium.com/@binhakim",
    Icon: MediumIcon,
  },
  {
    label: "Instagram",
    sub: "instagram.com/binhakim",
    href: "https://instagram.com/binhakim",
    Icon: InstagramIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        background: "var(--bg-elevated)",
        borderTop: "1px solid rgba(0,217,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <Reveal as="div" delay={0}
          style={{ marginBottom: "4rem", maxWidth: "44rem" }}
        >
          <p className="section-header">{"// 11. Contact"}</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            Let&apos;s build something together
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
            }}
          >
            I&apos;m open to software engineering roles and collaborations
            involving systems design, APIs and data modelling, or security
            work. Whether you have an opportunity or just want to talk tech —
            my inbox is always open.
          </p>
          <TrackedEmailLink className="email-cta" href={`mailto:${EMAIL}`} source="contact">
            Email Yusuf directly
          </TrackedEmailLink>
        </Reveal>

        {/* Social grid */}
        <div
          className="contact-socials"
          style={{ marginBottom: "4rem" }}
        >
          {socials.map(({ label, sub, href, Icon }, i) => (
            <Reveal as="a" delay={i + 1}
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="panel glow-border-hover lift-hover"
              style={{
                padding: "1.25rem 1.5rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  border: "1px solid var(--cyan-border)",
                  borderRadius: "8px",
                  background: "var(--cyan-glow)",
                  color: "var(--cyan)",
                  flexShrink: 0,
                }}
              >
                <Icon size={17} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "0.1rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(0,217,255,0.08)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jet), monospace",
              fontSize: "0.7rem",
              color: "var(--text-dim)",
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "var(--cyan)" }}>binhakim</span>.dev ·
            Yusuf Naeem Abd El-Hakim · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
