import Image from 'next/image'
import type { TechKey } from '@/types'
import { getTechIconLabel, isConceptTech, renderTechIcon } from '@/lib/tech-icon-registry'
import { getLegacyTechIcon } from '@/lib/legacy-tech-icons'

const CONCEPT_FILTER = 'brightness(0) invert(1) opacity(0.85)'

// Every technology icon in the site goes through this tile: same size, same padding, same border.
// Brands keep their own color; concept icons (RAG, CI/CD...) are neutral.
export function TechTile({ tech, size = 26 }: { tech: TechKey; size?: number }) {
  const legacy = getLegacyTechIcon(tech)
  const inner = size - 10
  const filter = isConceptTech(tech)
    ? CONCEPT_FILTER
    : legacy?.invertOnDark
      ? 'brightness(0) invert(1)'
      : undefined

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg border border-purple-subtle bg-purple-glow/10"
      style={{ width: size, height: size }}
    >
      {legacy ? (
        <Image
          src={legacy.src}
          alt=""
          width={inner}
          height={inner}
          className="object-contain"
          style={{ width: inner, height: inner, filter }}
        />
      ) : (
        renderTechIcon(tech, { size: inner, style: { filter }, 'aria-hidden': true })
      )}
    </span>
  )
}

export function TechChip({ tech }: { tech: TechKey }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-subtle/70 bg-white/3 py-0.5 pl-0.5 pr-2.5">
      <TechTile tech={tech} size={22} />
      <span className="font-mono text-xs text-white">{getTechIconLabel(tech)}</span>
    </span>
  )
}
