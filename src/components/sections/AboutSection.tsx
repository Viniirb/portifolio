'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  BookOpenIcon,
  CookingPotIcon,
  BookBookmarkIcon,
  GameControllerIcon,
  AirplaneTiltIcon,
  LightbulbIcon,
  MapPinIcon,
  BriefcaseIcon,
  StarIcon,
  GraduationCapIcon,
  UsersThreeIcon,
  GitPullRequestIcon,
  CatIcon,
} from '@phosphor-icons/react'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'

const curiosidades = [
  { text: 'Amo estudar e aprender', icon: BookOpenIcon },
  { text: 'Gosto de cozinhar', icon: CookingPotIcon },
  { text: 'Leitor de histórias em quadrinhos', icon: BookBookmarkIcon },
  { text: 'Entusiasta de videogames', icon: GameControllerIcon },
  { text: 'Apaixonado por viajar', icon: AirplaneTiltIcon },
  { text: 'Tenho dois gatos, o Arkyn e o Loki', icon: CatIcon },
  { text: 'Sempre buscando novos conhecimentos', icon: LightbulbIcon },
]

const statusItems = [
  { icon: BriefcaseIcon, label: 'Status', value: 'Disponível para novas oportunidades' },
  { icon: MapPinIcon, label: 'Localização', value: 'Joinville, SC' },
  { icon: StarIcon, label: 'Experiência', value: '6 anos' },
  { icon: GitPullRequestIcon, label: 'Open Source', value: 'Contribuidor Open Source' },
  { icon: UsersThreeIcon, label: 'Comunidade', value: 'Comunidade Codecon · voluntário no Codecon Summit 2026' },
  { icon: GraduationCapIcon, label: 'Formação', value: 'Análise e Desenvolvimento de Sistemas · Católica SC · previsão final de 2027' },
]

// One emphasis style for the whole text: semibold, light violet.
function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-violet-300">{children}</strong>
}

// Autism awareness symbol: four interlocking puzzle pieces in the colors of the campaign.
function PuzzleSymbol({ className }: { className?: string }) {
  const pieces = [
    { id: 'puzzle-blue', color: '#2b9be8', body: [0, 0], tab: <><rect x="86" y="39" width="14" height="12" fill="white" /><circle cx="106" cy="45" r="13" fill="white" /></>, socket: [45, 80] },
    { id: 'puzzle-yellow', color: '#fdc82f', body: [96, 0], tab: <><rect x="135" y="86" width="12" height="14" fill="white" /><circle cx="141" cy="106" r="13" fill="white" /></>, socket: [106, 45] },
    { id: 'puzzle-red', color: '#e0211d', body: [0, 96], tab: <><rect x="39" y="86" width="12" height="14" fill="white" /><circle cx="45" cy="80" r="13" fill="white" /></>, socket: [80, 141] },
    { id: 'puzzle-green', color: '#8fb71c', body: [96, 96], tab: <><rect x="86" y="135" width="14" height="12" fill="white" /><circle cx="80" cy="141" r="13" fill="white" /></>, socket: [141, 106] },
  ]

  return (
    <svg
      viewBox="0 0 186 186"
      className={className}
      role="img"
      aria-label="Símbolo do autismo: quatro peças de quebra-cabeça encaixadas"
    >
      <defs>
        {pieces.map((p) => (
          <mask key={p.id} id={p.id} maskUnits="userSpaceOnUse" x="0" y="0" width="186" height="186">
            <rect width="186" height="186" fill="black" />
            <rect x={p.body[0]} y={p.body[1]} width="90" height="90" rx="12" fill="white" />
            {p.tab}
            <circle cx={p.socket[0]} cy={p.socket[1]} r="15" fill="black" />
          </mask>
        ))}
      </defs>
      {pieces.map((p) => (
        <rect key={p.id} width="186" height="186" fill={p.color} mask={`url(#${p.id})`} />
      ))}
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function AboutSection() {
  return (
    <section id="sobre" className="py-8 sm:py-10 px-6 w-full max-w-6xl mx-auto min-h-full flex flex-col justify-center">
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-4">
          <SectionReveal delay={0.1}>
            <div className="flex items-center gap-5">
              <div
                className="relative shrink-0 rounded-full p-0.5"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #4c1d95)',
                  boxShadow: '0 0 28px rgba(124,58,237,0.45)',
                }}
              >
                <Image
                  src="/avatar.jpg"
                  alt="Foto de Vinicius Rolim Barbosa"
                  width={96}
                  height={96}
                  priority
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover object-[50%_30%] border-2 border-bg-primary"
                />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-gradient">
                Olá, eu sou o Vinicius.
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="max-w-prose text-sm leading-relaxed text-white-muted">
              Natural de Rio Verde de Mato Grosso, Mato Grosso do Sul, hoje em Joinville, Santa Catarina.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="max-w-prose text-sm leading-relaxed text-white-muted">
              Engenheiro de Software Sênior com mais de{' '}
              <Em>6 anos de experiência</Em> no ciclo completo de
              desenvolvimento de sistemas críticos, com foco em{' '}
              <Em>backend .NET/C#</Em>,{' '}
              <Em>arquitetura distribuída</Em> e{' '}
              <Em>integrações de sistemas</Em> (ERPs, marketplaces e
              mensageria).
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white-muted">
              Histórico em <Em>modernização de ERPs legados</Em>,{' '}
              <Em>migração de dados em produção</Em> e domínio
              financeiro.
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white-muted">
              Aplico <Em>IA em produtos reais</Em>, com LLMs, agentes
              de IA generativa, RAG e machine learning para análise de risco, e no próprio fluxo de engenharia, com
              desenvolvimento assistido por agentes de IA (Claude Code e Codex) guiado por Spec-Driven Development.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-2">
              {statusItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-white-muted">
                  <Icon weight="bold" className="w-4 h-4 text-purple-glow" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <div className="lg:col-span-2">
          <SectionReveal delay={0.15}>
            <div className="glass-card glow-border mb-6 flex items-center gap-4 rounded-xl p-4">
              <PuzzleSymbol className="h-16 w-16 shrink-0" />
              <p className="text-sm font-medium leading-relaxed text-white">
                Sou <strong className="font-bold text-white">autista</strong> — e enxergo nisso uma{' '}
                <strong className="font-bold text-white">vantagem real</strong>:{' '}
                <strong className="font-semibold text-[#4aa9f0]">foco profundo</strong>,{' '}
                <strong className="font-semibold text-[#fdc82f]">pensamento sistemático</strong> e{' '}
                <strong className="font-semibold text-[#f4524d]">atenção a detalhes</strong> que fazem a diferença
                em sistemas críticos.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <h3 className="font-mono text-xs text-purple-glow uppercase tracking-widest mb-6">
              Curiosidades
            </h3>
          </SectionReveal>

          <motion.ul
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {curiosidades.map(({ text, icon: Icon }) => (
              <motion.li
                key={text}
                variants={itemVariants}
                className="glass-card glow-border p-3 flex items-center gap-3 text-sm text-white-muted"
              >
                <Icon weight="bold" className="w-4 h-4 text-purple-glow shrink-0" />
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
