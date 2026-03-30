'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { projects } from '@/constants/projects'
import { getTechIconComponent, getTechIconLabel } from '@/lib/tech-icon-registry'
import Image from 'next/image'
import { getLegacyTechIcon } from '@/lib/legacy-tech-icons'
import type { Project } from '@/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projetos" className="h-full flex flex-col justify-center py-6 px-6 max-w-6xl mx-auto">
      <SectionReveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
          O que eu <span className="text-gradient">Construí</span>
        </h2>
      </SectionReveal>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project) => {

          // Exibe todos os ícones de tecnologia
          const visibleTech = project.tech
          const remaining = 0

          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass-card glow-border rounded-xl p-6 flex flex-col gap-4 group cursor-pointer"
              style={{ borderLeftWidth: '3px', borderLeftColor: 'rgba(167,139,250,0.5)' }}
              onClick={() => setSelected(project)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalhes de ${project.company}`}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelected(project) }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-xl">{project.company}</h3>
                  <p className="text-purple-glow font-mono text-sm mt-0.5">{project.title}</p>
                </div>
                <ArrowUpRightIcon
                  weight="bold"
                  className="w-5 h-5 text-white-dim group-hover:text-purple-glow transition-colors shrink-0 mt-1"
                />
              </div>

              <span className="font-mono text-xs text-white-dim bg-purple-deep/50 px-2 py-1 rounded w-fit">
                {project.period}
              </span>

              <p className="text-white-muted text-sm leading-relaxed flex-1">{project.short}</p>

              <div className="flex items-center gap-1.5">
                {visibleTech.map((tech) => {
                  const IconComponent = getTechIconComponent(tech)
                  const label = getTechIconLabel(tech)
                  const legacyIcon = getLegacyTechIcon(tech)

                  return (
                    <div key={tech} className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" title={label}>
                      {legacyIcon ? (
                        <Image
                          src={legacyIcon.src}
                          alt={legacyIcon.alt}
                          width={18}
                          height={18}
                          className="w-5 h-5 object-contain"
                          style={legacyIcon.invertOnDark ? { filter: 'brightness(0) invert(1)' } : undefined}
                          aria-hidden="true"
                        />
                      ) : (
                        <IconComponent size={18} className="w-5 h-5" aria-hidden="true" />
                      )}
                    </div>
                  )
                })}
                {remaining > 0 && (
                  <span className="font-mono text-xs text-white-dim">+{remaining}</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
