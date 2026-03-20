'use client'
import { motion } from 'framer-motion'
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const contacts = [
  {
    icon: GithubLogoIcon,
    label: 'GitHub',
    handle: '@Viniirb',
    href: 'https://github.com/Viniirb',
  },
  {
    icon: LinkedinLogoIcon,
    label: 'LinkedIn',
    handle: '/in/viniciusrolimbarbosa',
    href: 'https://linkedin.com/in/viniciusrolimbarbosa',
  },
  {
    icon: EnvelopeSimpleIcon,
    label: 'Email',
    handle: 'viiniirb@pm.me',
    href: 'mailto:viiniirb@pm.me',
  },
]

export function ContactSection() {
  return (
    <section id="contato" className="py-24 sm:py-40 px-6 max-w-6xl mx-auto">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // contato
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mt-6 mb-4">
          <span className="text-gradient">Vamos construir</span>
          <br />
          <span className="text-white">algo.</span>
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <p className="text-white-muted text-lg max-w-lg mb-16 leading-relaxed">
          Estou disponível para projetos freelance, oportunidades de emprego ou apenas para
          conversar sobre tecnologia.
        </p>
      </SectionReveal>

      <div className="space-y-4">
        {contacts.map((contact, index) => {
          return (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-6 py-5 border-b border-purple-subtle/30 hover:border-purple-glow/50 transition-all"
                aria-label={`${contact.label}: ${contact.handle}`}
              >
                <contact.icon
                  weight="bold"
                  className="w-8 h-8 text-white-dim group-hover:text-purple-glow transition-colors shrink-0" />
                <div className="flex-1">
                  <p className="font-mono text-xs text-white-dim uppercase tracking-widest">
                    {contact.label}
                  </p>
                  <p className="font-display text-xl font-bold text-white group-hover:text-gradient transition-all">
                    {contact.handle}
                  </p>
                </div>
                <span className="text-white-dim group-hover:text-purple-glow group-hover:translate-x-1 transition-all font-mono text-sm">
                  →
                </span>
              </a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
