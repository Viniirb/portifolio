'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRightIcon, X, CalendarBlankIcon, BriefcaseIcon } from '@phosphor-icons/react'
import type { Project } from '@/types/project';
import { techIcons } from '@/constants/tech-icons';

interface ProjectListProps {
    projects: Project[];
}

const ProjectModal = React.memo(({ project, onClose }: { project: Project; onClose: () => void }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset';}
    }, []);

    return (
        <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" 
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-corporate-dark shadow-2xl flex flex-col"
      >
        {/* Header do Modal */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-6 sm:p-8 bg-background border-b border-corporate-border">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-3 text-sm text-foreground/60 font-mono">
              <span className="flex items-center gap-1">
                <BriefcaseIcon className="w-4 h-4" /> {project.company}
              </span>
              {project.period && (
                <span className="flex items-center gap-1 border-l border-corporate-border pl-3">
                  <CalendarBlankIcon className="w-4 h-4" /> {project.period}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-corporate-gray rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Descrição */}
          <div className="space-y-4">
             <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40">Sobre o Projeto</h4>
             <div className="text-foreground/70 leading-relaxed space-y-4">
                {project.description.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
             </div>
          </div>

          {/* Techs com Ícones */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-4">Stack Tecnológico</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {project.tech.map((t) => {
                 const icon = techIcons[t]
                 if (!icon) return null
                 return (
                   <div key={t} className="flex flex-col items-center justify-center p-4 border border-corporate-border hover:bg-corporate-gray/30 transition-colors">
                      <Image 
                        src={icon.src} 
                        alt={icon.alt} 
                        width={32} 
                        height={32} 
                        className="mb-2 opacity-80"
                      />
                      <span className="text-xs font-medium text-center">{icon.alt}</span>
                   </div>
                 )
              })}
            </div>
          </div>
        </div>

        {/* Footer com Links */}
        {(project.links?.repo || project.links?.demo) && (
          <div className="sticky bottom-0 p-6 bg-corporate-gray/10 border-t border-corporate-border flex gap-4">
             {project.links.repo && (
                <a 
                  href={project.links.repo} 
                  target="_blank" 
                  className="px-6 py-3 bg-background border border-corporate-dark text-foreground text-sm font-bold uppercase hover:bg-corporate-dark hover:text-background transition-colors"
                >
                  Repositório
                </a>
             )}
             {project.links.demo && (
                <a 
                  href={project.links.demo} 
                  target="_blank" 
                  className="px-6 py-3 bg-corporate-accent text-background text-sm font-bold uppercase hover:bg-corporate-accent/80 transition-colors flex items-center gap-2"
                >
                  Ver Demo <ArrowUpRightIcon className="w-4 h-4" />
                </a>
             )}
          </div>
        )}
      </motion.div>
    </div>
    )
})
ProjectModal.displayName = 'ProjectModal';

export default function ProjectList({ projects }: ProjectListProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const closeModal = useCallback(() => setSelectedProject(null), []);

    return (
        <section className="w-full border-b border-corporate-border bg-background">
            
          {/* Cabeçalho da Seção */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-corporate-border">
            <div className="col-span-1 md:col-span-4 p-8 border-r border-corporate-border bg-corporate-gray/20">
              <h2 className="text-sm font-bold tracking-widest uppercase text-foreground/60">
                Trabalhos Selecionados
              </h2>
            </div>
            <div className="col-span-1 md:col-span-8 p-8 flex items-center">
              <p className="text-xl font-medium">Clique em um projeto para ver detalhes técnicos.</p>
            </div>
          </div>

          {/* Header Tabela (Desktop) */}
          <div className="hidden md:grid grid-cols-12 text-xs font-bold uppercase tracking-widest text-foreground/40 p-4 border-b border-corporate-border bg-background">
            <div className="col-span-2">Período</div>
            <div className="col-span-3">Cliente / Empresa</div>
            <div className="col-span-4">Projeto</div>
            <div className="col-span-3 text-right">Stack Principal</div>
          </div>

          {/* Lista */}
          <div className="flex flex-col">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative grid grid-cols-1 md:grid-cols-12 border-b border-corporate-border hover:bg-corporate-gray/50 cursor-pointer transition-colors duration-200"
              >
                {/* Período */}
                <div className="hidden md:flex col-span-2 p-6 items-center border-r border-corporate-border text-foreground/60 font-mono text-xs">
                  {project.period || "N/A"}
                </div>

                {/* Empresa */}
                <div className="col-span-1 md:col-span-3 p-6 flex items-center md:border-r border-corporate-border text-sm font-medium text-foreground/70">
                  {project.company}
                </div>

                {/* Título e Short Desc */}
                <div className="col-span-1 md:col-span-4 p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-corporate-accent transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-foreground/60 line-clamp-1">
                    {project.short}
                  </p>
                </div>

                {/* Tech Preview (Pega as 3 primeiras) */}
                <div className="col-span-1 md:col-span-3 p-6 flex flex-wrap gap-2 items-center justify-start md:justify-end">
                   {project.tech.slice(0, 3).map(t => (
                     <span key={t} className="text-[10px] font-mono uppercase border border-corporate-border bg-background px-2 py-1 text-foreground/60">
                       {t}
                     </span>
                   ))}
                   {project.tech.length > 3 && (
                     <span className="text-[10px] text-foreground/40">+{project.tech.length - 3}</span>
                   )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* AnimatePresence para o Modal */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal project={selectedProject} onClose={closeModal} />
            )}
          </AnimatePresence>

        </section>
    )
}