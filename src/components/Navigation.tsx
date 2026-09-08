"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BinhakimLogo } from "@/components/BrandIcons";

const portfolioLinks = [
  { label: "Hakim Studio", href: "/studio" },
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Writing", href: "#writing" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

const studioLinks = [
  { label: "Products", href: "#available" },
  { label: "In development", href: "#in-development" },
  { label: "About", href: "#about" },
  { label: "Yusuf's portfolio", href: "/" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const studioHost = useSyncExternalStore(() => () => {}, () => window.location.hostname === "studio.binhakim.dev", () => false);
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio") || studioHost;
  const links = isStudio ? studioLinks : portfolioLinks;
  const homeHref = studioHost ? "/#top" : isStudio ? "/studio#top" : pathname === "/" ? "#hero" : "/#hero";
  const resolveHref = (href: string) => {
    if (studioHost && href.startsWith("#")) return href;
    if (studioHost && href.startsWith("/")) return href.replace(/^\/studio/, "") || "/";
    return href.startsWith("/") ? href : isStudio ? `/studio${href}` : pathname === "/" ? href : `/${href}`;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="section-shell nav-inner" aria-label="Primary navigation">
        <a className="brand" href={homeHref} onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <BinhakimLogo size={27} />
          </span>
          <span>{isStudio ? "Hakim Studio" : <>binhakim<span className="brand-dot">.</span>dev</>}</span>
        </a>
        <div className="nav-links nav-desktop">{links.map((link) => <a href={resolveHref(link.href)} key={link.href}>{link.label}</a>)}{!isStudio && <a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" className="nav-resume" data-analytics="resume-download"><Download size={13} /> Resume</a>}</div>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      <div id="mobile-navigation" className={`nav-mobile ${open ? "is-open" : ""}`}>
        <div className="section-shell">{links.map((link) => <a href={resolveHref(link.href)} key={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}{!isStudio && <a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" data-analytics="resume-download" onClick={() => setOpen(false)}><Download size={14} /> Resume</a>}</div>
      </div>
    </header>
  );
}
