# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from a corporate/brutalist multi-page app into a dark, creative, one-page experience with interactive particles, glassmorphism, and cinematic animations.

**Architecture:** One-page scroll with 7 sections (Hero → About → Stack → Experience → Projects → Certifications → Contact). Existing routes removed, all content migrated inline. Project details open in animated modal. Tailwind v4 with CSS-native config.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, Framer Motion v12, @fontsource/space-grotesk, @fontsource/jetbrains-mono

**Spec:** `docs/superpowers/specs/2026-03-11-portfolio-redesign-design.md`

---

## Chunk 1: Setup — Dependencies, Tailwind v4, Design System

### Task 1: Install and remove dependencies

**Files:**
- Modify: `package.json`
- Modify: `postcss.config.mjs`
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Install new deps and upgrade Tailwind**

```bash
cd "D:\Work\N-Tecnologias\Projetos pessoais\portifolio"
npm install @fontsource/space-grotesk @fontsource/jetbrains-mono
npm install tailwindcss@4 @tailwindcss/postcss
npm uninstall tailwindcss-animate autoprefixer next-themes
```

- [ ] **Step 2: Update postcss.config.mjs** — replace entire file content:

```js
/** @type {import('postcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 3: Delete tailwind.config.ts**

```bash
rm tailwind.config.ts
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: install deps, upgrade Tailwind v4, remove next-themes and tailwindcss-animate"
```

---

### Task 2: globals.css — Design system tokens and utilities

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

```css
@import "tailwindcss";

@import "@fontsource/space-grotesk/400.css";
@import "@fontsource/space-grotesk/500.css";
@import "@fontsource/space-grotesk/700.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/700.css";

