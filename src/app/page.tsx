"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Database, GitBranch, Server, Terminal, Zap, BookOpen, ChefHat, BookMarked, Gamepad2, Plane, Lightbulb, Mail, Phone, Github, Linkedin } from "lucide-react";
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

export default function Home() {
  const scrollToNext = () => {
    const scrollTarget = window.innerHeight;
    const startPosition = window.pageYOffset;
    const distance = scrollTarget - startPosition;
    const duration = 800;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

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
    "Desenvolvedor fullstack há 5 anos, especializado em criar soluções robustas e escaláveis. Minha expertise abrange desde o backend com .NET/C# até frontends modernos e responsivos com React e Next.js.",
    "No backend, projeto e implemento APIs RESTful de alta performance, integrações complexas e arquiteturas escaláveis utilizando SQL Server, MySQL, Oracle e Dapper. Tenho experiência sólida com Azure DevOps, implementando pipelines de CI/CD que garantem entregas estáveis e previsíveis.",
    "Autista (TEA), minha forma única de pensar traz benefícios significativos ao desenvolvimento: atenção aos detalhes, identificação de padrões, consistência no código e comunicação técnica precisa. Valorizo profundamente documentação clara, acessibilidade, testes automatizados e melhoria contínua.",
  ];

  const wpMsg = encodeURIComponent(
    "Olá Vinícius! Cheguei pelo seu portfólio e gostaria de conversar."
  );

  const contatos = [
    {
      label: "WhatsApp",
      value: "+55 (47) 98890-3621",
      href: `https://wa.me/5547988903621?text=${wpMsg}`,
      icon: Phone,
      description: "Disponível em horário comercial",
    },
    {
      label: "Email",
      value: "viiniirb@proton.me",
      href: `mailto:viiniirb@proton.me?subject=${encodeURIComponent(
        "Contato via portfólio"
      )}&body=${encodeURIComponent(
        "Olá Vinícius, tudo bem? Vi seu portfólio e gostaria de falar sobre..."
      )}`,
      icon: Mail,
      description: "Respondo em até 24h",
    },
    {
      label: "LinkedIn",
      value: "vinicius-rolim-barbosa",
      href: "https://www.linkedin.com/in/vinicius-rolim-barbosa-15b066374/",
      icon: Linkedin,
      description: "Networking profissional",
    },
    {
      label: "GitHub",
      value: "Viniirb",
      href: "https://github.com/Viniirb",
      icon: Github,
      description: "Projetos e contribuições",
    },
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
    <>
      {/* Seção 1: Home / Hero */}
      <section className="min-h-screen flex items-center px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Vinicius Rolim Barbosa
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Desenvolvedor Full Stack especializado em criar experiências digitais
              modernas e escaláveis
            </motion.p>

            <motion.button
              onClick={scrollToNext}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              aria-label="Rolar para baixo"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Seção 2: Sobre */}
      <section className="min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.section variants={itemVariants} className="mb-16">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Sobre Mim
            </motion.h2>
            <div className="space-y-4">
              {bioParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
              Habilidades Técnicas
            </h3>
            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
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
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
              Interesses Pessoais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {curiosidades.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative p-5 rounded-lg border border-border bg-card/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">{item.text}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </section>

      {/* Seção 3: Projetos */}
      <section className="min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              Projetos
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Alguns trabalhos em que atuei recentemente.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
          >
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Seção 4: Contato */}
      <section className="min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Vamos Conversar?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Estou sempre aberto a novos projetos, colaborações e oportunidades.
              Entre em contato através de qualquer canal abaixo.
            </p>
          </motion.section>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {contatos.map((contato) => (
              <motion.a
                key={contato.label}
                href={contato.href}
                target={contato.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contato.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                className="group relative p-8 border border-border rounded-lg bg-card/50 hover:bg-accent/50 transition-all duration-300 overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <contato.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {contato.label}
                      </h3>
                      <p className="text-sm text-muted-foreground break-all">
                        {contato.value}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {contato.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-sm text-muted-foreground"
          >
            <p>
              Localizado em <strong>Joinville, SC - Brasil</strong>
            </p>
            <p className="mt-2">
              Disponível para trabalho remoto e presencial na região
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
