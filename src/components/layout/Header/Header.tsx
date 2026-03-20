'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ListIcon, X, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'

const navItems = [
  { name: 'Início', id: 'hero' },
  { name: 'Sobre', id: 'sobre' },
  { name: 'Stack', id: 'stack' },
  { name: 'Experiência', id: 'experiencia' },
  { name: 'Projetos', id: 'projetos' },
  { name: 'Certificações', id: 'certificacoes' },
  { name: 'Contato', id: 'contato' },
]

interface HeaderProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (id: string) => {
    setIsOpen(false)
    onNavigate(id)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-purple-subtle/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 sm:px-8">
        <button
          onClick={() => handleNavigate('hero')}
          className="font-display text-xl font-bold tracking-tighter text-white hover:text-purple-glow transition-colors"
        >
          VB.DEV
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`relative font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive ? 'text-purple-glow' : 'text-white-muted hover:text-white'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-purple-glow"
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Viniirb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white-muted hover:text-white transition-colors"
          >
            <GithubLogoIcon weight="bold" className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/viniciusrolimbarbosa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white-muted hover:text-white transition-colors"
          >
            <LinkedinLogoIcon weight="bold" className="w-5 h-5" />
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X weight="bold" className="w-6 h-6" /> : <ListIcon weight="bold" className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-purple-subtle/50 bg-bg-surface"
        >
          <nav className="flex flex-col p-6 gap-4" aria-label="Menu mobile">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`font-mono text-sm uppercase tracking-widest text-left py-2 border-b border-purple-subtle/30 transition-colors ${
                    isActive ? 'text-purple-glow' : 'text-white-muted hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              )
            })}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
