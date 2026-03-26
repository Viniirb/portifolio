'use client'
import { useState, useRef } from 'react'
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

const PER_PAGE = 4
type AnimState = 'idle' | 'exiting' | 'entering'
type CertList = typeof certifications

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [filtered, setFiltered] = useState<CertList>(certifications)
  const [displayed, setDisplayed] = useState<CertList>(() => certifications.slice(0, PER_PAGE))
  const [animState, setAnimState] = useState<AnimState>('idle')

  const filteredRef = useRef<CertList>(certifications)
  const pageRef = useRef(0)
  const lockRef = useRef(false)

  const categories = ['all', ...Array.from(new Set(certifications.map((c) => c.category)))]
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const start = currentPage * PER_PAGE + 1
  const end = Math.min((currentPage + 1) * PER_PAGE, filtered.length)

  function doTransition(newFiltered: CertList, newPage: number) {
    if (lockRef.current) return
    lockRef.current = true
    filteredRef.current = newFiltered
    pageRef.current = newPage
    setAnimState('exiting')
    setTimeout(() => {
      const slice = newFiltered.slice(newPage * PER_PAGE, (newPage + 1) * PER_PAGE)
      setDisplayed(slice)
      setCurrentPage(newPage)
      setFiltered(newFiltered)
      setAnimState('entering')
      setTimeout(() => {
        setAnimState('idle')
        lockRef.current = false
      }, 300 + PER_PAGE * 55)
    }, 220)
  }

  function handleFilter(cat: string) {
    if (lockRef.current) return
    const newFiltered = cat === 'all' ? certifications : certifications.filter((c) => c.category === cat)
    setActiveCategory(cat)
    doTransition(newFiltered, 0)
  }

  function navigate(dir: number) {
    if (lockRef.current) return
    const next = pageRef.current + dir
    const total = Math.ceil(filteredRef.current.length / PER_PAGE)
    if (next < 0 || next >= total) return
    doTransition(filteredRef.current, next)
  }

  function goToPage(p: number) {
    if (lockRef.current || p === pageRef.current) return
    doTransition(filteredRef.current, p)
  }

  return (
    <section id="certificacoes" className="h-full flex flex-col py-6 sm:py-8 px-6 max-w-6xl mx-auto w-full">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">// certificações</span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="flex items-end gap-4 mt-4 mb-4">
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

      {/* Carousel */}
      <div className="relative flex-1 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80"
          aria-label="Anterior"
        >
          ‹
        </button>

        <div className="flex gap-3 mx-10 overflow-hidden">
          {displayed.map((cert, i) => (
            <div
              key={`${cert.id}-${currentPage}-${activeCategory}`}
              className={`flex-shrink-0 ${
                animState === 'exiting'
                  ? 'cert-exit-left'
                  : animState === 'entering'
                  ? 'cert-enter-right'
                  : ''
              }`}
              style={animState === 'entering' ? { animationDelay: `${i * 55}ms` } : undefined}
            >
              {/* Flip card */}
              <div
                className="w-[190px] h-[130px] cursor-pointer group"
                style={{ perspective: '900px' }}
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'rotateY(180deg)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = ''
                  }}
                >
                  {/* Front: category · title · date */}
                  <div
                    className="absolute inset-0 rounded-xl p-3.5 flex flex-col gap-1.5 border"
                    style={{
                      backfaceVisibility: 'hidden',
                      borderColor: 'rgba(167,139,250,0.35)',
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(76,29,149,0.1))',
                    }}
                  >
                    <span className="font-mono text-[9px] text-purple-glow uppercase tracking-[1.5px]">
                      {CAT_SHORT[cert.category] ?? cert.category}
                    </span>
                    <p className="text-xs font-semibold text-white leading-snug line-clamp-3 flex-1">
                      {cert.title}
                    </p>
                    <span className="font-mono text-[10px] text-white-dim mt-auto">
                      {cert.date}
                    </span>
                  </div>

                  {/* Back: institution (purple) · title · badge */}
                  <div
                    className="absolute inset-0 rounded-xl p-3.5 flex flex-col justify-between border"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderColor: 'rgba(124,58,237,0.2)',
                      background: 'rgba(124,58,237,0.07)',
                    }}
                  >
                    <span
                      className="text-[15px] font-bold truncate"
                      style={{ color: '#a78bfa' }}
                    >
                      {cert.institution}
                    </span>
                    <p className="text-[11px] text-white-muted leading-snug line-clamp-3 flex-1 my-1.5">
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
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80"
          aria-label="Próximo"
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
            className={`h-1 rounded-sm transition-all ${
              i === currentPage
                ? 'w-4 bg-purple-glow'
                : 'w-1.5'
            }`}
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
