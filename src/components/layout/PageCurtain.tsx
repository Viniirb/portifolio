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
