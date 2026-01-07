"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components";
import { projects } from "@/constants";

const sortedProjects = projects.slice().sort((a, b) => {
  const getEndYear = (period: string | undefined) => {
    if (!period) return 0;
    if (period.toLowerCase().includes("atualmente"))
      return new Date().getFullYear();
    const match = period.match(/(\d{4})\s*[-—]\s*(\d{4})/);
    if (match) return parseInt(match[2], 10);
    const yearMatch = period.match(/(\d{4})/);
    return yearMatch ? parseInt(yearMatch[1], 10) : 0;
  };
  return getEndYear(b.period) - getEndYear(a.period);
});

export default function ProjetosPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen py-12 sm:py-16">
      <motion.div
        className="max-w-5xl mx-auto w-full px-4"
        variants={containerVariants}
        initial={false}
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Projetos
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Alguns trabalhos em que atuei recentemente.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
        >
          {sortedProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
