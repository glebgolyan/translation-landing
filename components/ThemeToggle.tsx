"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Toggles the data-theme attribute set pre-paint by ThemeScript and
 * persists the choice in localStorage. Renders a neutral icon until
 * mounted to avoid any hydration mismatch.
 */
export function ThemeToggle({
  toggleLabel,
  lightLabel,
  darkLabel,
}: {
  toggleLabel: string;
  lightLabel: string;
  darkLabel: string;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setTheme(next);
  }

  const label = theme === "dark" ? lightLabel : theme === "light" ? darkLabel : toggleLabel;

  return (
    <button type="button" className="themeToggle" onClick={toggle} aria-label={label} title={label}>
      {/* Sun (shown in dark mode) */}
      <svg
        className="iconSun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon (shown in light mode) */}
      <svg
        className="iconMoon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
