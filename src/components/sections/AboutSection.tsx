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
import { useT } from '@/i18n'
import type { Segment } from '@/i18n/strings'

const curiosityIcons = [
  BookOpenIcon,
  CookingPotIcon,
  BookBookmarkIcon,
  GameControllerIcon,
  AirplaneTiltIcon,
  CatIcon,
  LightbulbIcon,
]

const statusIcons = [BriefcaseIcon, MapPinIcon, StarIcon, GitPullRequestIcon, UsersThreeIcon, GraduationCapIcon]

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

// Renders a text made of plain pieces and pieces with their own emphasis.
function Rich({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === 'string') return <span key={i}>{seg}</span>
        if ('em' in seg) return <Em key={i}>{seg.em}</Em>
        if ('b' in seg) return <strong key={i} className="font-bold text-white">{seg.b}</strong>
        if ('blue' in seg) return <strong key={i} className="font-semibold text-[#4aa9f0]">{seg.blue}</strong>
        if ('yellow' in seg) return <strong key={i} className="font-semibold text-[#fdc82f]">{seg.yellow}</strong>
        return <strong key={i} className="font-semibold text-[#f4524d]">{seg.red}</strong>
      })}
    </>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function AboutSection() {
  const t = useT().about

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
                  alt={t.photoAlt}
                  width={96}
                  height={96}
                  priority
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover object-[50%_30%] border-2 border-bg-primary"
                />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-gradient">
                {t.greeting}
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="max-w-prose text-sm leading-relaxed text-white-muted">
              {t.origin}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="max-w-prose text-sm leading-relaxed text-white-muted">
              <Rich segments={t.summary} />
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white-muted">
              <Rich segments={t.background} />
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white-muted">
              <Rich segments={t.ai} />
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-2">
              {t.status.map((value, i) => {
                const Icon = statusIcons[i]
                return (
                  <div key={value} className="flex items-center gap-2 text-sm text-white-muted">
                    <Icon weight="bold" className="w-4 h-4 text-purple-glow" />
                    <span>{value}</span>
                  </div>
                )
              })}
            </div>
          </SectionReveal>
        </div>

        <div className="lg:col-span-2">
          <SectionReveal delay={0.15}>
            <div className="glass-card glow-border mb-6 flex items-center gap-4 rounded-xl p-4">
              <PuzzleSymbol className="h-16 w-16 shrink-0" />
              <p className="text-sm font-medium leading-relaxed text-white">
                <Rich segments={t.autism} />
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <h3 className="font-mono text-xs text-purple-glow uppercase tracking-widest mb-6">
              {t.curiositiesTitle}
            </h3>
          </SectionReveal>

          <motion.ul
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {t.curiosities.map((text, i) => {
              const Icon = curiosityIcons[i]
              return (
                <motion.li
                  key={text}
                  variants={itemVariants}
                  className="glass-card glow-border p-3 flex items-center gap-3 text-sm text-white-muted"
                >
                  <Icon weight="bold" className="w-4 h-4 text-purple-glow shrink-0" />
                  {text}
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
