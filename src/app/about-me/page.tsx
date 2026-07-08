import type { Metadata } from "next";
import "../sd-theme.css";
import SDNavbar from "../_components/SDNavbar";
import SDFooter from "../_components/SDFooter";
import SDAbout from "./SDAbout";

export const metadata: Metadata = {
  title: "About Me — Milap Magar",
  description:
    "Milap Magar is a designer & full-stack developer in Kathmandu, Nepal — one person from first sketch to last deploy. The story, the timeline, and the toolbox.",
};

/* Runs before paint: applies the saved theme, or falls back to the device's
   color-scheme preference, so there's no flash of the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem('sd-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function AboutPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className="sd-root min-h-screen w-full overflow-x-clip">
        <SDNavbar />
        <SDAbout />
        <SDFooter />
      </main>
    </>
  );
}
