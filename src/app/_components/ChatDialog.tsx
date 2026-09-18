"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { EMAIL } from "@/data/profile";
import Modal from "./Modal";
import { Avatar } from "./shared";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line-strong bg-card px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors placeholder:text-fg-3 focus:border-accent";

export default function ChatDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  };

  const close = () => {
    onClose();
    window.setTimeout(() => setStatus("idle"), 300);
  };

  return (
    <Modal open={open} onClose={close} title="Chat with Milap" className="sm:max-w-[28rem]">
      {status === "sent" ? (
        <div className="flex flex-col items-center py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage">
            <Check className="h-6 w-6 text-[#3f4a1e]" />
          </span>
          <p className="mt-4 font-display text-2xl">Got it, thank you.</p>
          <p className="mt-1 text-sm text-fg-2">I usually reply within a day.</p>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-start gap-3">
            <Avatar size={36} />
            <p className="rounded-2xl rounded-tl-sm border border-line bg-paper-2 px-3.5 py-2.5 text-[0.95rem] text-fg-2">
              Hey — tell me what you&apos;re building — I&apos;ll get back to you by email.
            </p>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input name="name" required placeholder="Your name" className={field} autoComplete="name" />
            <input name="email" type="email" required placeholder="you@company.com" className={field} autoComplete="email" />
            <textarea name="message" required rows={4} placeholder="Your message" className={`${field} resize-none`} />
            <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            {status === "error" && <p className="text-sm text-[#a3372a]">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent font-display text-lg text-on-accent hover:bg-accent-hover disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-fg-3">
            or email{" "}
            <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-2">
              {EMAIL}
            </a>
          </p>
        </>
      )}
    </Modal>
  );
}
