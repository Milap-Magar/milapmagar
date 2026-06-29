"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Instagram, Facebook } from "lucide-react";

// Each letter = { w, d } pulled inline from public/svg/*.svg (all share viewBox height 88)
const LETTER_GAP = 14;
const LETTER_HEIGHT = 88;
const LETTERS = [
  {
    w: 101,
    d: "M0 0H29.4886L49.7727 49.4318H50.7955L71.0795 0H100.568V87.2727H77.3864V36.8182H76.7045L57.2727 86.5909H43.2955L23.8636 36.4773H23.1818V87.2727H0V0Z",
  },
  { w: 24, d: "M23.6932 -1.90735e-06V87.2727H0V-1.90735e-06H23.6932Z" },
  {
    w: 59,
    d: "M0 87.2727V-1.90735e-06H23.6932V68.1818H58.9773V87.2727H0Z",
  },
  {
    w: 90,
    d: "M25.5682 87.2727H8.40425e-06L28.8068 -1.90735e-06H61.1932L90 87.2727H64.4318L45.3409 24.0341H44.6591L25.5682 87.2727ZM20.7955 52.8409H68.8636V70.5682H20.7955V52.8409Z",
  },
  {
    w: 71,
    d: "M0 87.2727V-1.90735e-06H37.6705C44.1477 -1.90735e-06 49.8153 1.27841 54.6733 3.83523C59.5313 6.39204 63.3097 9.98579 66.0085 14.6165C68.7074 19.2472 70.0568 24.6591 70.0568 30.8523C70.0568 37.1023 68.6648 42.5142 65.8807 47.0881C63.125 51.6619 59.2472 55.1847 54.2472 57.6562C49.2756 60.1278 43.4659 61.3636 36.8182 61.3636H14.3182V42.9545H32.0455C34.8295 42.9545 37.2017 42.4716 39.1619 41.5057C41.1506 40.5114 42.6705 39.1051 43.7216 37.2869C44.8011 35.4687 45.3409 33.3239 45.3409 30.8523C45.3409 28.3523 44.8011 26.2216 43.7216 24.4602C42.6705 22.6705 41.1506 21.3068 39.1619 20.3693C37.2017 19.4034 34.8295 18.9205 32.0455 18.9205H23.6932V87.2727H0Z",
  },
];

const socials = [
  { Icon: Github, href: "https://github.com/Milap-Magar", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/milap-magar-21427a229/",
    label: "LinkedIn",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/milaapeeey/",
    label: "Instagram",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
];

// viewBox dimensions for the wordmark (height is fixed; width is summed from the letters)
const VB_WIDTH =
  LETTERS.reduce((acc, l) => acc + l.w, 0) + LETTER_GAP * (LETTERS.length - 1);
const SPOT_RADIUS = 150; // size of the white glow circle, in SVG user-space units

export default function SDFooter() {
  const svgRef = useRef<SVGSVGElement>(null);
  // spotlight position in SVG user-space coords; off-screen until the mouse enters
  const [spot, setSpot] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  // Convert a mouse event's screen coords -> SVG user-space coords (viewBox units).
  // getScreenCTM() handles the preserveAspectRatio scaling for us, so cx/cy land
  // exactly under the cursor regardless of how the SVG is stretched.
  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const loc = pt.matrixTransform(ctm.inverse());
    setSpot({ x: loc.x, y: loc.y });
  };

  return (
    <footer
      id="contact"
      className="border-t border-(--line) mt-10"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col items-start gap-8"
        >
          <span className="sd-eyebrow">Let&apos;s talk</span>
          <h2
            className="sd-serif font-black text-(--white) max-w-3xl"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.02 }}
          >
            Ready to build something{" "}
            <span className="italic sd-amber">great</span>?
          </h2>

          <a
            href="mailto:info@milapmagar.com.np"
            className="sd-serif text-xl sm:text-3xl text-(--muted2] hover:text-(--amber) transition-colors underline underline-offset-8 decoration-(--faint) hover:decoration-(--amber) inline-flex items-center gap-2"
          >
            info@milapmagar.com.np
            <ArrowUpRight className="w-6 h-6" strokeWidth={1.5} />
          </a>

          <div className="flex items-center gap-5 mt-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-(--muted) hover:text-(--amber) transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 pt-8 border-t border-(--line) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="sd-mono text-xs text-(--muted)">
            © {new Date().getFullYear()} Milap Magar. All rights reserved.
          </span>
          <span className="sd-mono text-xs text-(--muted)">
            Designed &amp; coded by Milx
          </span>
        </div>
      </div>

      {/* Giant wordmark — dark by default; a white radial spotlight follows the cursor */}
      <div className="relative w-full overflow-hidden">
        <motion.svg
          ref={svgRef}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="sd-bigname block w-full h-auto translate-y-[14%]"
          aria-hidden="true"
          role="img"
          viewBox={`0 0 ${VB_WIDTH} ${LETTER_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMove}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <defs>
            {/* Green radial glow centered on the cursor (cx/cy track the mouse).
                userSpaceOnUse = cx/cy/r are in viewBox units, not 0..1 ratios. */}
            <radialGradient
              id="sd-spot"
              gradientUnits="userSpaceOnUse"
              cx={spot.x}
              cy={spot.y}
              r={SPOT_RADIUS}
            >
              <stop offset="0%" stopColor="#35BC81" stopOpacity="1" />
              <stop offset="45%" stopColor="#35BC81" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#35BC81" stopOpacity="0" />
            </radialGradient>

            {/* Soft green bloom so the revealed area casts a colored shadow */}
            <filter id="sd-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* The letter shapes, used as a mask so the single spotlight rect
                only shows through where the letters are. */}
            <mask id="sd-letters-mask">
              {(() => {
                let x = 0;
                return LETTERS.map((letter, i) => {
                  const tx = x;
                  x += letter.w + LETTER_GAP;
                  return (
                    <path
                      key={i}
                      d={letter.d}
                      fill="#fff"
                      transform={`translate(${tx} 0)`}
                    />
                  );
                });
              })()}
            </mask>
          </defs>

          {/* Base layer: dark letters, always visible */}
          {(() => {
            let x = 0;
            return LETTERS.map((letter, i) => {
              const tx = x;
              x += letter.w + LETTER_GAP;
              return (
                <path
                  key={i}
                  d={letter.d}
                  fill="var(--line)"
                  transform={`translate(${tx} 0)`}
                />
              );
            });
          })()}

          {/* ONE spotlight rect over the whole wordmark, masked to the letters.
              No per-letter transform, so the green circle stays continuous and
              only lights up wherever the cursor is. */}
          <rect
            x={0}
            y={0}
            width={VB_WIDTH}
            height={LETTER_HEIGHT}
            fill="url(#sd-spot)"
            mask="url(#sd-letters-mask)"
            filter="url(#sd-glow)"
            style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
        </motion.svg>
      </div>
    </footer>
  );
}
