import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(path.join(root, rel), "utf8");
const required = [
  "package.json", "README.md", ".env.example", "src/app/layout.tsx", "src/app/page.tsx",
  "src/app/globals.css", "src/app/api/contact/route.ts", "src/lib/content.ts",
  "src/components/site-nav.tsx", "src/components/hero.tsx", "src/components/hero-scene.tsx",
  "src/components/ai-lab.tsx", "src/components/projects.tsx", "src/components/contact-section.tsx",
  "public/favicon.svg", "public/manifest.webmanifest",
];
for (const file of required) assert.ok(existsSync(path.join(root, file)), `Missing required file: ${file}`);

const packageJson = JSON.parse(read("package.json"));
assert.ok(packageJson.dependencies.next && packageJson.dependencies.react, "Next.js and React must be dependencies");
assert.ok(packageJson.dependencies["@react-three/fiber"] && packageJson.dependencies.three, "The procedural 3D scene requires Fiber and Three.js");
assert.ok(packageJson.dependencies.motion, "Motion for React dependency is missing");
assert.ok(packageJson.dependencies.zod, "Zod validation dependency is missing");
assert.ok(packageJson.scripts.audit, "The source audit script must be wired into package.json");

const sourceFiles = [];
function walk(directory) {
  for (const entry of readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.posix.join(directory, entry.name);
    if (entry.isDirectory()) walk(relative);
    else if (/\.(ts|tsx)$/.test(entry.name)) sourceFiles.push(relative);
  }
}
walk("src");
for (const file of sourceFiles) {
  const content = read(file);
  for (const match of content.matchAll(/from\s+["'](@\/[^"']+|\.\.?\/[^"']+)["']/g)) {
    const specifier = match[1];
    const target = specifier.startsWith("@/")
      ? path.join(root, "src", specifier.slice(2))
      : path.resolve(root, path.dirname(file), specifier);
    const candidates = [target, `${target}.ts`, `${target}.tsx`, `${target}.js`, `${target}.jsx`, path.join(target, "index.ts"), path.join(target, "index.tsx")];
    assert.ok(candidates.some(existsSync), `Unresolved local import in ${file}: ${specifier}`);
  }
}

const nav = read("src/components/site-nav.tsx");
const sectionFiles = sourceFiles.map(read).join("\n");
const navItemsBlock = nav.match(/const navItems = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
const navIds = [...navItemsBlock.matchAll(/\["[^"]+", "([a-z-]+)"\]/g)].map((match) => match[1]);
for (const id of navIds) assert.ok(new RegExp(`id=["']${id}["']`).test(sectionFiles), `Navigation anchor #${id} has no matching section id`);
for (const id of ["hero", "about", "capabilities", "lab", "projects", "architecture", "journey", "contact"]) {
  assert.ok(new RegExp(`id=["']${id}["']`).test(sectionFiles), `Required section id is missing: ${id}`);
}

const contactApi = read("src/app/api/contact/route.ts");
const contactUi = read("src/components/contact-section.tsx");
assert.ok(contactApi.includes("status: 503"), "Contact API must return an explicit status when email configuration is missing");
assert.ok(contactApi.includes("status: 429"), "Contact API must have a rate-limit response");
assert.ok(contactApi.includes("RESEND_API_KEY") && contactApi.includes("CONTACT_TO") && contactApi.includes("CONTACT_FROM"), "Contact provider configuration is incomplete");
assert.ok(contactUi.includes("if (!response.ok) throw new Error"), "Contact UI must not show success for failed HTTP responses");
assert.ok(contactUi.includes("aria-live=\"polite\""), "Contact feedback must be announced accessibly");

const content = read("src/lib/content.ts");
for (const category of ["Full-Stack", "AI Automation", "Agentic AI", "AI Applications"]) assert.ok(content.includes(`"${category}"`), `Project category missing: ${category}`);
assert.ok(content.includes('status: "illustrative"'), "Project slots must stay labeled illustrative until real evidence is supplied");
assert.ok(read("README.md").includes("Verification status and limitations"), "README must document verification limits");

console.log(`Source audit passed: ${required.length} required files, ${sourceFiles.length} TypeScript/TSX files, local imports resolved, section anchors checked, and contact safeguards present.`);
