'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@phosphor-icons/react'

const ParticleCanvas = dynamic(
  () => import('@/components/ui/ParticleCanvas').then((m) => m.ParticleCanvas),
  { ssr: false }
)

interface HeroSectionProps {
  onNavigate: (id: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      <ParticleCanvas />

      <div
        className="absolute top-[-10%] right-[-5%] w-150 h-150 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(76,29,149,0.4) 0%, rgba(22,8,46,0.2) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-sm text-purple-glow mb-6 tracking-widest"
        >
          {'< Engenheiro de Software Sênior />'}
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-bold leading-none tracking-tighter text-gradient select-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ animation: 'glitch 0.3s steps(1) 1.8s 3' }}
        >
          VINICIUS
          <br />
          BARBOSA
        </motion.h1>

        <motion.p
          className="mt-8 text-white-muted text-lg max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Especializado em .NET e modernização de sistemas críticos.
          5 anos construindo arquiteturas escaláveis, automações de alto impacto e IA aplicada em produção.
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
