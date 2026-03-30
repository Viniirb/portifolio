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
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Dot central — segue instantaneamente */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? '#a855f7' : '#ffffff',
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring externo — segue com lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 36 : 24,
          height: isHovering ? 36 : 24,
          opacity: isVisible ? 0.6 : 0,
          borderColor: isHovering ? '#a855f7' : 'rgba(255,255,255,0.4)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
