export type ProjectCategory = "Full-Stack" | "AI Automation" | "Agentic AI" | "AI Applications";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  status: "illustrative" | "published";
  liveUrl?: string;
  repoUrl?: string;
  accent: "cyan" | "violet" | "blue";
};

export const profile = {
  name: "Kamrul Hasan",
  initials: "KH",
  role: "Full-Stack Developer · AI Automation · Agentic AI",
  footerStatement: "Engineering practical software and thoughtful AI systems—one clear decision at a time.",
  headline: "Engineering the Future of Intelligent Software.",
  intro: "I build full-stack applications, AI-powered automations, and agentic systems that transform complex ideas into practical digital experiences.",
  biography: "I’m interested in the space where thoughtful software engineering meets useful artificial intelligence. My focus is on understanding a problem, shaping a maintainable system, and connecting interfaces, APIs, data, and model-powered workflows into one coherent product.",
  email: "khrimon377@gmail.com", // Add a verified public contact email before publishing.
  github: "https://github.com/Kamrul-Hasan-Rimon", // Add a verified profile URL before publishing.
  linkedin: "https://www.linkedin.com/in/kamrul-hasan-aa77812b5/", // Add a verified profile URL before publishing.
  resumePath: "https://drive.google.com/file/d/12DBFmub1sXmJmugjUxTTnBon9-PryQn9/view?usp=sharing", // Set to /resume.pdf only after adding the real PDF to /public.
  availability: "Available for select freelance projects", // e.g. "Available for select freelance projects" — only when true.
};

export const titles = [
  "Full-Stack Developer",
  "MERN Stack Engineer",
  "AI Automation Engineer",
  "Agentic AI Engineer",
];

export const skills = [
  {
    number: "01",
    title: "Full-Stack Engineering",
    tag: "PRODUCT · PLATFORM",
    description: "From responsive interfaces to reliable APIs and persistence layers, with attention to the boundaries that keep a product maintainable.",
    items: ["React & component architecture", "Node.js & Express", "REST API design", "MongoDB & data modeling", "Authentication patterns", "Validation & error handling"],
    icon: "code",
  },
  {
    number: "02",
    title: "AI Automation",
    tag: "EVENT · ORCHESTRATION",
    description: "Connect services and move data through explicit, observable steps—with recovery paths and human review where it matters.",
    items: ["API integrations & webhooks", "Event-driven triggers", "Multi-step workflows", "Structured data outputs", "Retries & failure recovery", "Human approval checkpoints"],
    icon: "workflow",
  },
  {
    number: "03",
    title: "Agentic AI Systems",
    tag: "TOOLS · CONTROL",
    description: "Design constrained agent loops that plan tasks, choose tools, validate outcomes, and operate within clear boundaries.",
    items: ["Tool-calling interfaces", "State & context management", "Task decomposition", "RAG & knowledge retrieval", "Evaluation & tracing", "Safety and cost controls"],
    icon: "brain",
  },
  {
    number: "04",
    title: "Experience Engineering",
    tag: "INTERFACE · QUALITY",
    description: "Make technically complex products feel clear, fast, inclusive, and intentional across screen sizes and input types.",
    items: ["Responsive UI systems", "Accessible interaction", "Reusable components", "Motion & visualization", "Performance tuning", "Cross-device testing"],
    icon: "layers",
  },
] as const;

