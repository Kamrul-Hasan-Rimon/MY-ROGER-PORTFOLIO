import { ArrowUp, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/content";
import { BrandLabel } from "@/components/brand-label";

const links = [["About", "about"], ["Capabilities", "capabilities"], ["AI Systems", "lab"], ["Projects", "projects"], ["Journey", "journey"], ["Contact", "contact"]];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-main"><div className="footer-brand"><a className="brand" href="#hero"><BrandLabel /></a><p>{profile.footerStatement}</p><span className="footer-location">PRODUCT ENGINEERING <span /> BUILT WITH INTENT</span></div>
        <div className="footer-nav-column"><span className="mini-label">EXPLORE</span><div className="footer-nav">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}<ArrowUpRight size={12} /></a>)}</div></div>
        <div className="footer-contact-column"><span className="mini-label">ELSEWHERE</span>{profile.github ? <a href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a> : <span className="footer-unset"><Github size={15} /> GitHub URL pending</span>}{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a> : <span className="footer-unset"><Linkedin size={15} /> LinkedIn URL pending</span>}{profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={13} /></a> : <span className="footer-unset">Public email pending</span>}</div>
        <a href="#hero" className="back-top" aria-label="Back to top"><ArrowUp size={18} /><span>BACK TO TOP</span></a>
      </div>
      <div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span><span className="footer-bottom-center"><i /> DESIGNED FOR CLARITY. ENGINEERED FOR USE.</span><span>PORTFOLIO BUILD <b>01.0</b></span></div>
    </footer>
  );
}
