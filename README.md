# Kamrul Hasan — Full-Stack & AI Engineering Portfolio

A dark-first, responsive Next.js App Router portfolio with a light theme, procedural React Three Fiber hero scene, CSS fallback, interactive AI system walkthroughs, editable case-study slots, code examples, and a server-validated contact endpoint.

## Architecture

- **App:** Next.js App Router + React + TypeScript
- **Styling:** Tailwind CSS v4 (PostCSS integration) plus semantic component CSS and reusable design tokens in `src/app/globals.css`
- **Motion:** Motion for React for viewport reveals, plus CSS micro-interactions; reduced-motion preferences are respected
- **3D:** Three.js + React Three Fiber + Drei, loaded client-side only on wider screens when reduced motion is not requested; orbital CSS fallback is always available
- **Validation:** Zod at the contact UI and server boundary
- **Email:** server-side Resend REST API adapter; delivery stays disabled until required environment variables are present
- **Content:** typed profile, skills, project slots, learning details, and process steps in `src/lib/content.ts`
- **SEO:** metadata, Open Graph/Twitter metadata, robots, sitemap, favicon, web manifest, and minimal Person JSON-LD

Tailwind CSS v4 is configured for utility-level layout helpers, while the bespoke visual system uses semantic component classes and CSS custom properties so brand colors, contrast, and responsive behavior stay centralized rather than scattered across long utility strings. The site uses system-font stacks to avoid render-blocking remote font dependencies.

## Requirements

- Node.js **20.9 or newer**
- npm (or another compatible Node package manager)
- A network connection to install packages

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

> In the build environment used to assemble this source, the npm registry returned a DNS `EAI_AGAIN` error. Dependencies could not be installed here, so a production build and framework-aware lint/type checks could not be executed in that environment. Install dependencies in a network-enabled environment before treating the project as verified.

## Scripts

```bash
npm run dev       # Local Next.js development server
npm run build     # Production build
npm run start      # Serve the production build
npm run lint       # ESLint (Next.js recommended configurations)
npm run typecheck  # TypeScript check
```

## Personalization checklist (do before public launch)

1. Open `src/lib/content.ts` and verify the name, role labels, introduction, biography, skills, and every claim.
2. Add verified `github`, `linkedin`, and `email` values to `profile`. Keep unavailable links blank; the UI shows a clear pending state.
3. Add the real résumé at `public/resume.pdf` and set `profile.resumePath` to `/resume.pdf`. The Resume action intentionally remains hidden while the file is absent.
4. Replace all four `status: "illustrative"` portfolio slots with demonstrated projects and set status/eyebrow/case-study details appropriately. Supply project URLs only after verifying them, and use screenshots you own or are licensed to publish. Current project cards are intentionally marked illustrative.
5. Verify the Programming Hero credential and the Comilla Modern High School SSC entry. Add dates, results, and credential URLs only when confirmed.
6. Set `NEXT_PUBLIC_SITE_URL` to the actual canonical production origin, for example `https://portfolio.yourdomain.com`. Do not leave the example origin for launch.
7. Review the SEO title and description for the final public positioning.
8. Add a real profile portrait only if desired and approved; the current visual identity uses an abstract KH monogram instead.

## Contact email setup

The contact form validates client-side for usability and repeats validation in `src/app/api/contact/route.ts`. The API uses a honeypot, a small best-effort per-process throttle, HTML escaping, a timeout, and a server-side Resend API adapter. It reports errors truthfully and never displays success unless the provider returns a successful response.

Set these **server-only** variables in `.env.local` for local testing, and in your host's environment settings for production:

```dotenv
RESEND_API_KEY=re_...
CONTACT_TO=your-inbox@example.com
CONTACT_FROM=Portfolio Contact <verified-sender@yourdomain.com>
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

- Verify the sender/domain with Resend before sending production email.
- Never prefix provider secrets with `NEXT_PUBLIC_`.
- With email settings missing, the API returns HTTP `503` and the form explains that delivery is not configured.
- The in-memory throttling map is best-effort only and is not shared across serverless instances. Before receiving public traffic, add a shared rate-limit store or managed edge protection, and test spam/rate-limit behavior on the actual host.
- A production contact form should also have a privacy notice appropriate for the jurisdiction and services in use.

## Content and design tokens

- `src/lib/content.ts`: profile, job title sequence, skills, project slots, education, and engineering process.
- `src/app/globals.css`: color tokens (`--bg`, `--fg`, `--surface`, `--accent`, `--accent-2`, `--border`, `--muted`, `--focus`, `--glow`, `--shadow`), spacing/layout, typography, light theme, and responsive rules.
- `src/components/hero-scene.tsx`: procedural 3D scene.
- `src/components/hero.tsx`: headline, rotating focus, CTA, and CSS orbital fallback.
- `src/components/ai-lab.tsx`: three user-driven educational flow simulations, with no external model or workflow calls.
- `src/components/projects.tsx`: category filters and accessible native-dialog project details.
- `src/components/code-showcase.tsx`: selectable code notes and copy action.
- `src/components/contact-section.tsx` + `src/app/api/contact/route.ts`: accessible UI and server endpoint.

## Deployment on Vercel

1. Commit the project to a Git repository and import it into Vercel.
2. Use a current Node.js runtime (20.9+; Node 22 recommended).
3. Set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM` in the project's environment settings. Do not add secrets to Git.
4. Configure the real domain and confirm the email sender is verified.
5. Deploy, then test the site from a clean browser on mobile and desktop. Check the theme toggle, navigation anchors, project filters/dialogs, code copying, and the form's both-success-and-failure paths.
6. Run Lighthouse against the real deployed URL, validate metadata/robots/sitemap, and review any reported accessibility or performance issues. Scores are not claimed until measured.

Vercel can deploy this application without MongoDB: the portfolio does not require a database. Add persistent storage only if a real, justified feature needs it.

## Verification status and limitations

- `npm run audit` passed: required files are present, local imports resolve, navigation anchors match sections, project placeholders remain marked, and contact safeguards are present.
- The TypeScript compiler parser found **0 syntax errors** across 19 TS/TSX source files; the PostCSS parser found **0 CSS syntax errors** in `src/app/globals.css`. These parser checks do not replace a full TypeScript typecheck.
- Dependency installation was attempted but the npm registry could not be resolved in this environment (`EAI_AGAIN`).
- **Not verified in this environment:** `next build`, ESLint, full TypeScript typechecking against installed Next/React package types, browser automation, screen-reader testing, responsive screenshots, Lighthouse/Core Web Vitals, and public deployment.
- The 3D hero is an original procedural composition; the CSS orbital fallback remains for smaller screens and reduced-motion preferences.
- AI Systems Lab content is explicitly simulated for explanation. It does not call an LLM, vector database, or automation provider.
- Project tiles are illustrative editorial slots, not claims of completed projects.
- Resume, public email, GitHub/LinkedIn links, availability, project evidence and some education metadata are intentionally blank or marked pending until supplied.

## License and ownership

The site source is supplied for personal portfolio use. Replace all illustrative content with accurate material before publication and ensure all third-party marks, project screenshots, and credentials are used with permission.
