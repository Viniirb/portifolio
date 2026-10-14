'use client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ArrowsOutSimpleIcon, XIcon } from '@phosphor-icons/react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { certifications } from '@/constants/certifications'
import type { Certification } from '@/types'

const CAT_LABELS: Record<string, string> = {
  featured: 'Destaques',
  all: 'Todas',
  cybersecurity: 'Cibersegurança',
  development: 'Desenvolvimento',
  cloud: 'Cloud',
  networking: 'Redes',
  neuralnetworks: 'IA / Redes Neurais',
  community: 'Comunidade & Eventos',
  other: 'Outros',
}

const CAT_SHORT: Record<string, string> = {
  featured: 'Destaques',
  all: 'Todas',
  cybersecurity: 'Ciberseg.',
  development: 'Dev',
  cloud: 'Cloud',
  neuralnetworks: 'IA',
  community: 'Evento',
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
  onOpen: (cert: Certification) => void
}

function CertCard({ cert, onOpen }: CertCardProps) {
  const hasImage = Boolean(cert.image)
  const moduleCount = cert.modules?.length ?? 0

  return (
    <motion.button
      type="button"
      variants={cardVariants}
      onClick={() => hasImage && onOpen(cert)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative block w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl border border-purple-subtle/40 bg-bg-surface text-left transition-colors hover:border-purple-glow/70 ${
        hasImage ? 'cursor-pointer' : 'cursor-default'
      }`}
      aria-label={hasImage ? `Ampliar certificado: ${cert.title}` : cert.title}
    >
      {hasImage ? (
        <Image
          src={cert.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top opacity-50 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
        />
      ) : (
        <span
          className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-white/5 select-none"
          aria-hidden="true"
        >
          {cert.institution.slice(0, 2).toUpperCase()}
        </span>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-purple-glow">
          {cert.institution} · {CAT_SHORT[cert.category] ?? cert.category}
        </span>
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{cert.title}</p>
        <span className="font-mono text-[11px] text-white-muted">
          {cert.date}
          {moduleCount > 0 && <span className="text-purple-glow"> · {moduleCount} {moduleCount === 1 ? 'módulo' : 'módulos'}</span>}
        </span>
      </div>

      {hasImage && (
        <ArrowsOutSimpleIcon
          weight="bold"
          className="absolute right-3 top-3 h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-80"
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}

function CertLightbox({ cert, onClose }: { cert: Certification | null; onClose: () => void }) {
  useEffect(() => {
    if (!cert) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cert, onClose])

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificado: ${cert.title}`}
        >
          <motion.div
            className="relative m-auto w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={cert.image}
              alt={`Certificado ${cert.title} — ${cert.institution}`}
              width={1200}
              height={900}
              className="mx-auto h-auto max-h-[55vh] w-auto max-w-full rounded-lg border border-purple-subtle/50 object-contain shadow-2xl"
              priority
            />
            {cert.modules && (
              <div className="mt-4 rounded-lg border border-purple-subtle/50 bg-bg-surface/80 p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-purple-glow">
                  {cert.modules.length} {cert.modules.length === 1 ? 'curso' : 'cursos'} da formação
                </p>
                <ul className="grid max-h-48 grid-cols-1 gap-x-6 gap-y-1.5 overflow-y-auto pr-2 sm:grid-cols-2">
                  {cert.modules.map((m) => (
                    <li key={m.title} className="flex justify-between gap-3 text-xs text-white-muted">
                      <span className="leading-snug">{m.title}</span>
                      <span className="shrink-0 font-mono text-[10px] text-white-dim">{m.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold text-white">{cert.title}</p>
                <p className="font-mono text-xs text-white-muted">
                  {cert.institution} · {cert.date}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-purple-subtle/60 p-2 text-white-muted transition-colors hover:border-purple-glow hover:text-white"
                aria-label="Fechar"
              >
                <XIcon weight="bold" className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function CertificationsSection() {
  const totalCount = certifications.reduce((n, c) => n + 1 + (c.modules?.length ?? 0), 0)
  const [activeCategory, setActiveCategory] = useState('featured')
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selected, setSelected] = useState<Certification | null>(null)
  const closeLightbox = useCallback(() => setSelected(null), [])
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
      : activeCategory === 'featured'
        ? certifications.filter((c) => c.featured)
        : certifications.filter((c) => c.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const displayed = filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
  const categories = ['featured', 'all', ...Array.from(new Set(certifications.map((c) => c.category)))]

  const start = currentPage * PER_PAGE + 1
  const end = Math.min((currentPage + 1) * PER_PAGE, filtered.length)
  const isFirst = currentPage === 0
  const isLast = totalPages === 0 || currentPage >= totalPages - 1

  function handleFilter(cat: string) {
    if (cat === activeCategory) return
    setDirection(1)
    setCurrentPage(0)
    setActiveCategory(cat)
  }

  function navigate(dir: number) {
    const next = currentPage + dir
    if (next < 0 || next >= totalPages) return
    setDirection(dir > 0 ? 1 : -1)
    setCurrentPage(next)
  }

  function goToPage(p: number) {
    if (p === currentPage) return
    setDirection(p > currentPage ? 1 : -1)
    setCurrentPage(p)
  }

  const dir = prefersReducedMotion ? 0 : direction

  return (
    <section
      id="certificacoes"
      className="min-h-full flex flex-col py-6 sm:py-8 px-6 max-w-6xl mx-auto w-full"
    >
      <SectionReveal delay={0.1}>
        <div className="flex items-end gap-4 mt-4 mb-2">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">{totalCount}+</span>
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
          className="hidden sm:flex shrink-0 w-11 h-11 items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80 disabled:opacity-25 disabled:cursor-not-allowed text-lg"
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
                <CertCard key={cert.id} cert={cert} onOpen={setSelected} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={isLast}
          className="hidden sm:flex shrink-0 w-11 h-11 items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80 disabled:opacity-25 disabled:cursor-not-allowed text-lg"
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

      <div className="sm:hidden flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          disabled={isFirst}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white disabled:opacity-25 text-lg"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={() => navigate(1)}
          disabled={isLast}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white disabled:opacity-25 text-lg"
          aria-label="Próximo"
        >
          ›
        </button>
      </div>

      <p
        className="font-mono text-[10px] text-center mt-3"
        style={{ color: 'rgba(74,74,106,0.7)' }}
      >
        mostrando {start}–{end} de {filtered.length}
        {activeCategory !== 'all' ? (activeCategory === 'featured' ? ' destaques' : ' nesta categoria') : ''}
      </p>
      <CertLightbox cert={selected} onClose={closeLightbox} />
    </section>
  )
}