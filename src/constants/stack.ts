import type { TechKey } from '@/types'

export interface StackItem {
  name: string
  tech: TechKey
  color: string
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools'
}

export const stackCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database & Dados',
  devops: 'DevOps & Plataforma',
  tools: 'Ferramentas',
} as const

export const stack: StackItem[] = [
  { name: 'React', tech: 'react', color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', tech: 'nextjs', color: '#AAAAAA', category: 'frontend' },
  { name: 'TypeScript', tech: 'typescript', color: '#3178C6', category: 'frontend' },
  { name: 'JavaScript', tech: 'javascript', color: '#F7DF1E', category: 'frontend' },
  { name: 'Vue.js', tech: 'vue', color: '#4FC08D', category: 'frontend' },
  { name: 'C# / .NET', tech: 'dotnet', color: '#512BD4', category: 'backend' },
  { name: 'Node.js', tech: 'node', color: '#339933', category: 'backend' },
  { name: 'GraphQL', tech: 'graphql', color: '#E10098', category: 'backend' },
  { name: 'Python', tech: 'python', color: '#3776AB', category: 'backend' },
  { name: 'Ionic', tech: 'ionic', color: '#3880FF', category: 'mobile' },
  { name: 'React Native', tech: 'react', color: '#61DAFB', category: 'mobile' },
  { name: 'SQL Server', tech: 'sqlserver', color: '#CC2927', category: 'database' },
  { name: 'PostgreSQL', tech: 'postgresql', color: '#4169E1', category: 'database' },
  { name: 'MySQL', tech: 'mysql', color: '#4479A1', category: 'database' },
  { name: 'Supabase', tech: 'supabase', color: '#3ECF8E', category: 'database' },
  { name: 'Azure DevOps', tech: 'azuredevops', color: '#0078D7', category: 'devops' },
  { name: 'Docker', tech: 'docker', color: '#2496ED', category: 'devops' },
  { name: 'n8n', tech: 'n8n', color: '#EA4B71', category: 'devops' },
  { name: 'Git', tech: 'git', color: '#F05032', category: 'tools' },
  { name: 'Postman', tech: 'postman', color: '#FF6C37', category: 'tools' },
  { name: 'VS Code', tech: 'vscode', color: '#007ACC', category: 'tools' },
]
