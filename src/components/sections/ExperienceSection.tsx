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
