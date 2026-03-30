'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { stack, stackCategories, type StackItem } from '@/constants/stack'
import { getTechIconComponent } from '@/lib/tech-icon-registry'
import { getLegacyTechIcon } from '@/lib/legacy-tech-icons'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

function TechChip({ item }: { item: StackItem }) {
  const IconComponent = getTechIconComponent(item.tech)
  const legacyIcon = getLegacyTechIcon(item.tech)

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="glass-card glow-border flex items-center gap-2 px-3 py-2 rounded-lg cursor-default"
      style={{ boxShadow: `0 0 8px ${item.color}22` }}
    >
      {legacyIcon ? (
        <Image
          src={legacyIcon.src}
          alt={legacyIcon.alt}
          width={16}
          height={16}
          className="w-4 h-4 shrink-0 object-contain"
          style={
            legacyIcon.invertOnDark
              ? { filter: `brightness(0) invert(1) drop-shadow(0 0 4px ${item.color})` }
              : { filter: `drop-shadow(0 0 4px ${item.color})` }
          }
        />
      ) : (
        <IconComponent
          size={16}
          className="w-4 h-4 shrink-0"
          style={{ filter: `drop-shadow(0 0 4px ${item.color})` }}
          aria-hidden="true"
        />
      )}
      <span className="font-mono text-xs whitespace-nowrap" style={{ color: item.color }}>
        {item.name}
      </span>
    </motion.div>
  )
}

export function StackSection() {
  const categories = Object.entries(stackCategories) as [keyof typeof stackCategories, string][]

  return (
    <section id="stack" className="h-full flex flex-col justify-center py-6 sm:py-8 px-6">
      <div className="max-w-6xl mx-auto w-full">

        <SectionReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
            Minha <span className="text-gradient">Stack</span>
          </h2>
        </SectionReveal>

        <div className="space-y-5">
          {categories.map(([key, label], catIndex) => {
            const items = stack.filter((s) => s.category === key)
            if (items.length === 0) return null
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-white-dim uppercase tracking-widest">
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-linear-to-r from-purple-subtle to-transparent" />
                </div>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
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
