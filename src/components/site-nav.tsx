"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/content";
import { BrandLabel } from "@/components/brand-label";

const navItems = [
  ["About", "about"], ["Capabilities", "capabilities"], ["AI Systems", "lab"],
  ["Projects", "projects"], ["Journey", "journey"], ["Contact", "contact"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const nodes = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      }, { rootMargin: "-25% 0px -58% 0px", threshold: [0, 0.2, 0.5, 0.8] });
      nodes.forEach((node) => observer.observe(node));
      return () => observer.disconnect();
    }
  }, []);

  function closeMenu() { setOpen(false); }

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#hero" onClick={closeMenu} aria-label={`${profile.name}, back to top`}>
          <BrandLabel />
        </a>
        <button className="mobile-nav-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="primary-nav" aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div id="primary-nav" className={`nav-links${open ? " is-open" : ""}`}>
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? "is-active" : ""} onClick={closeMenu}>{label}</a>)}
          {profile.resumePath ? <a className="nav-resume" href={profile.resumePath} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={13} /></a> : null}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