// These are clearly labeled concept/demo slots, not claims of shipped client work.
export const projects: Project[] = [
  {
    id: "mern-platform", number: "01", title: "Full-stack product platform", category: "Full-Stack",
    eyebrow: "CASE STUDY SLOT · ILLUSTRATIVE", description: "A structured home for a real MERN application case study, from user problem through deployment.",
    problem: "Replace this section with a specific, evidenced user problem and intended audience.",
    solution: "Describe the shipped product, the main user flow, and what changed because of the implementation.",
    architecture: ["React interface", "Express API", "MongoDB data model", "Authentication and validation"],
    stack: ["React", "Node.js", "Express", "MongoDB"], status: "illustrative", accent: "cyan",
  },
  {
    id: "workflow-automation", number: "02", title: "Event-driven automation", category: "AI Automation",
    eyebrow: "CONCEPT DEMO · NOT A LIVE INTEGRATION", description: "A workflow concept that makes triggers, validation, model processing, and downstream actions observable.",
    problem: "Use this slot to document a repetitive process that was actually automated and the constraints it had.",
    solution: "Explain the event source, integrations, retry policy, approval steps, and verified outcome.",
    architecture: ["Trigger & schema check", "Workflow orchestration", "External API adapter", "Retries and audit events"],
    stack: ["Webhooks", "TypeScript", "REST APIs", "Workflow orchestration"], status: "illustrative", accent: "violet",
  },
  {
    id: "tool-using-agent", number: "03", title: "Tool-using AI assistant", category: "Agentic AI",
    eyebrow: "ARCHITECTURE STUDY · ILLUSTRATIVE", description: "An architecture slot for a bounded assistant that plans, calls approved tools, validates outputs, and asks for review when needed.",
    problem: "Identify the user's task and which steps genuinely benefit from controlled model-assisted reasoning.",
    solution: "Document tool permissions, state transitions, failure cases, evaluation criteria, and human hand-offs.",
    architecture: ["Goal decomposition", "Allow-listed tools", "Stateful execution loop", "Result validation"],
    stack: ["LLM APIs", "Tool calling", "Zod", "Tracing"], status: "illustrative", accent: "blue",
  },
  {
    id: "rag-knowledge", number: "04", title: "Retrieval-augmented knowledge", category: "AI Applications",
    eyebrow: "SYSTEM DESIGN SLOT · ILLUSTRATIVE", description: "A place to present a grounded Q&A system, including its ingestion, retrieval, and source-attribution strategy.",
    problem: "Define the knowledge source, freshness needs, and what a correct answer must cite or decline to answer.",
    solution: "Describe chunking, embeddings, retrieval evaluation, context assembly, and the limits of the prototype.",
    architecture: ["Document ingestion", "Chunking & embeddings", "Relevant passage retrieval", "Grounded response"],
    stack: ["Embeddings", "Vector search", "RAG", "LLM APIs"], status: "illustrative", accent: "cyan",
  },
];

export const education = [
  { title: "Programming Hero", subtitle: "MERN Stack certification", detail: "Certification listed by profile owner; add credential URL and date when verified.", status: "DETAILS TO VERIFY" },
  { title: "Comilla Modern High School", subtitle: "Secondary School Certificate (SSC)", detail: "2024 GPA - 5.00", status: "Group: science" },
  { title: "Comilla Govt. College", subtitle: "Higher Secondary School Certificate (HSC)", detail: "2026 GPA - 5.00", status: "Group: commerce" },
];

export const processSteps = [
  { n: "01", title: "Discover", text: "Understand the user, constraints, success criteria, and what should not be built." },
  { n: "02", title: "Architect", text: "Choose clear boundaries for UI, APIs, data, integrations, and failure handling." },
  { n: "03", title: "Build", text: "Ship small, typed, reusable pieces with a bias toward clarity over cleverness." },
  { n: "04", title: "Integrate", text: "Connect services through explicit contracts, timeouts, and safe credential handling." },
  { n: "05", title: "Test", text: "Exercise edge cases, validation, accessibility, and unhappy paths—not only the demo." },
  { n: "06", title: "Deploy", text: "Configure runtime settings, protect secrets, and verify the production build." },
  { n: "07", title: "Improve", text: "Use evidence, logs, and feedback to reduce complexity and strengthen reliability." },
];

export const categories = ["All Projects", "Full-Stack", "AI Automation", "Agentic AI", "AI Applications"] as const;
