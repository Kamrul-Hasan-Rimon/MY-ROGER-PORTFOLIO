"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Circle, Play, RotateCcw, ShieldCheck, Workflow, BrainCircuit, Database, Zap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

type Step = { title: string; short: string; role: string; input: string; output: string; technology: string; detail: string };
type Flow = { id: string; label: string; code: string; heading: string; description: string; steps: Step[] };

const flows: Flow[] = [
  {
    id: "automation", label: "Automation pipeline", code: "FLOW_001", heading: "Make every transition observable.",
    description: "An event-driven flow can be a simple, auditable chain: verify the incoming event, transform it, take a permitted action, then record the result.",
    steps: [
      { title: "Trigger", short: "01", role: "Accept a known event", input: "Webhook payload + event signature", output: "Candidate event", technology: "Webhooks · HTTPS", detail: "The system receives a specific event and verifies its source before trusting the body. Unknown event types are rejected early." },
      { title: "Validate", short: "02", role: "Enforce the contract", input: "Candidate event", output: "Typed, normalized data", technology: "Zod · TypeScript", detail: "Schema validation creates a clear boundary between untrusted input and internal logic. Invalid payloads return useful errors without triggering downstream side effects." },
      { title: "Process", short: "03", role: "Apply business rules", input: "Normalized data + policy", output: "Structured decision", technology: "Service layer · AI adapter", detail: "Deterministic rules should stay deterministic. Use a model only when semantic interpretation adds value, and constrain its response to a typed shape." },
      { title: "Act", short: "04", role: "Execute an allowed action", input: "Validated decision", output: "Action result / approval request", technology: "REST APIs · Approval gate", detail: "Actions use scoped credentials and idempotency where possible. High-impact or irreversible steps can pause for human confirmation." },
      { title: "Observe", short: "05", role: "Record and recover", input: "Action result", output: "Audit record + status", technology: "Structured logs · Retry policy", detail: "Record correlation IDs, timing, outcomes, and sanitized errors. Retry transient failures with bounds; do not retry a non-idempotent action blindly." },
    ],
  },
  {
    id: "agent", label: "Agentic workflow", code: "AGENT_002", heading: "Autonomy needs boundaries.",
    description: "A useful agent loop is not an unconstrained chatbot. It is a controlled state machine with allow-listed tools, validation, stop conditions, and clear hand-offs.",
    steps: [
      { title: "Goal", short: "01", role: "Clarify the objective", input: "User request + constraints", output: "Bounded goal", technology: "Input validation", detail: "Normalize the request and capture constraints before any tools run. Ask for clarification or stop when the intent or authorization is unclear." },
      { title: "Plan", short: "02", role: "Choose a short path", input: "Goal + available capabilities", output: "Structured action plan", technology: "LLM structured output", detail: "The model proposes steps in a constrained format. Planning is not permission: each action still passes policy and argument validation." },
      { title: "Select tool", short: "03", role: "Check tool permissions", input: "Proposed tool + arguments", output: "Approved call or denial", technology: "Allow-list · Zod", detail: "Expose only necessary functions, validate every argument, and enforce authorization in the tool implementation—not just in the prompt." },
      { title: "Execute", short: "04", role: "Run with limits", input: "Approved tool call", output: "Bounded tool result", technology: "Timeouts · Budgets", detail: "Apply per-call timeouts, tool limits, and an overall cost or step budget. Treat tool output as untrusted data and never as new instructions." },
      { title: "Validate", short: "05", role: "Check before responding", input: "Tool results + original goal", output: "Answer, retry, or escalation", technology: "Assertions · Human review", detail: "Verify the result against the original goal. Stop when the budget is reached, evidence is insufficient, or human approval is required." },
    ],
  },
  {
    id: "rag", label: "RAG knowledge system", code: "RAG_003", heading: "Ground answers in retrievable evidence.",
    description: "Retrieval-augmented generation connects model output to a maintained knowledge source. Retrieval quality, freshness, and citation handling matter as much as generation.",
    steps: [
      { title: "Ingest", short: "01", role: "Accept trusted sources", input: "Documents + access metadata", output: "Normalized text", technology: "Parsers · Source ACLs", detail: "Extract usable text and preserve source identity, timestamps, and access control. Exclude unsupported file types and sensitive data that should not be indexed." },
      { title: "Chunk", short: "02", role: "Create meaningful passages", input: "Normalized documents", output: "Chunks + source offsets", technology: "Chunking strategy", detail: "Chunk boundaries should preserve context and metadata. Evaluate overlap and size against the document structure and target queries." },
      { title: "Embed", short: "03", role: "Represent content for search", input: "Text chunks", output: "Vector representations", technology: "Embedding model", detail: "Embedding choice, dimensions, and versions must be consistent with the index. Plan re-indexing when the model or document set changes." },
      { title: "Retrieve", short: "04", role: "Find useful evidence", input: "Query + permissions", output: "Ranked passages", technology: "Vector / hybrid search", detail: "Filter by permissions and useful metadata, retrieve candidates, then rank them. Test recall and relevance using representative questions." },
      { title: "Generate", short: "05", role: "Answer with evidence", input: "Question + retrieved context", output: "Grounded answer + citations", technology: "LLM · Source references", detail: "Provide concise context with stable source identifiers. Require evidence for factual claims, and decline or qualify answers when retrieval is weak." },
    ],
  },
];

