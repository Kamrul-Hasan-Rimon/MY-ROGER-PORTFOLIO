"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Network,
  Workflow,
} from "lucide-react";
import { profile, titles } from "@/lib/content";
import Image from "next/image";
import portraitImage from "../../public/assets/my white black photo.png";


function OrbitalFallback() {
  return (
    <div className="hero-orbit-fallback" aria-hidden="true">
      <div className="orbit orbit-one">
        <span />
      </div>
      <div className="orbit orbit-two">
        <span />
      </div>
      <div className="orbit orbit-three">
        <span />
      </div>
      <div className="fallback-core">
        <span>{profile.initials}</span>
        <i />
        <b />
      </div>
      <div className="orbital-dot dot-a" />
      <div className="orbital-dot dot-b" />
      <div className="orbital-dot dot-c" />
    </div>
  );
}

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => <OrbitalFallback />,
  },
);

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => {
      let webgl = false;
      try {
        const canvas = document.createElement("canvas");
        webgl = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl2") ||
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl"))
        );
      } catch {
        webgl = false;
      }
      setShowScene(media.matches && webgl);
    };
    // Defer the initial decision until after paint, keeping effect work non-blocking.
    const frame = window.requestAnimationFrame(update);
    media.addEventListener?.("change", update);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (motionPreference.matches) return;
    const id = window.setInterval(
      () => setTitleIndex((n) => (n + 1) % titles.length),
      3600,
    );
    return () => window.clearInterval(id);
  }, []);

  const headlineWords = profile.headline.split(" ");
  const headlineLead = headlineWords.slice(0, -2).join(" ");
  const headlineAccent = headlineWords.slice(-2).join(" ");

  return (
    <section
      className="hero section-shell"
      id="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow">
          <span className="status-pip" /> SOFTWARE × INTELLIGENCE{" "}
          <span className="eyebrow-line" />
        </div>
        <p className="hero-kicker">
          <span>
            {profile.role} / {new Date().getFullYear()}
          </span>
          {profile.availability ? (
            <span className="hero-availability">
              <i />
              {profile.availability}
            </span>
          ) : null}
        </p>
        <h1 id="hero-title">
          {headlineLead} <span>{headlineAccent}</span>
        </h1>
        <p className="hero-description">{profile.intro}</p>
        <div className="role-line" aria-live="polite" aria-atomic="true">
          <span className="role-prompt">FOCUS //</span>
          <span key={titleIndex} className="role-changing">
            {titles[titleIndex]}
          </span>
          <span className="role-cursor" aria-hidden="true" />
        </div>
        <div className="hero-actions">
          <a href="#projects" className="button button-primary">
            Explore my work <ArrowRight size={16} />
          </a>
          <a href="#contact" className="button button-secondary">
            Let’s build something <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hero-proofline">
          <span>
            <Code2 size={15} /> Product-minded engineering
          </span>
          <span>
            <Workflow size={15} /> Workflow-aware systems
          </span>
          <span>
            <Network size={15} /> Human-guided AI
          </span>
        </div>
      </div>
      <div
        className="hero-visual"
        aria-label="Abstract digital orbital visualization"
      >
        <div className="visual-top-label">
          <span>FIG. 01</span>
          <span>CONNECTED INTELLIGENCE</span>
        </div>
        {showScene ? <HeroScene /> : <OrbitalFallback />}
        <div className="hero-portrait-frame">
          <Image
            src={portraitImage}
            alt="Portrait of Kamrul Hasan"
            fill
            priority
            sizes="(max-width: 900px) 60vw, 38vw"
            className="hero-portrait-image"
          />
        </div>
        <div className="floating-chip chip-top">
          <span className="chip-icon cyan">
            <Network size={15} />
          </span>
          <span>
            <b>AGENT NETWORK</b>
            <small>TOOLS · STATE · CONTROL</small>
          </span>
        </div>
        <div className="floating-chip chip-bottom">
          <span className="chip-icon violet">
            <Workflow size={15} />
          </span>
          <span>
            <b>WORKFLOW ENGINE</b>
            <small>EVENTS → ACTIONS</small>
          </span>
          <span className="chip-signal" />
        </div>
        <div className="visual-coordinates">
          {profile.initials} / 01
          <br />
          <span>LOCAL SIMULATION</span>
        </div>
      </div>
      <a href="#about" className="scroll-cue">
        <span className="scroll-cue-icon">
          <ArrowDown size={13} />
        </span>
        <span>SCROLL TO EXPLORE</span>
        <span className="scroll-cue-rule" />
      </a>
      <div className="hero-index">
        01 — 07 <span /> DIGITAL ENGINEERING
      </div>
    </section>
  );
}
