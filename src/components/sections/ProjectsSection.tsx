'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon, GitBranchIcon, StarIcon } from '@phosphor-icons/react'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { TechChip, TechTile } from '@/components/ui/TechIcon'
import { deliveries, openSourceCase } from '@/constants/cases'
import { projects } from '@/constants/projects'
import { getTechIconLabel } from '@/lib/tech-icon-registry'
import { useL, useLang, useT } from '@/i18n'
import type { Project } from '@/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

// One card per company and role. The card is the summary; the modal holds every description.
export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null)
  const t = useT().projects
  const l = useL()
  const { lang } = useLang()

  return (
    <section id="projetos" className="min-h-full flex flex-col justify-center py-6 px-6 max-w-7xl mx-auto w-full">
      <SectionReveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
          {t.titlePre}<span className="text-gradient">{t.titleEm}</span>
        </h2>
      </SectionReveal>

      <div className="mb-3 flex items-center gap-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-white-muted">{t.professional}</h3>
        <div className="h-px flex-1 bg-linear-to-r from-purple-subtle to-transparent" />
      </div>

      <motion.ul
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.li key={project.id} variants={itemVariants} whileHover={{ y: -3 }} className="flex">
            <button
              type="button"
              onClick={() => setSelected(project)}
              aria-label={t.viewDetails(project.company)}
              className="glass-card glow-border group flex w-full flex-col gap-2 rounded-xl p-4 text-left"
            >
              <span className="font-mono text-xs text-white-muted">{project.period && l(project.period)}</span>
              <span className="flex items-center gap-2 font-display text-base font-bold leading-tight text-white">
                {project.company}
                {project.award && (
                  <StarIcon
                    weight="fill"
                    className="h-4 w-4 shrink-0 text-amber-400"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(251,191,36,0.7))' }}
                    aria-label={l(project.award.label)}
                  />
                )}
              </span>
              <span className="font-mono text-xs leading-snug text-purple-glow">{l(project.title)}</span>

              <ul className="mt-1 space-y-1.5">
                {(deliveries[project.id] ? l(deliveries[project.id]) : []).map((item) => (
                  <li key={item} className="flex gap-1.5 text-xs leading-snug text-white-muted">
                    <CheckIcon weight="bold" className="mt-0.5 h-3 w-3 shrink-0 text-purple-glow" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <span className="mt-auto flex items-center justify-between pt-3">
                <span className="flex gap-1.5">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span key={tech} title={getTechIconLabel(tech, lang)}>
                      <TechTile tech={tech} size={24} />
                    </span>
                  ))}
                </span>
                <ArrowUpRightIcon
                  weight="bold"
                  className="h-4 w-4 text-white-dim transition-colors group-hover:text-purple-glow"
                  aria-hidden="true"
                />
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mb-3 mt-7 flex items-center gap-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400">{t.openSource}</h3>
        <div className="h-px flex-1 bg-linear-to-r from-emerald-400/50 to-transparent" />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-5 rounded-xl border border-emerald-400/40 bg-emerald-400/5 p-4 transition-shadow hover:shadow-[0_0_22px_rgba(52,211,153,0.18)] md:grid-cols-[1.2fr_1fr] md:p-5"
      >
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-0.5 font-mono text-xs text-bg-primary">
            <GitBranchIcon weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
            {l(openSourceCase.status)}
          </span>
          <h4 className="font-display text-xl font-bold tracking-tight text-white">{openSourceCase.repo}</h4>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white-muted">{l(openSourceCase.summary)}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {openSourceCase.tech.map((tech) => (
              <TechChip key={tech} tech={tech} />
            ))}
            <a
              href={openSourceCase.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 underline underline-offset-4 hover:text-white"
            >
              {t.viewPr}
              <ArrowUpRightIcon weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <ul className="space-y-2 self-start">
          {l(openSourceCase.steps).map((step) => (
            <li key={step} className="flex gap-2 text-sm leading-snug text-white-muted">
              <CheckIcon weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </motion.article>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
