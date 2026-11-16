'use client'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StarIcon, XIcon } from '@phosphor-icons/react'
import { TechChip } from '@/components/ui/TechIcon'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

// Opens from a project card with everything that was done in that job.
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (project) {
      returnFocus.current = document.activeElement as HTMLElement
      closeRef.current?.focus()
    } else {
      returnFocus.current?.focus()
      returnFocus.current = null
    }
  }, [project])

  useEffect(() => {
    const el = document.getElementById('spa-scroll')
    if (!el) return
    el.style.overflow = project ? 'hidden' : ''
    return () => {
      el.style.overflow = ''
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-100 bg-bg-primary/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes: ${project.company}`}
            className="fixed inset-0 z-101 flex p-4"
            onClick={onClose}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative m-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-purple-subtle bg-bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-purple-subtle text-white-muted transition-colors hover:border-purple-glow hover:text-white"
                aria-label="Fechar"
              >
                <XIcon weight="bold" className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8">
                <p className="font-mono text-xs text-white-muted">{project.period}</p>
                <h2 className="mt-1 pr-10 font-display text-2xl font-bold text-white sm:text-3xl">{project.company}</h2>
                <p className="mt-1 font-mono text-sm text-purple-glow">{project.title}</p>

                {project.award && (
                  <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-amber-400">
                    <StarIcon weight="fill" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {project.award.label}, {project.award.detail}
                    </span>
                  </p>
                )}

                <ul className="mt-6 space-y-3">
                  {project.description.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white-muted">
                      <span className="mt-0.5 shrink-0 text-purple-glow" aria-hidden="true">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-white-dim">
                  Stack utilizada
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <TechChip tech={tech} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
