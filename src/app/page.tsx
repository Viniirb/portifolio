import { Hero } from "@/components/layout/Hero";
import ProjectList from "@/components/features/ProjectList";
import { projects } from "@/constants/projects";

export default function Home() {
  
  const recentProjects = projects.slice(0, 4);

  return(
    <main className="min-h-screen flex flex-col w-full">
      <Hero />
      <ProjectList projects={recentProjects} />
    </main>
  )
}