"use client";

import { useEffect, useRef } from "react";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../hero.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Social links ─────────────────────────────────────────────────────────────
const socialLinks = [
  { icon: Github, href: "https://github.com/Milap-Magar", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/milap-magar-21427a229/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/milaapeeey/",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
];

// ─── WebGL ambient particle field ─────────────────────────────────────────────
// 260 amber points that drift with sine/cosine noise and repel from the cursor.
// Written in raw GLSL — no canvas2D, no library.
function useParticleField(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return; // graceful fallback — CSS background still looks great

    // Keep canvas resolution in sync with device pixel ratio
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Vertex shader ─────────────────────────────────────────────────────────
    // Each particle drifts via sin/cos and is pushed away from the mouse.
    const vert = `
      attribute vec2  a_pos;
      attribute float a_size;
      attribute float a_alpha;
      uniform   vec2  u_mouse;
      uniform   float u_time;
      varying   float v_alpha;

      void main() {
        vec2 pos = a_pos;

        // Organic drift
        pos.x += sin(u_time * 0.4 + a_pos.y * 3.0) * 0.008;
        pos.y += cos(u_time * 0.3 + a_pos.x * 2.5) * 0.006;

        // Cursor repulsion
        vec2  diff     = pos - u_mouse;
        float dist     = length(diff);
        float strength = smoothstep(0.25, 0.0, dist) * 0.12;
        pos += normalize(diff + 0.001) * strength;

        gl_Position  = vec4(pos, 0.0, 1.0);
        gl_PointSize = a_size;
        v_alpha      = a_alpha;
      }
    `;

    // ── Fragment shader ───────────────────────────────────────────────────────
    // Soft circular points tinted amber (#f59e0b → 0.96, 0.62, 0.04).
    const frag = `
      precision mediump float;
      varying float v_alpha;

      void main() {
        float d      = length(gl_PointCoord - vec2(0.5));
        float circle = 1.0 - smoothstep(0.35, 0.5, d);
        gl_FragColor = vec4(0.96, 0.62, 0.04, v_alpha * circle);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // ── Particle data ─────────────────────────────────────────────────────────
    const N = 260;
    const pos = new Float32Array(N * 2);
    const sizes = new Float32Array(N);
    const alphas = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      pos[i * 2] = Math.random() * 2 - 1; // x NDC: -1 → 1
      pos[i * 2 + 1] = Math.random() * 2 - 1; // y NDC: -1 → 1
      sizes[i] = Math.random() * 2.2 + 0.8;
      alphas[i] = Math.random() * 0.45 + 0.08;
    }

    const upload = (data: Float32Array) => {
      const b = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return b;
    };

    const posBuf = upload(pos);
    const sizeBuf = upload(sizes);
    const alphaBuf = upload(alphas);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const aSize = gl.getAttribLocation(prog, "a_size");
    const aAlpha = gl.getAttribLocation(prog, "a_alpha");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime = gl.getUniformLocation(prog, "u_time");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Track mouse in NDC space
    let mx = 0,
      my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);

    // Render loop
    let raf: number;
    const t0 = performance.now();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const t = (performance.now() - t0) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uTime, t);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuf);
      gl.enableVertexAttribArray(aAlpha);
      gl.vertexAttribPointer(aAlpha, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, N);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useParticleField(canvasRef);

  // ── GSAP master entry timeline ────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Shutter open — full-black overlay fades out, revealing the scene
      tl.fromTo(
        shutterRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 1.1, ease: "power2.inOut" },
        0,
      );

      // 2. Amber accent line slides in from left
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "expo.inOut" },
        0.35,
      );

      // 3. Tagline fades up
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.7,
      );

      // 4. Name — each word slides up through its overflow-hidden mask
      const words = nameRef.current?.querySelectorAll(".word");
      if (words?.length) {
        tl.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.09 },
          0.82,
        );
      }

      // 5. Role chips stagger in from left
      const chips = roleRef.current?.querySelectorAll(".role-chip");
      if (chips?.length) {
        tl.fromTo(
          chips,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          1.1,
        );
      }

      // 6. Social icons stagger up
      const icons = iconsRef.current?.querySelectorAll("a");
      if (icons?.length) {
        tl.fromTo(
          icons,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
          },
          1.25,
        );
      }

      // 7. CTA buttons fade up
      tl.fromTo(
        [cta1Ref.current, cta2Ref.current],
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        1.38,
      );

      // 8. Scroll hint fades in
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        1.6,
      );

      // 9. Years counter counts up: 0 → 4
      const obj = { val: 0 };
      tl.to(
        obj,
        {
          val: 4,
          duration: 1.4,
          ease: "power2.out",
          onUpdate() {
            if (counterRef.current)
              counterRef.current.textContent = String(
                Math.round(obj.val),
              ).padStart(2, "0");
          },
        },
        1.0,
      );

      // Scroll hint breathes up/down continuously after entry
      gsap.to(scrollRef.current, {
        y: 7,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });
    }, sectionRef);

    return () => ctx.revert(); // clean up all animations on unmount
  }, []);

  // ── Mouse parallax — desktop only ────────────────────────────────────────
  // Different layers move at different rates to create depth.
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // Name moves opposite — feels like it's floating in front
      gsap.to(nameRef.current, {
        x: nx * -8,
        y: ny * -4,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
      // Tagline & chips drift slightly with the cursor
      gsap.to(taglineRef.current, {
        x: nx * 5,
        y: ny * 3,
        duration: 1.4,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(roleRef.current, {
        x: nx * 10,
        y: ny * 5,
        duration: 1.1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to([nameRef.current, taglineRef.current, roleRef.current], {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "expo.out",
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="hero-grain hero-grid relative w-full h-screen min-h-[700px] overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* ── WebGL particle canvas ─────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      />

      {/* ── Shutter overlay — full ink, fades out on entry ────────────────── */}
      <div
        ref={shutterRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: "var(--ink)" }}
        aria-hidden="true"
      />

      {/* ── Giant editorial watermark ─────────────────────────────────────── */}
      <div
        className="hero-watermark absolute bottom-[-2%] right-[-1%] z-0 select-none"
        aria-hidden="true"
      >
        dev
      </div>

      {/* ── Top amber accent line ─────────────────────────────────────────── */}
      <div
        ref={lineRef}
        className="accent-line absolute top-0 left-0 right-0 z-10"
      />

      {/* ── Main layout ──────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col px-6 sm:px-12 lg:px-20 py-10 justify-center gap-12">
        {/* Headline block */}
        <div className="flex flex-col gap-6 max-w-5xl items-start">
          {/* Pre-label */}
          <p
            ref={taglineRef}
            className="hero-mono text-xs opacity-0"
            style={{ color: "var(--amber)" }}
          >
            ↳ Full-Stack developer (Frontend-Heavy) · kathmandu, np
          </p>

          {/* Name — Playfair Display, each word clipped then slides up */}
          <h1 ref={nameRef} className="hero-name" aria-label="Hi. I'm Milap">
            <span className="word-mask">
              <span className="word opacity-0">Hi.</span>
            </span>{" "}
            <span className="word-mask">
              <span className="word opacity-0">I&apos;m</span>
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="word-mask">
              <span className="word italic-word opacity-0">Milap.</span>
            </span>
          </h1>

          {/* Tech / role chips */}
          <div ref={roleRef} className="flex flex-wrap items-center gap-2">
            <span className="role-chip active">React / Next.js</span>
            <span className="role-chip">Node.js</span>
            <span className="role-chip">TypeScript</span>
            <span className="role-chip">PostgreSQL</span>
            <span className="role-chip">System Design</span>
          </div>
        </div>

        {/* Bottom bar: socials + CTAs (left) | stats (right) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Social icons */}
            <div ref={iconsRef} className="flex items-center gap-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hero-social-icon opacity-0"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3">
              <a
                ref={cta1Ref}
                href="#contact"
                className="cta-primary opacity-0"
              >
                Hire me
              </a>
              <a
                ref={cta2Ref}
                href="#projects"
                className="cta-ghost   opacity-0"
              >
                View work
              </a>
            </div>
          </div>

          {/* Right column — animated stats */}
          <div className="flex items-end gap-8 sm:mb-1">
            {/* Years counter (GSAP animates 0 → 4) */}
            <div className="text-right">
              <div className="flex items-end gap-1 justify-end">
                <span ref={counterRef} className="hero-stat-number">
                  02
                </span>
                <span
                  className="hero-mono text-sm mb-1"
                  style={{ color: "var(--amber)" }}
                >
                  +
                </span>
              </div>
              <p
                className="hero-mono text-[0.62rem] mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                years building
              </p>
            </div>

            {/* Projects shipped (static) */}
            <div className="text-right">
              <div className="flex items-end gap-1 justify-end">
                <span className="hero-stat-number">4</span>
                <span
                  className="hero-mono text-sm mb-1"
                  style={{ color: "var(--amber)" }}
                >
                  +
                </span>
              </div>
              <p
                className="hero-mono text-[0.62rem] mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                projects shipped
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2 opacity-0"
        aria-hidden="true"
      >
        <span
          className="hero-mono text-[0.6rem] tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          scroll
        </span>
        <div className="hero-scroll-line" />
      </div>

      {/* ── Bottom amber accent line ──────────────────────────────────────── */}
      <div
        className="accent-line absolute bottom-0 left-0 right-0 z-10"
        style={{ opacity: 0.35 }}
      />
    </section>
  );
}
