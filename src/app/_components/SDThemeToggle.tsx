"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

/** Reads the current theme set on <html> (by the anti-FOUC script), lets the
 *  user flip it, and persists the choice to localStorage. */
export default function SDThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      setTheme(attr);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sd-theme", next);
    } catch {
      /* ignore storage errors (private mode) */
    }
  };

  return (
    <button
      onClick={toggle}
      type="button"
      className="sd-icon-btn"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
    >
      {/* render the icon for the action; avoid hydration mismatch until mounted */}
      {mounted && theme === "dark" ? (
        <Sun className="w-4 h-4" strokeWidth={1.6} />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={1.6} />
      )}
    </button>
  );
}
