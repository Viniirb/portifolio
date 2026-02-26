"use client";

import { motion } from "framer-motion";
import {
  CodeIcon as Code2,
  DatabaseIcon as Database,
  GitBranchIcon as GitBranch,
  HardDrivesIcon as Server,
  TerminalWindowIcon as Terminal,
  LightningIcon as Zap,
  BookOpenIcon as BookOpen,
  CookingPotIcon as ChefHat,
  BookBookmarkIcon as BookMarked,
  GameControllerIcon as Gamepad2,
  AirplaneTiltIcon as Plane,
  LightbulbIcon as Lightbulb,
} from "@phosphor-icons/react";

export default function Sobre() {
  const skills = [
    { name: "JavaScript / TypeScript", value: 88, icon: Code2 },
    { name: "React / Next.js", value: 90, icon: Code2 },
    { name: "Node.js", value: 72, icon: Server },
    { name: "C# / .NET", value: 100, icon: Code2 },
    { name: "Banco de Dados", value: 100, icon: Database },
    { name: "Azure DevOps", value: 100, icon: Zap },
    { name: "Git", value: 100, icon: GitBranch },
    { name: "Linux", value: 80, icon: Terminal },
    { name: "CI/CD", value: 90, icon: Zap },
    { name: "Testes", value: 90, icon: Code2 },
  ];

  const curiosidades = [
    { text: "Amo estudar e aprender", icon: BookOpen },
    { text: "Gosto de cozinhar", icon: ChefHat },
    { text: "Leitor de histórias em quadrinhos", icon: BookMarked },
    { text: "Entusiasta de videogames", icon: Gamepad2 },
    { text: "Apaixonado por viajar", icon: Plane },
    { text: "Sempre buscando novos conhecimentos", icon: Lightbulb },
  ];

  const bioParagraphs = [
    "Natural de , Mato Grosso do Sul, atualmente residindo em Joinville, Santa Catarina. Com 5 anos de experiência como desenvolvedor fullstack, especializo-me em criar soluções robustas e escaláveis que transformam desafios complexos em produtos eficientes.",
    "Cursando Ciência da Computação na UNISOCIESC (previsão de formatura em 2027), minha expertise técnica abrange desde o desenvolvimento backend com .NET/C# e APIs RESTful de alta performance, até frontends modernos e responsivos com React e Next.js. Domino bancos de dados relacionais (SQL Server, MySQL, Oracle) e ferramentas de DevOps, com foco em pipelines de CI/CD que garantem entregas contínuas e estáveis.",
    "Autista (TEA), transformo minha neurodivergência em vantagem competitiva: atenção excepcional aos detalhes, identificação eficiente de padrões, código consistente e comunicação técnica precisa. Sou apaixonado por documentação clara, acessibilidade, testes automatizados e aprendizado contínuo, sempre buscando excelência técnica em cada projeto.",
  ];

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
        {/* Bio Section */}
        <motion.section variants={itemVariants} className="mb-10 sm:mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight"
          >
            Sobre Mim
          </motion.h1>
          <div className="space-y-4">
            {bioParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
            Habilidades Técnicas
          </h2>
          <div className="grid gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="font-medium text-sm sm:text-base">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {skill.value}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interesses Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
            Interesses Pessoais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {curiosidades.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group relative p-5 rounded-lg border border-border bg-card/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{item.text}</span>
                </div>

                {/* Indicador visual */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
