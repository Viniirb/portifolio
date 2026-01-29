"use client";

import { motion } from "framer-motion";
import * as lucideReact from "lucide-react";
import { ProjectCard } from "@/components";
import { projects, certifications } from "@/constants";
import { useEffect, useRef, useState } from "react";

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
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (index: number) => {
    const target = sections[index] ?? sectionRefs.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToNext = () => {
    if (sections.length === 0 && sectionRefs.current.length === 0) return;
    const length = sections.length || sectionRefs.current.length;
    const nextIndex = Math.min(activeSection + 1, length - 1);
    if (nextIndex !== activeSection) {
      scrollToSection(nextIndex);
    }
  };

  const skills = [
    { name: "C# / .NET", value: 100, icon: lucideReact.Code2 },
    { name: "JavaScript / TypeScript", value: 85, icon: lucideReact.Code2 },
    { name: "React / Next.js", value: 85, icon: lucideReact.Code2 },
    { name: "Solid-js", value: 20, icon: lucideReact.Code2 },
    { name: "Python", value: 60, icon: lucideReact.Code2 },
    { name: "Node.js", value: 45, icon: lucideReact.Code2 },
    { name: "Banco de Dados", value: 100, icon: lucideReact.Database },
    { name: "Azure DevOps", value: 100, icon: lucideReact.Zap },
    { name: "Git", value: 100, icon: lucideReact.GitBranch },
    { name: "Linux", value: 55, icon: lucideReact.Terminal },
    { name: "Redes Neurais / Deep Learning", value: 30, icon: lucideReact.Brain },
    { name: "CI/CD", value: 70, icon: lucideReact.Zap },
    { name: "Testes", value: 90, icon: lucideReact.Code2 },
    { name: "Cibersegurança", value: 40, icon: lucideReact.Shield },
    { name: "Infraestrutura / Servidores", value: 50, icon: lucideReact.Server },
  ];

  const sortedSkills = [...skills].sort((a, b) => b.value - a.value);

  const curiosidades = [
    { text: "Amo estudar e aprender assuntos novos", icon: lucideReact.BookOpen },
    { text: "Amo o astronomia e observar as estrelas", icon: lucideReact.Telescope },
    { text: "Gosto de cozinhar", icon: lucideReact.ChefHat },
    { text: "Leitor de histórias em quadrinhos", icon: lucideReact.BookMarked },
    { text: "Leitor de livros de fantasia e ficção científica", icon: lucideReact.BookMarked },
    { text: "Entusiasta de videogames", icon: lucideReact.Gamepad2 },
    { text: "Apaixonado por viajar", icon: lucideReact.Plane },
    { text: "Amo ficar natureza e ar livre", icon: lucideReact.Zap },
    { text: "Gosto de assistir filmes, animes e séries", icon: lucideReact.Film },
    { text: "Sempre buscando novos conhecimentos", icon: lucideReact.Lightbulb },
    { text: "Gosto de música, especialmente Rock e Metal", icon: lucideReact.Guitar},
    { text: "Prato favorito: Hambúrguer artesanal", icon: lucideReact.Hamburger },
  ];

  const bioParagraphs = [
    "Natural de Rio Verde de Mato Grosso, Mato Grosso do Sul, atualmente morando em Joinville, Santa Catarina. Desenvolvedor fullstack há 5 anos, especializado em criar soluções robustas e escaláveis. Minha expertise abrange desde o backend com .NET/C# até frontends modernos e responsivos com React e Next.js.",
    "Cursando Ciência da Computação na UNISOCIESC em Joinville, com previsão de formação em 2027. No backend, projeto e implemento APIs RESTful de alta performance, integrações complexas e arquiteturas escaláveis utilizando SQL Server, MySQL, Oracle e Dapper. Tenho experiência sólida com Azure DevOps, implementando pipelines de CI/CD que garantem entregas estáveis e previsíveis.",
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
      icon: lucideReact.Phone,
      description: "Disponível em horário comercial",
    },
    {
      label: "Email",
      value: "contato@viniciusrb.dev",
      href: `mailto:contato@viniciusrb.dev?subject=${encodeURIComponent(
        "Contato via portfólio"
      )}&body=${encodeURIComponent(
        "Olá Vinícius, tudo bem? Vi seu portfólio e gostaria de falar sobre..."
      )}`,
      icon: lucideReact.Mail,
      description: "Respondo em até 24h",
    },
    {
      label: "LinkedIn",
      value: "vinicius-rolim-barbosa",
      href: "https://www.linkedin.com/in/viniciusrolimbarbosa/",
      icon: lucideReact.Linkedin,
      description: "Networking profissional",
    },
    {
      label: "GitHub",
      value: "Viniirb",
      href: "https://github.com/Viniirb",
      icon: lucideReact.Github,
      description: "Projetos e contribuições",
    },
  ];

  const categories = {
    all: "Todos",
    cybersecurity: "Cibersegurança",
    cloud: "Cloud",
    development: "Desenvolvimento",
    networking: "Redes",
    neuralnetworks: "Redes Neurais",
    other: "Outros",
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cybersecurity":
        return lucideReact.Shield;
      case "cloud":
        return lucideReact.Cloud;
      case "development":
        return lucideReact.Code2;
      case "networking":
        return lucideReact.Network;
      case "neuralnetworks":
        return lucideReact.Brain;
      default:
        return lucideReact.Settings;
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>("all");

  const filteredCertifications = selectedCategory === "all"
    ? certifications
    : certifications.filter(cert => cert.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: heroEase },
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

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    if (elements.length === 0) return;
    sectionRefs.current = elements;
    setSections(elements);

    const handleScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.3;
      let index = 0;
      for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].offsetTop <= marker) {
          index = i;
        }
      }
      setActiveSection(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Seção 1: Home / Hero */}
      <section
        className="min-h-screen flex items-center px-4 relative overflow-hidden"
        data-section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
      >
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
              variants={heroItemVariants}
            >
              Vinicius Rolim Barbosa
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed"
              variants={heroItemVariants}
            >
              Desenvolvedor Full Stack especializado em criar experiências digitais
              modernas e escaláveis
            </motion.p>

          </motion.div>
        </div>

        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      </section>

      {/* Seção 2: Sobre */}
      <section
        className="min-h-screen px-4 py-12 sm:py-16"
        data-section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
      >
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.section variants={itemVariants} className="mb-16">
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight"
            >
              Sobre Mim
            </motion.h2>
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

          <motion.section variants={itemVariants} className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
              Habilidades Técnicas
            </h3>
            <div className="grid gap-4">
              {sortedSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:drop-shadow-[0_0_8px_hsl(var(--foreground)/0.35)]" />
                      <span className="font-medium text-sm sm:text-base">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full"
                      style={{ width: `${skill.value}%` }}
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
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative p-5 rounded-lg border border-border bg-card/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors group-hover:drop-shadow-[0_0_8px_hsl(var(--foreground)/0.35)]" />
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
      <section
        className="min-h-screen px-4 py-12 sm:py-16"
        data-section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
      >
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
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
                className="rounded-lg transition-shadow hover:shadow-lg h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Seção 4: Certificações */}
      <section
        className="min-h-screen px-4 py-12 sm:py-16"
        data-section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
      >
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <lucideReact.Award className="w-8 h-8 text-primary" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Certificações
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              {certifications.length} certificações conquistadas em diversas áreas da tecnologia.
            </p>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categories) as Array<keyof typeof categories>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-muted hover:bg-accent text-foreground"
                  }`}
                >
                  {categories[cat]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid de Certificações */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            variants={containerVariants}
            key={selectedCategory}
            initial="hidden"
            animate="visible"
          >
            {filteredCertifications.map((cert) => {
              const CategoryIcon = getCategoryIcon(cert.category);
              return (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative bg-card border border-border rounded-lg p-5 transition-all duration-300 hover:shadow-[0_18px_40px_hsl(var(--foreground)/0.12)]"
                >
                  <div className="flex items-start gap-4">
                    {/* Ícone da categoria */}
                    <div className="flex-shrink-0 p-3 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                      <CategoryIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.35)]" />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="flex-1 min-w-0 font-semibold text-base sm:mb-2 sm:line-clamp-2 group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>

                          {/* Tag da categoria (desktop/tablet) */}
                          <span className="hidden sm:inline-block flex-shrink-0 px-2.5 py-1 bg-muted rounded-full text-xs font-medium">
                            {categories[cert.category]}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <lucideReact.Award className="w-4 h-4" />
                            <span>{cert.institution}</span>
                          </div>
                          <span className="text-xs">{cert.date}</span>
                        </div>

                        {/* Tag da categoria (mobile) */}
                        <span className="sm:hidden inline-block w-fit px-2.5 py-1 bg-muted rounded-full text-xs font-medium">
                          {categories[cert.category]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Borda animada no hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg" />
                </motion.div>
              );
            })}
          </motion.div>

          {filteredCertifications.length === 0 && (
            <motion.div
              className="text-center py-12 text-muted-foreground"
            >
              Nenhuma certificação encontrada nesta categoria.
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Seção 5: Contato */}
      <section
        className="min-h-screen px-4 py-12 sm:py-16"
        data-section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
      >
        <motion.div
          className="max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
                className="group relative p-8 border border-border rounded-lg bg-card/50 hover:bg-accent/50 transition-all duration-300 overflow-hidden hover:shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <contato.icon className="w-6 h-6 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary-foreground)/0.5)]" />
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

      {sections.length > 0 && activeSection < sections.length - 1 && (
        <motion.button
          onClick={scrollToNext}
          className="fixed bottom-8 left-8 p-3 rounded-full bg-background/30 backdrop-blur-lg border border-border/40 text-foreground hover:bg-background/50 transition-colors shadow-lg z-50"
          aria-label="Ir para a próxima seção"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <lucideReact.ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.button>
      )}
    </>
  );
}
