'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react'

interface HeroSectionProps {
  onNavigate: (id: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative w-full min-h-full flex flex-col items-center justify-center"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto py-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-sm text-purple-glow mb-6 tracking-widest"
        >
          {'< Engenheiro de Software Sênior />'}
        </motion.p>

        <h1
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-bold leading-none tracking-tighter select-none"
          aria-label="Vinicius Barbosa"
        >
          {['VINICIUS', 'BARBOSA'].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
              <motion.span
                className="block text-gradient"
                initial={reduceMotion ? false : { y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 text-white-muted text-lg max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Especializado em .NET e modernização de sistemas críticos.
          Hoje na iBR Software: ERP distribuído, módulo Financeiro e machine learning aplicado a risco.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <button
            onClick={() => onNavigate('projetos')}
            className="glass-card glow-border px-8 py-3 font-mono text-sm tracking-widest uppercase text-white flex items-center gap-2 group transition-all"
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
            className="px-8 py-3 font-mono text-sm tracking-widest uppercase text-white-muted hover:text-white border border-purple-subtle/50 hover:border-purple-glow transition-all"
            aria-label="Falar comigo"
          >
            Falar Comigo
          </button>
          <a
            href="/Vinicius-Rolim-Barbosa-CV.pdf"
            download
            className="px-8 py-3 font-mono text-sm tracking-widest uppercase text-white-muted hover:text-white border border-purple-subtle/50 hover:border-purple-glow transition-all flex items-center justify-center gap-2"
            aria-label="Baixar currículo em PDF"
          >
            <DownloadSimpleIcon weight="bold" className="w-4 h-4" />
            Currículo
          </a>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-2 font-mono text-xs text-white-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Disponível para novos projetos
        </motion.div>
      </div>

    </section>
  )
}
