'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@/components/layout/Header/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { StackSection } from '@/components/sections/StackSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { GengarEasterEgg } from '@/components/ui/GengarEasterEgg'

const ParticleCanvas = dynamic(
  () => import('@/components/ui/ParticleCanvas').then((m) => m.ParticleCanvas),
  { ssr: false }
)

export default function Home() {
  const [active, setActiveState] = useState('hero')
  const [haunted, setHaunted] = useState(false)
  const [caught, setCaught] = useState(false)
  // o Gengar só ataca ao ENTRAR na página de contato: cada entrada conta uma "visita"
  const [visit, setVisit] = useState(0)
  const [caughtAt, setCaughtAt] = useState(0)
  const activeRef = useRef('hero')
  const visitRef = useRef(0)

  const go = useCallback((id: string) => {
    if (id === 'contato' && activeRef.current !== 'contato') {
      visitRef.current += 1
      setVisit(visitRef.current)
    }
    activeRef.current = id
    setActiveState(id)
  }, [])

  const onHaunt = useCallback(() => setHaunted(true), [])
  const onCaught = useCallback(() => {
    setCaught(true)
    setCaughtAt(visitRef.current)
  }, [])
  const onReset = useCallback(() => {
    setCaught(false)
    setHaunted(false)
    setCaughtAt(visitRef.current)
  }, [])

  const setActive = useCallback((id: string) => {
    if (id === (window.location.hash.slice(1) || 'hero')) return
    go(id)
    window.history.pushState(null, '', id === 'hero' ? window.location.pathname : `#${id}`)
  }, [go])

  useEffect(() => {
    const fromHash = () => go(window.location.hash.slice(1) || 'hero')
    fromHash()
    window.addEventListener('popstate', fromHash)
    window.addEventListener('hashchange', fromHash)
    return () => {
      window.removeEventListener('popstate', fromHash)
      window.removeEventListener('hashchange', fromHash)
    }
  }, [go])

  const renderSection = () => {
    switch (active) {
      case 'hero':          return <HeroSection onNavigate={setActive} />
      case 'sobre':         return <AboutSection />
      case 'stack':         return <StackSection />
      case 'experiencia':   return <ExperienceSection />
      case 'projetos':      return <ProjectsSection />
      case 'certificacoes': return <CertificationsSection />
      case 'contato':       return <ContactSection locked={haunted && !caught} />
      default:              return <HeroSection onNavigate={setActive} />
    }
  }

  return (
    <div className="relative h-dvh overflow-hidden flex flex-col">
      {/* Persistent background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ParticleCanvas />
        <div
          className="absolute top-[-10%] right-[-5%] w-150 h-150 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(76,29,149,0.4) 0%, rgba(22,8,46,0.2) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col h-full">
        <Header activeSection={active} onNavigate={setActive} />
        <GengarEasterEgg section={active} enabled={visit > caughtAt} caught={caught} onHaunt={onHaunt} onCaught={onCaught} onReset={onReset} />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id="spa-scroll"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-1 overflow-y-auto pt-16"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
