'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { certifications } from '@/constants/certifications'
import type { Certification } from '@/types'

const CAT_LABELS: Record<string, string> = {
  all: 'Todos',
  cybersecurity: 'Cibersegurança',
  development: 'Desenvolvimento',
  cloud: 'Cloud',
  networking: 'Redes',
  neuralnetworks: 'IA / Redes Neurais',
  other: 'Outros',
}

const CAT_SHORT: Record<string, string> = {
  all: 'Todos',
  cybersecurity: 'Ciberseg.',
  development: 'Dev',
  cloud: 'Cloud',
  neuralnetworks: 'IA',
  networking: 'Redes',
  other: 'Outros',
}

const PER_PAGE = 6

const pageVariants: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -36,
    transition: { duration: 0.18, ease: [0.55, 0, 1, 0.45] },
  }),
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 26 },
  },
  exit: { opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.14 } },
}

interface CertCardProps {
  cert: Certification
  isFlipped: boolean
  onFlip: () => void
}

function CertCard({ cert, isFlipped, onFlip }: CertCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 900 }}
      className="cursor-pointer select-none"
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onFlip()
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Virar card: ${cert.title}`}
      whileHover={{ scale: 1.025, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', position: 'relative', height: '11rem' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      >
        <div
          className="absolute inset-0 rounded-xl p-4 flex flex-col gap-2 border"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderColor: 'rgba(167,139,250,0.30)',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.16) 0%, rgba(76,29,149,0.07) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-purple-glow uppercase tracking-[1.5px]">
              {CAT_SHORT[cert.category] ?? cert.category}
            </span>
            <span className="font-mono text-[9px] text-white-dim/40">↩ virar</span>
          </div>

          <p className="text-sm font-semibold text-white leading-snug flex-1 line-clamp-3">
            {cert.title}
          </p>

          <span className="font-mono text-[10px] text-white-dim mt-auto">
            {cert.date}
          </span>

          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.06) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div
          className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between border"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: 'rgba(124,58,237,0.22)',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(76,29,149,0.06) 100%)',
          }}
        >
          <span className="text-[15px] font-bold truncate" style={{ color: '#a78bfa' }}>
            {cert.institution}
          </span>

          <p className="text-[11px] text-white-muted leading-relaxed line-clamp-4 flex-1 my-2">
            {cert.title}
          </p>

          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded-full self-start border"
            style={{
              color: '#7c3aed',
              background: 'rgba(124,58,237,0.15)',
              borderColor: 'rgba(124,58,237,0.3)',
            }}
          >
            {CAT_SHORT[cert.category] ?? cert.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set())
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const filtered =
    activeCategory === 'all'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const displayed = filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
  const categories = ['all', ...Array.from(new Set(certifications.map((c) => c.category)))]

  const start = currentPage * PER_PAGE + 1
  const end = Math.min((currentPage + 1) * PER_PAGE, filtered.length)
  const isFirst = currentPage === 0
  const isLast = totalPages === 0 || currentPage >= totalPages - 1

  function handleFilter(cat: string) {
    if (cat === activeCategory) return
    setDirection(1)
    setCurrentPage(0)
    setFlippedIds(new Set())
    setActiveCategory(cat)
  }

  function navigate(dir: number) {
    const next = currentPage + dir
    if (next < 0 || next >= totalPages) return
    setDirection(dir > 0 ? 1 : -1)
    setFlippedIds(new Set())
    setCurrentPage(next)
  }

  function goToPage(p: number) {
    if (p === currentPage) return
    setDirection(p > currentPage ? 1 : -1)
    setFlippedIds(new Set())
    setCurrentPage(p)
  }

  function toggleFlip(certId: string) {
    setFlippedIds((prev) => {
      const next = new Set(prev)
      if (next.has(certId)) next.delete(certId)
      else next.add(certId)
      return next
    })
  }

  const dir = prefersReducedMotion ? 0 : direction

  return (
    <section
      id="certificacoes"
      className="h-full flex flex-col py-6 sm:py-8 px-6 max-w-6xl mx-auto w-full"
    >
      <SectionReveal delay={0.1}>
        <div className="flex items-end gap-4 mt-12 mb-2">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">{certifications.length}+</span>
          </h2>
          <p className="text-white-muted font-mono text-sm mb-2">certificações técnicas</p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div
          className="flex gap-0 border-b border-purple-subtle/30 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`font-mono text-xs px-4 py-2 whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeCategory === cat
                  ? 'text-white border-purple-glow'
                  : 'text-white-muted border-transparent hover:text-white'
              }`}
            >
              {CAT_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      <div className="relative flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          disabled={isFirst}
          className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80 disabled:opacity-25 disabled:cursor-not-allowed text-lg"
          aria-label="Anterior"
        >
          ‹
        </button>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              custom={dir}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {displayed.map((cert) => (
                <CertCard
                  key={cert.id}
                  cert={cert}
                  isFlipped={flippedIds.has(cert.id)}
                  onFlip={() => toggleFlip(cert.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={isLast}
          className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80 disabled:opacity-25 disabled:cursor-not-allowed text-lg"
          aria-label="Próximo"
        >
          ›
        </button>
      </div>

      <div className="flex gap-1.5 justify-center mt-5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentPage
                ? 'w-6 bg-purple-glow'
                : 'w-2 hover:bg-purple-subtle'
            }`}
            style={i !== currentPage ? { background: 'rgba(124,58,237,0.3)' } : undefined}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>

      <p
        className="font-mono text-[10px] text-center mt-3"
        style={{ color: 'rgba(74,74,106,0.7)' }}
      >
        mostrando {start}–{end} de {filtered.length}
        {activeCategory !== 'all' ? ' nesta categoria' : ''}
      </p>
    </section>
  )
}