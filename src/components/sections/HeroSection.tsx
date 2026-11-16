'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRightIcon, DownloadSimpleIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import { WHATSAPP_NUMBER } from '@/lib/site'

interface HeroSectionProps {
  onNavigate: (id: string) => void
}

const EMAIL = 'contato@viniciusrb.dev'
const GLYPHS = '01<>/{}[]#=+*'

// The name resolves letter by letter from random glyphs. Each letter has a fixed width (measured from the
// final text) so the word never jitters, and its own slice of the gradient so the colors match the old title.
function DecodeWord({ word, start }: { word: string; start: number }) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const letters = Array.from(root.querySelectorAll<HTMLElement>('[data-l]'))
    const intervals: number[] = []
    let cancelled = false

    const fit = () => {
      letters.forEach((l) => {
        l.style.width = ''
        l.textContent = l.dataset.l ?? ''
      })
      const total = root.scrollWidth
      const metrics = letters.map((l) => [l.offsetWidth, l.offsetLeft])
      letters.forEach((l, i) => {
        const [width, left] = metrics[i]
        l.style.width = `${width}px`
        l.style.backgroundSize = `${total}px 100%`
        l.style.backgroundPosition = `${-left}px 0`
      })
    }

    const run = () => {
      fit()
      root.style.visibility = 'visible'
      if (reduceMotion) return
      letters.forEach((l, i) => {
        const final = l.dataset.l ?? ''
        const steps = 9 + (i % 5) + i * 2
        let n = 0
        const id = window.setInterval(() => {
          n += 1
          if (n >= steps) {
            l.textContent = final
            window.clearInterval(id)
          } else {
            l.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
        }, 55)
        intervals.push(id)
      })
    }

    const startId = window.setTimeout(() => {
      document.fonts.ready.then(() => {
        if (!cancelled) run()
      })
    }, start)

    return () => {
      cancelled = true
      window.clearTimeout(startId)
      intervals.forEach((id) => window.clearInterval(id))
    }
  }, [word, start, reduceMotion])

  return (
    <span ref={rootRef} className="block whitespace-nowrap pb-[0.08em]" style={{ visibility: 'hidden' }} aria-hidden="true">
      {[...word].map((ch, i) => (
        <span key={`${ch}-${i}`} data-l={ch} className="text-gradient inline-block">
          {ch}
        </span>
      ))}
    </span>
  )
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked; the address stays on screen to be selected by hand.
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full h-full flex flex-col items-center justify-center"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto py-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-sm text-purple-glow mb-[min(1.5rem,2.5vh)] tracking-widest"
        >
          {'< Engenheiro de Software Sênior />'}
        </motion.p>

        <h1
          className="font-display text-[clamp(2.5rem,min(12vw,14vh),9rem)] font-bold leading-none tracking-tighter select-none"
          aria-label="Vinicius Barbosa"
        >
          <DecodeWord word="VINICIUS" start={900} />
          <DecodeWord word="BARBOSA" start={1050} />
        </h1>

        <motion.p
          className="mt-[min(2rem,3.5vh)] text-white-muted text-base sm:text-lg max-w-xl leading-relaxed [@media(max-height:620px)]:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Especializado em .NET e modernização de sistemas críticos.
          Passei pela iBR Software: ERP distribuído, módulo Financeiro e machine learning aplicado a risco.
          Hoje contribuo com open source.
        </motion.p>

        <motion.div
          className="mt-[min(2.5rem,4vh)] flex flex-col sm:flex-row gap-[min(1rem,1.8vh)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <button
            onClick={() => onNavigate('projetos')}
            className="glass-card glow-border px-8 py-[clamp(0.5rem,1.6vh,0.75rem)] font-mono text-sm tracking-widest uppercase text-white flex items-center gap-2 group transition-all"
            aria-label="Ver projetos"
          >
            Ver Projetos
            <ArrowRightIcon
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={() => onNavigate('contato')}
            className="px-8 py-[clamp(0.5rem,1.6vh,0.75rem)] font-mono text-sm tracking-widest uppercase text-white-muted hover:text-white border border-purple-subtle/50 hover:border-purple-glow transition-all"
            aria-label="Falar comigo"
          >
            Falar Comigo
          </button>
          <a
            href="/Vinicius-Rolim-Barbosa-CV.pdf"
            download
            className="px-8 py-[clamp(0.5rem,1.6vh,0.75rem)] font-mono text-sm tracking-widest uppercase text-white-muted hover:text-white border border-purple-subtle/50 hover:border-purple-glow transition-all flex items-center justify-center gap-2"
            aria-label="Baixar currículo em PDF"
          >
            <DownloadSimpleIcon weight="bold" className="w-4 h-4" />
            Currículo
          </a>
        </motion.div>

        <motion.div
          className="mt-[min(2.5rem,4vh)] flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/45 bg-emerald-400/10 px-4 py-1.5 font-mono text-xs text-white">
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Disponível para novas oportunidades
          </span>

          <span className="flex items-center gap-5 font-mono text-xs text-white-muted">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              aria-label={`Copiar e-mail ${EMAIL}`}
            >
              <EnvelopeSimpleIcon weight="bold" className="h-4 w-4" aria-hidden="true" />
              {copied ? 'Copiado' : EMAIL}
            </button>
            <a
              href="https://linkedin.com/in/viniciusrolimbarbosa"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              WhatsApp
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
