import type { ComponentType, SVGProps } from 'react'
import {
  Angular,
  Azure,
  Bitbucket,
  ClaudeAI,
  Bootstrap5,
  CSharp,
  DeveloperIcons,
  Docker,
  Git,
  GraphQL,
  Ionic,
  Jenkins,
  JavaScript,
  Jira,
  MicrosoftSQLServer,
  MySQL,
  NextJs,
  NodeJs,
  OpenAI,
  Oracle,
  Playwright,
  PostgreSQL,
  Postman,
  Python,
  React,
  Storybook,
  Supabase,
  TailwindCSS,
  TypeScript,
  VisualStudioCode,
  VueJs,
} from 'developer-icons'
import type { TechKey } from '@/types'

type TechIconComponent = ComponentType<SVGProps<SVGElement> & { size?: number }>

const fallbackIcon = DeveloperIcons as TechIconComponent

const CodexIcon: TechIconComponent = ({ style, ...props }) => (
  <OpenAI
    {...(props as object)}
    style={{ ...style, filter: `brightness(0) invert(1) ${style?.filter ?? ''}`.trim() }}
  />
)

export const TECH_ICON_COMPONENTS: Record<TechKey, TechIconComponent> = {
  react: React as TechIconComponent,
  nextjs: NextJs as TechIconComponent,
  typescript: TypeScript as TechIconComponent,
  node: NodeJs as TechIconComponent,
  dotnet: CSharp as TechIconComponent,
  csharp: CSharp as TechIconComponent,
  sqlserver: MicrosoftSQLServer as TechIconComponent,
  azuredevops: Azure as TechIconComponent,
  vue: VueJs as TechIconComponent,
  jira: Jira as TechIconComponent,
  postman: Postman as TechIconComponent,
  git: Git as TechIconComponent,
  javascript: JavaScript as TechIconComponent,
  bitbucket: Bitbucket as TechIconComponent,
  angular: Angular as TechIconComponent,
  bootstrap: Bootstrap5 as TechIconComponent,
  styledcomponents: Bootstrap5 as TechIconComponent,
  minio: fallbackIcon,
  dotenv: NodeJs as TechIconComponent,
  graphql: GraphQL as TechIconComponent,
  vscode: VisualStudioCode as TechIconComponent,
  mysql: MySQL as TechIconComponent,
  supabase: Supabase as TechIconComponent,
  postgresql: PostgreSQL as TechIconComponent,
  docker: Docker as TechIconComponent,
  n8n: fallbackIcon,
  ionic: Ionic as TechIconComponent,
  python: Python as TechIconComponent,
  reactnative: React as TechIconComponent,
  rabbitmq: fallbackIcon,
  efcore: CSharp as TechIconComponent,
  maui: CSharp as TechIconComponent,
  sonar: fallbackIcon,
  tailwind: TailwindCSS as TechIconComponent,
  ml: CSharp as TechIconComponent,
  rag: fallbackIcon,
  deeplearning: fallbackIcon,
  github: fallbackIcon,
  githubactions: fallbackIcon,
  jenkins: Jenkins as TechIconComponent,
  cicd: fallbackIcon,
  claudecode: ClaudeAI as TechIconComponent,
  codex: CodexIcon,
  playwright: Playwright as TechIconComponent,
  xunit: fallbackIcon,
  sdd: fallbackIcon,
  ddd: fallbackIcon,
  tdd: fallbackIcon,
  nunit: fallbackIcon,
  plsql: Oracle as TechIconComponent,
  cleanarch: fallbackIcon,
  distributed: fallbackIcon,
  microservices: fallbackIcon,
  hexagonal: fallbackIcon,
  fsd: fallbackIcon,
  atomic: fallbackIcon,
  componentdriven: Storybook as TechIconComponent,
  solid: fallbackIcon,
  prompt: fallbackIcon,
}

export const TECH_ICON_LABELS: Record<TechKey, string> = {
  react: 'React',
  nextjs: 'Next.js',
  typescript: 'TypeScript',
  node: 'Node.js',
  dotnet: '.NET',
  csharp: 'C#',
  sqlserver: 'SQL Server',
  azuredevops: 'Azure DevOps',
  vue: 'Vue.js',
  jira: 'Jira',
  postman: 'Postman',
  git: 'Git',
  javascript: 'JavaScript',
  bitbucket: 'Bitbucket',
  angular: 'Angular',
  bootstrap: 'Bootstrap',
  styledcomponents: 'Styled Components',
  minio: 'MinIO',
  dotenv: 'Dotenv',
  graphql: 'GraphQL',
  vscode: 'Visual Studio Code',
  mysql: 'MySQL',
  supabase: 'Supabase',
  postgresql: 'PostgreSQL',
  docker: 'Docker',
  n8n: 'n8n',
  ionic: 'Ionic',
  python: 'Python',
  reactnative: 'React Native',
  rabbitmq: 'RabbitMQ',
  efcore: 'EF Core',
  maui: '.NET MAUI',
  sonar: 'SonarQube',
  tailwind: 'Tailwind CSS',
  ml: 'Machine Learning (C#)',
  rag: 'RAG',
  deeplearning: 'Deep Learning',
  github: 'GitHub',
  githubactions: 'GitHub Actions',
  jenkins: 'Jenkins',
  cicd: 'CI/CD',
  claudecode: 'Claude Code',
  codex: 'Codex',
  playwright: 'Playwright',
  xunit: 'xUnit',
  sdd: 'Spec-Driven Development',
  ddd: 'Domain-Driven Design (DDD)',
  tdd: 'Test-Driven Development (TDD)',
  nunit: 'NUnit',
  plsql: 'PL/SQL (Oracle)',
  cleanarch: 'Clean Architecture',
  distributed: 'Arquitetura distribuída',
  microservices: 'Microsserviços',
  hexagonal: 'Arquitetura hexagonal',
  fsd: 'Feature-Sliced Design',
  atomic: 'Atomic Design',
  componentdriven: 'Component-driven (Storybook)',
  solid: 'Princípios SOLID',
  prompt: 'Engenharia de Prompt',
}

export function getTechIconComponent(tech: TechKey): TechIconComponent {
  return TECH_ICON_COMPONENTS[tech] ?? fallbackIcon
}

// Labels that are words rather than product names change with the language.
const TECH_LABELS_EN: Partial<Record<TechKey, string>> = {
  solid: 'SOLID Principles',
  prompt: 'Prompt Engineering',
  distributed: 'Distributed architecture',
  microservices: 'Microservices',
  hexagonal: 'Hexagonal architecture',
}

export function getTechIconLabel(tech: TechKey, lang: 'pt' | 'en' = 'pt'): string {
  if (lang === 'en' && TECH_LABELS_EN[tech]) return TECH_LABELS_EN[tech]
  return TECH_ICON_LABELS[tech] ?? tech
}

// Icons that stand for an idea rather than a product. They have no brand color, so the tile shows
// them in a neutral tone instead of the amber/sky they were drawn in.
const CONCEPT_TECH = new Set<TechKey>(['rag', 'deeplearning', 'cicd', 'ml', 'xunit', 'sdd', 'ddd', 'tdd', 'nunit', 'cleanarch', 'distributed', 'microservices', 'hexagonal', 'fsd', 'atomic', 'solid', 'prompt'])

export function isConceptTech(tech: TechKey): boolean {
  return CONCEPT_TECH.has(tech)
}

export function renderTechIcon(tech: TechKey, props: SVGProps<SVGElement> & { size?: number }) {
  const Icon = getTechIconComponent(tech)
  return <Icon {...props} />
}
