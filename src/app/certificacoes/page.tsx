"use client";

import { motion } from "framer-motion";
import { Award, Filter, Shield, Cloud, Code, Network, Settings } from "lucide-react";
import { certifications } from "@/constants";
import { useState } from "react";

const categories = {
  all: "Todos",
  cybersecurity: "Cibersegurança",
  cloud: "Cloud",
  development: "Desenvolvimento",
  networking: "Redes",
  other: "Outros",
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "cybersecurity":
      return Shield;
    case "cloud":
      return Cloud;
    case "development":
      return Code;
    case "networking":
      return Network;
    default:
      return Settings;
  }
};

export default function CertificacoesPage() {
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
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Certificações
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {certifications.length} certificações conquistadas em diversas áreas da tecnologia.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtrar por categoria:</span>
          </div>
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
        >
          {filteredCertifications.map((cert) => {
            const CategoryIcon = getCategoryIcon(cert.category);
            return (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Ícone da categoria */}
                  <div className="flex-shrink-0 p-3 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <CategoryIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{cert.institution}</span>
                      </div>
                      <span className="text-xs">{cert.date}</span>
                    </div>
                  </div>

                  {/* Tag da categoria */}
                  <div className="flex-shrink-0">
                    <span className="inline-block px-2.5 py-1 bg-muted rounded-full text-xs font-medium">
                      {categories[cert.category]}
                    </span>
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
    </main>
  );
}
