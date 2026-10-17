"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2, LoaderCircle, Mail, Send, ShieldCheck, Github, Linkedin, MessageSquareText } from "lucide-react";
import { profile } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters.").max(80, "Keep your name under 80 characters."),
  email: z.email("Enter a valid email address.").max(254, "Email address is too long."),
  subject: z.string().trim().min(3, "Please add a short subject.").max(120, "Keep the subject under 120 characters."),
  message: z.string().trim().min(10, "Please add a little more detail (at least 10 characters). ").max(4000, "Keep the message under 4,000 characters."),
  website: z.string().max(0, "Invalid submission.").optional(),
});

type FormValues = { name: string; email: string; subject: string; message: string; website: string };
const emptyValues: FormValues = { name: "", email: "", subject: "", message: "", website: "" };

export function ContactSection() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function change(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (state !== "idle") { setState("idle"); setFeedback(""); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormValues, string>> = {};
      parsed.error.issues.forEach((issue) => { const key = issue.path[0] as keyof FormValues; if (!next[key]) next[key] = issue.message; });
      setErrors(next); setState("idle"); setFeedback("Please review the highlighted fields.");
      document.getElementById(`contact-${Object.keys(next)[0] ?? "name"}`)?.focus();
      return;
    }
    setErrors({}); setState("sending"); setFeedback("Sending your message securely…");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const body = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new Error(body.message || "The message could not be sent. Please try again later.");
      setState("success"); setFeedback(body.message || "Your message was delivered successfully."); setValues(emptyValues);
    } catch (error) {
      setState("error"); setFeedback(error instanceof Error ? error.message : "Unexpected error. Please try again later.");
    }
  }

  return (
    <section className="section-shell content-section contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeading index="07" titleId="contact-title" eyebrow="CONTACT / COLLABORATION" title="Have a real problem to solve?" description="Tell me what you’re trying to build, automate, or make more reliable. Specific context leads to better conversations." sideNote="CHANNEL OPEN / CONFIG REQUIRED" />
      <div className="contact-layout">
        <div className="contact-intro"><div className="contact-statement"><span className="contact-statement-icon"><MessageSquareText size={20} /></span><h3>Let's make something useful.</h3><p>Good fit: thoughtful product work, practical AI systems, robust integrations, and problems worth understanding before writing code.</p></div>
          <div className="contact-lines"><div className="contact-line"><span className="contact-line-icon"><Mail size={16} /></span><span><small>EMAIL</small>{profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : <b className="not-configured">Add verified email in content.ts</b>}</span>{profile.email ? <ArrowUpRight size={15} /> : null}</div>
            {profile.github ? <a className="contact-line" href={profile.github} target="_blank" rel="noreferrer"><span className="contact-line-icon"><Github size={16} /></span><span><small>GITHUB</small><b>Code & experiments</b></span><ArrowUpRight size={15} /></a> : <div className="contact-line"><span className="contact-line-icon"><Github size={16} /></span><span><small>GITHUB</small><b className="not-configured">Profile URL not supplied</b></span></div>}
            {profile.linkedin ? <a className="contact-line" href={profile.linkedin} target="_blank" rel="noreferrer"><span className="contact-line-icon"><Linkedin size={16} /></span><span><small>LINKEDIN</small><b>Professional profile</b></span><ArrowUpRight size={15} /></a> : <div className="contact-line"><span className="contact-line-icon"><Linkedin size={16} /></span><span><small>LINKEDIN</small><b className="not-configured">Profile URL not supplied</b></span></div>}
          </div>
          <div className="privacy-note"><ShieldCheck size={16} /><p>Your message is validated server-side. Delivery remains disabled until the email provider is configured; the form will report that clearly instead of pretending it was sent.</p></div>
        </div>
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="form-header"><div><span className="mini-label">NEW CONVERSATION</span><h3>Send a message<span>.</span></h3></div><span className="form-encryption"><ShieldCheck size={13} /> SERVER VALIDATED</span></div>
          <div className="form-row"><div className="form-field"><label htmlFor="contact-name">Your name <span>*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="How should I address you?" value={values.name} onChange={(e) => change("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} required maxLength={80} />{errors.name ? <small className="field-error" id="contact-name-error">{errors.name}</small> : null}</div><div className="form-field"><label htmlFor="contact-email">Email address <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(e) => change("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} required maxLength={254} />{errors.email ? <small className="field-error" id="contact-email-error">{errors.email}</small> : null}</div></div>
          <div className="form-field"><label htmlFor="contact-subject">Subject <span>*</span></label><input id="contact-subject" name="subject" placeholder="What are we solving?" value={values.subject} onChange={(e) => change("subject", e.target.value)} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "contact-subject-error" : undefined} required maxLength={120} />{errors.subject ? <small className="field-error" id="contact-subject-error">{errors.subject}</small> : null}</div>
          <div className="form-field"><label htmlFor="contact-message">Message <span>*</span></label><textarea id="contact-message" name="message" placeholder="A little context, your constraints, and what success looks like…" rows={5} value={values.message} onChange={(e) => change("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : "message-counter"} required maxLength={4000} />{errors.message ? <small className="field-error" id="contact-message-error">{errors.message}</small> : <small className="field-hint" id="message-counter">{values.message.length} / 4,000 characters</small>}</div>
          <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => change("website", e.target.value)} /></div>
          <div className="form-submit-row"><button type="submit" className="button button-primary form-submit" disabled={state === "sending"}>{state === "sending" ? <><LoaderCircle size={16} className="spin" /> Sending…</> : <><Send size={15} /> Send message <ArrowUpRight size={15} /></>}</button><span className="required-note">* REQUIRED FIELDS</span></div>
          <p className={`form-feedback state-${state}`} aria-live="polite" role={state === "error" ? "alert" : "status"}>{state === "success" ? <CheckCircle2 size={16} /> : state === "error" ? <span className="feedback-error-dot" /> : null}{feedback}</p>
        </form>
      </div>
    </section>
  );
}
