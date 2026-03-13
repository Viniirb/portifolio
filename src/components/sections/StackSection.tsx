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
