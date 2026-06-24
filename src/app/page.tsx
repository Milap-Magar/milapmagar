import type { Metadata } from "next";
import "./sd-theme.css";
import SDNavbar from "./_components/SDNavbar";
import SDHero from "./_components/SDHero";
import SDProjectCarousel from "./_components/SDProjectCarousel";
import SDServices from "./_components/SDServices";
import SDSelectedWork from "./_components/SDSelectedWork";
import SDProcess from "./_components/SDProcess";
import SDTools from "./_components/SDTools";
import SDFooter from "./_components/SDFooter";

export const metadata: Metadata = {
  title: "Milap Magar — Designer & Developer",
  description:
    "Designer & developer helping founders ship products that feel right. Product design, design systems, and frontend engineering.",
};

/* Runs before paint: applies the saved theme, or falls back to the device's
   color-scheme preference, so there's no flash of the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem('sd-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className="sd-root min-h-screen w-full overflow-x-clip">
        <SDNavbar />
        <SDHero />
        <SDProjectCarousel />
        <SDServices />
        <SDSelectedWork />
        <SDProcess />
        <SDTools />
        <SDFooter />
      </main>
    </>
  );
}
