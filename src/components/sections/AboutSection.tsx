'use client'
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
} from '@phosphor-icons/react'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'

const curiosidades = [
  { text: 'Amo estudar e aprender', icon: BookOpenIcon },
  { text: 'Gosto de cozinhar', icon: CookingPotIcon },
  { text: 'Leitor de histórias em quadrinhos', icon: BookBookmarkIcon },
  { text: 'Entusiasta de videogames', icon: GameControllerIcon },
  { text: 'Apaixonado por viajar', icon: AirplaneTiltIcon },
  { text: 'Sempre buscando novos conhecimentos', icon: LightbulbIcon },
]

const statusItems = [
  { icon: BriefcaseIcon, label: 'Empresa', value: 'N Tecnologias' },
  { icon: MapPinIcon, label: 'Localização', value: 'Joinville, SC' },
  { icon: StarIcon, label: 'Experiência', value: '5 anos' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function AboutSection() {
  return (
    <section id="sobre" className="py-8 sm:py-10 px-6 max-w-6xl mx-auto h-full flex flex-col justify-center">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // sobre mim
        </span>
      </SectionReveal>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-4">
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gradient">
              Olá, eu sou o Vinicius.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-white-muted leading-relaxed">
              Natural de Campo Grande, Mato Grosso do Sul, hoje em Joinville, Santa Catarina.
              Sou autista — e enxergo nisso uma vantagem real: foco profundo, pensamento sistemático
              e atenção a detalhes que fazem a diferença em sistemas críticos.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="text-white-muted leading-relaxed">
              Com 5 anos de experiência como Engenheiro de Software Sênior, especializo-me em .NET
              e na modernização de sistemas legados. Já projetei evoluções arquiteturais de monólito
              para serviços, implementei agentes de IA em produção (RAG) e automatizei operações
              críticas com n8n — sempre com foco em entrega confiável e impacto mensurável.
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
          <SectionReveal delay={0.2}>
            <h3 className="font-mono text-xs text-purple-glow uppercase tracking-widest mb-6">
              // curiosidades
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
