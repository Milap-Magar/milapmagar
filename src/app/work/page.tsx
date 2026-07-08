import type { Metadata } from "next";
import "../sd-theme.css";
import SDNavbar from "../_components/SDNavbar";
import SDFooter from "../_components/SDFooter";
import SDWorkIndex from "./SDWorkIndex";

export const metadata: Metadata = {
  title: "Work — Milap Magar",
  description:
    "The full index of projects Milap Magar has designed, built, and shipped — SaaS, e-commerce, payments, and cloud storage.",
};

/* Runs before paint: applies the saved theme, or falls back to the device's
   color-scheme preference, so there's no flash of the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem('sd-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function WorkPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className="sd-root min-h-screen w-full overflow-x-clip">
        <SDNavbar />
        <SDWorkIndex />
        <SDFooter />
      </main>
    </>
  );
}
