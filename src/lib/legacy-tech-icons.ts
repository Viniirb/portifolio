import type { TechKey } from '@/types'

export type LegacyTechIcon = {
  src: string
  alt: string
  invertOnDark?: boolean
}

const LEGACY_ICON_MAP: Partial<Record<TechKey, LegacyTechIcon>> = {
  dotnet: { src: '/tech/dotnet.svg', alt: '.NET' },
  azuredevops: { src: '/tech/azuredevops.svg', alt: 'Azure DevOps' },
  n8n: { src: '/tech/n8n.svg', alt: 'n8n' },
}

export function getLegacyTechIcon(tech: TechKey): LegacyTechIcon | undefined {
  return LEGACY_ICON_MAP[tech]
}