const stepIcons = [Zap, ShieldCheck, BrainCircuit, Workflow, Check];

export function AILabSection() {
  const [flowId, setFlowId] = useState(flows[0].id);
  const [selectedStep, setSelectedStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [runStep, setRunStep] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flow = flows.find((item) => item.id === flowId) ?? flows[0];
  const step = flow.steps[selectedStep];

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function chooseFlow(id: string) {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false); setRunStep(-1); setFlowId(id); setSelectedStep(0);
  }

  function runDemo() {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(true); setRunStep(0); setSelectedStep(0);
    let next = 0;
    timerRef.current = setInterval(() => {
      next += 1;
      if (next >= flow.steps.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null; setRunning(false); setRunStep(flow.steps.length - 1); setSelectedStep(flow.steps.length - 1);
      } else { setRunStep(next); setSelectedStep(next); }
    }, 850);
  }

  function resetDemo() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null; setRunning(false); setRunStep(-1); setSelectedStep(0);
  }

  return (
    <section className="section-shell content-section lab-section" id="lab" aria-labelledby="lab-title">
      <SectionHeading index="03" titleId="lab-title" eyebrow="THE AI SYSTEMS LAB" title="Explore the logic behind the magic." description="Click a stage to inspect what it receives, what it produces, and the engineering trade-offs that keep a system useful. These are educational simulations—not connected live services." sideNote="SANDBOX / SIMULATION MODE" />
      <div className="lab-window">
        <div className="lab-window-bar"><div className="window-controls"><i /><i /><i /></div><div className="window-title"><span className="window-terminal-icon">⌘</span> kh / systems-lab <span className="path-divider">/</span> {flow.code.toLowerCase()}</div><div className="lab-mode"><span /> INTERACTIVE DEMO</div></div>
        <div className="lab-tabs" role="group" aria-label="Choose an AI system demonstration">
          {flows.map((item) => <button key={item.id} aria-pressed={flowId === item.id} className={flowId === item.id ? "active" : ""} onClick={() => chooseFlow(item.id)}>{item.label}<span>{item.code}</span></button>)}
        </div>
        <div className="lab-body">
          <div className="lab-flow-column">
            <div className="lab-flow-intro"><div className="mini-label">{flow.code} <span> / FLOW EXPLORER</span></div><h3>{flow.heading}</h3><p>{flow.description}</p></div>
            <div className={`flow-steps ${flow.steps.length > 5 ? "many-steps" : ""}`}>
              {flow.steps.map((item, index) => {
                const StepIcon = stepIcons[index] ?? Circle;
                const done = runStep >= index;
                return <div className="flow-step-wrap" key={`${flow.id}-${item.short}`}>
                  <button className={`flow-step${selectedStep === index ? " selected" : ""}${done ? " step-done" : ""}`} onClick={() => { setSelectedStep(index); if (!running) setRunStep(-1); }} aria-pressed={selectedStep === index}>
                    <span className="flow-step-index">{done ? <Check size={14} /> : item.short}</span><span className="flow-step-icon"><StepIcon size={16} /></span><span className="flow-step-copy"><b>{item.title}</b><small>{item.role}</small></span><ArrowRight className="flow-step-arrow" size={15} />
                  </button>
                  {index < flow.steps.length - 1 ? <div className={`flow-connector${done && runStep > index ? " connector-active" : ""}`} aria-hidden="true"><span /></div> : null}
                </div>;
              })}
            </div>
            <div className="lab-controls"><button className="button button-primary run-button" onClick={running ? resetDemo : runDemo}>{running ? <><RotateCcw size={15} /> Reset simulation</> : <><Play size={15} fill="currentColor" /> Run demo sequence</>}</button><span>STEP {String(selectedStep + 1).padStart(2, "0")} / {String(flow.steps.length).padStart(2, "0")}</span></div>
            <p className="simulation-note"><span className="simulation-pulse" /> Simulation only · no model, database, or external API is called.</p>
          </div>
          <aside className="lab-inspector" aria-live="polite" aria-atomic="true">
            <div className="inspector-head"><div><span className="mini-label">STAGE INSPECTOR</span><h4>{step.title}<span className="inspector-number">/{step.short}</span></h4></div><span className="inspector-active"><i /> {running ? "RUNNING" : "READY"}</span></div>
            <p className="inspector-detail">{step.detail}</p>
            <div className="io-block"><div className="io-head"><span>INPUT</span><span className="io-dot input-dot" /></div><code>{step.input}</code></div>
            <div className="io-arrow"><span /></div>
            <div className="io-block output-block"><div className="io-head"><span>OUTPUT</span><span className="io-dot output-dot" /></div><code>{step.output}</code></div>
            <div className="tech-stack-label">RELEVANT TECHNIQUES</div><div className="tech-stack-chip"><Database size={13} /> {step.technology}</div>
            <div className="inspector-footer"><ShieldCheck size={14} /><span>Design for least privilege, observable outcomes, and a graceful stop.</span></div>
          </aside>
        </div>
        <div className="lab-statusbar"><span><span className="status-pip" /> ALL SYSTEMS CONCEPTUALLY NOMINAL</span><span>LOCAL INTERACTION ONLY</span><span>KH / LAB</span></div>
      </div>
    </section>
  );
}
