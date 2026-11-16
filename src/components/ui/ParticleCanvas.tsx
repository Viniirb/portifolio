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

// The network is the point of this background: dots joined by visible lines, denser where the
// cursor is. Density follows the screen area so a big monitor is not emptier than a laptop.
const AREA_PER_PARTICLE = 15000
const MIN_PARTICLES = 50
const MAX_PARTICLES = 140
const LINK_DISTANCE = 150
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE
const MOUSE_REPEL = 130
const MOUSE_LINK = 190

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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      if (width === 0 || height === 0) return
      const count = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE)))
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.6 + 1,
        opacity: Math.random() * 0.25 + 0.2,
      }))
    }

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const list = particles.current
      const degree = new Array<number>(list.length).fill(0)

      if (move) {
        list.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1

          const dx = p.x - mouse.current.x
          const dy = p.y - mouse.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_REPEL && dist > 0) {
            const force = (MOUSE_REPEL - dist) / MOUSE_REPEL
            p.vx += (dx / dist) * force * 0.4
            p.vy += (dy / dist) * force * 0.4
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
            if (speed > 1.6) {
              p.vx = (p.vx / speed) * 1.6
              p.vy = (p.vy / speed) * 1.6
            }
          }
        })
      }

      // Links between particles.
      ctx.lineWidth = 0.8
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i]
          const b = list[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < LINK_DISTANCE_SQ) {
            const closeness = 1 - Math.sqrt(distSq) / LINK_DISTANCE
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(139, 105, 235, ${closeness * 0.2})`
            ctx.stroke()
            degree[i] += 1
            degree[j] += 1
          }
        }
      }

      // Links from the cursor: the web gathers around where you are looking.
      if (mouse.current.x > -9000) {
        for (let i = 0; i < list.length; i++) {
          const p = list[i]
          const dx = p.x - mouse.current.x
          const dy = p.y - mouse.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_LINK) {
            ctx.beginPath()
            ctx.moveTo(mouse.current.x, mouse.current.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(196, 181, 253, ${(1 - dist / MOUSE_LINK) * 0.26})`
            ctx.stroke()
            degree[i] += 2
          }
        }
      }

      // Dots last, so the junctions of the web (more links) read brighter and slightly larger.
      list.forEach((p, i) => {
        const hub = Math.min(degree[i], 6)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius + hub * 0.12, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${Math.min(0.6, p.opacity + hub * 0.04)})`
        ctx.fill()
      })
    }

    const loop = () => {
      draw(true)
      animationId.current = requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    const onVisibility = () => {
      cancelAnimationFrame(animationId.current)
      if (!document.hidden && !reduceMotion) loop()
    }

    resize()
    init()
    if (reduceMotion) draw(false)
    else loop()

    const handleResize = () => {
      resize()
      init()
      if (reduceMotion) draw(false)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animationId.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
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
