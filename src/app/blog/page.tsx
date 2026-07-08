import type { Metadata } from "next";
import "../sd-theme.css";
import SDNavbar from "../_components/SDNavbar";
import SDFooter from "../_components/SDFooter";
import SDBlog from "./SDBlog";

export const metadata: Metadata = {
  title: "Blog — Milap Magar",
  description:
    "Notes from the workbench — short, practical writing on design systems, Framer Motion, full-stack builds, and shipping real products from Kathmandu.",
};

/* Runs before paint: applies the saved theme, or falls back to the device's
   color-scheme preference, so there's no flash of the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem('sd-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function BlogPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className="sd-root min-h-screen w-full overflow-x-clip">
        <SDNavbar />
        <SDBlog />
        <SDFooter />
      </main>
    </>
  );
}
