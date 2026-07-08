"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { BOOK_CALL_EVENT } from "./bookCall";

const EASE = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl bg-[var(--ink)] border border-[var(--faint)] px-4 py-3 " +
  "text-sm text-[var(--white)] placeholder:text-[var(--muted)] outline-none " +
  "transition-colors focus:border-[var(--amber)]";

export default function SDBookCallDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  // Portal target only exists client-side; render nothing during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    // keep the success screen from flashing back to the form while closing
    setTimeout(() => setStatus("idle"), 300);
  }, []);

  // open on the global event, close on Escape, lock body scroll while open
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(BOOK_CALL_EVENT, onOpen);
    return () => window.removeEventListener(BOOK_CALL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => nameRef.current?.focus(), 250);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, close]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again.");
    }
  };

  if (!mounted) return null;

  /* Portaled to <body>: the navbar's scrolled state applies a backdrop-filter,
     which makes the header the containing block for fixed descendants — the
     dialog would render inside the 64px nav bar. The body has no such
     ancestor, so `fixed inset-0` means the viewport again. Outside .sd-root
     the theme tokens don't inherit, so re-apply the class here and cancel its
     opaque background inline. */
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "transparent" }}
          className="sd-root fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Book a free call"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full sm:max-w-lg mx-0 sm:mx-6 rounded-t-3xl sm:rounded-3xl border border-[var(--line)] bg-[var(--ink2)] p-7 sm:p-9 shadow-2xl"
          >
            {/* soft green wash in the corner, echoing the brand panel motif */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(62,207,142,0.18), transparent 70%)",
              }}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="sd-icon-btn absolute top-5 right-5 !w-9 !h-9"
            >
              <X className="w-4 h-4" strokeWidth={1.8} />
            </button>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col items-start gap-4 py-6"
              >
                <span className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--accent-soft)] text-[var(--amber)]">
                  <Check className="w-6 h-6" strokeWidth={2} />
                </span>
                <h2 className="sd-serif text-3xl font-bold text-[var(--white)]">
                  Request sent.
                </h2>
                <p className="text-sm text-[var(--muted2)] leading-relaxed max-w-sm">
                  Thanks for reaching out — I read every message myself and
                  I&apos;ll get back to you within 24 hours to set up the call.
                </p>
                <button type="button" onClick={close} className="sd-btn-ghost mt-2">
                  Done
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col gap-2 mb-7">
                  <span className="sd-eyebrow">Book a free call</span>
                  <h2 className="sd-serif text-3xl font-bold text-[var(--white)] leading-tight">
                    Let&apos;s talk about your{" "}
                    <span className="italic sd-amber">product</span>.
                  </h2>
                  <p className="text-sm text-[var(--muted2)] leading-relaxed">
                    Tell me a little about what you&apos;re building — I&apos;ll
                    reply within 24 hours with times for a free 30-minute call.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* honeypot — hidden from people, irresistible to bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <label className="flex flex-col gap-1.5">
                    <span className="sd-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      Your name
                    </span>
                    <input
                      ref={nameRef}
                      type="text"
                      name="name"
                      required
                      maxLength={120}
                      placeholder="Jane Sherpa"
                      className={inputClass}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="sd-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={200}
                      placeholder="jane@company.com"
                      className={inputClass}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="sd-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      What are you building?
                    </span>
                    <textarea
                      name="message"
                      required
                      maxLength={5000}
                      rows={4}
                      placeholder="A rough idea is enough — what it is, where it's stuck, and when you'd like to ship."
                      className={`${inputClass} resize-none`}
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-red-400 leading-relaxed" role="alert">
                      {errorMsg}{" "}
                      <a
                        href="mailto:info@milapmagar.com.np"
                        className="underline underline-offset-4 hover:text-[var(--amber)] transition-colors"
                      >
                        Email me directly instead
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="sd-btn-primary justify-center mt-1 disabled:opacity-60 disabled:cursor-wait"
                  >
                    {status === "sending" ? "Sending…" : "Send request"}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
