"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { navRoutes, SOCIAL } from "@/lib/site";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const routeLinks = navRoutes.map((route) => (
    <Link
      key={route.href}
      href={route.href}
      aria-current={pathname === route.href ? "page" : undefined}
      className="nav-route-link"
      onClick={() => setOpen(false)}
    >
      {route.label}
    </Link>
  ));

  return (
    <header className={`site-nav${scrolled ? " site-nav-scrolled" : ""}`}>
      <nav className="site-nav-inner" aria-label="Primary navigation">
        <Link href="/" className="site-logo" aria-label="Bin Hakim homepage" onClick={() => setOpen(false)}>
          <span className="nav-avatar" role="img" aria-label="Yusuf Naeem" />
          <span><span>Bin</span> Hakim</span>
        </Link>

        <div className="nav-desktop">
          {routeLinks}
          <SocialActions />
        </div>

        <button
          className="nav-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-navigation" className="nav-mobile">
          {routeLinks}
          <SocialActions />
        </div>
      ) : null}
    </header>
  );
}

function SocialActions() {
  return (
    <div className="nav-actions">
      <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GithubIcon size={15} />
      </a>
      <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <LinkedinIcon size={15} />
      </a>
      <a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" className="nav-download">
        <Download size={12} /> PDF
      </a>
    </div>
  );
}
