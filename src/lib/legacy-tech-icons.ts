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
  rabbitmq: { src: '/tech/rabbitmq.svg', alt: 'RabbitMQ' },
  rag: { src: '/tech/rag.svg', alt: 'RAG' },
  deeplearning: { src: '/tech/deeplearning.svg', alt: 'Deep Learning' },
  github: { src: '/tech/github.svg', alt: 'GitHub' },
  githubactions: { src: '/tech/githubactions.svg', alt: 'GitHub Actions' },
  cicd: { src: '/tech/cicd.svg', alt: 'CI/CD' },
  sonar: { src: '/tech/sonar.svg', alt: 'SonarQube' },
  ml: { src: '/tech/deeplearning.svg', alt: 'Machine Learning' },
  maui: { src: '/tech/dotnet.svg', alt: '.NET MAUI' },
  efcore: { src: '/tech/dotnet.svg', alt: 'EF Core' },
  xunit: { src: '/tech/xunit.svg', alt: 'xUnit' },
  sdd: { src: '/tech/sdd.svg', alt: 'Spec-Driven Development' },
  ddd: { src: '/tech/ddd.svg', alt: 'Domain-Driven Design' },
  tdd: { src: '/tech/tdd.svg', alt: 'Test-Driven Development (TDD)' },
  nunit: { src: '/tech/xunit.svg', alt: 'NUnit' },
  cleanarch: { src: '/tech/cleanarch.svg', alt: 'Clean Architecture' },
  distributed: { src: '/tech/distributed.svg', alt: 'Arquitetura distribuída' },
  microservices: { src: '/tech/microservices.svg', alt: 'Microsserviços' },
  hexagonal: { src: '/tech/hexagonal.svg', alt: 'Arquitetura hexagonal' },
  fsd: { src: '/tech/fsd.svg', alt: 'Feature-Sliced Design' },
  atomic: { src: '/tech/atomic.svg', alt: 'Atomic Design' },
  solid: { src: '/tech/solid.svg', alt: 'Princípios SOLID' },
  prompt: { src: '/tech/prompt.svg', alt: 'Engenharia de Prompt' },
}

export function getLegacyTechIcon(tech: TechKey): LegacyTechIcon | undefined {
  return LEGACY_ICON_MAP[tech]
}