@theme {
  /* Colors */
  --color-bg-primary: #080810;
  --color-bg-surface: #0f0f1a;
  --color-bg-elevated: #1a1a2e;
  --color-purple-deep: #16082e;
  --color-purple-mid: #4c1d95;
  --color-purple-glow: #7c3aed;
  --color-purple-subtle: #2d1b69;
  --color-white: #f8f8ff;
  --color-white-muted: #a0a0b8;
  --color-white-dim: #4a4a6a;

  /* Fonts */
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

@layer base {
  html {
    height: 100%;
    overflow: hidden;
    cursor: none;
  }

  body {
    height: 100%;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background: #080810;
    color: #f8f8ff;
    font-family: var(--font-inter), sans-serif;
  }

  /* Noise overlay for depth */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* Touch devices: restore default cursor */
  @media (pointer: coarse) {
    html {
      cursor: auto;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, #f8f8ff 0%, #a78bfa 50%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-card {
    background: rgba(248, 248, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid #2d1b69;
  }

  .glow-border {
    box-shadow: 0 0 0 1px #2d1b69, 0 0 20px rgba(124, 58, 237, 0);
    transition: box-shadow 0.3s ease;
  }

  .glow-border:hover {
    box-shadow: 0 0 0 1px #7c3aed, 0 0 20px rgba(124, 58, 237, 0.3);
  }

  .font-display {
    font-family: "Space Grotesk", sans-serif;
  }

  .font-mono-custom {
    font-family: "JetBrains Mono", monospace;
  }

  .dot-grid {
    background-image: radial-gradient(circle, #2d1b69 1px, transparent 1px);
    background-size: 32px 32px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: design system — Tailwind v4 theme, glass/glow utilities, noise overlay"
```

---

### Task 3: layout.tsx — Inter font, dark mode, PageCurtain

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/layout/PageCurtain.tsx`

- [ ] **Step 1: Create PageCurtain**

```tsx
// src/components/layout/PageCurtain.tsx
'use client'
import { motion } from 'framer-motion'

export function PageCurtain() {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ background: '#7c3aed' }}
      initial={{ y: '-100%' }}
      animate={{ y: ['-100%', '0%', '100%'] }}
      transition={{
        duration: 1.4,
        times: [0, 0.45, 1],
        ease: ['easeIn', 'easeOut'],
      }}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Rewrite layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { PageCurtain } from '@/components/layout/PageCurtain'

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((m) => m.CustomCursor),
  { ssr: false }
)

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinicius Rolim Barbosa — Full Stack Developer',
  description:
    'Portfólio pessoal de Vinicius Barbosa — Full Stack Developer especializado em .NET, React e Next.js.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.variable}>
        <PageCurtain />
        <CustomCursor />
        <Header />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/components/layout/PageCurtain.tsx
git commit -m "feat: layout with Inter font, hardcoded dark mode, PageCurtain animation"
```

---

## Chunk 2: Foundation Components

### Task 4: SectionReveal — scroll reveal wrapper

**Files:**
- Create: `src/components/ui/SectionReveal.tsx`

- [ ] **Step 1: Create SectionReveal**

```tsx
// src/components/ui/SectionReveal.tsx
'use client'
import { motion } from 'framer-motion'

export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
}: SectionRevealProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/SectionReveal.tsx
git commit -m "feat: SectionReveal scroll-triggered animation wrapper"
```

---

### Task 5: useScrollSpy hook

**Files:**
- Create: `src/hooks/useScrollSpy.ts`

- [ ] **Step 1: Create the hook**

```ts
// src/hooks/useScrollSpy.ts
import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    // Use document.body as root because html { overflow: hidden } makes body the scroll container
    const scrollRoot = document.body
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { root: scrollRoot, threshold: 0.3 }
      )

      observer.observe(el)
      observers.set(id, observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sectionIds])

  return active
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useScrollSpy.ts
git commit -m "feat: useScrollSpy hook — returns active section id on scroll"
```

---

### Task 6: Header refactor — scroll spy nav

**Files:**
- Modify: `src/components/layout/Header/Header.tsx`

- [ ] **Step 1: Rewrite Header**

```tsx
// src/components/layout/Header/Header.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ListIcon, X, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const navItems = [
  { name: 'Início', id: 'hero' },
  { name: 'Sobre', id: 'sobre' },
  { name: 'Stack', id: 'stack' },
  { name: 'Experiência', id: 'experiencia' },
  { name: 'Projetos', id: 'projetos' },
  { name: 'Certificações', id: 'certificacoes' },
  { name: 'Contato', id: 'contato' },
]

const SECTION_IDS = navItems.map((i) => i.id)

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useScrollSpy(SECTION_IDS)

  const scrollTo = (id: string) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-purple-subtle/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 sm:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-xl font-bold tracking-tighter text-white hover:text-purple-glow transition-colors"
        >
          VB.DEV
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
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

        {/* Social icons */}
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
            href="https://linkedin.com/in/viniciusrb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white-muted hover:text-white transition-colors"
          >
            <LinkedinLogoIcon weight="bold" className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X weight="bold" className="w-6 h-6" /> : <ListIcon weight="bold" className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-purple-subtle/50 bg-bg-surface"
        >
          <nav className="flex flex-col p-6 gap-4" aria-label="Menu mobile">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-mono text-sm uppercase tracking-widest text-left py-2 border-b border-purple-subtle/30 text-white-muted hover:text-white transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header/Header.tsx
git commit -m "feat: Header refactored with scroll spy, dark design, mobile menu"
```

---

### Task 7: ParticleCanvas component

**Files:**
- Create: `src/components/ui/ParticleCanvas.tsx`

- [ ] **Step 1: Create ParticleCanvas**

```tsx
// src/components/ui/ParticleCanvas.tsx
'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const PARTICLE_COUNT = 80
const MAX_DISTANCE = 120
const MOUSE_RADIUS = 150

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const animationId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          p.vx += (dx / dist) * force * 0.5
          p.vy += (dy / dist) * force * 0.5
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2 }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`
        ctx.fill()
      })

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DISTANCE) {
            const opacity = (1 - dist / MAX_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    resize()
    init()
    draw()

    const handleResize = () => { resize(); init() }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ParticleCanvas.tsx
git commit -m "feat: ParticleCanvas — interactive canvas with mouse repulsion and connecting lines"
```

---

### Task 8: CustomCursor component

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`

- [ ] **Step 1: Create CustomCursor**

```tsx
// src/components/ui/CustomCursor.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    const onOver = (e: MouseEvent) => {
      setIsHovering(!!(e.target as Element)?.closest('a, button, [role="button"]'))
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [x, y])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-white/50 mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: isHovering ? 40 : 8,
        height: isHovering ? 40 : 8,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/CustomCursor.tsx
git commit -m "feat: CustomCursor with spring physics, hover expand, touch detection"
```

---

## Chunk 3: Hero, About, Stack Sections

### Task 9: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

```tsx
// src/components/sections/HeroSection.tsx
'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDownIcon, ArrowRightIcon } from '@phosphor-icons/react'

const ParticleCanvas = dynamic(
  () => import('@/components/ui/ParticleCanvas').then((m) => m.ParticleCanvas),
  { ssr: false }
)

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Aurora blob */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(76,29,149,0.4) 0%, rgba(22,8,46,0.2) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Animated tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-sm text-purple-glow mb-6 tracking-widest"
        >
          {'< Full Stack Developer />'}
        </motion.p>

        {/* Name with glitch keyframe */}
        <motion.h1
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-bold leading-none tracking-tighter text-gradient select-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ animation: 'glitch 0.3s steps(1) 1.8s 3' }}
        >
          VINICIUS
          <br />
          BARBOSA
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-8 text-white-muted text-lg max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Especialista em construir arquiteturas escaláveis e interfaces performáticas.
          Transformando requisitos técnicos em produtos digitais robustos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <button
            onClick={() => scrollTo('projetos')}
            className="glass-card glow-border px-8 py-3 font-mono text-sm tracking-widest uppercase text-white flex items-center gap-2 group transition-all"
            aria-label="Ver projetos"
          >
            Ver Projetos
            <ArrowRightIcon
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={() => scrollTo('contato')}
            className="px-8 py-3 font-mono text-sm tracking-widest uppercase text-white-muted hover:text-white border border-purple-subtle/50 hover:border-purple-glow transition-all"
            aria-label="Falar comigo"
          >
            Falar Comigo
          </button>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          className="mt-10 flex items-center gap-2 font-mono text-xs text-white-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Disponível para novos projetos
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('sobre')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white-dim hover:text-white transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Rolar para baixo"
      >
        <ArrowDownIcon weight="bold" className="w-6 h-6" />
      </motion.button>
    </section>
  )
}
```

- [ ] **Step 2: Add glitch keyframe to globals.css** — append inside `@layer base`:

```css
@keyframes glitch {
  0%, 100% { transform: translateX(0); clip-path: inset(0 0 0 0); }
  20%       { transform: translateX(-2px); clip-path: inset(20% 0 60% 0); }
  40%       { transform: translateX(2px);  clip-path: inset(60% 0 20% 0); }
  60%       { transform: translateX(-1px); clip-path: inset(80% 0 0 0); }
  80%       { transform: translateX(1px);  clip-path: inset(0 0 80% 0); }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/app/globals.css
git commit -m "feat: HeroSection with particles, aurora blob, glitch animation, CTAs"
```

---

### Task 10: AboutSection

**Files:**
- Create: `src/components/sections/AboutSection.tsx`

- [ ] **Step 1: Create AboutSection**

```tsx
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
              Cursando Ciência da Computação na UNISOCIESC, minha expertise abrange backend com
              .NET/C# e APIs RESTful de alta performance, até frontends modernos com React e Next.js.
              Domino bancos de dados relacionais e ferramentas de DevOps com foco em pipelines de CI/CD.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="glass-card p-5 rounded-lg border-l-2 border-purple-glow">
              <p className="text-white-muted leading-relaxed text-sm">
                <span className="text-white font-medium">Autista (TEA)</span> — transformo minha
                neurodivergência em vantagem competitiva: atenção excepcional aos detalhes,
                identificação eficiente de padrões, código consistente e comunicação técnica precisa.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.5}>
            <blockquote className="text-2xl font-display font-bold text-gradient mt-8">
              "Transformo complexidade em código elegante."
            </blockquote>
          </SectionReveal>
        </div>

        {/* Status + interests — right */}
        <div className="lg:col-span-2 space-y-6">
          <SectionReveal delay={0.2}>
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                  Disponível
                </span>
              </div>
              {statusItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon weight="bold" className="w-4 h-4 text-purple-glow flex-shrink-0" />
                  <div>
                    <p className="text-white-dim text-xs font-mono uppercase">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {curiosidades.map((item) => (
              <motion.div
                key={item.text}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="glass-card rounded-lg p-3 flex flex-col items-center text-center gap-2 glow-border cursor-default"
              >
                <item.icon weight="bold" className="w-5 h-5 text-purple-glow" />
                <span className="text-white-muted text-xs leading-tight">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "feat: AboutSection with bio, status card, neurodiversity note, interests grid"
```

---

### Task 11: StackSection + stack data

**Files:**
- Create: `src/constants/stack.ts`
- Create: `src/components/sections/StackSection.tsx`

- [ ] **Step 1: Create stack data**

```ts
// src/constants/stack.ts
export interface StackItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools'
}

export const stackCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Ferramentas',
} as const

export const stack: StackItem[] = [
  { name: 'React', icon: '/tech/react.svg', category: 'frontend' },
  { name: 'Next.js', icon: '/tech/nextdotjs.svg', category: 'frontend' },
  { name: 'TypeScript', icon: '/tech/typescript.svg', category: 'frontend' },
  { name: 'JavaScript', icon: '/tech/javascript.svg', category: 'frontend' },
  { name: 'Vue.js', icon: '/tech/vuejs.svg', category: 'frontend' },
  { name: 'Angular', icon: '/tech/angular.svg', category: 'frontend' },
  { name: 'C# / .NET', icon: '/tech/dotnet.svg', category: 'backend' },
  { name: 'Node.js', icon: '/tech/nodejs.svg', category: 'backend' },
  { name: 'GraphQL', icon: '/tech/graphql.svg', category: 'backend' },
  { name: 'SQL Server', icon: '/tech/microsoftsqlserver.svg', category: 'database' },
  { name: 'MySQL', icon: '/tech/mysql.svg', category: 'database' },
  { name: 'MinIO', icon: '/tech/minio.svg', category: 'database' },
  { name: 'Azure DevOps', icon: '/tech/azuredevops.svg', category: 'devops' },
  { name: 'Git', icon: '/tech/git.svg', category: 'tools' },
  { name: 'Postman', icon: '/tech/postman.svg', category: 'tools' },
  { name: 'VS Code', icon: '/tech/vscode.svg', category: 'tools' },
  { name: 'Jira', icon: '/tech/jira.svg', category: 'tools' },
]
```

- [ ] **Step 2: Create StackSection**

```tsx
// src/components/sections/StackSection.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { stack, stackCategories, type StackItem } from '@/constants/stack'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

function TechChip({ item }: { item: StackItem }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="glass-card glow-border flex items-center gap-2 px-3 py-2 rounded-lg cursor-default"
    >
      <Image
        src={item.icon}
        alt={item.name}
        width={16}
        height={16}
        className="w-4 h-4 object-contain"
      />
      <span className="font-mono text-xs text-white-muted whitespace-nowrap">{item.name}</span>
    </motion.div>
  )
}

export function StackSection() {
  const categories = Object.entries(stackCategories) as [keyof typeof stackCategories, string][]

  return (
    <section id="stack" className="py-24 sm:py-32 px-6 dot-grid">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
            // tecnologias
          </span>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-16">
            Minha <span className="text-gradient">Stack</span>
          </h2>
        </SectionReveal>

        <div className="space-y-12">
          {categories.map(([key, label], catIndex) => {
            const items = stack.filter((s) => s.category === key)
            if (items.length === 0) return null
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-white-dim uppercase tracking-widest">
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-subtle to-transparent" />
                </div>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {items.map((item) => (
                    <TechChip key={item.name} item={item} />
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/StackSection.tsx src/constants/stack.ts
git commit -m "feat: StackSection with categorized tech chips and stagger animation"
```

---

## Chunk 4: Experience, Projects, Certifications, Contact

### Task 12: ExperienceSection — animated timeline

**Files:**
- Create: `src/components/sections/ExperienceSection.tsx`

- [ ] **Step 1: Create ExperienceSection**

```tsx
// src/components/sections/ExperienceSection.tsx
'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { projects } from '@/constants/projects'
import { techIcons } from '@/constants/tech-icons'
import type { TechKey } from '@/types'

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experiencia" className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // trajetória
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-16">
          Minha <span className="text-gradient">Experiência</span>
        </h2>
      </SectionReveal>

      <div ref={timelineRef} className="relative">
        {/* Static line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-subtle/30 -translate-x-1/2 hidden md:block" />
        {/* Animated line */}
        <motion.div
          className="absolute left-1/2 top-0 w-px bg-purple-glow -translate-x-1/2 origin-top hidden md:block"
          style={{
            height: lineHeight,
            boxShadow: '0 0 8px rgba(124,58,237,0.8)',
          }}
        />

        <div className="space-y-8 md:space-y-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="md:grid md:grid-cols-2 md:gap-16 relative"
              >
                {/* Card */}
                <div className={isEven ? 'md:pr-8' : 'md:col-start-2 md:pl-8'}>
                  <div className="glass-card rounded-xl p-6 glow-border group hover:border-purple-glow/50 transition-colors">
                    <h3 className="font-display font-bold text-white text-lg">{project.company}</h3>
                    <p className="text-purple-glow font-mono text-sm mt-0.5">{project.title}</p>
                    <span className="inline-block font-mono text-xs text-white-dim bg-purple-deep/50 px-2 py-1 rounded mt-2 mb-3">
                      {project.period}
                    </span>
                    <p className="text-white-dim text-sm leading-relaxed mb-4">{project.short}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((tech) => {
                        const icon = techIcons[tech as TechKey]
                        return icon ? (
                          <div
                            key={tech}
                            className="w-5 h-5 relative opacity-50 group-hover:opacity-100 transition-opacity"
                            title={icon.alt}
                          >
                            <Image src={icon.src} alt={icon.alt} fill className="object-contain" />
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2">
                  <div className="w-3 h-3 rounded-full bg-purple-glow shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ExperienceSection.tsx
git commit -m "feat: ExperienceSection with scroll-driven animated purple timeline"
```

---

### Task 13: ProjectModal + ProjectsSection

**Files:**
- Create: `src/components/ui/ProjectModal.tsx`
- Create: `src/components/sections/ProjectsSection.tsx`

- [ ] **Step 1: Create ProjectModal**

```tsx
// src/components/ui/ProjectModal.tsx
'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from '@phosphor-icons/react'
import { techIcons } from '@/constants/tech-icons'
import type { Project } from '@/types'
import type { TechKey } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes: ${project.company}`}
            className="fixed bottom-0 left-0 right-0 z-[101] max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-purple-subtle"
            style={{ background: '#0f0f1a' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{project.company}</h2>
                  <p className="text-purple-glow font-mono text-sm mt-1">{project.title}</p>
                  <span className="font-mono text-xs text-white-dim mt-1 block">{project.period}</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-white-dim hover:text-white transition-colors p-1"
                  aria-label="Fechar"
                >
                  <X weight="bold" className="w-6 h-6" />
                </button>
              </div>

              <ul className="space-y-3 mb-8">
                {project.description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white-muted text-sm leading-relaxed">
                    <span className="text-purple-glow mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <p className="font-mono text-xs text-white-dim uppercase tracking-widest mb-3">
                  Stack utilizada
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => {
                    const icon = techIcons[tech as TechKey]
                    return (
                      <div key={tech} className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-lg">
                        {icon && (
                          <div className="w-4 h-4 relative">
                            <Image src={icon.src} alt={icon.alt} fill className="object-contain" />
                          </div>
                        )}
                        <span className="font-mono text-xs text-white-muted">{icon?.alt ?? tech}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Create ProjectsSection**

```tsx
// src/components/sections/ProjectsSection.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { projects } from '@/constants/projects'
import { techIcons } from '@/constants/tech-icons'
import type { Project } from '@/types'
import type { TechKey } from '@/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projetos" className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // projetos
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-16">
          O que eu <span className="text-gradient">Construí</span>
        </h2>
      </SectionReveal>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project) => {
          const visibleTech = project.tech.slice(0, 5)
          const remaining = project.tech.length - 5

          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass-card glow-border rounded-xl p-6 flex flex-col gap-4 group cursor-pointer"
              onClick={() => setSelected(project)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalhes de ${project.company}`}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelected(project) }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-xl">{project.company}</h3>
                  <p className="text-purple-glow font-mono text-sm mt-0.5">{project.title}</p>
                </div>
                <ArrowUpRightIcon
                  weight="bold"
                  className="w-5 h-5 text-white-dim group-hover:text-purple-glow transition-colors flex-shrink-0 mt-1"
                />
              </div>

              <span className="font-mono text-xs text-white-dim bg-purple-deep/50 px-2 py-1 rounded w-fit">
                {project.period}
              </span>

              <p className="text-white-muted text-sm leading-relaxed flex-1">{project.short}</p>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-purple-subtle/30">
                {visibleTech.map((tech) => {
                  const icon = techIcons[tech as TechKey]
                  return icon ? (
                    <div
                      key={tech}
                      className="w-5 h-5 relative opacity-50 group-hover:opacity-100 transition-opacity"
                      title={icon.alt}
                    >
                      <Image src={icon.src} alt={icon.alt} fill className="object-contain" />
                    </div>
                  ) : null
                })}
                {remaining > 0 && (
                  <span className="font-mono text-xs text-white-dim">+{remaining}</span>
                )}
              </div>

              <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
                Ver detalhes →
              </span>
            </motion.div>
          )
        })}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProjectsSection.tsx src/components/ui/ProjectModal.tsx
git commit -m "feat: ProjectsSection with glass cards and slide-up ProjectModal"
```

---

### Task 14: CertificationsSection

**Files:**
- Create: `src/components/sections/CertificationsSection.tsx`

- [ ] **Step 1: Create CertificationsSection**

```tsx
// src/components/sections/CertificationsSection.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { certifications } from '@/constants/certifications'

const categoryLabels: Record<string, string> = {
  all: 'Todos',
  cybersecurity: 'Cibersegurança',
  development: 'Desenvolvimento',
  cloud: 'Cloud',
  networking: 'Redes',
  neuralnetworks: 'IA / Redes Neurais',
  other: 'Outros',
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const duration = 1500
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}</span>
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(certifications.map((c) => c.category)))]
  const filtered =
    activeCategory === 'all'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory)

  return (
    <section id="certificacoes" className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
      <SectionReveal>
        <span className="font-mono text-xs text-purple-glow uppercase tracking-widest">
          // certificações
        </span>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="flex items-end gap-4 mt-4 mb-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">
              <Counter target={certifications.length} />+
            </span>
          </h2>
          <p className="text-white-muted font-mono text-sm mb-2">certificações técnicas</p>
        </div>
      </SectionReveal>

      {/* Filter bar */}
      <SectionReveal delay={0.2}>
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-purple-glow border-purple-glow text-white'
                  : 'border-purple-subtle/50 text-white-muted hover:border-purple-glow hover:text-white'
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      <motion.div
        key={activeCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="glass-card rounded-lg p-4 glow-border group"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-glow mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium leading-tight">
                  {cert.title}
                </p>
                <p className="text-white-dim font-mono text-xs mt-1">
                  {cert.institution} · {cert.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CertificationsSection.tsx
git commit -m "feat: CertificationsSection with animated counter and category filter"
```

---

### Task 15: ContactSection + Footer

**Files:**
- Create: `src/components/sections/ContactSection.tsx`
- Modify: `src/components/layout/Footer/Footer.tsx`

- [ ] **Step 1: Create ContactSection**

```tsx
// src/components/sections/ContactSection.tsx
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
    handle: '/in/viniciusrb',
    href: 'https://linkedin.com/in/viniciusrb',
  },
  {
    icon: EnvelopeSimpleIcon,
    label: 'Email',
    handle: 'vinicius@exemplo.com',
    href: 'mailto:vinicius@exemplo.com',
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
        {contacts.map((contact, index) => (
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
                className="w-8 h-8 text-white-dim group-hover:text-purple-glow transition-colors flex-shrink-0"
              />
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
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update Footer**

```tsx
// src/components/layout/Footer/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-purple-subtle/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-white-dim">
          © {new Date().getFullYear()} Vinicius Barbosa. Feito com Next.js & Framer Motion.
        </p>
        <p className="font-mono text-xs text-white-dim">Joinville, SC · Brasil</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ContactSection.tsx src/components/layout/Footer/Footer.tsx
git commit -m "feat: ContactSection with large links, updated Footer"
```

---

## Chunk 5: Assembly and Cleanup

### Task 16: page.tsx — assemble one-page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

```tsx
// src/app/page.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { StackSection } from '@/components/sections/StackSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble one-page layout with all 7 sections"
```

---

### Task 17: Remove old routes and dead code

**Files to delete:**
- `src/app/projetos/page.tsx` (and directory)
- `src/app/sobre/page.tsx` (and directory)
- `src/app/contato/page.tsx` (and directory)
- `src/app/certificacoes/page.tsx` (and directory)
- `src/components/providers/` (entire directory)
- `src/components/ui/ThemeToggle/` (entire directory)
- `src/components/ui/BackgroundCircuit/` (entire directory)
- `src/components/features/` (entire directory)

**Files to update:**
- `src/components/layout/index.ts`
- `src/components/ui/index.ts`
- `src/components/index.ts`

- [ ] **Step 1: Delete old route pages**

```bash
rm -rf src/app/projetos src/app/sobre src/app/contato src/app/certificacoes
```

- [ ] **Step 2: Delete legacy components**

```bash
rm -rf src/components/providers src/components/ui/ThemeToggle src/components/ui/BackgroundCircuit src/components/features
```

- [ ] **Step 3: Update barrel exports**

`src/components/layout/index.ts`:
```ts
export { Header } from './Header/Header'
export { Footer } from './Footer/Footer'
export { PageCurtain } from './PageCurtain'
```

`src/components/ui/index.ts`:
```ts
export { ParticleCanvas } from './ParticleCanvas'
export { ProjectModal } from './ProjectModal'
export { SectionReveal } from './SectionReveal'
export { CustomCursor } from './CustomCursor'
```

`src/components/index.ts`:
```ts
export * from './layout'
export * from './ui'
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old routes, legacy components, clean barrel exports"
```

---

### Task 18: Build verification and fixes

- [ ] **Step 1: Run build**

```bash
cd "D:\Work\N-Tecnologias\Projetos pessoais\portifolio"
npm run build
```

Expected: Build completes with 0 errors. Warnings about `next/image` sizes prop are acceptable — fix them if they appear as errors.

- [ ] **Step 2: Fix common TypeScript errors if they appear**

Common issues to watch for:
- `Image` with `fill` requires `sizes` prop: add `sizes="(max-width: 768px) 100vw, 50vw"`
- `TechKey` cast: ensure `tech as TechKey` is consistent
- Missing `'use client'` on any component using hooks
- `motion.span` display prop: use `className` instead of `display` attribute

- [ ] **Step 3: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Purple curtain plays on initial load
- [ ] Particles appear and react to mouse in Hero
- [ ] All 7 section labels visible in nav (`Início`, `Sobre`, `Stack`, `Experiência`, `Projetos`, `Contato`)
- [ ] Header nav item highlights on scroll (purple underline indicator)
- [ ] Scroll reveal animations work on each section
- [ ] Project cards open modal on click/Enter
- [ ] Modal closes on ESC and outside click
- [ ] Certification counter animates from 0
- [ ] Category filter in Certifications works
- [ ] Custom cursor follows mouse, expands on hover
- [ ] Mobile menu opens/closes correctly

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: resolve build errors, finalize portfolio redesign"
```
