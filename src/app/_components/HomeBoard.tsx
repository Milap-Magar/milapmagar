import { projects } from "@/data/projects";
import type { GithubData } from "@/lib/github";
import Board from "./Board";
import ProjectCard from "./ProjectCard";
import {
  CraftSplitCard,
  GithubCard,
  JourneyCard,
  NetworkCard,
  NowCard,
  QuoteCard,
  SignOffCard,
  ToolboxCard,
} from "./cards/Cards";

/** The home page: five project cards mixed in with the "about me" cards. The rest live on /projects. */
export default function HomeBoard({ github }: { github: GithubData }) {
  const [p0, p1, p2, p3, p4] = projects;
  const left = [
    <ProjectCard key={p0.slug} project={p0} tapeLeft priority />,
    <GithubCard key="gh" github={github} />,
    <ProjectCard key={p2.slug} project={p2} />,
    <JourneyCard key="journey" />,
    <ProjectCard key={p4.slug} project={p4} tapeLeft />,
  ];
  const right = [
    <NowCard key="now" />,
    <ProjectCard key={p1.slug} project={p1} priority />,
    <NetworkCard key="net" />,
    <QuoteCard key="quote" />,
    <ToolboxCard key="tools" />,
    <ProjectCard key={p3.slug} project={p3} tapeLeft />,
    <CraftSplitCard key="split" />,
  ];

  return (
    <>
      <Board left={left} right={right} />
      <div className="mt-12">
        <SignOffCard />
      </div>
    </>
  );
}
