import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { projects, shippedCount } from "@/data/projects";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Board from "../../_components/Board";
import PageHeader from "../../_components/PageHeader";
import ProjectCard from "../../_components/ProjectCard";

const description =
  "Products Milap Magar has designed and shipped: Shelfmallow and its Spring Boot API, Chatblix, PixSift, Shreejana Dry Fruits, Vault and more — React, Next.js, Java and PostgreSQL, end to end.";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description,
  path: "/projects",
});

export default function ProjectsPage() {
  const left = projects.filter((_, i) => i % 2 === 0).map((p, i) => <ProjectCard key={p.slug} project={p} tapeLeft={i % 2 === 0} priority={i === 0} />);
  const right = projects.filter((_, i) => i % 2 === 1).map((p, i) => <ProjectCard key={p.slug} project={p} tapeLeft={i % 2 === 1} priority={i === 0} />);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projects · ${profile.name}`,
    url: absoluteUrl("/projects"),
    description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#person") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": p.kind === "api" ? "WebAPI" : "WebApplication",
          name: p.title,
          url: p.url,
          description: p.description ?? p.tagline,
          image: absoluteUrl(p.image),
          author: { "@id": absoluteUrl("/#person") },
          ...(p.year ? { dateCreated: p.year } : {}),
          ...(p.repo ? { codeRepository: p.repo } : {}),
        },
      })),
    },
  };

  return (
    <>
      <PageHeader
        eyebrow="things I've shipped"
        title="Projects"
        intro="Every one of these started as a Figma frame and ended as a URL. Click a screenshot to see it full size; the newest work is first."
        aside={
          <span className="flex h-16 w-16 rotate-[-8deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-accent bg-card text-accent">
            <span className="font-display text-2xl leading-none">{shippedCount}</span>
            <span className="text-[0.6rem] uppercase tracking-[0.12em]">live</span>
          </span>
        }
      />
      <Board left={left} right={right} />
      <JsonLd data={jsonLd} />
    </>
  );
}
