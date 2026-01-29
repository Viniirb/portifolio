"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function ContatoPage() {
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
      value: "contato@viniciusrb.dev",
      href: `mailto:contato@viniciusrb.dev?subject=${encodeURIComponent(
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
      href: "https://www.linkedin.com/in/viniciusrolimbarbosa/",
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
    <main className="min-h-screen py-12 sm:py-16">
      <motion.div
        className="max-w-5xl mx-auto w-full px-4"
        variants={containerVariants}
        initial={false}
        animate="visible"
      >
        <motion.section variants={itemVariants} className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Vamos Conversar?
          </h1>
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
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Efeito de brilho no hover */}
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

              {/* Indicador visual */}
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
    </main>
  );
}
