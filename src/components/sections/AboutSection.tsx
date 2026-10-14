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
  { icon: BriefcaseIcon, label: 'Empresa', value: 'iBR Software' },
  { icon: MapPinIcon, label: 'Localização', value: 'Joinville, SC' },
  { icon: StarIcon, label: 'Experiência', value: '6 anos' },
  { icon: UsersThreeIcon, label: 'Comunidade', value: 'Comunidade Codecon · voluntário no Codecon Summit 2026' },
  { icon: GraduationCapIcon, label: 'Formação', value: 'Análise e Desenvolvimento de Sistemas · Católica SC · previsão final de 2027' },
]

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
            <p className="text-white-muted leading-relaxed">
              Natural de Rio Verde de Mato Grosso, Mato Grosso do Sul, hoje em Joinville, Santa Catarina.
              Sou autista — e enxergo nisso uma vantagem real: foco profundo, pensamento sistemático
              e atenção a detalhes que fazem a diferença em sistemas críticos.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="text-white-muted leading-relaxed">
              Engenheiro de Software Sênior com 6 anos de experiência, hoje na iBR Software
              modernizando o ERP, estruturando o novo módulo Financeiro e desenvolvendo um pipeline de
              machine learning para risco financeiro. Antes, migrei um ERP completo, evoluí um monólito
              para serviços e implementei agentes de IA — sempre com foco em confiabilidade e impacto mensurável.
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
