import type { TechKey } from '@/types'

export interface StackItem {
  name: string
  tech: TechKey
  color: string
  category: 'ai' | 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools'
}

export const stackCategories = {
  ai: 'IA & Agentes',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Banco de Dados',
  devops: 'DevOps & Plataforma',
  tools: 'Ferramentas',
} as const

export const stack: StackItem[] = [
  { name: 'Claude Code', tech: 'claudecode', color: '#D97757', category: 'ai' },
  { name: 'Codex', tech: 'codex', color: '#FFFFFF', category: 'ai' },
  { name: 'RAG', tech: 'rag', color: '#F59E0B', category: 'ai' },
  { name: 'Machine Learning (C#)', tech: 'ml', color: '#F59E0B', category: 'ai' },
  { name: 'Deep Learning', tech: 'deeplearning', color: '#F59E0B', category: 'ai' },
  { name: 'React', tech: 'react', color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', tech: 'nextjs', color: '#AAAAAA', category: 'frontend' },
  { name: 'TypeScript', tech: 'typescript', color: '#3178C6', category: 'frontend' },
  { name: 'Angular', tech: 'angular', color: '#DD0031', category: 'frontend' },
  { name: 'Tailwind CSS', tech: 'tailwind', color: '#38BDF8', category: 'frontend' },
  { name: 'Vue.js', tech: 'vue', color: '#4FC08D', category: 'frontend' },
  { name: 'C# / .NET', tech: 'dotnet', color: '#512BD4', category: 'backend' },
  { name: 'EF Core', tech: 'efcore', color: '#8B5CF6', category: 'backend' },
  { name: 'Node.js', tech: 'node', color: '#339933', category: 'backend' },
  { name: 'GraphQL', tech: 'graphql', color: '#E10098', category: 'backend' },
  { name: 'Python', tech: 'python', color: '#3776AB', category: 'backend' },
  { name: 'Ionic', tech: 'ionic', color: '#3880FF', category: 'mobile' },
  { name: 'React Native', tech: 'reactnative', color: '#61DAFB', category: 'mobile' },
  { name: '.NET MAUI', tech: 'maui', color: '#512BD4', category: 'mobile' },
  { name: 'SQL Server', tech: 'sqlserver', color: '#CC2927', category: 'database' },
  { name: 'PostgreSQL', tech: 'postgresql', color: '#4169E1', category: 'database' },
  { name: 'Supabase', tech: 'supabase', color: '#3ECF8E', category: 'database' },
  { name: 'CI/CD', tech: 'cicd', color: '#38BDF8', category: 'devops' },
  { name: 'GitHub Actions', tech: 'githubactions', color: '#2088FF', category: 'devops' },
  { name: 'Jenkins', tech: 'jenkins', color: '#D24939', category: 'devops' },
  { name: 'Azure DevOps', tech: 'azuredevops', color: '#0078D7', category: 'devops' },
  { name: 'Docker', tech: 'docker', color: '#2496ED', category: 'devops' },
  { name: 'RabbitMQ', tech: 'rabbitmq', color: '#FF6600', category: 'devops' },
  { name: 'SonarQube', tech: 'sonar', color: '#4E9BCD', category: 'devops' },
  { name: 'n8n', tech: 'n8n', color: '#EA4B71', category: 'devops' },
  { name: 'Git', tech: 'git', color: '#F05032', category: 'tools' },
  { name: 'GitHub', tech: 'github', color: '#FFFFFF', category: 'tools' },
  { name: 'Postman', tech: 'postman', color: '#FF6C37', category: 'tools' },
]
