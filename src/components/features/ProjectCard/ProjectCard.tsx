"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/types";
import { techIcons, whiteIconTechs } from "@/constants";

type Props = {
  project: Project;
  className?: string;
};

const Modal = React.memo(({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop with blur */}
      <motion.div
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal content */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl p-6 sm:p-8 z-10"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: 50, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, y: 50, opacity: 0, rotateX: 15 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.4
        }}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors z-10"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
});

export default function ProjectCard({ project, className }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <motion.article
      className={`group relative p-6 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors ${className ?? ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{project.company}</span>
            {project.period && (
              <>
                <span>•</span>
                <span>{project.period}</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.short}
          </p>
        </div>

        <motion.button
          type="button"
          className="self-start px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-foreground hover:text-background transition-colors"
          onClick={handleOpenModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver Detalhes
        </motion.button>
      </div>

      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="space-y-8">
            <div className="pr-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">{project.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{project.company}</span>
                {project.period && (
                  <>
                    <span>•</span>
                    <span>{project.period}</span>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-semibold mb-4">Sobre o Projeto</h4>
              <div className="space-y-4">
                {project.description.map((para, i) => (
                  <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-semibold mb-5">Tecnologias Utilizadas</h4>
              <div className="flex flex-wrap gap-5">
                {project.tech.map((t) => {
                  const icon = techIcons[t];
                  if (!icon) return null;
                  return (
                    <motion.div
                      key={t}
                      className="flex flex-col items-center gap-2.5"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      title={icon.alt}
                    >
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          width={48}
                          height={48}
                          className="object-contain brightness-0 invert opacity-70"
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {icon.alt}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {project.links && (project.links.repo || project.links.demo) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.links.repo && (
                  <motion.a
                    className="px-5 py-2.5 text-sm font-medium rounded-lg border border-border hover:bg-foreground hover:text-background transition-colors"
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Repositório
                  </motion.a>
                )}
                {project.links.demo && (
                  <motion.a
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity"
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Demo
                  </motion.a>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </motion.article>
  );
}
