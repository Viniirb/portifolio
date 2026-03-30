'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { getTechIconComponent, getTechIconLabel } from '@/lib/tech-icon-registry'
import Image from 'next/image'
import { getLegacyTechIcon } from '@/lib/legacy-tech-icons'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (project) {
      previousFocusRef.current = document.activeElement as HTMLElement
      closeBtnRef.current?.focus()
    } else {
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [project])

  useEffect(() => {
    const el = document.getElementById('spa-scroll')
    if (!el) return
    el.style.overflow = project ? 'hidden' : ''
    return () => { el.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-100 backdrop-blur-sm"
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
            className="fixed inset-0 z-101 flex items-center justify-center"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="relative w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border border-purple-subtle shadow-2xl bg-bg-surface">
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="absolute top-4 right-4 text-white-dim hover:text-white transition-colors p-2 z-10"
                aria-label="Fechar"
              >
                <X weight="bold" className="w-7 h-7" />
              </button>
              <div className="flex flex-col gap-2 mb-6">
                <h2 className="font-display text-2xl font-bold text-white">{project.company}</h2>
                <p className="text-purple-glow font-mono text-sm mt-1">{project.title}</p>
                <span className="font-mono text-xs text-white-dim mt-1 block">{project.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {project.description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white-muted text-sm leading-relaxed">
                    <span className="text-purple-glow mt-0.5 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <p className="font-mono text-xs text-white-dim uppercase tracking-widest mb-3">
                  Stack utilizada
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => {
                    const IconComponent = getTechIconComponent(tech)
                    const label = getTechIconLabel(tech)
                    const legacyIcon = getLegacyTechIcon(tech)

                    return (
                      <div key={tech} className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-lg">
                        {legacyIcon ? (
                          <Image
                            src={legacyIcon.src}
                            alt={legacyIcon.alt}
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                            style={legacyIcon.invertOnDark ? { filter: 'brightness(0) invert(1)' } : undefined}
                            aria-hidden="true"
                          />
                        ) : (
                          <IconComponent size={16} className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span className="font-mono text-xs text-white-muted">{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
