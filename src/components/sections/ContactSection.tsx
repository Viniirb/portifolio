'use client'
import { motion } from 'framer-motion'
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon, WhatsappLogoIcon, DownloadSimpleIcon, LockSimpleIcon } from '@phosphor-icons/react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { WHATSAPP_NUMBER } from '@/lib/site'

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, Vinicius! Vi seu portfólio e gostaria de conversar sobre um projeto.')}`

const allContacts = [
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
    icon: DownloadSimpleIcon,
    label: 'Currículo (PDF)',
    ariaLabel: 'Baixar currículo em PDF',
    href: '/Vinicius-Rolim-Barbosa-CV.pdf',
    download: true,
  },
  {
    icon: WhatsappLogoIcon,
    label: 'WhatsApp',
    ariaLabel: 'WhatsApp: +55 47 98890-3621',
    href: whatsappHref,
  },
]

const contacts = allContacts

export function ContactSection({ locked = false }: { locked?: boolean }) {
  return (
    <section
      id="contato"
      className="min-h-full flex flex-col justify-center py-8 sm:py-12 px-6 max-w-6xl mx-auto w-full"
    >
      <SectionReveal delay={0.1}>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mt-2 mb-4">
          <span className="text-gradient">Vamos construir algo.</span>
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <p className="text-white-muted text-lg max-w-lg mb-8 sm:mb-12 leading-relaxed">
          Estou disponível para projetos freelance, oportunidades de emprego ou apenas para
          conversar sobre tecnologia.
        </p>
      </SectionReveal>

      {locked && (
        <p className="mb-6 font-mono text-[11px] text-white-dim">
          {'// o Gengar trancou meus contatos. ache os olhos no escuro e pegue ele 5 vezes para destravar.'}
        </p>
      )}

      <div className="space-y-4" inert={locked} aria-busy={locked}>
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
                download={contact.download ? true : undefined}
                className={`group flex items-center gap-6 py-5 border-b border-purple-subtle/30 hover:border-purple-glow/50 transition-all duration-700 ${
                  locked ? 'opacity-30 grayscale' : ''
                }`}
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
                {locked ? (
                  <LockSimpleIcon weight="bold" className="h-5 w-5 text-red-400" aria-label="Bloqueado" />
                ) : (
                  <span className="text-white-dim group-hover:text-purple-glow group-hover:translate-x-1 transition-all font-mono text-sm">
                    →
                  </span>
                )}
              </a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
