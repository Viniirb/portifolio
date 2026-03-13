// src/components/sections/CertificationsSection.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { certifications } from '@/constants/certifications'

const categoryLabels: Record<string, string> = {
  all: 'Todos',
  cybersecurity: 'Cibersegurança',
  development: 'Desenvolvimento',
  cloud: 'Cloud',
  networking: 'Redes',
  neuralnetworks: 'IA / Redes Neurais',
  other: 'Outros',
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const duration = 1500
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}</span>
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(certifications.map((c) => c.category)))]
  const filtered =
    activeCategory === 'all'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory)

  return (
    <section id="certificacoes" className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // certificações
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="flex items-end gap-4 mt-4 mb-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">
              <Counter target={certifications.length} />+
            </span>
          </h2>
          <p className="text-white-muted font-mono text-sm mb-2">certificações técnicas</p>
        </div>
      </SectionReveal>

      {/* Filter bar */}
      <SectionReveal delay={0.2}>
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-purple-glow border-purple-glow text-white'
                  : 'border-purple-subtle/50 text-white-muted hover:border-purple-glow hover:text-white'
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      <motion.div
        key={activeCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="glass-card rounded-lg p-4 glow-border group"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-glow mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium leading-tight">
                  {cert.title}
                </p>
                <p className="text-white-dim font-mono text-xs mt-1">
                  {cert.institution} · {cert.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
