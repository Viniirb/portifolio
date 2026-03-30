import type { ComponentType, SVGProps } from 'react'
import {
  Angular,
  Azure,
  Bitbucket,
  Bootstrap5,
  CSharp,
  DeveloperIcons,
  Docker,
  Git,
  GraphQL,
  Ionic,
  JavaScript,
  Jira,
  MicrosoftSQLServer,
  MySQL,
  NextJs,
  NodeJs,
  PostgreSQL,
  Postman,
  Python,
  React,
  Supabase,
  TypeScript,
  VisualStudioCode,
  VueJs,
} from 'developer-icons'
import type { TechKey } from '@/types'

type TechIconComponent = ComponentType<SVGProps<SVGElement> & { size?: number }>

const fallbackIcon = DeveloperIcons as TechIconComponent

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
}

export function getTechIconComponent(tech: TechKey): TechIconComponent {
  return TECH_ICON_COMPONENTS[tech] ?? fallbackIcon
}

export function getTechIconLabel(tech: TechKey): string {
  return TECH_ICON_LABELS[tech] ?? tech
}
