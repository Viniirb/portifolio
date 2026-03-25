'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { projects } from '@/constants/projects'
import { techIcons } from '@/constants/tech-icons'
import type { TechKey } from '@/types'

// Chronological order (oldest → newest)
const chronological = [...projects].reverse()

const yearLabels = ['Set 2021', 'Nov 2023', 'Dez 2023', 'Fev 2025']

interface CardProps {
  project: (typeof projects)[0]
  isOpen: boolean
  onToggle: () => void
}

function ExpCard({ project, isOpen, onToggle }: CardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: 'rgba(124,58,237,0.06)',
        border: `1px solid ${isOpen ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)'}`,
        boxShadow: isOpen ? '0 0 20px rgba(124,58,237,0.15)' : 'none',
      }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between gap-2 p-3 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">{project.company}</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: '#a78bfa' }}>
            {project.title}
          </p>
          <span
            className="inline-block font-mono text-[9px] mt-1 px-1.5 py-0.5 rounded"
            style={{ color: '#6b7280', background: 'rgba(124,58,237,0.15)' }}
          >
            {project.period}
          </span>
        </div>

        {/* Toggle button — CSS cross, rotates to × when open */}
        <button
          aria-label={isOpen ? 'Fechar' : 'Expandir'}
          className="shrink-0 rounded-full relative transition-all duration-300"
          style={{
            width: 22,
            height: 22,
            border: '1px solid rgba(124,58,237,0.5)',
            background: isOpen ? 'rgba(124,58,237,0.25)' : 'transparent',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
          onClick={(e) => { e.stopPropagation(); onToggle() }}
        >
          <span
            className="absolute"
            style={{
              top: '50%', left: '50%',
              width: 10, height: 1.5,
              background: '#a78bfa',
              transform: 'translate(-50%, -50%)',
              borderRadius: 1,
            }}
          />
          <span
            className="absolute"
            style={{
              top: '50%', left: '50%',
              width: 1.5, height: 10,
              background: '#a78bfa',
              transform: 'translate(-50%, -50%)',
              borderRadius: 1,
            }}
          />
        </button>
      </div>

      {/* Expandable body */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? 200 : 0 }}
      >
        <div
          className="px-3 pb-3 pt-2 text-[10px] leading-relaxed"
          style={{
            borderTop: '1px solid rgba(124,58,237,0.2)',
            color: '#94a3b8',
          }}
        >
          {project.short}
        </div>
        <div className="flex flex-wrap gap-1.5 px-3 pb-3">
          {project.tech.slice(0, 5).map((tech) => {
            const icon = techIcons[tech as TechKey]
            if (!icon) return null
            return (
              <div key={tech} className="w-4 h-4 relative" title={icon.alt}>
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  fill
                  className="object-contain"
                  style={icon.invertOnDark ? { filter: 'brightness(0) invert(1)' } : undefined}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section
      id="experiencia"
      className="h-full flex flex-col justify-center py-8 sm:py-10 px-6 max-w-6xl mx-auto w-full"
    >
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // trajetória
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-8">
          Minha <span className="text-gradient">Experiência</span>
        </h2>
      </SectionReveal>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        {/* TOP CARDS — even indices: Inovvati (0), EOS (2) */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {chronological.map((p, i) =>
            i % 2 === 0 ? (
              <ExpCard
                key={p.id}
                project={p}
                isOpen={openId === p.id}
                onToggle={() => toggle(p.id)}
              />
            ) : (
              <div key={p.id} />
            )
          )}
        </div>

        {/* LINE ROW */}
        <div className="relative grid grid-cols-4 gap-4 items-center">
          {/* Glow line behind dots */}
          <div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 5%, rgba(124,58,237,0.4) 95%, transparent)',
              boxShadow: '0 0 12px rgba(124,58,237,0.3)',
            }}
          />

          {chronological.map((p, i) => {
            const isTop = i % 2 === 0
            const isOpen = openId === p.id
            return (
              <div key={p.id} className="flex flex-col items-center relative z-10">
                {/* Tick above — visible for top cards */}
                <div
                  className="w-px"
                  style={{
                    height: 20,
                    background: 'rgba(124,58,237,0.35)',
                    visibility: isTop ? 'visible' : 'hidden',
                  }}
                />

                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-[10px]" style={{ color: '#6b7280' }}>
                    {yearLabels[i]}
                  </span>
                  <button
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: 14,
                      height: 14,
                      background: isOpen ? '#a78bfa' : '#7c3aed',
                      boxShadow: isOpen
                        ? '0 0 20px rgba(167,139,250,0.8)'
                        : '0 0 12px rgba(124,58,237,0.6)',
                      transform: isOpen ? 'scale(1.3)' : 'scale(1)',
                    }}
                    onClick={() => toggle(p.id)}
                    aria-label={`Ver ${p.company}`}
                  />
                </div>

                {/* Tick below — visible for bottom cards */}
                <div
                  className="w-px"
                  style={{
                    height: 20,
                    background: 'rgba(124,58,237,0.35)',
                    visibility: isTop ? 'hidden' : 'visible',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* BOTTOM CARDS — odd indices: Blump (1), NTec (3) */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {chronological.map((p, i) =>
            i % 2 !== 0 ? (
              <ExpCard
                key={p.id}
                project={p}
                isOpen={openId === p.id}
                onToggle={() => toggle(p.id)}
              />
            ) : (
              <div key={p.id} />
            )
          )}
        </div>
      </motion.div>
    </section>
  )
}
