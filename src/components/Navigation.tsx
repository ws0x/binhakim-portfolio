"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Writing", href: "#writing" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="section-shell nav-inner" aria-label="Primary navigation">
        <a className="brand" href="#hero" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">Y</span><span>binhakim<span className="brand-dot">.</span>dev</span></a>
        <div className="nav-links nav-desktop">{links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}<a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" className="nav-resume" data-analytics="resume-download"><Download size={13} /> Resume</a></div>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      <div id="mobile-navigation" className={`nav-mobile ${open ? "is-open" : ""}`}>
        <div className="section-shell">{links.map((link) => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" data-analytics="resume-download" onClick={() => setOpen(false)}><Download size={14} /> Resume</a></div>
      </div>
    </header>
  );
}
