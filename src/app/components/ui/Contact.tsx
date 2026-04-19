"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const socials = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/milaapeeey/",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/milap-magar-21427a229/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/Milap-Magar",
    label: "GitHub",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio — ${form.name || "new message"}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:info@milapmagar.com.np?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative w-full min-h-screen overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-gray-500">
            / Contact
          </span>
          <h2 className="mt-4 font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.05]">
            Let&apos;s build <br className="hidden sm:block" />
            something good.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Open to freelance work, full-time roles, and unusual collaborations.
            Drop a message — I usually reply within a day.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-10">
          {/* Info column */}
          <aside className="md:col-span-2 flex flex-col gap-4">
            <a
              href="mailto:info@milapmagar.com.np"
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur border border-black/5 hover:border-[#fa9a9b] hover:shadow-lg transition-all"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#fa9a9b]/15 flex items-center justify-center text-[#fa9a9b]">
                <Mail className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  Email
                </div>
                <div className="font-mono text-sm text-gray-900 mt-1 truncate group-hover:text-[#fa9a9b] transition-colors">
                  info@milapmagar.com.np
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#fa9a9b] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur border border-black/5">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#fa9a9b]/15 flex items-center justify-center text-[#fa9a9b]">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  Based in
                </div>
                <div className="font-mono text-sm text-gray-900 mt-1">
                  Kathmandu, Nepal
                </div>
                <div className="font-mono text-[11px] text-gray-500 mt-1">
                  Available worldwide — remote
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 backdrop-blur border border-black/5">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-3">
                Elsewhere
              </div>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-[#fa9a9b] hover:border-[#fa9a9b] hover:text-white flex items-center justify-center text-gray-700 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 p-6 md:p-8 bg-white/90 backdrop-blur rounded-2xl border border-black/5 shadow-xl"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#fa9a9b] focus:ring-2 focus:ring-[#fa9a9b]/20 outline-none font-mono text-sm text-gray-900 placeholder:text-gray-400 transition"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#fa9a9b] focus:ring-2 focus:ring-[#fa9a9b]/20 outline-none font-mono text-sm text-gray-900 placeholder:text-gray-400 transition"
                />
              </label>
            </div>
            <label className="block mt-5">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                Message
              </span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, timeline, or just say hi…"
                className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#fa9a9b] focus:ring-2 focus:ring-[#fa9a9b]/20 outline-none text-sm text-gray-700 placeholder:text-gray-400 resize-none transition"
              />
            </label>
            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
              <span className="font-mono text-[11px] text-gray-400">
                ~ opens your mail client
              </span>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-[#fa9a9b] text-white font-mono text-xs uppercase tracking-[0.25em] rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Send message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
