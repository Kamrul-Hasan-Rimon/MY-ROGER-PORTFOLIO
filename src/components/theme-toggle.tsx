"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("kh-theme", next); } catch { /* Private browsing can block storage; theme still changes for this visit. */ }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle color theme">
      <Sun className="theme-icon-switch-to-light" size={17} aria-hidden="true" />
      <Moon className="theme-icon-switch-to-dark" size={17} aria-hidden="true" />
    </button>
  );
}
