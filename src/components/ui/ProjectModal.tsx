'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { getTechIconComponent, getTechIconLabel } from '@/lib/tech-icon-registry'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

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
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
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
            className="fixed bottom-0 left-0 right-0 z-101 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-purple-subtle"
            style={{ background: '#0f0f1a' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{project.company}</h2>
                  <p className="text-purple-glow font-mono text-sm mt-1">{project.title}</p>
                  <span className="font-mono text-xs text-white-dim mt-1 block">{project.period}</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-white-dim hover:text-white transition-colors p-1"
                  aria-label="Fechar"
                >
                  <X weight="bold" className="w-6 h-6" />
                </button>
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

                    return (
                      <div key={tech} className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-lg">
                        <IconComponent size={16} className="w-4 h-4" aria-hidden="true" />
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
