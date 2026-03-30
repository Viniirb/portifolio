'use client'
import { motion } from 'framer-motion'
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá, Vinicius! Vi seu portfólio e gostaria de conversar sobre um projeto.')}`

const contacts = [
  {
    icon: GithubLogoIcon,
    label: 'GitHub',
    ariaLabel: 'GitHub: Viniirb',
    href: 'https://github.com/Viniirb',
  },
  {
    icon: LinkedinLogoIcon,
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn: viniciusrolimbarbosa',
    href: 'https://linkedin.com/in/viniciusrolimbarbosa',
  },
  {
    icon: EnvelopeSimpleIcon,
    label: 'Email',
    ariaLabel: 'Email: contato@viniciusrb.dev',
    href: 'mailto:contato@viniciusrb.dev',
  },
  {
    icon: WhatsappLogoIcon,
    label: 'WhatsApp',
    ariaLabel: 'WhatsApp: +55 47 98890-3621',
    href: whatsappHref,
  },
]

export function ContactSection() {
  return (
    <section
      id="contato"
      className="h-full flex flex-col justify-center pt-14 sm:pt-16 md:pt-8 py-8 sm:py-12 px-6 max-w-6xl mx-auto w-full scroll-mt-28 sm:scroll-mt-32"
    >
      <SectionReveal delay={0.1}>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mt-8 sm:mt-10 md:mt-6 mb-4">
          <span className="text-gradient">Vamos construir algo.</span>
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
          const isExternal = contact.href.startsWith('http')

          return (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <a
                href={contact.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-6 py-5 border-b border-purple-subtle/30 hover:border-purple-glow/50 transition-all"
                aria-label={contact.ariaLabel}
              >
                <contact.icon
                  weight="bold"
                  className="w-8 h-8 text-white-dim group-hover:text-purple-glow transition-colors shrink-0"
                />
                <div className="flex-1">
                  <p className="font-mono text-xs text-white-dim uppercase tracking-widest">
                    {contact.label}
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
