import { ArrowUpRight, BookOpen, Compass, Flag, GraduationCap, Layers3, Rocket, ShieldCheck, FlaskConical, Workflow, CodeXml } from "lucide-react";
import { education, processSteps } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

const processIcons = [Compass, Layers3, CodeXml, Workflow, FlaskConical, Rocket, ShieldCheck];

export function JourneySection() {
  return (
    <section className="section-shell content-section journey-section" id="journey" aria-labelledby="journey-title">
      <SectionHeading index="06" titleId="journey-title" eyebrow="PROCESS / LEARNING / DELIVERY" title="A repeatable path from idea to impact." description="Good engineering is a series of explicit decisions, verified assumptions, and short feedback loops—not a heroic last-minute push." sideNote="METHOD / 007" />
      <div className="process-track">
        {processSteps.map((step, index) => {
          const Icon = processIcons[index];
          return <article className="process-step" key={step.n}><div className="process-marker"><span>{step.n}</span><i><Icon size={15} /></i></div><div className="process-copy"><h3>{step.title}</h3><p>{step.text}</p></div></article>;
        })}
      </div>
      <div className="journey-lower">
        <div className="learning-heading"><div className="eyebrow"><span className="section-index">L</span> LEARNING JOURNEY</div><h3>Keep learning. Keep verifying.</h3><p>Credentials and milestones listed from the profile details supplied. Dates and public evidence remain editable.</p><div className="learning-mark"><BookOpen size={17} /><span>CONTINUOUS LEARNING / IN PROGRESS</span></div></div>
        <div className="education-list">{education.map((item, index) => <article className="education-item" key={item.title}><div className="education-icon">{index === 0 ? <GraduationCap size={19} /> : <Flag size={18} />}</div><div className="education-content"><div className="education-status">{item.status}</div><h4>{item.title}</h4><p>{item.subtitle}</p><span>{item.detail}</span></div><ArrowUpRight className="education-arrow" size={17} /></article>)}</div>
      </div>
    </section>
  );
}
