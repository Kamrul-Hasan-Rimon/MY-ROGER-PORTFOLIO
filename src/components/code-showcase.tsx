"use client";

import { useState } from "react";
import { Check, Copy, FileCode2, TerminalSquare } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const snippets = [
  {
    id: "validation", label: "Request validation", file: "lib/validate.ts", lang: "TYPESCRIPT", code: `import { z } from "zod";\n\nconst contactSchema = z.object({\n  name: z.string().trim().min(2).max(80),\n  email: z.email().max(254),\n  subject: z.string().trim().min(3).max(120),\n  message: z.string().trim().min(10).max(4000),\n});\n\nexport function parseContact(input: unknown) {\n  return contactSchema.safeParse(input);\n}`,
    note: "Parse untrusted values at the boundary. Return a typed result and keep client-side validation as a convenience—not a security control.",
  },
  {
    id: "agent", label: "Tool boundary", file: "agent/tool-policy.ts", lang: "TYPESCRIPT", code: `type ToolResult =\n  | { ok: true; data: unknown }\n  | { ok: false; reason: string };\n\nasync function executeApprovedTool(\n  name: string,\n  rawArgs: unknown,\n): Promise<ToolResult> {\n  const tool = allowlistedTools[name];\n  if (!tool) {\n    return { ok: false, reason: "Tool not allowed" };\n  }\n\n  const args = tool.schema.safeParse(rawArgs);\n  if (!args.success) {\n    return { ok: false, reason: "Invalid arguments" };\n  }\n\n  return tool.execute(args.data);\n}`,
    note: "A model proposing a tool call is not authorization. Allow-list capabilities, validate arguments, and enforce permissions in server-side implementations.",
  },
  {
    id: "workflow", label: "Workflow stages", file: "automation/pipeline.ts", lang: "TYPESCRIPT", code: `type Stage<I, O> = (input: I) => Promise<O>;\n\nconst validate: Stage<unknown, Event> =\n  async (raw) => eventSchema.parse(raw);\n\nconst enrich: Stage<Event, EnrichedEvent> =\n  async (event) => enrichEvent(event);\n\nconst persist: Stage<EnrichedEvent, Receipt> =\n  async (event) => saveWithIdempotency(event);\n\n// Orchestrator adds timeouts, retries,\n// tracing, and explicit failure handling.\nconst event = await validate(payload);\nconst enriched = await enrich(event);\nconst receipt = await persist(enriched);`,
    note: "Typed stages clarify the shape of data between steps. A production orchestrator must additionally handle deadlines, retries, idempotency, and observability.",
  },
];

export function CodeShowcaseSection() {
  const [active, setActive] = useState(snippets[0].id);
  const [copied, setCopied] = useState(false);
  const snippet = snippets.find((item) => item.id === active) ?? snippets[0];

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="section-shell content-section code-section" id="architecture" aria-labelledby="architecture-title">
      <SectionHeading index="05" titleId="architecture-title" eyebrow="UNDER THE HOOD" title="Good abstractions earn their keep." description="Short illustrative patterns with a bias toward typed boundaries, least privilege, and explicit failure handling." sideNote="CODE NOTES / 003" />
      <div className="code-workstation">
        <div className="workstation-side"><div className="workstation-heading"><TerminalSquare size={17} /><span>ENGINEERING / NOTEBOOK</span><span className="workstation-live-dot" /></div><h3>Reliable systems are built at the boundaries.</h3><p>The unglamorous parts—validation, permissions, retries, and clear data contracts—often determine whether an intelligent feature survives production.</p><div className="code-tabs" role="group" aria-label="Choose a code example">{snippets.map((item, index) => <button key={item.id} aria-pressed={active === item.id} className={active === item.id ? "active" : ""} onClick={() => { setActive(item.id); setCopied(false); }}><span className="code-tab-number">0{index + 1}</span><FileCode2 size={15} /><span>{item.label}</span><span className="code-tab-arrow">↗</span></button>)}</div><div className="code-note"><span className="code-note-mark">i</span><p>{snippet.note}</p></div></div>
        <div className="editor-window"><div className="editor-titlebar"><div className="window-controls"><i /><i /><i /></div><div className="editor-file"><FileCode2 size={14} /> {snippet.file}</div><button type="button" className="copy-code" onClick={copyCode} aria-label="Copy code example" aria-live="polite">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "COPIED" : "COPY"}</button></div><div className="editor-meta"><span>{snippet.lang}</span><span>ILLUSTRATIVE SNIPPET</span></div><pre className="code-pre" tabIndex={0} aria-label={`${snippet.label} code example`}><code>{snippet.code}</code></pre><div className="editor-status"><span><span className="status-pip" /> EXAMPLE ONLY — NOT A DEPLOYED SYSTEM</span><span>UTF-8 · LF</span><span>KH</span></div></div>
      </div>
    </section>
  );
}
