import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { AboutSection, CapabilitiesSection } from "@/components/about-capabilities";
import { AILabSection } from "@/components/ai-lab";
import { ProjectsSection } from "@/components/projects";
import { CodeShowcaseSection } from "@/components/code-showcase";
import { JourneySection } from "@/components/journey";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/lib/content";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.intro,
};

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteNav />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <div className="section-separator" aria-hidden="true"><span>01 / THE ENGINEER</span><i /><span>THOUGHTFUL SYSTEMS · PRACTICAL OUTCOMES</span></div>
        <AboutSection />
        <CapabilitiesSection />
        <AILabSection />
        <ProjectsSection />
        <CodeShowcaseSection />
        <JourneySection />
        <ContactSection />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
