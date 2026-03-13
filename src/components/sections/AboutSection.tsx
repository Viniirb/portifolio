// src/components/sections/AboutSection.tsx
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
  { icon: BriefcaseIcon, label: 'Empresa', value: 'NTecnologias' },
  { icon: MapPinIcon, label: 'Localização', value: 'Joinville, SC' },
  { icon: StarIcon, label: 'Experiência', value: '5 anos' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // sobre mim
        </span>
      </SectionReveal>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Bio — left */}
        <div className="lg:col-span-3 space-y-6">
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gradient">
              Olá, eu sou o Vinicius.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-white-muted leading-relaxed">
              Natural de Mato Grosso do Sul, atualmente residindo em Joinville, Santa Catarina.
              Com 5 anos de experiência como desenvolvedor fullstack, especializo-me em criar
              soluções robustas e escaláveis que transformam desafios complexos em produtos eficientes.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="text-white-muted leading-relaxed">
              Minha trajetória é marcada por uma busca constante por aprendizado e inovação,
              aplicando as melhores práticas de desenvolvimento para entregar soluções de alta qualidade
              que superam as expectativas dos clientes.
            </p>
          </SectionReveal>

          {/* Status items */}
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

        {/* Curiosidades — right */}
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
                <Icon weight="bold" className="w-4 h-4 text-purple-glow flex-shrink-0" />
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
