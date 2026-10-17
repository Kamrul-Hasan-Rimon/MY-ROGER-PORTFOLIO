"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, X, Layers3, Workflow, BrainCircuit, Braces, ChevronRight } from "lucide-react";
import { categories, projects, type Project, type ProjectCategory } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

const categoryIcons: Record<ProjectCategory, typeof Braces> = {
  "Full-Stack": Braces,
  "AI Automation": Workflow,
  "Agentic AI": BrainCircuit,
  "AI Applications": Layers3,
};

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => { dialog.removeEventListener("close", handleClose); if (dialog.open) dialog.close(); };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="dialog-topline"><span className="mini-label">CASE STUDY / {project.number}</span><button type="button" className="icon-button" onClick={() => dialogRef.current?.close()} aria-label="Close project details"><X size={18} /></button></div>
      <p className="project-eyebrow">{project.eyebrow}</p><h3 id="project-dialog-title">{project.title}</h3><p className="dialog-description">{project.description}</p>
      {project.status === "illustrative" ? <div className="dialog-disclaimer"><span /> Illustrative content — replace with a verified project before publishing.</div> : null}
      <div className="dialog-content-grid"><div><span className="mini-label">PROBLEM / CONTEXT</span><p>{project.problem}</p></div><div><span className="mini-label">SOLUTION / APPROACH</span><p>{project.solution}</p></div></div>
      <div className="dialog-architecture"><span className="mini-label">ARCHITECTURE NOTES</span><ul>{project.architecture.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="project-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
      <div className="dialog-actions">{project.liveUrl ? <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">View live <ExternalLink size={15} /></a> : null}{project.repoUrl ? <a className="button button-secondary" href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={15} /> Source repository</a> : null}<button type="button" className="button button-secondary" onClick={() => dialogRef.current?.close()}>Close details</button></div>
    </dialog>
  );
}

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All Projects");
  const [selected, setSelected] = useState<Project | null>(null);
  const closeSelected = useCallback(() => setSelected(null), []);
  const visible = filter === "All Projects" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section className="section-shell content-section projects-section" id="projects" aria-labelledby="projects-title">
      <SectionHeading index="04" titleId="projects-title" eyebrow="SELECTED WORK / PORTFOLIO SLOTS" title="Proof over promises." description="A strong case study shows the problem, the decisions, and the evidence. The cards below are editable placeholders—not claims of completed client projects." sideNote="WORK INDEX / 004" />
      <div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{categories.map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}<span>{category === "All Projects" ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}</div><span className="project-count">SHOWING {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
      <div className="projects-grid">
        {visible.map((project) => {
          const Icon = categoryIcons[project.category];
          return <motion.article key={project.id} className={`project-card accent-${project.accent}`} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.22, ease: "easeOut" }}>
            <button type="button" className="project-card-button" onClick={() => setSelected(project)} aria-label={`Open details for ${project.title}`}>
              <div className="project-visual"><div className="project-visual-grid" /><div className={`project-art art-${project.number}`} aria-hidden="true"><span className="art-ring ring-outer" /><span className="art-ring ring-inner" /><span className="art-core"><Icon size={32} strokeWidth={1.2} /></span><span className="art-node n1" /><span className="art-node n2" /><span className="art-node n3" /></div><div className="project-visual-meta"><span>{project.number} / 04</span><span>CONCEPT FRAME</span></div><span className="project-open-icon"><ArrowUpRight size={18} /></span></div>
              <div className="project-card-body"><div className="project-card-top"><span className="project-category"><Icon size={13} />{project.category}</span><span className={project.status === "illustrative" ? "placeholder-badge" : "published-badge"}>{project.status === "illustrative" ? "ILLUSTRATIVE" : "CASE STUDY"}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-card-footer"><span>{project.status === "illustrative" ? "EXPLORE CONCEPT" : "VIEW CASE STUDY"}</span><ChevronRight size={16} /></div></div>
            </button>
          </motion.article>;
        })}
      </div>
      <div className="projects-integrity"><span className="integrity-mark">i</span><p><strong>Publication rule:</strong> replace these concept slots with real work, screenshots you own, and working repository or live URLs. Keep only what you can demonstrate and explain.</p><a href="#contact">Discuss a project <ArrowUpRight size={14} /></a></div>
      {selected ? <ProjectDetail project={selected} onClose={closeSelected} /> : null}
    </section>
  );
}
