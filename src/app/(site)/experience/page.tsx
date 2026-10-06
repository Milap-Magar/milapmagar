import type { Metadata } from "next";
import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { EMAIL, profile, socials } from "@/data/profile";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import PageHeader from "../../_components/PageHeader";

const description =
  "Milap Magar's experience: designer and full-stack developer at Chatblix, plus freelance product design and engineering for Shelfmallow, PixSift, Shreejana Dry Fruits and Vault.";

export const metadata: Metadata = pageMetadata({ title: "Experience", description, path: "/experience" });

const month = (ym: string) =>
  new Date(`${ym}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

const TYPE_LABEL: Record<(typeof experience)[number]["type"], string> = {
  "full-time": "Full-time",
  freelance: "Freelance",
  contract: "Contract",
  internship: "Internship",
  education: "Education",
};
const TYPE_TONE: Record<(typeof experience)[number]["type"], string> = {
  "full-time": "bg-butter text-[#5e4613]",
  freelance: "bg-blush text-[#6b3322]",
  contract: "bg-sky text-[#2c4a47]",
  internship: "bg-sage text-[#3f4a1e]",
  education: "bg-sage text-[#3f4a1e]",
};

export default function ExperiencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/experience"),
    name: `Experience · ${profile.name}`,
    description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: profile.name,
      jobTitle: profile.role,
      hasOccupation: experience.map((e) => ({
        "@type": "Occupation",
        name: e.role,
        description: e.summary,
        skills: e.stack.join(", "),
      })),
    },
  };

  return (
    <>
      <PageHeader
        eyebrow="the formal version"
        title="Experience"
        intro="Where I've worked and what I shipped there. The chart on the home page is the short version; this is the one you'd put in an email."
        aside={
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 items-center gap-2 rounded-xl border border-line-strong px-4 font-display text-lg text-fg-2 transition-colors hover:border-accent hover:bg-paper-2 hover:text-accent"
          >
            LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      />

      <ol className="relative ml-3 border-l-2 border-dashed border-line-strong pl-7 sm:ml-5 sm:pl-9">
        {experience.map((e, i) => {
          const Icon = e.type === "education" ? GraduationCap : Briefcase;
          return (
            <li key={e.slug} className={`relative pb-8 ${i === experience.length - 1 ? "pb-0" : ""}`}>
              {/* dot on the line */}
              <span className="absolute -left-[2.45rem] top-5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-accent bg-card text-accent sm:-left-[2.95rem]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <article className={`card p-5 sm:p-6 ${i % 2 ? "rotate-[0.3deg]" : "-rotate-[0.3deg]"} transition-transform hover:rotate-0`}>
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h2 className="font-display text-[1.5rem] leading-tight text-fg">{e.role}</h2>
                    <p className="mt-1 text-[0.95rem] text-fg-2">
                      {e.url ? (
                        <a href={e.url} target="_blank" rel="noreferrer" className="underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                          {e.company}
                        </a>
                      ) : (
                        e.company
                      )}
                      <span className="mx-2 text-fg-3">·</span>
                      <span className="inline-flex items-center gap-1 text-fg-3">
                        <MapPin className="h-3.5 w-3.5" /> {e.location}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2.5 py-1 text-xs ${TYPE_TONE[e.type]}`}>{TYPE_LABEL[e.type]}</span>
                    <span className="text-sm italic text-fg-3">
                      <time dateTime={e.from}>{month(e.from)}</time> — {e.to ? <time dateTime={e.to}>{month(e.to)}</time> : "now"}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-2">{e.summary}</p>

                <ul className="mt-3 space-y-2">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-fg-2">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-md border border-line bg-paper-2/60 px-2 py-0.5 text-xs text-fg-2">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 px-2 text-center">
        <p className="font-display text-2xl text-fg">Want the PDF version?</p>
        <p className="mt-2 text-[0.95rem] italic text-fg-2">
          <a href={`mailto:${EMAIL}?subject=CV%20request`} className="text-accent underline underline-offset-4">
            Email me
          </a>{" "}
          and I&apos;ll send a current CV.
        </p>
      </div>
      <JsonLd data={jsonLd} />
    </>
  );
}
