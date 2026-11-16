'use client'
import { motion } from 'framer-motion'
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon, WhatsappLogoIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { WHATSAPP_NUMBER } from '@/lib/site'
import { useT } from '@/i18n'

type ContactItem = {
  icon: typeof GithubLogoIcon
  label: string
  ariaLabel: string
  href: string
  download?: boolean
}

export function ContactSection() {
  const t = useT().contact

  const contacts: ContactItem[] = [
    { icon: GithubLogoIcon, label: 'GitHub', ariaLabel: 'GitHub: Viniirb', href: 'https://github.com/Viniirb' },
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
      label: t.cv,
      ariaLabel: t.cvAria,
      href: '/Vinicius-Rolim-Barbosa-CV.pdf',
      download: true,
    },
    {
      icon: WhatsappLogoIcon,
      label: 'WhatsApp',
      ariaLabel: 'WhatsApp: +55 47 98890-3621',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`,
    },
  ]

  return (
    <section
      id="contato"
      className="min-h-full flex flex-col justify-center py-4 sm:py-6 px-6 max-w-6xl mx-auto w-full"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-center lg:gap-14">
      <div>
        <SectionReveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tighter mb-4">
            <span className="text-gradient">{t.title}</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="text-white-muted text-lg max-w-lg leading-relaxed">
            {t.lead}
          </p>
        </SectionReveal>
      </div>

      <div>
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
                className="group flex items-center gap-5 py-3 border-b border-purple-subtle/30 hover:border-purple-glow/50 transition-all duration-700"
                aria-label={contact.ariaLabel}
              >
                <contact.icon
                  weight="bold"
                  className="w-6 h-6 text-white-dim group-hover:text-purple-glow transition-colors shrink-0"
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
      </div>
    </section>
  )
}
