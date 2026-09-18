"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { BadgeCheck, Check, Copy, CreditCard, Download, Ellipsis, MapPin, Network, ScanLine } from "lucide-react";
import { profile } from "@/data/profile";
import type { ContributionDay } from "@/lib/github";
import Modal from "./Modal";
import { Avatar, ContributionGrid } from "./shared";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon, XIcon } from "./BrandIcons";

const FALLBACK_URL = "https://milapmagar.com.np";

function useShareUrl() {
  const [url, setUrl] = useState(FALLBACK_URL);
  useEffect(() => setUrl(window.location.origin), []);
  return url;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center rotate-[-8deg] rounded-full border-2 border-dashed border-accent font-display text-accent ${className}`}>
      MM
    </span>
  );
}

function ProfileCard({ days, url }: { days: ContributionDay[]; url: string }) {
  const host = url.replace(/^https?:\/\//, "");
  return (
    <div className="grid-paper rounded-xl border border-line-strong p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <Avatar size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-display text-2xl text-fg">{profile.name}</p>
            <span className="flex items-center gap-0.5 rounded-full border border-accent px-1.5 py-0.5 text-xs text-accent">
              <BadgeCheck className="h-3.5 w-3.5" />
              {profile.shipped}
            </span>
          </div>
          <p className="truncate text-sm italic text-fg-2">{profile.role}</p>
        </div>
        <Logo className="h-11 w-11 text-base" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1.35fr_1fr]">
        <div className="rounded-lg border border-line bg-card p-3">
          <GithubIcon className="mb-2 h-5 w-5 text-fg" />
          <ContributionGrid days={days} weeks={20} cell={8} gap={2} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-line bg-card p-3">
            <p className="flex items-center gap-2 font-display text-base">
              <Network className="h-4 w-4 text-fg-2" /> Network
            </p>
            <div className="mt-2 flex items-center">
              <Avatar size={26} />
              <span className="mx-1.5 h-px flex-1 border-t border-dashed border-line-strong" />
              <div className="flex -space-x-1.5">
                {[
                  ["var(--butter)", GithubIcon],
                  ["var(--sky)", LinkedinIcon],
                  ["var(--blush)", InstagramIcon],
                  ["var(--sage)", FacebookIcon],
                ].map(([bg, Icon], i) => {
                  const I = Icon as typeof GithubIcon;
                  return (
                    <span
                      key={i}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card text-fg-2"
                      style={{ background: bg as string }}
                    >
                      <I className="h-3 w-3" />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap content-start gap-1.5 rounded-lg border border-line bg-card p-3">
            {profile.tags.slice(0, 3).map((t) => (
              <span key={t.label} className="rounded-md bg-paper-2 px-2 py-1 text-xs text-fg-2">
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-fg-3">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {profile.location}
        </span>
        <span className="italic">find me · {host}</span>
      </div>
    </div>
  );
}

function QrPanel({ url }: { url: string }) {
  const canvasWrap = useRef<HTMLDivElement>(null);

  const download = () => {
    const canvas = canvasWrap.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${profile.handle}-qr.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center grid-paper rounded-xl border border-line-strong px-4 py-7">
      <div className="rotate-[-1.5deg] rounded-lg border border-line-strong bg-card p-4 shadow-[3px_4px_0_var(--line)]">
        <QRCodeSVG value={url} size={196} level="H" marginSize={0} fgColor="#3e3023" bgColor="#fbf5e8" />
      </div>
      {/* high-res copy used only for the PNG download */}
      <div ref={canvasWrap} className="hidden">
        <QRCodeCanvas value={url} size={1024} level="H" marginSize={4} fgColor="#3e3023" bgColor="#fbf5e8" />
      </div>
      <p className="mt-5 font-display text-xl text-fg">{profile.name}</p>
      <p className="text-sm italic text-fg-3">point a camera here</p>
      <button
        type="button"
        onClick={download}
        className="mt-4 flex items-center gap-2 rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm text-fg-2 hover:border-accent hover:text-accent"
      >
        <Download className="h-4 w-4" /> Download PNG
      </button>
    </div>
  );
}

export default function ShareDialog({
  open,
  onClose,
  days,
}: {
  open: boolean;
  onClose: () => void;
  days: ContributionDay[];
}) {
  const url = useShareUrl();
  const [tab, setTab] = useState<"card" | "qr">("card");
  const [copied, setCopied] = useState(false);

  const text = `Check out ${profile.name} — ${profile.role}`;
  const enc = encodeURIComponent;
  const targets = [
    {
      label: "Whatsapp",
      href: `https://wa.me/?text=${enc(`${text} ${url}`)}`,
      Icon: WhatsappIcon,
      className: "bg-sage text-[#3f4a1e] hover:brightness-95",
    },
    {
      label: "Linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      Icon: LinkedinIcon,
      className: "bg-sky text-[#2c4a47] hover:brightness-95",
    },
    {
      label: "X(Twitter)",
      href: `https://x.com/intent/post?text=${enc(text)}&url=${enc(url)}`,
      Icon: XIcon,
      className: "bg-blush text-[#6b3322] hover:brightness-95",
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the URL is visible in the field to copy by hand */
    }
  };

  const more = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: profile.name, text, url });
      } catch {
        /* user dismissed the sheet */
      }
      return;
    }
    copy();
  };

  return (
    <Modal open={open} onClose={onClose} title="Share Profile">
      <div role="tablist" className="grid grid-cols-2 rounded-xl border border-line bg-paper-2 p-1">
        {(
          [
            ["card", "Card", CreditCard],
            ["qr", "QR Code", ScanLine],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
              tab === key ? "bg-card text-fg shadow-[2px_2px_0_var(--line)]" : "text-fg-3 hover:text-fg-2"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-5">{tab === "card" ? <ProfileCard days={days} url={url} /> : <QrPanel url={url} />}</div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-line-strong bg-paper-2/60 p-1.5 pl-3.5">
        <span className="min-w-0 flex-1 truncate text-sm text-fg-2">{url}</span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-sm text-fg-2 hover:border-accent hover:text-accent"
        >
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {targets.map(({ label, href, Icon, className }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`flex h-11 items-center justify-center gap-2 rounded-xl border border-line-strong text-sm transition-all ${className}`}
          >
            <Icon className="h-4 w-4" /> {label}
          </a>
        ))}
        <button
          type="button"
          onClick={more}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line-strong bg-card text-sm text-fg-2 hover:border-accent hover:text-accent"
        >
          <Ellipsis className="h-4 w-4" /> More
        </button>
      </div>
    </Modal>
  );
}
