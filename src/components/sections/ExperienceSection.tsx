'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CaretLeftIcon, CaretRightIcon, GitBranchIcon, StarIcon } from '@phosphor-icons/react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { projects } from '@/constants/projects'
import { OPEN_SOURCE_BRANCH_FROM, openSourceItems } from '@/constants/cases'
import { useL, useT } from '@/i18n'

// Oldest first, so the timeline reads left to right.
const chronological = [...projects].reverse()
const award = projects.find((p) => p.award)?.award

const DASH = 'rgba(52,211,153,0.8)'

type Job = (typeof projects)[0]

function JobCard({ job }: { job: Job }) {
  const t = useT().experience
  const l = useL()

  return (
    <article className="glass-card glow-border rounded-xl p-4 text-left">
      <p className="font-mono text-xs text-white-muted">{job.period && l(job.period)}</p>
      <h3 className="mt-1 flex items-center gap-2 font-display text-base font-bold leading-tight text-white">
        {job.company}
        {job.award && (
          <span className="inline-flex shrink-0 text-amber-400" title={l(job.award.label)}>
            <StarIcon weight="fill" className="h-4 w-4" style={{ filter: 'drop-shadow(0 0 5px rgba(251,191,36,0.7))' }} aria-hidden="true" />
            <span className="sr-only">{l(job.award.label)}. {t.legendHint}</span>
          </span>
        )}
      </h3>
      <p className="mt-1 font-mono text-xs leading-snug text-purple-glow">{l(job.title)}</p>
    </article>
  )
}

// Open source is a second line that branches off the career. Each item is a slide.
function OpenSourceCarousel() {
  const t = useT().experience
  const l = useL()
  const [index, setIndex] = useState(0)
  const item = openSourceItems[index]
  const many = openSourceItems.length > 1
  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + openSourceItems.length) % openSourceItems.length)

  return (
    <div>
      <article
        className="rounded-xl border-l border-dashed py-1 pl-4"
        style={{ borderColor: DASH }}
        aria-live="polite"
      >
        <h3 className="flex items-center gap-2 font-display text-base font-bold leading-tight text-white">
          <GitBranchIcon weight="bold" className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          {l(item.title)}
        </h3>
        <p className="mt-1 font-mono text-xs text-white-muted">{l(item.period)}</p>
      </article>

      {many && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            {openSourceItems.map((it, i) => (
              <span
                key={it.id}
                className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-emerald-400' : 'bg-purple-subtle'}`}
              />
            ))}
          </div>
          <div className="flex gap-1.5">
            {([-1, 1] as const).map((dir) => {
              const Icon = dir === -1 ? CaretLeftIcon : CaretRightIcon
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => step(dir)}
                  aria-label={dir === -1 ? t.previous : t.next}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/50 text-emerald-400 transition-colors hover:bg-emerald-400/10"
                >
                  <Icon weight="bold" className="h-3 w-3" aria-hidden="true" />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function ExperienceSection() {
  const t = useT().experience
  const l = useL()

  return (
    <section
      id="experiencia"
      className="min-h-full flex flex-col justify-center py-8 sm:py-10 px-6 max-w-7xl mx-auto w-full"
    >
      <SectionReveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-10 xl:mb-14">
          {t.titlePre}<span className="text-gradient">{t.titleEm}</span>
        </h2>
      </SectionReveal>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        {/* Wide screens: the career on a horizontal line, open source branching off 2026 to the right. */}
        <div className="hidden xl:grid grid-cols-[minmax(0,1fr)_14.5rem] gap-x-8">
          <div className="grid grid-cols-5 items-end gap-4 min-h-28">
            {chronological.map((job, i) =>
              i % 2 === 0 ? <JobCard key={job.id} job={job} /> : <div key={job.id} aria-hidden="true" />
            )}
          </div>
          <div aria-hidden="true" />

          <div className="relative my-2 grid h-14 grid-cols-5 items-center gap-4">
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 4%, rgba(124,58,237,0.5))',
                boxShadow: '0 0 12px rgba(124,58,237,0.3)',
              }}
            />
            {chronological.map((job) => {
              const branches = job.id === OPEN_SOURCE_BRANCH_FROM
              return (
                <div key={job.id} className="relative z-10 flex flex-col items-center gap-1">
                  <span className="font-mono text-xs text-white-muted">{job.period && l(job.period).split(' – ')[0]}</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: '#7c3aed',
                      boxShadow: branches ? '0 0 10px rgba(52,211,153,0.7)' : '0 0 10px rgba(124,58,237,0.65)',
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div aria-hidden="true" />

          <div className="grid grid-cols-5 items-start gap-4 min-h-28">
            {chronological.map((job, i) =>
              i % 2 === 1 ? (
                <JobCard key={job.id} job={job} />
              ) : job.id === OPEN_SOURCE_BRANCH_FROM ? (
                // Elbow: drops from the 2026 marker, then runs right into the open source line.
                <div key={job.id} className="relative h-7" aria-hidden="true">
                  <div
                    className="absolute left-1/2 top-0 -right-8 h-full rounded-bl-xl border-b border-l border-dashed"
                    style={{ borderColor: DASH }}
                  />
                </div>
              ) : (
                <div key={job.id} aria-hidden="true" />
              )
            )}
          </div>

          <div>
            <div className="relative h-7 border-b border-dashed" style={{ borderColor: DASH }}>
              <span className="absolute left-0 top-0 font-mono text-xs uppercase tracking-widest text-emerald-400">
                {t.openSource}
              </span>
            </div>
            <div className="mt-3">
              <OpenSourceCarousel />
            </div>
          </div>
        </div>

        {/* Narrow screens: one column, the open source line hangs under the job it started in. */}
        <div className="xl:hidden">
          <ol className="relative max-w-2xl space-y-3 border-l border-purple-glow/50 pl-6">
            {[...chronological].reverse().map((job) => (
              <li key={job.id} className="relative">
                <span
                  className="absolute -left-[31px] top-5 h-3 w-3 rounded-full"
                  style={{ background: '#7c3aed', boxShadow: '0 0 10px rgba(124,58,237,0.65)' }}
                  aria-hidden="true"
                />
                <JobCard job={job} />
                {job.id === OPEN_SOURCE_BRANCH_FROM && (
                  <div
                    className="ml-3 mt-3 rounded-bl-xl border-l border-dashed pb-1 pl-4 pt-2"
                    style={{ borderColor: DASH }}
                  >
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald-400">
                      {t.openSource}
                    </p>
                    <OpenSourceCarousel />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {award && (
          <p className="mt-8 flex items-center gap-2 font-mono text-xs text-white-muted">
            <StarIcon weight="fill" className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
            {l(award.label)}, {l(award.detail)}
          </p>
        )}
      </motion.div>
    </section>
  )
}
