'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ListIcon, X, GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import { useState } from 'react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projetos', href: '/projetos' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-corporate-border">
      <div className="grid grid-cols-2 md:grid-cols-12 h-16 sm:h-20">
        
        {/* Logo Area */}
        <div className="col-span-1 md:col-span-2 flex items-center pl-6 sm:pl-8 border-r border-corporate-border h-full">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
            VINI.DEV
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex col-span-10 justify-end items-center pr-8 h-full">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="text-sm font-medium uppercase tracking-widest hover:text-corporate-accent transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-8 pl-8 border-l border-corporate-border h-1/2 flex items-center gap-4">
            {/* weight="bold" dá o visual brutalista */}
            <Link href="https://github.com/Viniirb" target="_blank">
              <GithubLogoIcon weight="bold" className="w-6 h-6 hover:text-corporate-accent transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <LinkedinLogoIcon weight="bold" className="w-6 h-6 hover:text-corporate-accent transition-colors" />
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden col-span-1 flex justify-end items-center pr-6 h-full">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X weight="bold" className="w-6 h-6" /> : <ListIcon weight="bold" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-corporate-border bg-background"
        >
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium uppercase tracking-widest py-2 border-b border-gray-100"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-4">
              <Link href="https://github.com/Viniirb" target="_blank"><GithubLogoIcon weight="fill" className="w-8 h-8" /></Link>
              <Link href="https://linkedin.com" target="_blank"><LinkedinLogoIcon weight="fill" className="w-8 h-8" /></Link>
              <Link href="mailto:seuemail@exemplo.com"><EnvelopeSimpleIcon weight="bold" className="w-8 h-8" /></Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}