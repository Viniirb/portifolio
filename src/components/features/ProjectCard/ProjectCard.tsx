'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, X, CalendarBlankIcon, BriefcaseIcon } from '@phosphor-icons/react'
import type { Project } from '@/types/project'
import { techIcons } from '@/constants/tech-icons'

interface ProjectCardProps {
  project: Project
}

const ProjectModal = React.memo(({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-corporate-dark shadow-2xl flex flex-col"
      >
        {/* Header */}
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

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40">Sobre o Projeto</h4>
            <div className="text-foreground/70 leading-relaxed space-y-4">
              {project.description.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          </div>

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

        {/* Footer */}
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
ProjectModal.displayName = 'ProjectModal'

export function ProjectCard({ project }: ProjectCardProps) {
  const [showModal, setShowModal] = useState(false)
  const closeModal = useCallback(() => setShowModal(false), [])

  const previewTechs = project.tech.slice(0, 4)
  const remainingCount = project.tech.length - previewTechs.length

  return (
    <>
      <motion.div
        onClick={() => setShowModal(true)}
        whileHover={{ y: -4 }}
        className="group relative flex flex-col border border-corporate-border bg-background hover:bg-corporate-gray/30 cursor-pointer transition-colors duration-200 h-full"
      >
        {/* Card Header */}
        <div className="p-6 border-b border-corporate-border">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider">
              {project.period || "N/A"}
            </span>
            <ArrowUpRightIcon className="w-5 h-5 text-foreground/30 group-hover:text-corporate-accent transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-1 group-hover:text-corporate-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-foreground/60">{project.company}</p>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1">
          <p className="text-sm text-foreground/50 leading-relaxed line-clamp-3">
            {project.short}
          </p>
        </div>

        {/* Card Footer - Tech Preview */}
        <div className="p-6 pt-0 flex flex-wrap gap-2">
          {previewTechs.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono uppercase border border-corporate-border bg-corporate-gray/20 px-2 py-1 text-foreground/50"
            >
              {t}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-[10px] text-foreground/40">+{remainingCount}</span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <ProjectModal project={project} onClose={closeModal} />}
      </AnimatePresence>
    </>
  )
}

export default ProjectCard
