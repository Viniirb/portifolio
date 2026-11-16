'use client'
import { motion } from 'framer-motion'
import { SectionReveal, itemVariants } from '@/components/ui/SectionReveal'
import { TechChip } from '@/components/ui/TechIcon'
import { stack, stackCategories } from '@/constants/stack'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export function StackSection() {
  const categories = Object.entries(stackCategories) as [keyof typeof stackCategories, string][]

  return (
    <section id="stack" className="min-h-full flex flex-col justify-center py-3 sm:py-4 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <SectionReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-1 mb-4">
            Minha <span className="text-gradient">Stack</span>
          </h2>
        </SectionReveal>

        <div className="lg:columns-2 lg:gap-x-12">
          {categories.map(([key, label], catIndex) => {
            const items = stack.filter((s) => s.category === key)
            if (items.length === 0) return null

            return (
              <motion.div
                key={key}
                className="mb-3 break-inside-avoid"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-white-dim uppercase tracking-widest">
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-linear-to-r from-purple-subtle to-transparent" />
                </div>
                <motion.ul
                  className="flex flex-wrap gap-1.5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <TechChip tech={item.tech} />
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
