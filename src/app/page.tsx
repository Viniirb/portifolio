'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@/components/layout/Header/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { StackSection } from '@/components/sections/StackSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  const [active, setActive] = useState('hero')

  const renderSection = () => {
    switch (active) {
      case 'hero':          return <HeroSection onNavigate={setActive} />
      case 'sobre':         return <AboutSection />
      case 'stack':         return <StackSection />
      case 'experiencia':   return <ExperienceSection />
      case 'projetos':      return <ProjectsSection />
      case 'certificacoes': return <CertificationsSection />
      case 'contato':       return <ContactSection />
      default:              return <HeroSection onNavigate={setActive} />
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <Header activeSection={active} onNavigate={setActive} />
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="h-screen overflow-y-auto"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
