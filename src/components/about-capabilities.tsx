import {
  ArrowUpRight,
  BrainCircuit,
  Braces,
  Layers3,
  Workflow,
  CircleCheck,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { profile, skills } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import Image from "next/image";
import portraitImage from "../../public/assets/stylish image of myself.png";

const icons = [Braces, Workflow, BrainCircuit, Layers3];

export function AboutSection() {
  return (
    <section
      className="section-shell content-section about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeading
        index="01"
        titleId="about-title"
        eyebrow="A LITTLE ABOUT THE ENGINEER"
        title="Curiosity is useful.\nSystems thinking ships."
        description="Thoughtful software starts with understanding the problem—not choosing the trendiest tool."
        sideNote="ENGINEER'S NOTE / 001"
      />
      <div className="about-layout">
        <div className="about-mark-panel about-portrait-panel">
          <Image
            src={portraitImage}
            alt="Portrait of Kamrul Hasan"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="about-portrait-image"
          />

          <div className="monogram-caption">
            <span>{profile.initials} / PERSONAL SYSTEM</span>
            <span>IDENTITY / 001</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I’m <span>{profile.name}</span>—an engineer focused on the
            intersection of software, automation, and applied AI.
          </p>
          <p>{profile.biography}</p>
          <p>
            The principle is simple: use the right amount of technology, make
            system behavior visible, and give people meaningful control when
            automation reaches its limits.
          </p>
          <div className="about-values">
            <div>
              <CircleCheck size={16} />
              <span>Clarity over cleverness</span>
            </div>
            <div>
              <ShieldCheck size={16} />
              <span>Reliability by design</span>
            </div>
            <div>
              <Gauge size={16} />
              <span>Performance with purpose</span>
            </div>
          </div>
          <a className="text-link" href="#journey">
            Explore my engineering process <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      className="section-shell content-section capabilities-section"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <SectionHeading
        index="02"
        titleId="capabilities-title"
        eyebrow="ENGINEERING CAPABILITIES"
        title="From interface to intelligence."
        description="Four connected disciplines, one end-to-end mindset. These are focus areas—not percentage-based proficiency claims."
        sideNote="CAPABILITIES / 004"
      />
      <div className="capabilities-grid">
        {skills.map((skill, index) => {
          const Icon = icons[index];
          return (
            <article className="capability-panel" key={skill.number}>
              <div className="capability-top">
                <span className="capability-number">{skill.number}</span>
                <span className="capability-icon">
                  <Icon size={19} strokeWidth={1.55} />
                </span>
                <span className="capability-arrow">
                  <ArrowUpRight size={17} />
                </span>
              </div>
              <p className="mini-label">{skill.tag}</p>
              <h3>{skill.title}</h3>
              <p className="capability-description">{skill.description}</p>
              <ul>
                {skill.items.map((item) => (
                  <li key={item}>
                    <span className="list-dash" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="capabilities-footnote">
        <span className="footnote-pip" />{" "}
        <span>TECH STACK IS CONFIGURABLE</span>
        <p>
          Only keep tools you can confidently discuss and demonstrate. Edit the
          typed content in <code>src/lib/content.ts</code>.
        </p>
      </div>
    </section>
  );
}
