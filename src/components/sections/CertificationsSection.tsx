'use client'
import { useState, useRef } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'
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

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const trackRef = useRef<HTMLDivElement>(null)

  const categories = ['all', ...Array.from(new Set(certifications.map((c) => c.category)))]

  function scrollToCategory(cat: string) {
    if (!trackRef.current) return
    if (cat === 'all') {
      trackRef.current.scrollLeft = 0
      return
    }
    const card = trackRef.current.querySelector(`[data-category="${cat}"]`) as HTMLElement | null
    if (card) trackRef.current.scrollLeft = card.offsetLeft - 16
  }

  function scrollBy(direction: 'left' | 'right') {
    if (!trackRef.current) return
    const cardWidth = (trackRef.current.firstElementChild as HTMLElement)?.offsetWidth ?? 256
    trackRef.current.scrollLeft += direction === 'right' ? cardWidth + 12 : -(cardWidth + 12)
  }

  function handleTabClick(cat: string) {
    setActiveCategory(cat)
    scrollToCategory(cat)
  }

  return (
    <section id="certificacoes" className="h-full flex flex-col py-6 sm:py-8 px-6 max-w-6xl mx-auto w-full">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // certificações
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="flex items-end gap-4 mt-4 mb-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">{certifications.length}+</span>
          </h2>
          <p className="text-white-muted font-mono text-sm mb-2">certificações técnicas</p>
        </div>
      </SectionReveal>

      {/* Tab filters */}
      <SectionReveal delay={0.2}>
        <div className="flex gap-0 border-b border-purple-subtle/30 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabClick(cat)}
              className={`font-mono text-xs px-4 py-2 whitespace-nowrap transition-all border-b-2 -mb-px ${
                activeCategory === cat
                  ? 'text-white border-purple-glow'
                  : 'text-white-muted border-transparent hover:text-white'
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      {/* Carousel track with arrow buttons */}
      <div className="relative flex-1 flex items-center">
        {/* Left arrow */}
        <button
          onClick={() => scrollBy('left')}
          className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80"
          aria-label="Anterior"
        >
          ‹
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto scroll-smooth mx-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              data-category={cert.category}
              className="flex-shrink-0 w-64 glass-card rounded-lg p-4 glow-border"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-glow mt-1.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium leading-tight">
                    {cert.title}
                  </p>
                  <p className="text-white-dim font-mono text-xs mt-1">
                    {cert.institution} · {cert.date}
                  </p>
                  <span className="inline-block font-mono text-[10px] mt-2 px-2 py-0.5 rounded-full border border-purple-subtle/40 text-white-dim">
                    {categoryLabels[cert.category] ?? cert.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollBy('right')}
          className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-purple-subtle/50 text-white-muted hover:text-white hover:border-purple-glow transition-all bg-bg-primary/80"
          aria-label="Próximo"
        >
          ›
        </button>
      </div>
    </section>
  )
}
