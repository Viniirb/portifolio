'use client'
import { useEffect, useRef, useState } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { certifications } from '@/constants/certifications'

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

const PER_PAGE = 10
type AnimState = 'idle' | 'exiting' | 'entering'
type AnimDirection = -1 | 0 | 1
type CertList = typeof certifications

const ITEM_EXIT_STAGGER_MS = 18
const ITEM_ENTER_STAGGER_MS = 34
const CAROUSEL_EXIT_BASE_MS = 320
const CAROUSEL_ENTER_BASE_MS = 680

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [filtered, setFiltered] = useState<CertList>(certifications)
  const [displayed, setDisplayed] = useState<CertList>(() => certifications.slice(0, PER_PAGE))
  const [animState, setAnimState] = useState<AnimState>('idle')
  const [animDirection, setAnimDirection] = useState<AnimDirection>(1)
  const [flippedIds, setFlippedIds] = useState<Set<string>>(() => new Set())
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const filteredRef = useRef<CertList>(certifications)
  const pageRef = useRef(0)
  const lockRef = useRef(false)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const categories = ['all', ...Array.from(new Set(certifications.map((c) => c.category)))]
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const start = currentPage * PER_PAGE + 1
  const end = Math.min((currentPage + 1) * PER_PAGE, filtered.length)
  const isTransitioning = animState !== 'idle'
  const isFirstPage = currentPage === 0
  const isLastPage = totalPages === 0 || currentPage >= totalPages - 1

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  function doTransition(newFiltered: CertList, newPage: number, direction: AnimDirection) {
    if (lockRef.current) return

    const slice = newFiltered.slice(newPage * PER_PAGE, (newPage + 1) * PER_PAGE)

    if (prefersReducedMotion) {
      filteredRef.current = newFiltered
      pageRef.current = newPage
      setFlippedIds(new Set())
      setDisplayed(slice)
      setCurrentPage(newPage)
      setFiltered(newFiltered)
      setAnimDirection(direction)
      setAnimState('idle')
      lockRef.current = false
      return
    }

    lockRef.current = true
    filteredRef.current = newFiltered
    pageRef.current = newPage
    setAnimDirection(direction)
    setAnimState('exiting')

    const exitTotalMs = CAROUSEL_EXIT_BASE_MS + Math.max(0, displayed.length - 1) * ITEM_EXIT_STAGGER_MS
    const enterTotalMs = CAROUSEL_ENTER_BASE_MS + Math.max(0, slice.length - 1) * ITEM_ENTER_STAGGER_MS

    if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current)

    exitTimerRef.current = setTimeout(() => {
      setFlippedIds(new Set())
      setDisplayed(slice)
      setCurrentPage(newPage)
      setFiltered(newFiltered)
      setAnimState('entering')

      enterTimerRef.current = setTimeout(() => {
        setAnimState('idle')
        lockRef.current = false
        enterTimerRef.current = null
      }, enterTotalMs)

      exitTimerRef.current = null
    }, exitTotalMs)
  }

  function handleFilter(cat: string) {
    if (lockRef.current) return
    const newFiltered = cat === 'all' ? certifications : certifications.filter((c) => c.category === cat)
    setActiveCategory(cat)
    doTransition(newFiltered, 0, 1)
  }

  function navigate(dir: number) {
    if (lockRef.current) return
    const next = pageRef.current + dir
    const total = Math.ceil(filteredRef.current.length / PER_PAGE)
    if (next < 0 || next >= total) return
    doTransition(filteredRef.current, next, dir > 0 ? 1 : -1)
  }

  function goToPage(p: number) {
    if (lockRef.current || p === pageRef.current) return
    doTransition(filteredRef.current, p, p > pageRef.current ? 1 : -1)
  }

  function toggleFlip(cardId: string) {
    if (isTransitioning) return
    setFlippedIds((prev) => {
      const next = new Set(prev)
      if (next.has(cardId)) {
        next.delete(cardId)
      } else {
        next.add(cardId)
      }
      return next
    })
  }

  const carouselAnimationClass =
    animState === 'exiting'
      ? animDirection === -1
        ? 'cert-carousel-exit-prev'
        : animDirection === 1
          ? 'cert-carousel-exit-next'
          : 'cert-carousel-fade-out'
      : animState === 'entering'
        ? animDirection === -1
          ? 'cert-carousel-enter-prev'
          : animDirection === 1
            ? 'cert-carousel-enter-next'
            : 'cert-carousel-fade-in'
        : ''

  return (
    <section id="certificacoes" className="h-full flex flex-col py-6 sm:py-8 px-6 max-w-6xl mx-auto w-full">

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
              disabled={isTransitioning}
              aria-disabled={isTransitioning}
              className={`font-mono text-xs px-4 py-2 whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeCategory === cat
                  ? 'text-white border-purple-glow'
                  : 'text-white-muted border-transparent hover:text-white'
              } disabled:opacity-45 disabled:cursor-not-allowed`}
            >
              {CAT_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      <div className="relative flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="relative left z-10 w-8 h-8 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80 disabled:opacity-35 disabled:cursor-not-allowed"
          aria-label="Anterior"
          aria-disabled={isFirstPage || isTransitioning}
          disabled={isFirstPage || isTransitioning}
        >
          ‹
        </button>

        <div className="cert-carousel-stage w-full mx-auto overflow-hidden">
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 w-full transform-gpu ${carouselAnimationClass}`}>
            {displayed.map((cert, index) => {
              const isFlipped = flippedIds.has(cert.id)
              const itemAnimationClass =
                animState === 'exiting'
                  ? animDirection === -1
                    ? 'cert-item-exit-prev'
                    : 'cert-item-exit-next'
                  : animState === 'entering'
                    ? animDirection === -1
                      ? 'cert-item-enter-prev'
                      : 'cert-item-enter-next'
                    : ''
              const itemAnimationDelay =
                animState === 'entering'
                  ? `${index * ITEM_ENTER_STAGGER_MS}ms`
                  : animState === 'exiting'
                    ? `${(displayed.length - 1 - index) * ITEM_EXIT_STAGGER_MS}ms`
                    : undefined

              return (
              <div
                key={`${cert.id}-${currentPage}-${activeCategory}`}
                className={`shrink-0 ${itemAnimationClass}`}
                style={itemAnimationDelay ? { animationDelay: itemAnimationDelay } : undefined}
              >
                <div
                  className="cert-card-shell w-47.5 h-32.5 cursor-pointer"
                  data-flipped={isFlipped}
                  onClick={() => toggleFlip(cert.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleFlip(cert.id)
                    }
                  }}
                  role="button"
                  tabIndex={isTransitioning ? -1 : 0}
                  aria-disabled={isTransitioning}
                  aria-label={`Virar card da certificação ${cert.title}`}
                  aria-pressed={isFlipped}
                >
                  <div className="cert-card-core">
                    <div
                      className="cert-card-face cert-card-front absolute inset-0 rounded-xl p-3 flex flex-col gap-1 border"
                      style={{
                        borderColor: 'rgba(167,139,250,0.35)',
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(76,29,149,0.1))',
                      }}
                    >
                      <span className="relative z-10 font-mono text-[9px] text-purple-glow uppercase tracking-[1.5px]">
                        {CAT_SHORT[cert.category] ?? cert.category}
                      </span>
                      <p className="relative z-10 text-xs font-semibold text-white leading-snug line-clamp-3 flex-1">
                        {cert.title}
                      </p>
                      <span className="relative z-10 font-mono text-[10px] text-white-dim mt-auto">
                        {cert.date}
                      </span>
                      <span className="cert-card-sheen" aria-hidden="true" />
                    </div>

                    <div
                      className="cert-card-face cert-card-back absolute inset-0 rounded-xl p-3.5 flex flex-col justify-between border"
                      style={{
                        borderColor: 'rgba(124,58,237,0.2)',
                        background: 'rgba(124,58,237,0.07)',
                      }}
                    >
                      <span
                        className="relative z-10 text-[15px] font-bold truncate"
                        style={{ color: '#a78bfa' }}
                      >
                        {cert.institution}
                      </span>
                      <p className="relative z-10 text-[11px] text-white-muted leading-snug line-clamp-3 flex-1 my-1.5">
                        {cert.title}
                      </p>
                      <span
                        className="relative z-10 font-mono text-[9px] px-2 py-0.5 rounded-full self-start border"
                        style={{
                          color: '#7c3aed',
                          background: 'rgba(124,58,237,0.15)',
                          borderColor: 'rgba(124,58,237,0.3)',
                        }}
                      >
                        {CAT_SHORT[cert.category] ?? cert.category}
                      </span>
                      <span className="cert-card-sheen" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => navigate(1)}
          className="relative right z-10 w-8 h-8 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80 disabled:opacity-35 disabled:cursor-not-allowed"
          aria-label="Próximo"
          aria-disabled={isLastPage || isTransitioning}
          disabled={isLastPage || isTransitioning}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-1 justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            disabled={isTransitioning}
            aria-disabled={isTransitioning}
            className={`h-1 rounded-sm transition-all ${
              i === currentPage
                ? 'w-4 bg-purple-glow'
                : 'w-1.5'
            } disabled:opacity-45 disabled:cursor-not-allowed`}
            style={i !== currentPage ? { background: 'rgba(124,58,237,0.3)' } : undefined}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>

      <p className="font-mono text-[10px] text-center mt-2.5" style={{ color: 'rgba(74,74,106,0.7)' }}>
        mostrando {start}–{end} de {filtered.length}{activeCategory !== 'all' ? ' nesta categoria' : ''}
      </p>
    </section>
  )
}
